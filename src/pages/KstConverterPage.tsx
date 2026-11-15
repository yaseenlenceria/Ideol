import { useEffect, useState } from 'react';
import { CalendarPlus, Clock, Copy } from 'lucide-react';
import {
  downloadIcsEvent,
  formatInTimezone,
  getKstNowParts,
  kstDateTimeToUtcMs,
} from '../lib/dateKst';
import { useOrbit } from '../context/OrbitContext';

const WORLD_CITIES = [
  { city: 'Seoul / Tokyo', tz: 'Asia/Seoul' },
  { city: 'Manila / Singapore', tz: 'Asia/Manila' },
  { city: 'Jakarta', tz: 'Asia/Jakarta' },
  { city: 'London', tz: 'Europe/London' },
  { city: 'New York', tz: 'America/New_York' },
  { city: 'Los Angeles', tz: 'America/Los_Angeles' },
];

export function KstConverterPage() {
  const { showToast } = useOrbit();
  const [now, setNow] = useState(() => new Date());
  const kstNow = getKstNowParts(now);

  const defaultDate = `${kstNow.year}-${String(kstNow.month).padStart(2, '0')}-${String(kstNow.day).padStart(2, '0')}`;
  const [eventTitle, setEventTitle] = useState('K-pop Comeback Release');
  const [dateIso, setDateIso] = useState(defaultDate);
  const [kstTime, setKstTime] = useState('18:00');

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const visitorTz = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
  const targetUtcMs = kstDateTimeToUtcMs(dateIso, kstTime);
  const visitorFormatted = formatInTimezone(targetUtcMs, visitorTz);
  const kstFormatted = formatInTimezone(targetUtcMs, 'Asia/Seoul');

  const handleCopySummary = async () => {
    const text = `${eventTitle}: ${kstFormatted.dateLabel} ${kstFormatted.timeLabel} KST = ${visitorFormatted.dayName}, ${visitorFormatted.dateLabel} at ${visitorFormatted.timeLabel} (${visitorTz})`;
    try {
      await navigator.clipboard.writeText(text);
      showToast('Converted time summary copied', 'success');
    } catch {
      showToast('Unable to copy in this browser', 'error');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div className="space-y-2">
        <p className="text-xs font-semibold text-pink-300">
          Korea Standard Time (UTC+9 · No DST)
        </p>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
          KST Time Converter
        </h1>
        <p className="text-sm text-violet-200/80">
          Convert Korean teaser drops, album releases, and livestream times directly to your local timezone.
        </p>
      </div>

      {/* Live Clocks */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-5 rounded-3xl bg-[#201148] border border-violet-300/18">
          <p className="text-xs text-pink-300 font-semibold">Live Seoul Time (KST)</p>
          <p className="font-mono text-2xl sm:text-3xl font-bold text-white tabular-nums mt-1">
            {String(kstNow.hour).padStart(2, '0')}:{String(kstNow.minute).padStart(2, '0')}:
            {String(kstNow.second).padStart(2, '0')}
          </p>
          <p className="text-xs text-violet-200/75 mt-1 font-mono tabular-nums">
            {kstNow.year}-{String(kstNow.month).padStart(2, '0')}-{String(kstNow.day).padStart(2, '0')}
          </p>
        </div>

        <div className="p-5 rounded-3xl bg-[#201148] border border-violet-300/18">
          <p className="text-xs text-violet-300 font-semibold">Your Local Time ({visitorTz})</p>
          <p className="font-mono text-2xl sm:text-3xl font-bold text-white tabular-nums mt-1">
            {now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </p>
          <p className="text-xs text-violet-200/75 mt-1">
            {now.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
          </p>
        </div>
      </div>

      {/* Interactive Converter */}
      <div className="rounded-3xl bg-[#201148] border border-violet-300/20 p-6 sm:p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-violet-200">Event Label</label>
            <input
              type="text"
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
              className="w-full min-h-[46px] px-3.5 py-2 rounded-xl bg-[#170B35] border border-violet-300/20 text-sm text-white"
            />
          </div>
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-violet-200">Korean Date (KST)</label>
            <input
              type="date"
              value={dateIso}
              onChange={(e) => setDateIso(e.target.value)}
              className="w-full min-h-[46px] px-3.5 py-2 rounded-xl bg-[#170B35] border border-violet-300/20 text-sm text-white font-mono"
            />
          </div>
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-violet-200">Korean Time (KST)</label>
            <input
              type="time"
              value={kstTime}
              onChange={(e) => setKstTime(e.target.value)}
              className="w-full min-h-[46px] px-3.5 py-2 rounded-xl bg-[#170B35] border border-violet-300/20 text-sm text-white font-mono"
            />
          </div>
        </div>

        {/* Common K-pop Drop Presets */}
        <div className="flex flex-wrap gap-2">
          {[
            { label: '00:00 KST Teaser', time: '00:00' },
            { label: '12:00 KST Noon Drop', time: '12:00' },
            { label: '14:00 KST Global Release', time: '14:00' },
            { label: '18:00 KST Album Drop', time: '18:00' },
            { label: '20:00 KST Concert Stream', time: '20:00' },
          ].map((preset) => (
            <button
              key={preset.time}
              type="button"
              onClick={() => setKstTime(preset.time)}
              className={`min-h-[38px] px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-colors ${
                kstTime === preset.time
                  ? 'bg-white text-[#170B35] border-white'
                  : 'bg-[#170B35] text-violet-200 border-violet-300/20 hover:border-violet-300/45'
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>

        {/* Converted Result Banner */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-[#8B5CF6]/22 to-[#FF4DA6]/22 border border-pink-400/35 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold text-pink-300">Converted to Your Local Timezone</p>
            <p className="font-display text-2xl sm:text-3xl font-extrabold text-white mt-1 tabular-nums">
              {visitorFormatted.dayName}, {visitorFormatted.dateLabel} · {visitorFormatted.timeLabel}
            </p>
            <p className="text-xs text-violet-200/85 mt-1">
              {visitorTz} (Original: {kstFormatted.dateLabel} {kstTime} KST)
            </p>
          </div>
          <div className="flex flex-wrap gap-2 shrink-0">
            <button
              type="button"
              onClick={handleCopySummary}
              className="min-h-[44px] px-4 py-2 rounded-xl bg-white/10 hover:bg-white/16 text-xs font-semibold text-white flex items-center gap-1.5"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Copy Time</span>
            </button>
            <button
              type="button"
              onClick={() => {
                downloadIcsEvent(eventTitle, dateIso, kstTime, `Converted from ${kstTime} KST via IdolOrbit Fan Lab`);
                showToast('Calendar (.ics) file downloaded', 'success');
              }}
              className="min-h-[44px] px-4 py-2 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#FF4DA6] text-xs font-semibold text-white flex items-center gap-1.5"
            >
              <CalendarPlus className="w-3.5 h-3.5" />
              <span>Add to Calendar</span>
            </button>
          </div>
        </div>
      </div>

      {/* Multi-Timezone Fan Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {WORLD_CITIES.map((w) => {
          const fmt = formatInTimezone(targetUtcMs, w.tz);
          return (
            <div key={w.city} className="p-4 rounded-2xl bg-[#201148] border border-violet-300/15">
              <p className="text-xs text-violet-300/75 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-pink-300" />
                <span>{w.city}</span>
              </p>
              <p className="font-mono text-base font-bold text-white tabular-nums mt-1">
                {fmt.timeLabel}
              </p>
              <p className="text-xs text-violet-200/75 mt-0.5">
                {fmt.dayName}, {fmt.dateLabel}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
