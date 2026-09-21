import { CompetingSoundType, MicAnalysisMetrics } from '../types';

export class AudioEngine {
  private ctx: AudioContext | null = null;
  private micStream: MediaStream | null = null;
  private micSource: MediaStreamAudioSourceNode | null = null;
  private micAnalyser: AnalyserNode | null = null;
  private loopbackGain: GainNode | null = null;

  // Background competing audio nodes
  private backgroundGain: GainNode | null = null;
  private bgInterval: number | null = null;
  private bgActiveSoundType: CompetingSoundType = 'none';

  // Codec simulation nodes
  private codecSimulatorSource: OscillatorNode | null = null;
  private codecHfpFilter: BiquadFilterNode | null = null;
  private codecGain: GainNode | null = null;
  private isSimulatingHfp: boolean = false;

  // Metrics
  private currentMetrics: MicAnalysisMetrics = {
    currentDb: -100,
    peakDb: -100,
    noiseFloorDb: -60,
    isClipping: false,
    isSpeaking: false,
    frequencyData: new Uint8Array(64)
  };

  private ensureContext(): AudioContext {
    if (!this.ctx) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtxClass();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public async startMicrophone(echoCancellation = true, noiseSuppression = true): Promise<boolean> {
    const ctx = this.ensureContext();
    try {
      this.stopMicrophone();

      this.micStream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation,
          noiseSuppression,
          autoGainControl: false,
          channelCount: 1
        }
      });

      this.micSource = ctx.createMediaStreamSource(this.micStream);
      this.micAnalyser = ctx.createAnalyser();
      this.micAnalyser.fftSize = 256;
      this.micAnalyser.smoothingTimeConstant = 0.8;

      this.loopbackGain = ctx.createGain();
      this.loopbackGain.gain.value = 0; // default loopback muted to avoid speaker feedback

      this.micSource.connect(this.micAnalyser);
      this.micAnalyser.connect(this.loopbackGain);
      this.loopbackGain.connect(ctx.destination);

      return true;
    } catch (err) {
      console.warn('Microphone access error:', err);
      return false;
    }
  }

  public setLoopbackVolume(volume: number) {
    if (this.loopbackGain && this.ctx) {
      this.loopbackGain.gain.setValueAtTime(Math.max(0, Math.min(1, volume)), this.ctx.currentTime);
    }
  }

  public stopMicrophone() {
    if (this.micStream) {
      this.micStream.getTracks().forEach((t) => t.stop());
      this.micStream = null;
    }
    if (this.micSource) {
      this.micSource.disconnect();
      this.micSource = null;
    }
    if (this.loopbackGain) {
      this.loopbackGain.disconnect();
      this.loopbackGain = null;
    }
  }

  public getMetrics(): MicAnalysisMetrics {
    if (!this.micAnalyser) {
      return this.currentMetrics;
    }

    const bufferLength = this.micAnalyser.frequencyBinCount;
    const timeDomain = new Uint8Array(bufferLength);
    const freqData = new Uint8Array(bufferLength);

    this.micAnalyser.getByteTimeDomainData(timeDomain);
    this.micAnalyser.getByteFrequencyData(freqData);

    // Compute RMS and peak
    let sumSquares = 0;
    let peak = 0;
    for (let i = 0; i < bufferLength; i++) {
      const normalized = (timeDomain[i] - 128) / 128;
      const absVal = Math.abs(normalized);
      if (absVal > peak) peak = absVal;
      sumSquares += normalized * normalized;
    }

    const rms = Math.sqrt(sumSquares / bufferLength);
    const currentDb = rms > 0.0001 ? 20 * Math.log10(rms) : -100;
    const peakDb = peak > 0.0001 ? 20 * Math.log10(peak) : -100;

    const isClipping = peak >= 0.98;
    const isSpeaking = currentDb > -45;

    this.currentMetrics = {
      currentDb: Math.round(currentDb),
      peakDb: Math.round(peakDb),
      noiseFloorDb: isSpeaking ? this.currentMetrics.noiseFloorDb : Math.round(currentDb),
      isClipping,
      isSpeaking,
      frequencyData: freqData.slice(0, 48)
    };

    return this.currentMetrics;
  }

  // --- Background Competing Sound Synthesis ---
  public playCompetingAudio(type: CompetingSoundType, volume = 0.5) {
    this.stopCompetingAudio();
    if (type === 'none') return;

    const ctx = this.ensureContext();
    this.bgActiveSoundType = type;

    this.backgroundGain = ctx.createGain();
    this.backgroundGain.gain.setValueAtTime(volume, ctx.currentTime);
    this.backgroundGain.connect(ctx.destination);

    if (type === 'discord_chatter') {
      this.startChatterSimulation(ctx, this.backgroundGain);
    } else if (type === 'stream_lofi') {
      this.startLofiStreamSimulation(ctx, this.backgroundGain);
    } else if (type === 'gaming_rumble') {
      this.startGameSoundSimulation(ctx, this.backgroundGain);
    }
  }

  public setCompetingVolume(volume: number) {
    if (this.backgroundGain && this.ctx) {
      this.backgroundGain.gain.setValueAtTime(Math.max(0, Math.min(1, volume)), this.ctx.currentTime);
    }
  }

  public stopCompetingAudio() {
    if (this.bgInterval) {
      window.clearInterval(this.bgInterval);
      this.bgInterval = null;
    }
    if (this.backgroundGain) {
      this.backgroundGain.disconnect();
      this.backgroundGain = null;
    }
    this.bgActiveSoundType = 'none';
  }

  public getActiveSoundType(): CompetingSoundType {
    return this.bgActiveSoundType;
  }

  // Synthesize overlapping voices (formant chatter)
  private startChatterSimulation(ctx: AudioContext, target: GainNode) {
    const syllables = [220, 290, 380, 440, 520, 620, 740];
    const triggerBabble = () => {
      if (!this.backgroundGain) return;
      const now = ctx.currentTime;
      // 2 overlapping voice bursts
      for (let v = 0; v < 2; v++) {
        const osc = ctx.createOscillator();
        const biquad = ctx.createBiquadFilter();
        const gain = ctx.createGain();

        osc.type = v === 0 ? 'sawtooth' : 'triangle';
        const baseFreq = syllables[Math.floor(Math.random() * syllables.length)] + (Math.random() * 40 - 20);
        osc.frequency.setValueAtTime(baseFreq, now);

        biquad.type = 'bandpass';
        biquad.frequency.setValueAtTime(baseFreq * 2, now);
        biquad.Q.value = 4.0;

        const dur = 0.12 + Math.random() * 0.2;
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.12, now + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, now + dur);

        osc.connect(biquad);
        biquad.connect(gain);
        gain.connect(target);

        osc.start(now);
        osc.stop(now + dur + 0.05);
      }
    };

    triggerBabble();
    this.bgInterval = window.setInterval(triggerBabble, 180);
  }

  // Synthesize soft lofi chords + kick rhythm
  private startLofiStreamSimulation(ctx: AudioContext, target: GainNode) {
    const chordPitches = [
      [130.81, 196.0, 246.94, 293.66], // Cmaj9
      [110.0, 164.81, 220.0, 261.63],  // Amin7
      [146.83, 220.0, 261.63, 329.63], // Dmin9
      [98.0, 146.83, 196.0, 246.94]    // Gmaj7
    ];
    let chordIdx = 0;

    const playChord = () => {
      if (!this.backgroundGain) return;
      const now = ctx.currentTime;
      const pitches = chordPitches[chordIdx % chordPitches.length];
      chordIdx++;

      pitches.forEach((f) => {
        const osc = ctx.createOscillator();
        const filter = ctx.createBiquadFilter();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, now);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(800, now);

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.08, now + 0.3);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 1.8);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(target);

        osc.start(now);
        osc.stop(now + 2.0);
      });

      // Soft percussion kick
      const kickOsc = ctx.createOscillator();
      const kickGain = ctx.createGain();
      kickOsc.frequency.setValueAtTime(140, now);
      kickOsc.frequency.exponentialRampToValueAtTime(45, now + 0.12);
      kickGain.gain.setValueAtTime(0.2, now);
      kickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

      kickOsc.connect(kickGain);
      kickGain.connect(target);
      kickOsc.start(now);
      kickOsc.stop(now + 0.25);
    };

    playChord();
    this.bgInterval = window.setInterval(playChord, 1600);
  }

  // Synthesize game explosion rumble and laser bursts
  private startGameSoundSimulation(ctx: AudioContext, target: GainNode) {
    const playExplosion = () => {
      if (!this.backgroundGain) return;
      const now = ctx.currentTime;

      // Filtered noise buffer for low rumble
      const bufferSize = ctx.sampleRate * 1.5;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(300, now);
      filter.frequency.exponentialRampToValueAtTime(60, now + 1.2);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.4);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(target);

      whiteNoise.start(now);
      whiteNoise.stop(now + 1.5);
    };

    playExplosion();
    this.bgInterval = window.setInterval(playExplosion, 2200);
  }

  // --- Bluetooth A2DP vs HFP Profile Simulator ---
  public playA2DPvsHFPDemo(isHfp: boolean, onEnded: () => void) {
    this.stopDemoAudio();
    const ctx = this.ensureContext();
    this.isSimulatingHfp = isHfp;

    // Generate a musical vocal test phrase sequence
    const notes = [261.63, 329.63, 392.0, 523.25, 440.0, 349.23, 261.63];
    const chordNotes = [130.81, 164.81, 196.0];

    this.codecGain = ctx.createGain();
    this.codecGain.gain.setValueAtTime(0.22, ctx.currentTime);

    if (isHfp) {
      // Telephone bandpass: 350Hz - 3200Hz
      const lowCut = ctx.createBiquadFilter();
      lowCut.type = 'highpass';
      lowCut.frequency.setValueAtTime(380, ctx.currentTime);

      const highCut = ctx.createBiquadFilter();
      highCut.type = 'lowpass';
      highCut.frequency.setValueAtTime(3000, ctx.currentTime);

      // Bitcrusher-like mild distortion
      const waveshaper = ctx.createWaveShaper();
      const curve = new Float32Array(256);
      for (let i = 0; i < 256; ++i) {
        const x = (i * 2) / 256 - 1;
        // Mild harsh clipping to emulate 8kHz telephone DAC
        curve[i] = Math.tanh(x * 1.5);
      }
      waveshaper.curve = curve;

      this.codecGain.connect(lowCut);
      lowCut.connect(highCut);
      highCut.connect(waveshaper);
      waveshaper.connect(ctx.destination);
    } else {
      // A2DP: Wide frequency stereo transparency
      this.codecGain.connect(ctx.destination);
    }

    const now = ctx.currentTime;
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const noteGain = ctx.createGain();
      const startTime = now + idx * 0.35;

      osc.type = isHfp ? 'sawtooth' : 'triangle';
      osc.frequency.setValueAtTime(freq, startTime);

      noteGain.gain.setValueAtTime(0.001, startTime);
      noteGain.gain.linearRampToValueAtTime(0.18, startTime + 0.05);
      noteGain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.32);

      osc.connect(noteGain);
      noteGain.connect(this.codecGain!);

      osc.start(startTime);
      osc.stop(startTime + 0.35);
    });

    // Also play low bass to showcase how HFP strips bass entirely
    chordNotes.forEach((f) => {
      const bassOsc = ctx.createOscillator();
      const bassGain = ctx.createGain();
      bassOsc.type = 'sine';
      bassOsc.frequency.setValueAtTime(f, now);
      bassGain.gain.setValueAtTime(0.1, now);
      bassGain.gain.exponentialRampToValueAtTime(0.001, now + 2.4);

      bassOsc.connect(bassGain);
      bassGain.connect(this.codecGain!);
      bassOsc.start(now);
      bassOsc.stop(now + 2.5);
    });

    const totalDur = notes.length * 0.35 + 0.5;
    window.setTimeout(() => {
      onEnded();
    }, totalDur * 1000);
  }

  public stopDemoAudio() {
    if (this.codecGain) {
      this.codecGain.disconnect();
      this.codecGain = null;
    }
  }

  public destroy() {
    this.stopMicrophone();
    this.stopCompetingAudio();
    this.stopDemoAudio();
    if (this.ctx) {
      this.ctx.close();
      this.ctx = null;
    }
  }
}

export const audioEngine = new AudioEngine();
