import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { User } from 'firebase/auth';
import {
  ADMIN_EMAIL,
  deleteArticleFromFirestore,
  deleteFanEventFromFirestore,
  deleteFavoriteFromFirestore,
  deletePhotocardFromFirestore,
  makeSafeId,
  saveArticleToFirestore,
  saveCmsGroupToFirestore,
  saveCmsIdolToFirestore,
  saveFanEventToFirestore,
  saveFavoriteToFirestore,
  savePhotocardToFirestore,
  saveQuizResultToFirestore,
  saveSiteSettingsToFirestore,
  saveUserProfile,
  signInWithGoogle,
  signOutUser,
  subscribeAllArticlesAdmin,
  subscribeAuth,
  subscribeCmsGroups,
  subscribeCmsIdols,
  subscribeFanEvents,
  subscribePhotocards,
  subscribePublishedArticles,
  subscribeQuizResults,
  subscribeSiteSettings,
  subscribeUserFavorites,
  subscribeUserProfile,
  testFirestoreConnection,
  updatePhotocardStatusInFirestore,
} from '../lib/firebase';
import { BUILT_IN_ARTICLES } from '../data/articlesData';
import { KPOP_GROUPS, KPOP_IDOLS } from '../data/kpopData';
import {
  ArticleRecord,
  FanEventRecord,
  FavoriteItemRecord,
  Group,
  Idol,
  PhotocardItemRecord,
  PhotocardStatus,
  QuizResultRecord,
  SiteSettingsRecord,
  UserProfileRecord,
} from '../types/kpop';

const GUEST_RESULTS_KEY = 'idolorbit_guest_results_v1';
const GUEST_EVENTS_KEY = 'idolorbit_guest_events_v1';
const GUEST_CARDS_KEY = 'idolorbit_guest_photocards_v1';
const GUEST_FAVS_KEY = 'idolorbit_guest_favorites_v1';
const GUEST_SESSION_KEY = 'idolorbit_guest_session_id_v1';
const THEME_KEY = 'idolorbit_theme_v1';

function getOrCreateGuestSessionId(): string {
  try {
    const existing = localStorage.getItem(GUEST_SESSION_KEY);
    if (existing) return existing;
    const created = makeSafeId('guest');
    localStorage.setItem(GUEST_SESSION_KEY, created);
    return created;
  } catch {
    return 'guest_local';
  }
}

function readLocalArray<T>(key: string): T[] {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeLocalArray<T>(key: string, data: T[]): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch {
    // Ignore storage quota errors gracefully
  }
}

interface ToastMessage {
  id: string;
  text: string;
  tone?: 'default' | 'success' | 'error';
}

interface OrbitContextValue {
  currentPath: string;
  navigate: (path: string) => void;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  user: User | null;
  isAdmin: boolean;
  authReady: boolean;
  guestSessionId: string;
  profile: UserProfileRecord | null;
  articles: ArticleRecord[];
  adminArticles: ArticleRecord[];
  groups: Group[];
  idols: Idol[];
  siteSettings: SiteSettingsRecord | null;
  favorites: FavoriteItemRecord[];
  isFavorite: (itemType: FavoriteItemRecord['itemType'], targetId: string) => boolean;
  toggleFavorite: (itemType: FavoriteItemRecord['itemType'], targetId: string, label: string) => Promise<void>;
  results: QuizResultRecord[];
  customEvents: FanEventRecord[];
  photocards: PhotocardItemRecord[];
  toast: ToastMessage | null;
  showToast: (text: string, tone?: 'default' | 'success' | 'error') => void;
  handleSignIn: () => Promise<void>;
  handleSignOut: () => Promise<void>;
  updateProfilePrefs: (favoriteGroup: string, biasIdol: string) => Promise<void>;
  recordQuizResult: (
    payload: Omit<QuizResultRecord, 'id' | 'ownerId' | 'createdAtIso'>
  ) => Promise<QuizResultRecord>;
  addFanEvent: (
    payload: Omit<FanEventRecord, 'id' | 'ownerId' | 'createdAtIso'>
  ) => Promise<void>;
  removeFanEvent: (eventId: string) => Promise<void>;
  addPhotocard: (
    payload: Omit<PhotocardItemRecord, 'id' | 'ownerId' | 'createdAtIso' | 'updatedAtIso'>
  ) => Promise<void>;
  togglePhotocardStatus: (itemId: string, nextStatus: PhotocardStatus) => Promise<void>;
  removePhotocard: (itemId: string) => Promise<void>;
  saveCmsArticle: (
    article: Omit<ArticleRecord, 'ownerId' | 'updatedAtIso' | 'readingMinutes'> & { isNew?: boolean }
  ) => Promise<string>;
  removeCmsArticle: (articleId: string) => Promise<void>;
  saveCmsGroup: (group: {
    id: string;
    name: string;
    koreanName: string;
    fandomName: string;
    agency: string;
    debutDate: string;
    generation: Group['generation'];
    memberCount: number;
    summary: string;
  }) => Promise<void>;
  saveCmsIdol: (idol: {
    id: string;
    stageName: string;
    fullName: string;
    groupId: string;
    groupName: string;
    birthday: string;
    nationality: string;
    funFact: string;
  }) => Promise<void>;
  saveSiteSeoSettings: (
    settings: Omit<SiteSettingsRecord, 'ownerId' | 'updatedAtIso'>
  ) => Promise<void>;
}

const OrbitContext = createContext<OrbitContextValue | null>(null);

export function OrbitProvider({ children }: { children: React.ReactNode }) {
  const [currentPath, setCurrentPath] = useState<string>(() => window.location.pathname || '/');
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    try {
      return localStorage.getItem(THEME_KEY) === 'light' ? 'light' : 'dark';
    } catch {
      return 'dark';
    }
  });
  const [user, setUser] = useState<User | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [guestSessionId] = useState<string>(() => getOrCreateGuestSessionId());
  const [profile, setProfile] = useState<UserProfileRecord | null>(null);

  const [publishedFirestoreArticles, setPublishedFirestoreArticles] = useState<ArticleRecord[]>([]);
  const [adminFirestoreArticles, setAdminFirestoreArticles] = useState<ArticleRecord[]>([]);
  const [cmsGroups, setCmsGroups] = useState<Group[]>([]);
  const [cmsIdols, setCmsIdols] = useState<Idol[]>([]);
  const [siteSettings, setSiteSettings] = useState<SiteSettingsRecord | null>(null);

  const [favorites, setFavorites] = useState<FavoriteItemRecord[]>(() =>
    readLocalArray(GUEST_FAVS_KEY)
  );
  const [results, setResults] = useState<QuizResultRecord[]>(() => readLocalArray(GUEST_RESULTS_KEY));
  const [customEvents, setCustomEvents] = useState<FanEventRecord[]>(() =>
    readLocalArray(GUEST_EVENTS_KEY)
  );
  const [photocards, setPhotocards] = useState<PhotocardItemRecord[]>(() =>
    readLocalArray(GUEST_CARDS_KEY)
  );
  const [toast, setToast] = useState<ToastMessage | null>(null);

  const isAdmin = Boolean(user?.email && user.email === ADMIN_EMAIL && user.emailVerified);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch {
      // ignore
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  const showToast = useCallback((text: string, tone: 'default' | 'success' | 'error' = 'default') => {
    const id = String(Date.now());
    setToast({ id, text, tone });
    window.setTimeout(() => {
      setToast((prev) => (prev?.id === id ? null : prev));
    }, 3400);
  }, []);

  const navigate = useCallback((path: string) => {
    if (path === window.location.pathname + window.location.search) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    window.history.pushState({}, '', path);
    setCurrentPath(path.split('?')[0] || '/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const onPop = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  useEffect(() => {
    testFirestoreConnection();
    const unsubAuth = subscribeAuth((u) => {
      setUser(u);
      setAuthReady(true);
    });
    const unsubPubArticles = subscribePublishedArticles(setPublishedFirestoreArticles);
    const unsubGroups = subscribeCmsGroups(setCmsGroups);
    const unsubIdols = subscribeCmsIdols(setCmsIdols);
    const unsubSeo = subscribeSiteSettings(setSiteSettings);

    return () => {
      unsubAuth();
      unsubPubArticles();
      unsubGroups();
      unsubIdols();
      unsubSeo();
    };
  }, []);

  useEffect(() => {
    if (!authReady) return;
    if (!user) {
      setProfile(null);
      setAdminFirestoreArticles([]);
      setFavorites(readLocalArray(GUEST_FAVS_KEY));
      setResults(readLocalArray(GUEST_RESULTS_KEY));
      setCustomEvents(readLocalArray(GUEST_EVENTS_KEY));
      setPhotocards(readLocalArray(GUEST_CARDS_KEY));
      return;
    }

    saveUserProfile(user.uid, {
      displayName: user.displayName || 'IdolOrbit Fan',
    }).catch(() => {});

    const unsubProfile = subscribeUserProfile(user.uid, setProfile);
    const unsubFavs = subscribeUserFavorites(user.uid, setFavorites);
    const unsubResults = subscribeQuizResults(user.uid, setResults);
    const unsubEvents = subscribeFanEvents(user.uid, setCustomEvents);
    const unsubCards = subscribePhotocards(user.uid, setPhotocards);

    let unsubAdminArticles = () => {};
    if (user.email === ADMIN_EMAIL && user.emailVerified) {
      unsubAdminArticles = subscribeAllArticlesAdmin(setAdminFirestoreArticles);
    }

    return () => {
      unsubProfile();
      unsubFavs();
      unsubResults();
      unsubEvents();
      unsubCards();
      unsubAdminArticles();
    };
  }, [authReady, user]);

  // Merge built-in verified articles + Firestore published articles (Firestore overrides same slug/id)
  const articles = useMemo(() => {
    const map = new Map<string, ArticleRecord>();
    BUILT_IN_ARTICLES.forEach((a) => map.set(a.slug, a));
    publishedFirestoreArticles.forEach((a) => map.set(a.slug, a));
    return Array.from(map.values()).sort((a, b) =>
      b.publishedAtIso.localeCompare(a.publishedAtIso)
    );
  }, [publishedFirestoreArticles]);

  const adminArticles = useMemo(() => {
    const map = new Map<string, ArticleRecord>();
    BUILT_IN_ARTICLES.forEach((a) => map.set(a.id, a));
    adminFirestoreArticles.forEach((a) => map.set(a.id, a));
    return Array.from(map.values()).sort((a, b) =>
      b.updatedAtIso.localeCompare(a.updatedAtIso)
    );
  }, [adminFirestoreArticles]);

  const groups = useMemo(() => {
    const map = new Map<string, Group>();
    KPOP_GROUPS.forEach((g) => map.set(g.id, g));
    cmsGroups.forEach((g) => map.set(g.id, g));
    return Array.from(map.values());
  }, [cmsGroups]);

  const idols = useMemo(() => {
    const map = new Map<string, Idol>();
    KPOP_IDOLS.forEach((i) => map.set(i.id, i));
    cmsIdols.forEach((i) => map.set(i.id, i));
    return Array.from(map.values());
  }, [cmsIdols]);

  const isFavorite = useCallback(
    (itemType: FavoriteItemRecord['itemType'], targetId: string) => {
      return favorites.some((f) => f.itemType === itemType && f.targetId === targetId);
    },
    [favorites]
  );

  const toggleFavorite = useCallback(
    async (itemType: FavoriteItemRecord['itemType'], targetId: string, label: string) => {
      const existing = favorites.find((f) => f.itemType === itemType && f.targetId === targetId);
      if (existing) {
        if (user) {
          await deleteFavoriteFromFirestore(user.uid, existing.id);
        } else {
          setFavorites((prev) => {
            const next = prev.filter((f) => f.id !== existing.id);
            writeLocalArray(GUEST_FAVS_KEY, next);
            return next;
          });
        }
        showToast(`Removed ${label} from favorites`, 'default');
        return;
      }

      if (user) {
        await saveFavoriteToFirestore(user.uid, { itemType, targetId, label });
      } else {
        const localFav: FavoriteItemRecord = {
          id: `${itemType}_${targetId}`,
          ownerId: guestSessionId,
          itemType,
          targetId,
          label,
          createdAtIso: new Date().toISOString(),
        };
        setFavorites((prev) => {
          const next = [localFav, ...prev];
          writeLocalArray(GUEST_FAVS_KEY, next);
          return next;
        });
      }
      showToast(`Saved ${label} to favorites`, 'success');
    },
    [favorites, user, guestSessionId, showToast]
  );

  const handleSignIn = useCallback(async () => {
    try {
      const signedUser = await signInWithGoogle();
      showToast(`Signed in as ${signedUser.displayName || 'Fan'}`, 'success');
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Sign-in cancelled';
      if (!msg.includes('popup-closed-by-user')) {
        showToast('Could not complete Google sign-in. Try again.', 'error');
      }
    }
  }, [showToast]);

  const handleSignOut = useCallback(async () => {
    await signOutUser();
    showToast('Signed out · Guest session active', 'default');
  }, [showToast]);

  const updateProfilePrefs = useCallback(
    async (favoriteGroup: string, biasIdol: string) => {
      if (!user) {
        showToast('Sign in with Google to save cloud profile preferences.', 'default');
        return;
      }
      await saveUserProfile(user.uid, {
        displayName: user.displayName || profile?.displayName || 'IdolOrbit Fan',
        favoriteGroup,
        biasIdol,
      });
      showToast('Fan profile updated', 'success');
    },
    [user, profile, showToast]
  );

  const recordQuizResult = useCallback(
    async (payload: Omit<QuizResultRecord, 'id' | 'ownerId' | 'createdAtIso'>) => {
      const nowIso = new Date().toISOString();
      if (user) {
        const id = await saveQuizResultToFirestore(user.uid, payload);
        return { ...payload, id, ownerId: user.uid, createdAtIso: nowIso };
      }
      const localRecord: QuizResultRecord = {
        ...payload,
        id: makeSafeId('res'),
        ownerId: guestSessionId,
        createdAtIso: nowIso,
        isGuest: true,
      };
      setResults((prev) => {
        const next = [localRecord, ...prev].slice(0, 30);
        writeLocalArray(GUEST_RESULTS_KEY, next);
        return next;
      });
      return localRecord;
    },
    [user, guestSessionId]
  );

  const addFanEvent = useCallback(
    async (payload: Omit<FanEventRecord, 'id' | 'ownerId' | 'createdAtIso'>) => {
      if (user) {
        await saveFanEventToFirestore(user.uid, payload);
        showToast('Release added to your cloud radar', 'success');
        return;
      }
      const localEvent: FanEventRecord = {
        ...payload,
        id: makeSafeId('evt'),
        ownerId: guestSessionId,
        createdAtIso: new Date().toISOString(),
      };
      setCustomEvents((prev) => {
        const next = [localEvent, ...prev];
        writeLocalArray(GUEST_EVENTS_KEY, next);
        return next;
      });
      showToast('Release added to your local countdowns', 'success');
    },
    [user, guestSessionId, showToast]
  );

  const removeFanEvent = useCallback(
    async (eventId: string) => {
      if (user) {
        await deleteFanEventFromFirestore(user.uid, eventId);
        showToast('Event removed', 'default');
        return;
      }
      setCustomEvents((prev) => {
        const next = prev.filter((e) => e.id !== eventId);
        writeLocalArray(GUEST_EVENTS_KEY, next);
        return next;
      });
      showToast('Event removed', 'default');
    },
    [user, showToast]
  );

  const addPhotocard = useCallback(
    async (
      payload: Omit<PhotocardItemRecord, 'id' | 'ownerId' | 'createdAtIso' | 'updatedAtIso'>
    ) => {
      if (user) {
        await savePhotocardToFirestore(user.uid, payload);
        showToast('Photocard saved to your cloud binder', 'success');
        return;
      }
      const nowIso = new Date().toISOString();
      const localCard: PhotocardItemRecord = {
        ...payload,
        id: makeSafeId('pc'),
        ownerId: guestSessionId,
        createdAtIso: nowIso,
        updatedAtIso: nowIso,
      };
      setPhotocards((prev) => {
        const next = [localCard, ...prev];
        writeLocalArray(GUEST_CARDS_KEY, next);
        return next;
      });
      showToast('Photocard saved to binder', 'success');
    },
    [user, guestSessionId, showToast]
  );

  const togglePhotocardStatus = useCallback(
    async (itemId: string, nextStatus: PhotocardStatus) => {
      if (user) {
        await updatePhotocardStatusInFirestore(user.uid, itemId, nextStatus);
        showToast(`Moved to ${nextStatus}`, 'success');
        return;
      }
      setPhotocards((prev) => {
        const next = prev.map((c) =>
          c.id === itemId ? { ...c, status: nextStatus, updatedAtIso: new Date().toISOString() } : c
        );
        writeLocalArray(GUEST_CARDS_KEY, next);
        return next;
      });
      showToast(`Moved to ${nextStatus}`, 'success');
    },
    [user, showToast]
  );

  const removePhotocard = useCallback(
    async (itemId: string) => {
      if (user) {
        await deletePhotocardFromFirestore(user.uid, itemId);
        showToast('Photocard removed', 'default');
        return;
      }
      setPhotocards((prev) => {
        const next = prev.filter((c) => c.id !== itemId);
        writeLocalArray(GUEST_CARDS_KEY, next);
        return next;
      });
      showToast('Photocard removed', 'default');
    },
    [user, showToast]
  );

  const saveCmsArticle = useCallback(
    async (
      article: Omit<ArticleRecord, 'ownerId' | 'updatedAtIso' | 'readingMinutes'> & { isNew?: boolean }
    ) => {
      if (!user || !isAdmin) throw new Error('Admin sign-in required');
      const id = await saveArticleToFirestore(user.uid, article);
      showToast(`Article ${article.status === 'published' ? 'published' : 'saved'}`, 'success');
      return id;
    },
    [user, isAdmin, showToast]
  );

  const removeCmsArticle = useCallback(
    async (articleId: string) => {
      if (!user || !isAdmin) throw new Error('Admin sign-in required');
      await deleteArticleFromFirestore(articleId);
      showToast('Article deleted from Firestore', 'default');
    },
    [user, isAdmin, showToast]
  );

  const saveCmsGroup = useCallback(
    async (group: {
      id: string;
      name: string;
      koreanName: string;
      fandomName: string;
      agency: string;
      debutDate: string;
      generation: Group['generation'];
      memberCount: number;
      summary: string;
    }) => {
      if (!user || !isAdmin) throw new Error('Admin sign-in required');
      await saveCmsGroupToFirestore(user.uid, group);
      showToast(`Group "${group.name}" saved`, 'success');
    },
    [user, isAdmin, showToast]
  );

  const saveCmsIdol = useCallback(
    async (idol: {
      id: string;
      stageName: string;
      fullName: string;
      groupId: string;
      groupName: string;
      birthday: string;
      nationality: string;
      funFact: string;
    }) => {
      if (!user || !isAdmin) throw new Error('Admin sign-in required');
      await saveCmsIdolToFirestore(user.uid, idol);
      showToast(`Idol "${idol.stageName}" saved`, 'success');
    },
    [user, isAdmin, showToast]
  );

  const saveSiteSeoSettings = useCallback(
    async (settings: Omit<SiteSettingsRecord, 'ownerId' | 'updatedAtIso'>) => {
      if (!user || !isAdmin) throw new Error('Admin sign-in required');
      await saveSiteSettingsToFirestore(user.uid, settings);
      showToast('SEO & robots settings saved', 'success');
    },
    [user, isAdmin, showToast]
  );

  return (
    <OrbitContext.Provider
      value={{
        currentPath,
        navigate,
        theme,
        toggleTheme,
        user,
        isAdmin,
        authReady,
        guestSessionId,
        profile,
        articles,
        adminArticles,
        groups,
        idols,
        siteSettings,
        favorites,
        isFavorite,
        toggleFavorite,
        results,
        customEvents,
        photocards,
        toast,
        showToast,
        handleSignIn,
        handleSignOut,
        updateProfilePrefs,
        recordQuizResult,
        addFanEvent,
        removeFanEvent,
        addPhotocard,
        togglePhotocardStatus,
        removePhotocard,
        saveCmsArticle,
        removeCmsArticle,
        saveCmsGroup,
        saveCmsIdol,
        saveSiteSeoSettings,
      }}
    >
      {children}
    </OrbitContext.Provider>
  );
}

export function useOrbit(): OrbitContextValue {
  const ctx = useContext(OrbitContext);
  if (!ctx) throw new Error('useOrbit must be used inside OrbitProvider');
  return ctx;
}
