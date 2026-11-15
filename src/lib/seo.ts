export interface BreadcrumbItem {
  name: string;
  path: string;
}

export interface SeoConfig {
  title: string;
  description: string;
  path: string;
  canonicalOverride?: string;
  ogImage?: string;
  robots?: string;
  schemaType?: 'WebSite' | 'WebApplication' | 'Quiz' | 'CollectionPage' | 'Article' | 'ProfilePage';
  articleMeta?: {
    headline: string;
    authorName: string;
    datePublished: string;
    dateModified: string;
    image: string;
    section: string;
  };
  profileMeta?: {
    name: string;
    alternateName?: string;
    birthDate?: string;
    nationality?: string;
    affiliation?: string;
  };
  breadcrumbs?: BreadcrumbItem[];
}

function setMetaTag(attr: 'name' | 'property', key: string, content: string): void {
  let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

export function applySeoMetadata(config: SeoConfig): void {
  document.title = config.title;
  setMetaTag('name', 'description', config.description);
  setMetaTag('name', 'robots', config.robots || 'index, follow');
  setMetaTag('property', 'og:title', config.title);
  setMetaTag('property', 'og:description', config.description);
  setMetaTag('name', 'twitter:title', config.title);
  setMetaTag('name', 'twitter:description', config.description);

  const origin = window.location.origin;
  const canonicalUrl = config.canonicalOverride?.trim()
    ? config.canonicalOverride.trim()
    : `${origin}${config.path}`;
  setMetaTag('property', 'og:url', canonicalUrl);

  const ogImg = config.ogImage
    ? config.ogImage.startsWith('http')
      ? config.ogImage
      : `${origin}${config.ogImage}`
    : `${origin}/src/assets/images/hero_concert_stage_1794747942919.jpg`;
  setMetaTag('property', 'og:image', ogImg);
  setMetaTag('name', 'twitter:image', ogImg);

  let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!canonicalLink) {
    canonicalLink = document.createElement('link');
    canonicalLink.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalLink);
  }
  canonicalLink.setAttribute('href', canonicalUrl);

  let jsonLdEl = document.getElementById('idolorbit-jsonld') as HTMLScriptElement | null;
  if (!jsonLdEl) {
    jsonLdEl = document.createElement('script');
    jsonLdEl.id = 'idolorbit-jsonld';
    jsonLdEl.type = 'application/ld+json';
    document.head.appendChild(jsonLdEl);
  }

  const graph: Array<Record<string, unknown>> = [];

  if (config.schemaType === 'Article' && config.articleMeta) {
    graph.push({
      '@type': 'Article',
      headline: config.articleMeta.headline,
      description: config.description,
      image: [ogImg],
      datePublished: config.articleMeta.datePublished,
      dateModified: config.articleMeta.dateModified,
      articleSection: config.articleMeta.section,
      author: {
        '@type': 'Person',
        name: config.articleMeta.authorName,
      },
      publisher: {
        '@type': 'Organization',
        name: 'IdolOrbit',
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': canonicalUrl,
      },
    });
  } else if (config.schemaType === 'ProfilePage' && config.profileMeta) {
    graph.push({
      '@type': 'ProfilePage',
      mainEntity: {
        '@type': 'Person',
        name: config.profileMeta.name,
        alternateName: config.profileMeta.alternateName,
        birthDate: config.profileMeta.birthDate,
        nationality: config.profileMeta.nationality,
        memberOf: config.profileMeta.affiliation
          ? { '@type': 'MusicGroup', name: config.profileMeta.affiliation }
          : undefined,
      },
      url: canonicalUrl,
    });
  } else {
    graph.push({
      '@type': config.schemaType ?? 'WebSite',
      name: config.title,
      description: config.description,
      url: canonicalUrl,
      publisher: {
        '@type': 'Organization',
        name: 'IdolOrbit',
      },
    });
  }

  if (config.breadcrumbs && config.breadcrumbs.length > 0) {
    graph.push({
      '@type': 'BreadcrumbList',
      itemListElement: config.breadcrumbs.map((crumb, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        name: crumb.name,
        item: `${origin}${crumb.path}`,
      })),
    });
  }

  jsonLdEl.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': graph,
  });
}
