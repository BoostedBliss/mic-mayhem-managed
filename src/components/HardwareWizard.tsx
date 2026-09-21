import React, { useState } from 'react';
import { PLATFORMS, TOP_HEADPHONES_USA, TOP_MOBILE_PHONES_USA } from '../data/hardwareData';
import { PlatformId, HeadphoneInfo, MobileDeviceInfo } from '../types';
import { Monitor, Laptop, Smartphone, Headphones, Check, Sliders, Info, ShieldAlert, Cpu } from 'lucide-react';

export const HardwareWizard: React.FC = () => {
  const [selectedPlatformId, setSelectedPlatformId] = useState<PlatformId>('windows11');
  const [selectedHeadphoneId, setSelectedHeadphoneId] = useState<string>('airpods-pro-2');
  const [selectedMobileId, setSelectedMobileId] = useState<string>('iphone-16-pro');

  const selectedPlatform = PLATFORMS.find((p) => p.id === selectedPlatformId) || PLATFORMS[0];
  const selectedHeadphone = TOP_HEADPHONES_USA.find((h) => h.id === selectedHeadphoneId) || TOP_HEADPHONES_USA[0];
  const selectedMobile = TOP_MOBILE_PHONES_USA.find((m) => m.id === selectedMobileId) || TOP_MOBILE_PHONES_USA[0];

  const getPlatformIcon = (id: PlatformId) => {
    switch (id) {
      case 'windows11':
        return <Monitor className="w-4 h-4" />;
      case 'macos':
        return <Laptop className="w-4 h-4" />;
      case 'ios':
      case 'android':
        return <Smartphone className="w-4 h-4" />;
    }
  };

  return (
    <div id="hardware-wizard-panel" className="bg-slate-900 border border-slate-800 rounded-xl p-5 md:p-6 text-slate-100 shadow-xl space-y-6">
      <div className="border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2">
          <span className="p-1.5 bg-indigo-500/20 text-indigo-400 rounded-md">
            <Sliders className="w-5 h-5" />
          </span>
          <h2 className="text-lg font-semibold text-white">
            Target Hardware &amp; Platform Optimizer
          </h2>
        </div>
        <p className="text-sm text-slate-400 mt-1">
          Pick your operating system or mobile device, plus your specific Bluetooth headphones, for an infallible configuration.
        </p>
      </div>

      {/* 1. Select Platform */}
      <div>
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2">
          Step 1: Choose Your Platform
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {PLATFORMS.map((platform) => {
            const isSelected = platform.id === selectedPlatformId;
            return (
              <button
                key={platform.id}
                id={`btn-platform-${platform.id}`}
                onClick={() => setSelectedPlatformId(platform.id)}
                className={`p-3 rounded-lg border text-left transition-all flex flex-col gap-1.5 ${
                  isSelected
                    ? 'border-indigo-500 bg-indigo-950/40 text-indigo-100 ring-1 ring-indigo-500'
                    : 'border-slate-800 bg-slate-800/40 hover:bg-slate-800/80 text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={isSelected ? 'text-indigo-400' : 'text-slate-400'}>
                      {getPlatformIcon(platform.id)}
                    </span>
                    <span className="text-xs font-semibold">{platform.name}</span>
                  </div>
                  {isSelected && <Check className="w-3.5 h-3.5 text-indigo-400" />}
                </div>
                <span className="text-[11px] text-slate-400 line-clamp-1">{platform.osName}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* If Mobile Platform: Select Mobile Phone */}
      {(selectedPlatformId === 'ios' || selectedPlatformId === 'android') && (
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2">
            Top 10 US Mobile Phone Model ({selectedPlatformId.toUpperCase()})
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {TOP_MOBILE_PHONES_USA.filter(
              (m) => (selectedPlatformId === 'ios' ? m.platform === 'ios' : m.platform === 'android')
            ).map((phone) => {
              const isSelected = phone.id === selectedMobileId;
              return (
                <button
                  key={phone.id}
                  id={`btn-phone-${phone.id}`}
                  onClick={() => setSelectedMobileId(phone.id)}
                  className={`p-3 rounded-lg border text-left text-xs transition-all ${
                    isSelected
                      ? 'border-indigo-500 bg-indigo-950/40 text-indigo-100 ring-1 ring-indigo-500'
                      : 'border-slate-800 bg-slate-800/40 hover:bg-slate-800/80 text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between font-medium mb-1">
                    <span>{phone.name}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-700/60 text-slate-300 font-mono">
                      #{phone.marketShareRankUSA} in US
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 line-clamp-2">{phone.gotchaNote}</p>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* 2. Select Bluetooth Headphone (Top 15 USA) */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Step 2: Select Your Bluetooth Headphones (Top 15 in USA)
          </label>
          <span className="text-[11px] text-slate-400">Ranked by US Market Popularity</span>
        </div>

        <select
          id="select-headphone"
          value={selectedHeadphoneId}
          onChange={(e) => setSelectedHeadphoneId(e.target.value)}
          className="w-full p-2.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-100 text-xs font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        >
          {TOP_HEADPHONES_USA.map((h) => (
            <option key={h.id} value={h.id}>
              #{h.rank} - {h.name} ({h.brand}) - {h.bluetoothVersion}
            </option>
          ))}
        </select>
      </div>

      {/* Detailed Hardware Diagnostic & Custom Setup Card */}
      <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 sm:p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <span className="p-2 bg-indigo-600/20 text-indigo-400 rounded-lg">
              <Headphones className="w-5 h-5" />
            </span>
            <div>
              <h3 className="font-semibold text-white text-sm">
                {selectedHeadphone.name} on {selectedPlatform.name}
              </h3>
              <p className="text-[11px] text-slate-400">
                {selectedHeadphone.bluetoothVersion} • {selectedHeadphone.brand}
              </p>
            </div>
          </div>

          <span
            className={`text-xs px-2.5 py-1 rounded-full font-medium inline-flex items-center gap-1.5 self-start sm:self-center ${
              selectedHeadphone.audioQualityDropSeverity === 'extreme'
                ? 'bg-rose-950/80 text-rose-300 border border-rose-800'
                : selectedHeadphone.audioQualityDropSeverity === 'high'
                ? 'bg-amber-950/80 text-amber-300 border border-amber-800'
                : 'bg-indigo-950/80 text-indigo-300 border border-indigo-800'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            HFP Degrade: {selectedHeadphone.audioQualityDropSeverity.toUpperCase()}
          </span>
        </div>

        {/* Headphone Specific Bottleneck */}
        <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-xs">
          <div className="font-medium text-slate-200 mb-1 flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-amber-400" />
            Hardware Behavior Under Load:
          </div>
          <p className="text-slate-400 leading-relaxed">{selectedHeadphone.hfpBehavior}</p>
        </div>

        {/* Mobile Phone Specific Mic Layout (if mobile) */}
        {(selectedPlatformId === 'ios' || selectedPlatformId === 'android') && (
          <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-xs">
            <div className="font-medium text-slate-200 mb-1 flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-indigo-400" />
              {selectedMobile.name} Mic Layout &amp; Tip:
            </div>
            <p className="text-slate-400 leading-relaxed">
              <strong>Mic Port:</strong> {selectedMobile.micLocations}
            </p>
            <p className="text-indigo-300 mt-1">
              <strong>Gotcha:</strong> {selectedMobile.gotchaNote}
            </p>
          </div>
        )}

        {/* Actionable Fix: Discord & OS Configuration */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
          {/* Discord Settings Steps */}
          <div className="p-3.5 bg-indigo-950/20 border border-indigo-900/50 rounded-lg space-y-2">
            <h4 className="text-xs font-semibold text-indigo-300 uppercase tracking-wide flex items-center gap-1.5">
              <Check className="w-4 h-4 text-indigo-400" />
              Exact Discord Voice Settings:
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {selectedPlatform.discordFixSteps.map((step, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-indigo-400 font-mono text-[10px] mt-0.5">•</span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* OS System Audio Settings Steps */}
          <div className="p-3.5 bg-slate-900 border border-slate-800 rounded-lg space-y-2">
            <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wide flex items-center gap-1.5">
              <Sliders className="w-4 h-4 text-emerald-400" />
              Operating System Fix:
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {selectedPlatform.osAudioFixSteps.map((step, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-emerald-400 font-mono text-[10px] mt-0.5">•</span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
