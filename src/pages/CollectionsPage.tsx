import { useState } from 'react';
import {
  Bookmark,
  BookOpen,
  CheckCircle2,
  Heart,
  LogIn,
  Newspaper,
  Plus,
  Trash2,
  Trophy,
  Users,
} from 'lucide-react';
import { useOrbit } from '../context/OrbitContext';

export function CollectionsPage() {
  const {
    user,
    handleSignIn,
    results,
    photocards,
    favorites,
    toggleFavorite,
    groups,
    idols,
    profile,
    updateProfilePrefs,
    navigate,
    togglePhotocardStatus,
    removePhotocard,
    addPhotocard,
  } = useOrbit();

  const [favGroup, setFavGroup] = useState(profile?.favoriteGroup || 'BTS');
  const [biasName, setBiasName] = useState(profile?.biasIdol || '');
  const [quickIdolId, setQuickIdolId] = useState(idols[0]?.id || 'bts-jungkook');
  const [quickEra, setQuickEra] = useState('');
  const [quickCard, setQuickCard] = useState('');
  const [quickStatus, setQuickStatus] = useState<'owned' | 'wishlist'>('owned');

  const ownedCount = photocards.filter((p) => p.status === 'owned').length;
  const wishlistCount = photocards.filter((p) => p.status === 'wishlist').length;

  const handleQuickAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    const idol = idols.find((i) => i.id === quickIdolId) || idols[0];
    if (!idol || !quickEra.trim() || !quickCard.trim()) return;
    await addPhotocard({
      idolId: idol.id,
      idolName: idol.stageName,
      groupName: idol.groupName,
      albumEra: quickEra.trim(),
      cardTitle: quickCard.trim(),
      status: quickStatus,
    });
    setQuickEra('');
    setQuickCard('');
  };

  const getFavPath = (itemType: 'idol' | 'group' | 'article', targetId: string) => {
    if (itemType === 'idol') return `/idol/${targetId}`;
    if (itemType === 'group') return `/group/${targetId}`;
    return `/article/${targetId}`;
  };

  return (
    <div className="space-y-10 pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold text-[#8B5CF6] dark:text-pink-300">
            {user ? 'Synced to Your Cloud Account' : 'Guest Session Active · Local Storage'}
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-[#170B35] dark:text-white mt-1">
            Saved Favorites, Binder &amp; Quiz Archive
          </h1>
          <p className="text-sm text-slate-600 dark:text-violet-200/80 mt-1">
            Bookmark articles, follow favorite idols and groups, manage photocards, and review quiz history.
          </p>
        </div>

        {!user && (
          <button
            type="button"
            onClick={handleSignIn}
            className="min-h-[44px] px-5 py-2.5 rounded-2xl bg-gradient-to-r from-[#8B5CF6] to-[#FF4DA6] text-white text-xs font-semibold flex items-center gap-2 self-start md:self-auto"
          >
            <LogIn className="w-4 h-4" />
            <span>Sign In with Google to Sync</span>
          </button>
        )}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-5">
        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#201148] border border-violet-200 dark:border-violet-300/15">
          <p className="text-xs text-slate-500 dark:text-violet-200/75">Saved Favorites</p>
          <p className="font-mono text-2xl sm:text-3xl font-bold text-[#FF4DA6] tabular-nums mt-1">
            {favorites.length}
          </p>
        </div>
        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#201148] border border-violet-200 dark:border-violet-300/15">
          <p className="text-xs text-slate-500 dark:text-violet-200/75">Owned Cards</p>
          <p className="font-mono text-2xl sm:text-3xl font-bold text-[#170B35] dark:text-white tabular-nums mt-1">
            {ownedCount}
          </p>
        </div>
        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#201148] border border-violet-200 dark:border-violet-300/15">
          <p className="text-xs text-slate-500 dark:text-violet-200/75">Wishlist</p>
          <p className="font-mono text-2xl sm:text-3xl font-bold text-[#8B5CF6] dark:text-pink-300 tabular-nums mt-1">
            {wishlistCount}
          </p>
        </div>
        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#201148] border border-violet-200 dark:border-violet-300/15">
          <p className="text-xs text-slate-500 dark:text-violet-200/75">Quiz Results</p>
          <p className="font-mono text-2xl sm:text-3xl font-bold text-[#170B35] dark:text-violet-200 tabular-nums mt-1">
            {results.length}
          </p>
        </div>
      </div>

      {/* Saved Articles, Groups & Idols */}
      <section className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-[#201148] border border-violet-200 dark:border-violet-300/18 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-display text-xl font-bold text-[#170B35] dark:text-white flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-[#FF4DA6]" />
            <span>Saved Articles &amp; Favorite Artists</span>
          </h2>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => navigate('/idols')}
              className="min-h-[38px] px-3.5 py-1.5 rounded-xl bg-violet-100 dark:bg-white/10 hover:bg-violet-200 dark:hover:bg-white/15 text-xs font-semibold text-[#170B35] dark:text-white"
            >
              Browse Idols
            </button>
            <button
              type="button"
              onClick={() => navigate('/')}
              className="min-h-[38px] px-3.5 py-1.5 rounded-xl bg-violet-100 dark:bg-white/10 hover:bg-violet-200 dark:hover:bg-white/15 text-xs font-semibold text-[#170B35] dark:text-white"
            >
              Browse Stories
            </button>
          </div>
        </div>

        {favorites.length === 0 ? (
          <p className="text-sm text-slate-600 dark:text-violet-200/75 py-3">
            No saved favorites yet. Tap the heart or bookmark icon on any group, idol profile, or magazine article to save it here.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {favorites.map((fav) => (
              <div
                key={fav.id}
                className="p-4 rounded-2xl bg-violet-50/70 dark:bg-[#170B35]/85 border border-violet-200 dark:border-violet-300/15 flex items-center justify-between gap-3"
              >
                <button
                  type="button"
                  onClick={() => navigate(getFavPath(fav.itemType, fav.targetId))}
                  className="text-left min-w-0 flex-1 group"
                >
                  <p className="text-xs font-semibold text-[#8B5CF6] dark:text-pink-300 flex items-center gap-1.5 capitalize">
                    {fav.itemType === 'article' ? (
                      <Newspaper className="w-3.5 h-3.5" />
                    ) : fav.itemType === 'group' ? (
                      <Users className="w-3.5 h-3.5" />
                    ) : (
                      <Heart className="w-3.5 h-3.5" />
                    )}
                    <span>{fav.itemType}</span>
                  </p>
                  <p className="font-display text-sm font-bold text-[#170B35] dark:text-white truncate mt-1 group-hover:text-[#8B5CF6] dark:group-hover:text-pink-200">
                    {fav.label}
                  </p>
                </button>
                <button
                  type="button"
                  onClick={() => toggleFavorite(fav.itemType, fav.targetId, fav.label)}
                  title="Remove from favorites"
                  aria-label={`Remove ${fav.label}`}
                  className="min-h-[38px] min-w-[38px] rounded-xl bg-white dark:bg-white/8 hover:bg-rose-500/15 flex items-center justify-center text-slate-500 dark:text-violet-300 hover:text-rose-500 shrink-0"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Optional Account Profile Preferences */}
      {user && (
        <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-[#201148] border border-violet-200 dark:border-violet-300/18 space-y-4">
          <h2 className="font-display text-lg font-bold text-[#170B35] dark:text-white">
            Fandom Profile
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <select
              value={favGroup}
              onChange={(e) => setFavGroup(e.target.value)}
              aria-label="Favorite Group"
              className="min-h-[44px] px-3.5 py-2 rounded-xl bg-violet-50 dark:bg-[#170B35] border border-violet-200 dark:border-violet-300/20 text-sm text-[#170B35] dark:text-white"
            >
              {groups.map((g) => (
                <option key={g.id} value={g.name}>
                  {g.name} ({g.fandomName})
                </option>
              ))}
            </select>
            <input
              type="text"
              value={biasName}
              onChange={(e) => setBiasName(e.target.value)}
              placeholder="Ultimate Bias (optional)"
              aria-label="Ultimate Bias"
              className="min-h-[44px] px-3.5 py-2 rounded-xl bg-violet-50 dark:bg-[#170B35] border border-violet-200 dark:border-violet-300/20 text-sm text-[#170B35] dark:text-white placeholder:text-slate-400 dark:placeholder:text-violet-300/50"
            />
            <button
              type="button"
              onClick={() => updateProfilePrefs(favGroup, biasName)}
              className="min-h-[44px] px-4 py-2 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#FF4DA6] text-white text-sm font-semibold transition-all"
            >
              Save Profile
            </button>
          </div>
        </div>
      )}

      {/* Quick Photocard Add + Link to Full Tracker */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-[#201148] border border-violet-200 dark:border-violet-300/18 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-display text-xl font-bold text-[#170B35] dark:text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#8B5CF6] dark:text-pink-300" />
            <span>Photocard Binder</span>
          </h2>
          <button
            type="button"
            onClick={() => navigate('/tool/photocard-tracker')}
            className="min-h-[40px] px-4 py-2 rounded-xl bg-violet-100 dark:bg-white/10 hover:bg-violet-200 dark:hover:bg-white/15 text-xs font-semibold text-[#170B35] dark:text-white"
          >
            Open Full Photocard Tracker
          </button>
        </div>

        <form onSubmit={handleQuickAdd} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          <select
            value={quickIdolId}
            onChange={(e) => setQuickIdolId(e.target.value)}
            aria-label="Select Idol"
            className="min-h-[44px] px-3 py-2 rounded-xl bg-violet-50 dark:bg-[#170B35] border border-violet-200 dark:border-violet-300/20 text-sm text-[#170B35] dark:text-white"
          >
            {idols.map((idol) => (
              <option key={idol.id} value={idol.id}>
                {idol.stageName} ({idol.groupName})
              </option>
            ))}
          </select>
          <input
            type="text"
            required
            value={quickEra}
            onChange={(e) => setQuickEra(e.target.value)}
            placeholder="Album / Era (e.g. Golden)"
            className="min-h-[44px] px-3.5 py-2 rounded-xl bg-violet-50 dark:bg-[#170B35] border border-violet-200 dark:border-violet-300/20 text-sm text-[#170B35] dark:text-white placeholder:text-slate-400 dark:placeholder:text-violet-300/50"
          />
          <input
            type="text"
            required
            value={quickCard}
            onChange={(e) => setQuickCard(e.target.value)}
            placeholder="Card Title (e.g. Weverse POB)"
            className="min-h-[44px] px-3.5 py-2 rounded-xl bg-violet-50 dark:bg-[#170B35] border border-violet-200 dark:border-violet-300/20 text-sm text-[#170B35] dark:text-white placeholder:text-slate-400 dark:placeholder:text-violet-300/50"
          />
          <select
            value={quickStatus}
            onChange={(e) => setQuickStatus(e.target.value as 'owned' | 'wishlist')}
            aria-label="Status"
            className="min-h-[44px] px-3 py-2 rounded-xl bg-violet-50 dark:bg-[#170B35] border border-violet-200 dark:border-violet-300/20 text-sm text-[#170B35] dark:text-white"
          >
            <option value="owned">Owned</option>
            <option value="wishlist">Wishlist</option>
          </select>
          <button
            type="submit"
            className="min-h-[44px] px-4 py-2 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#FF4DA6] text-white text-sm font-semibold flex items-center justify-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Add Card</span>
          </button>
        </form>

        {photocards.length === 0 ? (
          <p className="text-sm text-slate-600 dark:text-violet-200/70 py-4">
            No photocards saved yet. Add your first album pull or wishlist card above.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {photocards.map((card) => (
              <div
                key={card.id}
                className="p-4 rounded-2xl bg-violet-50/70 dark:bg-[#170B35]/85 border border-violet-200 dark:border-violet-300/15 flex items-start justify-between gap-3"
              >
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-[#8B5CF6] dark:text-pink-300">
                    {card.groupName} · {card.albumEra}
                  </p>
                  <p className="font-display text-base font-bold text-[#170B35] dark:text-white truncate mt-0.5">
                    {card.idolName} — {card.cardTitle}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-violet-200/75 mt-1">
                    {card.status === 'owned' ? 'Owned in Binder' : 'On Wishlist'}
                  </p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    onClick={() =>
                      togglePhotocardStatus(card.id, card.status === 'owned' ? 'wishlist' : 'owned')
                    }
                    title={card.status === 'owned' ? 'Move to Wishlist' : 'Mark Owned'}
                    className="min-h-[40px] min-w-[40px] rounded-xl bg-white dark:bg-white/8 hover:bg-violet-100 dark:hover:bg-white/15 flex items-center justify-center text-[#170B35] dark:text-violet-100"
                  >
                    {card.status === 'owned' ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <Heart className="w-4 h-4 text-[#FF4DA6]" />
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => removePhotocard(card.id)}
                    title="Delete Card"
                    className="min-h-[40px] min-w-[40px] rounded-xl bg-white dark:bg-white/6 hover:bg-rose-500/20 flex items-center justify-center text-slate-500 dark:text-violet-300 hover:text-rose-500"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Saved Quiz Results */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-[#201148] border border-violet-200 dark:border-violet-300/18 space-y-4">
        <h2 className="font-display text-xl font-bold text-[#170B35] dark:text-white flex items-center gap-2">
          <Trophy className="w-5 h-5 text-[#8B5CF6] dark:text-violet-300" />
          <span>Recent Quiz Results</span>
        </h2>

        {results.length === 0 ? (
          <div className="py-4 space-y-3">
            <p className="text-sm text-slate-600 dark:text-violet-200/75">
              Complete any quiz to save your archetypes and high scores here.
            </p>
            <button
              type="button"
              onClick={() => navigate('/quiz/fan-dna')}
              className="min-h-[44px] px-4 py-2 rounded-xl bg-violet-100 dark:bg-white/10 hover:bg-violet-200 dark:hover:bg-white/15 text-xs font-semibold text-[#170B35] dark:text-white"
            >
              Start Fan DNA Quiz
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {results.map((res) => (
              <div
                key={res.id}
                className="p-4 rounded-2xl bg-violet-50/70 dark:bg-[#170B35]/85 border border-violet-200 dark:border-violet-300/15 flex flex-col justify-between gap-2"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold text-[#8B5CF6] dark:text-pink-300">
                      {res.quizTitle}
                    </p>
                    <p className="font-display text-lg font-bold text-[#170B35] dark:text-white mt-0.5">
                      {res.archetypeTitle}
                    </p>
                  </div>
                  <span className="font-mono text-xs font-bold text-[#170B35] dark:text-violet-200 tabular-nums shrink-0">
                    {res.score}/{res.maxScore}
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-violet-200/80 leading-relaxed">
                  {res.summary}
                </p>
                <div className="flex items-center justify-between pt-2 text-[11px] text-slate-500 dark:text-violet-300/65">
                  <span>{new Date(res.createdAtIso).toLocaleDateString()}</span>
                  <button
                    type="button"
                    onClick={() => navigate(`/quiz/${res.quizSlug}`)}
                    className="text-[#8B5CF6] dark:text-pink-300 hover:underline font-semibold"
                  >
                    Play Again
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
