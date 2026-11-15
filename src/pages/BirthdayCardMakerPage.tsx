import { useEffect, useMemo, useState } from 'react';
import { Download } from 'lucide-react';
import { KPOP_IDOLS } from '../data/kpopData';
import { calculateIdolAge } from '../lib/dateKst';
import { downloadDataUrl, renderShareCardDataUrl } from '../lib/shareCard';
import { useOrbit } from '../context/OrbitContext';

const CARD_THEMES = [
  { id: 'orbit', label: 'Midnight Orbit', accent: '#8B5CF6', secondary: '#FF4DA6' },
  { id: 'rose', label: 'Velvet Rose', accent: '#EC4899', secondary: '#F472B6' },
  { id: 'prism', label: 'Hologram Prism', accent: '#6366F1', secondary: '#38BDF8' },
  { id: 'plum', label: 'Royal Plum', accent: '#A855F7', secondary: '#F59E0B' },
];

export function BirthdayCardMakerPage() {
  const { showToast } = useOrbit();
  const [selectedIdolId, setSelectedIdolId] = useState(KPOP_IDOLS[0].id);
  const [themeId, setThemeId] = useState('orbit');
  const [customTitle, setCustomTitle] = useState('Happy Birthday!');
  const [fanMessage, setFanMessage] = useState(
    'Thank you for every song, stage, and bright memory this year. Wishing you endless health and happiness!'
  );
  const [fanHandle, setFanHandle] = useState('@idolorbit_fan');
  const [squareMode, setSquareMode] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const idParam = params.get('idol');
    if (idParam && KPOP_IDOLS.some((i) => i.id === idParam)) {
      setSelectedIdolId(idParam);
    }
  }, []);

  const idol = KPOP_IDOLS.find((i) => i.id === selectedIdolId) || KPOP_IDOLS[0];
  const age = calculateIdolAge(idol.birthday);
  const theme = CARD_THEMES.find((t) => t.id === themeId) || CARD_THEMES[0];

  const cardDataUrl = useMemo(() => {
    return renderShareCardDataUrl({
      kicker: `Happy Birthday · ${idol.groupName}`,
      headline: `${customTitle || 'Happy Birthday'} ${idol.stageName} ${idol.representativeEmoji}`,
      subheadline: `${idol.fullName} · ${idol.birthday}`,
      description: fanMessage,
      stats: [
        { label: 'Turning', value: `${age.isBirthdayToday ? age.years : age.turningAge} yrs` },
        { label: 'Zodiac', value: idol.zodiac },
      ],
      accentHex: theme.accent,
      secondaryHex: theme.secondary,
      footerLabel: `Crafted with love by ${fanHandle || 'a devoted fan'} · IdolOrbit`,
      square: squareMode,
    });
  }, [idol, customTitle, fanMessage, fanHandle, age, theme, squareMode]);

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      <div className="space-y-2">
        <p className="text-xs font-semibold text-pink-300">
          Canvas Studio · 1080×1920 &amp; 1080×1080 Export
        </p>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
          Birthday Card Maker
        </h1>
        <p className="text-sm text-violet-200/80">
          Design a custom tribute card for any verified idol and export a high-resolution PNG ready for Stories or posts.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Controls */}
        <div className="lg:col-span-7 rounded-3xl bg-[#201148] border border-violet-300/20 p-5 sm:p-7 space-y-5">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-violet-200">Select Idol</label>
            <select
              value={selectedIdolId}
              onChange={(e) => setSelectedIdolId(e.target.value)}
              className="w-full min-h-[46px] px-3.5 py-2 rounded-xl bg-[#170B35] border border-violet-300/20 text-sm text-white"
            >
              {KPOP_IDOLS.map((i) => (
                <option key={i.id} value={i.id}>
                  {i.stageName} ({i.groupName}) · {i.birthday}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-semibold text-violet-200">Card Theme</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {CARD_THEMES.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setThemeId(t.id)}
                  className={`min-h-[44px] px-3 py-2 rounded-xl text-xs font-semibold border transition-colors ${
                    themeId === t.id
                      ? 'bg-white text-[#170B35] border-white'
                      : 'bg-[#170B35] text-violet-200 border-violet-300/20'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-violet-200">Greeting Headline</label>
              <input
                type="text"
                maxLength={32}
                value={customTitle}
                onChange={(e) => setCustomTitle(e.target.value)}
                className="w-full min-h-[44px] px-3.5 py-2 rounded-xl bg-[#170B35] border border-violet-300/20 text-sm text-white"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-violet-200">Your Fan Signature</label>
              <input
                type="text"
                maxLength={32}
                value={fanHandle}
                onChange={(e) => setFanHandle(e.target.value)}
                className="w-full min-h-[44px] px-3.5 py-2 rounded-xl bg-[#170B35] border border-violet-300/20 text-sm text-white"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-violet-200">Fan Message</label>
            <textarea
              rows={3}
              maxLength={200}
              value={fanMessage}
              onChange={(e) => setFanMessage(e.target.value)}
              className="w-full p-3.5 rounded-xl bg-[#170B35] border border-violet-300/20 text-sm text-white"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#170B35] border border-violet-300/15">
              <button
                type="button"
                onClick={() => setSquareMode(false)}
                className={`min-h-[38px] px-3 py-1.5 rounded-lg text-xs font-semibold ${
                  !squareMode ? 'bg-violet-500 text-white' : 'text-violet-200'
                }`}
              >
                1080×1920 Story
              </button>
              <button
                type="button"
                onClick={() => setSquareMode(true)}
                className={`min-h-[38px] px-3 py-1.5 rounded-lg text-xs font-semibold ${
                  squareMode ? 'bg-violet-500 text-white' : 'text-violet-200'
                }`}
              >
                1080×1080 Square
              </button>
            </div>

            <button
              type="button"
              onClick={() => {
                if (cardDataUrl) {
                  downloadDataUrl(
                    cardDataUrl,
                    `birthday-card-${idol.id}-${squareMode ? '1080x1080' : '1080x1920'}.png`
                  );
                  showToast('Birthday card PNG downloaded', 'success');
                }
              }}
              className="min-h-[48px] px-6 py-3 rounded-2xl bg-gradient-to-r from-[#8B5CF6] to-[#FF4DA6] text-white text-sm font-semibold flex items-center gap-2 shadow-lg shadow-pink-500/20"
            >
              <Download className="w-4 h-4" />
              <span>Download Card PNG</span>
            </button>
          </div>
        </div>

        {/* Live Canvas Preview */}
        <div className="lg:col-span-5 flex justify-center">
          <div
            className={`w-full max-w-[300px] ${
              squareMode ? 'aspect-square' : 'aspect-[9/16]'
            } rounded-3xl overflow-hidden border border-violet-300/25 shadow-2xl shadow-purple-950/70 bg-[#12082A]`}
          >
            {cardDataUrl && (
              <img
                src={cardDataUrl}
                alt={`Birthday card preview for ${idol.stageName}`}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
