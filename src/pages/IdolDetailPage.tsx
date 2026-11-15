import { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  ArrowLeftRight,
  ArrowRight,
  Award,
  BookOpen,
  Cake,
  Calendar,
  CheckCircle2,
  ExternalLink,
  Heart,
  Info,
  RotateCcw,
  Sparkles,
  XCircle,
} from 'lucide-react';
import {
  calculateAgeAtDate,
  calculateIdolAge,
  compareBirthdays,
  getNextBirthdayKstCountdown,
} from '../lib/dateKst';
import { useOrbit } from '../context/OrbitContext';
import { IdolAvatarBadge } from '../components/IdolAvatarBadge';
import { IDOL_WIKI_RESEARCH } from '../data/idolResearch';
import { buildIdolProfileQuiz } from '../data/idolQuizzes';
import { ShareResultPanel } from '../components/ShareResultPanel';

const FAN_BDAY_STORAGE_KEY = 'idolorbit_fan_birthday';

export function IdolDetailPage({ idolId }: { idolId: string }) {
  const { idols, groups, articles, navigate, isFavorite, toggleFavorite, recordQuizResult } =
    useOrbit();
  const [now, setNow] = useState(() => new Date());
  const [fanBirthday, setFanBirthday] = useState<string>(() => {
    try {
      return window.localStorage.getItem(FAN_BDAY_STORAGE_KEY) || '';
    } catch {
      return '';
    }
  });

  // Per-Idol Interactive Quiz State
  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [finished, setFinished] = useState(false);

  const handleFanBirthdayChange = (val: string) => {
    setFanBirthday(val);
    try {
      if (val) {
        window.localStorage.setItem(FAN_BDAY_STORAGE_KEY, val);
      } else {
        window.localStorage.removeItem(FAN_BDAY_STORAGE_KEY);
      }
    } catch {
      // Ignore storage quota / private mode issues
    }
  };

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    setQIndex(0);
    setAnswers({});
    setFinished(false);
  }, [idolId]);

  const idol = idols.find((i) => i.id === idolId);
  const group = idol ? groups.find((g) => g.id === idol.groupId) : undefined;

  const quizQuestions = useMemo(() => {
    if (!idol) return [];
    return buildIdolProfileQuiz(idol, idols, groups);
  }, [idol, idols, groups]);

  if (!idol) {
    return (
      <div className="p-8 rounded-3xl bg-white dark:bg-[#201148] border border-violet-200 dark:border-violet-300/18 text-center space-y-4">
        <p className="font-display text-2xl font-bold text-[#170B35] dark:text-white">
          Idol Not Found
        </p>
        <button
          type="button"
          onClick={() => navigate('/idols')}
          className="min-h-[44px] px-5 py-2 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#FF4DA6] text-sm font-semibold text-white"
        >
          Browse Idol Directory
        </button>
      </div>
    );
  }

  const age = calculateIdolAge(idol.birthday, now);
  const bdayTimer = getNextBirthdayKstCountdown(idol.birthday, now);
  const debutAge = group ? calculateAgeAtDate(idol.birthday, group.debutDate) : null;
  const legacyAge = idol.legacyDates
    ? calculateAgeAtDate(idol.legacyDates.born, idol.legacyDates.passed)
    : null;
  const fanComparison =
    fanBirthday && /^\d{4}-\d{2}-\d{2}$/.test(fanBirthday)
      ? compareBirthdays(idol.birthday, fanBirthday)
      : null;
  const fanCurrentAge =
    fanBirthday && /^\d{4}-\d{2}-\d{2}$/.test(fanBirthday)
      ? calculateIdolAge(fanBirthday, now)
      : null;
  const fav = isFavorite('idol', idol.id);
  const research = IDOL_WIKI_RESEARCH[idol.id];

  const relatedArticles = articles.filter(
    (a) =>
      a.relatedIdolIds?.includes(idol.id) ||
      a.relatedGroupIds?.includes(idol.groupId) ||
      a.tags.some((t) => t.toLowerCase() === idol.groupName.toLowerCase())
  );

  const currentQ = quizQuestions[qIndex];
  const selectedOpt = answers[qIndex];
  const hasAnsweredCurrent = selectedOpt !== undefined;
  const totalScore = quizQuestions.reduce(
    (acc, q, idx) => (answers[idx] === q.correctIndex ? acc + 1 : acc),
    0
  );

  const rankTitle =
    totalScore === 5
      ? `Certified ${idol.stageName} Expert`
      : totalScore >= 4
      ? `Dedicated ${group?.fandomName || idol.groupName} Stan`
      : totalScore >= 3
      ? `Rising ${idol.stageName} Fan`
      : `${idol.stageName} Profile Explorer`;

  const handleSelectOption = (optIdx: number) => {
    if (answers[qIndex] !== undefined) return;
    setAnswers((prev) => ({ ...prev, [qIndex]: optIdx }));
  };

  const handleFinishQuiz = async () => {
    setFinished(true);
    await recordQuizResult({
      quizSlug: `idol-quiz-${idol.id}`,
      quizTitle: `${idol.stageName} (${idol.groupName}) Profile Quiz`,
      archetypeTitle: rankTitle,
      summary: `Scored ${totalScore}/${quizQuestions.length} verified questions on ${idol.stageName}’s career, identity, birthday, roles, and ${idol.groupName}.`,
      score: totalScore,
      maxScore: quizQuestions.length,
    });
  };

  const handleRetake = () => {
    setQIndex(0);
    setAnswers({});
    setFinished(false);
  };

  return (
    <div className="space-y-8 pb-12">
      <button
        type="button"
        onClick={() => navigate('/idols')}
        className="min-h-[44px] px-3 py-2 rounded-xl text-sm font-semibold text-slate-600 dark:text-violet-200 hover:text-[#170B35] dark:hover:text-white inline-flex items-center gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Idol Directory</span>
      </button>

      {/* Main Profile Card */}
      <div className="rounded-3xl bg-white dark:bg-[#201148] border border-violet-200 dark:border-violet-300/18 p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          <div className="flex flex-col sm:flex-row sm:items-center gap-5">
            <IdolAvatarBadge idol={idol} size="xl" />
            <div className="space-y-1.5">
              <button
                type="button"
                onClick={() => group && navigate(`/group/${group.id}`)}
                className="text-xs font-semibold text-[#8B5CF6] dark:text-pink-300 hover:underline"
              >
                {idol.groupName} {group ? `(${group.fandomName})` : ''} · {idol.nationality}
              </button>
              <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-[#170B35] dark:text-white">
                {idol.stageName}
              </h1>
              <p className="text-sm text-slate-600 dark:text-violet-200/85">
                {idol.fullName} {idol.koreanName ? `· ${idol.koreanName}` : ''} · {idol.positions.join(' / ')}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 self-start sm:self-center">
            <a
              href="#idol-profile-quiz"
              className="min-h-[44px] px-4 py-2 rounded-2xl bg-gradient-to-r from-[#8B5CF6] to-[#FF4DA6] text-xs font-semibold text-white flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Take {idol.stageName} Quiz</span>
            </a>
            <button
              type="button"
              onClick={() => toggleFavorite('idol', idol.id, `${idol.stageName} (${idol.groupName})`)}
              className="min-h-[44px] px-4 py-2 rounded-2xl bg-violet-100 dark:bg-white/10 text-xs font-semibold text-[#170B35] dark:text-white flex items-center gap-2"
            >
              <Heart className={`w-4 h-4 ${fav ? 'fill-[#FF4DA6] text-[#FF4DA6]' : ''}`} />
              <span>{fav ? 'Favorited' : 'Favorite Idol'}</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {idol.legacyDates ? (
            <div className="p-4 rounded-2xl bg-violet-50/80 dark:bg-[#170B35]/80 border border-violet-200 dark:border-violet-300/15">
              <p className="text-xs text-slate-500 dark:text-violet-300/75">Memorial Years</p>
              <p className="font-mono text-xl font-bold text-[#170B35] dark:text-white tabular-nums mt-1">
                1990–2017
              </p>
              <p className="text-xs text-slate-500 dark:text-violet-200/70 mt-0.5">
                Forever {legacyAge}
              </p>
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-violet-50/80 dark:bg-[#170B35]/80 border border-violet-200 dark:border-violet-300/15">
              <p className="text-xs text-slate-500 dark:text-violet-300/75">Exact Age (KST)</p>
              <p className="font-mono text-2xl font-bold text-[#170B35] dark:text-white tabular-nums mt-1">
                {age.years} yrs
              </p>
              <p className="text-xs text-slate-500 dark:text-violet-200/70 mt-0.5">
                {age.months}m {age.days}d
              </p>
            </div>
          )}
          <div className="p-4 rounded-2xl bg-violet-50/80 dark:bg-[#170B35]/80 border border-violet-200 dark:border-violet-300/15">
            <p className="text-xs text-slate-500 dark:text-violet-300/75">Verified Birthday</p>
            <p className="font-mono text-lg font-bold text-[#170B35] dark:text-white tabular-nums mt-1">
              {idol.birthday}
            </p>
            <p className="text-xs text-slate-500 dark:text-violet-200/70 mt-0.5">{idol.zodiac}</p>
          </div>
          <div className="p-4 rounded-2xl bg-violet-50/80 dark:bg-[#170B35]/80 border border-violet-200 dark:border-violet-300/15">
            <p className="text-xs text-slate-500 dark:text-violet-300/75">Debut Age</p>
            <p className="font-mono text-2xl font-bold text-[#FF4DA6] tabular-nums mt-1">
              {debutAge ?? '—'} yrs
            </p>
            <p className="text-xs text-slate-500 dark:text-violet-200/70 mt-0.5">
              Debut {group?.debutDate}
            </p>
          </div>
          {idol.legacyDates ? (
            <div className="p-4 rounded-2xl bg-violet-50/80 dark:bg-[#170B35]/80 border border-violet-200 dark:border-violet-300/15">
              <p className="text-xs text-slate-500 dark:text-violet-300/75">Legacy Profile</p>
              <p className="font-display text-base font-bold text-[#170B35] dark:text-white mt-1">
                Remembered Forever
              </p>
              <p className="text-xs text-slate-500 dark:text-violet-200/70 mt-0.5">
                SHINee Main Vocalist
              </p>
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-violet-50/80 dark:bg-[#170B35]/80 border border-violet-200 dark:border-violet-300/15">
              <p className="text-xs text-slate-500 dark:text-violet-300/75">KST Birthday Timer</p>
              <p className="font-mono text-lg font-bold text-[#170B35] dark:text-white tabular-nums mt-1">
                {bdayTimer.isToday
                  ? 'Happy Birthday!'
                  : `${bdayTimer.days}d ${String(bdayTimer.hours).padStart(2, '0')}h ${String(bdayTimer.minutes).padStart(2, '0')}m`}
              </p>
              <p className="text-xs text-slate-500 dark:text-violet-200/70 mt-0.5">
                Turning {age.turningAge}
              </p>
            </div>
          )}
        </div>

        {(idol.statusNote || group?.statusNote) && (
          <div className="rounded-2xl bg-violet-100/70 dark:bg-violet-500/10 border border-violet-300/40 dark:border-violet-300/20 px-4 py-3 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-[#8B5CF6] dark:text-pink-300 shrink-0 mt-0.5" />
            <p className="text-xs sm:text-sm text-slate-700 dark:text-violet-100/90 leading-relaxed">
              {idol.statusNote || group?.statusNote}
            </p>
          </div>
        )}

        {/* Verified Career Bio */}
        <div className="rounded-2xl bg-violet-50/70 dark:bg-[#170B35]/80 border border-violet-200 dark:border-violet-300/15 p-5 space-y-2.5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-xs font-bold text-[#8B5CF6] dark:text-pink-300 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Verified Artist Biography &amp; Career Notes</span>
            </p>
            {research?.wikiUrl && (
              <a
                href={research.wikiUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-[#8B5CF6] dark:text-violet-200 hover:underline inline-flex items-center gap-1"
              >
                <span>Wikipedia Reference</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
          <p className="text-sm sm:text-base text-slate-700 dark:text-violet-100/90 leading-relaxed">
            {research?.summary || idol.funFact}
          </p>
          {research?.summary && idol.funFact && (
            <p className="text-xs sm:text-sm text-slate-600 dark:text-violet-200/80 pt-1">
              {idol.funFact}
            </p>
          )}
        </div>

        <div className="flex flex-wrap gap-3 pt-1">
          <button
            type="button"
            onClick={() => navigate(`/tool/birthday-card?idol=${idol.id}`)}
            className="min-h-[44px] px-5 py-2.5 rounded-2xl bg-gradient-to-r from-[#8B5CF6] to-[#FF4DA6] text-white text-sm font-semibold flex items-center gap-2"
          >
            <Cake className="w-4 h-4" />
            <span>Create Birthday Card</span>
          </button>
          <button
            type="button"
            onClick={() => navigate(`/quiz/trivia?group=${idol.groupId}`)}
            className="min-h-[44px] px-5 py-2.5 rounded-2xl bg-violet-100 dark:bg-white/10 hover:bg-violet-200 dark:hover:bg-white/15 text-[#170B35] dark:text-white text-sm font-semibold flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-[#FF4DA6]" />
            <span>Play {idol.groupName} Trivia</span>
          </button>
          <button
            type="button"
            onClick={() => navigate('/tool/birthday-countdown')}
            className="min-h-[44px] px-5 py-2.5 rounded-2xl bg-violet-100 dark:bg-white/10 hover:bg-violet-200 dark:hover:bg-white/15 text-[#170B35] dark:text-white text-sm font-semibold flex items-center gap-2"
          >
            <Calendar className="w-4 h-4 text-[#8B5CF6] dark:text-violet-200" />
            <span>All Birthday Timers</span>
          </button>
        </div>
      </div>

      {/* Interactive Fan vs. Idol Age Comparison Calculator */}
      <section className="rounded-3xl bg-white dark:bg-[#201148] border border-violet-200 dark:border-violet-300/20 p-6 sm:p-8 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1">
            <p className="text-xs font-semibold text-[#FF4DA6] flex items-center gap-1.5">
              <ArrowLeftRight className="w-3.5 h-3.5" />
              <span>Fan Age Comparison Calculator</span>
            </p>
            <h2 className="font-display text-2xl font-extrabold text-[#170B35] dark:text-white">
              Compare Your Age With {idol.stageName}
            </h2>
            <p className="text-sm text-slate-600 dark:text-violet-200/80">
              Enter your birthday to see the exact year, month, day, and ’YY-line peer difference against {idol.stageName}’s verified birthdate ({idol.birthday}).
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-end">
            <label htmlFor="fan-bday-input" className="sr-only">
              Your birthday
            </label>
            <input
              id="fan-bday-input"
              type="date"
              max="2026-12-31"
              min="1940-01-01"
              value={fanBirthday}
              onChange={(e) => handleFanBirthdayChange(e.target.value)}
              className="min-h-[44px] px-4 py-2 rounded-2xl bg-violet-50 dark:bg-[#170B35] border border-violet-200 dark:border-violet-300/25 text-sm font-mono text-[#170B35] dark:text-white focus:border-[#FF4DA6] focus:outline-none"
            />
            {fanBirthday && (
              <button
                type="button"
                onClick={() => handleFanBirthdayChange('')}
                className="min-h-[44px] px-3.5 py-2 rounded-2xl bg-violet-100 dark:bg-white/10 text-xs font-semibold text-slate-700 dark:text-violet-200 hover:text-[#170B35] dark:hover:text-white"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {fanComparison && fanCurrentAge ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-violet-50/85 dark:bg-[#170B35]/85 border border-violet-200 dark:border-violet-300/18">
              <p className="text-xs text-slate-500 dark:text-violet-300/75">Exact Age Difference</p>
              <p className="font-mono text-lg font-bold text-[#170B35] dark:text-white tabular-nums mt-1">
                {fanComparison.relation === 'same-day'
                  ? 'Exact Birthday Twin!'
                  : `${fanComparison.years}y ${fanComparison.months}m ${fanComparison.days}d apart`}
              </p>
              <p className="text-xs text-slate-500 dark:text-violet-200/75 mt-0.5 tabular-nums">
                {fanComparison.totalDays.toLocaleString()} total days difference
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-violet-50/85 dark:bg-[#170B35]/85 border border-violet-200 dark:border-violet-300/18">
              <p className="text-xs text-slate-500 dark:text-violet-300/75">Comparison Result</p>
              <p className="font-display text-lg font-bold text-[#FF4DA6] mt-1">
                {fanComparison.relation === 'same-day'
                  ? `You & ${idol.stageName} share the same birthday!`
                  : fanComparison.relation === 'idol-older'
                  ? `${idol.stageName} is older than you`
                  : `You are older than ${idol.stageName}`}
              </p>
              <p className="text-xs text-slate-500 dark:text-violet-200/75 mt-0.5">
                {idol.legacyDates
                  ? `Your age today: ${fanCurrentAge.years} yrs · ${idol.stageName}: ${idol.legacyDates.label}`
                  : `Your age: ${fanCurrentAge.years} yrs · ${idol.stageName}: ${age.years} yrs`}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-violet-50/85 dark:bg-[#170B35]/85 border border-violet-200 dark:border-violet-300/18">
              <p className="text-xs text-slate-500 dark:text-violet-300/75">Korean Year Line Peerage</p>
              <p className="font-mono text-lg font-bold text-[#170B35] dark:text-white mt-1">
                {idol.stageName}: {idol.birthday.slice(2, 4)}’ · You: {fanComparison.fanLine}
              </p>
              <p className="text-xs text-slate-500 dark:text-violet-200/75 mt-0.5">
                {fanComparison.sameYearPeer
                  ? `Same birth year (${idol.birthday.slice(0, 4)}) · Same-age peers (친구)`
                  : fanComparison.relation === 'idol-older'
                  ? `${idol.stageName} is your senior by ${fanComparison.years} yr${fanComparison.years === 1 ? '' : 's'} (hyung/oppa or noona/unnie)`
                  : `You are ${idol.stageName}’s senior by ${fanComparison.years} yr${fanComparison.years === 1 ? '' : 's'} (dongsaeng)`}
              </p>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl bg-violet-50/60 dark:bg-[#170B35]/60 border border-dashed border-violet-300 dark:border-violet-300/25 px-5 py-4 text-xs sm:text-sm text-slate-600 dark:text-violet-200/75">
            Select your birthdate above — your date stays saved in this browser so you can compare yourself instantly across all {idols.length} idols.
          </div>
        )}
      </section>

      {/* Per-Idol Interactive Researched Quiz */}
      <section
        id="idol-profile-quiz"
        className="rounded-3xl bg-white dark:bg-[#201148] border border-violet-200 dark:border-violet-300/20 p-6 sm:p-8 space-y-6 scroll-mt-20"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold text-[#FF4DA6] flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5" />
              <span>Researched Profile Challenge · {quizQuestions.length} Verified Questions</span>
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#170B35] dark:text-white mt-1">
              How Well Do You Know {idol.stageName}?
            </h2>
          </div>

          {!finished && (
            <div className="text-xs font-mono font-bold text-[#8B5CF6] dark:text-pink-200 tabular-nums">
              Question {qIndex + 1} / {quizQuestions.length} · Score {totalScore}
            </div>
          )}
        </div>

        {/* Progress Bar */}
        <div className="h-2.5 w-full rounded-full bg-violet-100 dark:bg-[#170B35] overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#8B5CF6] to-[#FF4DA6] transition-all duration-300"
            style={{
              width: `${
                finished
                  ? 100
                  : Math.round(((qIndex + (hasAnsweredCurrent ? 1 : 0)) / quizQuestions.length) * 100)
              }%`,
            }}
          />
        </div>

        {finished ? (
          <div className="space-y-6">
            <div className="rounded-2xl bg-violet-50/90 dark:bg-[#170B35]/90 border border-violet-200 dark:border-violet-300/18 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <p className="text-xs font-semibold text-[#8B5CF6] dark:text-pink-300">
                  Final Profile Quiz Score
                </p>
                <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-[#170B35] dark:text-white">
                  {rankTitle}
                </h3>
                <p className="text-sm text-slate-600 dark:text-violet-200/85">
                  You answered <span className="font-mono font-bold text-[#FF4DA6]">{totalScore}</span> out of{' '}
                  <span className="font-mono font-bold">{quizQuestions.length}</span> researched questions about {idol.stageName} ({idol.groupName}) accurately.
                </p>
              </div>

              <button
                type="button"
                onClick={handleRetake}
                className="min-h-[44px] px-5 py-2.5 rounded-2xl bg-white dark:bg-white/10 border border-violet-200 dark:border-violet-300/20 text-sm font-semibold text-[#170B35] dark:text-white inline-flex items-center gap-2 self-start sm:self-center"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Retake Quiz</span>
              </button>
            </div>

            <ShareResultPanel
              cardPayload={{
                kicker: `IDOLORBIT PROFILE QUIZ · ${idol.groupName.toUpperCase()}`,
                headline: `${totalScore}/${quizQuestions.length} on ${idol.stageName}`,
                subheadline: rankTitle,
                description: `Tested on verified ${idol.stageName} career milestones, birth name, birthday, positions, and ${idol.groupName} fandom history.`,
                stats: [
                  { label: 'SCORE', value: `${totalScore}/${quizQuestions.length}` },
                  { label: 'GROUP', value: idol.groupName },
                  { label: 'BIRTHDAY', value: idol.birthday },
                ],
                accentHex: group?.accentHex || '#8B5CF6',
                secondaryHex: group?.secondaryHex || '#FF4DA6',
                footerLabel: 'idolorbit.app/idols',
              }}
              sharePath={`/idol/${idol.id}`}
              shareText={`I scored ${totalScore}/${quizQuestions.length} (${rankTitle}) on the ${idol.stageName} (${idol.groupName}) profile quiz on IdolOrbit!`}
              filename={`idolorbit-${idol.id}-quiz-card.png`}
            />
          </div>
        ) : (
          currentQ && (
            <div className="space-y-5">
              <div className="space-y-1.5">
                <p className="text-xs font-semibold text-[#8B5CF6] dark:text-violet-300">
                  {currentQ.categoryLabel}
                </p>
                <h3 className="font-display text-lg sm:text-xl font-bold text-[#170B35] dark:text-white leading-snug">
                  {currentQ.prompt}
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentQ.options.map((opt, idx) => {
                  const isSelected = selectedOpt === idx;
                  const isCorrect = idx === currentQ.correctIndex;
                  let btnStyle =
                    'bg-violet-50/70 dark:bg-[#170B35]/80 border-violet-200 dark:border-violet-300/18 hover:border-[#8B5CF6] text-[#170B35] dark:text-white';
                  if (hasAnsweredCurrent) {
                    if (isCorrect) {
                      btnStyle =
                        'bg-emerald-500/15 border-emerald-500 text-emerald-900 dark:text-emerald-200 font-semibold';
                    } else if (isSelected) {
                      btnStyle =
                        'bg-rose-500/15 border-rose-500 text-rose-900 dark:text-rose-200';
                    } else {
                      btnStyle =
                        'bg-violet-50/40 dark:bg-[#170B35]/50 border-violet-200/60 dark:border-violet-300/10 text-slate-500 dark:text-violet-300/60';
                    }
                  }

                  return (
                    <button
                      key={`${currentQ.id}-${idx}`}
                      type="button"
                      disabled={hasAnsweredCurrent}
                      onClick={() => handleSelectOption(idx)}
                      className={`min-h-[52px] px-4 py-3 rounded-2xl border text-left text-sm transition-all flex items-center justify-between gap-2 ${btnStyle}`}
                    >
                      <span>{opt}</span>
                      {hasAnsweredCurrent && isCorrect && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      )}
                      {hasAnsweredCurrent && isSelected && !isCorrect && (
                        <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {hasAnsweredCurrent && (
                <div className="rounded-2xl bg-violet-50/90 dark:bg-[#170B35]/90 border border-violet-200 dark:border-violet-300/18 p-4 space-y-1.5">
                  <p className="text-xs font-bold text-[#8B5CF6] dark:text-pink-300">
                    {selectedOpt === currentQ.correctIndex ? 'Correct!' : 'Verified Answer'} · {currentQ.sourceLabel}
                  </p>
                  <p className="text-sm text-slate-700 dark:text-violet-100/90">
                    {currentQ.explanation}
                  </p>
                </div>
              )}

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  disabled={qIndex === 0}
                  onClick={() => setQIndex((i) => Math.max(0, i - 1))}
                  className="min-h-[44px] px-4 py-2 rounded-xl bg-violet-100 dark:bg-white/10 disabled:opacity-40 text-xs font-semibold text-[#170B35] dark:text-white inline-flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Previous</span>
                </button>

                {qIndex < quizQuestions.length - 1 ? (
                  <button
                    type="button"
                    disabled={!hasAnsweredCurrent}
                    onClick={() => setQIndex((i) => i + 1)}
                    className="min-h-[44px] px-5 py-2 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#FF4DA6] disabled:opacity-40 text-xs font-semibold text-white inline-flex items-center gap-1.5"
                  >
                    <span>Next Question</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    type="button"
                    disabled={!hasAnsweredCurrent}
                    onClick={handleFinishQuiz}
                    className="min-h-[44px] px-5 py-2 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#FF4DA6] disabled:opacity-40 text-xs font-semibold text-white inline-flex items-center gap-1.5"
                  >
                    <Award className="w-3.5 h-3.5" />
                    <span>See Final Result</span>
                  </button>
                )}
              </div>
            </div>
          )
        )}
      </section>

      {relatedArticles.length > 0 && (
        <section className="space-y-4">
          <h2 className="font-display text-2xl font-bold text-[#170B35] dark:text-white">
            Related Editorial Coverage
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {relatedArticles.map((art) => (
              <button
                key={art.id}
                type="button"
                onClick={() => navigate(`/article/${art.slug}`)}
                className="text-left p-5 rounded-2xl bg-white dark:bg-[#201148] border border-violet-200 dark:border-violet-300/16 hover:border-[#FF4DA6] space-y-2"
              >
                <p className="text-xs font-semibold text-[#8B5CF6] dark:text-pink-300">
                  {art.readingMinutes} min read
                </p>
                <p className="font-display text-base font-bold text-[#170B35] dark:text-white leading-snug">
                  {art.title}
                </p>
              </button>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
