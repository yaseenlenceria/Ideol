import { useMemo, useState } from 'react';
import {
  CheckCircle2,
  Download,
  Edit3,
  Eye,
  FileText,
  Globe,
  LogIn,
  Plus,
  Shield,
  Trash2,
  Users,
} from 'lucide-react';
import { AUTHORS, BLOG_CATEGORIES } from '../data/articlesData';
import { ASSETS } from '../data/kpopData';
import { GROUP_REAL_PHOTOS } from '../data/realPhotos';
import { ADMIN_EMAIL, makeSafeId } from '../lib/firebase';
import { useOrbit } from '../context/OrbitContext';
import { ArticleRecord, ArticleStatus, BlogCategorySlug, Group } from '../types/kpop';

const MEDIA_PRESETS = [
  { label: 'BTS Press Photo', url: GROUP_REAL_PHOTOS.bts },
  { label: 'BLACKPINK Pink Carpet', url: GROUP_REAL_PHOTOS.blackpink },
  { label: 'IVE Red Carpet', url: GROUP_REAL_PHOTOS.ive },
  { label: 'Stray Kids Awards Photo', url: GROUP_REAL_PHOTOS.straykids },
  { label: 'TWICE Group Photo', url: GROUP_REAL_PHOTOS.twice },
  { label: 'SEVENTEEN Carat Land', url: GROUP_REAL_PHOTOS.seventeen },
  { label: 'BABYMONSTER Promo Photo', url: GROUP_REAL_PHOTOS.babymonster },
  { label: 'aespa Event Photo', url: GROUP_REAL_PHOTOS.aespa },
  { label: 'LE SSERAFIM Awards Photo', url: GROUP_REAL_PHOTOS.lesserafim },
  { label: 'ENHYPEN Group Photo', url: GROUP_REAL_PHOTOS.enhypen },
  { label: 'TXT Event Photo', url: GROUP_REAL_PHOTOS.txt },
  { label: 'ATEEZ Group Photo', url: GROUP_REAL_PHOTOS.ateez },
  { label: 'ILLIT Group Photo', url: GROUP_REAL_PHOTOS.illit },
  { label: 'KATSEYE Wango Tango', url: GROUP_REAL_PHOTOS.katseye },
  { label: 'Photocard Binder Flatlay', url: ASSETS.photocardBinder },
  { label: 'Concert Stadium Stage', url: ASSETS.heroStage },
  { label: 'Uploaded KPOPLE Reference', url: '/assets/aistudio/Screenshot_62_291a6897.png' },
  { label: 'BTS World Tour 2026 Banner', url: '/assets/aistudio/bts-world-tour-2026-guide-banner_8993d082.png' },
  { label: 'BTS London Release Banner', url: '/assets/aistudio/bts-arirang-in-london-release-and-pre-order-banner_e2615aa5.png' },
  { label: 'BTS London Member Versions Banner', url: '/assets/aistudio/bts-arirang-in-london-member-versions-banner__1__9f34b050.png' },
  { label: 'BTS Jakarta Banner', url: '/assets/aistudio/bts-jakarta-december-2026-banner_3e828913.png' },
  { label: 'BTS Bangkok Banner', url: '/assets/aistudio/bts-bangkok-concert-guide-banner_85bf5507.png' },
  { label: 'BTS Kaohsiung Banner', url: '/assets/aistudio/bts-taiwan-kaohsiung-concert-guide-banner_0a85c1fd.png' },
  { label: 'ATEEZ GOLDEN HOUR Part.6 Banner', url: '/assets/aistudio/ateez-golden-hour-part-6-banner__2__7bd7e136.png' },
  { label: 'ITZY Chaeryeong Lovesick Banner', url: '/assets/aistudio/itzy-chaeryeong-lovesick-banner__1__33eefd3b.png' },
  { label: 'NCT DREAM DREAM AFTER DREAM Banner', url: '/assets/aistudio/nct-dream-dream-after-dream-banner_04847c9b.png' },
  { label: 'TXT PERFECT STORM 2026 Banner', url: '/assets/aistudio/txt-perfect-storm-2026-banner_d1d8f92f.png' },
];

export function AdminCmsPage() {
  const {
    user,
    isAdmin,
    handleSignIn,
    adminArticles,
    articles,
    groups,
    idols,
    siteSettings,
    saveCmsArticle,
    removeCmsArticle,
    saveCmsGroup,
    saveCmsIdol,
    saveSiteSeoSettings,
    showToast,
  } = useOrbit();

  const [tab, setTab] = useState<'articles' | 'directories' | 'seo'>('articles');
  const [statusFilter, setStatusFilter] = useState<'all' | ArticleStatus>('all');
  const [previewMode, setPreviewMode] = useState(false);

  // Article Editor State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isNewArticle, setIsNewArticle] = useState(true);
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [categorySlug, setCategorySlug] = useState<BlogCategorySlug>('news');
  const [tagsText, setTagsText] = useState('BTS, Comeback');
  const [authorName, setAuthorName] = useState(AUTHORS[0].name);
  const [authorRole, setAuthorRole] = useState(AUTHORS[0].role);
  const [featuredImage, setFeaturedImage] = useState(ASSETS.heroStage);
  const [featuredImageAlt, setFeaturedImageAlt] = useState('K-pop stadium concert editorial cover');
  const [bodyMarkdown, setBodyMarkdown] = useState('## Key Verified Facts\n\nWrite verified article prose here.');
  const [referencesText, setReferencesText] = useState('Official Agency Announcement');
  const [status, setStatus] = useState<ArticleStatus>('draft');
  const [isFeatured, setIsFeatured] = useState(false);
  const [publishedAtIso, setPublishedAtIso] = useState(() => new Date().toISOString().slice(0, 10));
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDescription, setSeoDescription] = useState('');
  const [canonicalUrl, setCanonicalUrl] = useState('');

  // Directory Form State
  const [grpId, setGrpId] = useState('');
  const [grpName, setGrpName] = useState('');
  const [grpKr, setGrpKr] = useState('');
  const [grpFandom, setGrpFandom] = useState('');
  const [grpAgency, setGrpAgency] = useState('');
  const [grpDebut, setGrpDebut] = useState('2024-01-01');
  const [grpGen, setGrpGen] = useState<Group['generation']>('5th Gen');
  const [grpCount, setGrpCount] = useState(5);
  const [grpSummary, setGrpSummary] = useState('');

  const [idlId, setIdlId] = useState('');
  const [idlStage, setIdlStage] = useState('');
  const [idlFull, setIdlFull] = useState('');
  const [idlGroupId, setIdlGroupId] = useState(groups[0]?.id || 'bts');
  const [idlBirthday, setIdlBirthday] = useState('2004-01-01');
  const [idlNationality, setIdlNationality] = useState('South Korean');
  const [idlFact, setIdlFact] = useState('');

  // Site SEO Form State
  const [siteTitle, setSiteTitle] = useState(
    siteSettings?.siteTitle || 'IdolOrbit – K-pop News, Editorial Guides & Idol Directory'
  );
  const [siteDescription, setSiteDescription] = useState(
    siteSettings?.siteDescription ||
      'Independent K-pop magazine, verified group & idol directory, birthday highlights, KST release guides, and interactive Fan Lab quizzes.'
  );
  const [robotsTxt, setRobotsTxt] = useState(
    siteSettings?.robotsTxt || 'User-agent: *\nAllow: /\nDisallow: /admin\n\nSitemap: /sitemap.xml'
  );
  const [allowIndexing, setAllowIndexing] = useState(siteSettings?.allowIndexing ?? true);

  const generatedSitemapXml = useMemo(() => {
    const origin = window.location.origin;
    const urls = [
      '/',
      '/groups',
      '/idols',
      '/fan-lab',
      ...BLOG_CATEGORIES.map((c) => `/category/${c.slug}`),
      ...articles.map((a) => `/article/${a.slug}`),
      ...groups.map((g) => `/group/${g.id}`),
      ...idols.map((i) => `/idol/${i.id}`),
    ];
    return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
      .map((u) => `  <url><loc>${origin}${u}</loc></url>`)
      .join('\n')}\n</urlset>`;
  }, [articles, groups, idols]);

  if (!user || !isAdmin) {
    return (
      <div className="max-w-xl mx-auto my-10 rounded-3xl bg-white dark:bg-[#201148] border border-violet-200 dark:border-violet-300/20 p-8 text-center space-y-5">
        <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-[#8B5CF6] to-[#FF4DA6] flex items-center justify-center text-white">
          <Shield className="w-7 h-7" />
        </div>
        <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-[#170B35] dark:text-white">
          IdolOrbit Editorial CMS
        </h1>
        <p className="text-sm text-slate-600 dark:text-violet-200/80 leading-relaxed">
          Private publishing studio for managing articles, drafts, scheduled stories, SEO metadata, XML sitemaps, and verified group/idol directories.
        </p>
        {!user ? (
          <button
            type="button"
            onClick={handleSignIn}
            className="min-h-[48px] px-6 py-3 rounded-2xl bg-gradient-to-r from-[#8B5CF6] to-[#FF4DA6] text-white text-sm font-semibold inline-flex items-center gap-2"
          >
            <LogIn className="w-4 h-4" />
            <span>Sign In with Admin Google Account</span>
          </button>
        ) : (
          <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-400/30 text-xs text-rose-600 dark:text-rose-200">
            Signed in as <span className="font-mono font-semibold">{user.email}</span>. Admin CMS writes are restricted to verified editor{' '}
            <span className="font-mono font-semibold">{ADMIN_EMAIL}</span>.
          </div>
        )}
      </div>
    );
  }

  const startNewArticle = () => {
    setEditingId(makeSafeId('art'));
    setIsNewArticle(true);
    setTitle('');
    setSlug('');
    setSubtitle('');
    setCategorySlug('news');
    setTagsText('');
    setFeaturedImage(ASSETS.heroStage);
    setFeaturedImageAlt('');
    setBodyMarkdown('## Heading\n\n');
    setReferencesText('');
    setStatus('draft');
    setIsFeatured(false);
    setPublishedAtIso(new Date().toISOString().slice(0, 10));
    setSeoTitle('');
    setSeoDescription('');
    setCanonicalUrl('');
    setPreviewMode(false);
  };

  const loadArticleForEdit = (art: ArticleRecord) => {
    setEditingId(art.id);
    // Built-in articles get saved as new Firestore doc on first edit
    setIsNewArticle(Boolean(art.isBuiltIn));
    setTitle(art.title);
    setSlug(art.slug);
    setSubtitle(art.subtitle);
    setCategorySlug(art.categorySlug);
    setTagsText(art.tags.join(', '));
    setAuthorName(art.authorName);
    setAuthorRole(art.authorRole);
    setFeaturedImage(art.featuredImage);
    setFeaturedImageAlt(art.featuredImageAlt);
    const fallbackMd = art.bodyMarkdown.trim()
      ? art.bodyMarkdown
      : (art.bodyHtml || '')
          .replace(/<h2[^>]*>/gi, '\n\n## ')
          .replace(/<\/h2>/gi, '\n\n')
          .replace(/<h3[^>]*>/gi, '\n\n### ')
          .replace(/<\/h3>/gi, '\n\n')
          .replace(/<li[^>]*>/gi, '\n- ')
          .replace(/<\/(p|tr|div|ul|ol|table)>/gi, '\n\n')
          .replace(/<[^>]+>/g, ' ')
          .replace(/[ \t]+/g, ' ')
          .replace(/\n{3,}/g, '\n\n')
          .trim();
    setBodyMarkdown(fallbackMd);
    setReferencesText(art.references.join('\n'));
    setStatus(art.status);
    setIsFeatured(art.isFeatured);
    setPublishedAtIso(art.publishedAtIso);
    setSeoTitle(art.seoTitle || '');
    setSeoDescription(art.seoDescription || '');
    setCanonicalUrl(art.canonicalUrl || '');
    setPreviewMode(false);
  };

  const handleSaveArticle = async (targetStatus: ArticleStatus) => {
    if (!title.trim() || !bodyMarkdown.trim()) {
      showToast('Title and body content are required', 'error');
      return;
    }
    const finalId = editingId || makeSafeId('art');
    const finalSlug =
      (slug.trim() || title.trim())
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '') || finalId.toLowerCase();

    await saveCmsArticle({
      id: finalId,
      isNew: isNewArticle,
      slug: finalSlug,
      title: title.trim(),
      subtitle: subtitle.trim(),
      categorySlug,
      tags: tagsText.split(',').map((t) => t.trim()).filter(Boolean),
      authorName: authorName.trim() || 'IdolOrbit Editorial',
      authorRole: authorRole.trim() || 'Editor',
      featuredImage: featuredImage.trim() || ASSETS.heroStage,
      featuredImageAlt: featuredImageAlt.trim() || title.trim(),
      bodyMarkdown,
      references: referencesText.split('\n').map((r) => r.trim()).filter(Boolean),
      status: targetStatus,
      isFeatured,
      publishedAtIso,
      seoTitle: seoTitle.trim() || undefined,
      seoDescription: seoDescription.trim() || undefined,
      canonicalUrl: canonicalUrl.trim() || undefined,
    });
    setStatus(targetStatus);
    setIsNewArticle(false);
    setEditingId(finalId);
    setSlug(finalSlug);
  };

  const handleDownloadText = (filename: string, content: string, mime: string) => {
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast(`Downloaded ${filename}`, 'success');
  };

  const visibleAdminArticles = adminArticles.filter(
    (a) => statusFilter === 'all' || a.status === statusFilter
  );

  return (
    <div className="space-y-8 pb-14">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold text-[#FF4DA6] flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5" />
            <span>Authenticated Admin CMS · {user.email}</span>
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-[#170B35] dark:text-white mt-1">
            Editorial Studio &amp; Directory Manager
          </h1>
        </div>

        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-white dark:bg-[#201148] border border-violet-200 dark:border-violet-300/20 self-start">
          {[
            { id: 'articles', label: 'Articles CMS', icon: FileText },
            { id: 'directories', label: 'Groups & Idols', icon: Users },
            { id: 'seo', label: 'SEO & Sitemap', icon: Globe },
          ].map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id as 'articles' | 'directories' | 'seo')}
                className={`min-h-[40px] px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 ${
                  tab === t.id
                    ? 'bg-gradient-to-r from-[#8B5CF6] to-[#FF4DA6] text-white'
                    : 'text-slate-600 dark:text-violet-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* TAB 1: ARTICLES CMS */}
      {tab === 'articles' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Article List */}
          <div className="lg:col-span-5 rounded-3xl bg-white dark:bg-[#201148] border border-violet-200 dark:border-violet-300/18 p-5 space-y-4">
            <div className="flex items-center justify-between gap-2">
              <h2 className="font-display text-lg font-bold text-[#170B35] dark:text-white">
                All Articles ({visibleAdminArticles.length})
              </h2>
              <button
                type="button"
                onClick={startNewArticle}
                className="min-h-[38px] px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#FF4DA6] text-white text-xs font-semibold flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>New Story</span>
              </button>
            </div>

            <div className="flex items-center gap-1.5">
              {(['all', 'published', 'scheduled', 'draft'] as const).map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => setStatusFilter(st)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize ${
                    statusFilter === st
                      ? 'bg-[#170B35] text-white dark:bg-white dark:text-[#170B35]'
                      : 'bg-violet-50 dark:bg-white/8 text-slate-600 dark:text-violet-200'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>

            <div className="space-y-2.5 max-h-[600px] overflow-y-auto pr-1">
              {visibleAdminArticles.map((art) => (
                <div
                  key={art.id}
                  className={`p-3.5 rounded-2xl border transition-colors ${
                    editingId === art.id
                      ? 'border-[#FF4DA6] bg-violet-50 dark:bg-[#281659]'
                      : 'border-violet-200 dark:border-violet-300/14 bg-violet-50/40 dark:bg-[#170B35]/60'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => loadArticleForEdit(art)}
                      className="text-left flex-1 min-w-0"
                    >
                      <p className="text-[11px] font-semibold text-[#8B5CF6] dark:text-pink-300">
                        {art.status.toUpperCase()} {art.isFeatured ? '· FEATURED' : ''}{' '}
                        {art.isBuiltIn ? '· SEED' : ''}
                      </p>
                      <p className="font-display text-sm font-bold text-[#170B35] dark:text-white line-clamp-2 mt-0.5">
                        {art.title}
                      </p>
                    </button>
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={() => loadArticleForEdit(art)}
                        title="Edit"
                        className="p-1.5 rounded-lg hover:bg-violet-200/60 dark:hover:bg-white/10 text-slate-600 dark:text-violet-200"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      {!art.isBuiltIn && (
                        <button
                          type="button"
                          onClick={() => removeCmsArticle(art.id)}
                          title="Delete"
                          className="p-1.5 rounded-lg hover:bg-rose-500/20 text-rose-500 dark:text-rose-300"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Article Editor & Preview */}
          <div className="lg:col-span-7 rounded-3xl bg-white dark:bg-[#201148] border border-violet-200 dark:border-violet-300/18 p-6 space-y-5">
            <div className="flex items-center justify-between gap-3">
              <h2 className="font-display text-xl font-bold text-[#170B35] dark:text-white">
                {isNewArticle ? 'Create / Override Story' : 'Edit Story'}
              </h2>
              <button
                type="button"
                onClick={() => setPreviewMode((p) => !p)}
                className="min-h-[38px] px-3.5 py-1.5 rounded-xl bg-violet-100 dark:bg-white/10 text-xs font-semibold text-[#170B35] dark:text-white flex items-center gap-1.5"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>{previewMode ? 'Back to Editor' : 'Live Preview'}</span>
              </button>
            </div>

            {previewMode ? (
              <div className="space-y-4 p-5 rounded-2xl bg-violet-50/70 dark:bg-[#170B35] border border-violet-200 dark:border-violet-300/15">
                <p className="text-xs font-semibold text-[#FF4DA6]">
                  {categorySlug} · {status.toUpperCase()} · {publishedAtIso}
                </p>
                <h3 className="font-display text-2xl font-extrabold text-[#170B35] dark:text-white">
                  {title || 'Untitled Headline'}
                </h3>
                <p className="text-sm text-slate-600 dark:text-violet-200">{subtitle}</p>
                <img
                  src={featuredImage}
                  alt={featuredImageAlt}
                  className="w-full h-52 object-cover rounded-2xl"
                  referrerPolicy="no-referrer"
                />
                <pre className="whitespace-pre-wrap font-sans text-sm text-slate-700 dark:text-violet-100 leading-relaxed">
                  {bodyMarkdown}
                </pre>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-600 dark:text-violet-200">
                      Headline
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Enter article headline..."
                      className="w-full min-h-[42px] px-3.5 py-2 rounded-xl bg-violet-50/60 dark:bg-[#170B35] border border-violet-200 dark:border-violet-300/20 text-sm text-[#170B35] dark:text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-600 dark:text-violet-200">
                      SEO Slug
                    </label>
                    <input
                      type="text"
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                      placeholder="auto-generated-from-title"
                      className="w-full min-h-[42px] px-3.5 py-2 rounded-xl bg-violet-50/60 dark:bg-[#170B35] border border-violet-200 dark:border-violet-300/20 text-sm text-[#170B35] dark:text-white font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-600 dark:text-violet-200">
                    Subtitle / Deck
                  </label>
                  <input
                    type="text"
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    placeholder="Concise editorial summary..."
                    className="w-full min-h-[42px] px-3.5 py-2 rounded-xl bg-violet-50/60 dark:bg-[#170B35] border border-violet-200 dark:border-violet-300/20 text-sm text-[#170B35] dark:text-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-600 dark:text-violet-200">
                      Category
                    </label>
                    <select
                      value={categorySlug}
                      onChange={(e) => setCategorySlug(e.target.value as BlogCategorySlug)}
                      className="w-full min-h-[42px] px-3 py-2 rounded-xl bg-violet-50/60 dark:bg-[#170B35] border border-violet-200 dark:border-violet-300/20 text-sm text-[#170B35] dark:text-white"
                    >
                      {BLOG_CATEGORIES.map((c) => (
                        <option key={c.slug} value={c.slug}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-600 dark:text-violet-200">
                      Author
                    </label>
                    <select
                      value={authorName}
                      onChange={(e) => {
                        const found = AUTHORS.find((a) => a.name === e.target.value);
                        setAuthorName(e.target.value);
                        if (found) setAuthorRole(found.role);
                      }}
                      className="w-full min-h-[42px] px-3 py-2 rounded-xl bg-violet-50/60 dark:bg-[#170B35] border border-violet-200 dark:border-violet-300/20 text-sm text-[#170B35] dark:text-white"
                    >
                      {AUTHORS.map((a) => (
                        <option key={a.id} value={a.name}>
                          {a.name} ({a.role})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-600 dark:text-violet-200">
                      Publish / Schedule Date
                    </label>
                    <input
                      type="date"
                      value={publishedAtIso}
                      onChange={(e) => setPublishedAtIso(e.target.value)}
                      className="w-full min-h-[42px] px-3 py-2 rounded-xl bg-violet-50/60 dark:bg-[#170B35] border border-violet-200 dark:border-violet-300/20 text-sm text-[#170B35] dark:text-white font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-600 dark:text-violet-200">
                      Featured Image Asset
                    </label>
                    <select
                      value={featuredImage}
                      onChange={(e) => setFeaturedImage(e.target.value)}
                      className="w-full min-h-[42px] px-3 py-2 rounded-xl bg-violet-50/60 dark:bg-[#170B35] border border-violet-200 dark:border-violet-300/20 text-sm text-[#170B35] dark:text-white"
                    >
                      {MEDIA_PRESETS.map((m) => (
                        <option key={m.url} value={m.url}>
                          {m.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-600 dark:text-violet-200">
                      Image Alt Text (SEO)
                    </label>
                    <input
                      type="text"
                      value={featuredImageAlt}
                      onChange={(e) => setFeaturedImageAlt(e.target.value)}
                      className="w-full min-h-[42px] px-3.5 py-2 rounded-xl bg-violet-50/60 dark:bg-[#170B35] border border-violet-200 dark:border-violet-300/20 text-sm text-[#170B35] dark:text-white"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-600 dark:text-violet-200">
                    Article Body (Markdown `## Headings` build Table of Contents automatically)
                  </label>
                  <textarea
                    rows={8}
                    value={bodyMarkdown}
                    onChange={(e) => setBodyMarkdown(e.target.value)}
                    className="w-full p-3.5 rounded-xl bg-violet-50/60 dark:bg-[#170B35] border border-violet-200 dark:border-violet-300/20 text-sm text-[#170B35] dark:text-white font-mono"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-600 dark:text-violet-200">
                      Tags (comma separated)
                    </label>
                    <input
                      type="text"
                      value={tagsText}
                      onChange={(e) => setTagsText(e.target.value)}
                      className="w-full min-h-[42px] px-3.5 py-2 rounded-xl bg-violet-50/60 dark:bg-[#170B35] border border-violet-200 dark:border-violet-300/20 text-sm text-[#170B35] dark:text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-600 dark:text-violet-200">
                      Verified References (one per line)
                    </label>
                    <input
                      type="text"
                      value={referencesText}
                      onChange={(e) => setReferencesText(e.target.value)}
                      className="w-full min-h-[42px] px-3.5 py-2 rounded-xl bg-violet-50/60 dark:bg-[#170B35] border border-violet-200 dark:border-violet-300/20 text-sm text-[#170B35] dark:text-white"
                    />
                  </div>
                </div>

                {/* Editable SEO Fields */}
                <div className="p-4 rounded-2xl bg-violet-50/80 dark:bg-[#170B35]/80 border border-violet-200 dark:border-violet-300/15 space-y-3">
                  <p className="text-xs font-bold text-[#8B5CF6] dark:text-pink-300">
                    Article SEO Overrides
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      value={seoTitle}
                      onChange={(e) => setSeoTitle(e.target.value)}
                      placeholder="Custom Meta Title (optional)"
                      className="min-h-[40px] px-3 py-1.5 rounded-xl bg-white dark:bg-[#201148] border border-violet-200 dark:border-violet-300/20 text-xs text-[#170B35] dark:text-white"
                    />
                    <input
                      type="text"
                      value={canonicalUrl}
                      onChange={(e) => setCanonicalUrl(e.target.value)}
                      placeholder="Canonical URL override (optional)"
                      className="min-h-[40px] px-3 py-1.5 rounded-xl bg-white dark:bg-[#201148] border border-violet-200 dark:border-violet-300/20 text-xs text-[#170B35] dark:text-white"
                    />
                  </div>
                  <input
                    type="text"
                    value={seoDescription}
                    onChange={(e) => setSeoDescription(e.target.value)}
                    placeholder="Custom Meta Description (120–160 chars)"
                    className="w-full min-h-[40px] px-3 py-1.5 rounded-xl bg-white dark:bg-[#201148] border border-violet-200 dark:border-violet-300/20 text-xs text-[#170B35] dark:text-white"
                  />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <label className="inline-flex items-center gap-2 text-xs font-semibold text-[#170B35] dark:text-white cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isFeatured}
                      onChange={(e) => setIsFeatured(e.target.checked)}
                      className="w-4 h-4 accent-[#FF4DA6]"
                    />
                    <span>Feature in Homepage Hero / Spotlight</span>
                  </label>

                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => handleSaveArticle('draft')}
                      className="min-h-[44px] px-4 py-2 rounded-xl bg-violet-100 dark:bg-white/10 text-xs font-semibold text-[#170B35] dark:text-white"
                    >
                      Save Draft
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSaveArticle('scheduled')}
                      className="min-h-[44px] px-4 py-2 rounded-xl bg-amber-500/20 border border-amber-400/40 text-xs font-semibold text-amber-700 dark:text-amber-200"
                    >
                      Schedule
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSaveArticle('published')}
                      className="min-h-[44px] px-5 py-2 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#FF4DA6] text-xs font-semibold text-white flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Publish Live</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: DIRECTORIES CMS */}
      {tab === 'directories' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              await saveCmsGroup({
                id: grpId || grpName.toLowerCase().replace(/[^a-z0-9]+/g, ''),
                name: grpName,
                koreanName: grpKr,
                fandomName: grpFandom,
                agency: grpAgency,
                debutDate: grpDebut,
                generation: grpGen,
                memberCount: grpCount,
                summary: grpSummary,
              });
              setGrpId('');
              setGrpName('');
              setGrpSummary('');
            }}
            className="rounded-3xl bg-white dark:bg-[#201148] border border-violet-200 dark:border-violet-300/18 p-6 space-y-4"
          >
            <h2 className="font-display text-xl font-bold text-[#170B35] dark:text-white">
              Add / Update Group Directory Entry
            </h2>
            <div className="grid grid-cols-2 gap-3">
              <input
                required
                placeholder="Group Name (e.g. NMIXX)"
                value={grpName}
                onChange={(e) => setGrpName(e.target.value)}
                className="min-h-[42px] px-3 py-2 rounded-xl bg-violet-50/60 dark:bg-[#170B35] border border-violet-200 dark:border-violet-300/20 text-sm"
              />
              <input
                placeholder="Korean Name (e.g. 엔믹스)"
                value={grpKr}
                onChange={(e) => setGrpKr(e.target.value)}
                className="min-h-[42px] px-3 py-2 rounded-xl bg-violet-50/60 dark:bg-[#170B35] border border-violet-200 dark:border-violet-300/20 text-sm"
              />
              <input
                required
                placeholder="Fandom Name (e.g. NSWER)"
                value={grpFandom}
                onChange={(e) => setGrpFandom(e.target.value)}
                className="min-h-[42px] px-3 py-2 rounded-xl bg-violet-50/60 dark:bg-[#170B35] border border-violet-200 dark:border-violet-300/20 text-sm"
              />
              <input
                required
                placeholder="Agency (e.g. JYP Entertainment)"
                value={grpAgency}
                onChange={(e) => setGrpAgency(e.target.value)}
                className="min-h-[42px] px-3 py-2 rounded-xl bg-violet-50/60 dark:bg-[#170B35] border border-violet-200 dark:border-violet-300/20 text-sm"
              />
              <input
                required
                type="date"
                value={grpDebut}
                onChange={(e) => setGrpDebut(e.target.value)}
                className="min-h-[42px] px-3 py-2 rounded-xl bg-violet-50/60 dark:bg-[#170B35] border border-violet-200 dark:border-violet-300/20 text-sm font-mono"
              />
              <input
                required
                type="number"
                min={1}
                max={40}
                value={grpCount}
                onChange={(e) => setGrpCount(Number(e.target.value))}
                className="min-h-[42px] px-3 py-2 rounded-xl bg-violet-50/60 dark:bg-[#170B35] border border-violet-200 dark:border-violet-300/20 text-sm font-mono"
              />
            </div>
            <select
              value={grpGen}
              onChange={(e) => setGrpGen(e.target.value as Group['generation'])}
              className="w-full min-h-[42px] px-3 py-2 rounded-xl bg-violet-50/60 dark:bg-[#170B35] border border-violet-200 dark:border-violet-300/20 text-sm"
            >
              <option value="3rd Gen">3rd Gen</option>
              <option value="4th Gen">4th Gen</option>
              <option value="5th Gen">5th Gen</option>
              <option value="Global">Global</option>
            </select>
            <textarea
              required
              rows={3}
              placeholder="Verified summary..."
              value={grpSummary}
              onChange={(e) => setGrpSummary(e.target.value)}
              className="w-full p-3 rounded-xl bg-violet-50/60 dark:bg-[#170B35] border border-violet-200 dark:border-violet-300/20 text-sm"
            />
            <button
              type="submit"
              className="min-h-[44px] px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#FF4DA6] text-white text-sm font-semibold"
            >
              Save Group to Firestore
            </button>
          </form>

          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const selectedGrp = groups.find((g) => g.id === idlGroupId);
              await saveCmsIdol({
                id: idlId || makeSafeId('idol'),
                stageName: idlStage,
                fullName: idlFull,
                groupId: idlGroupId,
                groupName: selectedGrp?.name || idlGroupId,
                birthday: idlBirthday,
                nationality: idlNationality,
                funFact: idlFact,
              });
              setIdlId('');
              setIdlStage('');
              setIdlFull('');
              setIdlFact('');
            }}
            className="rounded-3xl bg-white dark:bg-[#201148] border border-violet-200 dark:border-violet-300/18 p-6 space-y-4"
          >
            <h2 className="font-display text-xl font-bold text-[#170B35] dark:text-white">
              Add / Update Idol Directory Entry
            </h2>
            <div className="grid grid-cols-2 gap-3">
              <input
                required
                placeholder="Stage Name"
                value={idlStage}
                onChange={(e) => setIdlStage(e.target.value)}
                className="min-h-[42px] px-3 py-2 rounded-xl bg-violet-50/60 dark:bg-[#170B35] border border-violet-200 dark:border-violet-300/20 text-sm"
              />
              <input
                required
                placeholder="Verified Full Name"
                value={idlFull}
                onChange={(e) => setIdlFull(e.target.value)}
                className="min-h-[42px] px-3 py-2 rounded-xl bg-violet-50/60 dark:bg-[#170B35] border border-violet-200 dark:border-violet-300/20 text-sm"
              />
              <select
                value={idlGroupId}
                onChange={(e) => setIdlGroupId(e.target.value)}
                className="min-h-[42px] px-3 py-2 rounded-xl bg-violet-50/60 dark:bg-[#170B35] border border-violet-200 dark:border-violet-300/20 text-sm"
              >
                {groups.map((g) => (
                  <option key={g.id} value={g.id}>
                    {g.name}
                  </option>
                ))}
              </select>
              <input
                required
                type="date"
                value={idlBirthday}
                onChange={(e) => setIdlBirthday(e.target.value)}
                className="min-h-[42px] px-3 py-2 rounded-xl bg-violet-50/60 dark:bg-[#170B35] border border-violet-200 dark:border-violet-300/20 text-sm font-mono"
              />
            </div>
            <input
              required
              placeholder="Nationality"
              value={idlNationality}
              onChange={(e) => setIdlNationality(e.target.value)}
              className="w-full min-h-[42px] px-3 py-2 rounded-xl bg-violet-50/60 dark:bg-[#170B35] border border-violet-200 dark:border-violet-300/20 text-sm"
            />
            <textarea
              required
              rows={3}
              placeholder="Verified biography / career highlight..."
              value={idlFact}
              onChange={(e) => setIdlFact(e.target.value)}
              className="w-full p-3 rounded-xl bg-violet-50/60 dark:bg-[#170B35] border border-violet-200 dark:border-violet-300/20 text-sm"
            />
            <button
              type="submit"
              className="min-h-[44px] px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#FF4DA6] text-white text-sm font-semibold"
            >
              Save Idol to Firestore
            </button>
          </form>
        </div>
      )}

      {/* TAB 3: SEO, SITEMAP & ROBOTS */}
      {tab === 'seo' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-3xl bg-white dark:bg-[#201148] border border-violet-200 dark:border-violet-300/18 p-6 space-y-4">
            <h2 className="font-display text-xl font-bold text-[#170B35] dark:text-white">
              Global SEO &amp; Robots Settings
            </h2>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-600 dark:text-violet-200">
                Default Site Title
              </label>
              <input
                type="text"
                value={siteTitle}
                onChange={(e) => setSiteTitle(e.target.value)}
                className="w-full min-h-[42px] px-3.5 py-2 rounded-xl bg-violet-50/60 dark:bg-[#170B35] border border-violet-200 dark:border-violet-300/20 text-sm"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-600 dark:text-violet-200">
                Default Meta Description
              </label>
              <textarea
                rows={3}
                value={siteDescription}
                onChange={(e) => setSiteDescription(e.target.value)}
                className="w-full p-3 rounded-xl bg-violet-50/60 dark:bg-[#170B35] border border-violet-200 dark:border-violet-300/20 text-sm"
              />
            </div>
            <label className="inline-flex items-center gap-2 text-xs font-semibold cursor-pointer">
              <input
                type="checkbox"
                checked={allowIndexing}
                onChange={(e) => setAllowIndexing(e.target.checked)}
                className="w-4 h-4 accent-[#FF4DA6]"
              />
              <span>Allow Search Engine Indexing (`index, follow`)</span>
            </label>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-600 dark:text-violet-200">
                robots.txt Configuration
              </label>
              <textarea
                rows={4}
                value={robotsTxt}
                onChange={(e) => setRobotsTxt(e.target.value)}
                className="w-full p-3 rounded-xl bg-violet-50/60 dark:bg-[#170B35] border border-violet-200 dark:border-violet-300/20 text-xs font-mono"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() =>
                  saveSiteSeoSettings({
                    siteTitle,
                    siteDescription,
                    robotsTxt,
                    allowIndexing,
                  })
                }
                className="min-h-[44px] px-5 py-2 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#FF4DA6] text-white text-xs font-semibold"
              >
                Save Global SEO
              </button>
              <button
                type="button"
                onClick={() => handleDownloadText('robots.txt', robotsTxt, 'text/plain')}
                className="min-h-[44px] px-4 py-2 rounded-xl bg-violet-100 dark:bg-white/10 text-xs font-semibold text-[#170B35] dark:text-white flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download robots.txt</span>
              </button>
            </div>
          </div>

          <div className="rounded-3xl bg-white dark:bg-[#201148] border border-violet-200 dark:border-violet-300/18 p-6 space-y-4">
            <div className="flex items-center justify-between gap-2">
              <h2 className="font-display text-xl font-bold text-[#170B35] dark:text-white">
                Live XML Sitemap Generator
              </h2>
              <button
                type="button"
                onClick={() =>
                  handleDownloadText('sitemap.xml', generatedSitemapXml, 'application/xml')
                }
                className="min-h-[40px] px-4 py-2 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#FF4DA6] text-white text-xs font-semibold flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download sitemap.xml</span>
              </button>
            </div>
            <p className="text-xs text-slate-600 dark:text-violet-200/80">
              Automatically includes all published articles ({articles.length}), group pages ({groups.length}), idol profiles ({idols.length}), and category archives.
            </p>
            <textarea
              readOnly
              rows={14}
              value={generatedSitemapXml}
              className="w-full p-3.5 rounded-xl bg-violet-50/70 dark:bg-[#170B35] border border-violet-200 dark:border-violet-300/20 text-[11px] font-mono text-[#170B35] dark:text-violet-100"
            />
          </div>
        </div>
      )}
    </div>
  );
}
