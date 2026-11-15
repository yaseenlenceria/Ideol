import { useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, RotateCcw, Sparkles } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { KPOP_GROUPS, KPOP_IDOLS } from '../data/kpopData';
import {
  BIAS_MATCH_QUESTIONS,
  matchIdolByVibe,
  SOULMATE_SCENARIO_QUESTIONS,
} from '../data/quizContent';
import { useOrbit } from '../context/OrbitContext';
import { IdolAvatarBadge } from '../components/IdolAvatarBadge';
import { ShareResultPanel } from '../components/ShareResultPanel';

interface VibeQuizPageProps {
  mode: 'bias-match' | 'soulmate';
}

export function VibeQuizPage({ mode }: VibeQuizPageProps) {
  const { recordQuizResult, showToast } = useOrbit();
  const isSoulmate = mode === 'soulmate';
  const questions = isSoulmate ? SOULMATE_SCENARIO_QUESTIONS : BIAS_MATCH_QUESTIONS;

  const [groupId, setGroupId] = useState<string>('all');
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [completed, setCompleted] = useState(false);

  const pool = useMemo(() => {
    if (groupId === 'all') return KPOP_IDOLS;
    const filtered = KPOP_IDOLS.filter((i) => i.groupId === groupId);
    return filtered.length > 0 ? filtered : KPOP_IDOLS;
  }, [groupId]);

  const currentQuestion = questions[step];
  const selectedId = currentQuestion ? answers[currentQuestion.id] : undefined;

  const result = useMemo(() => {
    if (!completed) return null;
    return matchIdolByVibe(questions, answers, pool);
  }, [completed, questions, answers, pool]);

  const handleNext = async () => {
    if (!selectedId) {
      showToast('Select an option to continue', 'default');
      return;
    }
    if (step < questions.length - 1) {
      setStep((s) => s + 1);
      return;
    }
    const computed = matchIdolByVibe(questions, answers, pool);
    setCompleted(true);
    await recordQuizResult({
      quizSlug: isSoulmate ? 'soulmate' : 'bias-match',
      quizTitle: isSoulmate ? 'K-pop Soulmate Quiz' : 'Bias Match Quiz',
      archetypeTitle: `${computed.bestMatch.stageName} (${computed.bestMatch.groupName})`,
      summary: `${computed.compatibilityPct}% deterministic personality vibe match (Entertainment Only).`,
      score: computed.compatibilityPct,
      maxScore: 100,
    });
  };

  const resetAll = () => {
    setAnswers({});
    setStep(0);
    setCompleted(false);
    setStarted(false);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      <div className="space-y-2">
        <p className="text-xs font-semibold text-pink-300">
          {questions.length} Deterministic Questions · For Entertainment Only
        </p>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
          {isSoulmate ? 'K-pop Soulmate Quiz' : 'Bias Match Quiz'}
        </h1>
        <p className="text-sm text-violet-200/80">
          {isSoulmate
            ? 'Step through 7 Seoul scenarios to discover a playful entertainment-only soulmate vibe match.'
            : 'Score your energy across stage presence, humor, craft, warmth, and boldness to match your idol twin.'}
        </p>
      </div>

      {!started ? (
        <div className="rounded-3xl bg-[#201148] border border-violet-300/20 p-6 sm:p-8 space-y-6">
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-white">
              Choose Idol Pool
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setGroupId('all')}
                className={`min-h-[40px] px-3.5 py-2 rounded-xl text-xs font-semibold border ${
                  groupId === 'all'
                    ? 'bg-white text-[#170B35] border-white'
                    : 'bg-[#170B35] text-violet-200 border-violet-300/20'
                }`}
              >
                All 14 Fandoms
              </button>
              {KPOP_GROUPS.map((g) => (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => setGroupId(g.id)}
                  className={`min-h-[40px] px-3.5 py-2 rounded-xl text-xs font-semibold border ${
                    groupId === g.id
                      ? 'bg-white text-[#170B35] border-white'
                      : 'bg-[#170B35] text-violet-200 border-violet-300/20'
                  }`}
                >
                  {g.name}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-violet-300/15">
            <p className="text-xs text-violet-300/75">
              Scored with deterministic trait vectors · Entertainment only
            </p>
            <button
              type="button"
              onClick={() => {
                setStep(0);
                setAnswers({});
                setCompleted(false);
                setStarted(true);
              }}
              className="min-h-[48px] px-6 py-3 rounded-2xl bg-gradient-to-r from-[#8B5CF6] to-[#FF4DA6] text-white text-sm font-semibold flex items-center justify-center gap-2"
            >
              <span>Start Quiz</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : !completed && currentQuestion ? (
        <div className="space-y-5">
          <div className="flex items-center justify-between text-xs font-medium text-violet-200">
            <span>
              Question {step + 1} of {questions.length}
            </span>
            <span className="font-mono tabular-nums">
              {Math.round(((step + 1) / questions.length) * 100)}%
            </span>
          </div>

          <div className="h-2.5 w-full rounded-full bg-[#201148] overflow-hidden border border-violet-300/15">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#FF4DA6] transition-all duration-300"
              style={{ width: `${Math.round(((step + 1) / questions.length) * 100)}%` }}
            />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion.id}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.16 }}
              className="rounded-3xl bg-[#201148] border border-violet-300/20 p-5 sm:p-8 space-y-5"
            >
              <h2 className="font-display text-xl sm:text-2xl font-bold text-white leading-snug">
                {currentQuestion.prompt}
              </h2>

              <div className="space-y-3">
                {currentQuestion.options.map((opt) => {
                  const active = selectedId === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() =>
                        setAnswers((prev) => ({ ...prev, [currentQuestion.id]: opt.id }))
                      }
                      className={`w-full text-left p-4 rounded-2xl border transition-all min-h-[52px] text-sm sm:text-base font-medium ${
                        active
                          ? 'bg-gradient-to-r from-[#8B5CF6]/25 to-[#FF4DA6]/25 border-[#FF4DA6] text-white'
                          : 'bg-[#170B35]/75 hover:bg-[#281659] border-violet-300/15 text-violet-100'
                      }`}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center justify-between gap-3 pt-2">
                <button
                  type="button"
                  disabled={step === 0}
                  onClick={() => setStep((s) => Math.max(0, s - 1))}
                  className="min-h-[44px] px-4 py-2 rounded-xl bg-white/8 hover:bg-white/14 disabled:opacity-40 text-sm font-semibold text-violet-100 flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  className="min-h-[46px] px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#FF4DA6] text-white text-sm font-semibold flex items-center gap-2"
                >
                  <span>{step === questions.length - 1 ? 'See Match' : 'Next'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      ) : (
        result && (
          <div className="space-y-6">
            <div className="rounded-3xl bg-[#201148] border border-violet-300/25 p-6 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <IdolAvatarBadge idol={result.bestMatch} size="lg" />
                  <div>
                    <p className="text-xs font-semibold text-pink-300">
                      Entertainment Vibe Match · {result.compatibilityPct}% Alignment
                    </p>
                    <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white mt-0.5">
                      {result.bestMatch.stageName}
                    </h2>
                    <p className="text-sm text-violet-200">
                      {result.bestMatch.groupName} · {result.bestMatch.positions.join(' / ')}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={resetAll}
                  className="min-h-[44px] px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-semibold text-white flex items-center gap-1.5 self-start sm:self-auto"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Play Again</span>
                </button>
              </div>

              <p className="text-sm text-violet-100/90 leading-relaxed">
                {result.bestMatch.funFact}
              </p>

              <div className="space-y-2">
                <p className="text-xs font-semibold text-violet-200 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-pink-300" />
                  <span>Also High Vibe Alignment</span>
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {result.runnersUp.map((idol) => (
                    <div
                      key={idol.id}
                      className="p-3 rounded-2xl bg-[#170B35]/80 border border-violet-300/15 flex items-center gap-3"
                    >
                      <IdolAvatarBadge idol={idol} size="sm" />
                      <div className="min-w-0">
                        <p className="font-display text-sm font-bold text-white truncate">
                          {idol.stageName}
                        </p>
                        <p className="text-xs text-violet-300/75 truncate">{idol.groupName}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <ShareResultPanel
              cardPayload={{
                kicker: isSoulmate ? 'K-pop Soulmate Vibe' : 'Bias Match Result',
                headline: result.bestMatch.stageName,
                subheadline: `${result.bestMatch.groupName} · ${result.compatibilityPct}% Vibe Match`,
                description: result.bestMatch.funFact,
                stats: [
                  { label: 'Alignment', value: `${result.compatibilityPct}%` },
                  { label: 'Group', value: result.bestMatch.groupName },
                ],
                entertainmentNotice: true,
              }}
              sharePath={isSoulmate ? '/quiz/soulmate' : '/quiz/bias-match'}
              shareText={`I matched with ${result.bestMatch.stageName} (${result.bestMatch.groupName}) at ${result.compatibilityPct}% vibe alignment on IdolOrbit Fan Lab!`}
              filename={`idolorbit-${mode}-${result.bestMatch.id}.png`}
              challengeParam={result.bestMatch.stageName}
            />
          </div>
        )
      )}
    </div>
  );
}
