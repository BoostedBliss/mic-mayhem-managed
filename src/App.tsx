import React, { useState } from 'react';
import { AudioStressTest } from './components/AudioStressTest';
import { CodecComparison } from './components/CodecComparison';
import { HardwareWizard } from './components/HardwareWizard';
import { DiscordChecklist } from './components/DiscordChecklist';
import { Mic, Radio, Sliders, ShieldCheck, Headphones, Volume2 } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'stress' | 'codec' | 'hardware' | 'checklist'>('stress');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-indigo-500 selection:text-white">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/70 backdrop-blur sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Mic className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2">
                Infallible Discord Audio &amp; Mic Optimizer
              </h1>
              <p className="text-xs text-slate-400">
                Fix Bluetooth HFP degradation, overlapping voice ducking, &amp; stream audio drops
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
              Windows 11 &amp; macOS
            </span>
            <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
              Top 10 US Phones
            </span>
            <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-800">
              Top 15 BT Headphones
            </span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex gap-2 border-t border-slate-800/80 overflow-x-auto py-2">
          <button
            id="tab-stress-test"
            onClick={() => setActiveTab('stress')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-colors shrink-0 ${
              activeTab === 'stress'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-900/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Volume2 className="w-4 h-4" />
            Live Audio Stress-Test
          </button>

          <button
            id="tab-codec-compare"
            onClick={() => setActiveTab('codec')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-colors shrink-0 ${
              activeTab === 'codec'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-900/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Radio className="w-4 h-4" />
            Bluetooth HFP vs A2DP Demo
          </button>

          <button
            id="tab-hardware-wizard"
            onClick={() => setActiveTab('hardware')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-colors shrink-0 ${
              activeTab === 'hardware'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-900/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Sliders className="w-4 h-4" />
            Platform &amp; Headphone Fixes
          </button>

          <button
            id="tab-discord-checklist"
            onClick={() => setActiveTab('checklist')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-colors shrink-0 ${
              activeTab === 'checklist'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-900/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            Discord Voice Checklist
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Active Tab Panel */}
        {activeTab === 'stress' && <AudioStressTest />}
        {activeTab === 'codec' && <CodecComparison />}
        {activeTab === 'hardware' && <HardwareWizard />}
        {activeTab === 'checklist' && <DiscordChecklist />}

        {/* Persistent Quick Diagnosis Card at Bottom */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="font-semibold text-indigo-300 flex items-center gap-1.5 mb-1.5">
              <Headphones className="w-4 h-4" /> Why Audio Drops While Speaking
            </span>
            <p className="text-slate-400 leading-relaxed">
              Bluetooth has limited radio bandwidth. Using the Bluetooth microphone cuts audio quality to 16kHz mono (Hands-Free Profile) and drops music or stream volume.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="font-semibold text-emerald-300 flex items-center gap-1.5 mb-1.5">
              <Mic className="w-4 h-4" /> The Infallible Split Setup
            </span>
            <p className="text-slate-400 leading-relaxed">
              Keep Bluetooth headphones strictly for listening (Stereo A2DP). Set Discord Microphone to your laptop or phone built-in mic to keep stream sound clear.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="font-semibold text-amber-300 flex items-center gap-1.5 mb-1.5">
              <Sliders className="w-4 h-4" /> Zero-Ducking Discord Rule
            </span>
            <p className="text-slate-400 leading-relaxed">
              Slide Discord "Attenuation" to 0% and uncheck "When I speak" / "When others speak" so incoming stream sound never ducks when talking.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
