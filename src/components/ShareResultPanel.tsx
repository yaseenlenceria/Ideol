import { useMemo, useState } from 'react';
import { Check, Copy, Download, Share2, Swords } from 'lucide-react';
import { buildShareUrls, downloadDataUrl, renderShareCardDataUrl, ShareCardPayload } from '../lib/shareCard';
import { useOrbit } from '../context/OrbitContext';

interface ShareResultPanelProps {
  cardPayload: ShareCardPayload;
  sharePath: string;
  shareText: string;
  filename: string;
  challengeParam?: string;
}

export function ShareResultPanel({
  cardPayload,
  sharePath,
  shareText,
  filename,
  challengeParam,
}: ShareResultPanelProps) {
  const { showToast } = useOrbit();
  const [copied, setCopied] = useState(false);

  const storyDataUrl = useMemo(() => renderShareCardDataUrl({ ...cardPayload, square: false }), [cardPayload]);

  const baseShareUrl = `${window.location.origin}${sharePath}`;
  const challengeUrl = challengeParam
    ? `${baseShareUrl}?challenge=${encodeURIComponent(challengeParam)}`
    : baseShareUrl;
  const socialLinks = buildShareUrls(challengeUrl, shareText);

  const handleCopy = async (urlToCopy: string, label: string) => {
    try {
      await navigator.clipboard.writeText(urlToCopy);
      setCopied(true);
      showToast(label, 'success');
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      showToast('Copy not permitted in this browser context', 'error');
    }
  };

  return (
    <div className="rounded-3xl bg-[#201148]/90 border border-violet-300/18 p-5 md:p-6">
      <div className="flex flex-col lg:flex-row gap-6 items-center">
        {/* 1080x1920 Preview Thumbnail */}
        <div className="w-44 sm:w-48 shrink-0 aspect-[9/16] rounded-2xl overflow-hidden border border-violet-300/25 shadow-xl shadow-purple-950/60 bg-[#12082A]">
          {storyDataUrl ? (
            <img
              src={storyDataUrl}
              alt={`${cardPayload.headline} 1080x1920 shareable card preview`}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-xs text-violet-300 p-4 text-center">
              Preview ready
            </div>
          )}
        </div>

        {/* Share Controls */}
        <div className="flex-1 w-full space-y-4">
          <div>
            <p className="text-xs font-semibold text-pink-300 tracking-wide">Viral Result Card · 1080×1920</p>
            <h3 className="font-display text-xl font-bold text-white mt-1">
              Download &amp; Challenge Friends
            </h3>
            <p className="text-sm text-violet-200/80 mt-1">
              Export a crisp Story-sized PNG card or send a challenge link to see how your friends score.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => {
                if (storyDataUrl) {
                  downloadDataUrl(storyDataUrl, filename);
                  showToast('1080×1920 result card downloaded', 'success');
                }
              }}
              className="min-h-[48px] px-5 py-3 rounded-2xl bg-gradient-to-r from-[#8B5CF6] to-[#FF4DA6] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-pink-500/20 hover:brightness-110 active:scale-[0.98] transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Download 1080×1920</span>
            </button>

            <button
              type="button"
              onClick={() => handleCopy(challengeUrl, 'Challenge link copied to clipboard')}
              className="min-h-[48px] px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/15 border border-violet-300/25 text-white font-semibold text-sm flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
            >
              <Swords className="w-4 h-4 text-pink-300" />
              <span>Challenge a Friend</span>
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 pt-1">
            <button
              type="button"
              onClick={() => handleCopy(baseShareUrl, 'Link copied to clipboard')}
              className="min-h-[44px] px-4 py-2 rounded-xl bg-white/6 hover:bg-white/12 border border-violet-300/15 text-xs font-semibold text-violet-100 flex items-center gap-1.5 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Link'}</span>
            </button>

            <a
              href={socialLinks.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[44px] px-4 py-2 rounded-xl bg-white/6 hover:bg-white/12 border border-violet-300/15 text-xs font-semibold text-violet-100 flex items-center gap-1.5 transition-colors"
            >
              <Share2 className="w-3.5 h-3.5 text-emerald-300" />
              <span>WhatsApp</span>
            </a>

            <a
              href={socialLinks.x}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[44px] px-4 py-2 rounded-xl bg-white/6 hover:bg-white/12 border border-violet-300/15 text-xs font-semibold text-violet-100 flex items-center gap-1.5 transition-colors"
            >
              <Share2 className="w-3.5 h-3.5 text-sky-300" />
              <span>Share on X</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
