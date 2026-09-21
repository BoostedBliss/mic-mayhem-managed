import React, { useEffect, useRef, useState } from 'react';
import { audioEngine } from '../utils/audioEngine';
import { CompetingSoundType, MicAnalysisMetrics } from '../types';
import { Mic, MicOff, Volume2, VolumeX, AlertTriangle, CheckCircle2, Play, Square, Headphones, Sparkles, Activity } from 'lucide-react';

export const AudioStressTest: React.FC = () => {
  const [isMicActive, setIsMicActive] = useState(false);
  const [micError, setMicError] = useState<string | null>(null);
  const [competingType, setCompetingType] = useState<CompetingSoundType>('none');
  const [competingVol, setCompetingVol] = useState(0.5);
  const [loopbackVol, setLoopbackVol] = useState(0);
  const [metrics, setMetrics] = useState<MicAnalysisMetrics>({
    currentDb: -100,
    peakDb: -100,
    noiseFloorDb: -60,
    isClipping: false,
    isSpeaking: false,
    frequencyData: new Uint8Array(48)
  });

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // Toggle Microphone
  const handleToggleMic = async () => {
    if (isMicActive) {
      audioEngine.stopMicrophone();
      setIsMicActive(false);
      setLoopbackVol(0);
    } else {
      setMicError(null);
      const ok = await audioEngine.startMicrophone(true, true);
      if (ok) {
        setIsMicActive(true);
      } else {
        setMicError('Microphone access denied or unavailable. Please grant browser microphone permission.');
      }
    }
  };

  // Switch competing sound
  const handleSelectSound = (type: CompetingSoundType) => {
    if (competingType === type) {
      audioEngine.stopCompetingAudio();
      setCompetingType('none');
    } else {
      audioEngine.playCompetingAudio(type, competingVol);
      setCompetingType(type);
    }
  };

  const handleCompetingVolChange = (val: number) => {
    setCompetingVol(val);
    audioEngine.setCompetingVolume(val);
  };

  const handleLoopbackVolChange = (val: number) => {
    setLoopbackVol(val);
    audioEngine.setLoopbackVolume(val);
  };

  // Poll metrics and render canvas
  useEffect(() => {
    const updateLoop = () => {
      if (isMicActive) {
        const m = audioEngine.getMetrics();
        setMetrics(m);

        // Draw frequency bars
        const canvas = canvasRef.current;
        if (canvas) {
          const ctx = canvas.getContext('2d');
          if (ctx) {
            const width = canvas.width;
            const height = canvas.height;
            ctx.clearRect(0, 0, width, height);

            const barCount = 32;
            const barWidth = (width / barCount) - 2;

            for (let i = 0; i < barCount; i++) {
              const val = m.frequencyData[i] || 0;
              const barHeight = (val / 255) * height;

              // Color based on level
              if (val > 220) {
                ctx.fillStyle = '#ef4444'; // Red clipping
              } else if (val > 150) {
                ctx.fillStyle = '#22c55e'; // Discord green
              } else {
                ctx.fillStyle = '#6366f1'; // Indigo base
              }

              ctx.fillRect(i * (barWidth + 2), height - barHeight, barWidth, barHeight);
            }
          }
        }
      }
      animFrameRef.current = requestAnimationFrame(updateLoop);
    };

    animFrameRef.current = requestAnimationFrame(updateLoop);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isMicActive]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      audioEngine.stopCompetingAudio();
      audioEngine.stopMicrophone();
    };
  }, []);

  // Compute status assessment
  const isHealthyLevel = metrics.currentDb >= -24 && metrics.currentDb <= -6;
  const isTooQuiet = isMicActive && metrics.currentDb < -40 && metrics.isSpeaking;

  return (
    <div id="audio-stress-tester" className="bg-slate-900 border border-slate-800 rounded-xl p-5 md:p-6 text-slate-100 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-indigo-500/20 text-indigo-400 rounded-md">
              <Activity className="w-5 h-5" />
            </span>
            <h2 className="text-lg font-semibold text-white">
              Live Overlapping Audio Stress-Tester
            </h2>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Simulates live Discord conditions: talk into your mic while continuous audio (chatter/streams) plays through your headphones.
          </p>
        </div>

        <button
          id="btn-toggle-mic"
          onClick={handleToggleMic}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-colors shrink-0 ${
            isMicActive
              ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-900/30'
              : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-900/30'
          }`}
        >
          {isMicActive ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          {isMicActive ? 'Stop Mic Test' : 'Start Mic Test'}
        </button>
      </div>

      {micError && (
        <div id="mic-error-banner" className="mt-4 p-3 bg-rose-950/60 border border-rose-800 text-rose-300 rounded-lg text-xs flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <span>{micError}</span>
        </div>
      )}

      {/* Grid: Competing Sound Selector & Real-Time Meter */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
        {/* Left Column: Competing Sound Sources */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-indigo-400" />
              1. Competing Audio Simulator
            </h3>
            <span className="text-xs text-slate-400">Audio plays through your headphones</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <button
              id="btn-competing-chatter"
              onClick={() => handleSelectSound('discord_chatter')}
              className={`p-3 rounded-lg border text-left text-xs transition-all ${
                competingType === 'discord_chatter'
                  ? 'border-indigo-500 bg-indigo-950/50 text-indigo-200 ring-1 ring-indigo-500'
                  : 'border-slate-800 bg-slate-800/60 hover:bg-slate-800 text-slate-300'
              }`}
            >
              <div className="flex items-center justify-between font-semibold mb-1">
                <span>Party Chatter</span>
                {competingType === 'discord_chatter' ? (
                  <Square className="w-3.5 h-3.5 text-indigo-400 fill-indigo-400" />
                ) : (
                  <Play className="w-3.5 h-3.5 text-slate-400" />
                )}
              </div>
              <p className="text-[11px] text-slate-400 leading-tight">
                Simulates 2+ people talking at once in voice channel.
              </p>
            </button>

            <button
              id="btn-competing-lofi"
              onClick={() => handleSelectSound('stream_lofi')}
              className={`p-3 rounded-lg border text-left text-xs transition-all ${
                competingType === 'stream_lofi'
                  ? 'border-indigo-500 bg-indigo-950/50 text-indigo-200 ring-1 ring-indigo-500'
                  : 'border-slate-800 bg-slate-800/60 hover:bg-slate-800 text-slate-300'
              }`}
            >
              <div className="flex items-center justify-between font-semibold mb-1">
                <span>Music / Stream</span>
                {competingType === 'stream_lofi' ? (
                  <Square className="w-3.5 h-3.5 text-indigo-400 fill-indigo-400" />
                ) : (
                  <Play className="w-3.5 h-3.5 text-slate-400" />
                )}
              </div>
              <p className="text-[11px] text-slate-400 leading-tight">
                Continuous synth beat &amp; bassline from YouTube / Spotify.
              </p>
            </button>

            <button
              id="btn-competing-game"
              onClick={() => handleSelectSound('gaming_rumble')}
              className={`p-3 rounded-lg border text-left text-xs transition-all ${
                competingType === 'gaming_rumble'
                  ? 'border-indigo-500 bg-indigo-950/50 text-indigo-200 ring-1 ring-indigo-500'
                  : 'border-slate-800 bg-slate-800/60 hover:bg-slate-800 text-slate-300'
              }`}
            >
              <div className="flex items-center justify-between font-semibold mb-1">
                <span>Game Action</span>
                {competingType === 'gaming_rumble' ? (
                  <Square className="w-3.5 h-3.5 text-indigo-400 fill-indigo-400" />
                ) : (
                  <Play className="w-3.5 h-3.5 text-slate-400" />
                )}
              </div>
              <p className="text-[11px] text-slate-400 leading-tight">
                Sub-bass rumble and gunshot bursts while in channel.
              </p>
            </button>
          </div>

          {competingType !== 'none' && (
            <div className="p-3 bg-slate-800/40 rounded-lg border border-slate-700/60 flex items-center gap-3">
              <span className="text-xs text-slate-400 shrink-0">Stream Volume:</span>
              <input
                id="input-competing-vol"
                type="range"
                min="0.05"
                max="1"
                step="0.05"
                value={competingVol}
                onChange={(e) => handleCompetingVolChange(parseFloat(e.target.value))}
                className="w-full accent-indigo-500"
              />
              <span className="text-xs font-mono text-slate-300 w-10 text-right">
                {Math.round(competingVol * 100)}%
              </span>
            </div>
          )}

          {/* Sidetone / Loopback monitor */}
          <div className="p-3.5 bg-slate-800/30 rounded-lg border border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Headphones className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-medium text-slate-200">Hear Yourself (Mic Sidetone Monitor)</span>
              </div>
              <span className="text-[11px] text-slate-400 font-mono">
                {loopbackVol === 0 ? 'Muted' : `${Math.round(loopbackVol * 100)}%`}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <input
                id="input-loopback-vol"
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={loopbackVol}
                onChange={(e) => handleLoopbackVolChange(parseFloat(e.target.value))}
                disabled={!isMicActive}
                className="w-full accent-emerald-500 disabled:opacity-40"
              />
              {loopbackVol === 0 ? (
                <VolumeX className="w-4 h-4 text-slate-500 shrink-0" />
              ) : (
                <Volume2 className="w-4 h-4 text-emerald-400 shrink-0" />
              )}
            </div>
            <p className="text-[11px] text-slate-400 mt-1.5">
              ⚠️ Use headphones when turning up sidetone to avoid acoustic feedback through speakers.
            </p>
          </div>
        </div>

        {/* Right Column: Live Meter & Analysis */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <Mic className="w-4 h-4 text-emerald-400" />
              2. Real-Time Mic Input Telemetry
            </h3>
            <span className={`text-xs px-2 py-0.5 rounded-full font-mono font-medium ${
              !isMicActive
                ? 'bg-slate-800 text-slate-400'
                : metrics.isClipping
                ? 'bg-rose-900/60 text-rose-300'
                : isHealthyLevel
                ? 'bg-emerald-900/60 text-emerald-300'
                : 'bg-amber-900/60 text-amber-300'
            }`}>
              {!isMicActive ? 'Mic Inactive' : metrics.isClipping ? 'Clipping (Too Loud)' : isHealthyLevel ? 'Discord Sweet Spot' : 'Signal Low'}
            </span>
          </div>

          {/* Frequency Visualizer Canvas */}
          <div className="relative h-20 bg-slate-950 rounded-lg overflow-hidden border border-slate-800 flex items-center justify-center">
            <canvas
              ref={canvasRef}
              width={380}
              height={80}
              className="w-full h-full object-cover"
            />
            {!isMicActive && (
              <div className="absolute inset-0 flex items-center justify-center bg-slate-950/70 text-xs text-slate-500">
                Click "Start Mic Test" to view real-time voice frequencies
              </div>
            )}
          </div>

          {/* Decibel VU Meter Bar */}
          <div>
            <div className="flex justify-between text-xs font-mono text-slate-400 mb-1">
              <span>Input Level: {isMicActive ? `${metrics.currentDb} dB` : '-100 dB'}</span>
              <span>Discord Target: -18 to -6 dB</span>
            </div>
            <div className="h-4 bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800 flex">
              <div
                className={`h-full rounded-full transition-all duration-75 ${
                  metrics.isClipping
                    ? 'bg-rose-500'
                    : isHealthyLevel
                    ? 'bg-emerald-500'
                    : 'bg-indigo-500'
                }`}
                style={{
                  width: isMicActive
                    ? `${Math.max(0, Math.min(100, ((metrics.currentDb + 60) / 60) * 100))}%`
                    : '0%'
                }}
              />
            </div>
          </div>

          {/* Diagnostic Assessment Box */}
          <div className="p-3.5 bg-slate-950/80 rounded-lg border border-slate-800/80 text-xs space-y-2">
            <div className="font-semibold text-slate-200 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              Live Hardware &amp; Signal Diagnosis:
            </div>

            {!isMicActive ? (
              <p className="text-slate-400">
                Turn on the microphone and start talking normally while playing competing audio to test if your voice is drowned out or cut by noise gates.
              </p>
            ) : competingType === 'none' ? (
              <p className="text-slate-400">
                Now select <span className="text-indigo-300 font-medium">Party Chatter</span> or <span className="text-indigo-300 font-medium">Music Stream</span> on the left to audition overlapping voice clarity under real channel pressure!
              </p>
            ) : (
              <div className="space-y-1.5">
                <div className="flex items-start gap-2">
                  {isHealthyLevel ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  )}
                  <span className="text-slate-300 leading-snug">
                    {metrics.isClipping
                      ? 'Signal distortion: Your microphone is overloading. Lower input volume in Discord to ~80%.'
                      : isHealthyLevel
                      ? 'Strong vocal presence: Your microphone maintains clarity despite continuous playback audio.'
                      : 'Voice level is soft compared to stream sound: In Discord, uncheck "Automatically determine input sensitivity" and set threshold to -50dB.'}
                  </span>
                </div>
                <div className="text-[11px] text-indigo-300 bg-indigo-950/40 p-2 rounded border border-indigo-900/40">
                  💡 <strong>Discord Truth:</strong> The built-in "Let's Check" sound test in Discord only tests in silence. Under actual call conditions with competing stream sound, Bluetooth headsets switch to telephone profile, ducking voice volume.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
