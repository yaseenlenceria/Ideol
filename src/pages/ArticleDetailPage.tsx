import { ReactNode, useMemo, useState } from 'react';
import { Bookmark, Check, ChevronRight, Copy, ExternalLink, Share2 } from 'lucide-react';
import { BLOG_CATEGORIES } from '../data/articlesData';
import { useOrbit } from '../context/OrbitContext';
import { buildShareUrls } from '../lib/shareCard';

interface TocHeading {
  id: string;
  text: string;
}

function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function renderInlineMarkdown(text: string, navigate: (p: string) => void) {
  // Parse markdown links [label](/path) and **bold** and *italic*
  const tokens = text.split(/(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return tokens.map((part, idx) => {
    if (part.startsWith('[') && part.includes('](') && part.endsWith(')')) {
      const splitIdx = part.indexOf('](');
      const label = part.slice(1, splitIdx);
      const href = part.slice(splitIdx + 2, -1);
      if (href.startsWith('/')) {
        return (
          <button
            key={idx}
            type="button"
            onClick={() => navigate(href)}
            className="text-[#8B5CF6] dark:text-[#FF4DA6] font-semibold underline underline-offset-2 hover:brightness-110"
          >
            {label}
          </button>
        );
      }
      return (
        <a
          key={idx}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#8B5CF6] dark:text-[#FF4DA6] font-semibold underline"
        >
          {label}
        </a>
      );
    }
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={idx} className="font-bold text-[#170B35] dark:text-white">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith('*') && part.endsWith('*')) {
      return <em key={idx}>{part.slice(1, -1)}</em>;
    }
    return <span key={idx}>{part}</span>;
  });
}

function renderHtmlNode(node: ChildNode, key: string | number, navigate: (p: string) => void): ReactNode {
  if (node.nodeType === Node.TEXT_NODE) {
    return node.textContent;
  }
  if (node.nodeType !== Node.ELEMENT_NODE) return null;

  const el = node as HTMLElement;
  const tag = el.tagName.toLowerCase();
  const children = Array.from(el.childNodes).map((child, idx) =>
    renderHtmlNode(child, `${key}-${idx}`, navigate)
  );

  switch (tag) {
    case 'h2': {
      const text = (el.textContent || '').trim();
      return (
        <h2
          key={key}
          id={slugifyHeading(text)}
          className="font-display text-2xl sm:text-3xl font-bold text-[#170B35] dark:text-white pt-5 scroll-mt-20"
        >
          {children}
        </h2>
      );
    }
    case 'h3':
      return (
        <h3 key={key} className="font-display text-xl font-bold text-[#170B35] dark:text-white pt-2">
          {children}
        </h3>
      );
    case 'p':
      return <p key={key}>{children}</p>;
    case 'strong':
    case 'b':
      return (
        <strong key={key} className="font-bold text-[#170B35] dark:text-white">
          {children}
        </strong>
      );
    case 'em':
    case 'i':
      return <em key={key}>{children}</em>;
    case 'br':
      return <br key={key} />;
    case 'ul':
      return (
        <ul key={key} className="space-y-2 pl-5 list-disc">
          {children}
        </ul>
      );
    case 'ol':
      return (
        <ol key={key} className="space-y-2 pl-5 list-decimal">
          {children}
        </ol>
      );
    case 'li':
      return <li key={key}>{children}</li>;
    case 'blockquote':
      return (
        <blockquote
          key={key}
          className="pl-4 border-l-4 border-[#FF4DA6] italic text-slate-700 dark:text-violet-100/90 my-3"
        >
          {children}
        </blockquote>
      );
    case 'a': {
      const href = el.getAttribute('href') || '';
      if (href.startsWith('/')) {
        return (
          <button
            key={key}
            type="button"
            onClick={() => navigate(href)}
            className="text-[#8B5CF6] dark:text-[#FF4DA6] font-semibold underline underline-offset-2 hover:brightness-110"
          >
            {children}
          </button>
        );
      }
      return (
        <a
          key={key}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#8B5CF6] dark:text-[#FF4DA6] font-semibold underline underline-offset-2"
        >
          {children}
        </a>
      );
    }
    case 'table':
      return (
        <div
          key={key}
          className="overflow-x-auto rounded-2xl border border-violet-200 dark:border-violet-300/20 bg-white dark:bg-[#170B35]/80 my-4"
        >
          <table className="w-full text-left border-collapse text-sm">{children}</table>
        </div>
      );
    case 'thead':
      return (
        <thead key={key} className="bg-violet-50 dark:bg-[#281659] text-[#170B35] dark:text-white">
          {children}
        </thead>
      );
    case 'tbody':
      return <tbody key={key}>{children}</tbody>;
    case 'tr':
      return (
        <tr key={key} className="border-b border-violet-100 dark:border-violet-300/15 last:border-b-0">
          {children}
        </tr>
      );
    case 'th':
      return (
        <th key={key} className="px-4 py-3 font-display font-bold text-xs uppercase tracking-wider">
          {children}
        </th>
      );
    case 'td':
      return (
        <td key={key} className="px-4 py-3 align-top text-slate-700 dark:text-violet-100/90">
          {children}
        </td>
      );
    default:
      return <span key={key}>{children}</span>;
  }
}

export function ArticleDetailPage({ slug }: { slug: string }) {
  const { articles, groups, navigate, isFavorite, toggleFavorite, showToast } = useOrbit();
  const [copied, setCopied] = useState(false);

  const article = articles.find((a) => a.slug === slug);

  const parsedHtmlDoc = useMemo(() => {
    if (!article?.bodyHtml || typeof DOMParser === 'undefined') return null;
    const parser = new DOMParser();
    return parser.parseFromString(article.bodyHtml, 'text/html');
  }, [article?.bodyHtml]);

  const headings: TocHeading[] = useMemo(() => {
    if (!article) return [];
    if (parsedHtmlDoc) {
      return Array.from(parsedHtmlDoc.body.querySelectorAll('h2')).map((h) => {
        const text = (h.textContent || '').trim();
        return { id: slugifyHeading(text), text };
      });
    }
    return article.bodyMarkdown
      .split('\n')
      .filter((line) => line.startsWith('## '))
      .map((line) => {
        const text = line.replace(/^##\s+/, '').trim();
        return { id: slugifyHeading(text), text };
      });
  }, [article, parsedHtmlDoc]);

  const relatedArticles = useMemo(() => {
    if (!article) return [];
    return articles
      .filter((a) => a.slug !== article.slug)
      .sort((a, b) => {
        const aMatch = a.categorySlug === article.categorySlug ? 1 : 0;
        const bMatch = b.categorySlug === article.categorySlug ? 1 : 0;
        return bMatch - aMatch;
      })
      .slice(0, 3);
  }, [articles, article]);

  if (!article) {
    return (
      <div className="p-8 rounded-3xl bg-white dark:bg-[#201148] border border-violet-200 dark:border-violet-300/20 text-center space-y-4">
        <h1 className="font-display text-2xl font-bold text-[#170B35] dark:text-white">
          Article Not Found
        </h1>
        <button
          type="button"
          onClick={() => navigate('/')}
          className="min-h-[44px] px-5 py-2 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#FF4DA6] text-white text-sm font-semibold"
        >
          Back to IdolOrbit Magazine
        </button>
      </div>
    );
  }

  const category = BLOG_CATEGORIES.find((c) => c.slug === article.categorySlug);
  const saved = isFavorite('article', article.slug);
  const articleUrl = `${window.location.origin}/article/${article.slug}`;
  const shareLinks = buildShareUrls(articleUrl, article.title);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(articleUrl);
      setCopied(true);
      showToast('Article link copied', 'success');
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      showToast('Copy unavailable in this browser', 'error');
    }
  };

  const blocks = article.bodyMarkdown.split('\n\n').map((b) => b.trim()).filter(Boolean);

  return (
    <article className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500 dark:text-violet-300/75">
        <button type="button" onClick={() => navigate('/')} className="hover:text-[#8B5CF6] dark:hover:text-white">
          Home
        </button>
        <ChevronRight className="w-3.5 h-3.5" />
        <button
          type="button"
          onClick={() => navigate(`/category/${article.categorySlug}`)}
          className="hover:text-[#8B5CF6] dark:hover:text-white"
        >
          {category?.name || 'Editorial'}
        </button>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-[#170B35] dark:text-violet-100 font-medium truncate max-w-[240px]">
          {article.title}
        </span>
      </nav>

      {/* Header */}
      <header className="space-y-4">
        <p className="text-xs font-semibold text-[#8B5CF6] dark:text-pink-300">
          {category?.name} · {article.readingMinutes} min read
        </p>
        <h1 className="font-display text-3xl sm:text-4xl lg:text-[44px] font-extrabold tracking-tight text-[#170B35] dark:text-white leading-[1.12]">
          {article.title}
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-violet-200/85 leading-relaxed">
          {article.subtitle}
        </p>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-y border-violet-200 dark:border-violet-300/15 py-3">
          <div className="text-xs text-slate-600 dark:text-violet-200/80">
            <span className="font-bold text-[#170B35] dark:text-white">{article.authorName}</span>
            <span> · {article.authorRole}</span>
            <span aria-hidden="true"> · </span>
            <span className="font-mono tabular-nums">Published {article.publishedAtIso}</span>
            <span aria-hidden="true"> · </span>
            <span className="font-mono tabular-nums">Updated {article.updatedAtIso.slice(0, 10)}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => toggleFavorite('article', article.slug, article.title)}
              className="min-h-[38px] px-3 py-1.5 rounded-xl bg-violet-100 dark:bg-white/10 text-xs font-semibold text-[#170B35] dark:text-white flex items-center gap-1.5"
            >
              <Bookmark className={`w-3.5 h-3.5 ${saved ? 'fill-[#FF4DA6] text-[#FF4DA6]' : ''}`} />
              <span>{saved ? 'Saved' : 'Save'}</span>
            </button>
            <button
              type="button"
              onClick={handleCopy}
              className="min-h-[38px] px-3 py-1.5 rounded-xl bg-violet-100 dark:bg-white/10 text-xs font-semibold text-[#170B35] dark:text-white flex items-center gap-1.5"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>Copy</span>
            </button>
            <a
              href={shareLinks.x}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[38px] px-3 py-1.5 rounded-xl bg-violet-100 dark:bg-white/10 text-xs font-semibold text-[#170B35] dark:text-white flex items-center gap-1.5"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>X</span>
            </a>
            <a
              href={shareLinks.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[38px] px-3 py-1.5 rounded-xl bg-violet-100 dark:bg-white/10 text-xs font-semibold text-[#170B35] dark:text-white flex items-center gap-1.5"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </header>

      {/* Featured Image */}
      <figure className="rounded-3xl overflow-hidden border border-violet-200 dark:border-violet-300/20 bg-[#170B35]">
        <img
          src={article.featuredImage}
          alt={article.featuredImageAlt}
          className="w-full max-h-[500px] object-cover"
          referrerPolicy="no-referrer"
        />
        <figcaption className="px-5 py-3 text-xs text-violet-200/85 bg-[#170B35] space-y-1">
          <p>{article.featuredImageAlt}</p>
          {article.photoCredit && (
            <p className="text-[11px] text-violet-300/80 flex flex-wrap items-center gap-x-2 gap-y-1">
              <span>{article.photoCredit.text}</span>
              {article.photoCredit.sourceUrl && (
                <a
                  href={article.photoCredit.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-300 underline inline-flex items-center gap-0.5 hover:text-white"
                >
                  <span>Source</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              )}
              {article.photoCredit.licenceUrl && (
                <a
                  href={article.photoCredit.licenceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-300 underline inline-flex items-center gap-0.5 hover:text-white"
                >
                  <span>Licence</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              )}
            </p>
          )}
        </figcaption>
      </figure>

      {/* Table of Contents */}
      {headings.length > 0 && (
        <aside className="rounded-2xl bg-violet-50/80 dark:bg-[#201148] border border-violet-200 dark:border-violet-300/18 p-5 space-y-2.5">
          <p className="font-display text-sm font-bold text-[#170B35] dark:text-white">
            Table of Contents
          </p>
          <ul className="space-y-1.5 text-sm">
            {headings.map((h, i) => (
              <li key={`${h.id}-${i}`}>
                <a
                  href={`#${h.id}`}
                  className="text-[#8B5CF6] dark:text-violet-200 hover:text-[#FF4DA6] dark:hover:text-pink-300 transition-colors"
                >
                  {i + 1}. {h.text}
                </a>
              </li>
            ))}
          </ul>
        </aside>
      )}

      {/* Body Prose */}
      <div className="space-y-5 text-[16px] leading-[1.75] text-slate-700 dark:text-violet-100/90">
        {parsedHtmlDoc
          ? Array.from(parsedHtmlDoc.body.childNodes).map((node, idx) =>
              renderHtmlNode(node, `html-${idx}`, navigate)
            )
          : blocks.map((block, bIdx) => {
              if (block.startsWith('## ')) {
                const text = block.replace(/^##\s+/, '');
                return (
                  <h2
                    key={bIdx}
                    id={slugifyHeading(text)}
                    className="font-display text-2xl sm:text-3xl font-bold text-[#170B35] dark:text-white pt-4 scroll-mt-20"
                  >
                    {text}
                  </h2>
                );
              }
              if (block.startsWith('### ')) {
                return (
                  <h3
                    key={bIdx}
                    className="font-display text-xl font-bold text-[#170B35] dark:text-white pt-2"
                  >
                    {block.replace(/^###\s+/, '')}
                  </h3>
                );
              }
              if (block.startsWith('- ') || /^\d+\.\s/.test(block)) {
                const lines = block.split('\n').filter(Boolean);
                return (
                  <ul key={bIdx} className="space-y-2 pl-5 list-disc">
                    {lines.map((ln, lIdx) => (
                      <li key={lIdx}>
                        {renderInlineMarkdown(ln.replace(/^(-|\d+\.)\s+/, ''), navigate)}
                      </li>
                    ))}
                  </ul>
                );
              }
              return <p key={bIdx}>{renderInlineMarkdown(block, navigate)}</p>;
            })}
      </div>

      {/* Tags & Related Group Directory Links */}
      <div className="pt-4 border-t border-violet-200 dark:border-violet-300/15 space-y-4">
        {article.tags.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="font-semibold text-slate-500 dark:text-violet-300/75">Topics:</span>
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-lg bg-violet-100 dark:bg-white/8 text-[#170B35] dark:text-violet-100 font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {article.relatedGroupIds && article.relatedGroupIds.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-slate-500 dark:text-violet-300/75">
              Group Profiles:
            </span>
            {article.relatedGroupIds.map((gid) => {
              const grp = groups.find((g) => g.id === gid);
              if (!grp) return null;
              return (
                <button
                  key={gid}
                  type="button"
                  onClick={() => navigate(`/group/${gid}`)}
                  className="min-h-[34px] px-3 py-1 rounded-xl bg-white dark:bg-[#201148] border border-violet-200 dark:border-violet-300/20 text-xs font-semibold text-[#170B35] dark:text-white hover:border-[#FF4DA6]"
                >
                  {grp.name}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Verified Sources */}
      {article.references.length > 0 && (
        <section className="rounded-2xl bg-violet-50/80 dark:bg-[#201148] border border-violet-200 dark:border-violet-300/18 p-5 space-y-2">
          <h2 className="font-display text-sm font-bold text-[#170B35] dark:text-white">
            Verified Sources &amp; References
          </h2>
          <ul className="space-y-1 text-xs text-slate-600 dark:text-violet-200/80 list-disc pl-4">
            {article.references.map((ref, idx) => (
              <li key={idx}>{ref}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="space-y-4 pt-4">
          <h2 className="font-display text-2xl font-bold text-[#170B35] dark:text-white">
            Related Stories
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {relatedArticles.map((rel) => (
              <button
                key={rel.id}
                type="button"
                onClick={() => navigate(`/article/${rel.slug}`)}
                className="text-left rounded-2xl bg-white dark:bg-[#201148] border border-violet-200 dark:border-violet-300/16 hover:border-[#FF4DA6] overflow-hidden flex flex-col justify-between transition-all"
              >
                <div>
                  <div className="h-32 bg-[#170B35] overflow-hidden">
                    <img
                      src={rel.featuredImage}
                      alt={rel.featuredImageAlt}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="p-4">
                    <p className="font-display text-base font-bold text-[#170B35] dark:text-white leading-snug">
                      {rel.title}
                    </p>
                  </div>
                </div>
                <p className="px-4 pb-4 text-xs text-slate-500 dark:text-violet-300/75 font-mono">
                  {rel.publishedAtIso}
                </p>
              </button>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
