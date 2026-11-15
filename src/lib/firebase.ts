import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDocFromServer,
  collection,
  onSnapshot,
  setDoc,
  deleteDoc,
  updateDoc,
  serverTimestamp,
  query,
  where,
  orderBy,
  limit,
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';
import {
  ArticleRecord,
  FanEventRecord,
  FavoriteItemRecord,
  Group,
  Idol,
  PhotocardItemRecord,
  QuizResultRecord,
  SiteSettingsRecord,
  UserProfileRecord,
} from '../types/kpop';

export const ADMIN_EMAIL = 'henrywalker82009@gmail.com';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(
  error: unknown,
  operationType: OperationType,
  path: string | null
): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo:
        auth.currentUser?.providerData?.map((provider) => ({
          providerId: provider.providerId,
          email: provider.email,
        })) || [],
    },
    operationType,
    path,
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

let connectionTested = false;
export async function testFirestoreConnection(): Promise<void> {
  if (connectionTested) return;
  connectionTested = true;
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error('Please check your Firebase configuration.');
    }
  }
}

export async function signInWithGoogle(): Promise<User> {
  const result = await signInWithPopup(auth, googleProvider);
  return result.user;
}

export async function signOutUser(): Promise<void> {
  await firebaseSignOut(auth);
}

export function subscribeAuth(callback: (user: User | null) => void): () => void {
  return onAuthStateChanged(auth, callback);
}

export function makeSafeId(prefix: string): string {
  const rand = Math.random().toString(36).slice(2, 9);
  const ts = Date.now().toString(36);
  return `${prefix}_${ts}_${rand}`.replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 64);
}

export function clampStr(val: string | undefined, max: number, fallback = ''): string {
  const trimmed = (val ?? fallback).trim();
  return trimmed.slice(0, max);
}

export function estimateReadingMinutes(markdown: string): number {
  const words = markdown.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 180));
}

// ---------- CMS ARTICLES ----------

export function subscribePublishedArticles(
  onData: (items: ArticleRecord[]) => void
): () => void {
  const path = 'articles';
  const q = query(
    collection(db, 'articles'),
    where('status', '==', 'published'),
    limit(60)
  );
  return onSnapshot(
    q,
    (snap) => {
      const items = snap.docs.map((d) => mapArticleDoc(d.id, d.data()));
      onData(items);
    },
    () => {
      // Public fallback gracefully handles unseeded environments without blocking UI
      onData([]);
    }
  );
}

export function subscribeAllArticlesAdmin(
  onData: (items: ArticleRecord[]) => void
): () => void {
  const path = 'articles';
  const q = query(collection(db, 'articles'), orderBy('updatedAt', 'desc'), limit(100));
  return onSnapshot(
    q,
    (snap) => {
      const items = snap.docs.map((d) => mapArticleDoc(d.id, d.data()));
      onData(items);
    },
    (error) => handleFirestoreError(error, OperationType.LIST, path)
  );
}

function mapArticleDoc(id: string, d: Record<string, unknown>): ArticleRecord {
  const body = String(d.bodyMarkdown ?? '');
  return {
    id,
    ownerId: String(d.ownerId ?? ''),
    slug: String(d.slug ?? id),
    title: String(d.title ?? 'Untitled'),
    subtitle: String(d.subtitle ?? ''),
    categorySlug: (String(d.categorySlug ?? 'news') as ArticleRecord['categorySlug']),
    tags: Array.isArray(d.tags) ? d.tags.map(String) : [],
    authorName: String(d.authorName ?? 'IdolOrbit Editorial'),
    authorRole: String(d.authorRole ?? 'Editor'),
    featuredImage: String(d.featuredImage ?? '/src/assets/images/hero_concert_stage_1794747942919.jpg'),
    featuredImageAlt: String(d.featuredImageAlt ?? 'IdolOrbit editorial cover'),
    bodyMarkdown: body,
    references: Array.isArray(d.references) ? d.references.map(String) : [],
    status: (String(d.status ?? 'draft') as ArticleRecord['status']),
    isFeatured: Boolean(d.isFeatured),
    publishedAtIso: String(d.publishedAtIso ?? new Date().toISOString().slice(0, 10)),
    updatedAtIso:
      (d.updatedAt as { toDate?: () => Date } | undefined)?.toDate?.().toISOString() ??
      new Date().toISOString(),
    readingMinutes: estimateReadingMinutes(body),
    seoTitle: d.seoTitle ? String(d.seoTitle) : undefined,
    seoDescription: d.seoDescription ? String(d.seoDescription) : undefined,
    canonicalUrl: d.canonicalUrl ? String(d.canonicalUrl) : undefined,
  };
}

export async function saveArticleToFirestore(
  uid: string,
  article: Omit<ArticleRecord, 'ownerId' | 'updatedAtIso' | 'readingMinutes'> & { isNew?: boolean }
): Promise<string> {
  const safeId = article.id.replace(/[^a-zA-Z0-9_-]/g, '-').slice(0, 64) || makeSafeId('art');
  const path = `articles/${safeId}`;
  const cleanSlug = article.slug
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 140) || safeId.toLowerCase();

  try {
    const payload: Record<string, unknown> = {
      ownerId: uid,
      slug: cleanSlug,
      title: clampStr(article.title, 180, 'Untitled Article'),
      subtitle: clampStr(article.subtitle, 280),
      categorySlug: clampStr(article.categorySlug, 64, 'news'),
      tags: (article.tags || []).map((t) => clampStr(t, 40)).filter(Boolean).slice(0, 12),
      authorName: clampStr(article.authorName, 80, 'IdolOrbit Editorial'),
      authorRole: clampStr(article.authorRole, 80, 'Staff Editor'),
      featuredImage: clampStr(
        article.featuredImage,
        400,
        '/src/assets/images/hero_concert_stage_1794747942919.jpg'
      ),
      featuredImageAlt: clampStr(article.featuredImageAlt, 200, 'K-pop editorial artwork'),
      bodyMarkdown: clampStr(article.bodyMarkdown, 40000, 'Article content coming soon.'),
      references: (article.references || []).map((r) => clampStr(r, 200)).filter(Boolean).slice(0, 12),
      status: article.status,
      isFeatured: Boolean(article.isFeatured),
      publishedAtIso: clampStr(article.publishedAtIso, 40, new Date().toISOString().slice(0, 10)),
      updatedAt: serverTimestamp(),
    };

    if (article.seoTitle) payload.seoTitle = clampStr(article.seoTitle, 160);
    if (article.seoDescription) payload.seoDescription = clampStr(article.seoDescription, 320);
    if (article.canonicalUrl) payload.canonicalUrl = clampStr(article.canonicalUrl, 300);

    if (article.isNew) {
      payload.createdAt = serverTimestamp();
      await setDoc(doc(db, 'articles', safeId), payload);
    } else {
      const updatePayload = { ...payload };
      delete updatePayload.ownerId;
      await updateDoc(doc(db, 'articles', safeId), updatePayload);
    }
    return safeId;
  } catch (error) {
    handleFirestoreError(error, article.isNew ? OperationType.CREATE : OperationType.UPDATE, path);
  }
}

export async function deleteArticleFromFirestore(articleId: string): Promise<void> {
  const path = `articles/${articleId}`;
  try {
    await deleteDoc(doc(db, 'articles', articleId));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}

// ---------- CMS GROUPS & IDOLS ----------

export function subscribeCmsGroups(onData: (groups: Group[]) => void): () => void {
  return onSnapshot(
    collection(db, 'cmsGroups'),
    (snap) => {
      const list: Group[] = snap.docs.map((d) => {
        const data = d.data();
        return {
          id: d.id,
          name: String(data.name ?? ''),
          koreanName: String(data.koreanName ?? ''),
          fandomName: String(data.fandomName ?? ''),
          agency: String(data.agency ?? ''),
          debutDate: String(data.debutDate ?? '2024-01-01'),
          generation: (String(data.generation ?? '4th Gen') as Group['generation']),
          memberCount: Number(data.memberCount ?? 5),
          accentHex: '#8B5CF6',
          secondaryHex: '#FF4DA6',
          representativeSymbol: 'Official Lightstick',
          notableTracks: [],
          summary: String(data.summary ?? ''),
        };
      });
      onData(list);
    },
    () => onData([])
  );
}

export async function saveCmsGroupToFirestore(
  uid: string,
  group: {
    id: string;
    name: string;
    koreanName: string;
    fandomName: string;
    agency: string;
    debutDate: string;
    generation: Group['generation'];
    memberCount: number;
    summary: string;
  }
): Promise<void> {
  const safeId = group.id.replace(/[^a-zA-Z0-9_-]/g, '-').slice(0, 64) || makeSafeId('grp');
  const path = `cmsGroups/${safeId}`;
  try {
    await setDoc(doc(db, 'cmsGroups', safeId), {
      ownerId: uid,
      name: clampStr(group.name, 80),
      koreanName: clampStr(group.koreanName, 80),
      fandomName: clampStr(group.fandomName, 60),
      agency: clampStr(group.agency, 80),
      debutDate: clampStr(group.debutDate, 10, '2024-01-01'),
      generation: clampStr(group.generation, 20, '4th Gen'),
      memberCount: Math.max(1, Math.min(40, Math.round(group.memberCount))),
      summary: clampStr(group.summary, 500),
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export function subscribeCmsIdols(onData: (idols: Idol[]) => void): () => void {
  return onSnapshot(
    collection(db, 'cmsIdols'),
    (snap) => {
      const list: Idol[] = snap.docs.map((d) => {
        const data = d.data();
        return {
          id: d.id,
          stageName: String(data.stageName ?? ''),
          fullName: String(data.fullName ?? ''),
          groupId: String(data.groupId ?? ''),
          groupName: String(data.groupName ?? ''),
          birthday: String(data.birthday ?? '2000-01-01'),
          nationality: String(data.nationality ?? 'South Korean'),
          positions: ['Member'],
          representativeEmoji: '⭐',
          zodiac: 'Star',
          vibe: { stagePresence: 8, humorVariety: 8, artisticCraft: 8, warmthCare: 8, boldEdge: 8 },
          funFact: String(data.funFact ?? ''),
        };
      });
      onData(list);
    },
    () => onData([])
  );
}

export async function saveCmsIdolToFirestore(
  uid: string,
  idol: {
    id: string;
    stageName: string;
    fullName: string;
    groupId: string;
    groupName: string;
    birthday: string;
    nationality: string;
    funFact: string;
  }
): Promise<void> {
  const safeId = idol.id.replace(/[^a-zA-Z0-9_-]/g, '-').slice(0, 64) || makeSafeId('idol');
  const path = `cmsIdols/${safeId}`;
  try {
    await setDoc(doc(db, 'cmsIdols', safeId), {
      ownerId: uid,
      stageName: clampStr(idol.stageName, 60),
      fullName: clampStr(idol.fullName, 100),
      groupId: clampStr(idol.groupId, 64),
      groupName: clampStr(idol.groupName, 80),
      birthday: clampStr(idol.birthday, 10, '2000-01-01'),
      nationality: clampStr(idol.nationality, 60, 'South Korean'),
      funFact: clampStr(idol.funFact, 500),
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

// ---------- SITE SEO SETTINGS ----------

export function subscribeSiteSettings(onData: (settings: SiteSettingsRecord | null) => void): () => void {
  return onSnapshot(
    doc(db, 'siteSettings', 'global'),
    (snap) => {
      if (!snap.exists()) {
        onData(null);
        return;
      }
      const d = snap.data();
      onData({
        ownerId: String(d.ownerId ?? ''),
        siteTitle: String(d.siteTitle ?? 'IdolOrbit – K-pop News, Editorial Guides & Idol Directory'),
        siteDescription: String(d.siteDescription ?? ''),
        robotsTxt: String(d.robotsTxt ?? 'User-agent: *\nAllow: /\nDisallow: /admin'),
        allowIndexing: Boolean(d.allowIndexing ?? true),
        updatedAtIso: d.updatedAt?.toDate ? d.updatedAt.toDate().toISOString() : new Date().toISOString(),
      });
    },
    () => onData(null)
  );
}

export async function saveSiteSettingsToFirestore(
  uid: string,
  settings: Omit<SiteSettingsRecord, 'ownerId' | 'updatedAtIso'>
): Promise<void> {
  const path = 'siteSettings/global';
  try {
    await setDoc(doc(db, 'siteSettings', 'global'), {
      ownerId: uid,
      siteTitle: clampStr(settings.siteTitle, 120),
      siteDescription: clampStr(settings.siteDescription, 300),
      robotsTxt: clampStr(settings.robotsTxt, 2000),
      allowIndexing: Boolean(settings.allowIndexing),
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

// ---------- USER FAVORITES ----------

export function subscribeUserFavorites(
  uid: string,
  onData: (items: FavoriteItemRecord[]) => void
): () => void {
  const path = `users/${uid}/favorites`;
  const q = query(collection(db, 'users', uid, 'favorites'), orderBy('createdAt', 'desc'), limit(100));
  return onSnapshot(
    q,
    (snap) => {
      const list: FavoriteItemRecord[] = snap.docs.map((d) => {
        const data = d.data();
        return {
          id: d.id,
          ownerId: String(data.ownerId ?? uid),
          itemType: (String(data.itemType ?? 'idol') as FavoriteItemRecord['itemType']),
          targetId: String(data.targetId ?? ''),
          label: String(data.label ?? ''),
          createdAtIso: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : new Date().toISOString(),
        };
      });
      onData(list);
    },
    (error) => handleFirestoreError(error, OperationType.LIST, path)
  );
}

export async function saveFavoriteToFirestore(
  uid: string,
  fav: Omit<FavoriteItemRecord, 'id' | 'ownerId' | 'createdAtIso'>
): Promise<string> {
  const favId = `${fav.itemType}_${fav.targetId}`.replace(/[^a-zA-Z0-9_-]/g, '-').slice(0, 64);
  const path = `users/${uid}/favorites/${favId}`;
  try {
    await setDoc(doc(db, 'users', uid, 'favorites', favId), {
      ownerId: uid,
      itemType: fav.itemType,
      targetId: clampStr(fav.targetId, 140),
      label: clampStr(fav.label, 160),
      createdAt: serverTimestamp(),
    });
    return favId;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}

export async function deleteFavoriteFromFirestore(uid: string, favId: string): Promise<void> {
  const path = `users/${uid}/favorites/${favId}`;
  try {
    await deleteDoc(doc(db, 'users', uid, 'favorites', favId));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}

// ---------- EXISTING USER PROFILE, RESULTS, EVENTS, PHOTOCARDS ----------

export async function saveUserProfile(
  uid: string,
  profile: { displayName: string; favoriteGroup?: string; biasIdol?: string }
): Promise<void> {
  const path = `users/${uid}`;
  try {
    const payload: Record<string, unknown> = {
      ownerId: uid,
      displayName: clampStr(profile.displayName, 80, 'K-pop Fan'),
      updatedAt: serverTimestamp(),
    };
    if (profile.favoriteGroup) payload.favoriteGroup = clampStr(profile.favoriteGroup, 80);
    if (profile.biasIdol) payload.biasIdol = clampStr(profile.biasIdol, 80);
    await setDoc(doc(db, 'users', uid), payload, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export function subscribeUserProfile(
  uid: string,
  onData: (profile: UserProfileRecord | null) => void
): () => void {
  const path = `users/${uid}`;
  return onSnapshot(
    doc(db, 'users', uid),
    (snap) => {
      if (!snap.exists()) {
        onData(null);
        return;
      }
      const d = snap.data();
      onData({
        ownerId: String(d.ownerId ?? uid),
        displayName: String(d.displayName ?? 'Fan'),
        favoriteGroup: d.favoriteGroup ? String(d.favoriteGroup) : undefined,
        biasIdol: d.biasIdol ? String(d.biasIdol) : undefined,
        updatedAtIso: d.updatedAt?.toDate ? d.updatedAt.toDate().toISOString() : new Date().toISOString(),
      });
    },
    (error) => handleFirestoreError(error, OperationType.GET, path)
  );
}

export async function saveQuizResultToFirestore(
  uid: string,
  record: Omit<QuizResultRecord, 'id' | 'ownerId' | 'createdAtIso'>
): Promise<string> {
  const resultId = makeSafeId('res');
  const path = `users/${uid}/results/${resultId}`;
  try {
    await setDoc(doc(db, 'users', uid, 'results', resultId), {
      ownerId: uid,
      quizSlug: clampStr(record.quizSlug, 64).replace(/[^a-zA-Z0-9_-]/g, '-') || 'quiz',
      quizTitle: clampStr(record.quizTitle, 120, 'K-pop Quiz'),
      archetypeTitle: clampStr(record.archetypeTitle, 120, 'Result'),
      summary: clampStr(record.summary, 400, 'Completed quiz'),
      score: Math.max(0, Math.min(10000, Math.round(record.score))),
      maxScore: Math.max(1, Math.min(10000, Math.round(record.maxScore))),
      createdAt: serverTimestamp(),
    });
    return resultId;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}

export function subscribeQuizResults(
  uid: string,
  onData: (items: QuizResultRecord[]) => void
): () => void {
  const path = `users/${uid}/results`;
  const q = query(collection(db, 'users', uid, 'results'), orderBy('createdAt', 'desc'), limit(40));
  return onSnapshot(
    q,
    (snap) => {
      const list: QuizResultRecord[] = snap.docs.map((d) => {
        const data = d.data();
        return {
          id: d.id,
          ownerId: String(data.ownerId ?? uid),
          quizSlug: String(data.quizSlug ?? ''),
          quizTitle: String(data.quizTitle ?? ''),
          archetypeTitle: String(data.archetypeTitle ?? ''),
          summary: String(data.summary ?? ''),
          score: Number(data.score ?? 0),
          maxScore: Number(data.maxScore ?? 100),
          createdAtIso: data.createdAt?.toDate
            ? data.createdAt.toDate().toISOString()
            : new Date().toISOString(),
        };
      });
      onData(list);
    },
    (error) => handleFirestoreError(error, OperationType.LIST, path)
  );
}

export async function saveFanEventToFirestore(
  uid: string,
  event: Omit<FanEventRecord, 'id' | 'ownerId' | 'createdAtIso'>
): Promise<string> {
  const eventId = makeSafeId('evt');
  const path = `users/${uid}/events/${eventId}`;
  try {
    const payload: Record<string, unknown> = {
      ownerId: uid,
      title: clampStr(event.title, 120, 'Upcoming Release'),
      groupName: clampStr(event.groupName, 80, 'K-pop'),
      eventType: event.eventType,
      dateIso: clampStr(event.dateIso, 32),
      kstTime: clampStr(event.kstTime, 16, '18:00'),
      createdAt: serverTimestamp(),
    };
    if (event.sourceNote) {
      payload.sourceNote = clampStr(event.sourceNote, 160);
    }
    await setDoc(doc(db, 'users', uid, 'events', eventId), payload);
    return eventId;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}

export async function deleteFanEventFromFirestore(uid: string, eventId: string): Promise<void> {
  const path = `users/${uid}/events/${eventId}`;
  try {
    await deleteDoc(doc(db, 'users', uid, 'events', eventId));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}

export function subscribeFanEvents(
  uid: string,
  onData: (items: FanEventRecord[]) => void
): () => void {
  const path = `users/${uid}/events`;
  const q = query(collection(db, 'users', uid, 'events'), orderBy('createdAt', 'desc'), limit(40));
  return onSnapshot(
    q,
    (snap) => {
      const list: FanEventRecord[] = snap.docs.map((d) => {
        const data = d.data();
        return {
          id: d.id,
          ownerId: String(data.ownerId ?? uid),
          title: String(data.title ?? ''),
          groupName: String(data.groupName ?? ''),
          eventType: (data.eventType as FanEventRecord['eventType']) ?? 'custom',
          dateIso: String(data.dateIso ?? ''),
          kstTime: String(data.kstTime ?? '18:00'),
          sourceNote: data.sourceNote ? String(data.sourceNote) : undefined,
          createdAtIso: data.createdAt?.toDate
            ? data.createdAt.toDate().toISOString()
            : new Date().toISOString(),
        };
      });
      onData(list);
    },
    (error) => handleFirestoreError(error, OperationType.LIST, path)
  );
}

export async function savePhotocardToFirestore(
  uid: string,
  item: Omit<PhotocardItemRecord, 'id' | 'ownerId' | 'createdAtIso' | 'updatedAtIso'>
): Promise<string> {
  const itemId = makeSafeId('pc');
  const path = `users/${uid}/collections/${itemId}`;
  try {
    const payload: Record<string, unknown> = {
      ownerId: uid,
      idolId: clampStr(item.idolId, 64, 'custom'),
      idolName: clampStr(item.idolName, 80, 'Idol'),
      groupName: clampStr(item.groupName, 80, 'Group'),
      albumEra: clampStr(item.albumEra, 120, 'Album Era'),
      cardTitle: clampStr(item.cardTitle, 120, 'Photocard'),
      status: item.status,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
    if (item.notes) {
      payload.notes = clampStr(item.notes, 240);
    }
    await setDoc(doc(db, 'users', uid, 'collections', itemId), payload);
    return itemId;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}

export async function updatePhotocardStatusInFirestore(
  uid: string,
  itemId: string,
  status: 'owned' | 'wishlist'
): Promise<void> {
  const path = `users/${uid}/collections/${itemId}`;
  try {
    await updateDoc(doc(db, 'users', uid, 'collections', itemId), {
      status,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
}

export async function deletePhotocardFromFirestore(uid: string, itemId: string): Promise<void> {
  const path = `users/${uid}/collections/${itemId}`;
  try {
    await deleteDoc(doc(db, 'users', uid, 'collections', itemId));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}

export function subscribePhotocards(
  uid: string,
  onData: (items: PhotocardItemRecord[]) => void
): () => void {
  const path = `users/${uid}/collections`;
  const q = query(collection(db, 'users', uid, 'collections'), orderBy('updatedAt', 'desc'), limit(120));
  return onSnapshot(
    q,
    (snap) => {
      const list: PhotocardItemRecord[] = snap.docs.map((d) => {
        const data = d.data();
        return {
          id: d.id,
          ownerId: String(data.ownerId ?? uid),
          idolId: String(data.idolId ?? ''),
          idolName: String(data.idolName ?? ''),
          groupName: String(data.groupName ?? ''),
          albumEra: String(data.albumEra ?? ''),
          cardTitle: String(data.cardTitle ?? ''),
          status: data.status === 'wishlist' ? 'wishlist' : 'owned',
          notes: data.notes ? String(data.notes) : undefined,
          createdAtIso: data.createdAt?.toDate
            ? data.createdAt.toDate().toISOString()
            : new Date().toISOString(),
          updatedAtIso: data.updatedAt?.toDate
            ? data.updatedAt.toDate().toISOString()
            : new Date().toISOString(),
        };
      });
      onData(list);
    },
    (error) => handleFirestoreError(error, OperationType.LIST, path)
  );
}
