import { useMemo, useState } from 'react';
import { ArrowRight, CheckCircle2, Eye, RotateCcw, XCircle } from 'lucide-react';
import { KPOP_GROUPS, KPOP_IDOLS } from '../data/kpopData';
import { Idol } from '../types/kpop';
import { useOrbit } from '../context/OrbitContext';
import { ShareResultPanel } from '../components/ShareResultPanel';
import { getIdolPhotoUrl } from '../data/realPhotos';

interface GuessRound {
  target: Idol;
  options: Idol[];
}

function buildRounds(groupId: string, seedOffset: number): GuessRound[] {
  const pool = groupId === 'all' ? KPOP_IDOLS : KPOP_IDOLS.filter((i) => i.groupId === groupId);
  const source = pool.length >= 4 ? pool : KPOP_IDOLS;
  const rotated = [...source]
    .sort((a, b) => {
      const ha = (a.id.charCodeAt(0) * 31 + seedOffset * 17 + a.birthday.charCodeAt(9)) % 97;
      const hb = (b.id.charCodeAt(0) * 31 + seedOffset * 17 + b.birthday.charCodeAt(9)) % 97;
      return ha - hb;
    })
    .slice(0, Math.min(8, source.length));

  return rotated.map((target, rIdx) => {
    const distractors = KPOP_IDOLS.filter((i) => i.id !== target.id)
      .sort((a, b) => {
        const sameGroupA = a.groupId === target.groupId ? -20 : 0;
        const sameGroupB = b.groupId === target.groupId ? -20 : 0;
        const scoreA = sameGroupA + ((a.stageName.charCodeAt(0) + rIdx * 7) % 19);
        const scoreB = sameGroupB + ((b.stageName.charCodeAt(0) + rIdx * 7) % 19);
        return scoreA - scoreB;
      })
      .slice(0, 3);
    const options = [target, ...distractors].sort((a, b) =>
      a.stageName.localeCompare(b.stageName)
    );
    return { target, options };
  });
}

export function GuessIdolPage() {
  const { recordQuizResult } = useOrbit();
  const [groupFilter, setGroupFilter] = useState('all');
  const [seed, setSeed] = useState(1);
  const [roundIdx, setRoundIdx] = useState(0);
  const [cluesRevealed, setCluesRevealed] = useState(1);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [completed, setCompleted] = useState(false);

  const rounds = useMemo(() => buildRounds(groupFilter, seed), [groupFilter, seed]);
  const current = rounds[roundIdx];
  const groupInfo = current ? KPOP_GROUPS.find((g) => g.id === current.target.groupId) : undefined;

  const handleAnswer = (idolId: string) => {
    if (selectedId || !current) return;
    setSelectedId(idolId);
    if (idolId === current.target.id) {
      const pts = cluesRevealed === 1 ? 100 : cluesRevealed === 2 ? 75 : 50;
      setScore((s) => s + pts);
      setStreak((st) => {
        const next = st + 1;
        setBestStreak((b) => Math.max(b, next));
        return next;
      });
    } else {
      setStreak(0);
    }
  };

  const handleNext = async () => {
    if (roundIdx < rounds.length - 1) {
      setRoundIdx((r) => r + 1);
      setCluesRevealed(1);
      setSelectedId(null);
      return;
    }
    setCompleted(true);
    await recordQuizResult({
      quizSlug: 'guess-idol',
      quizTitle: 'Guess the Idol',
      archetypeTitle: `${score} Points (${bestStreak}x Streak)`,
      summary: `Identified idols using verified debut, position, and stage silhouette clues.`,
      score,
      maxScore: rounds.length * 100,
    });
  };

  const resetGame = (nextGroup = groupFilter) => {
    setGroupFilter(nextGroup);
    setSeed((s) => s + 1);
    setRoundIdx(0);
    setCluesRevealed(1);
    setSelectedId(null);
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setCompleted(false);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      <div className="space-y-2">
        <p className="text-xs font-semibold text-pink-300">
          Stage Silhouette · Verified Clues · Streak Multiplier
        </p>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
          Guess the Idol
        </h1>
      </div>

      {/* Group selector */}
      {!completed && (
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          <button
            type="button"
            onClick={() => resetGame('all')}
            className={`min-h-[38px] px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap shrink-0 border ${
              groupFilter === 'all'
                ? 'bg-white text-[#170B35] border-white'
                : 'bg-[#201148] text-violet-200 border-violet-300/20'
            }`}
          >
            All Fandoms
          </button>
          {KPOP_GROUPS.map((g) => (
            <button
              key={g.id}
              type="button"
              onClick={() => resetGame(g.id)}
              className={`min-h-[38px] px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap shrink-0 border ${
                groupFilter === g.id
                  ? 'bg-white text-[#170B35] border-white'
                  : 'bg-[#201148] text-violet-200 border-violet-300/20'
              }`}
            >
              {g.name}
            </button>
          ))}
        </div>
      )}

      {!completed && current ? (
        <div className="rounded-3xl bg-[#201148] border border-violet-300/20 p-5 sm:p-8 space-y-6">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-violet-200">
              Round {roundIdx + 1} / {rounds.length}
            </span>
            <span className="font-mono text-pink-300 tabular-nums">
              {score} pts · Streak {streak}x
            </span>
          </div>

          {/* Stage Silhouette Spotlight Card */}
          <div
            className="rounded-2xl p-6 border border-white/15 flex flex-col sm:flex-row items-center gap-6"
            style={{
              background: `linear-gradient(135deg, ${groupInfo?.accentHex ?? '#8B5CF6'}33 0%, #170B35 100%)`,
            }}
          >
            <div className="w-32 h-32 rounded-2xl bg-[#170B35]/90 border border-violet-300/25 flex flex-col items-center justify-center shrink-0 relative overflow-hidden">
              {getIdolPhotoUrl(current.target.id, current.target.photoUrl) ? (
                <img
                  src={getIdolPhotoUrl(current.target.id, current.target.photoUrl)}
                  alt={selectedId ? `${current.target.stageName} of ${current.target.groupName}` : 'Mystery K-pop idol clue'}
                  referrerPolicy="no-referrer"
                  className={`w-full h-full object-cover object-top transition-all duration-300 ${
                    selectedId
                      ? 'blur-0 scale-100 brightness-100'
                      : cluesRevealed === 1
                        ? 'blur-lg scale-110 brightness-75'
                        : cluesRevealed === 2
                          ? 'blur-sm scale-105 brightness-90'
                          : 'blur-[2px] scale-100 brightness-95'
                  }`}
                />
              ) : (
                <svg viewBox="0 0 80 80" className="w-20 h-20 text-violet-300/70" fill="currentColor" aria-hidden="true">
                  <circle cx="40" cy="26" r="14" />
                  <path d="M16 70c0-14 11-24 24-24s24 10 24 24H16z" />
                </svg>
              )}
              <span className="absolute bottom-1.5 right-2 text-lg drop-shadow">
                {selectedId ? current.target.representativeEmoji : '?'}
              </span>
            </div>

            <div className="space-y-2.5 flex-1 w-full">
              <div className="p-3 rounded-xl bg-[#170B35]/75 border border-violet-300/15">
                <p className="text-[11px] font-semibold text-pink-300">Clue 1 (100 pts)</p>
                <p className="text-sm text-white mt-0.5">
                  Group: <span className="font-semibold">{current.target.groupName}</span> · Debuted{' '}
                  {groupInfo?.debutDate.slice(0, 4)} ({groupInfo?.agency})
                </p>
              </div>

              {cluesRevealed >= 2 && (
                <div className="p-3 rounded-xl bg-[#170B35]/75 border border-violet-300/15">
                  <p className="text-[11px] font-semibold text-pink-300">Clue 2 (75 pts)</p>
                  <p className="text-sm text-white mt-0.5">
                    {current.target.positions.join(' · ')} · Birthday {current.target.birthday.slice(5)} ·{' '}
                    {current.target.nationality}
                  </p>
                </div>
              )}

              {cluesRevealed >= 3 && (
                <div className="p-3 rounded-xl bg-[#170B35]/75 border border-violet-300/15">
                  <p className="text-[11px] font-semibold text-pink-300">Clue 3 (50 pts)</p>
                  <p className="text-sm text-white mt-0.5">
                    Emoji {current.target.representativeEmoji} · {current.target.funFact}
                  </p>
                </div>
              )}

              {!selectedId && cluesRevealed < 3 && (
                <button
                  type="button"
                  onClick={() => setCluesRevealed((c) => Math.min(3, c + 1))}
                  className="min-h-[38px] px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-semibold text-violet-100 inline-flex items-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Reveal Next Clue</span>
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {current.options.map((opt) => {
              const isSelected = selectedId === opt.id;
              const isCorrect = opt.id === current.target.id;
              let style = 'bg-[#170B35]/80 hover:bg-[#281659] border-violet-300/18 text-white';
              if (selectedId) {
                if (isCorrect) style = 'bg-emerald-500/20 border-emerald-400 text-white';
                else if (isSelected) style = 'bg-rose-500/20 border-rose-400 text-white';
                else style = 'bg-[#170B35]/40 border-violet-300/10 text-violet-300/60';
              }
              return (
                <button
                  key={opt.id}
                  type="button"
                  disabled={Boolean(selectedId)}
                  onClick={() => handleAnswer(opt.id)}
                  className={`min-h-[54px] p-4 rounded-2xl border text-left flex items-center justify-between gap-2 transition-all ${style}`}
                >
                  <div>
                    <p className="font-display font-bold text-base">{opt.stageName}</p>
                    <p className="text-xs text-violet-200/75">{opt.groupName}</p>
                  </div>
                  {selectedId && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
                  {selectedId && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-400" />}
                </button>
              );
            })}
          </div>

          {selectedId && (
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleNext}
                className="min-h-[46px] px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#FF4DA6] text-white text-sm font-semibold flex items-center gap-2"
              >
                <span>{roundIdx === rounds.length - 1 ? 'View Final Score' : 'Next Idol'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          <div className="rounded-3xl bg-[#201148] border border-violet-300/25 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold text-pink-300">Challenge Complete</p>
              <h2 className="font-display text-3xl font-extrabold text-white mt-1">
                {score} / {rounds.length * 100} Points
              </h2>
              <p className="text-sm text-violet-200 mt-1">Best Streak: {bestStreak}x</p>
            </div>
            <button
              type="button"
              onClick={() => resetGame(groupFilter)}
              className="min-h-[44px] px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-semibold text-white flex items-center gap-1.5 self-start sm:self-auto"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Play New Round</span>
            </button>
          </div>

          <ShareResultPanel
            cardPayload={{
              kicker: 'Guess the Idol Challenge',
              headline: `${score} Points`,
              subheadline: `Best Streak: ${bestStreak} in a row`,
              description: 'Identified K-pop idols from verified stage silhouette, debut year, and position clues.',
              stats: [
                { label: 'Score', value: `${score}` },
                { label: 'Best Streak', value: `${bestStreak}x` },
              ],
            }}
            sharePath="/quiz/guess-idol"
            shareText={`I scored ${score} points (${bestStreak}x streak) on IdolOrbit Guess the Idol!`}
            filename="idolorbit-guess-the-idol.png"
            challengeParam={`${score}pts`}
          />
        </div>
      )}
    </div>
  );
}
