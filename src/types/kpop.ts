export type ExperienceCategory = 'quiz' | 'tool';

export type BlogCategorySlug =
  | 'news'
  | 'profiles'
  | 'guides'
  | 'comebacks'
  | 'concerts'
  | 'explainers'
  | 'quizzes-tools';

export interface BlogCategory {
  slug: BlogCategorySlug;
  name: string;
  shortName: string;
  description: string;
}

export interface AuthorProfile {
  id: string;
  name: string;
  role: string;
  bio: string;
}

export type ArticleStatus = 'draft' | 'scheduled' | 'published';

export interface ArticleRecord {
  id: string;
  ownerId: string;
  slug: string;
  title: string;
  subtitle: string;
  categorySlug: BlogCategorySlug;
  tags: string[];
  authorName: string;
  authorRole: string;
  featuredImage: string;
  featuredImageAlt: string;
  bodyMarkdown: string;
  bodyHtml?: string;
  photoCredit?: {
    text: string;
    sourceUrl?: string;
    licenceUrl?: string;
  };
  references: string[];
  status: ArticleStatus;
  isFeatured: boolean;
  publishedAtIso: string;
  updatedAtIso: string;
  readingMinutes: number;
  seoTitle?: string;
  seoDescription?: string;
  canonicalUrl?: string;
  relatedGroupIds?: string[];
  relatedIdolIds?: string[];
  isBuiltIn?: boolean;
}

export interface SiteSettingsRecord {
  ownerId: string;
  siteTitle: string;
  siteDescription: string;
  robotsTxt: string;
  allowIndexing: boolean;
  updatedAtIso: string;
}

export interface FavoriteItemRecord {
  id: string;
  ownerId: string;
  itemType: 'idol' | 'group' | 'article';
  targetId: string;
  label: string;
  createdAtIso: string;
}

export interface Group {
  id: string;
  name: string;
  koreanName: string;
  fandomName: string;
  agency: string;
  debutDate: string; // YYYY-MM-DD verified
  generation: '2nd Gen' | '3rd Gen' | '4th Gen' | '5th Gen' | 'Global';
  memberCount: number;
  accentHex: string;
  secondaryHex: string;
  representativeSymbol: string;
  notableTracks: string[];
  summary: string;
  photoUrl?: string;
  statusNote?: string;
}

export interface VibeVector {
  stagePresence: number;
  humorVariety: number;
  artisticCraft: number;
  warmthCare: number;
  boldEdge: number;
}

export interface Idol {
  id: string;
  stageName: string;
  fullName: string;
  koreanName?: string;
  groupId: string;
  groupName: string;
  birthday: string; // YYYY-MM-DD verified
  nationality: string;
  positions: string[];
  representativeEmoji: string;
  zodiac: string;
  vibe: VibeVector;
  funFact: string;
  photoUrl?: string;
  statusNote?: string;
  legacyDates?: {
    born: string;
    passed: string;
    label: string;
  };
}

export interface ExperienceMeta {
  slug: string;
  path: string;
  title: string;
  shortTitle: string;
  category: ExperienceCategory;
  featured: boolean;
  priority?: boolean;
  tagline: string;
  description: string;
  durationOrMode: string;
  imageUrl: string;
  seoTitle: string;
  seoDescription: string;
}

export interface FanDnaDimensionScores {
  choreo: number;
  streamer: number;
  collector: number;
  detective: number;
  vocal: number;
  captain: number;
}

export interface FanDnaOption {
  id: string;
  label: string;
  detail: string;
  weights: Partial<FanDnaDimensionScores>;
}

export interface FanDnaQuestion {
  id: string;
  order: number;
  prompt: string;
  context: string;
  options: FanDnaOption[];
}

export interface FanDnaArchetype {
  code: keyof FanDnaDimensionScores;
  title: string;
  subtitle: string;
  summary: string;
  signatureTrait: string;
  compatibleArchetype: string;
  accentHex: string;
}

export type TriviaDifficulty = 'Rookie' | 'Sunbae' | 'Legend';

export interface TriviaQuestion {
  id: string;
  groupId: string;
  groupName: string;
  difficulty: TriviaDifficulty;
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  verifiedSourceNote: string;
}

export interface QuizResultRecord {
  id: string;
  ownerId: string;
  quizSlug: string;
  quizTitle: string;
  archetypeTitle: string;
  summary: string;
  score: number;
  maxScore: number;
  createdAtIso: string;
  isGuest?: boolean;
}

export type FanEventType = 'comeback' | 'concert' | 'anniversary' | 'custom';

export interface FanEventRecord {
  id: string;
  ownerId: string;
  title: string;
  groupName: string;
  eventType: FanEventType;
  dateIso: string;
  kstTime: string;
  sourceNote?: string;
  createdAtIso: string;
  isVerifiedBuiltIn?: boolean;
}

export type PhotocardStatus = 'owned' | 'wishlist';

export interface PhotocardItemRecord {
  id: string;
  ownerId: string;
  idolId: string;
  idolName: string;
  groupName: string;
  albumEra: string;
  cardTitle: string;
  status: PhotocardStatus;
  notes?: string;
  createdAtIso: string;
  updatedAtIso: string;
}

export interface UserProfileRecord {
  ownerId: string;
  displayName: string;
  favoriteGroup?: string;
  biasIdol?: string;
  updatedAtIso: string;
}
