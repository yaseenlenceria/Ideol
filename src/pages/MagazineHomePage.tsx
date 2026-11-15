import { useMemo, useState } from 'react';
import {
  ArrowRight,
  Bookmark,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Heart,
  Search,
  Sparkles,
} from 'lucide-react';
import { motion } from 'motion/react';
import { BLOG_CATEGORIES } from '../data/articlesData';
import { getVerifiedGroupAnniversaries } from '../data/kpopData';
import { calculateIdolAge, getCountdownToKstEvent } from '../lib/dateKst';
import { useOrbit } from '../context/OrbitContext';
import { IdolAvatarBadge } from '../components/IdolAvatarBadge';
import { getGroupPhotoUrl } from '../data/realPhotos';

const PAGE_SIZE = 6;

export function MagazineHomePage() {
  const {
    articles,
    groups,
    idols,
    customEvents,
    navigate,
    isFavorite,
    toggleFavorite,
  } = useOrbit();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [page, setPage] = useState(1);

  const featuredArticles = useMemo(
    () => articles.filter((a) => a.isFeatured),
    [articles]
  );
  const heroArticle = featuredArticles[0] || articles[0];
  const secondaryFeatured = featuredArticles.slice(1, 3).length > 0
    ? featuredArticles.slice(1, 3)
    : articles.slice(1, 3);

  const allTags = useMemo(() => {
    const set = new Set<string>();
    articles.forEach((a) => a.tags.forEach((t) => set.add(t)));
    return Array.from(set).slice(0, 14);
  }, [articles]);

  const filteredArticles = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return articles.filter((art) => {
      if (selectedCategory !== 'all' && art.categorySlug !== selectedCategory) return false;
      if (selectedTag !== 'all' && !art.tags.includes(selectedTag)) return false;
      if (!q) return true;
      return (
        art.title.toLowerCase().includes(q) ||
        art.subtitle.toLowerCase().includes(q) ||
        art.tags.some((t) => t.toLowerCase().includes(q)) ||
        art.authorName.toLowerCase().includes(q)
      );
    });
  }, [articles, selectedCategory, selectedTag, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredArticles.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pagedArticles = filteredArticles.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const birthdayHighlights = useMemo(() => {
    return [...idols]
      .map((idol) => ({ idol, age: calculateIdolAge(idol.birthday) }))
      .sort((a, b) => a.age.daysUntilNextBirthday - b.age.daysUntilNextBirthday)
      .slice(0, 4);
  }, [idols]);

  const upcomingMilestones = useMemo(() => {
    const combined = [...customEvents, ...getVerifiedGroupAnniversaries()];
    return combined
      .map((evt) => ({ evt, cd: getCountdownToKstEvent(evt.dateIso, evt.kstTime) }))
      .filter((item) => !item.cd.isPast)
      .sort((a, b) => a.cd.totalMs - b.cd.totalMs)
      .slice(0, 3);
  }, [customEvents]);

  const getCategoryName = (slug: string) =>
    BLOG_CATEGORIES.find((c) => c.slug === slug)?.shortName || 'Editorial';

  return (
    <div className="space-y-14 pb-10">
      {/* Split Editorial Hero */}
      {heroArticle && (
        <section className="rounded-3xl bg-white dark:bg-[#201148] border border-violet-200 dark:border-violet-300/18 overflow-hidden shadow-xl shadow-violet-950/10 dark:shadow-purple-950/50">
          <div className="grid lg:grid-cols-12 items-stretch">
            <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#8B5CF6] dark:text-pink-300">
                  <span>Featured Story</span>
                  <span aria-hidden="true">·</span>
                  <span>{getCategoryName(heroArticle.categorySlug)}</span>
                </div>
                <h1 className="font-display text-3xl sm:text-4xl lg:text-[42px] font-extrabold tracking-tight text-[#170B35] dark:text-white leading-[1.12]">
                  {heroArticle.title}
                </h1>
                <p className="text-sm sm:text-base text-slate-600 dark:text-violet-100/85 leading-relaxed">
                  {heroArticle.subtitle}
                </p>
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-violet-300/75">
                  <span className="font-semibold text-[#170B35] dark:text-violet-100">
                    {heroArticle.authorName}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono tabular-nums">{heroArticle.publishedAtIso}</span>
                  <span aria-hidden="true">·</span>
                  <span>{heroArticle.readingMinutes} min read</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => navigate(`/article/${heroArticle.slug}`)}
                  className="min-h-[48px] px-6 py-3 rounded-2xl bg-gradient-to-r from-[#8B5CF6] to-[#FF4DA6] text-white font-semibold text-sm flex items-center gap-2 shadow-lg shadow-pink-500/20 hover:brightness-110 active:scale-[0.98] transition-all"
                >
                  <span>Read Story</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/fan-lab')}
                  className="min-h-[48px] px-5 py-3 rounded-2xl bg-violet-100 dark:bg-white/10 hover:bg-violet-200 dark:hover:bg-white/16 text-[#170B35] dark:text-white font-semibold text-sm flex items-center gap-2 transition-colors"
                >
                  <Sparkles className="w-4 h-4 text-[#8B5CF6] dark:text-pink-300" />
                  <span>Open Fan Lab</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-6 relative min-h-[260px] lg:min-h-[400px] bg-[#170B35]">
              <img
                src={heroArticle.featuredImage}
                alt={heroArticle.featuredImageAlt}
                className="w-full h-full object-cover lg:absolute lg:inset-0"
                referrerPolicy="no-referrer"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-[#170B35]/70 via-transparent to-transparent lg:bg-gradient-to-r lg:from-[#170B35]/30 lg:to-transparent"
                aria-hidden="true"
              />
            </div>
          </div>
        </section>
      )}

      {/* Secondary Trending & Comeback/Birthday Strip */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {secondaryFeatured.map((art) => (
            <button
              key={art.id}
              type="button"
              onClick={() => navigate(`/article/${art.slug}`)}
              className="text-left rounded-3xl bg-white dark:bg-[#201148] border border-violet-200 dark:border-violet-300/16 hover:border-[#FF4DA6] overflow-hidden flex flex-col justify-between transition-all group"
            >
              <div>
                <div className="h-40 overflow-hidden bg-[#170B35]">
                  <img
                    src={art.featuredImage}
                    alt={art.featuredImageAlt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 text-xs text-[#8B5CF6] dark:text-pink-300 font-semibold">
                    <span>{getCategoryName(art.categorySlug)}</span>
                    <span aria-hidden="true">·</span>
                    <span>{art.readingMinutes} min read</span>
                  </div>
                  <h2 className="font-display text-lg font-bold text-[#170B35] dark:text-white mt-1.5 leading-snug group-hover:text-[#8B5CF6] dark:group-hover:text-pink-200">
                    {art.title}
                  </h2>
                </div>
              </div>
              <div className="px-5 pb-4 text-xs text-slate-500 dark:text-violet-300/75 font-mono tabular-nums">
                {art.authorName} · {art.publishedAtIso}
              </div>
            </button>
          ))}
        </div>

        {/* Birthday & Milestone Radar */}
        <div className="lg:col-span-5 rounded-3xl bg-white dark:bg-[#201148] border border-violet-200 dark:border-violet-300/16 p-5 sm:p-6 flex flex-col justify-between gap-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-display text-lg font-bold text-[#170B35] dark:text-white">
                Birthday &amp; Comeback Radar
              </h2>
              <p className="text-xs text-slate-500 dark:text-violet-300/75">
                Live Korea Standard Time (KST) highlights
              </p>
            </div>
            <button
              type="button"
              onClick={() => navigate('/tool/birthday-countdown')}
              className="text-xs font-semibold text-[#8B5CF6] dark:text-pink-300 hover:underline"
            >
              All Timers
            </button>
          </div>

          <div className="space-y-2.5">
            {birthdayHighlights.map(({ idol, age }) => (
              <button
                key={idol.id}
                type="button"
                onClick={() => navigate(`/idol/${idol.id}`)}
                className="w-full text-left p-3 rounded-2xl bg-violet-50/70 dark:bg-[#170B35]/80 hover:bg-violet-100 dark:hover:bg-[#281659] border border-violet-200/80 dark:border-violet-300/12 flex items-center justify-between gap-3 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <IdolAvatarBadge idol={idol} size="sm" />
                  <div className="min-w-0">
                    <p className="font-display text-sm font-bold text-[#170B35] dark:text-white truncate">
                      {idol.stageName} ({idol.groupName})
                    </p>
                    <p className="text-xs text-slate-500 dark:text-violet-300/75">
                      {idol.birthday} · Age {age.years}
                    </p>
                  </div>
                </div>
                <span className="font-mono text-xs font-bold text-[#FF4DA6] tabular-nums shrink-0">
                  {age.isBirthdayToday ? 'TODAY' : `D-${age.daysUntilNextBirthday}`}
                </span>
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-violet-200 dark:border-violet-300/12 space-y-2">
            {upcomingMilestones.slice(0, 2).map(({ evt, cd }) => (
              <button
                key={evt.id}
                type="button"
                onClick={() => navigate('/tool/comeback-countdown')}
                className="w-full text-left flex items-center justify-between text-xs py-1 hover:text-[#8B5CF6] dark:hover:text-pink-200 transition-colors"
              >
                <span className="font-medium text-[#170B35] dark:text-violet-100 truncate pr-2">
                  <Calendar className="w-3.5 h-3.5 inline mr-1.5 text-[#8B5CF6] dark:text-pink-300" />
                  {evt.title}
                </span>
                <span className="font-mono text-slate-500 dark:text-violet-300/75 tabular-nums shrink-0">
                  {cd.days}d left
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Searchable Editorial Grid with Category, Tag & Pagination */}
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#170B35] dark:text-white">
              Latest K-pop Articles &amp; Guides
            </h2>
            <p className="text-sm text-slate-600 dark:text-violet-200/75 mt-1">
              Verified profiles, industry explainers, album timelines, and concert guides.
            </p>
          </div>

          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 dark:text-violet-300 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setPage(1);
              }}
              placeholder="Search articles, groups, or tags..."
              aria-label="Search articles"
              className="w-full min-h-[44px] pl-10 pr-4 py-2 rounded-2xl bg-white dark:bg-[#201148] border border-violet-200 dark:border-violet-300/20 text-sm text-[#170B35] dark:text-white placeholder:text-slate-400 dark:placeholder:text-violet-300/50"
            />
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          <button
            type="button"
            onClick={() => {
              setSelectedCategory('all');
              setPage(1);
            }}
            className={`min-h-[38px] px-4 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap shrink-0 border transition-colors ${
              selectedCategory === 'all'
                ? 'bg-[#170B35] text-white border-[#170B35] dark:bg-white dark:text-[#170B35] dark:border-white'
                : 'bg-white dark:bg-[#201148] text-slate-700 dark:text-violet-200 border-violet-200 dark:border-violet-300/18'
            }`}
          >
            All Categories ({articles.length})
          </button>
          {BLOG_CATEGORIES.map((cat) => (
            <button
              key={cat.slug}
              type="button"
              onClick={() => {
                setSelectedCategory(cat.slug);
                setPage(1);
              }}
              className={`min-h-[38px] px-4 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap shrink-0 border transition-colors ${
                selectedCategory === cat.slug
                  ? 'bg-[#170B35] text-white border-[#170B35] dark:bg-white dark:text-[#170B35] dark:border-white'
                  : 'bg-white dark:bg-[#201148] text-slate-700 dark:text-violet-200 border-violet-200 dark:border-violet-300/18'
              }`}
            >
              {cat.shortName}
            </button>
          ))}
        </div>

        {/* Tag Filter Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setSelectedTag('all');
              setPage(1);
            }}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
              selectedTag === 'all'
                ? 'bg-[#8B5CF6] text-white'
                : 'bg-violet-100 dark:bg-white/8 text-slate-700 dark:text-violet-200 hover:bg-violet-200 dark:hover:bg-white/14'
            }`}
          >
            All Topics
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => {
                setSelectedTag(tag === selectedTag ? 'all' : tag);
                setPage(1);
              }}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                selectedTag === tag
                  ? 'bg-[#FF4DA6] text-white'
                  : 'bg-violet-100 dark:bg-white/8 text-slate-700 dark:text-violet-200 hover:bg-violet-200 dark:hover:bg-white/14'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Article Grid */}
        {pagedArticles.length === 0 ? (
          <div className="rounded-3xl bg-white dark:bg-[#201148] border border-violet-200 dark:border-violet-300/18 p-10 text-center space-y-3">
            <p className="font-display text-lg font-bold text-[#170B35] dark:text-white">
              No articles matched your filters
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedTag('all');
                setPage(1);
              }}
              className="min-h-[44px] px-5 py-2 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#FF4DA6] text-white text-xs font-semibold"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {pagedArticles.map((art, idx) => {
              const saved = isFavorite('article', art.slug);
              return (
                <motion.article
                  key={art.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.18, delay: idx * 0.03 }}
                  className="rounded-3xl bg-white dark:bg-[#201148] border border-violet-200 dark:border-violet-300/16 overflow-hidden flex flex-col justify-between group"
                >
                  <div>
                    <button
                      type="button"
                      onClick={() => navigate(`/article/${art.slug}`)}
                      className="block w-full h-48 overflow-hidden bg-[#170B35] text-left"
                    >
                      <img
                        src={art.featuredImage}
                        alt={art.featuredImageAlt}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                      />
                    </button>
                    <div className="p-5 pb-3">
                      <div className="flex items-center justify-between gap-2 text-xs">
                        <button
                          type="button"
                          onClick={() => navigate(`/category/${art.categorySlug}`)}
                          className="font-semibold text-[#8B5CF6] dark:text-pink-300 hover:underline"
                        >
                          {getCategoryName(art.categorySlug)}
                        </button>
                        <span className="text-slate-500 dark:text-violet-300/75">
                          {art.readingMinutes} min read
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => navigate(`/article/${art.slug}`)}
                        className="text-left block w-full mt-2"
                      >
                        <h3 className="font-display text-xl font-bold text-[#170B35] dark:text-white leading-snug group-hover:text-[#8B5CF6] dark:group-hover:text-pink-200 transition-colors">
                          {art.title}
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-violet-200/80 mt-2 line-clamp-2 leading-relaxed">
                          {art.subtitle}
                        </p>
                      </button>
                    </div>
                  </div>

                  <div className="px-5 pb-5 pt-3 border-t border-violet-100 dark:border-violet-300/12 flex items-center justify-between gap-2 text-xs">
                    <span className="text-slate-500 dark:text-violet-300/75 font-mono tabular-nums">
                      {art.authorName} · {art.publishedAtIso}
                    </span>
                    <button
                      type="button"
                      onClick={() => toggleFavorite('article', art.slug, art.title)}
                      aria-label={saved ? 'Remove bookmark' : 'Bookmark article'}
                      className="min-h-[36px] min-w-[36px] rounded-xl bg-violet-50 dark:bg-white/8 hover:bg-violet-100 dark:hover:bg-white/15 flex items-center justify-center"
                    >
                      <Bookmark
                        className={`w-4 h-4 ${
                          saved ? 'fill-[#FF4DA6] text-[#FF4DA6]' : 'text-slate-500 dark:text-violet-200'
                        }`}
                      />
                    </button>
                  </div>
                </motion.article>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 pt-2">
            <button
              type="button"
              disabled={safePage <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="min-h-[42px] px-4 py-2 rounded-xl bg-white dark:bg-[#201148] border border-violet-200 dark:border-violet-300/20 disabled:opacity-40 text-xs font-semibold text-[#170B35] dark:text-white flex items-center gap-1"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>
            <span className="font-mono text-xs text-slate-600 dark:text-violet-200 px-3 tabular-nums">
              Page {safePage} of {totalPages}
            </span>
            <button
              type="button"
              disabled={safePage >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="min-h-[42px] px-4 py-2 rounded-xl bg-white dark:bg-[#201148] border border-violet-200 dark:border-violet-300/20 disabled:opacity-40 text-xs font-semibold text-[#170B35] dark:text-white flex items-center gap-1"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </section>

      {/* Popular Groups Directory Spotlight */}
      <section className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#170B35] dark:text-white">
              Popular K-pop Groups Directory
            </h2>
            <p className="text-sm text-slate-600 dark:text-violet-200/75 mt-1">
              Verified member rosters, debut dates, agencies, and official fandom names.
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate('/groups')}
            className="min-h-[42px] px-4 py-2 rounded-xl bg-violet-100 dark:bg-white/10 hover:bg-violet-200 dark:hover:bg-white/15 text-xs font-semibold text-[#170B35] dark:text-white self-start sm:self-auto"
          >
            View All {groups.length} Groups
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {groups.slice(0, 8).map((g) => {
            const fav = isFavorite('group', g.id);
            const groupPhoto = getGroupPhotoUrl(g.id, g.photoUrl);
            return (
              <div
                key={g.id}
                className="rounded-2xl bg-white dark:bg-[#201148] border border-violet-200 dark:border-violet-300/16 overflow-hidden flex flex-col justify-between"
              >
                <div>
                  {groupPhoto && (
                    <button
                      type="button"
                      onClick={() => navigate(`/group/${g.id}`)}
                      className="block w-full h-32 bg-[#170B35] overflow-hidden text-left group"
                    >
                      <img
                        src={groupPhoto}
                        alt={`${g.name} group photo`}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                      />
                    </button>
                  )}
                  <div className="p-4 pb-2">
                    <div className="flex items-start justify-between gap-2">
                      <button
                        type="button"
                        onClick={() => navigate(`/group/${g.id}`)}
                        className="text-left font-display text-lg font-bold text-[#170B35] dark:text-white hover:text-[#8B5CF6] dark:hover:text-pink-200"
                      >
                        {g.name}
                      </button>
                      <button
                        type="button"
                        onClick={() => toggleFavorite('group', g.id, g.name)}
                        aria-label={`Favorite ${g.name}`}
                        className="p-1.5 rounded-lg hover:bg-violet-100 dark:hover:bg-white/10"
                      >
                        <Heart
                          className={`w-4 h-4 ${
                            fav ? 'fill-[#FF4DA6] text-[#FF4DA6]' : 'text-slate-400 dark:text-violet-300'
                          }`}
                        />
                      </button>
                    </div>
                    <p className="text-xs text-[#8B5CF6] dark:text-pink-300 font-semibold">
                      {g.fandomName} · {g.memberCount} Members
                    </p>
                    <p className="text-xs text-slate-600 dark:text-violet-200/75 mt-1.5 line-clamp-2">
                      {g.summary}
                    </p>
                  </div>
                </div>
                <div className="mx-4 mb-4 flex items-center justify-between pt-2 border-t border-violet-100 dark:border-violet-300/12 text-xs">
                  <span className="font-mono text-slate-500 dark:text-violet-300/75 tabular-nums">
                    {g.debutDate}
                  </span>
                  <button
                    type="button"
                    onClick={() => navigate(`/group/${g.id}`)}
                    className="font-semibold text-[#170B35] dark:text-white hover:text-[#FF4DA6]"
                  >
                    Profile →
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
