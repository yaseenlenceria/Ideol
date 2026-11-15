import { useEffect } from 'react';
import { Footer, Navbar } from './components/Navbar';
import { OrbitProvider, useOrbit } from './context/OrbitContext';
import { BLOG_CATEGORIES } from './data/articlesData';
import { EXPERIENCES } from './data/kpopData';
import { applySeoMetadata } from './lib/seo';
import { AdminCmsPage } from './pages/AdminCmsPage';
import { AgeFinderPage } from './pages/AgeFinderPage';
import { ArticleDetailPage } from './pages/ArticleDetailPage';
import { BiasBattlePage } from './pages/BiasBattlePage';
import { BirthdayCardMakerPage } from './pages/BirthdayCardMakerPage';
import { BirthdayCountdownPage } from './pages/BirthdayCountdownPage';
import { CatalogPage } from './pages/CatalogPage';
import { CategoryPage } from './pages/CategoryPage';
import { CollectionsPage } from './pages/CollectionsPage';
import { ComebackCountdownPage } from './pages/ComebackCountdownPage';
import {
  GroupDetailPage,
  GroupsDirectoryPage,
  IdolsDirectoryPage,
} from './pages/DirectoriesPage';
import { FanDnaQuizPage } from './pages/FanDnaQuizPage';
import { GuessIdolPage } from './pages/GuessIdolPage';
import { HomePage } from './pages/HomePage';
import { IdolDetailPage } from './pages/IdolDetailPage';
import { KstConverterPage } from './pages/KstConverterPage';
import { MagazineHomePage } from './pages/MagazineHomePage';
import { PhotocardTrackerPage } from './pages/PhotocardTrackerPage';
import { TriviaQuizPage } from './pages/TriviaQuizPage';
import { VibeQuizPage } from './pages/VibeQuizPage';
import { BlogCategorySlug } from './types/kpop';

function AppShell() {
  const { currentPath, toast, navigate, articles, groups, idols, siteSettings } = useOrbit();

  useEffect(() => {
    const globalRobots =
      siteSettings && siteSettings.allowIndexing === false ? 'noindex, nofollow' : 'index, follow';

    if (currentPath === '/admin') {
      applySeoMetadata({
        title: 'Admin CMS Dashboard | IdolOrbit',
        description: 'Private IdolOrbit editorial CMS and SEO workspace.',
        path: '/admin',
        robots: 'noindex, nofollow',
        schemaType: 'WebSite',
      });
      return;
    }

    if (currentPath.startsWith('/article/')) {
      const slug = currentPath.replace('/article/', '');
      const art = articles.find((a) => a.slug === slug);
      if (art) {
        const cat = BLOG_CATEGORIES.find((c) => c.slug === art.categorySlug);
        applySeoMetadata({
          title: art.seoTitle?.trim() || `${art.title} | IdolOrbit`,
          description: art.seoDescription?.trim() || art.subtitle,
          path: `/article/${art.slug}`,
          canonicalOverride: art.canonicalUrl,
          ogImage: art.featuredImage,
          robots: globalRobots,
          schemaType: 'Article',
          articleMeta: {
            headline: art.title,
            authorName: art.authorName,
            datePublished: art.publishedAtIso,
            dateModified: art.updatedAtIso.slice(0, 10),
            image: art.featuredImage,
            section: cat?.name || 'K-pop Editorial',
          },
          breadcrumbs: [
            { name: 'Home', path: '/' },
            { name: cat?.shortName || 'Magazine', path: `/category/${art.categorySlug}` },
            { name: art.title, path: `/article/${art.slug}` },
          ],
        });
        return;
      }
    }

    if (currentPath.startsWith('/category/')) {
      const slug = currentPath.replace('/category/', '');
      const cat = BLOG_CATEGORIES.find((c) => c.slug === slug);
      if (cat) {
        applySeoMetadata({
          title: `${cat.name} | IdolOrbit`,
          description: cat.description,
          path: `/category/${cat.slug}`,
          robots: globalRobots,
          schemaType: 'CollectionPage',
          breadcrumbs: [
            { name: 'Home', path: '/' },
            { name: cat.name, path: `/category/${cat.slug}` },
          ],
        });
        return;
      }
    }

    if (currentPath.startsWith('/idol/')) {
      const idolId = currentPath.replace('/idol/', '');
      const idol = idols.find((i) => i.id === idolId);
      if (idol) {
        applySeoMetadata({
          title: `${idol.stageName} (${idol.groupName}) Profile, Age & Birthday | IdolOrbit`,
          description: `Verified birthday (${idol.birthday}), calculated age, nationality (${idol.nationality}), and profile for ${idol.stageName} of ${idol.groupName}.`,
          path: currentPath,
          robots: globalRobots,
          schemaType: 'ProfilePage',
          profileMeta: {
            name: idol.stageName,
            alternateName: idol.fullName,
            birthDate: idol.birthday,
            nationality: idol.nationality,
            affiliation: idol.groupName,
          },
          breadcrumbs: [
            { name: 'Home', path: '/' },
            { name: 'Idol Directory', path: '/idols' },
            { name: idol.stageName, path: currentPath },
          ],
        });
        return;
      }
    }

    if (currentPath.startsWith('/group/')) {
      const groupId = currentPath.replace('/group/', '');
      const group = groups.find((g) => g.id === groupId);
      if (group) {
        applySeoMetadata({
          title: `${group.name} Members, Debut Date, Agency & Fandom | IdolOrbit`,
          description: `${group.name} (${group.koreanName}) verified member roster, ${group.debutDate} debut date, ${group.agency} agency, and ${group.fandomName} fandom guide.`,
          path: currentPath,
          robots: globalRobots,
          schemaType: 'CollectionPage',
          breadcrumbs: [
            { name: 'Home', path: '/' },
            { name: 'Group Directory', path: '/groups' },
            { name: group.name, path: currentPath },
          ],
        });
        return;
      }
    }

    if (currentPath === '/groups') {
      applySeoMetadata({
        title: 'K-pop Group Directory – BTS, BLACKPINK, IVE, Stray Kids & More | IdolOrbit',
        description:
          'Browse verified K-pop group profiles with debut dates, agencies, official fandom names, and member rosters.',
        path: '/groups',
        robots: globalRobots,
        schemaType: 'CollectionPage',
      });
      return;
    }

    if (currentPath === '/idols') {
      applySeoMetadata({
        title: 'K-pop Idol Directory – Verified Birthdays, Ages & Profiles | IdolOrbit',
        description:
          'Search 75+ K-pop idols with verified birthdates, calculated international ages, nationalities, and group affiliations.',
        path: '/idols',
        robots: globalRobots,
        schemaType: 'CollectionPage',
      });
      return;
    }

    const exp = EXPERIENCES.find((e) => e.path === currentPath);
    if (exp) {
      applySeoMetadata({
        title: exp.seoTitle,
        description: exp.seoDescription,
        path: exp.path,
        robots: globalRobots,
        schemaType: exp.category === 'quiz' ? 'Quiz' : 'WebApplication',
        breadcrumbs: [
          { name: 'Home', path: '/' },
          { name: 'Fan Lab', path: '/fan-lab' },
          { name: exp.shortTitle, path: exp.path },
        ],
      });
      return;
    }

    if (currentPath === '/fan-lab') {
      applySeoMetadata({
        title: 'IdolOrbit Fan Lab – 12 K-pop Quizzes, Countdowns & Fan Tools',
        description:
          'Play K-pop Fan DNA, verified Trivia, Bias Match, Idol Age Finder, live Birthday & Comeback Countdowns, and Photocard Tracker.',
        path: '/fan-lab',
        robots: globalRobots,
        schemaType: 'WebApplication',
      });
      return;
    }

    if (currentPath === '/quizzes') {
      applySeoMetadata({
        title: 'K-pop Quizzes & Games – Fan DNA, Trivia & Bias Battle | IdolOrbit',
        description:
          'Play K-pop Fan DNA, verified group Trivia, Bias Match, Guess the Idol, Bias Battle brackets, and Soulmate quizzes.',
        path: '/quizzes',
        robots: globalRobots,
        schemaType: 'CollectionPage',
      });
      return;
    }

    if (currentPath === '/tools') {
      applySeoMetadata({
        title: 'K-pop Fan Tools – Age Finder, KST Converter & Timers | IdolOrbit',
        description:
          'Calculate verified idol ages, watch live KST birthday & comeback countdowns, make birthday cards, and manage photocards.',
        path: '/tools',
        robots: globalRobots,
        schemaType: 'CollectionPage',
      });
      return;
    }

    if (currentPath === '/collections') {
      applySeoMetadata({
        title: 'Saved Favorites, Photocard Binder & Quiz Archive | IdolOrbit',
        description:
          'Manage your bookmarked K-pop articles, favorite artists, owned photocards, wishlist targets, and quiz results.',
        path: '/collections',
        robots: globalRobots,
        schemaType: 'CollectionPage',
      });
      return;
    }

    applySeoMetadata({
      title:
        siteSettings?.siteTitle ||
        'IdolOrbit – K-pop News, Editorial Guides & Verified Idol Directory',
      description:
        siteSettings?.siteDescription ||
        'Independent K-pop magazine featuring verified artist profiles, debut guides, comeback timelines, live KST birthday timers, and interactive Fan Lab quizzes.',
      path: '/',
      robots: globalRobots,
      schemaType: 'WebSite',
    });
  }, [currentPath, articles, groups, idols, siteSettings]);

  const renderFanLabTool = (node: React.ReactNode) => (
    <div className="rounded-3xl bg-[#1A0D3D] dark:bg-transparent p-4 sm:p-8 dark:p-0 border border-violet-200 dark:border-transparent text-[#F5F3FF]">
      {node}
    </div>
  );

  const renderPage = () => {
    if (currentPath === '/' || currentPath === '') return <MagazineHomePage />;
    if (currentPath === '/fan-lab') return <HomePage />;
    if (currentPath === '/quizzes') return <CatalogPage category="quiz" />;
    if (currentPath === '/tools') return <CatalogPage category="tool" />;
    if (currentPath === '/collections') return <CollectionsPage />;
    if (currentPath === '/groups') return <GroupsDirectoryPage />;
    if (currentPath === '/idols') return <IdolsDirectoryPage />;
    if (currentPath === '/admin') return <AdminCmsPage />;

    if (currentPath.startsWith('/category/')) {
      const slug = currentPath.replace('/category/', '') as BlogCategorySlug;
      return <CategoryPage slug={slug} />;
    }
    if (currentPath.startsWith('/article/')) {
      return <ArticleDetailPage slug={currentPath.replace('/article/', '')} />;
    }
    if (currentPath.startsWith('/group/')) {
      return <GroupDetailPage groupId={currentPath.replace('/group/', '')} />;
    }
    if (currentPath.startsWith('/idol/')) {
      return <IdolDetailPage idolId={currentPath.replace('/idol/', '')} />;
    }

    switch (currentPath) {
      case '/quiz/fan-dna':
        return renderFanLabTool(<FanDnaQuizPage />);
      case '/quiz/trivia':
        return renderFanLabTool(<TriviaQuizPage />);
      case '/quiz/bias-match':
        return renderFanLabTool(<VibeQuizPage mode="bias-match" />);
      case '/quiz/soulmate':
        return renderFanLabTool(<VibeQuizPage mode="soulmate" />);
      case '/quiz/guess-idol':
        return renderFanLabTool(<GuessIdolPage />);
      case '/quiz/bias-battle':
        return renderFanLabTool(<BiasBattlePage />);
      case '/tool/age-finder':
        return renderFanLabTool(<AgeFinderPage />);
      case '/tool/birthday-countdown':
        return renderFanLabTool(<BirthdayCountdownPage />);
      case '/tool/kst-converter':
        return renderFanLabTool(<KstConverterPage />);
      case '/tool/comeback-countdown':
        return renderFanLabTool(<ComebackCountdownPage />);
      case '/tool/birthday-card':
        return renderFanLabTool(<BirthdayCardMakerPage />);
      case '/tool/photocard-tracker':
        return renderFanLabTool(<PhotocardTrackerPage />);
      default:
        return (
          <div className="p-8 rounded-3xl bg-white dark:bg-[#201148] border border-violet-200 dark:border-violet-300/20 text-center space-y-4">
            <h1 className="font-display text-2xl font-bold text-[#170B35] dark:text-white">
              Page Not Found
            </h1>
            <button
              type="button"
              onClick={() => navigate('/')}
              className="min-h-[44px] px-5 py-2 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#FF4DA6] text-white text-sm font-semibold"
            >
              Return Home
            </button>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8FF] text-[#170B35] dark:bg-[#170B35] dark:text-[#F5F3FF] relative overflow-x-hidden transition-colors">
      {/* Subtle atmospheric top & side violet aura */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-40 dark:opacity-60"
        style={{
          background:
            'radial-gradient(circle at 15% 12%, rgba(139, 92, 246, 0.18), transparent 45%), radial-gradient(circle at 85% 22%, rgba(255, 77, 166, 0.14), transparent 42%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 pt-6 md:pt-8">
          {renderPage()}
        </main>
        <Footer />
      </div>

      {/* In-app Toast Notification */}
      {toast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-20 md:bottom-6 right-4 left-4 md:left-auto md:w-auto z-50 px-5 py-3 rounded-2xl bg-[#170B35]/95 dark:bg-[#281659]/95 backdrop-blur-md border border-violet-300/30 shadow-2xl text-sm font-semibold text-white text-center md:text-left"
        >
          {toast.text}
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <OrbitProvider>
      <AppShell />
    </OrbitProvider>
  );
}
