import React, { useState } from 'react';
import { DISCORD_GOLDEN_RULES } from '../data/hardwareData';
import { CheckSquare, Square, ShieldCheck, HelpCircle } from 'lucide-react';

export const DiscordChecklist: React.FC = () => {
  const [checkedIds, setCheckedIds] = useState<string[]>(['rule-split-device']);

  const toggleCheck = (id: string) => {
    setCheckedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div id="discord-checklist-panel" className="bg-slate-900 border border-slate-800 rounded-xl p-5 md:p-6 text-slate-100 shadow-xl space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-emerald-500/20 text-emerald-400 rounded-md">
              <ShieldCheck className="w-5 h-5" />
            </span>
            <h2 className="text-lg font-semibold text-white">
              Infallible Discord Channel Audio Checklist
            </h2>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Apply these 5 settings in Discord Settings &gt; Voice &amp; Video for indestructible microphone and stream quality.
          </p>
        </div>

        <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-slate-800 text-indigo-300 self-start sm:self-center border border-slate-700">
          {checkedIds.length} of {DISCORD_GOLDEN_RULES.length} Completed
        </span>
      </div>

      <div className="space-y-3">
        {DISCORD_GOLDEN_RULES.map((rule) => {
          const isChecked = checkedIds.includes(rule.id);
          return (
            <div
              key={rule.id}
              onClick={() => toggleCheck(rule.id)}
              className={`p-3.5 rounded-lg border cursor-pointer transition-all flex items-start gap-3.5 ${
                isChecked
                  ? 'border-emerald-500/50 bg-emerald-950/20'
                  : 'border-slate-800 bg-slate-800/40 hover:bg-slate-800/80'
              }`}
            >
              <button
                type="button"
                id={`check-rule-${rule.id}`}
                className="mt-0.5 text-slate-400 hover:text-slate-200"
                aria-label={`Toggle ${rule.title}`}
              >
                {isChecked ? (
                  <CheckSquare className="w-5 h-5 text-emerald-400" />
                ) : (
                  <Square className="w-5 h-5 text-slate-500" />
                )}
              </button>

              <div className="flex-1 text-xs">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className={`font-semibold ${isChecked ? 'text-emerald-300' : 'text-slate-200'}`}>
                    {rule.title}
                  </span>
                  <span
                    className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded ${
                      rule.importance === 'CRITICAL'
                        ? 'bg-rose-950 text-rose-300 border border-rose-800'
                        : rule.importance === 'HIGH'
                        ? 'bg-amber-950 text-amber-300 border border-amber-800'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {rule.importance}
                  </span>
                </div>
                <p className="text-slate-400 leading-relaxed">{rule.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-3.5 bg-slate-950/60 border border-slate-800/80 rounded-lg text-xs text-slate-400 flex items-start gap-2.5">
        <HelpCircle className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
        <div>
          <strong className="text-slate-200">Why Discord's "Let's Check" Test Fails You:</strong> Discord's sound test is executed in isolation when nobody else in channel is speaking and game audio is idle. It creates a false sense of security while Bluetooth headphones silently crash into telephone mode during live voice sessions.
        </div>
      </div>
    </div>
  );
};
