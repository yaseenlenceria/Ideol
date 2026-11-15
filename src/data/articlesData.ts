import { ArticleRecord, AuthorProfile, BlogCategory } from '../types/kpop';
import { ASSETS } from './kpopData';
import { GROUP_REAL_PHOTOS } from './realPhotos';
import { UPLOADED_ARTICLES } from './uploadedArticles';

export const BLOG_CATEGORIES: BlogCategory[] = [
  {
    slug: 'news',
    name: 'K-pop News & Trending',
    shortName: 'News',
    description: 'Verified industry milestones, chart records, and global festival highlights across 3rd, 4th, and 5th-gen K-pop.',
  },
  {
    slug: 'profiles',
    name: 'Idol Profiles, Ages & Birthdays',
    shortName: 'Profiles & Ages',
    description: 'Deep dives into verified idol birthdates, South Korea’s international age standard, and milestone celebrations.',
  },
  {
    slug: 'guides',
    name: 'K-pop Group Members & Guides',
    shortName: 'Group Guides',
    description: 'Complete member breakdowns, debut histories, unit structures, and official fandom names.',
  },
  {
    slug: 'comebacks',
    name: 'Comebacks, Albums & Music',
    shortName: 'Comebacks',
    description: 'How K-pop album eras, 18:00 KST digital drops, B-side production, and debut discographies work.',
  },
  {
    slug: 'concerts',
    name: 'Concerts, Tours & Tickets',
    shortName: 'Concerts',
    description: 'Practical guides to lightstick pairing, ticketing queues, stadium fanchants, and global festival stages.',
  },
  {
    slug: 'explainers',
    name: 'Fan Guides & Explainers',
    shortName: 'Fan Guides',
    description: 'Photocard binder sleeves, POB terminology, KST conversion tips, and fandom vocabulary explained clearly.',
  },
  {
    slug: 'quizzes-tools',
    name: 'K-pop Quizzes & Fan Tools',
    shortName: 'Quizzes & Tools',
    description: 'Interactive Fan DNA personality tests, verified trivia challenges, age calculators, and birthday card studios.',
  },
];

export const AUTHORS: AuthorProfile[] = [
  {
    id: 'minji-han',
    name: 'Minji Han',
    role: 'Senior Culture Editor',
    bio: 'Covers Korean music industry history, global stadium touring, and multi-generation discography retrospectives.',
  },
  {
    id: 'sora-kim',
    name: 'Sora Kim',
    role: 'Directory & Archive Lead',
    bio: 'Maintains verified debut timelines, birthdates, and Korean Standard Time release schedules across IdolOrbit.',
  },
  {
    id: 'devon-park',
    name: 'Devon Park',
    role: 'Fan Lab & Interactive Editor',
    bio: 'Designs educational K-pop quizzes, fandom terminology guides, and photocard collecting explainers.',
  },
];

const SEED_ARTICLES: ArticleRecord[] = [
  {
    id: 'art-korean-age-law-explained',
    ownerId: 'verified_editorial',
    slug: 'south-korea-international-age-law-kpop-idol-ages-explained',
    title: 'How South Korea’s International Age Standard Changed K-pop Idol Age Counting',
    subtitle: 'Understanding international age, debut age, and why older fan interviews show different numbers.',
    categorySlug: 'profiles',
    tags: ['Idol Ages', 'Korean Culture', 'BTS', 'IVE', 'ENHYPEN'],
    authorName: 'Sora Kim',
    authorRole: 'Directory & Archive Lead',
    featuredImage: GROUP_REAL_PHOTOS.bts,
    featuredImageAlt: 'Members of BTS speaking at a press conference in matching dark suits',
    bodyMarkdown: `## Why K-pop Fans Saw Multiple Ages Before 2023

For decades, fans exploring K-pop interviews noticed that idols often gave a number one or two years higher than their international age. Prior to June 2023, South Korea used three overlapping age systems simultaneously: the traditional Korean counting system (where a baby is considered 1 at birth and gains a year every January 1), the year-age system used in certain statutes, and the international age system.

## What Changed on June 28, 2023

On June 28, 2023, South Korea enacted legislation unifying legal and administrative age counting around the international standard—starting at zero at birth and adding one year on each actual birthday. In everyday media and official artist profiles, international age is now the primary standard.

## How Debut Age & Age Gaps Are Calculated

When looking up an idol’s career timeline—such as Jungkook debuting with BTS on June 13, 2013 (born September 1, 1997, making him 15 years old at debut) or Chiquita debuting with BABYMONSTER in 2024 (born February 17, 2009)—international age gives exact precision down to the day. You can verify any artist’s exact year, month, and day breakdown in the [IdolOrbit Age Finder](/tool/age-finder).

## Quick Reference for Birthday Celebrations

Most global fandoms celebrate idol birthdays at **00:00 KST** (Korea Standard Time, UTC+9). Because KST does not observe daylight saving time, midnight in Seoul often falls the morning or afternoon prior for fans in Europe and the Americas.`,
    references: [
      'Korean Ministry of Government Legislation – Age Unification Act (Effective June 28, 2023)',
      'IdolOrbit Verified Birthdate & Debut Date Directory',
    ],
    status: 'published',
    isFeatured: true,
    publishedAtIso: '2026-11-12',
    updatedAtIso: '2026-11-15',
    readingMinutes: 4,
    seoTitle: 'How South Korea’s Age Standard Works for K-pop Idols | IdolOrbit',
    seoDescription: 'Learn how South Korea’s June 2023 international age law affects K-pop idol age counting, debut ages, and KST birthday celebrations.',
    relatedGroupIds: ['bts', 'ive', 'enhypen', 'babymonster'],
    relatedIdolIds: ['bts-jungkook', 'en-jake', 'bm-chiquita'],
    isBuiltIn: true,
  },
  {
    id: 'art-5th-gen-global-wave',
    ownerId: 'verified_editorial',
    slug: 'babymonster-illit-katseye-new-wave-global-girl-groups',
    title: 'Inside the 2024 Girl Group Wave: BABYMONSTER, ILLIT, and KATSEYE Compared',
    subtitle: 'How three distinct debuts from YG Entertainment, BELIFT LAB, and HYBE x Geffen expanded global pop in 2024.',
    categorySlug: 'news',
    tags: ['BABYMONSTER', 'ILLIT', 'KATSEYE', '5th Gen'],
    authorName: 'Minji Han',
    authorRole: 'Senior Culture Editor',
    featuredImage: GROUP_REAL_PHOTOS.babymonster,
    featuredImageAlt: 'BABYMONSTER members posing together during promotional appearances',
    bodyMarkdown: `## Three Distinct Debut Blueprints in 2024

The first half of 2024 introduced three high-profile girl groups whose debuts reflected distinct production philosophies across Seoul and Los Angeles.

## ILLIT: Dreamy Synth-Pop & R U Next?

Formed through the 2023 survival program *R U Next?* under BELIFT LAB, the five-member group **ILLIT** (Yunah, Minju, Moka, Wonhee, and Iroha) debuted on **March 25, 2024** with the mini-album *SUPER REAL ME* and lead single *"Magnetic"*. Their sound leaned into bright pluggnb-inspired synth pop and relatable everyday teen aesthetics, quickly welcoming fans under the official fandom name **GLLIT**.

## BABYMONSTER: Seven-Member Live Performance Power

On **April 1, 2024**, YG Entertainment’s seven-member girl group **BABYMONSTER** (Ruka, Pharita, Asa, Ahyeon, Rami, Rora, and Chiquita) released their first mini-album *BABYMONS7ER* led by *"SHEESH"*. Known for live hand-mic vocal showcases and multilingual members fluent across Korean, Japanese, Thai, and English, the group’s official fandom is **MONSTIEZ**.

## KATSEYE: Global Pop Meets K-pop Training

Created through the international audition project *The Debut: Dream Academy* by HYBE and Geffen Records, **KATSEYE** (Sophia, Lara, Yoonchae, Megan, Daniela, and Manon) officially debuted on **June 28, 2024**, uniting K-pop choreography discipline with English-language global pop releases like *"Touch"* for their fandom **EYEKONS**.`,
    references: [
      'BELIFT LAB Official Discography – ILLIT "SUPER REAL ME" (March 25, 2024)',
      'YG Entertainment Official Profile – BABYMONSTER "BABYMONS7ER" (April 1, 2024)',
      'HYBE x Geffen Records – KATSEYE Debut Announcement (June 28, 2024)',
    ],
    status: 'published',
    isFeatured: true,
    publishedAtIso: '2026-11-10',
    updatedAtIso: '2026-11-14',
    readingMinutes: 5,
    seoTitle: 'BABYMONSTER, ILLIT & KATSEYE: 2024 Debuts Guide | IdolOrbit',
    seoDescription: 'Compare debut dates, member lineups, agencies, and fandom names of BABYMONSTER, ILLIT, and KATSEYE in our verified guide.',
    relatedGroupIds: ['babymonster', 'illit', 'katseye'],
    relatedIdolIds: ['bm-ahyeon', 'illit-wonhee', 'kat-sophia'],
    isBuiltIn: true,
  },
  {
    id: 'art-seventeen-unit-architecture',
    ownerId: 'verified_editorial',
    slug: 'seventeen-13-members-3-units-1-team-complete-guide',
    title: 'SEVENTEEN Explained: How 13 Members, 3 Units, and Self-Production Built an Arena Force',
    subtitle: 'Breaking down the Hip-Hop, Vocal, and Performance units of PLEDIS Entertainment’s 2015 debutants.',
    categorySlug: 'guides',
    tags: ['SEVENTEEN', 'CARAT', 'Group Guide', '3rd Gen'],
    authorName: 'Minji Han',
    authorRole: 'Senior Culture Editor',
    featuredImage: GROUP_REAL_PHOTOS.seventeen,
    featuredImageAlt: 'SEVENTEEN members performing together on stage at Carat Land',
    bodyMarkdown: `## Why 13 Members Equal SEVENTEEN

Debuting on **May 26, 2015** under PLEDIS Entertainment with *"Adore U"*, SEVENTEEN’s name comes from a simple equation: **13 members + 3 specialized units + 1 unified team = 17**. Rather than functioning as an undifferentiated ensemble, the group divides creative responsibilities across three internal teams.

## The Three Specialized Units

- **Hip-Hop Unit**: Led by general leader **S.Coups** alongside **Wonwoo**, **Mingyu**, and **Vernon**, driving rap verses and low-end rhythmic hooks.
- **Vocal Unit**: Led by main producer **Woozi** alongside **Jeonghan**, **Joshua**, **DK**, and **Seungkwan**, anchoring the group’s harmonies and songwriting.
- **Performance Unit**: Led by **Hoshi** alongside **Jun**, **The8**, and maknae **Dino**, crafting the synchronized choreography SEVENTEEN is known for worldwide.

## Self-Producing Since Debut

From their 2015 debut mini-album *17 CARAT* through stadium anthems like *"VERY NICE"*, *"Super"*, and *"MAESTRO"*, Woozi and fellow members have remained deeply involved in composition, lyrics, and stage arrangement—earning loyal global support from **CARAT**.`,
    references: [
      'PLEDIS Entertainment Official SEVENTEEN Profile (Debut May 26, 2015)',
      'KOMCA Songwriting Credits Registry (Woozi / Bumzu / SEVENTEEN)',
    ],
    status: 'published',
    isFeatured: false,
    publishedAtIso: '2026-11-08',
    updatedAtIso: '2026-11-12',
    readingMinutes: 4,
    seoTitle: 'SEVENTEEN Members & 3 Units Guide for New CARATs | IdolOrbit',
    seoDescription: 'Explore SEVENTEEN’s 13 members across the Hip-Hop, Vocal, and Performance units plus verified debut history.',
    relatedGroupIds: ['seventeen'],
    relatedIdolIds: ['svt-scoups', 'svt-woozi', 'svt-hoshi'],
    isBuiltIn: true,
  },
  {
    id: 'art-kst-1800-release-guide',
    ownerId: 'verified_editorial',
    slug: 'why-kpop-comebacks-drop-at-1800-kst-guide',
    title: 'Why Most K-pop Comebacks Drop at 18:00 KST (and Teasers at Midnight)',
    subtitle: 'Decoding Korean digital chart windows, 00:00 KST teaser drops, and how to convert Seoul times accurately.',
    categorySlug: 'comebacks',
    tags: ['KST', 'Comebacks', 'Music Charts', 'Fan Guide'],
    authorName: 'Sora Kim',
    authorRole: 'Directory & Archive Lead',
    featuredImage: GROUP_REAL_PHOTOS.ive,
    featuredImageAlt: 'Members of IVE arriving together on the red carpet at the 40th Golden Disc Awards',
    bodyMarkdown: `## The 18:00 KST Release Standard

If you follow K-pop comebacks from outside South Korea, you have likely noticed two recurring timestamps on agency schedules: **00:00 KST** for concept photos and music video teasers, and **18:00 KST** (6:00 PM Korea Standard Time) for full album and single releases.

## Chart Windows & Evening Commute Listening

In 2017, major Korean music platforms adjusted chart calculation rules so daytime releases would not unfairly accumulate overnight zombie-streaming data before public listeners woke up. Releasing at 18:00 KST aligns directly with South Korea’s evening commute and prime dinner hours, giving fans across Asia an immediate real-time listening window while remaining early morning in the Americas and mid-morning in Europe.

## Friday 14:00 KST for Global Releases

When artists target Friday global tracking weeks (which open at 00:00 US Eastern Time), labels frequently schedule singles at **14:00 KST** during US Eastern Daylight Time or **13:00 KST** during standard time. Always double-check the exact release hour using the [IdolOrbit KST Time Converter](/tool/kst-converter).`,
    references: [
      'Korea Music Content Association (Circle Chart) Digital Release Guidelines',
      'Official Label Comeback Scheduler Conventions (BIGHIT, JYP, SM, YG, Starship)',
    ],
    status: 'published',
    isFeatured: false,
    publishedAtIso: '2026-11-06',
    updatedAtIso: '2026-11-10',
    readingMinutes: 3,
    seoTitle: 'Why K-pop Albums Release at 18:00 KST Explained | IdolOrbit',
    seoDescription: 'Understand why K-pop labels schedule teasers at 00:00 KST and album drops at 18:00 KST or 14:00 KST.',
    relatedGroupIds: ['bts', 'straykids', 'aespa', 'twice'],
    isBuiltIn: true,
  },
  {
    id: 'art-concert-lightstick-guide',
    ownerId: 'verified_editorial',
    slug: 'kpop-concert-survival-guide-lightsticks-fanchants-queues',
    title: 'First K-pop Concert Checklist: Lightstick Pairing, Batteries, and Fanchant Prep',
    subtitle: 'Practical, venue-tested tips for ARMY Bombs, Candybongs, Carat Bongs, and stadium check-in.',
    categorySlug: 'concerts',
    tags: ['Concerts', 'Lightsticks', 'TWICE', 'ATEEZ', 'BTS'],
    authorName: 'Devon Park',
    authorRole: 'Fan Lab & Interactive Editor',
    featuredImage: GROUP_REAL_PHOTOS.blackpink,
    featuredImageAlt: 'Members of BLACKPINK standing together on the Pink Carpet event stage',
    bodyMarkdown: `## Preparing Your Official Lightstick

Modern K-pop arena and stadium concerts use Bluetooth central control so every lightstick shifts colors in sync with the stage lighting. Before leaving home:

1. **Install fresh AAA alkaline batteries**—rechargeable cells sometimes deliver lower voltage and dim early during 3-hour sets.
2. **Download the official group app in advance** (such as Weverse Lightstick, JYP Lightstick, or SMTOWN app) and test Bluetooth pairing before reaching crowded venue cell towers.
3. **Carry spare batteries in a small pouch**—removing batteries between concerts prevents slow parasitic drain.

## Fanchants & Freebie Etiquette

Fans often exchange handmade photocard sleeves, bracelets, and lyric cards in venue queues before doors open. Learning key chorus fanchant cues—like group member order chants during song intros—turns a great concert into an unforgettable shared memory.

## Protecting Your Hearing & Shoes

Indoor arenas regularly exceed 100 decibels. High-fidelity musician earplugs preserve vocal clarity while preventing post-show ringing.`,
    references: [
      'Official Venue Bag Policy & Battery Safety Guidelines (KSPO Dome / Global Stadium Tours)',
      'Official Fandom Lightstick App Pairing Manuals',
    ],
    status: 'published',
    isFeatured: false,
    publishedAtIso: '2026-11-03',
    updatedAtIso: '2026-11-05',
    readingMinutes: 4,
    seoTitle: 'First K-pop Concert Guide: Lightsticks, Batteries & Prep | IdolOrbit',
    seoDescription: 'Everything first-time concertgoers need to know about lightstick Bluetooth pairing, battery prep, fanchants, and venue etiquette.',
    relatedGroupIds: ['bts', 'twice', 'ateez', 'seventeen'],
    isBuiltIn: true,
  },
  {
    id: 'art-photocard-collecting-guide',
    ownerId: 'verified_editorial',
    slug: 'kpop-photocard-collecting-guide-pobs-sleeves-binders',
    title: 'K-pop Photocard Collecting 101: PVC-Free Sleeves, POBs, and Binder Care',
    subtitle: 'How to protect album pulls, tell regular inclusions from pre-order benefits, and organize your wishlist.',
    categorySlug: 'explainers',
    tags: ['Photocards', 'Collectors', 'POB', 'Fan Guide'],
    authorName: 'Devon Park',
    authorRole: 'Fan Lab & Interactive Editor',
    featuredImage: ASSETS.photocardBinder,
    featuredImageAlt: 'Holographic collectible photocard sleeves and acrylic binder rings on deep plum velvet',
    bodyMarkdown: `## Album Pulls vs. POBs vs. Lucky Draws

New collectors quickly encounter three terms across trading spaces:
- **Album Photocards**: Randomly included inside sealed albums.
- **POBs (Pre-Order Benefits)**: Bonus cards issued by specific retailers (such as Weverse Shop, Soundwave, Makestar, or Target) for orders placed before release day.
- **Lucky Draws**: Random photocard drops from physical kiosk machines or pop-up events during comeback week.

## Why PVC-Free Sleeves Matter

Standard vinyl or PVC pockets can leach plasticizers over time, causing photocard ink to stick or warp. Always sleeve cards in **archival-grade polypropylene (PP)** sleeves (commonly 56×87mm or 57×88mm for standard Korean 55×85mm cards) stored inside acid-free binder pages.

## Tracking Your Binder

Keep track of every card you already own versus high-priority wishlist targets inside the [IdolOrbit Photocard Tracker](/tool/photocard-tracker).`,
    references: [
      'Standard Korean Album Photocard Dimensions (55×85mm) & Archival Polypropylene Care Standards',
    ],
    status: 'published',
    isFeatured: false,
    publishedAtIso: '2026-10-29',
    updatedAtIso: '2026-11-01',
    readingMinutes: 4,
    seoTitle: 'Photocard Collecting 101: Sleeves, POBs & Binders | IdolOrbit',
    seoDescription: 'Learn the difference between album pulls, POBs, and lucky draws, plus how to choose PVC-free binder sleeves.',
    relatedGroupIds: ['straykids', 'ive', 'aespa', 'txt'],
    isBuiltIn: true,
  },
  {
    id: 'art-fan-lab-interactive-launch',
    ownerId: 'verified_editorial',
    slug: 'explore-idolorbit-fan-lab-quizzes-birthday-timers',
    title: 'Play IdolOrbit Fan Lab: 12 Interactive Quizzes, KST Timers & Card Studios',
    subtitle: 'Test your K-pop Fan DNA, challenge friends in verified trivia, or create downloadable 1080×1920 birthday cards.',
    categorySlug: 'quizzes-tools',
    tags: ['Fan DNA', 'Trivia', 'Birthday Card', 'Photocards'],
    authorName: 'Devon Park',
    authorRole: 'Fan Lab & Interactive Editor',
    featuredImage: GROUP_REAL_PHOTOS.straykids,
    featuredImageAlt: 'Members of Stray Kids posing together at the 40th Golden Disc Awards',
    bodyMarkdown: `## Welcome to the Interactive Fan Lab

Alongside our editorial news and verified artist directories, IdolOrbit hosts **12 interactive quizzes and practical fan utilities** designed for mobile and desktop:

- **K-pop Fan DNA**: Answer 7 weighted questions to uncover whether you are a Stage Choreographer, Midnight Streamer, Aesthetic Collector, Lore Detective, Vocal Purist, or Concert Energy Captain.
- **K-pop Trivia**: Challenge yourself across Rookie, Sunbae, and Legend tiers with verified historical facts.
- **Idol Age Finder & Birthday Countdown**: Live KST midnight countdowns and exact year-month-day age calculators.
- **Birthday Card Maker & Photocard Tracker**: Export custom 1080×1920 tribute cards and manage your binder inventory.

## Launch Any Experience Directly

Visit the [IdolOrbit Fan Lab Hub](/fan-lab) to jump into any quiz or utility, or download a 1080×1920 result card to share with your group chat.`,
    references: [
      'IdolOrbit Fan Lab Interactive Toolset & Verified K-pop Directory',
    ],
    status: 'published',
    isFeatured: false,
    publishedAtIso: '2026-10-25',
    updatedAtIso: '2026-11-15',
    readingMinutes: 3,
    seoTitle: 'IdolOrbit Fan Lab: 12 K-pop Quizzes & Interactive Tools',
    seoDescription: 'Discover IdolOrbit Fan Lab’s 12 interactive quizzes, KST timers, Idol Age Finder, Card Maker, and Photocard Tracker.',
    relatedGroupIds: ['bts', 'blackpink', 'straykids', 'twice'],
    isBuiltIn: true,
  },
];

export const BUILT_IN_ARTICLES: ArticleRecord[] = [...UPLOADED_ARTICLES, ...SEED_ARTICLES];

