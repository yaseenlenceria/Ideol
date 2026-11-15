import { useEffect, useMemo, useState } from 'react';
import { ArrowLeftRight, Cake, Search } from 'lucide-react';
import { KPOP_GROUPS, KPOP_IDOLS } from '../data/kpopData';
import { calculateAgeAtDate, calculateIdolAge } from '../lib/dateKst';
import { useOrbit } from '../context/OrbitContext';
import { IdolAvatarBadge } from '../components/IdolAvatarBadge';

export function AgeFinderPage() {
  const { navigate } = useOrbit();
  const [search, setSearch] = useState('');
  const [groupFilter, setGroupFilter] = useState('all');
  const [sortBy, setSortBy] = useState<'youngest' | 'oldest' | 'birthday'>('youngest');
  const [compareAId, setCompareAId] = useState(KPOP_IDOLS[0].id);
  const [compareBId, setCompareBId] = useState(KPOP_IDOLS[6].id);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const g = params.get('group');
    if (g && KPOP_GROUPS.some((grp) => grp.id === g)) {
      setGroupFilter(g);
    }
  }, []);

  const filteredIdols = useMemo(() => {
    const q = search.trim().toLowerCase();
    const list = KPOP_IDOLS.filter((idol) => {
      if (groupFilter !== 'all' && idol.groupId !== groupFilter) return false;
      if (!q) return true;
      return (
        idol.stageName.toLowerCase().includes(q) ||
        idol.fullName.toLowerCase().includes(q) ||
        idol.groupName.toLowerCase().includes(q)
      );
    }).map((idol) => {
      const group = KPOP_GROUPS.find((g) => g.id === idol.groupId);
      const age = calculateIdolAge(idol.birthday);
      const debutAge = group ? calculateAgeAtDate(idol.birthday, group.debutDate) : null;
      return { idol, group, age, debutAge };
    });

    if (sortBy === 'youngest') {
      list.sort((a, b) => a.age.totalDaysAlive - b.age.totalDaysAlive);
    } else if (sortBy === 'oldest') {
      list.sort((a, b) => b.age.totalDaysAlive - a.age.totalDaysAlive);
    } else {
      list.sort((a, b) => a.age.daysUntilNextBirthday - b.age.daysUntilNextBirthday);
    }
    return list;
  }, [search, groupFilter, sortBy]);

  const idolA = KPOP_IDOLS.find((i) => i.id === compareAId) || KPOP_IDOLS[0];
  const idolB = KPOP_IDOLS.find((i) => i.id === compareBId) || KPOP_IDOLS[1];
  const ageA = calculateIdolAge(idolA.birthday);
  const ageB = calculateIdolAge(idolB.birthday);
  const diffDays = Math.abs(ageA.totalDaysAlive - ageB.totalDaysAlive);
  const diffYears = Math.floor(diffDays / 365.2425);
  const diffRemMonths = Math.floor((diffDays % 365.2425) / 30.4375);

  return (
    <div className="space-y-8 pb-12">
      <div className="space-y-2">
        <p className="text-xs font-semibold text-pink-300">
          Verified Birthdates · International Standard Age (KST)
        </p>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
          Idol Age Finder
        </h1>
        <p className="text-sm text-violet-200/80 max-w-2xl">
          Search {KPOP_IDOLS.length} verified K-pop artists across {KPOP_GROUPS.length} fandoms. Calculate exact years, months, days, debut ages, and age gaps.
        </p>
      </div>

      {/* Age-Gap Comparison Tool */}
      <section className="rounded-3xl bg-[#201148] border border-violet-300/20 p-5 sm:p-6 space-y-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-white">
          <ArrowLeftRight className="w-4 h-4 text-pink-300" />
          <span>Compare Age Gap Between Two Idols</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
          <select
            value={compareAId}
            onChange={(e) => setCompareAId(e.target.value)}
            aria-label="First idol to compare"
            className="min-h-[46px] px-3.5 py-2.5 rounded-xl bg-[#170B35] border border-violet-300/20 text-sm text-white"
          >
            {KPOP_IDOLS.map((idol) => (
              <option key={idol.id} value={idol.id}>
                {idol.stageName} ({idol.groupName}) · {idol.birthday}
              </option>
            ))}
          </select>

          <div className="p-3.5 rounded-2xl bg-[#170B35]/90 border border-pink-400/30 text-center">
            <p className="font-mono text-lg font-bold text-white tabular-nums">
              {diffYears} yrs, {diffRemMonths} mos apart
            </p>
            <p className="text-xs text-violet-200/75 tabular-nums">
              {diffDays.toLocaleString()} days ·{' '}
              {ageA.totalDaysAlive === ageB.totalDaysAlive
                ? 'Same-day twins!'
                : ageA.totalDaysAlive > ageB.totalDaysAlive
                  ? `${idolA.stageName} is older`
                  : `${idolB.stageName} is older`}
            </p>
          </div>

          <select
            value={compareBId}
            onChange={(e) => setCompareBId(e.target.value)}
            aria-label="Second idol to compare"
            className="min-h-[46px] px-3.5 py-2.5 rounded-xl bg-[#170B35] border border-violet-300/20 text-sm text-white"
          >
            {KPOP_IDOLS.map((idol) => (
              <option key={idol.id} value={idol.id}>
                {idol.stageName} ({idol.groupName}) · {idol.birthday}
              </option>
            ))}
          </select>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="space-y-3">
        <div className="flex flex-col md:flex-row gap-3 justify-between">
          <div className="relative flex-1 max-w-xl">
            <Search className="w-4 h-4 text-violet-300 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search idol stage name, full name, or group..."
              className="w-full min-h-[46px] pl-11 pr-4 py-2.5 rounded-2xl bg-[#201148] border border-violet-300/20 text-sm text-white placeholder:text-violet-300/50"
            />
          </div>

          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-[#201148] border border-violet-300/15 self-start">
            {[
              { id: 'youngest', label: 'Youngest' },
              { id: 'oldest', label: 'Oldest' },
              { id: 'birthday', label: 'Next Birthday' },
            ].map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setSortBy(s.id as 'youngest' | 'oldest' | 'birthday')}
                className={`min-h-[38px] px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap ${
                  sortBy === s.id
                    ? 'bg-gradient-to-r from-[#8B5CF6] to-[#FF4DA6] text-white'
                    : 'text-violet-200/80 hover:text-white'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
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
            All ({KPOP_IDOLS.length})
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
      </section>

      {/* Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredIdols.map(({ idol, age, debutAge }) => (
          <div
            key={idol.id}
            className="p-5 rounded-3xl bg-[#201148] border border-violet-300/16 flex flex-col justify-between gap-4"
          >
            <div className="flex items-start gap-3.5">
              <IdolAvatarBadge idol={idol} size="md" />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => navigate(`/idol/${idol.id}`)}
                    className="font-display text-lg font-bold text-white hover:text-pink-200 truncate text-left"
                  >
                    {idol.stageName}
                  </button>
                  <span className="font-mono text-sm font-bold text-pink-300 tabular-nums shrink-0">
                    {idol.legacyDates ? '1990–2017' : `${age.years} yrs`}
                  </span>
                </div>
                <p className="text-xs text-violet-200/80 truncate">
                  {idol.fullName} · {idol.groupName}
                </p>
                <p className="text-xs text-violet-300/70 mt-0.5 font-mono tabular-nums">
                  Born {idol.birthday} · {idol.zodiac}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center pt-3 border-t border-violet-300/12">
              <div className="p-2 rounded-xl bg-[#170B35]/75">
                <p className="text-[11px] text-violet-300/70">{idol.legacyDates ? 'Legacy' : 'Exact'}</p>
                <p className="font-mono text-xs font-semibold text-white tabular-nums mt-0.5">
                  {idol.legacyDates ? 'Forever 27' : `${age.years}y ${age.months}m ${age.days}d`}
                </p>
              </div>
              <div className="p-2 rounded-xl bg-[#170B35]/75">
                <p className="text-[11px] text-violet-300/70">Debut Age</p>
                <p className="font-mono text-xs font-semibold text-white tabular-nums mt-0.5">
                  {debutAge ?? '—'} yrs
                </p>
              </div>
              <div className="p-2 rounded-xl bg-[#170B35]/75">
                <p className="text-[11px] text-violet-300/70">{idol.legacyDates ? 'Memorial' : 'Next Bday'}</p>
                <p className="font-mono text-xs font-semibold text-pink-300 tabular-nums mt-0.5">
                  {idol.legacyDates
                    ? 'Apr 8'
                    : age.isBirthdayToday
                    ? 'TODAY'
                    : `D-${age.daysUntilNextBirthday}`}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-violet-300/75">
              <span>
                {idol.legacyDates ? idol.legacyDates.label : `Traditional pre-2023 count: ${age.koreanTraditionalAge}`}
              </span>
              <button
                type="button"
                onClick={() => navigate(`/tool/birthday-card?idol=${idol.id}`)}
                className="inline-flex items-center gap-1 text-pink-300 hover:text-pink-200 font-semibold"
              >
                <Cake className="w-3.5 h-3.5" />
                <span>Card</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
