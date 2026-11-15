import { useEffect, useState } from 'react';
import { KPOP_GROUPS } from '../data/kpopData';
import { getIdolPhotoUrl } from '../data/realPhotos';
import { Idol } from '../types/kpop';

interface IdolAvatarBadgeProps {
  idol: Idol;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function IdolAvatarBadge({ idol, size = 'md' }: IdolAvatarBadgeProps) {
  const group = KPOP_GROUPS.find((g) => g.id === idol.groupId);
  const accent = group?.accentHex ?? '#8B5CF6';
  const secondary = group?.secondaryHex ?? '#FF4DA6';
  const photoUrl = getIdolPhotoUrl(idol.id, idol.photoUrl);
  const [imgFailed, setImgFailed] = useState(false);

  useEffect(() => {
    setImgFailed(false);
  }, [photoUrl]);

  const dims =
    size === 'sm'
      ? 'w-11 h-11 text-sm rounded-xl'
      : size === 'xl'
        ? 'w-28 h-28 text-3xl rounded-3xl'
        : size === 'lg'
          ? 'w-20 h-20 text-2xl rounded-2xl'
          : 'w-14 h-14 text-base rounded-2xl';

  const initials = idol.stageName.slice(0, 2).toUpperCase();

  return (
    <div
      className={`${dims} shrink-0 flex flex-col items-center justify-center font-display font-extrabold text-white relative overflow-hidden border border-violet-200/40 dark:border-white/20 shadow-md`}
      style={{
        background: `linear-gradient(135deg, ${accent} 0%, ${secondary} 100%)`,
      }}
    >
      {photoUrl && !imgFailed ? (
        <img
          src={photoUrl}
          alt={`${idol.stageName} of ${idol.groupName}`}
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={() => setImgFailed(true)}
          className="w-full h-full object-cover object-top"
        />
      ) : (
        <>
          <span className="leading-none drop-shadow">{initials}</span>
          <span className="text-[11px] leading-none mt-0.5 opacity-90">
            {idol.representativeEmoji}
          </span>
        </>
      )}
    </div>
  );
}
