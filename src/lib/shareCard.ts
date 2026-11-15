export interface ShareCardPayload {
  kicker: string;
  headline: string;
  subheadline: string;
  description: string;
  stats: Array<{ label: string; value: string }>;
  accentHex?: string;
  secondaryHex?: string;
  footerLabel?: string;
  entertainmentNotice?: boolean;
  square?: boolean;
}

function wrapLines(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  maxLines: number
): string[] {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let current = '';

  for (const word of words) {
    const test = current ? `${current} ${word}` : word;
    if (ctx.measureText(test).width <= maxWidth) {
      current = test;
    } else {
      if (current) lines.push(current);
      current = word;
      if (lines.length >= maxLines - 1) break;
    }
  }
  if (current && lines.length < maxLines) {
    lines.push(current);
  }
  return lines;
}

export function renderShareCardDataUrl(payload: ShareCardPayload): string {
  const width = 1080;
  const height = payload.square ? 1080 : 1920;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  const accent = payload.accentHex || '#8B5CF6';
  const secondary = payload.secondaryHex || '#FF4DA6';

  // Background deep midnight purple gradient
  const bgGrad = ctx.createLinearGradient(0, 0, width, height);
  bgGrad.addColorStop(0, '#12082A');
  bgGrad.addColorStop(0.5, '#1D0D45');
  bgGrad.addColorStop(1, '#140830');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // Radial atmospheric glow
  const glowTop = ctx.createRadialGradient(width * 0.82, height * 0.16, 40, width * 0.82, height * 0.16, 620);
  glowTop.addColorStop(0, `${secondary}55`);
  glowTop.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = glowTop;
  ctx.fillRect(0, 0, width, height);

  const glowBottom = ctx.createRadialGradient(width * 0.18, height * 0.78, 40, width * 0.18, height * 0.78, 680);
  glowBottom.addColorStop(0, `${accent}55`);
  glowBottom.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = glowBottom;
  ctx.fillRect(0, 0, width, height);

  // Subtle geometric orbital rings
  ctx.strokeStyle = 'rgba(233, 213, 255, 0.12)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(width * 0.5, height * 0.45, 430, 0, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = 'rgba(255, 77, 166, 0.16)';
  ctx.beginPath();
  ctx.arc(width * 0.5, height * 0.45, 340, 0, Math.PI * 2);
  ctx.stroke();

  // Four-point star accents
  const stars = [
    [160, 260, 14],
    [910, 320, 18],
    [220, height - 340, 12],
    [870, height - 280, 16],
    [540, 170, 10],
  ];
  ctx.fillStyle = 'rgba(245, 243, 255, 0.55)';
  for (const [sx, sy, sr] of stars) {
    ctx.beginPath();
    ctx.moveTo(sx, sy - sr);
    ctx.quadraticCurveTo(sx, sy, sx + sr, sy);
    ctx.quadraticCurveTo(sx, sy, sx, sy + sr);
    ctx.quadraticCurveTo(sx, sy, sx - sr, sy);
    ctx.quadraticCurveTo(sx, sy, sx, sy - sr);
    ctx.fill();
  }

  // Brand top mark
  ctx.fillStyle = '#E9D5FF';
  ctx.font = '700 32px Outfit, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('IDOLORBIT FAN LAB', width / 2, payload.square ? 96 : 140);

  // Main glass frame
  const padX = 88;
  const cardTop = payload.square ? 148 : 240;
  const cardH = payload.square ? 780 : 1360;
  const cardW = width - padX * 2;

  ctx.fillStyle = 'rgba(30, 16, 68, 0.78)';
  ctx.strokeStyle = 'rgba(196, 181, 253, 0.28)';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.roundRect(padX, cardTop, cardW, cardH, 40);
  ctx.fill();
  ctx.stroke();

  // Kicker
  ctx.fillStyle = secondary;
  ctx.font = '700 28px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(payload.kicker.toUpperCase(), width / 2, cardTop + 100);

  // Headline
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '800 68px Outfit, sans-serif';
  const headLines = wrapLines(ctx, payload.headline, cardW - 110, 3);
  let y = cardTop + 200;
  for (const line of headLines) {
    ctx.fillText(line, width / 2, y);
    y += 82;
  }

  // Subheadline
  ctx.fillStyle = '#C4B5FD';
  ctx.font = '600 34px "Plus Jakarta Sans", sans-serif';
  const subLines = wrapLines(ctx, payload.subheadline, cardW - 120, 2);
  y += 20;
  for (const line of subLines) {
    ctx.fillText(line, width / 2, y);
    y += 46;
  }

  // Divider
  ctx.strokeStyle = 'rgba(196, 181, 253, 0.2)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(padX + 80, y + 26);
  ctx.lineTo(width - padX - 80, y + 26);
  ctx.stroke();

  // Description
  y += 90;
  ctx.fillStyle = '#EDE9FE';
  ctx.font = '500 32px "Plus Jakarta Sans", sans-serif';
  const descLines = wrapLines(ctx, payload.description, cardW - 120, payload.square ? 3 : 5);
  for (const line of descLines) {
    ctx.fillText(line, width / 2, y);
    y += 48;
  }

  // Stats grid
  const stats = payload.stats.slice(0, 3);
  if (stats.length > 0) {
    const statY = cardTop + cardH - (payload.square ? 210 : 320);
    const boxW = (cardW - 120 - (stats.length - 1) * 24) / stats.length;
    stats.forEach((st, idx) => {
      const bx = padX + 60 + idx * (boxW + 24);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.06)';
      ctx.strokeStyle = 'rgba(196, 181, 253, 0.2)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect(bx, statY, boxW, 148, 22);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#FFFFFF';
      ctx.font = '700 40px "JetBrains Mono", monospace';
      ctx.fillText(st.value.slice(0, 12), bx + boxW / 2, statY + 68);

      ctx.fillStyle = '#C4B5FD';
      ctx.font = '600 22px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(st.label.slice(0, 18), bx + boxW / 2, statY + 112);
    });
  }

  if (payload.entertainmentNotice) {
    ctx.fillStyle = 'rgba(196, 181, 253, 0.72)';
    ctx.font = '500 22px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('Entertainment Personality Result · IdolOrbit Fan Lab', width / 2, cardTop + cardH - 54);
  }

  // Footer
  ctx.fillStyle = '#E9D5FF';
  ctx.font = '600 26px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(
    payload.footerLabel || 'Play & Compare at IdolOrbit Fan Lab',
    width / 2,
    height - (payload.square ? 58 : 140)
  );

  return canvas.toDataURL('image/png');
}

export function downloadDataUrl(dataUrl: string, filename: string): void {
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function buildShareUrls(shareUrl: string, shareText: string) {
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedText = encodeURIComponent(shareText);
  return {
    whatsapp: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
    x: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
  };
}
