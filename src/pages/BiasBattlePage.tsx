import { useState } from 'react';
import { Crown, RotateCcw, Swords } from 'lucide-react';
import { KPOP_IDOLS } from '../data/kpopData';
import { Idol } from '../types/kpop';
import { useOrbit } from '../context/OrbitContext';
import { IdolAvatarBadge } from '../components/IdolAvatarBadge';
import { ShareResultPanel } from '../components/ShareResultPanel';

type BracketPreset = 'all-16' | 'all-8' | '3rd-gen' | '4th-5th-gen';

function buildEntrants(preset: BracketPreset): Idol[] {
  let pool = KPOP_IDOLS;
  if (preset === '3rd-gen') {
    pool = KPOP_IDOLS.filter((i) => ['bts', 'blackpink', 'twice', 'seventeen'].includes(i.groupId));
  } else if (preset === '4th-5th-gen') {
    pool = KPOP_IDOLS.filter((i) => !['bts', 'blackpink', 'twice', 'seventeen'].includes(i.groupId));
  }
  const size = preset === 'all-8' ? 8 : 16;
  // Deterministic balanced mix across groups
  const picked: Idol[] = [];
  let stride = 0;
  while (picked.length < size && stride < pool.length * 3) {
    const candidate = pool[(stride * 5) % pool.length];
    if (!picked.some((p) => p.id === candidate.id)) {
      picked.push(candidate);
    }
    stride += 1;
  }
  return picked;
}

export function BiasBattlePage() {
  const { recordQuizResult } = useOrbit();
  const [preset, setPreset] = useState<BracketPreset>('all-8');
  const [roundEntrants, setRoundEntrants] = useState<Idol[]>(() => buildEntrants('all-8'));
  const [nextRoundWinners, setNextRoundWinners] = useState<Idol[]>([]);
  const [pairIndex, setPairIndex] = useState(0);
  const [champion, setChampion] = useState<Idol | null>(null);

  const startBracket = (nextPreset: BracketPreset) => {
    setPreset(nextPreset);
    setRoundEntrants(buildEntrants(nextPreset));
    setNextRoundWinners([]);
    setPairIndex(0);
    setChampion(null);
  };

  const left = roundEntrants[pairIndex * 2];
  const right = roundEntrants[pairIndex * 2 + 1];

  const roundLabel =
    roundEntrants.length === 2
      ? 'Grand Final'
      : roundEntrants.length === 4
        ? 'Semifinals'
        : roundEntrants.length === 8
          ? 'Quarterfinals'
          : 'Round of 16';

  const handlePick = async (winner: Idol) => {
    const updatedWinners = [...nextRoundWinners, winner];
    const totalPairs = Math.floor(roundEntrants.length / 2);

    if (pairIndex + 1 < totalPairs) {
      setNextRoundWinners(updatedWinners);
      setPairIndex((p) => p + 1);
      return;
    }

    if (updatedWinners.length === 1) {
      setChampion(updatedWinners[0]);
      await recordQuizResult({
        quizSlug: 'bias-battle',
        quizTitle: 'Bias Battle Bracket',
        archetypeTitle: `${updatedWinners[0].stageName} (${updatedWinners[0].groupName})`,
        summary: `Crowned ${updatedWinners[0].stageName} as your Bias Battle Tournament Champion.`,
        score: 100,
        maxScore: 100,
      });
      return;
    }

    setRoundEntrants(updatedWinners);
    setNextRoundWinners([]);
    setPairIndex(0);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      <div className="space-y-2">
        <p className="text-xs font-semibold text-pink-300">
          Friendly Elimination Tournament · Head-to-Head Rounds
        </p>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
          Bias Battle
        </h1>
      </div>

      {/* Bracket Preset Selector */}
      <div className="flex flex-wrap items-center gap-2">
        {[
          { id: 'all-8', label: '8-Idol Mix' },
          { id: 'all-16', label: '16-Idol Mix' },
          { id: '3rd-gen', label: '3rd Gen Icons (16)' },
          { id: '4th-5th-gen', label: '4th & 5th Gen (16)' },
        ].map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => startBracket(p.id as BracketPreset)}
            className={`min-h-[40px] px-4 py-2 rounded-xl text-xs font-semibold border transition-colors ${
              preset === p.id
                ? 'bg-white text-[#170B35] border-white'
                : 'bg-[#201148] text-violet-200 border-violet-300/20'
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {!champion && left && right ? (
        <div className="rounded-3xl bg-[#201148] border border-violet-300/20 p-5 sm:p-8 space-y-6">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-pink-300 flex items-center gap-1.5">
              <Swords className="w-4 h-4" />
              <span>{roundLabel}</span>
            </span>
            <span className="font-mono text-violet-200 tabular-nums">
              Match {pairIndex + 1} of {Math.floor(roundEntrants.length / 2)}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[left, right].map((contender) => (
              <button
                key={contender.id}
                type="button"
                onClick={() => handlePick(contender)}
                className="p-6 rounded-3xl bg-[#170B35]/85 hover:bg-[#281659] border border-violet-300/20 hover:border-[#FF4DA6] text-left flex flex-col items-center text-center gap-4 transition-all group active:scale-[0.98]"
              >
                <IdolAvatarBadge idol={contender} size="lg" />
                <div>
                  <h2 className="font-display text-2xl font-extrabold text-white group-hover:text-pink-200">
                    {contender.stageName}
                  </h2>
                  <p className="text-sm font-medium text-violet-200 mt-0.5">
                    {contender.groupName}
                  </p>
                  <p className="text-xs text-violet-300/70 mt-1">
                    {contender.positions.join(' · ')}
                  </p>
                </div>
                <span className="min-h-[40px] px-5 py-2 rounded-xl bg-white/10 group-hover:bg-gradient-to-r group-hover:from-[#8B5CF6] group-hover:to-[#FF4DA6] text-xs font-semibold text-white transition-all">
                  Advance {contender.stageName}
                </span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        champion && (
          <div className="space-y-6">
            <div className="rounded-3xl bg-[#201148] border border-pink-400/40 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <IdolAvatarBadge idol={champion} size="lg" />
                <div>
                  <p className="text-xs font-semibold text-pink-300 flex items-center gap-1.5">
                    <Crown className="w-4 h-4" />
                    <span>Bias Battle Champion</span>
                  </p>
                  <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white mt-0.5">
                    {champion.stageName}
                  </h2>
                  <p className="text-sm text-violet-200">{champion.groupName}</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => startBracket(preset)}
                className="min-h-[44px] px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-semibold text-white flex items-center gap-1.5 self-start sm:self-auto"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Run New Bracket</span>
              </button>
            </div>

            <ShareResultPanel
              cardPayload={{
                kicker: 'Bias Battle Champion',
                headline: champion.stageName,
                subheadline: `${champion.groupName} · Bracket Winner`,
                description: champion.funFact,
                stats: [
                  { label: 'Group', value: champion.groupName },
                  { label: 'Bracket', value: preset.toUpperCase() },
                ],
              }}
              sharePath="/quiz/bias-battle"
              shareText={`I crowned ${champion.stageName} (${champion.groupName}) as my Bias Battle Champion on IdolOrbit Fan Lab!`}
              filename={`idolorbit-bias-battle-${champion.id}.png`}
              challengeParam={champion.stageName}
            />
          </div>
        )
      )}
    </div>
  );
}
