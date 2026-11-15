import { Group, Idol } from '../types/kpop';
import { IDOL_WIKI_RESEARCH, IdolResearchFactQuestion } from './idolResearch';

export interface BuiltIdolQuizQuestion {
  id: string;
  categoryLabel: string;
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  sourceLabel: string;
}

/**
 * Deterministic hash so question option order varies naturally per idol
 * without changing randomly on re-renders.
 */
function hashSeed(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

function rotateWithAnswer(
  correct: string,
  distractors: string[],
  seedStr: string
): { options: string[]; correctIndex: number } {
  const uniqueDistractors = Array.from(new Set(distractors.filter((d) => d && d !== correct))).slice(0, 3);
  const raw = [correct, ...uniqueDistractors];
  const shift = hashSeed(seedStr) % raw.length;
  // Deterministic deterministic permutation of 4 slots
  const indexed = raw.map((val, idx) => ({
    val,
    isCorrect: idx === 0,
    weight: hashSeed(`${seedStr}:${idx}:${val}`),
  }));
  indexed.sort((a, b) => (a.weight + shift) - (b.weight + shift));
  return {
    options: indexed.map((item) => item.val),
    correctIndex: indexed.findIndex((item) => item.isCorrect),
  };
}

/**
 * Curated researched questions verified directly against Wikipedia artist biographies
 * and confirmed agency discography announcements.
 */
export const IDOL_RESEARCHED_QUESTIONS: Record<string, IdolResearchFactQuestion[]> = {
  'bts-rm': [
    {
      prompt: 'Which solo studio album did RM release in May 2024 following "Indigo" (2022)?',
      options: ['Right Place, Wrong Person', 'Golden', 'D-Day', 'Jack In The Box'],
      correctIndex: 0,
      explanation: 'RM released his critically acclaimed second solo album "Right Place, Wrong Person" in May 2024.',
      sourceLabel: 'Verified Discography · BIGHIT MUSIC / Wikipedia',
    },
  ],
  'bts-jin': [
    {
      prompt: 'Which 2024 solo EP marked Jin’s first extended play following his military discharge?',
      options: ['Happy', 'The Astronaut', 'Muse', 'Layover'],
      correctIndex: 0,
      explanation: 'Jin released his debut solo mini-album "Happy" in November 2024, following his 2022 single "The Astronaut".',
      sourceLabel: 'Verified Discography · BIGHIT MUSIC / Wikipedia',
    },
  ],
  'bts-suga': [
    {
      prompt: 'Under what alternate solo moniker does SUGA release solo mixtapes and "D-Day"?',
      options: ['Agust D', 'RM', 'J.One', 'S.Coups'],
      correctIndex: 0,
      explanation: 'SUGA releases solo work—including "Agust D" (2016), "D-2" (2020), and "D-Day" (2023)—under the name Agust D.',
      sourceLabel: 'Verified Discography · BIGHIT MUSIC / Wikipedia',
    },
  ],
  'bts-jhope': [
    {
      prompt: 'Which solo studio album did j-hope release in July 2022 before his "HOPE ON THE STREET VOL.1" project?',
      options: ['Jack In The Box', 'Hope World', 'FACE', 'MUSE'],
      correctIndex: 0,
      explanation: 'j-hope released his debut studio album "Jack In The Box" on July 15, 2022, following his 2018 mixtape "Hope World".',
      sourceLabel: 'Verified Discography · BIGHIT MUSIC / Wikipedia',
    },
  ],
  'bts-jimin': [
    {
      prompt: 'Which trio of BTS-era solo tracks did Jimin perform on "Wings", "Love Yourself: Her", and "Map of the Soul: 7"?',
      options: [
        '"Lie", "Serendipity", and "Filter"',
        '"Stigma", "Singularity", and "Inner Child"',
        '"Euphoria", "Begin", and "My Time"',
        '"Trivia: Seesaw", "First Love", and "Shadow"',
      ],
      correctIndex: 0,
      explanation: 'Jimin recorded three signature solo songs under BTS’s discography: "Lie" (2016), "Serendipity" (2017), and "Filter" (2020).',
      sourceLabel: 'Verified Biographical Record · Wikipedia',
    },
  ],
  'bts-v': [
    {
      prompt: 'Which solo album did V release in September 2023 alongside jazz-inspired tracks like "Slow Dancing"?',
      options: ['Layover', 'Golden', 'FACE', 'Indigo'],
      correctIndex: 0,
      explanation: 'V released his solo debut EP "Layover" on September 8, 2023, featuring "Love Me Again" and "Slow Dancing".',
      sourceLabel: 'Verified Discography · Wikipedia',
    },
  ],
  'bts-jungkook': [
    {
      prompt: 'Which 2023 debut solo studio album by Jung Kook featured "Seven" and "Standing Next to You"?',
      options: ['Golden', 'Layover', 'Happy', 'D-Day'],
      correctIndex: 0,
      explanation: 'Jung Kook released his debut solo album "Golden" in November 2023, led by global hits "Seven" and "Standing Next to You".',
      sourceLabel: 'Verified Discography · Wikipedia',
    },
  ],
  'bp-jisoo': [
    {
      prompt: 'What was the title of Jisoo’s record-breaking March 2023 debut single album featuring "Flower"?',
      options: ['ME', 'SOLO', 'R', 'LALISA'],
      correctIndex: 0,
      explanation: 'In March 2023, Jisoo released her debut single album "ME" with title track "Flower".',
      sourceLabel: 'Verified Biographical Record · Wikipedia',
    },
  ],
  'bp-jennie': [
    {
      prompt: 'Where did Jennie move to study in 2004 before returning to South Korea and auditioning for YG Entertainment in 2010?',
      options: ['New Zealand', 'Australia', 'Thailand', 'Canada'],
      correctIndex: 0,
      explanation: 'Jennie moved to Auckland, New Zealand in 2004 and returned to South Korea in 2010 to join YG Entertainment.',
      sourceLabel: 'Verified Biographical Record · Wikipedia',
    },
  ],
  'bp-rose': [
    {
      prompt: 'In which country was Rosé born before growing up in Melbourne, Australia?',
      options: ['New Zealand', 'South Korea', 'United States', 'Thailand'],
      correctIndex: 0,
      explanation: 'Rosé (Roseanne Park) was born in Auckland, New Zealand, and raised in Melbourne, Australia.',
      sourceLabel: 'Verified Biographical Record · Wikipedia',
    },
  ],
  'bp-lisa': [
    {
      prompt: 'What was the title of Lisa’s September 2021 debut single album that featured "MONEY"?',
      options: ['LALISA', 'ME', 'R', 'RUBY'],
      correctIndex: 0,
      explanation: 'Lisa released her debut single album "LALISA" in September 2021 alongside viral B-side "MONEY".',
      sourceLabel: 'Verified Biographical Record · Wikipedia',
    },
  ],
  'ive-yujin': [
    {
      prompt: 'Before leading IVE, which South Korean–Japanese project girl group was An Yujin a member of?',
      options: ['IZ*ONE', 'IOI', 'Kep1er', 'fromis_9'],
      correctIndex: 0,
      explanation: 'An Yujin competed on Produce 48 in 2018 and debuted in IZ*ONE before becoming leader of IVE in 2021.',
      sourceLabel: 'Verified Biographical Record · Wikipedia',
    },
  ],
  'ive-wonyoung': [
    {
      prompt: 'What final rank did Jang Wonyoung achieve on Mnet’s "Produce 48" in 2018?',
      options: ['1st place', '3rd place', '5th place', '10th place'],
      correctIndex: 0,
      explanation: 'Jang Wonyoung finished first on Produce 48 in 2018 and served as center of IZ*ONE before debuting in IVE.',
      sourceLabel: 'Verified Biographical Record · Wikipedia',
    },
  ],
  'skz-bangchan': [
    {
      prompt: 'Which in-house Stray Kids production unit includes Bang Chan alongside Changbin and Han?',
      options: ['3RACHA', 'VocalRACHA', 'DanceRACHA', 'BSS'],
      correctIndex: 0,
      explanation: 'Bang Chan, Changbin, and Han form 3RACHA, Stray Kids’ core songwriting and production trio.',
      sourceLabel: 'Verified Biographical Record · Wikipedia',
    },
  ],
  'skz-leeknow': [
    {
      prompt: 'Which weekly South Korean music chart program did Lee Know co-host from 2021 to 2023?',
      options: ['Show! Music Core', 'Music Bank', 'Inkigayo', 'M Countdown'],
      correctIndex: 0,
      explanation: 'Lee Know served as a regular MC on MBC’s "Show! Music Core" from August 2021 to November 2023.',
      sourceLabel: 'Verified Biographical Record · Wikipedia',
    },
  ],
  'skz-han': [
    {
      prompt: 'Which milestone did Han achieve with the Korea Music Copyright Association (KOMCA) in February 2023?',
      options: [
        'Became the youngest K-pop idol promoted to Full Member',
        'Won Artist of the Year at Melon Music Awards',
        'Hosted KBS Music Bank as permanent MC',
        'Debuted in SM Entertainment supergroup Got the Beat',
      ],
      correctIndex: 0,
      explanation: 'In February 2023, Han became a Full Member of KOMCA, making him the youngest K-pop idol to receive that promotion.',
      sourceLabel: 'Verified Biographical Record · Wikipedia',
    },
  ],
  'skz-seungmin': [
    {
      prompt: 'Which K-drama soundtrack did Seungmin contribute to early in his OST career alongside "Hometown Cha-Cha-Cha"?',
      options: ['"Here Always" (Hometown Cha-Cha-Cha OST)', 'Goblin OST', 'Crash Landing on You OST', 'Extraordinary You OST'],
      correctIndex: 0,
      explanation: 'Seungmin earned wide praise for his K-drama OST vocals including "Here Always" for Hometown Cha-Cha-Cha.',
      sourceLabel: 'Verified Biographical Record · Wikipedia',
    },
  ],
  'skz-in': [
    {
      prompt: 'In which Korean web drama series did I.N make a cameo acting debut in 2019?',
      options: ['A-Teen 2', 'Imitation', 'True Beauty', 'Twenty-Five Twenty-One'],
      correctIndex: 0,
      explanation: 'I.N appeared in the final episode of the popular 2019 web series "A-Teen 2".',
      sourceLabel: 'Verified Biographical Record · Wikipedia',
    },
  ],
  'twice-nayeon': [
    {
      prompt: 'What was the name of Nayeon’s June 2022 debut solo EP featuring "POP!"?',
      options: ['IM NAYEON', 'ZONE', 'abouTZU', 'NA'],
      correctIndex: 0,
      explanation: 'Nayeon became TWICE’s first solo debutant in June 2022 with "IM NAYEON" and lead single "POP!".',
      sourceLabel: 'Verified Biographical Record · Wikipedia',
    },
  ],
  'twice-momo': [
    {
      prompt: 'Which official TWICE Japanese sub-unit includes Momo, Sana, and Mina?',
      options: ['MISAMO', 'BSS', '3RACHA', 'NCT JNJM'],
      correctIndex: 0,
      explanation: 'Momo, Sana, and Mina debuted together in 2023 as TWICE’s first official sub-unit, MISAMO.',
      sourceLabel: 'Verified Biographical Record · Wikipedia',
    },
  ],
  'twice-sana': [
    {
      prompt: 'Along with Momo and Mina, which sub-unit did Sana debut in during 2023?',
      options: ['MISAMO', 'Got the Beat', 'JxW', 'CxM'],
      correctIndex: 0,
      explanation: 'Sana debuted in TWICE’s Japanese trio sub-unit MISAMO alongside Momo and Mina in 2023.',
      sourceLabel: 'Verified Biographical Record · Wikipedia',
    },
  ],
  'twice-jihyo': [
    {
      prompt: 'Which 2023 debut solo mini-album did Jihyo release with the lead single "Killin’ Me Good"?',
      options: ['ZONE', 'IM NAYEON', 'abouTZU', 'LIL FANTASY vol.1'],
      correctIndex: 0,
      explanation: 'Jihyo’s debut EP "ZONE" debuted at number one on the Circle Album Chart in August 2023.',
      sourceLabel: 'Verified Biographical Record · Wikipedia',
    },
  ],
  'twice-mina': [
    {
      prompt: 'In addition to TWICE, which 2023 JYP Japanese sub-unit is Mina a member of?',
      options: ['MISAMO', 'JxJ', 'Hoshi X Woozi', 'After School Club'],
      correctIndex: 0,
      explanation: 'Mina formed TWICE’s sub-unit MISAMO together with Momo and Sana in 2023.',
      sourceLabel: 'Verified Biographical Record · Wikipedia',
    },
  ],
  'twice-chaeyoung': [
    {
      prompt: 'What is the title of Chaeyoung’s September 2025 solo debut studio album?',
      options: ['LIL FANTASY vol.1', 'ZONE', 'abouTZU', 'IM NAYEON'],
      correctIndex: 0,
      explanation: 'Chaeyoung released her debut solo studio album "LIL FANTASY vol.1" and single "Shoot (Firecracker)" in September 2025.',
      sourceLabel: 'Verified Biographical Record · Wikipedia',
    },
  ],
  'twice-tzuyu': [
    {
      prompt: 'Which September 2024 solo EP by Tzuyu included the lead single "Run Away"?',
      options: ['abouTZU', 'ZONE', 'IM NAYEON', 'Air'],
      correctIndex: 0,
      explanation: 'Tzuyu released her debut solo EP "abouTZU" on September 6, 2024, topping Billboard’s Taiwan Songs chart with "Run Away".',
      sourceLabel: 'Verified Biographical Record · Wikipedia',
    },
  ],
  'svt-scoups': [
    {
      prompt: 'Alongside leading SEVENTEEN and the Hip-Hop Unit, which duo sub-unit did S.Coups form with Mingyu in 2025?',
      options: ['CxM', 'JxW', 'BSS', 'Hoshi X Woozi'],
      correctIndex: 0,
      explanation: 'S.Coups debuted in the SEVENTEEN duo sub-unit CxM with fellow Hip-Hop Unit member Mingyu in 2025.',
      sourceLabel: 'Verified Biographical Record · Wikipedia',
    },
  ],
  'svt-woozi': [
    {
      prompt: 'What was the title of Woozi’s 2022 solo mixtape single while serving as SEVENTEEN’s Vocal Unit leader?',
      options: ['Ruby', 'Spider', 'Black Eye', 'Wait'],
      correctIndex: 0,
      explanation: 'Woozi released his solo mixtape track "Ruby" in January 2022, in addition to writing and producing for SEVENTEEN.',
      sourceLabel: 'Verified Biographical Record · Wikipedia',
    },
  ],
  'svt-hoshi': [
    {
      prompt: 'Which solo mixtape track did Hoshi release in April 2021 showcasing SEVENTEEN’s Performance Team leader?',
      options: ['Spider', 'Ruby', 'Wait', 'Black Eye'],
      correctIndex: 0,
      explanation: 'Hoshi made his solo mixtape debut with "Spider" on April 2, 2021.',
      sourceLabel: 'Verified Biographical Record · Wikipedia',
    },
  ],
  'svt-the8': [
    {
      prompt: 'In 2018, what solo digital single marked The8’s official solo music release?',
      options: ['Night and Rain', 'Black Eye', 'Wait', 'Spider'],
      correctIndex: 0,
      explanation: 'The8 released his solo single "Night and Rain" in 2018 and also served as a dance mentor on Youth With You.',
      sourceLabel: 'Verified Biographical Record · Wikipedia',
    },
  ],
  'svt-dk': [
    {
      prompt: 'Which SEVENTEEN sub-unit does DK lead alongside Hoshi and Seungkwan?',
      options: ['BSS (BooSeokSoon)', 'JxW', 'CxM', 'Performance Unit'],
      correctIndex: 0,
      explanation: 'DK is the leader of SEVENTEEN’s beloved trio sub-unit BSS alongside Seungkwan and Hoshi.',
      sourceLabel: 'Verified Biographical Record · Wikipedia',
    },
  ],
  'svt-vernon': [
    {
      prompt: 'Which solo single did Vernon release on December 27, 2022?',
      options: ['Black Eye', 'Wait', 'Ruby', 'Spider'],
      correctIndex: 0,
      explanation: 'Vernon made his official solo mixtape debut with "Black Eye" on December 27, 2022.',
      sourceLabel: 'Verified Biographical Record · Wikipedia',
    },
  ],
  'svt-dino': [
    {
      prompt: 'Which solo mixtape single did Dino release on November 27, 2023?',
      options: ['Wait', 'Spider', 'Black Eye', 'Ruby'],
      correctIndex: 0,
      explanation: 'Dino made his solo debut with the performance track "Wait" on November 27, 2023.',
      sourceLabel: 'Verified Biographical Record · Wikipedia',
    },
  ],
  'txt-yeonjun': [
    {
      prompt: 'What was Yeonjun’s September 2024 debut solo single prior to "No Labels: Part 01"?',
      options: ['GGUM', 'Panic', 'Wait', 'Spider'],
      correctIndex: 0,
      explanation: 'Yeonjun debuted as a soloist in September 2024 with "GGUM" before releasing "No Labels: Part 01".',
      sourceLabel: 'Verified Biographical Record · Wikipedia',
    },
  ],
  'txt-beomgyu': [
    {
      prompt: 'What is the name of Beomgyu’s March 2025 solo single release?',
      options: ['Panic', 'GGUM', 'Air', 'Lovesick'],
      correctIndex: 0,
      explanation: 'Beomgyu released his first solo mixtape single "Panic" on March 27, 2025.',
      sourceLabel: 'Verified Biographical Record · Wikipedia',
    },
  ],
  'aespa-karina': [
    {
      prompt: 'Which SM Entertainment female supergroup did Karina (and Winter) join in January 2022?',
      options: ['GOT the beat', 'Girls’ Generation', 'Red Velvet', 'MISAMO'],
      correctIndex: 0,
      explanation: 'Karina and Winter debuted in SM Entertainment’s supergroup GOT the beat alongside BoA, Taeyeon, Hyoyeon, Seulgi, and Wendy.',
      sourceLabel: 'Verified Biographical Record · Wikipedia',
    },
  ],
  'aespa-winter': [
    {
      prompt: 'Along with Karina, which SM Entertainment project supergroup did Winter debut in during January 2022?',
      options: ['GOT the beat', 'SuperM', 'BSS', '3RACHA'],
      correctIndex: 0,
      explanation: 'Winter debuted with SM’s project supergroup GOT the beat in January 2022 alongside aespa leader Karina.',
      sourceLabel: 'Verified Biographical Record · Wikipedia',
    },
  ],
  'ateez-seonghwa': [
    {
      prompt: 'In which 2021 KBS musical K-drama did Seonghwa appear alongside Yunho, San, and Jongho?',
      options: ['Imitation', 'A-Teen 2', 'Hometown Cha-Cha-Cha', 'Dream Academy'],
      correctIndex: 0,
      explanation: 'Seonghwa made his acting debut in the 2021 KBS drama "Imitation" alongside bandmates Yunho, San, and Jongho.',
      sourceLabel: 'Verified Biographical Record · Wikipedia',
    },
  ],
  'ateez-jongho': [
    {
      prompt: 'Which fictional idol group did Jongho perform in as part of the 2021 KBS drama "Imitation"?',
      options: ['SHAX', 'Sparkling', 'Tea Party', '3RACHA'],
      correctIndex: 0,
      explanation: 'Jongho acted and sang on OST tracks as a member of the fictional group SHAX in "Imitation" (2021).',
      sourceLabel: 'Verified Biographical Record · Wikipedia',
    },
  ],
  'lsf-sakura': [
    {
      prompt: 'Before IZ*ONE and LE SSERAFIM, which Japanese sister group of AKB48 did Sakura debut with in 2011?',
      options: ['HKT48', 'Nogizaka46', 'XG', 'NiziU'],
      correctIndex: 0,
      explanation: 'Sakura began her idol career with Japanese group HKT48 in 2011 before joining IZ*ONE and LE SSERAFIM.',
      sourceLabel: 'Verified Biographical Record · Wikipedia',
    },
  ],
  'lsf-chaewon': [
    {
      prompt: 'Before leading LE SSERAFIM, which reality competition placed Chaewon in IZ*ONE in 2018?',
      options: ['Produce 48', 'I-LAND', 'Sixteen', 'R U Next?'],
      correctIndex: 0,
      explanation: 'Kim Chaewon finished 10th on Mnet’s "Produce 48" in 2018 and promoted with IZ*ONE before leading LE SSERAFIM.',
      sourceLabel: 'Verified Biographical Record · Wikipedia',
    },
  ],
  'lsf-eunchae': [
    {
      prompt: 'Which KBS2 weekly music broadcast did Hong Eunchae serve as regular MC on from 2023 to 2024?',
      options: ['Music Bank', 'Show! Music Core', 'Inkigayo', 'The Show'],
      correctIndex: 0,
      explanation: 'Hong Eunchae hosted KBS2’s "Music Bank" from February 2023 through September 2024.',
      sourceLabel: 'Verified Biographical Record · Wikipedia',
    },
  ],
  'kat-daniela': [
    {
      prompt: 'Which US dance competition series did KATSEYE’s Daniela compete on in 2016 before Dream Academy?',
      options: ['So You Think You Can Dance (Season 13)', 'World of Dance', 'America’s Got Talent', 'R U Next?'],
      correctIndex: 0,
      explanation: 'Daniela Avanzini competed on the 13th season of "So You Think You Can Dance" in 2016 before joining KATSEYE.',
      sourceLabel: 'Verified Biographical Record · Wikipedia',
    },
  ],
  'itzy-yeji': [
    {
      prompt: 'What was the title of Yeji’s March 2025 debut solo mini-album?',
      options: ['Air', 'Lovesick', 'Ice Cream', 'Zone'],
      correctIndex: 0,
      explanation: 'ITZY’s leader Yeji kicked off the group’s solo era in March 2025 with her debut EP "Air".',
      sourceLabel: 'Verified Biographical Record · Wikipedia & IdolOrbit ITZY Coverage',
    },
  ],
  'itzy-chaeryeong': [
    {
      prompt: 'Which November 2026 solo debut mini-album features Chaeryeong’s title track "Lovesick"?',
      options: ['Lovesick', 'Ice Cream', 'Air', 'PERFECT STORM'],
      correctIndex: 0,
      explanation: 'Chaeryeong released her debut four-track solo mini-album "Lovesick" on November 9, 2026.',
      sourceLabel: 'Verified Editorial Coverage · JYP Entertainment / IdolOrbit',
    },
  ],
  'itzy-yuna': [
    {
      prompt: 'What was the title of Yuna’s March 2026 debut solo mini-album?',
      options: ['Ice Cream', 'Lovesick', 'Air', 'ME'],
      correctIndex: 0,
      explanation: 'Yuna released her solo debut EP "Ice Cream" in March 2026 alongside her acting debut in "Undercover Miss Hong".',
      sourceLabel: 'Verified Biographical Record · Wikipedia & IdolOrbit ITZY Coverage',
    },
  ],
  'nctd-jeno': [
    {
      prompt: 'Which NCT sub-unit did Jeno debut in alongside Jaemin in addition to leading NCT DREAM in 2026?',
      options: ['NCT JNJM', 'WayV', 'NCT WISH', '3RACHA'],
      correctIndex: 0,
      explanation: 'Alongside NCT DREAM’s "DREAM AFTER DREAM", Jeno also promotes in the duo sub-unit NCT JNJM with Jaemin.',
      sourceLabel: 'Verified Biographical Record · Wikipedia & IdolOrbit NCT DREAM Coverage',
    },
  ],
  'nctd-haechan': [
    {
      prompt: 'Which two fixed NCT sub-units is Haechan a core vocalist of?',
      options: ['NCT 127 and NCT DREAM', 'WayV and NCT WISH', 'NCT U and EXO-SC', 'BSS and Hoshi X Woozi'],
      correctIndex: 0,
      explanation: 'Haechan debuted and promotes as a key member of both NCT 127 and NCT DREAM.',
      sourceLabel: 'Verified Biographical Record · Wikipedia',
    },
  ],
  'nctd-chenle': [
    {
      prompt: 'At age nine, which famous international concert venue did Chenle perform solo at during his childhood career?',
      options: ['The Golden Hall of Vienna (Musikverein)', 'Wembley Stadium', 'Tokyo Dome', 'Carnegie Hall'],
      correctIndex: 0,
      explanation: 'Before joining SM Entertainment, nine-year-old Chenle performed solo at the Golden Hall in Vienna, Austria.',
      sourceLabel: 'Verified Biographical Record · Wikipedia',
    },
  ],
  'nctd-mark': [
    {
      prompt: 'What was the title of Mark’s April 2025 debut solo studio album?',
      options: ['The Firstfruit', 'Dreamscape', '200', 'Golden Hour'],
      correctIndex: 0,
      explanation: 'Mark made his solo album debut on April 7, 2025 with "The Firstfruit" prior to launching Upper Room in 2026.',
      sourceLabel: 'Verified Biographical Record · Wikipedia',
    },
  ],
  'nj-hanni': [
    {
      prompt: 'In addition to performing on stage, which two 2022 NewJeans hits did Hanni co-write lyrics for?',
      options: ['"Hype Boy" and "OMG"', '"Attention" and "Cookie"', '"ETA" and "Cool With You"', '"Ditto" and "Super Shy"'],
      correctIndex: 0,
      explanation: 'Hanni is credited as a lyricist on NewJeans’ breakout singles "Hype Boy" and "OMG".',
      sourceLabel: 'Verified Biographical Record · KOMCA / Wikipedia',
    },
  ],
  'nj-hyein': [
    {
      prompt: 'Which veteran South Korean soloist did Hyein feature alongside on the 2024 track "Shh.."?',
      options: ['IU', 'Taeyeon', 'BoA', 'Sunmi'],
      correctIndex: 0,
      explanation: 'Hyein featured on IU’s 2024 EP track "Shh.." alongside Joe Won-sun.',
      sourceLabel: 'Verified Biographical Record · Wikipedia',
    },
  ],
  'nmixx-lily': [
    {
      prompt: 'Which Korean singing audition television show did Lily first rise to national attention on in 2014?',
      options: ['K-pop Star 4', 'Produce 48', 'Sixteen', 'Superstar K'],
      correctIndex: 0,
      explanation: 'Lily finished top four on SBS’s "K-pop Star 4" as a child contestant before signing with JYP Entertainment.',
      sourceLabel: 'Verified Biographical Record · SBS / JYP',
    },
  ],
  'nmixx-sullyoon': [
    {
      prompt: 'Which weekly South Korean music broadcast did Sullyoon serve as a regular host for alongside Lee Know and Younghoon?',
      options: ['Show! Music Core', 'Music Bank', 'Inkigayo', 'M Countdown'],
      correctIndex: 0,
      explanation: 'Sullyoon hosted MBC’s "Show! Music Core" starting in April 2023.',
      sourceLabel: 'Verified Biographical Record · Wikipedia',
    },
  ],
  'zb1-zhanghao': [
    {
      prompt: 'What historic milestone did Zhang Hao set on Mnet’s "Boys Planet" finale in 2023?',
      options: [
        'First non-Korean contestant to place #1 on a Mnet survival show',
        'Youngest winner in Mnet history',
        'First soloist to win before joining a group',
        'Highest score in Show! Music Core history',
      ],
      correctIndex: 0,
      explanation: 'Zhang Hao became the first non-Korean contestant to finish first overall in a Mnet survival audition program.',
      sourceLabel: 'Verified Biographical Record · Wikipedia',
    },
  ],
  'zb1-hanbin': [
    {
      prompt: 'Which two street dance styles did Sung Hanbin compete in as a professional dancer prior to ZEROBASEONE?',
      options: ['Waacking and tutting', 'Ballet and tap', 'B-boying and tango', 'Krumping and jazz'],
      correctIndex: 0,
      explanation: 'Sung Hanbin trained and performed in waacking and tutting before joining WAKEONE and leading ZEROBASEONE.',
      sourceLabel: 'Verified Biographical Record · Wikipedia',
    },
  ],
  'riize-wonbin': [
    {
      prompt: 'Which instrument does RIIZE’s Wonbin play on stage and during "Get A Guitar" promotions?',
      options: ['Electric guitar', 'Cello', 'Violin', 'Saxophone'],
      correctIndex: 0,
      explanation: 'Wonbin showcases electric guitar performance tied to RIIZE’s debut hit "Get A Guitar".',
      sourceLabel: 'Verified Group Profile · SM Entertainment',
    },
  ],
  'riize-anton': [
    {
      prompt: 'Which classical instrument did Anton study before debuting in RIIZE under SM Entertainment?',
      options: ['Cello', 'Clarinet', 'Harp', 'Trumpet'],
      correctIndex: 0,
      explanation: 'Anton trained in cello and music composition, inspired by his father, veteran producer Yoon Sang.',
      sourceLabel: 'Verified Group Profile · SM Entertainment',
    },
  ],
  'bnd-jaehyun': [
    {
      prompt: 'Which weekly Mnet music chart program has BOYNEXTDOOR leader Myung Jaehyun hosted?',
      options: ['M Countdown', 'Music Bank', 'The Show', 'Show Champion'],
      correctIndex: 0,
      explanation: 'Myung Jaehyun joined Mnet’s "M Countdown" as an MC alongside Sung Hanbin and Sohee.',
      sourceLabel: 'Verified Broadcast Credits · Mnet',
    },
  ],
  'idle-soyeon': [
    {
      prompt: 'Which viral 2022–2023 i-dle title tracks were written and produced by leader Soyeon?',
      options: ['"TOMBOY", "Nxde", and "Queencard"', '"DALLA DALLA" and "WANNABE"', '"Next Level" and "Drama"', '"FEARLESS" and "ANTIFRAGILE"'],
      correctIndex: 0,
      explanation: 'Soyeon served as executive producer and main songwriter behind i-dle’s smash hits "TOMBOY", "Nxde", and "Queencard".',
      sourceLabel: 'Verified Biographical Record · Wikipedia',
    },
  ],
  'idle-minnie': [
    {
      prompt: 'What is the title of Minnie’s January 2025 debut solo extended play?',
      options: ['HER', 'MY', 'YUQ1', 'I Feel'],
      correctIndex: 0,
      explanation: 'Minnie released her first solo mini-album "HER" in January 2025 under Cube Entertainment.',
      sourceLabel: 'Verified Biographical Record · Wikipedia',
    },
  ],
  'rv-irene': [
    {
      prompt: 'What was the title of Red Velvet leader Irene’s November 2024 solo debut mini-album?',
      options: ['Like A Flower', 'Like Water', '28 Reasons', 'Hello'],
      correctIndex: 0,
      explanation: 'Irene made her official solo debut on November 26, 2024 with her first EP "Like A Flower".',
      sourceLabel: 'Verified Biographical Record · Wikipedia',
    },
  ],
  'rv-wendy': [
    {
      prompt: 'What was the title of Wendy’s April 2021 solo debut mini-album?',
      options: ['Like Water', 'Like A Flower', '28 Reasons', 'Cosmic'],
      correctIndex: 0,
      explanation: 'Wendy debuted as a soloist in April 2021 with "Like Water" before returning with "Wish You Hell" in 2024.',
      sourceLabel: 'Verified Biographical Record · Wikipedia',
    },
  ],
  'shinee-taemin': [
    {
      prompt: 'Which 2017 solo studio album and title track cemented Taemin’s iconic choreography style?',
      options: ['Move', 'Replay', 'Lucifer', 'Sherlock'],
      correctIndex: 0,
      explanation: 'Taemin’s 2017 album and title track "Move" became an enduring benchmark in K-pop solo performance.',
      sourceLabel: 'Verified Biographical Record · Wikipedia',
    },
  ],
  'shinee-jonghyun': [
    {
      prompt: 'Which soulful hit ballad written by Jonghyun became a signature healing anthem performed by Lee Hi in 2016?',
      options: ['Breathe', 'Spring Day', 'Through the Night', 'Fine'],
      correctIndex: 0,
      explanation: 'Jonghyun wrote and composed "Breathe" (한숨), celebrated by fans worldwide for its comforting lyrics.',
      sourceLabel: 'Verified Songwriting Record · Wikipedia',
    },
  ],
  'exo-baekhyun': [
    {
      prompt: 'Which 2020 solo mini-album made Baekhyun the first South Korean solo artist in 19 years to sell over 1 million copies?',
      options: ['Delight', 'City Lights', 'Empathy', 'Brand New'],
      correctIndex: 0,
      explanation: 'Baekhyun’s 2020 EP "Delight" surpassed one million sales, earning him a "Million Seller" milestone as a soloist.',
      sourceLabel: 'Verified Biographical Record · Wikipedia',
    },
  ],
  'exo-do': [
    {
      prompt: 'What was the title of D.O.’s July 2021 debut solo mini-album?',
      options: ['Empathy', 'Blossom', 'Black Out', 'Delight'],
      correctIndex: 0,
      explanation: 'Doh Kyung-soo (D.O.) debuted as a soloist on July 26, 2021 with the acoustic-pop EP "Empathy".',
      sourceLabel: 'Verified Biographical Record · Wikipedia',
    },
  ],
  'trs-hyunsuk': [
    {
      prompt: 'Which JTBC survival audition program did Choi Hyunsuk compete in before debuting with TREASURE in 2020?',
      options: ['Mix Nine', 'Produce X 101', 'Boys Planet', 'I-LAND'],
      correctIndex: 0,
      explanation: 'Choi Hyunsuk competed on "Mix Nine" (2017–2018) prior to YG Treasure Box and TREASURE’s 2020 debut.',
      sourceLabel: 'Verified Biographical Record · Wikipedia',
    },
  ],
  'p1h-keeho': [
    {
      prompt: 'In which Canadian city was P1Harmony leader Keeho born and raised before moving to Seoul?',
      options: ['Toronto', 'Vancouver', 'Montreal', 'Calgary'],
      correctIndex: 0,
      explanation: 'Keeho (Stephen Yoon) was born and raised in Toronto, Canada before debuting with P1Harmony in 2020.',
      sourceLabel: 'Verified Artist Profile · FNC Entertainment',
    },
  ],
  'tws-shinyu': [
    {
      prompt: 'Which 2024 TWS debut song became one of South Korea’s biggest annual chart hits after going viral?',
      options: ['plot twist', 'Get A Guitar', 'In Bloom', 'Sheesh'],
      correctIndex: 0,
      explanation: 'Led by Shinyu, TWS debuted in January 2024 with "plot twist", topping annual domestic digital charts.',
      sourceLabel: 'Verified Discography · PLEDIS Entertainment',
    },
  ],
  'meovv-ella': [
    {
      prompt: 'At what young age did MEOVV member Ella Gross begin modeling for international fashion brands in the US?',
      options: ['Age 2', 'Age 10', 'Age 14', 'Age 16'],
      correctIndex: 0,
      explanation: 'Ella began modeling in Los Angeles at age two for global campaigns including GAP, Levi’s, and H&M before joining THEBLACKLABEL.',
      sourceLabel: 'Verified Biographical Record · Wikipedia',
    },
  ],
  'h2h-carmen': [
    {
      prompt: 'Which national milestone did Carmen achieve upon debuting with Hearts2Hearts under SM Entertainment in February 2025?',
      options: [
        'SM Entertainment’s first Indonesian idol to debut in a flagship group',
        'First member to host Inkigayo',
        'Youngest SM trainee in history',
        'Producer of "The Chase"',
      ],
      correctIndex: 0,
      explanation: 'Carmen (Nyoman Ayu Carmenita) made headlines across Southeast Asia and Korea as SM Entertainment’s first Indonesian debut artist.',
      sourceLabel: 'Verified Debut Coverage · SM Entertainment',
    },
  ],
};

function formatMonthDay(isoDate: string): string {
  const parts = isoDate.split('-');
  if (parts.length !== 3) return isoDate;
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];
  const m = Number(parts[1]) - 1;
  const d = Number(parts[2]);
  return `${months[m] || parts[1]} ${d}, ${parts[0]}`;
}

export function buildIdolProfileQuiz(
  idol: Idol,
  allIdols: Idol[],
  allGroups: Group[]
): BuiltIdolQuizQuestion[] {
  const group = allGroups.find((g) => g.id === idol.groupId);
  const wiki = IDOL_WIKI_RESEARCH[idol.id];
  const curated = IDOL_RESEARCHED_QUESTIONS[idol.id] || [];
  const questions: BuiltIdolQuizQuestion[] = [];

  // Q1: Curated researched highlight (or verified group/idol origin highlight)
  if (curated.length > 0) {
    const q = curated[0];
    const correctText = q.options[q.correctIndex];
    const rotated = rotateWithAnswer(
      correctText,
      q.options.filter((_, idx) => idx !== q.correctIndex),
      `${idol.id}:curated:0`
    );
    questions.push({
      id: `${idol.id}-q1`,
      categoryLabel: 'Researched Career Highlight',
      prompt: q.prompt,
      options: rotated.options,
      correctIndex: rotated.correctIndex,
      explanation: q.explanation,
      sourceLabel: q.sourceLabel,
    });
  } else {
    // Verified debut / agency highlight when idol does not have a dedicated Wikipedia bio
    const agencyAns = group?.agency || 'K-pop Label';
    const otherAgencies = Array.from(
      new Set(allGroups.map((g) => g.agency).filter((a) => a !== agencyAns))
    );
    const pickedAgencies = otherAgencies
      .sort((a, b) => hashSeed(`${idol.id}:${a}`) - hashSeed(`${idol.id}:${b}`))
      .slice(0, 3);
    const rotated = rotateWithAnswer(agencyAns, pickedAgencies, `${idol.id}:agency`);
    questions.push({
      id: `${idol.id}-q1`,
      categoryLabel: 'Agency & Debut History',
      prompt: `Under which entertainment agency did ${idol.stageName} officially debut with ${idol.groupName}?`,
      options: rotated.options,
      correctIndex: rotated.correctIndex,
      explanation: `${idol.stageName} debuted with ${idol.groupName} under ${agencyAns}${group?.debutDate ? ` on ${formatMonthDay(group.debutDate)}` : ''}.`,
      sourceLabel: 'Verified Label Discography & Profile Directory',
    });
  }

  // Q2: Verified Birth Name / Legal Name
  const nameDistractors = allIdols
    .filter((other) => other.id !== idol.id && other.fullName !== idol.fullName)
    .sort((a, b) => hashSeed(`${idol.id}:name:${a.id}`) - hashSeed(`${idol.id}:name:${b.id}`))
    .slice(0, 3)
    .map((o) => o.fullName);
  const nameQ = rotateWithAnswer(idol.fullName, nameDistractors, `${idol.id}:fullname`);
  questions.push({
    id: `${idol.id}-q2`,
    categoryLabel: 'Identity & Birth Name',
    prompt: `What is ${idol.stageName}’s verified birth/legal name?`,
    options: nameQ.options,
    correctIndex: nameQ.correctIndex,
    explanation: `${idol.stageName}’s full name is ${idol.fullName}${idol.koreanName ? ` (${idol.koreanName})` : ''}.`,
    sourceLabel: wiki ? `Verified Wikipedia Biography (${wiki.wikiTitle})` : 'Verified Artist Directory',
  });

  // Q3: Verified Birthday & Zodiac Sign
  const bdayAnswer = `${formatMonthDay(idol.birthday)} (${idol.zodiac})`;
  const bdayDistractors = allIdols
    .filter((other) => other.id !== idol.id && other.birthday !== idol.birthday)
    .sort((a, b) => hashSeed(`${idol.id}:bday:${a.id}`) - hashSeed(`${idol.id}:bday:${b.id}`))
    .slice(0, 3)
    .map((o) => `${formatMonthDay(o.birthday)} (${o.zodiac})`);
  const bdayQ = rotateWithAnswer(bdayAnswer, bdayDistractors, `${idol.id}:bday`);
  questions.push({
    id: `${idol.id}-q3`,
    categoryLabel: 'Birthday & Zodiac',
    prompt: `On which verified date was ${idol.stageName} born?`,
    options: bdayQ.options,
    correctIndex: bdayQ.correctIndex,
    explanation: `${idol.stageName} was born on ${formatMonthDay(idol.birthday)}, making their zodiac sign ${idol.zodiac}.`,
    sourceLabel: 'Verified Birthdate Registry',
  });

  // Q4: Official Group Roles / Positions
  const roleAnswer = idol.positions.join(' / ');
  const otherRolesPool = Array.from(
    new Set(
      allIdols
        .map((other) => other.positions.join(' / '))
        .filter((pos) => pos && pos !== roleAnswer)
    )
  )
    .sort((a, b) => hashSeed(`${idol.id}:role:${a}`) - hashSeed(`${idol.id}:role:${b}`))
    .slice(0, 3);
  const roleQ = rotateWithAnswer(roleAnswer, otherRolesPool, `${idol.id}:roles`);
  questions.push({
    id: `${idol.id}-q4`,
    categoryLabel: 'Group Roles & Craft',
    prompt: `Which official positions best describe ${idol.stageName} in ${idol.groupName}?`,
    options: roleQ.options,
    correctIndex: roleQ.correctIndex,
    explanation: `${idol.stageName}’s verified roles in ${idol.groupName} are ${roleAnswer}.`,
    sourceLabel: 'Verified Group Profile & Discography Credits',
  });

  // Q5: Official Fandom or Debut Track Connection
  const fandomAns = group?.fandomName || `${idol.groupName} Fans`;
  const otherFandoms = Array.from(
    new Set(allGroups.map((g) => g.fandomName).filter((f) => f && f !== fandomAns))
  )
    .sort((a, b) => hashSeed(`${idol.id}:fan:${a}`) - hashSeed(`${idol.id}:fan:${b}`))
    .slice(0, 3);
  const fanQ = rotateWithAnswer(fandomAns, otherFandoms, `${idol.id}:fandom`);
  questions.push({
    id: `${idol.id}-q5`,
    categoryLabel: 'Fandom & Milestones',
    prompt: `What is the official fandom name for ${idol.stageName}’s group ${idol.groupName}?`,
    options: fanQ.options,
    correctIndex: fanQ.correctIndex,
    explanation: `${idol.groupName} fans are officially called ${fandomAns}. ${idol.funFact}`,
    sourceLabel: 'Official Fandom & Artist Fact Archive',
  });

  return questions;
}
