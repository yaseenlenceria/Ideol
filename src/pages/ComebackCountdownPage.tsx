import { useEffect, useMemo, useState } from 'react';
import { CalendarPlus, Plus, Trash2 } from 'lucide-react';
import { getVerifiedGroupAnniversaries, KPOP_GROUPS } from '../data/kpopData';
import { downloadIcsEvent, getCountdownToKstEvent } from '../lib/dateKst';
import { useOrbit } from '../context/OrbitContext';
import { FanEventType } from '../types/kpop';

export function ComebackCountdownPage() {
  const { customEvents, addFanEvent, removeFanEvent, showToast } = useOrbit();
  const [now, setNow] = useState(() => new Date());
  const [tab, setTab] = useState<'all' | 'custom' | 'anniversary'>('all');

  const [title, setTitle] = useState('');
  const [groupName, setGroupName] = useState(KPOP_GROUPS[0].name);
  const [eventType, setEventType] = useState<FanEventType>('comeback');
  const [dateIso, setDateIso] = useState('2026-12-04');
  const [kstTime, setKstTime] = useState('18:00');
  const [sourceNote, setSourceNote] = useState('');

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const verifiedAnniversaries = useMemo(() => getVerifiedGroupAnniversaries(now), [now]);

  const combined = useMemo(() => {
    const list =
      tab === 'custom'
        ? customEvents
        : tab === 'anniversary'
          ? verifiedAnniversaries
          : [...customEvents, ...verifiedAnniversaries];

    return list
      .map((evt) => ({
        evt,
        countdown: getCountdownToKstEvent(evt.dateIso, evt.kstTime, now),
      }))
      .sort((a, b) => {
        if (a.countdown.isPast && !b.countdown.isPast) return 1;
        if (!a.countdown.isPast && b.countdown.isPast) return -1;
        return a.countdown.totalMs - b.countdown.totalMs;
      });
  }, [tab, customEvents, verifiedAnniversaries, now]);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !dateIso) return;
    await addFanEvent({
      title: title.trim(),
      groupName,
      eventType,
      dateIso,
      kstTime,
      sourceNote: sourceNote.trim() || undefined,
    });
    setTitle('');
    setSourceNote('');
    setTab('all');
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="space-y-2">
        <p className="text-xs font-semibold text-pink-300">
          Verified Debut Anniversaries &amp; User-Tracked Confirmed Releases
        </p>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
          Comeback &amp; Milestone Countdown
        </h1>
        <p className="text-sm text-violet-200/80 max-w-2xl">
          Track verified group debut anniversaries below or log confirmed comeback announcements with exact KST release times.
        </p>
      </div>

      {/* Add Confirmed Release Form */}
      <form
        onSubmit={handleAdd}
        className="rounded-3xl bg-[#201148] border border-violet-300/20 p-5 sm:p-6 space-y-4"
      >
        <p className="text-sm font-semibold text-white flex items-center gap-2">
          <Plus className="w-4 h-4 text-pink-300" />
          <span>Track Confirmed Comeback or Concert Drop</span>
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Release / Event Title"
            className="min-h-[44px] px-3.5 py-2 rounded-xl bg-[#170B35] border border-violet-300/20 text-sm text-white placeholder:text-violet-300/50"
          />
          <select
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            aria-label="Group"
            className="min-h-[44px] px-3.5 py-2 rounded-xl bg-[#170B35] border border-violet-300/20 text-sm text-white"
          >
            {KPOP_GROUPS.map((g) => (
              <option key={g.id} value={g.name}>
                {g.name}
              </option>
            ))}
          </select>
          <select
            value={eventType}
            onChange={(e) => setEventType(e.target.value as FanEventType)}
            aria-label="Event Type"
            className="min-h-[44px] px-3.5 py-2 rounded-xl bg-[#170B35] border border-violet-300/20 text-sm text-white"
          >
            <option value="comeback">Comeback Release</option>
            <option value="concert">Concert / Stream</option>
            <option value="custom">Custom Fan Event</option>
          </select>
          <input
            type="date"
            required
            value={dateIso}
            onChange={(e) => setDateIso(e.target.value)}
            aria-label="KST Date"
            className="min-h-[44px] px-3.5 py-2 rounded-xl bg-[#170B35] border border-violet-300/20 text-sm text-white font-mono"
          />
          <input
            type="time"
            required
            value={kstTime}
            onChange={(e) => setKstTime(e.target.value)}
            aria-label="KST Time"
            className="min-h-[44px] px-3.5 py-2 rounded-xl bg-[#170B35] border border-violet-300/20 text-sm text-white font-mono"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={sourceNote}
            onChange={(e) => setSourceNote(e.target.value)}
            placeholder="Official announcement source note (e.g. Weverse Notice)"
            className="flex-1 min-h-[44px] px-3.5 py-2 rounded-xl bg-[#170B35] border border-violet-300/20 text-sm text-white placeholder:text-violet-300/50"
          />
          <button
            type="submit"
            className="min-h-[44px] px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#FF4DA6] text-white text-sm font-semibold shrink-0"
          >
            Add Countdown
          </button>
        </div>
      </form>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-[#201148] border border-violet-300/15 w-fit">
        {[
          { id: 'all', label: `All (${customEvents.length + verifiedAnniversaries.length})` },
          { id: 'custom', label: `My Tracked Drops (${customEvents.length})` },
          { id: 'anniversary', label: `Verified Anniversaries (${verifiedAnniversaries.length})` },
        ].map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id as 'all' | 'custom' | 'anniversary')}
            className={`min-h-[38px] px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap ${
              tab === t.id
                ? 'bg-gradient-to-r from-[#8B5CF6] to-[#FF4DA6] text-white'
                : 'text-violet-200/80 hover:text-white'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Countdown Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {combined.map(({ evt, countdown }) => (
          <div
            key={evt.id}
            className="p-5 rounded-3xl bg-[#201148] border border-violet-300/16 flex flex-col justify-between gap-4"
          >
            <div>
              <div className="flex items-center justify-between gap-2 text-xs">
                <span className="font-semibold text-pink-300">
                  {evt.groupName} · {evt.isVerifiedBuiltIn ? 'Verified Debut Date' : evt.eventType}
                </span>
                <span className="font-mono text-violet-300/75 tabular-nums">
                  {evt.dateIso} {evt.kstTime} KST
                </span>
              </div>
              <h2 className="font-display text-lg font-bold text-white mt-1.5">{evt.title}</h2>
              {evt.sourceNote && (
                <p className="text-xs text-violet-200/75 mt-1">{evt.sourceNote}</p>
              )}
            </div>

            {countdown.isPast ? (
              <div className="p-3 rounded-2xl bg-[#170B35]/80 text-center text-xs font-semibold text-violet-200">
                Released / Elapsed in KST
              </div>
            ) : (
              <div className="grid grid-cols-4 gap-2 text-center">
                {[
                  { label: 'Days', value: countdown.days },
                  { label: 'Hrs', value: countdown.hours },
                  { label: 'Min', value: countdown.minutes },
                  { label: 'Sec', value: countdown.seconds },
                ].map((unit) => (
                  <div key={unit.label} className="p-2 rounded-xl bg-[#170B35]/85">
                    <p className="font-mono text-lg font-bold text-white tabular-nums leading-none">
                      {String(unit.value).padStart(2, '0')}
                    </p>
                    <p className="text-[10px] text-violet-300/70 mt-1">{unit.label}</p>
                  </div>
                ))}
              </div>
            )}

            <div className="flex items-center justify-between pt-2 border-t border-violet-300/12 text-xs">
              <button
                type="button"
                onClick={() => {
                  downloadIcsEvent(evt.title, evt.dateIso, evt.kstTime, evt.sourceNote || evt.groupName);
                  showToast('Event (.ics) downloaded', 'success');
                }}
                className="text-violet-200 hover:text-white font-semibold inline-flex items-center gap-1"
              >
                <CalendarPlus className="w-3.5 h-3.5" />
                <span>Calendar</span>
              </button>

              {!evt.isVerifiedBuiltIn && (
                <button
                  type="button"
                  onClick={() => removeFanEvent(evt.id)}
                  className="text-rose-300 hover:text-rose-200 font-semibold inline-flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Remove</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
