import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, RotateCcw, Sparkles } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import {
  computeFanDnaResult,
  FAN_DNA_ARCHETYPES,
  FAN_DNA_QUESTIONS,
} from '../data/quizContent';
import { FanDnaDimensionScores } from '../types/kpop';
import { useOrbit } from '../context/OrbitContext';
import { ShareResultPanel } from '../components/ShareResultPanel';

const DIMENSION_LABELS: Record<keyof FanDnaDimensionScores, string> = {
  choreo: 'Stage & Choreo',
  streamer: 'Chart Momentum',
  collector: 'Binder Curation',
  detective: 'Lore Decoding',
  vocal: 'Vocal Craft',
  captain: 'Arena Energy',
};

export function FanDnaQuizPage() {
  const { recordQuizResult, showToast } = useOrbit();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [completed, setCompleted] = useState(false);
  const [challengeTag, setChallengeTag] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ch = params.get('challenge');
    if (ch) setChallengeTag(ch);
  }, []);

  const currentQuestion = FAN_DNA_QUESTIONS[step];
  const selectedOption = answers[currentQuestion?.id];
  const totalQuestions = FAN_DNA_QUESTIONS.length;
  const progressPct = completed ? 100 : Math.round(((step + 1) / totalQuestions) * 100);

  const handleSelect = (optionId: string) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: optionId }));
  };

  const handleNext = async () => {
    if (!selectedOption) {
      showToast('Pick an answer to continue', 'default');
      return;
    }
    if (step < totalQuestions - 1) {
      setStep((s) => s + 1);
      return;
    }

    const computed = computeFanDnaResult(answers);
    const maxDim = Math.max(...Object.values(computed.scores), 1);
    setCompleted(true);
    await recordQuizResult({
      quizSlug: 'fan-dna',
      quizTitle: 'K-pop Fan DNA',
      archetypeTitle: computed.winner.title,
      summary: computed.winner.summary,
      score: computed.scores[computed.winner.code],
      maxScore: Math.max(maxDim, 15),
    });
  };

  const handleRestart = () => {
    setAnswers({});
    setStep(0);
    setCompleted(false);
  };

  const result = completed ? computeFanDnaResult(answers) : null;
  const maxDimensionScore = result
    ? Math.max(...(Object.values(result.scores) as number[]), 1)
    : 1;

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      <div className="space-y-2">
        <p className="text-xs font-semibold text-pink-300">
          7 Weighted Questions · Entertainment Personality Profile
        </p>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
          K-pop Fan DNA
        </h1>
        {challengeTag && (
          <p className="text-sm text-violet-100 bg-pink-500/15 border border-pink-400/30 rounded-2xl px-4 py-2.5">
            A friend challenged you with result <span className="font-bold text-white">{challengeTag}</span>. Take the 7 questions to compare Fan DNA!
          </p>
        )}
      </div>

      {!completed ? (
        <div className="space-y-5">
          {/* Progress */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-medium text-violet-200">
              <span>
                Question {step + 1} of {totalQuestions}
              </span>
              <span className="font-mono tabular-nums">{progressPct}%</span>
            </div>
            <div className="h-2.5 w-full rounded-full bg-[#201148] overflow-hidden border border-violet-300/15">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#FF4DA6] transition-all duration-300"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion.id}
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -18 }}
              transition={{ duration: 0.18 }}
              className="rounded-3xl bg-[#201148] border border-violet-300/20 p-5 sm:p-8 space-y-6 shadow-xl shadow-purple-950/40"
            >
              <div>
                <p className="text-xs font-semibold text-pink-300">{currentQuestion.context}</p>
                <h2 className="font-display text-xl sm:text-2xl font-bold text-white mt-1.5 leading-snug">
                  {currentQuestion.prompt}
                </h2>
              </div>

              <div className="space-y-3">
                {currentQuestion.options.map((opt) => {
                  const active = selectedOption === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => handleSelect(opt.id)}
                      className={`w-full text-left p-4 rounded-2xl border transition-all min-h-[56px] ${
                        active
                          ? 'bg-gradient-to-r from-[#8B5CF6]/25 to-[#FF4DA6]/25 border-[#FF4DA6] shadow-md shadow-pink-500/10'
                          : 'bg-[#170B35]/75 hover:bg-[#281659] border-violet-300/15 hover:border-violet-300/35'
                      }`}
                    >
                      <p className="font-semibold text-sm sm:text-base text-white">{opt.label}</p>
                      <p className="text-xs text-violet-200/75 mt-1">{opt.detail}</p>
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center justify-between gap-3 pt-2">
                <button
                  type="button"
                  disabled={step === 0}
                  onClick={() => setStep((s) => Math.max(0, s - 1))}
                  className="min-h-[46px] px-4 py-2.5 rounded-xl bg-white/8 hover:bg-white/14 disabled:opacity-40 disabled:pointer-events-none text-sm font-semibold text-violet-100 flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  className="min-h-[46px] px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#FF4DA6] text-white text-sm font-semibold flex items-center gap-2 shadow-lg shadow-pink-500/20 hover:brightness-110 active:scale-[0.98]"
                >
                  <span>{step === totalQuestions - 1 ? 'Reveal My Fan DNA' : 'Next Question'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      ) : (
        result && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="rounded-3xl bg-[#201148] border border-violet-300/25 p-6 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold text-pink-300">
                    Your Fan DNA Archetype · Entertainment Result
                  </p>
                  <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white mt-1">
                    {result.winner.title}
                  </h2>
                  <p className="text-sm font-medium text-violet-200 mt-1">
                    {result.winner.subtitle}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleRestart}
                  className="min-h-[44px] px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-semibold text-white flex items-center gap-1.5 self-start sm:self-auto"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retake Quiz</span>
                </button>
              </div>

              <p className="text-sm sm:text-base text-violet-100/90 leading-relaxed">
                {result.winner.summary}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div className="p-4 rounded-2xl bg-[#170B35]/80 border border-violet-300/15">
                  <p className="text-xs text-violet-300/75">Signature Fan Trait</p>
                  <p className="text-sm font-semibold text-white mt-1">
                    {result.winner.signatureTrait}
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-[#170B35]/80 border border-violet-300/15">
                  <p className="text-xs text-violet-300/75">Best Concert Co-Pilot</p>
                  <p className="text-sm font-semibold text-pink-200 mt-1">
                    {result.winner.compatibleArchetype} (Runner-up: {result.runnerUp.title})
                  </p>
                </div>
              </div>

              {/* Dimension Breakdown Bars */}
              <div className="space-y-3 pt-2">
                <p className="text-xs font-semibold text-violet-200 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-pink-300" />
                  <span>Weighted Trait Breakdown</span>
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(Object.keys(FAN_DNA_ARCHETYPES) as Array<keyof FanDnaDimensionScores>).map((dim) => {
                    const scoreVal = result.scores[dim];
                    const widthPct = Math.round((scoreVal / Math.max(maxDimensionScore, 1)) * 100);
                    return (
                      <div key={dim} className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-violet-100 font-medium">{DIMENSION_LABELS[dim]}</span>
                          <span className="font-mono text-violet-200 tabular-nums">{scoreVal} pts</span>
                        </div>
                        <div className="h-2 rounded-full bg-[#170B35] overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#FF4DA6]"
                            style={{ width: `${Math.max(8, widthPct)}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <ShareResultPanel
              cardPayload={{
                kicker: 'K-pop Fan DNA Result',
                headline: result.winner.title,
                subheadline: result.winner.subtitle,
                description: result.winner.summary,
                stats: [
                  { label: 'Top Score', value: `${result.scores[result.winner.code]} pts` },
                  { label: 'Secondary', value: result.runnerUp.code.toUpperCase() },
                ],
                accentHex: '#8B5CF6',
                secondaryHex: result.winner.accentHex,
                entertainmentNotice: true,
              }}
              sharePath="/quiz/fan-dna"
              shareText={`My K-pop Fan DNA is "${result.winner.title}"! Challenge me on IdolOrbit Fan Lab:`}
              filename={`idolorbit-fan-dna-${result.winner.code}.png`}
              challengeParam={result.winner.title}
            />
          </motion.div>
        )
      )}
    </div>
  );
}
