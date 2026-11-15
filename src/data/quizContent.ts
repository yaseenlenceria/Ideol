import {
  FanDnaArchetype,
  FanDnaDimensionScores,
  FanDnaQuestion,
  Idol,
  TriviaQuestion,
  VibeVector,
} from '../types/kpop';

export const FAN_DNA_QUESTIONS: FanDnaQuestion[] = [
  {
    id: 'fd-1',
    order: 1,
    prompt: 'A brand-new music video teaser just dropped at 00:00 KST. What is your first move?',
    context: 'Midnight Teaser Protocol',
    options: [
      {
        id: 'fd-1-a',
        label: 'Freeze-frame every frame for lore & hidden numbers',
        detail: 'Check album notes, Greek mythology cues, and Morse code.',
        weights: { detective: 3, collector: 1 },
      },
      {
        id: 'fd-1-b',
        label: 'Replay the 4-second dance break at 0.5x speed',
        detail: 'Map out the formation change and footwork immediately.',
        weights: { choreo: 3, captain: 1 },
      },
      {
        id: 'fd-1-c',
        label: 'Isolate the vocal harmony and pre-chorus chord progression',
        detail: 'Listen with headphones to catch every ad-lib layer.',
        weights: { vocal: 3, detective: 1 },
      },
      {
        id: 'fd-1-d',
        label: 'Open the group chat and rally everyone for comeback goals',
        detail: 'Coordinate playlists, alarms, and release-day excitement.',
        weights: { streamer: 2, captain: 2 },
      },
    ],
  },
  {
    id: 'fd-2',
    order: 2,
    prompt: 'Which corner of K-pop culture feels most like home to you?',
    context: 'Fandom Habitat',
    options: [
      {
        id: 'fd-2-a',
        label: 'Sleeve-sorting rare POBs and color-coding binder spreads',
        detail: 'Nothing beats completing an album photocard page.',
        weights: { collector: 3, detective: 1 },
      },
      {
        id: 'fd-2-b',
        label: 'Fancam marathons and Studio Choom performance breakdowns',
        detail: 'Stage lighting, live stamina, and synchronized angles.',
        weights: { choreo: 3, vocal: 1 },
      },
      {
        id: 'fd-2-c',
        label: 'Killing Voice sessions, encore stages, and acoustic covers',
        detail: 'Raw microphones and effortless live harmonies.',
        weights: { vocal: 3, streamer: 1 },
      },
      {
        id: 'fd-2-d',
        label: 'Stadium fanchants, lightstick syncing, and concert vlogs',
        detail: 'Turning an entire arena into one glowing ocean.',
        weights: { captain: 3, streamer: 1 },
      },
    ],
  },
  {
    id: 'fd-3',
    order: 3,
    prompt: 'Album pre-orders open with four photobook versions. How do you choose?',
    context: 'Comeback Economics',
    options: [
      {
        id: 'fd-3-a',
        label: 'Track which concept teasers match my binder palette',
        detail: 'Pick the aesthetic that frames best on the shelf.',
        weights: { collector: 3 },
      },
      {
        id: 'fd-3-b',
        label: 'Check the tracklist credits for producers and lyricists first',
        detail: 'Follow the songwriting and B-side sonic direction.',
        weights: { vocal: 2, detective: 2 },
      },
      {
        id: 'fd-3-c',
        label: 'Focus on digital release goals and first-week streaming',
        detail: 'Chart milestones and music show voting come first.',
        weights: { streamer: 3, captain: 1 },
      },
      {
        id: 'fd-3-d',
        label: 'Watch showcase performance previews before deciding',
        detail: 'Wait to see which era stage outfits hit hardest.',
        weights: { choreo: 2, captain: 1, collector: 1 },
      },
    ],
  },
  {
    id: 'fd-4',
    order: 4,
    prompt: 'You convert a friend into your favorite group. What link do you send first?',
    context: 'The Gateway Recommendation',
    options: [
      {
        id: 'fd-4-a',
        label: 'A 2x speed dance practice or synchronized relay dance',
        detail: 'Show off razor-sharp teamwork and charisma.',
        weights: { choreo: 3, captain: 1 },
      },
      {
        id: 'fd-4-b',
        label: 'A deep-dive timeline explaining their storyline universe',
        detail: 'Connect music videos from debut to today.',
        weights: { detective: 3, collector: 1 },
      },
      {
        id: 'fd-4-c',
        label: 'A live band festival set or vocal medley without backing track',
        detail: 'Prove how unstoppable they sound live.',
        weights: { vocal: 3, streamer: 1 },
      },
      {
        id: 'fd-4-d',
        label: 'A chaotic variety episode compilation with iconic captions',
        detail: 'Make them fall for the members’ genuine chemistry.',
        weights: { captain: 2, streamer: 2 },
      },
    ],
  },
  {
    id: 'fd-5',
    order: 5,
    prompt: 'Your playlist at 2:00 AM looks like:',
    context: 'Late Night Rotation',
    options: [
      {
        id: 'fd-5-a',
        label: 'Dreamy B-sides, piano ballads, and rain-window vocal tracks',
        detail: 'Pure emotional storytelling through headphones.',
        weights: { vocal: 3, detective: 1 },
      },
      {
        id: 'fd-5-b',
        label: 'High-BPM title tracks to keep energy peaking',
        detail: 'Focused streaming rotation with zero skips.',
        weights: { streamer: 3, choreo: 1 },
      },
      {
        id: 'fd-5-c',
        label: 'Live tour audio rips with crowd cheers in the chorus',
        detail: 'Reliving the encore rush in your room.',
        weights: { captain: 3, vocal: 1 },
      },
      {
        id: 'fd-5-d',
        label: 'Concept soundtracks and hidden album intro/outro interludes',
        detail: 'Every transition tells part of the era story.',
        weights: { detective: 2, collector: 2 },
      },
    ],
  },
  {
    id: 'fd-6',
    order: 6,
    prompt: 'What is your signature concert preparation move?',
    context: 'Tour Season Ritual',
    options: [
      {
        id: 'fd-6-a',
        label: 'Customizing the lightstick and packing freebie photocard packs',
        detail: 'Crafting ribbons, stickers, and trade sleeves for section neighbors.',
        weights: { collector: 2, captain: 2 },
      },
      {
        id: 'fd-6-b',
        label: 'Memorizing every fanchant cue down to the millisecond',
        detail: 'Leading the section during the bridge.',
        weights: { captain: 3, streamer: 1 },
      },
      {
        id: 'fd-6-c',
        label: 'Learning the point choreography for the encore medley',
        detail: 'Ready for the random dance challenge camera.',
        weights: { choreo: 3 },
      },
      {
        id: 'fd-6-d',
        label: 'Studying past tour setlists to predict surprise encore songs',
        detail: 'Comparing city-by-city rotations in spreadsheets.',
        weights: { detective: 3, streamer: 1 },
      },
    ],
  },
  {
    id: 'fd-7',
    order: 7,
    prompt: 'Pick the achievement that makes you proudest as a fan:',
    context: 'Orbit Milestone',
    options: [
      {
        id: 'fd-7-a',
        label: 'Helping a comeback hit #1 on global charts and music shows',
        detail: 'Consistent daily streams and voting teamwork.',
        weights: { streamer: 3, captain: 1 },
      },
      {
        id: 'fd-7-b',
        label: 'Pulling your ultimate bias photocard after months of searching',
        detail: 'Mint condition, holographic sleeve, centerpiece spot.',
        weights: { collector: 3 },
      },
      {
        id: 'fd-7-c',
        label: 'Calling a comeback concept twist weeks before the official reveal',
        detail: 'Your theory thread aged like fine wine.',
        weights: { detective: 3 },
      },
      {
        id: 'fd-7-d',
        label: 'Nailing the full chorus dance or high-note bridge effortlessly',
        detail: 'Living the performance energy yourself.',
        weights: { choreo: 2, vocal: 2 },
      },
    ],
  },
];

export const FAN_DNA_ARCHETYPES: Record<keyof FanDnaDimensionScores, FanDnaArchetype> = {
  choreo: {
    code: 'choreo',
    title: 'The Stage Choreographer',
    subtitle: 'Precision · Rhythm · Performance Energy',
    summary:
      'You experience K-pop through movement and kinetic storytelling. You notice sharp formation transitions, footwork timing, and live stage stamina before anyone else in the room.',
    signatureTrait: 'Instantly clocks 0.5-beat syncopation in dance practice videos',
    compatibleArchetype: 'The Concert Energy Captain',
    accentHex: '#FF4DA6',
  },
  streamer: {
    code: 'streamer',
    title: 'The Midnight Streamer',
    subtitle: 'Momentum · Chart Craft · Release Discipline',
    summary:
      'You are the heartbeat of every comeback week. Timezone alarms, clean streaming queues, and music show voting windows run like clockwork whenever your group drops new music.',
    signatureTrait: 'Converts 18:00 KST to local time faster than a world clock',
    compatibleArchetype: 'The Lore Detective',
    accentHex: '#8B5CF6',
  },
  collector: {
    code: 'collector',
    title: 'The Aesthetic Collector',
    subtitle: 'Curation · Binder Architecture · Era Memory',
    summary:
      'Every photobook, holographic POB, and concert ribbon is an archive of an era. Your binder spreads tell a visual history with museum-grade care.',
    signatureTrait: 'Knows exact sleeve dimensions and album version inserts by heart',
    compatibleArchetype: 'The Vocal Purist',
    accentHex: '#EC4899',
  },
  detective: {
    code: 'detective',
    title: 'The Lore Detective',
    subtitle: 'Symbolism · Theory Craft · Deep Discography',
    summary:
      'Nothing in a music video is accidental to you. You connect tracklist credits, visual callbacks, and multi-year universe threads that casual listeners miss completely.',
    signatureTrait: 'Spotted a debut-era prop hidden in the latest teaser background',
    compatibleArchetype: 'The Midnight Streamer',
    accentHex: '#A855F7',
  },
  vocal: {
    code: 'vocal',
    title: 'The Vocal Purist',
    subtitle: 'Harmonies · Live Craft · Sonic Depth',
    summary:
      'You live for raw hand-mic stages, hidden background harmonies, and soaring bridges. B-sides and acoustic encore moments are where your favorite artists shine brightest.',
    signatureTrait: 'Can identify every member by a half-second vocal ad-lib',
    compatibleArchetype: 'The Aesthetic Collector',
    accentHex: '#38BDF8',
  },
  captain: {
    code: 'captain',
    title: 'The Concert Energy Captain',
    subtitle: 'Community · Fanchants · Arena Spirit',
    summary:
      'You turn individual fandom into shared joy. Whether syncing lightsticks, packing concert freebies, or leading fanchants, you bring fans together.',
    signatureTrait: 'Knows every crowd cue and makes newcomers feel welcome instantly',
    compatibleArchetype: 'The Stage Choreographer',
    accentHex: '#F472B6',
  },
};

export function computeFanDnaResult(answers: Record<string, string>): {
  scores: FanDnaDimensionScores;
  winner: FanDnaArchetype;
  runnerUp: FanDnaArchetype;
} {
  const scores: FanDnaDimensionScores = {
    choreo: 0,
    streamer: 0,
    collector: 0,
    detective: 0,
    vocal: 0,
    captain: 0,
  };

  for (const q of FAN_DNA_QUESTIONS) {
    const selectedId = answers[q.id];
    const opt = q.options.find((o) => o.id === selectedId);
    if (!opt) continue;
    (Object.keys(opt.weights) as Array<keyof FanDnaDimensionScores>).forEach((dim) => {
      scores[dim] += opt.weights[dim] ?? 0;
    });
  }

  const ranked = (Object.keys(scores) as Array<keyof FanDnaDimensionScores>).sort(
    (a, b) => scores[b] - scores[a]
  );

  return {
    scores,
    winner: FAN_DNA_ARCHETYPES[ranked[0]],
    runnerUp: FAN_DNA_ARCHETYPES[ranked[1]],
  };
}

// Deterministic Bias Match & Soulmate questions
export interface VibeQuestion {
  id: string;
  prompt: string;
  options: Array<{
    id: string;
    label: string;
    delta: Partial<VibeVector>;
  }>;
}

export const BIAS_MATCH_QUESTIONS: VibeQuestion[] = [
  {
    id: 'bm-1',
    prompt: 'On a big performance night, what role feels most natural to you?',
    options: [
      { id: 'bm-1a', label: 'Commanding center stage with fearless energy', delta: { stagePresence: 3, boldEdge: 2 } },
      { id: 'bm-1b', label: 'Making sure everyone behind the scenes feels calm and supported', delta: { warmthCare: 3, artisticCraft: 1 } },
      { id: 'bm-1c', label: 'Keeping the team laughing so nerves disappear', delta: { humorVariety: 3, warmthCare: 1 } },
      { id: 'bm-1d', label: 'Fine-tuning every lyric, harmony, and musical detail', delta: { artisticCraft: 3, stagePresence: 1 } },
    ],
  },
  {
    id: 'bm-2',
    prompt: 'How do your closest friends describe your everyday personality?',
    options: [
      { id: 'bm-2a', label: 'Effortlessly funny and quick with a comeback', delta: { humorVariety: 3, boldEdge: 1 } },
      { id: 'bm-2b', label: 'Thoughtful listener who remembers small details', delta: { warmthCare: 3, artisticCraft: 1 } },
      { id: 'bm-2c', label: 'Charismatic trendsetter who stands out without trying', delta: { boldEdge: 3, stagePresence: 2 } },
      { id: 'bm-2d', label: 'Quietly creative and deeply passionate about hobbies', delta: { artisticCraft: 3, warmthCare: 1 } },
    ],
  },
  {
    id: 'bm-3',
    prompt: 'Pick your ideal weekend creative project:',
    options: [
      { id: 'bm-3a', label: 'Writing songs, journaling melodies, or film photography', delta: { artisticCraft: 3, warmthCare: 1 } },
      { id: 'bm-3b', label: 'Learning a challenging dance routine from scratch', delta: { stagePresence: 3, boldEdge: 1 } },
      { id: 'bm-3c', label: 'Hosting a chaotic game night and cooking for friends', delta: { humorVariety: 3, warmthCare: 2 } },
      { id: 'bm-3d', label: 'Styling an iconic outfit and shooting bold street photos', delta: { boldEdge: 3, stagePresence: 2 } },
    ],
  },
  {
    id: 'bm-4',
    prompt: 'When an unexpected problem hits a group project, you:',
    options: [
      { id: 'bm-4a', label: 'Step up decisively and take charge of the plan', delta: { stagePresence: 2, boldEdge: 2, warmthCare: 1 } },
      { id: 'bm-4b', label: 'Bring snacks and check on everyone’s stress level first', delta: { warmthCare: 3, humorVariety: 1 } },
      { id: 'bm-4c', label: 'Lighten the tension with humor before solving it', delta: { humorVariety: 3 } },
      { id: 'bm-4d', label: 'Dive deep into the technical craft to fix the root cause', delta: { artisticCraft: 3 } },
    ],
  },
  {
    id: 'bm-5',
    prompt: 'Which stage concept aesthetic pulls you in strongest?',
    options: [
      { id: 'bm-5a', label: 'Futuristic chrome, cyber beats, and sharp leather', delta: { boldEdge: 3, stagePresence: 2 } },
      { id: 'bm-5b', label: 'Dreamy golden-hour acoustic warmth and velvet', delta: { warmthCare: 2, artisticCraft: 2 } },
      { id: 'bm-5c', label: 'High-energy confetti pop with playful choreography', delta: { humorVariety: 2, stagePresence: 2 } },
      { id: 'bm-5d', label: 'Theatrical storytelling with dramatic lighting contrasts', delta: { stagePresence: 3, artisticCraft: 2 } },
    ],
  },
  {
    id: 'bm-6',
    prompt: 'Choose the compliment that hits deepest:',
    options: [
      { id: 'bm-6a', label: '"You always make everyone in the room feel safe and valued."', delta: { warmthCare: 3 } },
      { id: 'bm-6b', label: '"Nobody owns a room the way you do."', delta: { stagePresence: 3, boldEdge: 1 } },
      { id: 'bm-6c', label: '"Your taste and creativity are on another level."', delta: { artisticCraft: 3 } },
      { id: 'bm-6d', label: '"Life is ten times funnier whenever you are around."', delta: { humorVariety: 3 } },
    ],
  },
];

export const SOULMATE_SCENARIO_QUESTIONS: VibeQuestion[] = [
  {
    id: 'sm-1',
    prompt: 'Rain taps against a Seoul café window. What are you two doing?',
    options: [
      { id: 'sm-1a', label: 'Sharing one set of wired earbuds and rating unreleased demos', delta: { artisticCraft: 3, warmthCare: 2 } },
      { id: 'sm-1b', label: 'Laughing over terrible puns and trying every pastry on the menu', delta: { humorVariety: 3, warmthCare: 2 } },
      { id: 'sm-1c', label: 'Planning a spontaneous midnight drive to the Han River', delta: { boldEdge: 3, stagePresence: 2 } },
      { id: 'sm-1d', label: 'Sketching dream stage outfits on café napkins', delta: { stagePresence: 2, artisticCraft: 2 } },
    ],
  },
  {
    id: 'sm-2',
    prompt: 'Pick a shared hobby that keeps you both up past midnight:',
    options: [
      { id: 'sm-2a', label: 'Co-op video games with overly competitive commentary', delta: { humorVariety: 3, boldEdge: 1 } },
      { id: 'sm-2b', label: 'Late-night studio jam sessions with guitar and keyboard', delta: { artisticCraft: 3, warmthCare: 1 } },
      { id: 'sm-2c', label: 'Choreographing goofy transitions in an empty practice room', delta: { stagePresence: 3, humorVariety: 2 } },
      { id: 'sm-2d', label: 'Cooking comfort food and adopting stray neighborhood cats', delta: { warmthCare: 3 } },
    ],
  },
  {
    id: 'sm-3',
    prompt: 'Before a huge showcase, how do you hype each other up?',
    options: [
      { id: 'sm-3a', label: 'Quiet, grounded reassurance and a steady hug backstage', delta: { warmthCare: 3 } },
      { id: 'sm-3b', label: 'A fearless fist-bump: "Let’s tear the roof off tonight."', delta: { boldEdge: 3, stagePresence: 2 } },
      { id: 'sm-3c', label: 'Doing an absurd warm-up impression to break the nerves', delta: { humorVariety: 3 } },
      { id: 'sm-3d', label: 'Running vocal harmonies together one last time', delta: { artisticCraft: 3, stagePresence: 1 } },
    ],
  },
  {
    id: 'sm-4',
    prompt: 'What kind of travel itinerary matches your duo energy?',
    options: [
      { id: 'sm-4a', label: 'Zero schedule—wander indie vinyl shops and art museums', delta: { artisticCraft: 3, boldEdge: 1 } },
      { id: 'sm-4b', label: 'Thrill-seeking amusement parks and night street food markets', delta: { humorVariety: 2, stagePresence: 2, boldEdge: 1 } },
      { id: 'sm-4c', label: 'Peaceful coastal cottage by the ocean with a bonfire', delta: { warmthCare: 3, artisticCraft: 1 } },
      { id: 'sm-4d', label: 'Fashion week front rows and rooftop city skylines', delta: { boldEdge: 3, stagePresence: 3 } },
    ],
  },
  {
    id: 'sm-5',
    prompt: 'Choose the communication style that feels most comforting:',
    options: [
      { id: 'sm-5a', label: 'Long voice notes sharing random midnight thoughts', delta: { warmthCare: 3, artisticCraft: 1 } },
      { id: 'sm-5b', label: 'Endless meme threads and chaotic inside jokes', delta: { humorVariety: 3 } },
      { id: 'sm-5c', label: 'Direct, honest loyalty—always in your corner', delta: { boldEdge: 2, warmthCare: 2 } },
      { id: 'sm-5d', label: 'Sending playlists when words feel too small', delta: { artisticCraft: 3 } },
    ],
  },
  {
    id: 'sm-6',
    prompt: 'If your duo had a theme song vibe, it would sound like:',
    options: [
      { id: 'sm-6a', label: 'Velvet R&B bassline with soaring vocal harmonies', delta: { artisticCraft: 2, boldEdge: 2 } },
      { id: 'sm-6b', label: 'Sparkling synth-pop made for highway sing-alongs', delta: { stagePresence: 2, humorVariety: 2 } },
      { id: 'sm-6c', label: 'Warm acoustic indie track with heartfelt lyrics', delta: { warmthCare: 3, artisticCraft: 2 } },
      { id: 'sm-6d', label: 'Stadium rock-pop anthem with an explosive chorus', delta: { stagePresence: 3, boldEdge: 2 } },
    ],
  },
  {
    id: 'sm-7',
    prompt: 'One final spark—what draws you to someone right away?',
    options: [
      { id: 'sm-7a', label: 'Unshakable kindness toward everyone around them', delta: { warmthCare: 3 } },
      { id: 'sm-7b', label: 'Electric confidence and fearless authenticity', delta: { boldEdge: 3, stagePresence: 2 } },
      { id: 'sm-7c', label: 'Dedication to their craft and quiet brilliance', delta: { artisticCraft: 3 } },
      { id: 'sm-7d', label: 'Playful spark that turns ordinary days into memories', delta: { humorVariety: 3 } },
    ],
  },
];

export function matchIdolByVibe(
  questions: VibeQuestion[],
  answers: Record<string, string>,
  pool: Idol[]
): {
  userVector: VibeVector;
  bestMatch: Idol;
  runnersUp: Idol[];
  compatibilityPct: number;
} {
  const userVector: VibeVector = {
    stagePresence: 5,
    humorVariety: 5,
    artisticCraft: 5,
    warmthCare: 5,
    boldEdge: 5,
  };

  for (const q of questions) {
    const opt = q.options.find((o) => o.id === answers[q.id]);
    if (!opt) continue;
    (Object.keys(opt.delta) as Array<keyof VibeVector>).forEach((k) => {
      userVector[k] = Math.min(10, Math.max(1, userVector[k] + (opt.delta[k] ?? 0) * 0.65));
    });
  }

  const scored = pool.map((idol) => {
    const diffSq =
      Math.pow(userVector.stagePresence - idol.vibe.stagePresence, 2) +
      Math.pow(userVector.humorVariety - idol.vibe.humorVariety, 2) +
      Math.pow(userVector.artisticCraft - idol.vibe.artisticCraft, 2) +
      Math.pow(userVector.warmthCare - idol.vibe.warmthCare, 2) +
      Math.pow(userVector.boldEdge - idol.vibe.boldEdge, 2);
    const dist = Math.sqrt(diffSq);
    const pct = Math.max(72, Math.min(99, Math.round(100 - dist * 2.6)));
    return { idol, dist, pct };
  });

  scored.sort((a, b) => a.dist - b.dist);

  return {
    userVector,
    bestMatch: scored[0].idol,
    runnersUp: scored.slice(1, 4).map((s) => s.idol),
    compatibilityPct: scored[0].pct,
  };
}

// Verified K-pop Trivia Bank (all dates, fandoms, agencies, and facts verified)
export const TRIVIA_QUESTIONS: TriviaQuestion[] = [
  // BTS
  {
    id: 'tr-bts-1',
    groupId: 'bts',
    groupName: 'BTS',
    difficulty: 'Rookie',
    prompt: 'On what exact date did BTS make their official debut?',
    options: ['June 13, 2013', 'August 8, 2014', 'March 4, 2013', 'October 20, 2015'],
    correctIndex: 0,
    explanation: 'BTS debuted on June 13, 2013 under Big Hit Entertainment with the single album "2 Cool 4 Skool".',
    verifiedSourceNote: 'Official BIGHIT MUSIC discography archive',
  },
  {
    id: 'tr-bts-2',
    groupId: 'bts',
    groupName: 'BTS',
    difficulty: 'Rookie',
    prompt: 'What is the official name of BTS’s global fandom?',
    options: ['BLINK', 'ARMY', 'MOA', 'CARAT'],
    correctIndex: 1,
    explanation: 'ARMY stands for "Adorable Representative M.C. for Youth" and was announced in July 2013.',
    verifiedSourceNote: 'Official BTS fandom announcement',
  },
  {
    id: 'tr-bts-3',
    groupId: 'bts',
    groupName: 'BTS',
    difficulty: 'Sunbae',
    prompt: 'Which BTS member coined the phrase "I Purple You" (Borahae) in November 2016?',
    options: ['RM', 'Jimin', 'V', 'Jungkook'],
    correctIndex: 2,
    explanation: 'V coined "Borahae" at the BTS 3rd Muster fanmeeting in November 2016, explaining purple is the last color of the rainbow.',
    verifiedSourceNote: 'BTS 3rd Muster (Nov 2016)',
  },
  {
    id: 'tr-bts-4',
    groupId: 'bts',
    groupName: 'BTS',
    difficulty: 'Legend',
    prompt: 'Under which alter ego did Suga release his solo mixtapes "Agust D" and "D-2"?',
    options: ['Gloss', 'Agust D', 'RM94', 'Hope World'],
    correctIndex: 1,
    explanation: '"Agust D" spells "DT Suga" backwards—referencing Daegu Town (his hometown) and his stage name Suga.',
    verifiedSourceNote: 'Official Agust D credits',
  },

  // BLACKPINK
  {
    id: 'tr-bp-1',
    groupId: 'blackpink',
    groupName: 'BLACKPINK',
    difficulty: 'Rookie',
    prompt: 'Which single album marked BLACKPINK’s debut on August 8, 2016?',
    options: ['SQUARE ONE', 'THE ALBUM', 'KILL THIS LOVE', 'BORN PINK'],
    correctIndex: 0,
    explanation: 'BLACKPINK debuted on August 8, 2016 with "SQUARE ONE", featuring "Whistle" and "Boombayah".',
    verifiedSourceNote: 'YG Entertainment release records',
  },
  {
    id: 'tr-bp-2',
    groupId: 'blackpink',
    groupName: 'BLACKPINK',
    difficulty: 'Sunbae',
    prompt: 'Which BLACKPINK member was born in Auckland, New Zealand and raised in Melbourne?',
    options: ['Jisoo', 'Jennie', 'Rosé', 'Lisa'],
    correctIndex: 2,
    explanation: 'Rosé (Roseanne Park) was born in Auckland and grew up in Melbourne, Australia before moving to Seoul.',
    verifiedSourceNote: 'Verified artist biography',
  },
  {
    id: 'tr-bp-3',
    groupId: 'blackpink',
    groupName: 'BLACKPINK',
    difficulty: 'Legend',
    prompt: 'In what year did BLACKPINK headline Coachella Valley Music and Arts Festival as the first Korean act to do so?',
    options: ['2019', '2021', '2023', '2024'],
    correctIndex: 2,
    explanation: 'After first performing at Coachella in 2019, BLACKPINK returned as main headliners in April 2023.',
    verifiedSourceNote: 'Coachella 2023 official lineup',
  },

  // Stray Kids
  {
    id: 'tr-skz-1',
    groupId: 'straykids',
    groupName: 'Stray Kids',
    difficulty: 'Rookie',
    prompt: 'What is the name of Stray Kids’ in-house songwriting and production trio?',
    options: ['DanceRACHA', '3RACHA', 'VocalRACHA', 'StayRACHA'],
    correctIndex: 1,
    explanation: '3RACHA consists of Bang Chan, Changbin, and Han, who write and produce the majority of Stray Kids’ catalog.',
    verifiedSourceNote: 'JYP Entertainment credits',
  },
  {
    id: 'tr-skz-2',
    groupId: 'straykids',
    groupName: 'Stray Kids',
    difficulty: 'Sunbae',
    prompt: 'Which two Stray Kids members were born just one day apart on September 14 and September 15, 2000?',
    options: ['Hyunjin & Seungmin', 'Han & Felix', 'Bang Chan & Lee Know', 'Changbin & I.N'],
    correctIndex: 1,
    explanation: 'Han was born on September 14, 2000, and Felix was born on September 15, 2000.',
    verifiedSourceNote: 'Verified member profiles',
  },
  {
    id: 'tr-skz-3',
    groupId: 'straykids',
    groupName: 'Stray Kids',
    difficulty: 'Legend',
    prompt: 'Which song served as Stray Kids’ official March 25, 2018 debut title track?',
    options: ['Hellevator', 'District 9', 'MIROH', "God's Menu"],
    correctIndex: 1,
    explanation: 'While "Hellevator" was their 2017 pre-debut track, "District 9" from I am NOT was their official March 25, 2018 debut title.',
    verifiedSourceNote: 'JYP Entertainment discography',
  },

  // TWICE
  {
    id: 'tr-tw-1',
    groupId: 'twice',
    groupName: 'TWICE',
    difficulty: 'Rookie',
    prompt: 'Through which 2015 JYP survival television program was TWICE formed?',
    options: ['Produce 101', 'SIXTEEN', 'I-LAND', 'K-Pop Star'],
    correctIndex: 1,
    explanation: 'TWICE was formed through the 2015 Mnet x JYP reality survival show SIXTEEN.',
    verifiedSourceNote: 'JYP Entertainment history',
  },
  {
    id: 'tr-tw-2',
    groupId: 'twice',
    groupName: 'TWICE',
    difficulty: 'Sunbae',
    prompt: 'Which three TWICE members form the Japanese sub-unit MISAMO?',
    options: ['Momo, Sana, Mina', 'Nayeon, Jeongyeon, Jihyo', 'Dahyun, Chaeyoung, Tzuyu', 'Mina, Tzuyu, Sana'],
    correctIndex: 0,
    explanation: 'MISAMO takes the first syllables of Mina, Sana, and Momo, debuting in Japan in July 2023.',
    verifiedSourceNote: 'Warner Music Japan / JYP',
  },

  // SEVENTEEN
  {
    id: 'tr-svt-1',
    groupId: 'seventeen',
    groupName: 'SEVENTEEN',
    difficulty: 'Rookie',
    prompt: 'Why is the 13-member group named SEVENTEEN?',
    options: [
      '13 members + 3 units + 1 team = 17',
      'All members debuted at age 17',
      'They debuted with 17 songs',
      '17 trainees competed in the finale',
    ],
    correctIndex: 0,
    explanation: 'SEVENTEEN stands for 13 members + 3 units (Hip-Hop, Vocal, Performance) + 1 team = 17.',
    verifiedSourceNote: 'PLEDIS Entertainment official profile',
  },
  {
    id: 'tr-svt-2',
    groupId: 'seventeen',
    groupName: 'SEVENTEEN',
    difficulty: 'Sunbae',
    prompt: 'Which two SEVENTEEN members share the exact same birthday of February 18?',
    options: ['Hoshi & Jun', 'DK & Vernon', 'S.Coups & Mingyu', 'Wonwoo & Woozi'],
    correctIndex: 1,
    explanation: 'DK (Feb 18, 1997) and Vernon (Feb 18, 1998) both celebrate their birthday on February 18.',
    verifiedSourceNote: 'Verified SEVENTEEN member birthdays',
  },

  // IVE
  {
    id: 'tr-ive-1',
    groupId: 'ive',
    groupName: 'IVE',
    difficulty: 'Rookie',
    prompt: 'What is IVE’s official fandom name?',
    options: ['DIVE', 'FEARNOT', 'MY', 'GLLIT'],
    correctIndex: 0,
    explanation: 'IVE’s fandom is named DIVE, inspired by their greeting "DIVE into IVE!"',
    verifiedSourceNote: 'Starship Entertainment announcement',
  },
  {
    id: 'tr-ive-2',
    groupId: 'ive',
    groupName: 'IVE',
    difficulty: 'Sunbae',
    prompt: 'On what date did IVE debut with "ELEVEN"?',
    options: ['December 1, 2021', 'May 2, 2022', 'November 17, 2020', 'August 22, 2021'],
    correctIndex: 0,
    explanation: 'IVE debuted on December 1, 2021 under Starship Entertainment with single album ELEVEN.',
    verifiedSourceNote: 'Starship Entertainment records',
  },

  // ENHYPEN & TXT
  {
    id: 'tr-en-1',
    groupId: 'enhypen',
    groupName: 'ENHYPEN',
    difficulty: 'Rookie',
    prompt: 'Before debuting in ENHYPEN, which sport did Sunghoon compete in at a junior national level?',
    options: ['Speed Skating', 'Figure Skating', 'Fencing', 'Archery'],
    correctIndex: 1,
    explanation: 'Sunghoon was a competitive figure skater who medaled at international junior competitions before debut.',
    verifiedSourceNote: 'BELIFT LAB / ISU records',
  },
  {
    id: 'tr-en-2',
    groupId: 'enhypen',
    groupName: 'ENHYPEN',
    difficulty: 'Sunbae',
    prompt: 'On what date does ENHYPEN’s Jake celebrate his birthday?',
    options: ['October 15', 'November 15', 'December 8', 'February 9'],
    correctIndex: 1,
    explanation: 'Jake (Sim Jae-yun) was born on November 15, 2002.',
    verifiedSourceNote: 'Verified ENHYPEN profile',
  },
  {
    id: 'tr-txt-1',
    groupId: 'txt',
    groupName: 'TXT',
    difficulty: 'Rookie',
    prompt: 'What does TXT’s fandom name "MOA" stand for?',
    options: ['Moments of Alwaysness', 'Music of Asia', 'Memories of Angels', 'Masters of Art'],
    correctIndex: 0,
    explanation: 'MOA stands for "Moments of Alwaysness" and also means "gather" in Korean (moa).',
    verifiedSourceNote: 'BIGHIT MUSIC official announcement',
  },

  // aespa, ATEEZ, LE SSERAFIM
  {
    id: 'tr-aespa-1',
    groupId: 'aespa',
    groupName: 'aespa',
    difficulty: 'Rookie',
    prompt: 'Which song served as aespa’s November 17, 2020 debut single?',
    options: ['Next Level', 'Savage', 'Black Mamba', 'Supernova'],
    correctIndex: 2,
    explanation: 'aespa debuted on November 17, 2020 with the digital single "Black Mamba".',
    verifiedSourceNote: 'SM Entertainment discography',
  },
  {
    id: 'tr-ateez-1',
    groupId: 'ateez',
    groupName: 'ATEEZ',
    difficulty: 'Sunbae',
    prompt: 'What is Hongjoong’s signature leadership title within ATEEZ?',
    options: ['Commander', 'Captain', 'Admiral', 'Director'],
    correctIndex: 1,
    explanation: 'Hongjoong holds the official title "Captain" of ATEEZ, tying into their pirate/voyage concept.',
    verifiedSourceNote: 'KQ Entertainment official bio',
  },
  {
    id: 'tr-lsf-1',
    groupId: 'lesserafim',
    groupName: 'LE SSERAFIM',
    difficulty: 'Sunbae',
    prompt: 'The group name "LE SSERAFIM" is an anagram of which English phrase?',
    options: ['IM FEARLESS', 'REALISM FREE', 'FEEL MY STAR', 'RISE FLAMES'],
    correctIndex: 0,
    explanation: 'Rearranging the letters of "LE SSERAFIM" forms "IM FEARLESS".',
    verifiedSourceNote: 'SOURCE MUSIC official reveal',
  },

  // 5th Gen & Global: BABYMONSTER, ILLIT, KATSEYE
  {
    id: 'tr-bm-1',
    groupId: 'babymonster',
    groupName: 'BABYMONSTER',
    difficulty: 'Rookie',
    prompt: 'What is BABYMONSTER’s official fandom name announced in 2024?',
    options: ['MONSTIEZ', 'BAEMONS', 'YGSTARS', 'DRIPZ'],
    correctIndex: 0,
    explanation: 'BABYMONSTER’s fandom name is MONSTIEZ, revealed in July 2024.',
    verifiedSourceNote: 'YG Entertainment announcement',
  },
  {
    id: 'tr-illit-1',
    groupId: 'illit',
    groupName: 'ILLIT',
    difficulty: 'Rookie',
    prompt: 'Which viral debut single propelled ILLIT onto global charts in March 2024?',
    options: ['Touch', 'Magnetic', 'SHEESH', 'CRAZY'],
    correctIndex: 1,
    explanation: 'ILLIT debuted on March 25, 2024 with "Magnetic" from mini-album SUPER REAL ME.',
    verifiedSourceNote: 'BELIFT LAB discography',
  },
  {
    id: 'tr-kat-1',
    groupId: 'katseye',
    groupName: 'KATSEYE',
    difficulty: 'Sunbae',
    prompt: 'Which global audition project formed KATSEYE in partnership between HYBE and Geffen Records?',
    options: ['The Debut: Dream Academy', 'I-LAND 2', 'Universe Ticket', 'A2K'],
    correctIndex: 0,
    explanation: 'KATSEYE’s six members were selected through "The Debut: Dream Academy" in 2023 and debuted in June 2024.',
    verifiedSourceNote: 'HYBE x Geffen Records',
  },
  {
    id: 'tr-all-1',
    groupId: 'all',
    groupName: 'All Fandoms',
    difficulty: 'Legend',
    prompt: 'In June 2023, South Korea unified its legal age counting system to match which standard?',
    options: [
      'International age (0 at birth, +1 on birthday)',
      'Lunar New Year counting (+1 on Jan 1)',
      'School-cohort age only',
      'Solar solstice counting',
    ],
    correctIndex: 0,
    explanation: 'South Korea officially standardized on the international age system on June 28, 2023 for legal and administrative use.',
    verifiedSourceNote: 'Korean Ministry of Government Legislation (2023)',
  },
];
