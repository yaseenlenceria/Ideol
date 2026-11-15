import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, RotateCcw, XCircle } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { KPOP_GROUPS } from '../data/kpopData';
import { TRIVIA_QUESTIONS } from '../data/quizContent';
import { TriviaDifficulty } from '../types/kpop';
import { useOrbit } from '../context/OrbitContext';
import { ShareResultPanel } from '../components/ShareResultPanel';

export function TriviaQuizPage() {
  const { recordQuizResult } = useOrbit();
  const [groupFilter, setGroupFilter] = useState<string>('all');
  const [difficultyFilter, setDifficultyFilter] = useState<'all' | TriviaDifficulty>('all');
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const g = params.get('group');
    if (g && KPOP_GROUPS.some((grp) => grp.id === g)) {
      setGroupFilter(g);
    }
  }, []);

  const quizPool = useMemo(() => {
    const filtered = TRIVIA_QUESTIONS.filter((q) => {
      const groupOk = groupFilter === 'all' || q.groupId === groupFilter;
      const diffOk = difficultyFilter === 'all' || q.difficulty === difficultyFilter;
      return groupOk && diffOk;
    });
    if (filtered.length > 0) return filtered.slice(0, 10);
    // Fallback to group questions across all difficulties if specific tier is empty
    const groupOnly = TRIVIA_QUESTIONS.filter((q) => q.groupId === groupFilter);
    return groupOnly.length > 0 ? groupOnly : TRIVIA_QUESTIONS.slice(0, 10);
  }, [groupFilter, difficultyFilter]);

  const currentQuestion = quizPool[step];
  const chosenIndex = currentQuestion ? selectedAnswers[currentQuestion.id] : undefined;
  const hasAnsweredCurrent = chosenIndex !== undefined;

  const correctCount = useMemo(() => {
    return quizPool.reduce((acc, q) => {
      return selectedAnswers[q.id] === q.correctIndex ? acc + 1 : acc;
    }, 0);
  }, [quizPool, selectedAnswers]);

  const handleStart = () => {
    setStep(0);
    setSelectedAnswers({});
    setCompleted(false);
    setStarted(true);
  };

  const handleChooseOption = (idx: number) => {
    if (!currentQuestion || hasAnsweredCurrent) return;
    setSelectedAnswers((prev) => ({ ...prev, [currentQuestion.id]: idx }));
  };

  const handleNext = async () => {
    if (step < quizPool.length - 1) {
      setStep((s) => s + 1);
      return;
    }
    setCompleted(true);
    const groupLabel =
      groupFilter === 'all'
        ? 'All Fandoms'
        : KPOP_GROUPS.find((g) => g.id === groupFilter)?.name || 'K-pop';
    await recordQuizResult({
      quizSlug: 'trivia',
      quizTitle: `K-pop Trivia · ${groupLabel}`,
      archetypeTitle: `${correctCount}/${quizPool.length} Verified Facts`,
      summary: `Scored ${Math.round((correctCount / Math.max(quizPool.length, 1)) * 100)}% accuracy on ${groupLabel} trivia.`,
      score: correctCount,
      maxScore: quizPool.length,
    });
  };

  const accuracyPct = Math.round((correctCount / Math.max(quizPool.length, 1)) * 100);
  const rankTitle =
    accuracyPct >= 90
      ? 'Grand Sunbae Archivist'
      : accuracyPct >= 65
        ? 'Certified Fandom Insider'
        : 'Rising Trainee';

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      <div className="space-y-2">
        <p className="text-xs font-semibold text-pink-300">
          Verified Debuts · Discography · Member Facts
        </p>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
          K-pop Trivia Challenge
        </h1>
      </div>

      {!started ? (
        <div className="rounded-3xl bg-[#201148] border border-violet-300/20 p-6 sm:p-8 space-y-6">
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-white">
              1. Select Fandom Focus
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setGroupFilter('all')}
                className={`min-h-[40px] px-3.5 py-2 rounded-xl text-xs font-semibold border transition-colors ${
                  groupFilter === 'all'
                    ? 'bg-white text-[#170B35] border-white'
                    : 'bg-[#170B35] text-violet-200 border-violet-300/20 hover:border-violet-300/45'
                }`}
              >
                All Fandoms Mix
              </button>
              {KPOP_GROUPS.map((g) => (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => setGroupFilter(g.id)}
                  className={`min-h-[40px] px-3.5 py-2 rounded-xl text-xs font-semibold border transition-colors ${
                    groupFilter === g.id
                      ? 'bg-white text-[#170B35] border-white'
                      : 'bg-[#170B35] text-violet-200 border-violet-300/20 hover:border-violet-300/45'
                  }`}
                >
                  {g.name}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-semibold text-white">
              2. Difficulty Tier
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {(['all', 'Rookie', 'Sunbae', 'Legend'] as const).map((tier) => (
                <button
                  key={tier}
                  type="button"
                  onClick={() => setDifficultyFilter(tier)}
                  className={`min-h-[44px] px-4 py-2.5 rounded-xl text-xs font-semibold border transition-colors ${
                    difficultyFilter === tier
                      ? 'bg-gradient-to-r from-[#8B5CF6] to-[#FF4DA6] text-white border-transparent'
                      : 'bg-[#170B35] text-violet-200 border-violet-300/20 hover:border-violet-300/45'
                  }`}
                >
                  {tier === 'all' ? 'All Levels' : tier}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-violet-300/15">
            <p className="text-xs text-violet-200/80">
              Ready: <span className="font-mono font-bold text-white">{quizPool.length}</span> verified questions with instant explanations
            </p>
            <button
              type="button"
              onClick={handleStart}
              className="min-h-[48px] px-6 py-3 rounded-2xl bg-gradient-to-r from-[#8B5CF6] to-[#FF4DA6] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-pink-500/20 hover:brightness-110"
            >
              <span>Start Trivia</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : !completed && currentQuestion ? (
        <div className="space-y-5">
          <div className="flex items-center justify-between text-xs font-medium text-violet-200">
            <span>
              Question {step + 1} of {quizPool.length} · {currentQuestion.groupName} ({currentQuestion.difficulty})
            </span>
            <span className="font-mono tabular-nums text-pink-300">
              Score: {correctCount}/{quizPool.length}
            </span>
          </div>

          <div className="h-2.5 w-full rounded-full bg-[#201148] overflow-hidden border border-violet-300/15">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#FF4DA6] transition-all duration-300"
              style={{ width: `${Math.round(((step + 1) / quizPool.length) * 100)}%` }}
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
                {currentQuestion.options.map((opt, idx) => {
                  const isSelected = chosenIndex === idx;
                  const isCorrect = idx === currentQuestion.correctIndex;
                  let btnStyle =
                    'bg-[#170B35]/75 hover:bg-[#281659] border-violet-300/15 text-white';
                  if (hasAnsweredCurrent) {
                    if (isCorrect) {
                      btnStyle = 'bg-emerald-500/20 border-emerald-400 text-white';
                    } else if (isSelected) {
                      btnStyle = 'bg-rose-500/20 border-rose-400 text-white';
                    } else {
                      btnStyle = 'bg-[#170B35]/45 border-violet-300/10 text-violet-300/60';
                    }
                  }

                  return (
                    <button
                      key={opt}
                      type="button"
                      disabled={hasAnsweredCurrent}
                      onClick={() => handleChooseOption(idx)}
                      className={`w-full text-left p-4 rounded-2xl border transition-all min-h-[52px] flex items-center justify-between gap-3 ${btnStyle}`}
                    >
                      <span className="font-medium text-sm sm:text-base">{opt}</span>
                      {hasAnsweredCurrent && isCorrect && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                      )}
                      {hasAnsweredCurrent && isSelected && !isCorrect && (
                        <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {hasAnsweredCurrent && (
                <div className="p-4 rounded-2xl bg-[#170B35]/90 border border-violet-300/20 space-y-1">
                  <p className="text-xs font-semibold text-pink-300">
                    {chosenIndex === currentQuestion.correctIndex ? 'Correct!' : 'Verified Explanation'}
                  </p>
                  <p className="text-sm text-violet-100 leading-relaxed">
                    {currentQuestion.explanation}
                  </p>
                  <p className="text-[11px] text-violet-300/65">
                    Source: {currentQuestion.verifiedSourceNote}
                  </p>
                </div>
              )}

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
                  disabled={!hasAnsweredCurrent}
                  onClick={handleNext}
                  className="min-h-[46px] px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#FF4DA6] disabled:opacity-45 text-white text-sm font-semibold flex items-center gap-2"
                >
                  <span>{step === quizPool.length - 1 ? 'Finish Trivia' : 'Next'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="rounded-3xl bg-[#201148] border border-violet-300/25 p-6 sm:p-8 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold text-pink-300">Verified Trivia Score</p>
                <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white mt-1">
                  {rankTitle}
                </h2>
                <p className="font-mono text-lg text-violet-200 tabular-nums mt-1">
                  {correctCount} / {quizPool.length} correct ({accuracyPct}%)
                </p>
              </div>
              <button
                type="button"
                onClick={() => setStarted(false)}
                className="min-h-[44px] px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-semibold text-white flex items-center gap-1.5 self-start sm:self-auto"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>New Trivia Set</span>
              </button>
            </div>
          </div>

          <ShareResultPanel
            cardPayload={{
              kicker: 'K-pop Trivia Score',
              headline: `${correctCount} / ${quizPool.length}`,
              subheadline: rankTitle,
              description: `Scored ${accuracyPct}% accuracy on IdolOrbit verified K-pop trivia.`,
              stats: [
                { label: 'Accuracy', value: `${accuracyPct}%` },
                { label: 'Questions', value: String(quizPool.length) },
              ],
            }}
            sharePath="/quiz/trivia"
            shareText={`I scored ${correctCount}/${quizPool.length} (${accuracyPct}%) on IdolOrbit K-pop Trivia! Can you beat me?`}
            filename="idolorbit-kpop-trivia.png"
            challengeParam={`${correctCount}/${quizPool.length}`}
          />
        </div>
      )}
    </div>
  );
}
