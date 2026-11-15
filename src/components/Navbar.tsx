import { BookOpen, Home, LogIn, LogOut, Moon, Newspaper, Shield, Sparkles, Sun, Users } from 'lucide-react';
import { useOrbit } from '../context/OrbitContext';
import { BLOG_CATEGORIES } from '../data/articlesData';

export function Navbar() {
  const { currentPath, navigate, user, isAdmin, theme, toggleTheme, handleSignIn, handleSignOut } =
    useOrbit();

  return (
    <>
      {/* Strict 3-Zone Top Bar Contract */}
      <header className="sticky top-0 z-40 h-14 md:h-16 bg-white/90 dark:bg-[#170B35]/90 backdrop-blur-md border-b border-violet-200 dark:border-violet-300/15 transition-colors">
        <div className="max-w-7xl mx-auto h-full px-4 md:px-8 flex items-center justify-between gap-8">
          {/* Zone 1: Single-line Brand Wordmark */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              navigate('/');
            }}
            className="font-display text-xl font-extrabold tracking-tight text-[#170B35] dark:text-white whitespace-nowrap shrink-0 hover:text-[#8B5CF6] dark:hover:text-pink-200 transition-colors"
          >
            IdolOrbit
          </a>

          {/* Zone 2: 5 concise single-line nav links */}
          <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-7 text-sm font-medium">
            {[
              {
                label: 'Magazine',
                path: '/',
                match: (p: string) => p === '/' || p.startsWith('/category/') || p.startsWith('/article/'),
              },
              {
                label: 'Groups',
                path: '/groups',
                match: (p: string) => p === '/groups' || p.startsWith('/group/'),
              },
              {
                label: 'Idols',
                path: '/idols',
                match: (p: string) => p === '/idols' || p.startsWith('/idol/'),
              },
              {
                label: 'Fan Lab',
                path: '/fan-lab',
                match: (p: string) =>
                  p === '/fan-lab' ||
                  p === '/quizzes' ||
                  p === '/tools' ||
                  p.startsWith('/quiz/') ||
                  p.startsWith('/tool/'),
              },
              {
                label: 'Saved',
                path: '/collections',
                match: (p: string) => p.startsWith('/collections'),
              },
            ].map((item) => {
              const active = item.match(currentPath);
              return (
                <a
                  key={item.path}
                  href={item.path}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(item.path);
                  }}
                  className={`whitespace-nowrap shrink-0 py-1 border-b-2 transition-colors ${
                    active
                      ? 'text-[#170B35] dark:text-white border-[#FF4DA6]'
                      : 'text-slate-600 dark:text-violet-200/80 border-transparent hover:text-[#170B35] dark:hover:text-white hover:border-violet-400/50'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Single Primary Action */}
          <div className="flex items-center shrink-0">
            {user ? (
              <button
                type="button"
                onClick={() => (isAdmin ? navigate('/admin') : handleSignOut())}
                title={isAdmin ? 'Open Admin CMS' : 'Sign out'}
                className="min-h-[40px] px-3.5 py-2 rounded-xl bg-violet-100 dark:bg-white/10 hover:bg-violet-200 dark:hover:bg-white/16 border border-violet-300/40 dark:border-violet-300/20 text-xs font-semibold text-[#170B35] dark:text-violet-100 flex items-center gap-2 whitespace-nowrap shrink-0 transition-colors"
              >
                {isAdmin && <Shield className="w-3.5 h-3.5 text-[#FF4DA6]" />}
                <span className="max-w-[110px] truncate">{user.displayName?.split(' ')[0] || 'Account'}</span>
                {!isAdmin && <LogOut className="w-3.5 h-3.5 text-pink-500 dark:text-pink-300" />}
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSignIn}
                className="min-h-[40px] px-4 py-2 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#FF4DA6] text-xs font-semibold text-white shadow-lg shadow-pink-500/20 hover:brightness-110 active:scale-[0.98] flex items-center gap-1.5 whitespace-nowrap shrink-0 transition-all"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Sign In</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Editorial Category Bar + Theme Toggle & Admin CMS Quick Link (Non-sticky below header) */}
      <div className="border-b border-violet-200/80 dark:border-violet-300/10 bg-violet-50/70 dark:bg-[#140930]/80">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-2.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            {BLOG_CATEGORIES.map((cat) => {
              const active = currentPath === `/category/${cat.slug}`;
              return (
                <button
                  key={cat.slug}
                  type="button"
                  onClick={() => navigate(`/category/${cat.slug}`)}
                  className={`min-h-[36px] px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap shrink-0 transition-colors ${
                    active
                      ? 'bg-[#170B35] text-white dark:bg-white dark:text-[#170B35]'
                      : 'text-slate-700 dark:text-violet-200/80 hover:bg-violet-200/60 dark:hover:bg-white/8'
                  }`}
                >
                  {cat.shortName}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => navigate('/admin')}
              className="min-h-[36px] px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700 dark:text-violet-200 hover:bg-violet-200/60 dark:hover:bg-white/10 whitespace-nowrap hidden sm:inline-flex items-center gap-1.5"
            >
              <Shield className="w-3.5 h-3.5 text-[#8B5CF6] dark:text-pink-300" />
              <span>CMS</span>
            </button>
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              className="min-h-[36px] min-w-[36px] px-2.5 py-1.5 rounded-xl bg-white dark:bg-white/8 border border-violet-200 dark:border-violet-300/20 text-[#170B35] dark:text-violet-100 flex items-center gap-1.5 text-xs font-semibold whitespace-nowrap"
            >
              {theme === 'dark' ? <Sun className="w-3.5 h-3.5 text-amber-300" /> : <Moon className="w-3.5 h-3.5 text-[#8B5CF6]" />}
              <span className="hidden sm:inline">{theme === 'dark' ? 'Light' : 'Dark'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Thumb-Zone Navigation Bar (60px height) */}
      <nav
        aria-label="Mobile navigation"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#170B35]/95 backdrop-blur-md border-t border-violet-200 dark:border-violet-300/15"
      >
        <div className="grid grid-cols-5 h-[60px] items-center">
          {[
            { label: 'Home', path: '/', icon: Home, match: (p: string) => p === '/' },
            {
              label: 'News',
              path: '/category/news',
              icon: Newspaper,
              match: (p: string) => p.startsWith('/category/') || p.startsWith('/article/'),
            },
            {
              label: 'Idols',
              path: '/idols',
              icon: Users,
              match: (p: string) => p === '/idols' || p === '/groups' || p.startsWith('/idol/') || p.startsWith('/group/'),
            },
            {
              label: 'Fan Lab',
              path: '/fan-lab',
              icon: Sparkles,
              match: (p: string) =>
                p === '/fan-lab' || p.startsWith('/quiz/') || p.startsWith('/tool/'),
            },
            {
              label: 'Saved',
              path: '/collections',
              icon: BookOpen,
              match: (p: string) => p.startsWith('/collections') || p === '/admin',
            },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = tab.match(currentPath);
            return (
              <button
                key={tab.path}
                type="button"
                onClick={() => navigate(tab.path)}
                className={`min-h-[44px] flex flex-col items-center justify-center gap-0.5 transition-colors ${
                  active
                    ? 'text-[#FF4DA6]'
                    : 'text-slate-600 dark:text-violet-200/75 hover:text-[#170B35] dark:hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-[10px] font-semibold tracking-tight whitespace-nowrap">
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}

export function Footer() {
  const { navigate, user, handleSignOut } = useOrbit();
  return (
    <footer className="border-t border-violet-200 dark:border-violet-300/12 bg-violet-50/70 dark:bg-[#12082A] pt-10 pb-24 md:pb-12 px-4 md:px-8 mt-16 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-xs text-slate-600 dark:text-violet-200/75">
        <div>
          <p className="font-display text-base font-bold text-[#170B35] dark:text-white">
            IdolOrbit
          </p>
          <p className="mt-1">
            Independent fan-made K-pop magazine, verified directory &amp; Fan Lab · Personality quizzes are for entertainment only.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-5">
          {[
            { label: 'Groups', path: '/groups' },
            { label: 'Idols', path: '/idols' },
            { label: 'Fan Lab', path: '/fan-lab' },
            { label: 'Age Finder', path: '/tool/age-finder' },
            { label: 'Admin CMS', path: '/admin' },
          ].map((link) => (
            <button
              key={link.path}
              type="button"
              onClick={() => navigate(link.path)}
              className="hover:text-[#170B35] dark:hover:text-white transition-colors whitespace-nowrap"
            >
              {link.label}
            </button>
          ))}
          {user && (
            <button
              type="button"
              onClick={handleSignOut}
              className="text-[#FF4DA6] hover:underline whitespace-nowrap font-semibold"
            >
              Sign Out
            </button>
          )}
        </div>
      </div>
    </footer>
  );
}
