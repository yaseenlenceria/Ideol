export interface IdolResearchFactQuestion {
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  sourceLabel: string;
}

export interface IdolResearchEntry {
  wikiTitle?: string;
  wikiUrl?: string;
  summary: string;
}

export const IDOL_WIKI_RESEARCH: Record<string, IdolResearchEntry> = {
  "bts-rm": {
    "wikiTitle": "RM (musician)",
    "wikiUrl": "https://en.wikipedia.org/wiki/RM_(musician)",
    "summary": "Kim Nam-joon (Korean: 김남준; born September 12, 1994), known professionally as RM (formerly Rap Monster), is a South Korean rapper, songwriter, and record producer. He is the leader of South Korean boy band BTS, under Big Hit Music. Born in Seoul and raised in Ilsan, RM began his music career in the underground Korean hip-hop scene as a teenager, going by the name Runch Randa."
  },
  "bts-jin": {
    "wikiTitle": "Jin (singer)",
    "wikiUrl": "https://en.wikipedia.org/wiki/Jin_(singer)",
    "summary": "Kim Seok-jin (Korean: 김석진; born December 4, 1992), known professionally as Jin, is a South Korean singer. He rose to prominence as member of the South Korean boy band BTS. Jin has released three solo tracks with BTS: \"Awake\" in 2016, \"Epiphany\" in 2018, and \"Moon\" in 2020, all of which have charted on South Korea's Gaon Digital Chart."
  },
  "bts-suga": {
    "wikiTitle": "Suga",
    "wikiUrl": "https://en.wikipedia.org/wiki/Suga",
    "summary": "Min Yoon-gi (Korean: 민윤기; born March 9, 1993), known professionally by his stage names Suga (슈가; [ɕʰuɡa̠]; stylized in all caps) and Agust D, is a South Korean rapper, songwriter and record producer. He debuted as a member of the South Korean boy band BTS in June 2013 under Big Hit Entertainment. His first solo mixtape, Agust D, was released in 2016 and re-released in 2018 to digital download and streaming..."
  },
  "bts-jhope": {
    "wikiTitle": "J-Hope",
    "wikiUrl": "https://en.wikipedia.org/wiki/J-Hope",
    "summary": "Jung Ho-seok (Korean: 정호석; born February 18, 1994), known professionally as J-Hope (제이홉; stylized in lower case), is a South Korean rapper, singer, songwriter, dancer, and record producer. He made his debut as a member of South Korean boy band BTS in 2013, under Big Hit Entertainment. J-Hope released his first solo mixtape, Hope World, in 2018."
  },
  "bts-jungkook": {
    "wikiTitle": "Jung Kook",
    "wikiUrl": "https://en.wikipedia.org/wiki/Jung_Kook",
    "summary": "Jeon Jung-kook (Korean: 전정국; born September 1, 1997), known professionally as Jung Kook, is a South Korean singer and songwriter. He rose to prominence as a member of South Korean boy band BTS. He has performed three solo songs as part of BTS' discography—\"Begin\" in 2016, \"Euphoria\" in 2018, and \"My Time\" in 2020—all of which charted on South Korea's Gaon Digital Chart."
  },
  "bp-jennie": {
    "wikiTitle": "Jennie (singer)",
    "wikiUrl": "https://en.wikipedia.org/wiki/Jennie_(singer)",
    "summary": "Jennie Kim (Korean: 김제니; born January 16, 1996) is a South Korean singer, rapper, songwriter, and actress. Born in South Korea, she moved to New Zealand in 2004 and returned to South Korea to successfully audition for YG Entertainment in 2010. She rose to prominence as a member of the South Korean girl group Blackpink, which debuted in August 2016 and became one of the best-selling girl groups of all time."
  },
  "bp-rose": {
    "wikiTitle": "Rosé (singer)",
    "wikiUrl": "https://en.wikipedia.org/wiki/Ros%C3%A9_(singer)",
    "summary": "Roseanne Park (born 11 February 1997), known mononymously as Rosé (Korean: 로제), is a New Zealand and South Korean singer. Born in New Zealand and raised in Australia, Rosé moved to South Korea and signed with label YG Entertainment following a successful audition in 2012. She rose to prominence as a member of the South Korean girl group Blackpink, which debuted in August 2016 and became one of the best-selling..."
  },
  "bp-lisa": {
    "wikiTitle": "Lisa (rapper)",
    "wikiUrl": "https://en.wikipedia.org/wiki/Lisa_(rapper)",
    "summary": "Lalisa Manobal (Thai: ลลิษา มโนบาล; born Pranpriya Manobal, March 27, 1997), known mononymously as Lisa (Thai: ลิซ่า; Korean: 리사), is a Thai rapper, singer, dancer, and actress. She rose to prominence as a member of the South Korean girl group Blackpink, which debuted under YG Entertainment in August 2016 and became one of the best-selling girl groups of all time. In September 2021, Lisa released her debut single..."
  },
  "ive-yujin": {
    "wikiTitle": "An Yu-jin",
    "wikiUrl": "https://en.wikipedia.org/wiki/An_Yu-jin",
    "summary": "An Yu-jin (Korean: 안유진; born September 1, 2003) is a South Korean singer and dancer. She is the leader of the girl group Ive under Starship Entertainment and a former member of South Korean-Japanese girl group Iz*One."
  },
  "ive-rei": {
    "wikiTitle": "Rei (singer)",
    "wikiUrl": "https://en.wikipedia.org/wiki/Rei_(singer)",
    "summary": "Rei Naoi (Japanese: 直井 怜, Hepburn: Naoi Rei; born February 3, 2004), known mononymously as Rei (Korean: 레이; Japanese: レイ), is a Japanese singer and rapper based in South Korea. She is a member of the South Korean girl group Ive, under Starship Entertainment."
  },
  "ive-wonyoung": {
    "wikiTitle": "Jang Won-young",
    "wikiUrl": "https://en.wikipedia.org/wiki/Jang_Won-young",
    "summary": "Jang Won-young (Korean: 장원영; born August 31, 2004) is a South Korean singer-songwriter. She is a member of the South Korean girl group Ive under Starship Entertainment and former member of project girl group Iz*One, having finished first in Mnet's girl group survival reality television show Produce 48 in 2018."
  },
  "ive-leeseo": {
    "wikiTitle": "Leeseo",
    "wikiUrl": "https://en.wikipedia.org/wiki/Leeseo",
    "summary": "Lee Hyun-seo (Korean: 이현서; born February 21, 2007), known professionally as Leeseo, is a South Korean singer. She is a member of the South Korean girl group Ive under Starship Entertainment."
  },
  "skz-changbin": {
    "wikiTitle": "Changbin",
    "wikiUrl": "https://en.wikipedia.org/wiki/Changbin",
    "summary": "Seo Chang-bin (Korean: 서창빈; born August 11, 1999), known mononymously as Changbin, is a South Korean rapper, singer, songwriter, and record producer. He is a member of the South Korean boy group Stray Kids, formed by JYP Entertainment in 2017. He is also a member of 3Racha, an in-house production team and sub-unit of Stray Kids."
  },
  "skz-hyunjin": {
    "wikiTitle": "Hyunjin (Stray Kids singer)",
    "wikiUrl": "https://en.wikipedia.org/wiki/Hyunjin_(Stray_Kids_singer)",
    "summary": "Hwang Hyun-jin (Korean: 황현진; born March 20, 2000), known mononymously as Hyunjin, is a South Korean rapper, dancer, and singer. He is a member of the South Korean boy band Stray Kids, formed by JYP Entertainment in 2017. Aside from his work with Stray Kids, he has worked as a television presenter, hosting the weekly Korean music program Show!"
  },
  "skz-han": {
    "wikiTitle": "Han (musician)",
    "wikiUrl": "https://en.wikipedia.org/wiki/Han_(musician)",
    "summary": "Han Ji-sung (Korean: 한지성; born September 14, 2000), known as Han, is a South Korean rapper, singer, songwriter, and producer. He is a member of the South Korean boy band Stray Kids and its production unit 3Racha under JYP Entertainment. Han has been a full member of the Korea Music Copyright Association since February 2023, becoming the youngest K-pop idol to be awarded such membership."
  },
  "skz-seungmin": {
    "wikiTitle": "Seungmin",
    "wikiUrl": "https://en.wikipedia.org/wiki/Seungmin",
    "summary": "Kim Seung-min (Korean: 김승민; born September 22, 2000), known mononymously as Seungmin, is a South Korean singer. He is a member of the South Korean boy band Stray Kids, formed by JYP Entertainment in 2017. Additionally, Seungmin has served as an MC for After School Club and We K-Pop."
  },
  "skz-in": {
    "wikiTitle": "I.N",
    "wikiUrl": "https://en.wikipedia.org/wiki/I.N",
    "summary": "Yang Jeong-in (Korean: 양정인; born February 8, 2001), known professionally as I.N (아이엔), is a South Korean singer. He is a member of the South Korean boy band Stray Kids formed by JYP Entertainment in 2017. I.N made his acting debut in the final episode of the web series A-Teen 2 in 2019."
  },
  "twice-nayeon": {
    "wikiTitle": "Nayeon",
    "wikiUrl": "https://en.wikipedia.org/wiki/Nayeon",
    "summary": "Im Na-yeon (Korean: 임나연; born September 22, 1995), known mononymously as Nayeon, is a South Korean singer. She rose to prominence as a member of the South Korean girl group Twice, created by JYP Entertainment through the reality television show Sixteen (2015). Nayeon released her eponymous debut extended play (EP), Im Nayeon, in June 2022."
  },
  "twice-jeongyeon": {
    "wikiTitle": "Jeongyeon",
    "wikiUrl": "https://en.wikipedia.org/wiki/Jeongyeon",
    "summary": "Yu Jeong-yeon (Korean: 유정연; born 1 November 1996), known mononymously as Jeongyeon, is a South Korean singer. She is a member of Twice, a South Korean girl group formed by JYP Entertainment."
  },
  "twice-momo": {
    "wikiTitle": "Momo (singer)",
    "wikiUrl": "https://en.wikipedia.org/wiki/Momo_(singer)",
    "summary": "Momo Hirai (Japanese: 平井 もも; 平井 桃; born November 9, 1996) is a Japanese singer, dancer, and rapper based in South Korea. Signed to JYP Entertainment, she has been a member of the South Korean girl group Twice since 2015. In 2023, she, alongside Twice's other Japanese members, Sana and Mina, began releasing music in its subunit MiSaMo."
  },
  "twice-sana": {
    "wikiTitle": "Sana (singer)",
    "wikiUrl": "https://en.wikipedia.org/wiki/Sana_(singer)",
    "summary": "Sana Minatozaki (Japanese: 湊﨑 紗夏; born December 29, 1996), known mononymously as Sana (Korean: 사나; Japanese: サナ), is a Japanese singer based in South Korea. She is a member of the South Korean girl group Twice, formed in 2015 by JYP Entertainment, and its subunit MiSaMo, formed in 2023."
  },
  "twice-jihyo": {
    "wikiTitle": "Jihyo",
    "wikiUrl": "https://en.wikipedia.org/wiki/Jihyo",
    "summary": "Park Ji-hyo (Korean: 박지효; born Park Ji-soo, February 1, 1997), known mononymously as Jihyo, is a South Korean singer. She is the leader and vocalist of the South Korean girl group Twice, formed by JYP Entertainment in 2015. Jihyo released her debut extended play (EP) Zone and its lead single \"Killin' Me Good\" in August 2023."
  },
  "twice-mina": {
    "wikiTitle": "Mina (Japanese singer)",
    "wikiUrl": "https://en.wikipedia.org/wiki/Mina_(Japanese_singer)",
    "summary": "Mina Myoi (Japanese: 名井 南; born Mina Sharon Myoi, March 24, 1997), known mononymously as Mina (Korean: 미나; Japanese: ミナ), is a Japanese singer and dancer based in South Korea. She is a member of the South Korean girl group Twice, which debuted under JYP Entertainment in 2015, and its subgroup MiSaMo, which debuted in 2023."
  },
  "twice-dahyun": {
    "wikiTitle": "Dahyun",
    "wikiUrl": "https://en.wikipedia.org/wiki/Dahyun",
    "summary": "Kim Da-hyun (Korean: 김다현; born May 28, 1998), known mononymously as Dahyun, is a South Korean singer, rapper, and actress. She is a member of the South Korean girl group Twice, formed by JYP Entertainment in 2015. Dahyun made her acting debut in 2025 with the film You Are the Apple of My Eye, where she received several Best New Actress awards."
  },
  "twice-chaeyoung": {
    "wikiTitle": "Chaeyoung",
    "wikiUrl": "https://en.wikipedia.org/wiki/Chaeyoung",
    "summary": "Son Chae-young (Korean: 손채영; born April 23, 1999), known mononymously as Chaeyoung, is a South Korean singer and rapper. She is a member of the girl group Twice, formed by JYP Entertainment in 2015. Chaeyoung released her debut studio album Lil Fantasy Vol."
  },
  "twice-tzuyu": {
    "wikiTitle": "Tzuyu",
    "wikiUrl": "https://en.wikipedia.org/wiki/Tzuyu",
    "summary": "Chou Tzu-yu (Chinese: 周子瑜; born June 14, 1999), known mononymously as Tzuyu (Korean: 쯔위, Korean pronunciation: [t͈ɕɯ.y]), is a Taiwanese singer based in South Korea. She is a member of the South Korean girl group Twice, formed by JYP Entertainment in 2015. Tzuyu released her debut extended play (EP), Aboutzu, on September 6, 2024."
  },
  "svt-hoshi": {
    "wikiTitle": "Hoshi (South Korean singer)",
    "wikiUrl": "https://en.wikipedia.org/wiki/Hoshi_(South_Korean_singer)",
    "summary": "Kwon Soon-young (Korean: 권순영; born June 15, 1996), known by his stage name Hoshi (호시), is a South Korean singer and dancer. Managed by Pledis Entertainment, he is a member of the South Korean boy band Seventeen, the leader of its performance team and part of its subunits BSS and Hoshi X Woozi. Hoshi made his solo debut with \"Spider\" on April 2, 2021."
  },
  "svt-seungkwan": {
    "wikiTitle": "Seungkwan",
    "wikiUrl": "https://en.wikipedia.org/wiki/Seungkwan",
    "summary": "Boo Seung-kwan (Korean: 부승관; born January 16, 1998), known mononymously as Seungkwan, is a South Korean singer. Managed by Pledis Entertainment, he is a member of the South Korean boy band Seventeen, its vocal team, and the subunit BSS alongside Hoshi and DK. Apart from his group's activities, Seungkwan is known as an entertainment figure for his active participation in Korean variety shows such as Unexpected Q,..."
  },
  "svt-vernon": {
    "wikiTitle": "Vernon (rapper)",
    "wikiUrl": "https://en.wikipedia.org/wiki/Vernon_(rapper)",
    "summary": "Hansol Vernon Chwe (Korean: 최한솔; born February 18, 1998), known mononymously as Vernon (버논), is a South Korean and American rapper, singer and songwriter. Managed by Pledis Entertainment, he is a member of the South Korean boy band Seventeen, its hip hop team, and the sub-unit V8. Vernon made his official solo debut with \"Black Eye\" on December 27, 2022."
  },
  "en-niki": {
    "wikiTitle": "Ni-Ki",
    "wikiUrl": "https://en.wikipedia.org/wiki/Ni-Ki",
    "summary": "Nishimura Riki (Japanese: 西村 力; born 9 December 2005), known professionally as Ni-Ki (Japanese: ニキ), is a Japanese singer and dancer based in South Korea. He is a member of the boy band Enhypen under Belift Lab, formed through the reality survival show I-Land in 2020."
  },
  "txt-yeonjun": {
    "wikiTitle": "Yeonjun",
    "wikiUrl": "https://en.wikipedia.org/wiki/Yeonjun",
    "summary": "Choi Yeon-jun (Korean: 최연준; born September 13, 1999), known mononymously as Yeonjun, is a South Korean singer and songwriter. He is a member of the South Korean boy band Tomorrow X Together, formed by Big Hit Entertainment in 2019. He debuted as a soloist in September 2024 with the song \"Ggum\" and released his first extended play No Labels: Part 01 on November 7, 2025 and Part 02, also an EP, on July 10, 2026."
  },
  "txt-soobin": {
    "wikiTitle": "Soobin (singer)",
    "wikiUrl": "https://en.wikipedia.org/wiki/Soobin_(singer)",
    "summary": "Choi Soo-bin (Korean: 최수빈; born December 5, 2000), known mononymously as Soobin, is a South Korean singer and songwriter. He is the leader of the South Korean boy band Tomorrow X Together, formed by Big Hit Entertainment in 2019."
  },
  "txt-beomgyu": {
    "wikiTitle": "Beomgyu",
    "wikiUrl": "https://en.wikipedia.org/wiki/Beomgyu",
    "summary": "Choi Beom-gyu (Korean: 최범규; born March 13, 2001), known mononymously as Beomgyu, is a South Korean singer and songwriter. He is a member of the South Korean boy band Tomorrow X Together, formed by Big Hit Entertainment in 2019. He released his first solo song \"Panic\" on March 27, 2025."
  },
  "txt-taehyun": {
    "wikiTitle": "Taehyun (singer)",
    "wikiUrl": "https://en.wikipedia.org/wiki/Taehyun_(singer)",
    "summary": "Kang Tae-hyun (Korean: 강태현; born February 5, 2002), known mononymously as Taehyun, is a South Korean singer and songwriter. He is a member of the South Korean boy band Tomorrow X Together, formed by Big Hit Entertainment in 2019."
  },
  "txt-hueningkai": {
    "wikiTitle": "Hueningkai",
    "wikiUrl": "https://en.wikipedia.org/wiki/Hueningkai",
    "summary": "Kai Kamal Huening (born August 14, 2002), known professionally as Hueningkai (Korean: 휴닝카이), is an American singer and songwriter based in South Korea. He is a member of the South Korean boy band Tomorrow X Together, which debuted under Big Hit Entertainment in March 2019. In addition to his work with the group, he has participated in individual fashion campaigns and editorial features."
  },
  "aespa-giselle": {
    "wikiTitle": "Giselle (singer)",
    "wikiUrl": "https://en.wikipedia.org/wiki/Giselle_(singer)",
    "summary": "Aeri Uchinaga (Japanese: 内永 枝利, Hepburn: Uchinaga Eri; born October 30, 2000), known professionally as Giselle (Korean: 지젤), is a Japanese singer and rapper based in South Korea. She is a member of the South Korean girl group Aespa, formed by SM Entertainment in November 2020."
  },
  "aespa-ningning": {
    "wikiTitle": "Ningning",
    "wikiUrl": "https://en.wikipedia.org/wiki/Ningning",
    "summary": "Ning Yizhuo (Chinese: 宁艺卓; born October 23, 2002), known professionally as Ningning (Korean: 닝닝), is a Chinese singer based in South Korea. She is a member of the South Korean girl group Aespa."
  },
  "ateez-seonghwa": {
    "wikiTitle": "Seonghwa",
    "wikiUrl": "https://en.wikipedia.org/wiki/Seonghwa",
    "summary": "Park Seong-hwa (Korean: 박성화; born April 3, 1998), known mononymously as Seonghwa, is a South Korean singer, model, and actor. He is best known as a member of the boy group Ateez, formed by KQ Entertainment in 2018. He made his acting debut in the 2021 KBS drama Imitation with bandmates Yunho, San, and Jongho."
  },
  "ateez-hongjoong": {
    "wikiTitle": "Hongjoong",
    "wikiUrl": "https://en.wikipedia.org/wiki/Hongjoong",
    "summary": "Kim Hong-joong (Korean: 김홍중; born November 7, 1998), mononymously known as Hongjoong, is a South Korean rapper, singer, producer, and songwriter. He debuted as the leader of the South Korean boy band Ateez in 2018. As of August 2026, he has 190 songs credited under his name on the KOMCA."
  },
  "ateez-yunho": {
    "wikiTitle": "Jeong Yun-ho",
    "wikiUrl": "https://en.wikipedia.org/wiki/Jeong_Yun-ho",
    "summary": "Jeong Yun-ho (Korean: 정윤호; born March 23, 1999), known mononymously as Yunho, is a South Korean singer, dancer and actor. He debuted as one of the dancers and vocalists for the South Korean boy band Ateez in 2018. He also made his acting debut in the 2021 KBS drama Imitation."
  },
  "ateez-san": {
    "wikiTitle": "San (singer)",
    "wikiUrl": "https://en.wikipedia.org/wiki/San_(singer)",
    "summary": "Choi San (Korean: 최산; born July 10, 1999), known mononymously as San, is a South Korean singer and dancer. He is a member of the boy group Ateez, formed by KQ Entertainment. San made his acting debut in the in the 2021 KBS drama Imitation with bandmates Seonghwa, Yunho, and Jongho."
  },
  "lsf-sakura": {
    "wikiTitle": "Sakura Miyawaki",
    "wikiUrl": "https://en.wikipedia.org/wiki/Sakura_Miyawaki",
    "summary": "Sakura Miyawaki (宮脇咲良, Miyawaki Sakura; born March 19, 1998), also known mononymously as Sakura, is a Japanese singer and actress based in South Korea. She is a member of the South Korean girl group Le Sserafim, and a former member of South Korean–Japanese girl group Iz*One and Japanese girl groups AKB48 and its sister group HKT48. Miyawaki began her music career with the girl group HKT48 in 2011 and was a..."
  },
  "lsf-chaewon": {
    "wikiTitle": "Kim Chaewon",
    "wikiUrl": "https://en.wikipedia.org/wiki/Kim_Chaewon",
    "summary": "Kim Chaewon (Korean: 김채원; born August 1, 2000) is a South Korean singer. She is the leader of South Korean girl group Le Sserafim and a former member of the girl group Iz*One, having finished tenth in the reality competition series Produce 48 in 2018."
  },
  "lsf-yunjin": {
    "wikiTitle": "Huh Yunjin",
    "wikiUrl": "https://en.wikipedia.org/wiki/Huh_Yunjin",
    "summary": "Huh Yunjin (Korean: 허윤진; born October 8, 2001) is an American singer and songwriter based in South Korea. She is a member of the South Korean girl group Le Sserafim, formed by Source Music in 2022."
  },
  "lsf-kazuha": {
    "wikiTitle": "Kazuha (singer)",
    "wikiUrl": "https://en.wikipedia.org/wiki/Kazuha_(singer)",
    "summary": "Kazuha Nakamura (Japanese: 中村 一葉, Hepburn: Nakamura Kazuha; born August 9, 2003), also known mononymously as Kazuha, is a Japanese singer and dancer based in South Korea. She is a member of the South Korean girl group Le Sserafim, formed in 2022 by Source Music."
  },
  "lsf-eunchae": {
    "wikiTitle": "Hong Eunchae",
    "wikiUrl": "https://en.wikipedia.org/wiki/Hong_Eunchae",
    "summary": "Hong Eunchae (Korean: 홍은채; born November 10, 2006) is a South Korean singer. She is a member of the South Korean girl group Le Sserafim, formed by Source Music in 2022. Outside of her group activities, she is known for having served as a regular MC of the South Korean music program Music Bank on KBS2 from February 2023 to September 2024."
  },
  "kat-manon": {
    "wikiTitle": "Manon Bannerman",
    "wikiUrl": "https://en.wikipedia.org/wiki/Manon_Bannerman",
    "summary": "Meret Manon Sarpong Bannerman (born June 26, 2002), also known mononymously as Manon, is a Swiss singer. She began her career through her social media presence on Instagram and TikTok. As a singer, she became the first Black artist to sign with a Hybe label, debuting as a member of the girl group Katseye in 2024, formed through the 2023 competition reality show Dream Academy."
  },
  "kat-sophia": {
    "wikiTitle": "Sophia Laforteza",
    "wikiUrl": "https://en.wikipedia.org/wiki/Sophia_Laforteza",
    "summary": "Sophia Elizabeth Guevara Laforteza (born December 31, 2002) is a Filipino and American singer. In 2024, she made her debut as the leader of the girl group Katseye, formed through the 2023 reality show Dream Academy created by Hybe and Geffen Records."
  },
  "kat-daniela": {
    "wikiTitle": "Daniela Avanzini",
    "wikiUrl": "https://en.wikipedia.org/wiki/Daniela_Avanzini",
    "summary": "Daniela Andrea Avanzini Llorente (born July 1, 2004) is an American singer and dancer. She is best known as a member of the girl group Katseye, formed through the 2023 reality show Dream Academy. She was previously a contestant on the 13th season of So You Think You Can Dance in 2016."
  },
  "kat-lara": {
    "wikiTitle": "Lara Raj",
    "wikiUrl": "https://en.wikipedia.org/wiki/Lara_Raj",
    "summary": "Lara Rajagopalan (born November 3, 2005), known professionally as Lara Raj, is an American singer. In 2024, she made her debut as a member of Katseye, a girl group formed through the 2023 reality show Dream Academy created by Hybe and Geffen Records."
  },
  "kat-megan": {
    "wikiTitle": "Megan Skiendiel",
    "wikiUrl": "https://en.wikipedia.org/wiki/Megan_Skiendiel",
    "summary": "Megan Meiyok Skiendiel ( SKEN-del; born February 10, 2006), also known mononymously as Megan, is an American singer. She is best known as a member of Katseye, a girl group formed through the 2023 competition reality show Dream Academy created by Hybe and Geffen Records."
  },
  "bts-jimin": {
    "wikiTitle": "Jimin",
    "wikiUrl": "https://en.wikipedia.org/wiki/Jimin",
    "summary": "Park Ji-min (Korean: 박지민; born October 13, 1995), known mononymously as Jimin, is a South Korean singer, songwriter, and dancer. In 2013, he made his debut as a member of the South Korean boy band BTS, under the record label Big Hit Entertainment. Jimin has released three solo tracks under BTS' name—\"Lie\" in 2016, \"Serendipity\" in 2017, and \"Filter\" in 2020—all of which have charted on South Korea's Gaon Digital..."
  },
  "bts-v": {
    "wikiTitle": "V (singer)",
    "wikiUrl": "https://en.wikipedia.org/wiki/V_(singer)",
    "summary": "Kim Tae-hyung (Korean: 김태형; born December 30, 1995), known professionally as V (뷔), is a South Korean singer. In 2013, he made his debut as a member of the South Korean boy band BTS, under Big Hit Entertainment. V has performed three solo songs under BTS's name—\"Stigma\" in 2016, \"Singularity\" in 2018, and \"Inner Child\" in 2020—all of which charted on South Korea's Gaon Digital Chart."
  },
  "bp-jisoo": {
    "wikiTitle": "Jisoo",
    "wikiUrl": "https://en.wikipedia.org/wiki/Jisoo",
    "summary": "Kim Ji-soo (Korean: 김지수; born January 3, 1995), known mononymously as Jisoo, is a South Korean singer and actress. She rose to prominence as a member of the South Korean girl group Blackpink, which debuted under YG Entertainment in August 2016 and became one of the best-selling girl groups of all time. In March 2023, Jisoo released her debut single album Me, which became the best-selling album by a Korean female..."
  },
  "skz-bangchan": {
    "wikiTitle": "Bang Chan",
    "wikiUrl": "https://en.wikipedia.org/wiki/Bang_Chan",
    "summary": "Christopher Chahn Bahng (born 3 October 1997), known professionally as Bang Chan (Korean: 방찬), is an Australian singer, rapper, songwriter, and record producer based in South Korea. Signed to JYP Entertainment, he is the leader of the South Korean boy band Stray Kids and a member of 3Racha, an in-house production team and sub-unit of Stray Kids. Bang Chan played a pivotal role in forming Stray Kids by selecting..."
  },
  "skz-leeknow": {
    "wikiTitle": "Lee Know",
    "wikiUrl": "https://en.wikipedia.org/wiki/Lee_Know",
    "summary": "Lee Min-ho (Korean: 이민호; born October 25, 1998), better known by his stage name Lee Know (리노), is a South Korean singer and dancer. He is a member of South Korean boy band Stray Kids, formed by JYP Entertainment in 2017. In addition to his work with Stray Kids, Lee Know served as a host for the music chart show, Show!"
  },
  "skz-felix": {
    "wikiTitle": "Felix (rapper)",
    "wikiUrl": "https://en.wikipedia.org/wiki/Felix_(rapper)",
    "summary": "Felix Yongbok Lee (born 15 September 2000), known mononymously as Felix (Korean: 필릭스), is an Australian rapper and singer based in South Korea. He is a member of the South Korean boy band Stray Kids, formed by JYP Entertainment in 2017."
  },
  "svt-scoups": {
    "wikiTitle": "S.Coups",
    "wikiUrl": "https://en.wikipedia.org/wiki/S.Coups",
    "summary": "Choi Seung-cheol (Korean: 최승철; born 8 August 1995), known by his stage name S.Coups (에스쿱스), is a South Korean rapper, singer, and songwriter. Managed by Pledis Entertainment, he is the leader of the South Korean boy band Seventeen and its hip hop team, and in 2025 debuted in a sub-unit with Mingyu as CxM."
  },
  "svt-jeonghan": {
    "wikiTitle": "Jeonghan",
    "wikiUrl": "https://en.wikipedia.org/wiki/Jeonghan",
    "summary": "Yoon Jeong-han (Korean: 윤정한, born October 4, 1995), known mononymously as Jeonghan, is a South Korean singer. Managed by Pledis Entertainment, he is a member of the South Korean boy band Seventeen, its vocal team, and its subunits JxW and JxJ."
  },
  "svt-wonwoo": {
    "wikiTitle": "Wonwoo",
    "wikiUrl": "https://en.wikipedia.org/wiki/Wonwoo",
    "summary": "Jeon Won-woo (Korean: 전원우; born July 17, 1996), known mononymously as Wonwoo (원우), is a South Korean rapper and singer. Managed by Pledis Entertainment, he is a member of the South Korean boy band Seventeen, its hip hop team, and its second subunit, JxW."
  },
  "svt-woozi": {
    "wikiTitle": "Woozi",
    "wikiUrl": "https://en.wikipedia.org/wiki/Woozi",
    "summary": "Lee Ji-hoon (Korean: 이지훈; born November 22, 1996), known by his stage name Woozi (우지), is a South Korean singer, songwriter and record producer. Managed by Pledis Entertainment, he is a member of the South Korean boy band Seventeen, the leader of its vocal team, and part of its subunit Hoshi X Woozi. In 2022, he made his solo debut with \"Ruby\"."
  },
  "svt-the8": {
    "wikiTitle": "The8",
    "wikiUrl": "https://en.wikipedia.org/wiki/The8",
    "summary": "Xu Minghao (Chinese: 徐明浩; Korean: 서명호; born November 7, 1997), known professionally as The8 (디에잇; also stylized as The 8), is a Chinese singer and dancer based in South Korea. Managed by Pledis Entertainment, he is a member of the South Korean boy band Seventeen, its performance team, and the sub-unit V8. In 2018, he had his official solo debut with the release of \"Night and Rain\" and served as one of the two..."
  },
  "svt-mingyu": {
    "wikiTitle": "Mingyu",
    "wikiUrl": "https://en.wikipedia.org/wiki/Mingyu",
    "summary": "Kim Min-gyu (Korean: 김민규; born April 6, 1997), known mononymously as Mingyu (민규), is a South Korean rapper and singer. Managed by Pledis Entertainment, he is a member of the South Korean boy band Seventeen and its hip hop team, and in 2025, debuted in a sub-unit with S.Coups as CxM."
  },
  "svt-dk": {
    "wikiTitle": "DK (singer)",
    "wikiUrl": "https://en.wikipedia.org/wiki/DK_(singer)",
    "summary": "Lee Seok-min (Korean: 이석민; born February 18, 1997), known professionally as Dokyeom (도겸) or DK, is a South Korean singer. Managed by Pledis Entertainment he is a member of the South Korean boy band Seventeen, its vocal team, and is the leader of its subunit BSS with Hoshi and Seungkwan. Outside of his group activities, In 2019, DK made his musical theatre debut with the lead role Arthur in XCalibur, the South..."
  },
  "svt-dino": {
    "wikiTitle": "Dino (South Korean singer)",
    "wikiUrl": "https://en.wikipedia.org/wiki/Dino_(South_Korean_singer)",
    "summary": "Lee Chan (Korean: 이찬), known by his stage name Dino (디노), is a South Korean singer, dancer and rapper. Managed by Pledis Entertainment, he is a member of the South Korean boy band Seventeen and its performance team. Dino made his solo debut with \"Wait\" on November 27, 2023."
  },
  "en-heeseung": {
    "wikiTitle": "Evan (singer)",
    "wikiUrl": "https://en.wikipedia.org/wiki/Evan_(singer)",
    "summary": "Lee Hee-seung (Korean: 이희승; born October 15, 2001), known professionally as Evan (Korean: 에반) and formerly known mononymously as Heeseung, is a South Korean singer and songwriter. He is a former member of the South Korean boy band Enhypen, formed through the 2020 reality competition show I-Land."
  },
  "aespa-karina": {
    "wikiTitle": "Karina (South Korean singer)",
    "wikiUrl": "https://en.wikipedia.org/wiki/Karina_(South_Korean_singer)",
    "summary": "Yu Ji-min (Korean: 유지민; born April 11, 2000), known professionally as Karina (카리나), is a South Korean singer, rapper and dancer. She is a member and leader of the South Korean girl group Aespa, formed by SM Entertainment in November 2020. She is also a member of the supergroup Got the Beat, which debuted in January 2022."
  },
  "aespa-winter": {
    "wikiTitle": "Winter (singer)",
    "wikiUrl": "https://en.wikipedia.org/wiki/Winter_(singer)",
    "summary": "Kim Min-jeong (Korean: 김민정; born January 1, 2001), known professionally as Winter (윈터), is a South Korean singer and dancer. She is a member of the South Korean girl group Aespa which debuted under SM Entertainment in November 2020. In January 2022, she became a member of Got the Beat, a supergroup of female singers under SM."
  },
  "ateez-jongho": {
    "wikiTitle": "Jongho",
    "wikiUrl": "https://en.wikipedia.org/wiki/Jongho",
    "summary": "Choi Jong-ho (Korean: 최종호; born October 12, 2000), known mononymously as Jongho, is a South Korean singer and actor. He debuted as the main vocalist of the boy group Ateez in 2018. Jongho made his acting debut in the 2021 KBS drama Imitation."
  },
  "illit-wonhee": {
    "wikiTitle": "Wonhee",
    "wikiUrl": "https://en.wikipedia.org/wiki/Wonhee",
    "summary": "Lee Won-hee (Korean: 이원희; born June 26, 2007), known mononymously as Wonhee, is a South Korean singer. She is a member of the girl group Illit under Belift Lab and Hybe, formed through the 2023 survival show R U Next?."
  },
  "itzy-yeji": {
    "wikiTitle": "Yeji (singer)",
    "wikiUrl": "https://en.wikipedia.org/wiki/Yeji_(singer)",
    "summary": "Hwang Ye-ji (Korean: 황예지; born May 26, 2000), known mononymously as Yeji, is a South Korean singer and dancer. She is the leader of the South Korean girl group Itzy, formed by JYP Entertainment in 2019. Yeji released her debut solo extended play (EP), Air, in March 2025."
  },
  "itzy-lia": {
    "wikiTitle": "Lia (South Korean singer)",
    "wikiUrl": "https://en.wikipedia.org/wiki/Lia_(South_Korean_singer)",
    "summary": "Choi Ji-su (Korean: 최지수; born July 21, 2000), better known by her stage name Lia (리아), is a South Korean singer. She is a member of the South Korean girl group Itzy, formed by JYP Entertainment in 2019."
  },
  "itzy-ryujin": {
    "wikiTitle": "Ryujin (rapper)",
    "wikiUrl": "https://en.wikipedia.org/wiki/Ryujin_(rapper)",
    "summary": "Shin Ryu-jin (Korean: 신류진; born April 17, 2001), known mononymously as Ryujin, is a South Korean rapper, singer, dancer and actress. She is a member of the South Korean girl group Itzy, formed by JYP Entertainment in 2019."
  },
  "itzy-chaeryeong": {
    "wikiTitle": "Chaeryeong",
    "wikiUrl": "https://en.wikipedia.org/wiki/Chaeryeong",
    "summary": "Lee Chae-ryeong (Korean: 이채령; born June 5, 2001), known mononymously as Chaeryeong, is a South Korean singer and dancer. She is a member of the South Korean girl group Itzy, formed by JYP Entertainment in 2019. Chaeryeong released her debut solo extended play (EP), Lovesick, in November 2026."
  },
  "itzy-yuna": {
    "wikiTitle": "Yuna (singer, born 2003)",
    "wikiUrl": "https://en.wikipedia.org/wiki/Yuna_(singer%2C_born_2003)",
    "summary": "Shin Yu-na (Korean: 신유나; born December 9, 2003), known mononymously as Yuna, is a South Korean singer, dancer, rapper, and actress. She is a member of the South Korean girl group Itzy, formed by JYP Entertainment in 2019. She made her acting debut in 2026 in Undercover Miss Hong and appeared in My Bias, My Boss."
  },
  "nctd-renjun": {
    "wikiTitle": "Renjun",
    "wikiUrl": "https://en.wikipedia.org/wiki/Renjun",
    "summary": "Huang Renjun (Chinese: 黃仁俊; born 23 March 2000), known mononymously as Renjun (Korean: 런쥔), is a Chinese singer. He rose to prominence as a member of the K-pop boy band NCT and its sub-unit NCT Dream. Born and raised in Jilin, Renjun started training in South Korea under SM Entertainment in 2015."
  },
  "nctd-jeno": {
    "wikiTitle": "Jeno (singer)",
    "wikiUrl": "https://en.wikipedia.org/wiki/Jeno_(singer)",
    "summary": "Lee Je-no (Korean: 이제노; born April 23, 2000), known mononymously as Jeno, is a South Korean singer, rapper, and actor. He rose to prominence as a member of the K-pop boy band NCT and its sub-units NCT Dream and NCT JNJM. Born in Incheon and raised in Goyang, Jeno began his career as a child model and actor."
  },
  "nctd-haechan": {
    "wikiTitle": "Haechan",
    "wikiUrl": "https://en.wikipedia.org/wiki/Haechan",
    "summary": "Lee Dong-hyuck (Korean: 이동혁; born June 6, 2000), known professionally as Haechan (해찬), is a South Korean singer and dancer. Known for his distinctive vocal timbre, he rose to prominence as a member of the K-pop boy band NCT and its sub-units NCT 127 and NCT Dream. Born in Seoul and raised in the city and Jeju, Haechan started training under SM Entertainment in 2013."
  },
  "nctd-jaemin": {
    "wikiTitle": "Jaemin",
    "wikiUrl": "https://en.wikipedia.org/wiki/Jaemin",
    "summary": "Na Jae-min (Korean: 나재민; born August 13, 2000), known mononymously as Jaemin, is a South Korean singer, rapper, and actor. He rose to prominence as a member of the K-pop boy band NCT and its sub-units NCT Dream and NCT JNJM. Born in Busan and raised in Jeonju and Seoul, Jaemin started training under SM Entertainment in 2013."
  },
  "nctd-chenle": {
    "wikiTitle": "Chenle",
    "wikiUrl": "https://en.wikipedia.org/wiki/Chenle",
    "summary": "Zhong Chenle (Chinese: 钟辰乐; born 22 November 2001), known mononymously as Chenle (Korean: 천러), is a Chinese singer and former child actor based in South Korea. Chenle began his career as a child singer, having performed in various concerts and television shows in China and abroad. At age nine, he became the youngest singer to be invited to perform solo at the Golden Hall of Vienna."
  },
  "nctd-jisung": {
    "wikiTitle": "Jisung",
    "wikiUrl": "https://en.wikipedia.org/wiki/Jisung",
    "summary": "Park Ji-sung (Korean: 박지성; born February 5, 2002), known mononymously as Jisung is a South Korean singer, rapper, dancer, and actor. He rose to prominence as a member of the K-pop boy band NCT and its sub-unit NCT Dream. Born in Seoul, Jisung began his career as a child actor and dancer."
  },
  "ateez-wooyoung": {
    "wikiTitle": "Jung Wooyoung",
    "wikiUrl": "https://en.wikipedia.org/wiki/Jung_Wooyoung",
    "summary": "Jung Woo-young (Korean: 정우영; born November 26, 1999), known mononymously as Wooyoung, is a South Korean singer and dancer. He debuted as one of the vocalists for the South Korean boy band Ateez in 2018."
  },
  "ive-liz": {
    "wikiTitle": "Liz (South Korean singer)",
    "wikiUrl": "https://en.wikipedia.org/wiki/Liz_(South_Korean_singer)",
    "summary": "Kim Ji-won (Korean: 김지원; born November 21, 2004), known professionally as Liz (리즈), is a South Korean singer under Starship Entertainment. She is a member of the South Korean girl group Ive."
  },
  "nj-minji": {
      "wikiTitle": "Minji (singer)",
      "wikiUrl": "https://en.wikipedia.org/wiki/Minji_(singer)",
      "summary": "Kim Min-ji (Korean: 김민지; born May 7, 2004), known mononymously as Minji, is a South Korean singer. Minji made her debut as a member of the South Korean girl group NewJeans, under the record label ADOR on July 22, 2022."
  },
  "nj-hanni": {
      "wikiTitle": "Hanni (singer)",
      "wikiUrl": "https://en.wikipedia.org/wiki/Hanni_(singer)",
      "summary": "Hanni Pham (born 6 October 2004) is an Australian singer based in South Korea. In July 2022, she made her debut as a member of the South Korean girl group NewJeans, under the record label ADOR."
  },
  "nj-danielle": {
      "wikiTitle": "Danielle (singer)",
      "wikiUrl": "https://en.wikipedia.org/wiki/Danielle_(singer)",
      "summary": "Danielle June Marsh (born 11 April 2005) is an Australian and South Korean singer. She is best known as a former member of the South Korean girl group NewJeans.  Danielle began her career in the entertainment industry by making several appearances on television as a child, before debuting as a member of NewJeans in 2022. The group was formed by ADOR, a subsidiary of Hybe. The following year, Danielle ventured into acting, voicing Ariel in the Korean language dub of The Little Mermaid (2023). Following a contract dispute, Danielle was removed from NewJeans at the end of 2025."
  },
  "nj-haerin": {
      "wikiTitle": "Haerin",
      "wikiUrl": "https://en.wikipedia.org/wiki/Haerin",
      "summary": "Kang Hae-rin (Korean: 강해린; born May 15, 2006), known mononymously as Haerin, is a South Korean singer. She is best known as a member of the South Korean girl group NewJeans, which debuted on July 22, 2022, under the record label ADOR."
  },
  "nj-hyein": {
      "wikiTitle": "Hyein",
      "wikiUrl": "https://en.wikipedia.org/wiki/Hyein",
      "summary": "Lee Hye-in (Korean: 이혜인, [iː çein]; born April 21, 2008), known mononymously as Hyein, is a South Korean singer and former child model. She began her musical career at nine years old as a member of the South Korean children's groups U.sso Girl and Play with Me Club. She later debuted as a member of South Korean girl group NewJeans, formed by ADOR in July 2022."
  },
  "nmixx-sullyoon": {
      "wikiTitle": "Sullyoon",
      "wikiUrl": "https://en.wikipedia.org/wiki/Sullyoon",
      "summary": "Seol Yoon-a (Korean: 설윤아; born January 26, 2004), better known by her stage name Sullyoon (설윤), is a South Korean singer. She debuted in 2022 as a member of the girl group Nmixx, formed by JYP Entertainment. In addition to her work with the group, she has participated in individual fashion campaigns and editorial features."
  },
  "zb1-zhanghao": {
      "wikiTitle": "Zhang Hao (singer)",
      "wikiUrl": "https://en.wikipedia.org/wiki/Zhang_Hao_(singer)",
      "summary": "Zhang Hao (Chinese: 章昊; Korean: 장하오; born July 25, 2000) is a Chinese singer based in South Korea and signed under YH Entertainment. He was a member of the South Korean boy band Zerobaseone from its debut in July 2023 until his contract expired in March 2026. He re-debuted as a member of the boy group And2ble under YH Entertainment in 2026.  Zhang finished first in the reality competition show Boys Planet and is noted for being the first foreign contestant to place first in a South Korean idol survival show."
  },
  "zb1-hanbin": {
      "wikiTitle": "Sung Han-bin",
      "wikiUrl": "https://en.wikipedia.org/wiki/Sung_Han-bin",
      "summary": "Sung Han-bin (Korean: 성한빈; born June 13, 2001) is a South Korean singer and dancer. He is best known for competing on the Mnet reality competition show Boys Planet, where he ranked second in the final episode, making him a member of Zerobaseone."
  },
  "zb1-jiwoong": {
      "wikiTitle": "Kim Ji-woong",
      "wikiUrl": "https://en.wikipedia.org/wiki/Kim_Ji-woong",
      "summary": "Kim Ji-woong (Korean: 김지웅; born December 14, 1998) is a South Korean singer and actor. Kim is best known for competing on the reality competition show Boys Planet where he ranked 8th in the final episode, earning him a spot in the South Korean boy band Zerobaseone. Prior to this, Kim was a member of the boy group INX under the name Jinam until their disbandment in 2017. He made his debut as an actor in the web series The Sweet Blood (2021), and is best known for his role in Kissable Lips (2022)."
  },
  "zb1-yujin": {
      "wikiTitle": "Han Yu-jin",
      "wikiUrl": "https://en.wikipedia.org/wiki/Han_Yu-jin",
      "summary": "Han Yu-jin (Korean: 한유진; born March 20, 2007) is a South Korean singer. He is a member of South Korean boy group And2ble under YH Entertainment and former member of project boy group Zerobaseone, having finished ninth in Mnet's boy group survival reality television show Boys Planet in 2023."
  },
  "riize-sungchan": {
      "wikiTitle": "Sungchan",
      "wikiUrl": "https://en.wikipedia.org/wiki/Sungchan",
      "summary": "Jung Sung-chan (Korean: 정성찬; born September 13, 2001), known mononymously as Sungchan, is a South Korean rapper, singer and dancer. He rose to prominence in 2020 when he was introduced as a new member of NCT, a South Korean boy group managed by SM Entertainment. Following his activities with NCT, he departed the group in 2023 and later re-debuted as a member of Riize, also formed by SM Entertainment."
  },
  "idle-miyeon": {
      "wikiTitle": "Miyeon",
      "wikiUrl": "https://en.wikipedia.org/wiki/Miyeon",
      "summary": "Cho Mi-yeon (Korean: 조미연; born January 31, 1997), better known mononymously as Miyeon, is a South Korean singer and actress. She is a vocalist of the South Korean girl group I-dle under Cube Entertainment, and voiced Ahri in the virtual K-pop girl group K/DA."
  },
  "idle-minnie": {
      "wikiTitle": "Minnie (singer)",
      "wikiUrl": "https://en.wikipedia.org/wiki/Minnie_(singer)",
      "summary": "Nicha Yontararak (Thai: ณิชา ยนตรรักษ์; born (1997-10-23)October 23, 1997), known professionally as Minnie (Korean: 민니; Thai: มินนี่), is a Thai singer and actress based in South Korea. She is a member of South Korean girl group I-dle, which debuted as (G)I-dle on May 2, 2018, under Cube Entertainment. Minnie made her solo debut with the extended play Her on January 21, 2025."
  },
  "idle-soyeon": {
      "wikiTitle": "Soyeon",
      "wikiUrl": "https://en.wikipedia.org/wiki/Soyeon",
      "summary": "Jeon So-yeon (Korean: 전소연; born August 26, 1998), known mononymously as Soyeon, is a South Korean rapper, singer, songwriter and record producer, under Cube Entertainment. She first gained attention for competing in the television shows Produce 101 and Unpretty Rapstar before debuting as a solo artist on November 5, 2017. On May 2, 2018, she debuted as the leader and rapper of the K-pop girl group (G)I-dle, later changing their name to I-dle, for whom she has written and produced most lead singles. In 2018, she joined SM Station X's girl group project Station Young, which released its debut song \"Wow Thing\" in September of that year. She has also portrayed the League of Legends character Akali in the virtual musical groups K/DA and True Damage. Soyeon was promoted to a full member of the Korea Music Copyright Association on January 31, 2024."
  },
  "idle-yuqi": {
      "wikiTitle": "Yuqi",
      "wikiUrl": "https://en.wikipedia.org/wiki/Yuqi",
      "summary": "Song Yuqi (Chinese: 宋雨琦; born September 23, 1999) is a Chinese singer and songwriter. She is a member of the South Korean girl group I-dle, which debuted as (G)I-dle under Cube Entertainment in May 2018. She has been a cast member of the Chinese variety show Keep Running since 2019 and hosted the KakaoTV reality show Learn Way (2020–2021). In May 2021, Yuqi made her solo debut with a single album A Page."
  },
  "idle-shuhua": {
      "wikiTitle": "Shuhua",
      "wikiUrl": "https://en.wikipedia.org/wiki/Shuhua",
      "summary": "Yeh Shu-hua (Chinese: 葉舒華; born January 6, 2000), known mononymously as Shuhua (Korean: 슈화), is a Taiwanese singer and actress based in South Korea. She is a member of the South Korean girl group I-dle, which debuted as (G)I-dle under Cube Entertainment in May 2018. She made her acting debut in Happily Ever After (2026), which premiered at the Toronto International Film Festival."
  },
  "rv-irene": {
      "wikiTitle": "Irene (singer)",
      "wikiUrl": "https://en.wikipedia.org/wiki/Irene_(singer)",
      "summary": "Bae Joo-hyun (Korean: 배주현; born March 29, 1991), better known by her stage name Irene (아이린), is a South Korean singer, actress and rapper. She is best known as a member and the leader of the South Korean girl group Red Velvet, and its sub-unit Red Velvet – Irene & Seulgi. Irene hosted the television programs Music Bank (2015–2016), Laundry Day (2016–2017), and Irene's Work & Holiday (2022), as well as various music festivals and award events. As an actress, Irene has starred in Women at a Game Company (2016) and Double Patty (2021)."
  },
  "rv-seulgi": {
      "wikiTitle": "Seulgi",
      "wikiUrl": "https://en.wikipedia.org/wiki/Seulgi",
      "summary": "Kang Seul-gi (Korean: 강슬기; born February 10, 1994), known mononymously as Seulgi, is a South Korean singer and dancer. She is a member of the South Korean girl group Red Velvet, its sub-unit Red Velvet – Irene & Seulgi, and the supergroup Got the Beat. She released her debut EP, 28 Reasons, in 2022."
  },
  "rv-wendy": {
      "wikiTitle": "Wendy (singer)",
      "wikiUrl": "https://en.wikipedia.org/wiki/Wendy_(singer)",
      "summary": "Shon Seung-wan (Korean: 손승완; born February 21, 1994), known professionally as Wendy (웬디), is a South Korean singer. She is a member of the South Korean girl group Red Velvet. In 2021, she made her solo debut with the EP Like Water. In 2022, she became a member of SM Entertainment's supergroup Got the Beat. Apart from her music career, Wendy has made various television appearances, including as a panelist on the reality show We Got Married (2015–2016), Trick & True (2016–2017), being cast on comedy show Saturday Night Live Korea (2021), and hosting Mysterious Record Shop (2021). From 2021 to 2023, Wendy hosted the radio program Wendy's Youngstreet. She made her theatrical debut in the musical Rebecca in 2023 and in 2025, started the web show Today is Wendy."
  },
  "rv-joy": {
      "wikiTitle": "Joy (singer)",
      "wikiUrl": "https://en.wikipedia.org/wiki/Joy_(singer)",
      "summary": "Park Soo-young (Korean: 박수영; born September 3, 1996), better known by her stage name Joy (조이), is a South Korean singer, actress, and host. She debuted as a member of South Korean girl group Red Velvet in August 2014. In 2017, Joy debuted as an actress and has had starring roles in the television dramas The Liar and His Lover (2017), Tempted (2018), The One and Only (2021), Once Upon a Small Town (2022), and One of a Kind Romance (2026). In 2021, Joy officially debuted as a soloist with the release of her special album Hello."
  },
  "rv-yeri": {
      "wikiTitle": "Yeri (singer)",
      "wikiUrl": "https://en.wikipedia.org/wiki/Yeri_(singer)",
      "summary": "Kim Ye-rim (Korean: 김예림; born March 5, 1999), better known by her stage name Yeri, is a South Korean singer and actress. She is a member of South Korean girl group Red Velvet. She made her acting debut with the drama Blue Birthday. Aside from her music and acting career, Yeri hosted Show! Music Core (2015) and The Viewable SM (2016). Yeri also appeared on variety show Secret Unnie (2018) and Law of the Jungle in Thailand (2019). In 2020, Yeri hosted her first reality-variety show Yeri's Room, which aired through the YouTube channel Dum Dum Studio."
  },
  "shinee-onew": {
      "wikiTitle": "Onew",
      "wikiUrl": "https://en.wikipedia.org/wiki/Onew",
      "summary": "Lee Jin-ki (Korean: 이진기; Korean pronunciation: [i.dʑin.ɡi]; born December 14, 1989), known professionally as Onew, is a South Korean singer-songwriter and actor. Born in Gwangmyeong, Gyeonggi-do, Onew was discovered at the 2006 SM Academy Casting and signed a contract with SM Entertainment the day after his audition. He debuted as the lead vocalist and leader of the South Korean boy band Shinee in May 2008, which went on to become one of the best-selling artists in South Korea. As a singer, he has participated in the original soundtracks for various TV series and released collaborations with various artists. He made his solo debut on December 5, 2018, with the release of his first extended play, Voice, five days before his military conscription on December 10, 2018. After finishing his military service, he released his second EP, Dice, on April 11, 2022, and later that year on July 6, he made his solo debut in Japan with the release of his first studio album, Life Goes On. He released his first Korean studio album, Circle, on March 6, 2023. He followed this with the release of his third EP, Flow, on September 3, 2024, and his fourth EP, Connection, on January 6, 2025. He released his second Korean studio album, Percent, on July 15, 2025, and his second Japanese EP, Saku, on October 1, 2025. He released his fifth Korean EP, Tough Love, on March 9, 2026. He followed this with the release of his first Japanese single album, Kakera -Unmei no Piece-, on September 16, 2026 and his first Korean single album, Illusion, on October 20, 2026. Onew has also contributed to songwriting for both himself and Shinee.  As an actor, Onew was cast in multiple musicals, such as Rock of Ages (2010), Shinheung Military Academy (2019), and Midnight Sun (2021–2022) and participated in various television dramas, mostly known for the roles of Baek Su in JTBC's sitcom Welcome to Royal Villa and the cardiothoracic resident Lee Chi-hoon in the popular KBS2 drama Descendants of the Sun (2016)."
  },
  "shinee-key": {
      "wikiTitle": "Key (entertainer)",
      "wikiUrl": "https://en.wikipedia.org/wiki/Key_(entertainer)",
      "summary": "Kim Ki-bum (Korean: 김기범; born September 23, 1991), known professionally as Key (키), is a South Korean singer, songwriter and television personality. Born and raised in Daegu, South Korea, he joined SM Entertainment in 2005 after a successful audition. In May 2008, Key debuted as a member of South Korean boy band Shinee, who later went on to become one of the best-selling artists in South Korea. Key is widely recognized as a singer and dancer, but he has also ventured into different careers, notably as a television personality. As a singer, he has collaborated with various artists, and formed the duo Toheart with Woohyun of Infinite. He made his debut as a soloist in November 2018 with the release of the digital single \"Forever Yours\", and his first studio album, Face, was released later that month. Subsequent releases include Bad Love (2021), Gasoline (2022), Good & Great (2023), Pleasure Shop (2024), and Hunter (2025). Key has also contributed to songwriting for himself and Shinee. As an actor, he has been cast in multiple musicals, such as Bonnie & Clyde (2013), Zorro (2014), and Chess (2015), and in television dramas like Drinking Solo (2016) and The Guardians (2017). In 2015, Key became active as a fashion designer and took part in numerous projects. For instance, he collaborated with Bridge Shop House to design Shinee concert outfits, and worked with model Irene Kim and the brand Charm's to design fashion apparel. Due to the success of his works, Key was appointed as a fashion director for the group. Since 2020, he has gained prominence as a television personality, appearing on the variety shows DoReMi Market and I Live Alone as a cast member. He has received the Excellence Award from the MBC Entertainment Awards in recognition of his variety performances."
  },
  "shinee-minho": {
      "wikiTitle": "Choi Min-ho",
      "wikiUrl": "https://en.wikipedia.org/wiki/Choi_Min-ho",
      "summary": "Choi Min-ho (Korean: 최민호; pronounced [tɕʰø.min.ho]; born December 9, 1991), known mononymously as Minho, is a South Korean singer, songwriter, rapper and actor. In May 2008, he debuted as a member of South Korean boy band Shinee which later became one of the best-selling Korean artists. Aside from group activities, he debuted as an actor in November 2010 in KBS2's drama special Pianist. He has since landed roles in television series such as Salamander Guru and The Shadows (2012), To the Beautiful You (2012), Medical Top Team (2013), My First Time (2015), and Hwarang: The Poet Warrior Youth (2016). He made his feature film debut in 2016 with Canola. As a soloist, he has released the digital singles \"I'm Home\" (2019) and \"Heartbreak\" (2021). He released his debut solo EP Chase in 2022."
  },
  "shinee-taemin": {
      "wikiTitle": "Taemin",
      "wikiUrl": "https://en.wikipedia.org/wiki/Taemin",
      "summary": "Lee Tae-min (Korean: 이태민; born July 18, 1993), known mononymously as Taemin, is a South Korean singer and actor. He debuted as a member of the South Korean boy band Shinee in May 2008 and the supergroup SuperM in 2019, both under SM Entertainment, and has subsequently been labeled by media outlets as the \"Idol's Idol\" due to the large number of idols citing him as an inspiration. As an actor, Taemin's first role was as Junsu in the 2009 MBC comedy Hilarious Housewives. Taemin debuted as a soloist in 2014 with the release of his first extended play (EP), Ace. It peaked at number one on the South Korean Gaon Album Chart, and its lead single \"Danger\" reached number five on the Gaon Digital Chart. His first studio album, Press It (2016), also charted at number one on the Gaon Album Chart. Taemin made his solo debut in Japan in July 2016 with the release of his second EP, Sayonara Hitori. His third EP, Flame of Love, was released a year later. In October 2017, Taemin released his second Korean studio album, Move, and the title track gained attention for its distinctive choreography. In 2018, Taemin released his first Japanese studio album, Taemin, and embarked on his first Japanese tour, named Sirius. His third Korean studio album, Never Gonna Dance Again (2020), led by singles \"Criminal\" and \"Idea\", was widely recognized by critics as one of the best K-pop releases of the year. He followed this with the EPs Advice (2021), Guilty (2023), Eternal (2024) and Phase 1: Soft Violence (2026)."
  },
  "shinee-jonghyun": {
      "wikiTitle": "Jonghyun",
      "wikiUrl": "https://en.wikipedia.org/wiki/Jonghyun",
      "summary": "Kim Jong-hyun (Korean: 김종현; April 8, 1990 – December 18, 2017), known mononymously as Jonghyun, was a South Korean singer-songwriter, record producer, radio host, and author under the SM Entertainment label. He was the vocalist of the South Korean boy band Shinee for nine years, releasing twelve albums with the group in both Korean and Japanese. He also participated in SM Entertainment's project group, SM the Ballad, for the release of two EP albums. Jonghyun was also a solo artist, beginning in January 2015 with the release of his first EP album, Base. It peaked at number one on both the Billboard World Albums Chart and the Gaon Album Chart. On September 17 the same year, Jonghyun released a compilation album, Story Op.1. His debut studio album, She Is, was released on May 24, 2016, followed by his second compilation album, Story Op.2, on April 24, 2017. Jonghyun began his first solo concert tour, The Story by Jonghyun, on October 2, 2015. This was followed by three further concert tours in later years. He was regarded as one of the best vocalists in South Korea. He also received praise for his artistic control and involvement in the creation of his music. Jonghyun remained musically active as the vocalist of Shinee and as a solo artist until his death on December 18, 2017, when he died by suicide. His final album, Poet | Artist, was released posthumously on January 23, 2018. It was announced, prior to the release, that all profits from the album would be given to Jonghyun's mother and be used to start a charity foundation. In September 2018, the Shiny Foundation was established by Jonghyun's family to help struggling young artists."
  },
  "exo-suho": {
      "wikiTitle": "Suho",
      "wikiUrl": "https://en.wikipedia.org/wiki/Suho",
      "summary": "Kim Jun-myeon (Korean: 김준면; born May 22, 1991), known professionally as Suho (수호; lit. 'guardian'), is a South Korean singer, songwriter, and actor. He is the leader of the South Korean-Chinese boy group Exo and its sub-unit Exo-K. He debuted as a soloist on March 30, 2020, with the release of his extended play (EP) Self-Portrait. Outside of his musical career, Suho has also starred in various television dramas and movies such as One Way Trip (2016), The Universe's Star (2017), Rich Man (2018), Middle School Girl A (2018), How Are U Bread (2020), Behind Your Touch (2023), and Missing Crown Prince (2024)."
  },
  "exo-xiumin": {
      "wikiTitle": "Xiumin",
      "wikiUrl": "https://en.wikipedia.org/wiki/Xiumin",
      "summary": "Kim Min-seok (Korean: 김민석; born March 26, 1990), known professionally as Xiumin (시우민; pronounced [ɕʰi.u.min]), is a South Korean singer and actor. He is a member of the South Korean-Chinese boy band Exo, its sub-group Exo-M and leader of its sub-unit Exo-CBX. He debuted as a soloist on September 26, 2022, with the extended play (EP) Brand New."
  },
  "exo-lay": {
      "wikiTitle": "Lay Zhang",
      "wikiUrl": "https://en.wikipedia.org/wiki/Lay_Zhang",
      "summary": "Zhang Yixing (born Zhang Jiashuai; (1991-10-07)October 7, 1991), known professionally as Lay Zhang or simply Lay, is a Chinese singer and actor. After participating in the Chinese talent show Star Academy in 2005, he became a member of the South Korean-Chinese boy band Exo and its Chinese sub-unit Exo-M under SM Entertainment in 2012. In 2015, Zhang founded a studio under SM for his solo activities in China. From 2015 to 2018, he was a cast member of the Chinese reality show Go Fighting! In 2016, Zhang released his first extended play (EP), Lose Control. In 2020, Zhang founded the Chromosome Entertainment Group. Zhang's acting credits include films and television shows, notably The Mystic Nine (2016), Kung Fu Yoga (2017), The Island (2018), and No More Bets (2023). Zhang was ranked 20th in the Forbes China Celebrity 100 list in 2017, 11th in 2019, 5th in 2020, and 6th in 2021."
  },
  "exo-baekhyun": {
      "wikiTitle": "Baekhyun",
      "wikiUrl": "https://en.wikipedia.org/wiki/Baekhyun",
      "summary": "Byun Baek-hyun (Korean: 변백현; born May 6, 1992), known mononymously as Baekhyun, is a South Korean singer and actor. He is a member of the South Korean-Chinese boy band Exo, its subgroup Exo-K and its subunit Exo-CBX. In 2019, Baekhyun became a leader of the supergroup SuperM. Following the release of several albums and extended plays with Exo, Baekhyun began pursuing a solo career in 2019 by releasing his debut extended play, City Lights, which sold more than half-a-million copies in 2019 and is the best-selling album by a solo artist of the 2010s in South Korea. City Lights was followed by two million-selling EPs, Delight (2020), the first album by a solo artist in South Korea to have sold over 1 million copies in 19 years, and Bambi (2021). He has been labeled as the \"Genius Idol\", and won three consecutive Mnet Asian Music Awards for Best Male Artist from 2019 to 2021."
  },
  "exo-chen": {
      "wikiTitle": "Chen (singer)",
      "wikiUrl": "https://en.wikipedia.org/wiki/Chen_(singer)",
      "summary": "Kim Jong-dae (Korean: 김종대; born September 21, 1992), known professionally as Chen (첸), is a South Korean singer and songwriter. He is a member of the South Korean boy band Exo, its subgroup Exo-M and its subunit Exo-CBX, and participated in SM's projects SM the Ballad. He is predominantly known for his role as the vocalist of Exo. Apart from his group's activities, Chen has also recorded songs for various television dramas, most notably \"Best Luck\" for It's Okay, That's Love (2014) and \"Everytime\" for Descendants of the Sun (2016). In 2019, Chen debuted as a solo singer with the extended play (EP) April, and a Flower, which peaked at number two on South Korea's Gaon Album Chart and spawned the hit single \"Beautiful Goodbye\". Continuing the success, his second EP, Dear My Dear, accompanied by the single \"Shall We?\" was released later that same year."
  },
  "exo-chanyeol": {
      "wikiTitle": "Chanyeol",
      "wikiUrl": "https://en.wikipedia.org/wiki/Chanyeol",
      "summary": "Park Chan-yeol (Korean: 박찬열; born November 27, 1992), better known mononymously as Chanyeol, is a South Korean rapper,  singer, songwriter, producer, and actor. He is a member of the South Korean-Chinese boy group Exo, its sub-group Exo-K and sub-unit Exo-SC, and debuted as soloist on August 28, 2024, with his first extended play (EP) Black Out. Apart from his group's activities, Chanyeol has also starred in various television dramas and movies such as So I Married an Anti-fan (2016), and Secret Queen Makers (2018)."
  },
  "exo-do": {
      "wikiTitle": "Doh Kyung-soo",
      "wikiUrl": "https://en.wikipedia.org/wiki/Doh_Kyung-soo",
      "summary": "Doh Kyung-soo (Korean: 도경수; born January 12, 1993), also known as D.O. (디오), is a South Korean singer and actor. He is a member of the South Korean boy band Exo. He debuted as a soloist on July 26, 2021, with his first extended play (EP) Empathy. He has since released three more EPs, Expectation (2023), Blossom (2024), and Dopamine (2026), as well as a studio album, Bliss (2025). As an actor, Doh has starred in various television dramas and movies such as It's Okay, That's Love (2014), My Annoying Brother (2016), Along with the Gods: The Two Worlds (2017), 100 Days My Prince (2018), Swing Kids (2018), Bad Prosecutor (2022), and The Manipulated (2025). In recognition of his acting, he was selected by the Korean Film Council as one of the 200 Korean actors that best represent the present and future of Korea's movie scene."
  },
  "exo-kai": {
      "wikiTitle": "Kai (entertainer, born 1994)",
      "wikiUrl": "https://en.wikipedia.org/wiki/Kai_(entertainer%2C_born_1994)",
      "summary": "Kim Jong-in (Korean: 김종인; born January 14, 1994), known professionally as Kai (카이), is a South Korean singer and actor. He is a member of the South Korean boy band Exo and South Korean supergroup SuperM. He debuted as a soloist on November 30, 2020, with his first extended play (EP) Kai and has since released three more EPs, Peaches, Rover and Wait On Me. He is recognized for his dancing in South Korea and K-pop. Apart from his musical career, Kai has also starred in various television dramas such as Andante (2017), Spring Has Come (2018) and The Miracle We Met (2018). He has also been a host and cast member for various television and web variety shows such as Changing Majors. Kai is regarded by various publications as a fashion icon and has been a brand ambassador, muse and model for several brands, such as Gucci, Yves Saint Laurent Beauty, Lacoste, and others."
  },
  "exo-sehun": {
      "wikiTitle": "Sehun",
      "wikiUrl": "https://en.wikipedia.org/wiki/Sehun",
      "summary": "Oh Se-hun (Korean: 오세훈; born April 12, 1994), known mononymously as Sehun, is a South Korean rapper, singer, songwriter, actor and dancer. He is a member of the South Korean-Chinese boy band Exo and its sub-unit Exo-SC. Apart from his group's activities, Sehun has also starred in various films and television dramas such as Dokgo Rewind (2018), Secret Queen Makers (2018), The Pirates: The Last Royal Treasure (2022), and All That We Loved (2023)."
  },
  "trs-hyunsuk": {
      "wikiTitle": "Choi Hyun-suk",
      "wikiUrl": "https://en.wikipedia.org/wiki/Choi_Hyun-suk",
      "summary": "Choi Hyun-suk (Korean: 최현석; born April 21, 1999) is a South Korean rapper, singer and dancer under YG Entertainment. As a member of boy band Treasure, Choi debuted on August 7, 2020, with the single album entitled The First Step: Chapter One. He is also known for his television appearance as a contestant on Mix Nine (2017–2018)."
  },
  "nctd-mark": {
      "wikiTitle": "Mark (rapper)",
      "wikiUrl": "https://en.wikipedia.org/wiki/Mark_(rapper)",
      "summary": "Mark Lee (born August 2, 1999) is a Canadian singer and rapper. He is a former member of the South Korean boy band NCT and its fixed sub-units NCT 127 and NCT Dream, as well as the supergroup SuperM. Mark made his solo debut on April 7, 2025, with his first studio album The Firstfruit. On April 3, 2026, Mark departed from NCT and SM Entertainment following the expiration of his contract on April 8. On June 3, he announced his new label, Upper Room."
  },
  "meovv-ella": {
      "wikiTitle": "Ella Gross",
      "wikiUrl": "https://en.wikipedia.org/wiki/Ella_Gross",
      "summary": "Ella McKenzie Gross ( German: [ɡʁoːs]; born December 1, 2008), also known mononymously as Ella, is an American singer, model, and actress based in South Korea. She first began her career as a model at age two and has modeled for fashion brands such as H&M, Levi's, and GAP. As a singer, she debuted as a member of the South Korean girl group Meovv in September 2024, under The Black Label."
  }
};
