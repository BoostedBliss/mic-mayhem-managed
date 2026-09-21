import React, { useState } from 'react';
import { audioEngine } from '../utils/audioEngine';
import { Headphones, Radio, Volume2, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

export const CodecComparison: React.FC = () => {
  const [playingMode, setPlayingMode] = useState<'none' | 'a2dp' | 'hfp'>('none');

  const handlePlayDemo = (mode: 'a2dp' | 'hfp') => {
    if (playingMode === mode) {
      audioEngine.stopDemoAudio();
      setPlayingMode('none');
      return;
    }

    setPlayingMode(mode);
    audioEngine.playA2DPvsHFPDemo(mode === 'hfp', () => {
      setPlayingMode('none');
    });
  };

  return (
    <div id="codec-comparison-panel" className="bg-slate-900 border border-slate-800 rounded-xl p-5 md:p-6 text-slate-100 shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-amber-500/20 text-amber-400 rounded-md">
              <Radio className="w-5 h-5" />
            </span>
            <h2 className="text-lg font-semibold text-white">
              The Bluetooth Mic Trap: A2DP vs. Hands-Free Profile (HFP)
            </h2>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Hear why your games, music, and Discord sound collapse whenever you activate your Bluetooth headset's mic.
          </p>
        </div>
      </div>

      {/* Interactive Audible Demo Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* A2DP Card */}
        <div className={`p-4 rounded-xl border transition-all ${
          playingMode === 'a2dp'
            ? 'border-emerald-500 bg-emerald-950/20 ring-1 ring-emerald-500'
            : 'border-slate-800 bg-slate-800/40'
        }`}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="p-1 bg-emerald-500/20 text-emerald-400 rounded">
                <Headphones className="w-4 h-4" />
              </span>
              <h3 className="font-semibold text-slate-100 text-sm">Mode A: Listen-Only (A2DP Stereo)</h3>
            </div>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-800">
              44.1 / 48 kHz
            </span>
          </div>

          <p className="text-xs text-slate-300 mb-4 leading-relaxed">
            Full-spectrum stereo audio. Rich deep bass, crisp highs, zero telephone distortion. This is what you hear when you only listen to YouTube, Spotify, or games without talking.
          </p>

          <button
            id="btn-play-a2dp-demo"
            onClick={() => handlePlayDemo('a2dp')}
            className={`w-full py-2.5 px-4 rounded-lg font-medium text-xs flex items-center justify-center gap-2 transition-colors ${
              playingMode === 'a2dp'
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-slate-700'
            }`}
          >
            <Volume2 className="w-4 h-4" />
            {playingMode === 'a2dp' ? 'Stop Listening' : 'Audition A2DP Pristine Quality'}
          </button>
        </div>

        {/* HFP Card */}
        <div className={`p-4 rounded-xl border transition-all ${
          playingMode === 'hfp'
            ? 'border-rose-500 bg-rose-950/20 ring-1 ring-rose-500'
            : 'border-slate-800 bg-slate-800/40'
        }`}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="p-1 bg-rose-500/20 text-rose-400 rounded">
                <Radio className="w-4 h-4" />
              </span>
              <h3 className="font-semibold text-slate-100 text-sm">Mode B: Headset Mic Engaged (HFP)</h3>
            </div>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-rose-950/80 text-rose-300 border border-rose-800">
              8 / 16 kHz Mono
            </span>
          </div>

          <p className="text-xs text-slate-300 mb-4 leading-relaxed">
            The instant Discord opens your Bluetooth microphone, Bluetooth radio bandwidth collapses. Bass disappears, game audio sounds tinny like an old 1990s telephone handset, and voice cuts out.
          </p>

          <button
            id="btn-play-hfp-demo"
            onClick={() => handlePlayDemo('hfp')}
            className={`w-full py-2.5 px-4 rounded-lg font-medium text-xs flex items-center justify-center gap-2 transition-colors ${
              playingMode === 'hfp'
                ? 'bg-rose-600 text-white'
                : 'bg-slate-800 hover:bg-slate-700 text-rose-300 border border-slate-700'
            }`}
          >
            <Volume2 className="w-4 h-4" />
            {playingMode === 'hfp' ? 'Stop Listening' : 'Audition Muffled HFP Collapse'}
          </button>
        </div>
      </div>

      {/* The Solution Architecture Banner */}
      <div className="p-4 bg-gradient-to-r from-indigo-950/60 to-slate-900 border border-indigo-800/60 rounded-xl">
        <div className="flex items-center gap-2 text-indigo-300 font-semibold text-sm mb-2">
          <ShieldCheck className="w-4 h-4 text-indigo-400" />
          The Infallible "Split-Device" Solution
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          To stop this audio degradation on Discord, <strong>never let Discord touch the Bluetooth microphone</strong>:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3 text-xs">
          <div className="p-3 bg-slate-900/90 rounded-lg border border-slate-800">
            <span className="text-emerald-400 font-semibold block mb-1">🎧 Discord Output Device:</span>
            <span className="text-slate-200">Your Bluetooth Headphone (Stereo A2DP)</span>
            <span className="text-[11px] text-slate-400 block mt-1">Keeps 48kHz rich stereo audio, deep bass, and clean game sound.</span>
          </div>

          <div className="p-3 bg-slate-900/90 rounded-lg border border-slate-800">
            <span className="text-indigo-400 font-semibold block mb-1">🎙️ Discord Input Device:</span>
            <span className="text-slate-200">Laptop Internal Mic, Webcam, or Desk USB Mic</span>
            <span className="text-[11px] text-slate-400 block mt-1">Gives your channel crystal-clear voice without downgrading your headphones!</span>
          </div>
        </div>
      </div>
    </div>
  );
};
