import { useMemo, useState } from 'react';
import { CheckCircle2, Heart, Plus, Search, Trash2 } from 'lucide-react';
import { KPOP_GROUPS, KPOP_IDOLS } from '../data/kpopData';
import { useOrbit } from '../context/OrbitContext';
import { PhotocardStatus } from '../types/kpop';

export function PhotocardTrackerPage() {
  const { photocards, addPhotocard, togglePhotocardStatus, removePhotocard } = useOrbit();
  const [search, setSearch] = useState('');
  const [groupFilter, setGroupFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState<'all' | PhotocardStatus>('all');

  const [idolId, setIdolId] = useState(KPOP_IDOLS[0].id);
  const [albumEra, setAlbumEra] = useState('');
  const [cardTitle, setCardTitle] = useState('');
  const [status, setStatus] = useState<PhotocardStatus>('owned');
  const [notes, setNotes] = useState('');

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return photocards.filter((card) => {
      if (statusFilter !== 'all' && card.status !== statusFilter) return false;
      if (groupFilter !== 'all' && card.groupName.toLowerCase() !== groupFilter.toLowerCase()) {
        return false;
      }
      if (!q) return true;
      return (
        card.idolName.toLowerCase().includes(q) ||
        card.groupName.toLowerCase().includes(q) ||
        card.albumEra.toLowerCase().includes(q) ||
        card.cardTitle.toLowerCase().includes(q)
      );
    });
  }, [photocards, statusFilter, groupFilter, search]);

  const ownedCount = photocards.filter((c) => c.status === 'owned').length;
  const wishlistCount = photocards.filter((c) => c.status === 'wishlist').length;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const idol = KPOP_IDOLS.find((i) => i.id === idolId) || KPOP_IDOLS[0];
    if (!albumEra.trim() || !cardTitle.trim()) return;
    await addPhotocard({
      idolId: idol.id,
      idolName: idol.stageName,
      groupName: idol.groupName,
      albumEra: albumEra.trim(),
      cardTitle: cardTitle.trim(),
      status,
      notes: notes.trim() || undefined,
    });
    setAlbumEra('');
    setCardTitle('');
    setNotes('');
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="space-y-2">
        <p className="text-xs font-semibold text-pink-300">
          Binder Inventory · Owned &amp; Wishlist Sync
        </p>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
          Photocard Tracker
        </h1>
        <p className="text-sm text-violet-200/80 max-w-2xl">
          Organize your album pulls, pre-order benefits (POBs), and wishlist targets across all fandoms.
        </p>
      </div>

      {/* Add Card Form */}
      <form
        onSubmit={handleSubmit}
        className="rounded-3xl bg-[#201148] border border-violet-300/20 p-5 sm:p-6 space-y-4"
      >
        <p className="text-sm font-semibold text-white flex items-center gap-2">
          <Plus className="w-4 h-4 text-pink-300" />
          <span>Add Photocard to Binder</span>
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <select
            value={idolId}
            onChange={(e) => setIdolId(e.target.value)}
            aria-label="Idol"
            className="min-h-[44px] px-3.5 py-2 rounded-xl bg-[#170B35] border border-violet-300/20 text-sm text-white"
          >
            {KPOP_IDOLS.map((i) => (
              <option key={i.id} value={i.id}>
                {i.stageName} ({i.groupName})
              </option>
            ))}
          </select>
          <input
            type="text"
            required
            value={albumEra}
            onChange={(e) => setAlbumEra(e.target.value)}
            placeholder="Album / Era (e.g. ATE, Super Real Me)"
            className="min-h-[44px] px-3.5 py-2 rounded-xl bg-[#170B35] border border-violet-300/20 text-sm text-white placeholder:text-violet-300/50"
          />
          <input
            type="text"
            required
            value={cardTitle}
            onChange={(e) => setCardTitle(e.target.value)}
            placeholder="Version / POB (e.g. Target Exclusive)"
            className="min-h-[44px] px-3.5 py-2 rounded-xl bg-[#170B35] border border-violet-300/20 text-sm text-white placeholder:text-violet-300/50"
          />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as PhotocardStatus)}
            aria-label="Card Status"
            className="min-h-[44px] px-3.5 py-2 rounded-xl bg-[#170B35] border border-violet-300/20 text-sm text-white"
          >
            <option value="owned">Owned</option>
            <option value="wishlist">Wishlist</option>
          </select>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Optional notes (binder page, trade status, sleeve size)"
            className="flex-1 min-h-[44px] px-3.5 py-2 rounded-xl bg-[#170B35] border border-violet-300/20 text-sm text-white placeholder:text-violet-300/50"
          />
          <button
            type="submit"
            className="min-h-[44px] px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#FF4DA6] text-white text-sm font-semibold shrink-0"
          >
            Save Photocard
          </button>
        </div>
      </form>

      {/* Filter Bar */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-violet-300 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search binder by idol, album, or card..."
            className="w-full min-h-[44px] pl-11 pr-4 py-2 rounded-2xl bg-[#201148] border border-violet-300/20 text-sm text-white placeholder:text-violet-300/50"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={groupFilter}
            onChange={(e) => setGroupFilter(e.target.value)}
            aria-label="Filter by group"
            className="min-h-[42px] px-3.5 py-2 rounded-xl bg-[#201148] border border-violet-300/20 text-xs font-semibold text-white"
          >
            <option value="all">All Groups</option>
            {KPOP_GROUPS.map((g) => (
              <option key={g.id} value={g.name}>
                {g.name}
              </option>
            ))}
          </select>

          <div className="flex items-center gap-1 p-1 rounded-xl bg-[#201148] border border-violet-300/15">
            {[
              { id: 'all', label: `All (${photocards.length})` },
              { id: 'owned', label: `Owned (${ownedCount})` },
              { id: 'wishlist', label: `Wishlist (${wishlistCount})` },
            ].map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setStatusFilter(s.id as 'all' | PhotocardStatus)}
                className={`min-h-[36px] px-3 py-1.5 rounded-lg text-xs font-semibold ${
                  statusFilter === s.id
                    ? 'bg-gradient-to-r from-[#8B5CF6] to-[#FF4DA6] text-white'
                    : 'text-violet-200/80 hover:text-white'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Cards Grid */}
      {filtered.length === 0 ? (
        <div className="rounded-3xl bg-[#201148] border border-violet-300/15 p-10 text-center space-y-2">
          <p className="font-display text-lg font-bold text-white">Your binder view is empty</p>
          <p className="text-sm text-violet-200/75">
            Add photocards above to start tracking your owned pulls and wishlist goals.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((card) => (
            <div
              key={card.id}
              className="p-5 rounded-3xl bg-[#201148] border border-violet-300/16 flex flex-col justify-between gap-4"
            >
              <div>
                <div className="flex items-center justify-between gap-2 text-xs">
                  <span className="font-semibold text-pink-300">{card.groupName}</span>
                  <span
                    className={`font-semibold ${
                      card.status === 'owned' ? 'text-emerald-300' : 'text-violet-200'
                    }`}
                  >
                    {card.status === 'owned' ? 'Owned' : 'Wishlist'}
                  </span>
                </div>
                <h2 className="font-display text-xl font-bold text-white mt-1">
                  {card.idolName}
                </h2>
                <p className="text-sm text-violet-100 mt-0.5">
                  {card.albumEra} · {card.cardTitle}
                </p>
                {card.notes && (
                  <p className="text-xs text-violet-300/75 mt-2">{card.notes}</p>
                )}
              </div>

              <div className="flex items-center justify-between gap-2 pt-3 border-t border-violet-300/12">
                <button
                  type="button"
                  onClick={() =>
                    togglePhotocardStatus(card.id, card.status === 'owned' ? 'wishlist' : 'owned')
                  }
                  className="min-h-[40px] px-3.5 py-2 rounded-xl bg-white/8 hover:bg-white/14 text-xs font-semibold text-white flex items-center gap-1.5"
                >
                  {card.status === 'owned' ? (
                    <>
                      <Heart className="w-3.5 h-3.5 text-pink-300" />
                      <span>Move to Wishlist</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Mark Owned</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => removePhotocard(card.id)}
                  className="min-h-[40px] min-w-[40px] rounded-xl bg-white/6 hover:bg-rose-500/20 text-violet-300 hover:text-rose-300 flex items-center justify-center"
                  title="Delete Photocard"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
