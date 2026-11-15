import { useMemo, useState } from 'react';
import { ArrowRight, Search, Sparkles } from 'lucide-react';
import { BLOG_CATEGORIES } from '../data/articlesData';
import { EXPERIENCES } from '../data/kpopData';
import { useOrbit } from '../context/OrbitContext';
import { BlogCategorySlug } from '../types/kpop';

export function CategoryPage({ slug }: { slug: BlogCategorySlug }) {
  const { articles, navigate } = useOrbit();
  const [search, setSearch] = useState('');

  const category = BLOG_CATEGORIES.find((c) => c.slug === slug) || BLOG_CATEGORIES[0];

  const categoryArticles = useMemo(() => {
    const q = search.trim().toLowerCase();
    return articles.filter((a) => {
      if (a.categorySlug !== slug) return false;
      if (!q) return true;
      return (
        a.title.toLowerCase().includes(q) ||
        a.subtitle.toLowerCase().includes(q) ||
        a.tags.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [articles, slug, search]);

  return (
    <div className="space-y-8 pb-12">
      <div className="space-y-2">
        <p className="text-xs font-semibold text-[#8B5CF6] dark:text-pink-300">
          IdolOrbit Category · {categoryArticles.length} Published Stories
        </p>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-[#170B35] dark:text-white">
          {category.name}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-violet-200/80 max-w-2xl">
          {category.description}
        </p>
      </div>

      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-slate-400 dark:text-violet-300 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={`Search inside ${category.shortName}...`}
          className="w-full min-h-[44px] pl-10 pr-4 py-2 rounded-2xl bg-white dark:bg-[#201148] border border-violet-200 dark:border-violet-300/20 text-sm text-[#170B35] dark:text-white"
        />
      </div>

      {slug === 'quizzes-tools' && (
        <div className="rounded-3xl bg-gradient-to-r from-[#8B5CF6]/15 to-[#FF4DA6]/15 border border-violet-300/35 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold text-[#8B5CF6] dark:text-pink-300 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              <span>Interactive Fan Lab</span>
            </p>
            <h2 className="font-display text-xl font-bold text-[#170B35] dark:text-white mt-1">
              Play {EXPERIENCES.length} Quizzes &amp; K-pop Utilities
            </h2>
          </div>
          <button
            type="button"
            onClick={() => navigate('/fan-lab')}
            className="min-h-[44px] px-5 py-2.5 rounded-2xl bg-gradient-to-r from-[#8B5CF6] to-[#FF4DA6] text-white text-sm font-semibold flex items-center gap-2 self-start sm:self-auto"
          >
            <span>Launch Fan Lab</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {categoryArticles.length === 0 ? (
        <div className="p-8 rounded-3xl bg-white dark:bg-[#201148] border border-violet-200 dark:border-violet-300/18 text-center">
          <p className="text-sm text-slate-600 dark:text-violet-200">
            No articles found in this category matching "{search}".
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {categoryArticles.map((art) => (
            <button
              key={art.id}
              type="button"
              onClick={() => navigate(`/article/${art.slug}`)}
              className="text-left rounded-3xl bg-white dark:bg-[#201148] border border-violet-200 dark:border-violet-300/16 hover:border-[#FF4DA6] overflow-hidden flex flex-col justify-between transition-all group"
            >
              <div>
                <div className="h-44 overflow-hidden bg-[#170B35]">
                  <img
                    src={art.featuredImage}
                    alt={art.featuredImageAlt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-5">
                  <p className="text-xs text-[#8B5CF6] dark:text-pink-300 font-semibold">
                    {art.authorName} · {art.readingMinutes} min read
                  </p>
                  <h2 className="font-display text-xl font-bold text-[#170B35] dark:text-white mt-1.5 leading-snug">
                    {art.title}
                  </h2>
                  <p className="text-sm text-slate-600 dark:text-violet-200/80 mt-2 line-clamp-2">
                    {art.subtitle}
                  </p>
                </div>
              </div>
              <div className="px-5 pb-5 text-xs font-mono text-slate-500 dark:text-violet-300/75">
                Published {art.publishedAtIso}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
