import { useMemo, useState } from 'react';
import { ArrowLeft, Heart, Music, Search } from 'lucide-react';
import { calculateIdolAge } from '../lib/dateKst';
import { useOrbit } from '../context/OrbitContext';
import { IdolAvatarBadge } from '../components/IdolAvatarBadge';
import { getGroupPhotoUrl } from '../data/realPhotos';

export function GroupsDirectoryPage() {
  const { groups, navigate, isFavorite, toggleFavorite } = useOrbit();
  const [search, setSearch] = useState('');
  const [genFilter, setGenFilter] = useState<string>('all');

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return groups.filter((g) => {
      if (genFilter !== 'all' && g.generation !== genFilter) return false;
      if (!q) return true;
      return (
        g.name.toLowerCase().includes(q) ||
        g.fandomName.toLowerCase().includes(q) ||
        g.agency.toLowerCase().includes(q)
      );
    });
  }, [groups, search, genFilter]);

  return (
    <div className="space-y-8 pb-12">
      <div className="space-y-2">
        <p className="text-xs font-semibold text-[#8B5CF6] dark:text-pink-300">
          Verified Fandom Encyclopedia · {groups.length} Groups
        </p>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-[#170B35] dark:text-white">
          K-pop Groups Directory
        </h1>
        <p className="text-sm text-slate-600 dark:text-violet-200/80 max-w-2xl">
          Browse verified debut dates, agencies, fandom names, discography highlights, and member rosters.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 dark:text-violet-300 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search group, fandom, or agency..."
            className="w-full min-h-[44px] pl-10 pr-4 py-2 rounded-2xl bg-white dark:bg-[#201148] border border-violet-200 dark:border-violet-300/20 text-sm text-[#170B35] dark:text-white"
          />
        </div>

        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-white dark:bg-[#201148] border border-violet-200 dark:border-violet-300/18 self-start overflow-x-auto no-scrollbar max-w-full">
          {['all', '2nd Gen', '3rd Gen', '4th Gen', '5th Gen', 'Global'].map((gen) => (
            <button
              key={gen}
              type="button"
              onClick={() => setGenFilter(gen)}
              className={`min-h-[38px] px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap shrink-0 ${
                genFilter === gen
                  ? 'bg-gradient-to-r from-[#8B5CF6] to-[#FF4DA6] text-white'
                  : 'text-slate-600 dark:text-violet-200/80'
              }`}
            >
              {gen === 'all' ? 'All' : gen}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((g) => {
          const fav = isFavorite('group', g.id);
          const groupPhoto = getGroupPhotoUrl(g.id, g.photoUrl);
          return (
            <div
              key={g.id}
              className="rounded-3xl bg-white dark:bg-[#201148] border border-violet-200 dark:border-violet-300/16 overflow-hidden flex flex-col justify-between"
            >
              <div>
                {groupPhoto && (
                  <button
                    type="button"
                    onClick={() => navigate(`/group/${g.id}`)}
                    className="block w-full h-44 bg-[#170B35] overflow-hidden text-left group"
                  >
                    <img
                      src={groupPhoto}
                      alt={`${g.name} members`}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                    />
                  </button>
                )}
                <div className="p-6 pb-4">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <button
                        type="button"
                        onClick={() => navigate(`/group/${g.id}`)}
                        className="font-display text-2xl font-bold text-[#170B35] dark:text-white hover:text-[#8B5CF6] dark:hover:text-pink-200 text-left"
                      >
                        {g.name}
                      </button>
                      <p className="text-xs text-slate-500 dark:text-violet-300/75">{g.koreanName}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleFavorite('group', g.id, g.name)}
                      aria-label={`Favorite ${g.name}`}
                      className="p-2 rounded-xl bg-violet-50 dark:bg-white/8 hover:bg-violet-100 dark:hover:bg-white/14"
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          fav ? 'fill-[#FF4DA6] text-[#FF4DA6]' : 'text-slate-400 dark:text-violet-200'
                        }`}
                      />
                    </button>
                  </div>

                  <p className="text-xs font-semibold text-[#8B5CF6] dark:text-pink-300 mt-2">
                    {g.fandomName} · {g.agency} · {g.memberCount} Members
                  </p>
                  <p className="text-sm text-slate-600 dark:text-violet-200/80 mt-2.5 leading-relaxed">
                    {g.summary}
                  </p>
                </div>
              </div>

              <div className="mx-6 mb-6 flex items-center justify-between pt-3 border-t border-violet-100 dark:border-violet-300/12 text-xs">
                <span className="font-mono text-slate-500 dark:text-violet-300/75 tabular-nums">
                  Debut {g.debutDate}
                </span>
                <button
                  type="button"
                  onClick={() => navigate(`/group/${g.id}`)}
                  className="font-semibold text-[#170B35] dark:text-white hover:text-[#FF4DA6]"
                >
                  Open Group Page →
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function GroupDetailPage({ groupId }: { groupId: string }) {
  const { groups, idols, articles, navigate, isFavorite, toggleFavorite } = useOrbit();
  const group = groups.find((g) => g.id === groupId);

  if (!group) {
    return (
      <div className="p-8 rounded-3xl bg-white dark:bg-[#201148] border border-violet-200 dark:border-violet-300/18 text-center space-y-4">
        <p className="font-display text-2xl font-bold text-[#170B35] dark:text-white">
          Group Not Found
        </p>
        <button
          type="button"
          onClick={() => navigate('/groups')}
          className="min-h-[44px] px-5 py-2 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#FF4DA6] text-white text-sm font-semibold"
        >
          Browse Groups Directory
        </button>
      </div>
    );
  }

  const members = idols.filter((i) => i.groupId === group.id);
  const relatedArticles = articles.filter(
    (a) =>
      a.relatedGroupIds?.includes(group.id) ||
      a.tags.some((t) => t.toLowerCase() === group.name.toLowerCase())
  );
  const fav = isFavorite('group', group.id);
  const groupPhoto = getGroupPhotoUrl(group.id, group.photoUrl);

  return (
    <div className="space-y-8 pb-12">
      <button
        type="button"
        onClick={() => navigate('/groups')}
        className="min-h-[40px] px-3 py-1.5 rounded-xl text-sm font-semibold text-slate-600 dark:text-violet-200 hover:text-[#170B35] dark:hover:text-white inline-flex items-center gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>All K-pop Groups</span>
      </button>

      <section className="rounded-3xl bg-white dark:bg-[#201148] border border-violet-200 dark:border-violet-300/20 overflow-hidden">
        {groupPhoto && (
          <div className="relative h-56 sm:h-72 lg:h-80 w-full bg-[#170B35] overflow-hidden">
            <img
              src={groupPhoto}
              alt={`${group.name} group photograph`}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-top"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-[#201148]/80 via-transparent to-transparent"
              aria-hidden="true"
            />
          </div>
        )}
        <div className="p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold text-[#8B5CF6] dark:text-pink-300">
              {group.generation} · {group.agency} · Fandom: {group.fandomName}
            </p>
            <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-[#170B35] dark:text-white mt-1">
              {group.name} <span className="text-xl font-semibold opacity-70">{group.koreanName}</span>
            </h1>
          </div>

          <button
            type="button"
            onClick={() => toggleFavorite('group', group.id, group.name)}
            className="min-h-[44px] px-4 py-2 rounded-2xl bg-violet-100 dark:bg-white/10 text-xs font-semibold text-[#170B35] dark:text-white flex items-center gap-2 self-start"
          >
            <Heart className={`w-4 h-4 ${fav ? 'fill-[#FF4DA6] text-[#FF4DA6]' : ''}`} />
            <span>{fav ? 'Favorited' : 'Favorite Group'}</span>
          </button>
        </div>

        <p className="text-sm sm:text-base text-slate-600 dark:text-violet-100/90 leading-relaxed">
          {group.summary}
        </p>

        {group.statusNote && (
          <p className="text-xs sm:text-sm text-slate-600 dark:text-violet-200/85 bg-violet-50/90 dark:bg-[#170B35]/70 border border-violet-200 dark:border-violet-300/18 rounded-2xl px-4 py-3">
            {group.statusNote}
          </p>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-4 rounded-2xl bg-violet-50/80 dark:bg-[#170B35]/80 border border-violet-200 dark:border-violet-300/15">
            <p className="text-xs text-slate-500 dark:text-violet-300/75">Debut Date</p>
            <p className="font-mono text-base font-bold text-[#170B35] dark:text-white tabular-nums mt-1">
              {group.debutDate}
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-violet-50/80 dark:bg-[#170B35]/80 border border-violet-200 dark:border-violet-300/15">
            <p className="text-xs text-slate-500 dark:text-violet-300/75">Official Fandom</p>
            <p className="font-display text-base font-bold text-[#8B5CF6] dark:text-pink-300 mt-1">
              {group.fandomName}
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-violet-50/80 dark:bg-[#170B35]/80 border border-violet-200 dark:border-violet-300/15">
            <p className="text-xs text-slate-500 dark:text-violet-300/75">Members</p>
            <p className="font-mono text-base font-bold text-[#170B35] dark:text-white tabular-nums mt-1">
              {group.memberCount}
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-violet-50/80 dark:bg-[#170B35]/80 border border-violet-200 dark:border-violet-300/15">
            <p className="text-xs text-slate-500 dark:text-violet-300/75">Lightstick</p>
            <p className="font-display text-base font-bold text-[#170B35] dark:text-white mt-1">
              {group.representativeSymbol}
            </p>
          </div>
        </div>

        {group.notableTracks.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs font-semibold text-slate-500 dark:text-violet-300/80 flex items-center gap-1.5">
              <Music className="w-3.5 h-3.5 text-[#FF4DA6]" />
              <span>Notable Verified Releases</span>
            </p>
            <div className="flex flex-wrap gap-2">
              {group.notableTracks.map((track) => (
                <span
                  key={track}
                  className="px-3 py-1.5 rounded-xl bg-violet-100 dark:bg-white/8 text-xs font-semibold text-[#170B35] dark:text-violet-100"
                >
                  {track}
                </span>
              ))}
            </div>
          </div>
        )}
        </div>
      </section>

      {/* Verified Members Grid */}
      <section className="space-y-4">
        <h2 className="font-display text-2xl font-bold text-[#170B35] dark:text-white">
          Verified Members ({members.length})
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {members.map((idol) => {
            const age = calculateIdolAge(idol.birthday);
            return (
              <button
                key={idol.id}
                type="button"
                onClick={() => navigate(`/idol/${idol.id}`)}
                className="text-left p-4 rounded-2xl bg-white dark:bg-[#201148] border border-violet-200 dark:border-violet-300/16 hover:border-[#FF4DA6] flex items-center gap-3.5 transition-all"
              >
                <IdolAvatarBadge idol={idol} size="md" />
                <div className="min-w-0 flex-1">
                  <p className="font-display text-lg font-bold text-[#170B35] dark:text-white truncate">
                    {idol.stageName}
                  </p>
                  <p className="text-xs text-slate-600 dark:text-violet-200/80 truncate">
                    {idol.fullName} · {idol.legacyDates ? '1990–2017' : `Age ${age.years}`}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-violet-300/70 mt-0.5 truncate">
                    {idol.positions.join(' / ')} · {idol.birthday}
                  </p>
                  <p className="text-[11px] font-semibold text-[#8B5CF6] dark:text-pink-300 mt-1">
                    Profile &amp; 5-Question Quiz →
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Related Editorial Articles */}
      {relatedArticles.length > 0 && (
        <section className="space-y-4">
          <h2 className="font-display text-2xl font-bold text-[#170B35] dark:text-white">
            Related {group.name} Stories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {relatedArticles.map((art) => (
              <button
                key={art.id}
                type="button"
                onClick={() => navigate(`/article/${art.slug}`)}
                className="text-left p-5 rounded-2xl bg-white dark:bg-[#201148] border border-violet-200 dark:border-violet-300/16 hover:border-[#FF4DA6] space-y-2"
              >
                <p className="text-xs font-semibold text-[#8B5CF6] dark:text-pink-300">
                  {art.readingMinutes} min read
                </p>
                <p className="font-display text-base font-bold text-[#170B35] dark:text-white leading-snug">
                  {art.title}
                </p>
              </button>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export function IdolsDirectoryPage() {
  const { idols, groups, navigate, isFavorite, toggleFavorite } = useOrbit();
  const [search, setSearch] = useState('');
  const [groupFilter, setGroupFilter] = useState('all');

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return idols.filter((idol) => {
      if (groupFilter !== 'all' && idol.groupId !== groupFilter) return false;
      if (!q) return true;
      return (
        idol.stageName.toLowerCase().includes(q) ||
        idol.fullName.toLowerCase().includes(q) ||
        idol.groupName.toLowerCase().includes(q) ||
        idol.nationality.toLowerCase().includes(q)
      );
    });
  }, [idols, search, groupFilter]);

  return (
    <div className="space-y-8 pb-12">
      <div className="space-y-2">
        <p className="text-xs font-semibold text-[#8B5CF6] dark:text-pink-300">
          Verified Artist Database · {idols.length} Idols
        </p>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-[#170B35] dark:text-white">
          K-pop Idols Directory
        </h1>
        <p className="text-sm text-slate-600 dark:text-violet-200/80 max-w-2xl">
          Search verified idol profiles for exact calculated ages, researched biographies, birthdates, and an interactive 5-question quiz on every profile.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-3 justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 dark:text-violet-300 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search stage name, real name, group, or nationality..."
            className="w-full min-h-[44px] pl-10 pr-4 py-2 rounded-2xl bg-white dark:bg-[#201148] border border-violet-200 dark:border-violet-300/20 text-sm text-[#170B35] dark:text-white"
          />
        </div>

        <select
          value={groupFilter}
          onChange={(e) => setGroupFilter(e.target.value)}
          aria-label="Filter by group"
          className="min-h-[44px] px-4 py-2 rounded-2xl bg-white dark:bg-[#201148] border border-violet-200 dark:border-violet-300/20 text-sm text-[#170B35] dark:text-white"
        >
          <option value="all">All Groups ({groups.length})</option>
          {groups.map((g) => (
            <option key={g.id} value={g.id}>
              {g.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((idol) => {
          const age = calculateIdolAge(idol.birthday);
          const fav = isFavorite('idol', idol.id);
          return (
            <div
              key={idol.id}
              className="p-4 rounded-2xl bg-white dark:bg-[#201148] border border-violet-200 dark:border-violet-300/16 flex items-center justify-between gap-3"
            >
              <button
                type="button"
                onClick={() => navigate(`/idol/${idol.id}`)}
                className="flex items-center gap-3.5 min-w-0 flex-1 text-left"
              >
                <IdolAvatarBadge idol={idol} size="md" />
                <div className="min-w-0">
                  <p className="font-display text-lg font-bold text-[#170B35] dark:text-white truncate hover:text-[#8B5CF6] dark:hover:text-pink-200">
                    {idol.stageName}
                  </p>
                  <p className="text-xs text-slate-600 dark:text-violet-200/80 truncate">
                    {idol.groupName} · {idol.nationality}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-violet-300/70 font-mono tabular-nums mt-0.5">
                    {idol.legacyDates ? `Memorial 1990–2017 · ${idol.birthday}` : `Age ${age.years} · ${idol.birthday}`}
                  </p>
                  <p className="text-[11px] font-semibold text-[#8B5CF6] dark:text-pink-300 mt-1">
                    View Bio &amp; 5-Question Quiz →
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => toggleFavorite('idol', idol.id, `${idol.stageName} (${idol.groupName})`)}
                aria-label={`Favorite ${idol.stageName}`}
                className="min-h-[40px] min-w-[40px] rounded-xl bg-violet-50 dark:bg-white/8 hover:bg-violet-100 dark:hover:bg-white/14 flex items-center justify-center shrink-0"
              >
                <Heart
                  className={`w-4 h-4 ${
                    fav ? 'fill-[#FF4DA6] text-[#FF4DA6]' : 'text-slate-400 dark:text-violet-200'
                  }`}
                />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
