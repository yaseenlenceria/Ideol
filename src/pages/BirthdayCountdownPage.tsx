import { useEffect, useMemo, useState } from 'react';
import { Cake, Search } from 'lucide-react';
import { KPOP_GROUPS, KPOP_IDOLS } from '../data/kpopData';
import { calculateIdolAge, getKstNowParts, getNextBirthdayKstCountdown } from '../lib/dateKst';
import { useOrbit } from '../context/OrbitContext';
import { IdolAvatarBadge } from '../components/IdolAvatarBadge';

export function BirthdayCountdownPage() {
  const { navigate } = useOrbit();
  const [now, setNow] = useState(() => new Date());
  const [groupFilter, setGroupFilter] = useState('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const kstNow = getKstNowParts(now);

  const countdownList = useMemo(() => {
    const q = search.trim().toLowerCase();
    return KPOP_IDOLS.filter((idol) => {
      if (idol.legacyDates) return false;
      if (groupFilter !== 'all' && idol.groupId !== groupFilter) return false;
      if (!q) return true;
      return (
        idol.stageName.toLowerCase().includes(q) ||
        idol.groupName.toLowerCase().includes(q)
      );
    })
      .map((idol) => ({
        idol,
        age: calculateIdolAge(idol.birthday, now),
        countdown: getNextBirthdayKstCountdown(idol.birthday, now),
      }))
      .sort((a, b) => {
        if (a.countdown.isToday && !b.countdown.isToday) return -1;
        if (!a.countdown.isToday && b.countdown.isToday) return 1;
        return a.countdown.totalMs - b.countdown.totalMs;
      });
  }, [now, groupFilter, search]);

  const todaysBirthdays = countdownList.filter((item) => item.countdown.isToday);

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2">
          <p className="text-xs font-semibold text-pink-300">
            Live Korea Standard Time (KST · UTC+9)
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
            Idol Birthday Countdown
          </h1>
          <p className="text-sm text-violet-200/80">
            Counting down to midnight KST on each verified birthday across {KPOP_GROUPS.length} fandoms.
          </p>
        </div>

        <div className="px-4 py-3 rounded-2xl bg-[#201148] border border-violet-300/20 shrink-0">
          <p className="text-[11px] text-violet-300/75">Current Seoul Clock (KST)</p>
          <p className="font-mono text-lg font-bold text-white tabular-nums">
            {kstNow.year}-{String(kstNow.month).padStart(2, '0')}-{String(kstNow.day).padStart(2, '0')}{' '}
            {String(kstNow.hour).padStart(2, '0')}:{String(kstNow.minute).padStart(2, '0')}:
            {String(kstNow.second).padStart(2, '0')}
          </p>
        </div>
      </div>

      {/* Today's Birthday Spotlight */}
      {todaysBirthdays.length > 0 && (
        <section className="rounded-3xl bg-gradient-to-r from-[#8B5CF6]/28 via-[#24114E] to-[#FF4DA6]/28 border border-pink-400/45 p-6 space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-pink-200">
            <Cake className="w-5 h-5 text-pink-300" />
            <span>Celebrating Today in KST</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {todaysBirthdays.map(({ idol, age }) => (
              <div
                key={idol.id}
                className="p-4 rounded-2xl bg-[#170B35]/85 border border-pink-300/30 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <IdolAvatarBadge idol={idol} size="md" />
                  <div className="min-w-0">
                    <p className="font-display text-xl font-extrabold text-white truncate">
                      Happy Birthday, {idol.stageName}!
                    </p>
                    <p className="text-xs text-violet-200">
                      {idol.groupName} · Turning {age.years} today ({idol.birthday})
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => navigate(`/tool/birthday-card?idol=${idol.id}`)}
                  className="min-h-[44px] px-4 py-2 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#FF4DA6] text-xs font-semibold text-white shrink-0"
                >
                  Make Card
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Search & Group Filter */}
      <div className="space-y-3">
        <div className="relative max-w-md">
          <Search className="w-4 h-4 text-violet-300 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Filter by idol or group..."
            className="w-full min-h-[46px] pl-11 pr-4 py-2.5 rounded-2xl bg-[#201148] border border-violet-300/20 text-sm text-white placeholder:text-violet-300/50"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          <button
            type="button"
            onClick={() => setGroupFilter('all')}
            className={`min-h-[38px] px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap shrink-0 border ${
              groupFilter === 'all'
                ? 'bg-white text-[#170B35] border-white'
                : 'bg-[#201148] text-violet-200 border-violet-300/18'
            }`}
          >
            All Fandoms
          </button>
          {KPOP_GROUPS.map((g) => (
            <button
              key={g.id}
              type="button"
              onClick={() => setGroupFilter(g.id)}
              className={`min-h-[38px] px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap shrink-0 border ${
                groupFilter === g.id
                  ? 'bg-white text-[#170B35] border-white'
                  : 'bg-[#201148] text-violet-200 border-violet-300/18'
              }`}
            >
              {g.name}
            </button>
          ))}
        </div>
      </div>

      {/* Live Countdown Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {countdownList.map(({ idol, age, countdown }) => (
          <div
            key={idol.id}
            className="p-5 rounded-3xl bg-[#201148] border border-violet-300/16 flex flex-col justify-between gap-4"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <IdolAvatarBadge idol={idol} size="sm" />
                <div className="min-w-0">
                  <button
                    type="button"
                    onClick={() => navigate(`/idol/${idol.id}`)}
                    className="font-display text-base font-bold text-white hover:text-pink-200 truncate block text-left"
                  >
                    {idol.stageName}
                  </button>
                  <p className="text-xs text-violet-200/80 truncate">
                    {idol.groupName} · Turning {age.turningAge}
                  </p>
                </div>
              </div>
              <span className="font-mono text-xs text-violet-300/80 tabular-nums shrink-0">
                {age.nextBirthdayDateIso}
              </span>
            </div>

            {countdown.isToday ? (
              <div className="p-3 rounded-2xl bg-pink-500/20 border border-pink-400/40 text-center font-display font-bold text-pink-200">
                Birthday Day in KST!
              </div>
            ) : (
              <div className="grid grid-cols-4 gap-2 text-center">
                {[
                  { label: 'Days', value: countdown.days },
                  { label: 'Hrs', value: countdown.hours },
                  { label: 'Min', value: countdown.minutes },
                  { label: 'Sec', value: countdown.seconds },
                ].map((unit) => (
                  <div key={unit.label} className="p-2 rounded-xl bg-[#170B35]/85 border border-violet-300/10">
                    <p className="font-mono text-lg font-bold text-white tabular-nums leading-none">
                      {String(unit.value).padStart(2, '0')}
                    </p>
                    <p className="text-[10px] text-violet-300/70 mt-1">{unit.label}</p>
                  </div>
                ))}
              </div>
            )}

            <div className="flex items-center justify-between pt-1 text-xs">
              <button
                type="button"
                onClick={() => navigate(`/idol/${idol.id}`)}
                className="text-violet-200 hover:text-white font-medium"
              >
                Full Profile
              </button>
              <button
                type="button"
                onClick={() => navigate(`/tool/birthday-card?idol=${idol.id}`)}
                className="text-pink-300 hover:text-pink-200 font-semibold flex items-center gap-1"
              >
                <Cake className="w-3.5 h-3.5" />
                <span>Create Birthday Card</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
