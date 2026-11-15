import { useMemo, useState } from 'react';
import { ArrowRight, Calendar, Clock, Search, Sparkles, Trophy, Users } from 'lucide-react';
import { motion } from 'motion/react';
import { EXPERIENCES, KPOP_GROUPS, KPOP_IDOLS } from '../data/kpopData';
import { GROUP_REAL_PHOTOS, getGroupPhotoUrl } from '../data/realPhotos';
import { calculateIdolAge } from '../lib/dateKst';
import { useOrbit } from '../context/OrbitContext';
import { IdolAvatarBadge } from '../components/IdolAvatarBadge';

export function HomePage() {
  const { navigate } = useOrbit();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGroupId, setSelectedGroupId] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'quiz' | 'tool'>('all');

  const q = searchQuery.trim().toLowerCase();

  const filteredExperiences = useMemo(() => {
    return EXPERIENCES.filter((exp) => {
      if (categoryFilter !== 'all' && exp.category !== categoryFilter) return false;
      if (!q) return true;
      return (
        exp.title.toLowerCase().includes(q) ||
        exp.description.toLowerCase().includes(q) ||
        exp.tagline.toLowerCase().includes(q)
      );
    });
  }, [categoryFilter, q]);

  const filteredGroups = useMemo(() => {
    return KPOP_GROUPS.filter((g) => {
      if (selectedGroupId !== 'all' && g.id !== selectedGroupId) return false;
      if (!q) return true;
      return (
        g.name.toLowerCase().includes(q) ||
        g.fandomName.toLowerCase().includes(q) ||
        g.agency.toLowerCase().includes(q)
      );
    });
  }, [selectedGroupId, q]);

  const featuredIdols = useMemo(() => {
    const pool = KPOP_IDOLS.filter((idol) => {
      if (selectedGroupId !== 'all' && idol.groupId !== selectedGroupId) return false;
      if (!q) return true;
      return (
        idol.stageName.toLowerCase().includes(q) ||
        idol.fullName.toLowerCase().includes(q) ||
        idol.groupName.toLowerCase().includes(q)
      );
    });

    // Prioritize anyone whose birthday is today or soonest upcoming (excluding legacy profiles)
    return [...pool]
      .filter((idol) => !idol.legacyDates)
      .map((idol) => ({ idol, ageInfo: calculateIdolAge(idol.birthday) }))
      .sort((a, b) => a.ageInfo.daysUntilNextBirthday - b.ageInfo.daysUntilNextBirthday)
      .slice(0, 8);
  }, [selectedGroupId, q]);

  const priorityExperiences = EXPERIENCES.filter((e) => e.priority);

  return (
    <div className="space-y-14 pb-10">
      {/* Hero Stage Banner */}
      <section className="relative overflow-hidden rounded-3xl border border-violet-300/18 bg-[#1E0F42] shadow-2xl shadow-purple-950/50">
        <img
          src={GROUP_REAL_PHOTOS.bts}
          alt="K-pop artists live on stage"
          className="absolute inset-0 w-full h-full object-cover object-top opacity-45"
          referrerPolicy="no-referrer"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#170B35]/96 via-[#170B35]/85 to-[#170B35]/60"
          aria-hidden="true"
        />

        {/* Subtle decorative stars */}
        <svg
          className="absolute top-6 right-8 w-8 h-8 text-pink-300/60 animate-twinkle pointer-events-none"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12 1L14.5 9.5L23 12L14.5 14.5L12 23L9.5 14.5L1 12L9.5 9.5L12 1Z" />
        </svg>

        <div className="relative z-10 px-6 py-10 sm:px-10 sm:py-14 lg:py-16 grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-5">
            <p className="text-xs sm:text-sm font-semibold text-pink-300 tracking-wide">
              {KPOP_GROUPS.length} Fandoms · {KPOP_IDOLS.length} Verified Idols · 12 Interactive Quizzes &amp; Fan Tools
            </p>
            <h1 className="font-display text-3xl sm:text-5xl lg:text-[54px] font-extrabold tracking-tight text-white leading-[1.08]">
              Welcome to IdolOrbit Fan Lab 💜
            </h1>
            <p className="text-sm sm:text-base text-violet-100/85 max-w-2xl leading-relaxed">
              Decode your K-pop Fan DNA, challenge friends in verified group trivia, calculate exact idol ages, track live KST birthdays, and organize your photocard binder.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                type="button"
                onClick={() => navigate('/quiz/fan-dna')}
                className="min-h-[48px] px-6 py-3 rounded-2xl bg-gradient-to-r from-[#8B5CF6] to-[#FF4DA6] text-white font-semibold text-sm flex items-center gap-2 shadow-lg shadow-pink-500/25 hover:brightness-110 active:scale-[0.98] transition-all"
              >
                <Sparkles className="w-4 h-4" />
                <span>Take Fan DNA Quiz</span>
              </button>
              <button
                type="button"
                onClick={() => navigate('/tool/birthday-countdown')}
                className="min-h-[48px] px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/16 border border-violet-300/25 text-white font-semibold text-sm flex items-center gap-2 transition-colors"
              >
                <Calendar className="w-4 h-4 text-violet-200" />
                <span>Birthday Timers</span>
              </button>
            </div>
          </div>

          {/* Right Quick Spotlight */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-3">
            {priorityExperiences.map((exp) => (
              <button
                key={exp.slug}
                type="button"
                onClick={() => navigate(exp.path)}
                className="relative overflow-hidden text-left p-4 rounded-2xl bg-[#170B35]/85 hover:bg-[#241252]/95 backdrop-blur-md border border-violet-300/20 hover:border-pink-400/50 transition-all group min-h-[108px] flex flex-col justify-between"
              >
                <img
                  src={exp.imageUrl}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full object-cover object-top opacity-25 group-hover:opacity-35 transition-opacity"
                  referrerPolicy="no-referrer"
                />
                <div className="relative z-10 flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold text-pink-300">
                    {exp.category === 'quiz' ? 'Quiz' : 'Tool'}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-violet-300 group-hover:translate-x-0.5 group-hover:text-pink-300 transition-transform" />
                </div>
                <div className="relative z-10 mt-2">
                  <p className="font-display text-base font-bold text-white leading-snug">
                    {exp.shortTitle}
                  </p>
                  <p className="text-xs text-violet-200/80 mt-0.5 line-clamp-1">{exp.durationOrMode}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Search & Group Filter Bar */}
      <section aria-label="Search and fandom filters" className="space-y-4">
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          <div className="relative flex-1 max-w-xl">
            <Search className="w-4 h-4 text-slate-400 dark:text-violet-300 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search quizzes, tools, idols, or groups (e.g. BTS, IVE, Jake)..."
              aria-label="Search IdolOrbit Fan Lab"
              className="w-full min-h-[48px] pl-11 pr-4 py-2.5 rounded-2xl bg-white dark:bg-[#201148] border border-violet-200 dark:border-violet-300/20 text-sm text-[#170B35] dark:text-white placeholder:text-slate-400 dark:placeholder:text-violet-300/55 focus:border-[#FF4DA6] focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-white dark:bg-[#201148] border border-violet-200 dark:border-violet-300/15 self-start">
            {[
              { id: 'all', label: 'All 12' },
              { id: 'quiz', label: 'Quizzes (6)' },
              { id: 'tool', label: 'Tools (6)' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setCategoryFilter(tab.id as 'all' | 'quiz' | 'tool')}
                className={`min-h-[40px] px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                  categoryFilter === tab.id
                    ? 'bg-gradient-to-r from-[#8B5CF6] to-[#FF4DA6] text-white shadow-sm'
                    : 'text-slate-600 dark:text-violet-200/80 hover:text-[#170B35] dark:hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Horizontal Group Filter Strip */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          <button
            type="button"
            onClick={() => setSelectedGroupId('all')}
            className={`min-h-[40px] px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap shrink-0 border transition-colors ${
              selectedGroupId === 'all'
                ? 'bg-[#170B35] text-white border-[#170B35] dark:bg-white dark:text-[#170B35] dark:border-white'
                : 'bg-white dark:bg-[#201148] text-slate-700 dark:text-violet-200 border-violet-200 dark:border-violet-300/18 hover:border-violet-400'
            }`}
          >
            All Fandoms
          </button>
          {KPOP_GROUPS.map((g) => (
            <button
              key={g.id}
              type="button"
              onClick={() => setSelectedGroupId(g.id)}
              className={`min-h-[40px] px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap shrink-0 border transition-colors ${
                selectedGroupId === g.id
                  ? 'bg-[#170B35] text-white border-[#170B35] dark:bg-white dark:text-[#170B35] dark:border-white'
                  : 'bg-white dark:bg-[#201148] text-slate-700 dark:text-violet-200 border-violet-200 dark:border-violet-300/18 hover:border-violet-400'
              }`}
            >
              {g.name}
            </button>
          ))}
        </div>
      </section>

      {/* All 12 Interactive Experiences */}
      <section className="space-y-5">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#170B35] dark:text-white">
              Quizzes &amp; Interactive Fan Tools
            </h2>
            <p className="text-sm text-slate-600 dark:text-violet-200/75 mt-1">
              Every experience saves results to your session and supports 1080×1920 story card downloads.
            </p>
          </div>
        </div>

        {filteredExperiences.length === 0 ? (
          <div className="rounded-3xl bg-[#201148] border border-violet-300/15 p-8 text-center">
            <p className="text-sm text-violet-200">No experiences matched "{searchQuery}".</p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setCategoryFilter('all');
              }}
              className="mt-3 min-h-[44px] px-5 py-2 rounded-xl bg-white/10 text-xs font-semibold text-white hover:bg-white/15"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {filteredExperiences.map((exp, idx) => (
              <motion.button
                key={exp.slug}
                type="button"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.18, delay: Math.min(idx * 0.02, 0.16) }}
                onClick={() => navigate(exp.path)}
                className="text-left rounded-3xl bg-[#201148]/95 hover:bg-[#281659] border border-violet-300/16 hover:border-pink-400/45 overflow-hidden flex flex-col justify-between transition-all group"
              >
                <div>
                  <div className="relative h-40 w-full overflow-hidden bg-[#170B35]">
                    <img
                      src={exp.imageUrl}
                      alt={exp.title}
                      loading="lazy"
                      className="w-full h-full object-cover object-top opacity-90 group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-[#201148] via-[#201148]/25 to-transparent"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="p-5 pb-3">
                    <div className="flex items-center gap-2 text-xs text-violet-200/75">
                      <span className="text-pink-300 font-semibold">
                        {exp.category === 'quiz' ? 'Interactive Quiz' : 'Fan Tool'}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{exp.durationOrMode}</span>
                    </div>
                    <h3 className="font-display text-lg font-bold text-white mt-1.5 group-hover:text-pink-200 transition-colors">
                      {exp.title}
                    </h3>
                    <p className="text-sm text-violet-200/80 mt-1.5 line-clamp-2 leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                </div>
                <div className="px-5 pb-5 pt-2 flex items-center justify-between text-xs font-semibold text-violet-100">
                  <span>{exp.tagline}</span>
                  <ArrowRight className="w-4 h-4 text-pink-300 group-hover:translate-x-1 transition-transform shrink-0" />
                </div>
              </motion.button>
            ))}
          </div>
        )}
      </section>

      {/* Popular Idols & Upcoming Birthdays */}
      <section className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#170B35] dark:text-white">
              Popular Idols &amp; Next Birthdays
            </h2>
            <p className="text-sm text-slate-600 dark:text-violet-200/75 mt-1">
              Verified birthdates and KST countdowns sorted by upcoming celebration.
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate('/idols')}
            className="min-h-[44px] px-4 py-2 rounded-xl bg-white dark:bg-white/8 hover:bg-violet-100 dark:hover:bg-white/14 border border-violet-200 dark:border-violet-300/20 text-xs font-semibold text-[#170B35] dark:text-white self-start sm:self-auto flex items-center gap-1.5 transition-colors"
          >
            <Users className="w-3.5 h-3.5 text-[#FF4DA6]" />
            <span>Open Full Directory</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredIdols.map(({ idol, ageInfo }) => (
            <button
              key={idol.id}
              type="button"
              onClick={() => navigate(`/idol/${idol.id}`)}
              className="text-left p-4 rounded-2xl bg-[#201148] hover:bg-[#281659] border border-violet-300/16 hover:border-violet-300/40 flex items-center gap-3.5 transition-all"
            >
              <IdolAvatarBadge idol={idol} size="md" />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-display text-base font-bold text-white truncate">
                    {idol.stageName}
                  </p>
                  <span className="font-mono text-xs font-semibold text-pink-300 tabular-nums shrink-0">
                    {ageInfo.isBirthdayToday ? 'TODAY' : `D-${ageInfo.daysUntilNextBirthday}`}
                  </span>
                </div>
                <p className="text-xs text-violet-200/80 truncate">
                  {idol.groupName} · Age {ageInfo.years}
                </p>
                <p className="text-xs text-violet-300/65 mt-0.5 truncate">{idol.birthday}</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Fandom Categories Explorer */}
      <section className="space-y-5">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#170B35] dark:text-white">
              Fandom Directory
            </h2>
            <p className="text-sm text-slate-600 dark:text-violet-200/75 mt-1">
              Tap any group to filter idols or launch group-specific trivia and age lookup.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredGroups.map((group) => {
            const groupPhoto = getGroupPhotoUrl(group.id, group.photoUrl);
            return (
              <div
                key={group.id}
                className="rounded-3xl bg-[#201148]/90 border border-violet-300/15 overflow-hidden flex flex-col justify-between"
              >
                <div>
                  {groupPhoto && (
                    <button
                      type="button"
                      onClick={() => navigate(`/group/${group.id}`)}
                      className="block w-full h-36 bg-[#170B35] overflow-hidden"
                    >
                      <img
                        src={groupPhoto}
                        alt={`${group.name} group`}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-300"
                      />
                    </button>
                  )}
                  <div className="p-5 pb-3">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-display text-xl font-bold text-white">{group.name}</h3>
                      <span className="text-xs font-medium text-violet-200/75">
                        {group.koreanName}
                      </span>
                    </div>
                    <p className="text-xs text-pink-300 mt-1 font-medium">
                      {group.fandomName} · {group.agency} · {group.memberCount} Members
                    </p>
                    <p className="text-sm text-violet-200/80 mt-2.5 leading-relaxed">
                      {group.summary}
                    </p>
                  </div>
                </div>
                <div className="mx-5 mb-5 flex items-center justify-between pt-3 border-t border-violet-300/12 text-xs">
                  <span className="text-violet-300/75 font-mono tabular-nums">
                    Debut {group.debutDate}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => navigate(`/quiz/trivia?group=${group.id}`)}
                      className="min-h-[36px] px-3 py-1.5 rounded-xl bg-white/8 hover:bg-white/15 text-white font-semibold transition-colors"
                    >
                      Trivia
                    </button>
                    <button
                      type="button"
                      onClick={() => navigate(`/tool/age-finder?group=${group.id}`)}
                      className="min-h-[36px] px-3 py-1.5 rounded-xl bg-violet-500/20 hover:bg-violet-500/35 text-violet-100 font-semibold transition-colors"
                    >
                      Members
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
