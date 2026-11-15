export interface AgeBreakdown {
  years: number;
  months: number;
  days: number;
  totalDaysAlive: number;
  koreanTraditionalAge: number; // Historical pre-June 2023 reference only
  daysUntilNextBirthday: number;
  isBirthdayToday: boolean;
  nextBirthdayDateIso: string;
  turningAge: number;
}

export interface CountdownParts {
  totalMs: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isToday: boolean;
  isPast: boolean;
}

export function getKstNowParts(now: Date = new Date()) {
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
  const parts = formatter.formatToParts(now);
  const get = (type: string) => Number(parts.find((p) => p.type === type)?.value ?? 0);
  return {
    year: get('year'),
    month: get('month'),
    day: get('day'),
    hour: get('hour') === 24 ? 0 : get('hour'),
    minute: get('minute'),
    second: get('second'),
  };
}

export function calculateIdolAge(birthdayIso: string, now: Date = new Date()): AgeBreakdown {
  const [bYear, bMonth, bDay] = birthdayIso.split('-').map(Number);
  const kst = getKstNowParts(now);

  let years = kst.year - bYear;
  let months = kst.month - bMonth;
  let days = kst.day - bDay;

  if (days < 0) {
    months -= 1;
    const prevMonthLastDay = new Date(Date.UTC(kst.year, kst.month - 1, 0)).getUTCDate();
    days += prevMonthLastDay;
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }

  const todayUtc = Date.UTC(kst.year, kst.month - 1, kst.day);
  const birthUtc = Date.UTC(bYear, bMonth - 1, bDay);
  const totalDaysAlive = Math.max(0, Math.floor((todayUtc - birthUtc) / 86400000));

  const isBirthdayToday = kst.month === bMonth && kst.day === bDay;

  let nextYear = kst.year;
  if (!isBirthdayToday) {
    if (kst.month > bMonth || (kst.month === bMonth && kst.day > bDay)) {
      nextYear += 1;
    }
  }
  const nextBdayUtc = Date.UTC(nextYear, bMonth - 1, bDay);
  const daysUntilNextBirthday = isBirthdayToday
    ? 0
    : Math.max(0, Math.ceil((nextBdayUtc - todayUtc) / 86400000));

  const nextBirthdayDateIso = `${nextYear}-${String(bMonth).padStart(2, '0')}-${String(bDay).padStart(2, '0')}`;
  const turningAge = isBirthdayToday ? years : nextYear - bYear;
  const koreanTraditionalAge = kst.year - bYear + 1;

  return {
    years,
    months,
    days,
    totalDaysAlive,
    koreanTraditionalAge,
    daysUntilNextBirthday,
    isBirthdayToday,
    nextBirthdayDateIso,
    turningAge,
  };
}

export function calculateAgeAtDate(birthdayIso: string, targetIso: string): number {
  const [bYear, bMonth, bDay] = birthdayIso.split('-').map(Number);
  const [tYear, tMonth, tDay] = targetIso.split('-').map(Number);
  let age = tYear - bYear;
  if (tMonth < bMonth || (tMonth === bMonth && tDay < bDay)) {
    age -= 1;
  }
  return age;
}

export interface BirthdayComparison {
  relation: 'idol-older' | 'fan-older' | 'same-day';
  years: number;
  months: number;
  days: number;
  totalDays: number;
  idolLine: string;
  fanLine: string;
  sameYearPeer: boolean;
}

export function compareBirthdays(
  idolBirthdayIso: string,
  fanBirthdayIso: string
): BirthdayComparison {
  const [iY, iM, iD] = idolBirthdayIso.split('-').map(Number);
  const [fY, fM, fD] = fanBirthdayIso.split('-').map(Number);

  const idolUtc = Date.UTC(iY, iM - 1, iD);
  const fanUtc = Date.UTC(fY, fM - 1, fD);

  const idolLine = `'${String(iY).slice(-2)} line`;
  const fanLine = `'${String(fY).slice(-2)} line`;
  const sameYearPeer = iY === fY;

  if (idolUtc === fanUtc) {
    return {
      relation: 'same-day',
      years: 0,
      months: 0,
      days: 0,
      totalDays: 0,
      idolLine,
      fanLine,
      sameYearPeer: true,
    };
  }

  const idolIsOlder = idolUtc < fanUtc;
  const [eY, eM, eD] = idolIsOlder ? [iY, iM, iD] : [fY, fM, fD];
  const [lY, lM, lD] = idolIsOlder ? [fY, fM, fD] : [iY, iM, iD];

  let years = lY - eY;
  let months = lM - eM;
  let days = lD - eD;

  if (days < 0) {
    months -= 1;
    const prevMonthLastDay = new Date(Date.UTC(lY, lM - 1, 0)).getUTCDate();
    days += prevMonthLastDay;
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }

  const totalDays = Math.abs(Math.round((fanUtc - idolUtc) / 86400000));

  return {
    relation: idolIsOlder ? 'idol-older' : 'fan-older',
    years,
    months,
    days,
    totalDays,
    idolLine,
    fanLine,
    sameYearPeer,
  };
}

export function getNextBirthdayKstCountdown(birthdayIso: string, now: Date = new Date()): CountdownParts {
  const [, bMonth, bDay] = birthdayIso.split('-').map(Number);
  const kst = getKstNowParts(now);

  if (kst.month === bMonth && kst.day === bDay) {
    return {
      totalMs: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isToday: true,
      isPast: false,
    };
  }

  let targetYear = kst.year;
  if (kst.month > bMonth || (kst.month === bMonth && kst.day > bDay)) {
    targetYear += 1;
  }
  // Midnight KST is UTC+9 -> subtract 9 hours in UTC
  const targetUtcMs = Date.UTC(targetYear, bMonth - 1, bDay, 0, 0, 0) - 9 * 3600 * 1000;
  const diff = Math.max(0, targetUtcMs - now.getTime());

  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);

  return {
    totalMs: diff,
    days,
    hours,
    minutes,
    seconds,
    isToday: false,
    isPast: false,
  };
}

export function kstDateTimeToUtcMs(dateIso: string, kstTime: string): number {
  const [year, month, day] = dateIso.split('-').map(Number);
  const [hour, minute] = kstTime.split(':').map(Number);
  return Date.UTC(year, (month || 1) - 1, day || 1, hour || 0, minute || 0, 0) - 9 * 3600 * 1000;
}

export function getCountdownToKstEvent(dateIso: string, kstTime: string, now: Date = new Date()): CountdownParts {
  const targetUtcMs = kstDateTimeToUtcMs(dateIso, kstTime);
  const diff = targetUtcMs - now.getTime();
  if (diff <= 0) {
    const abs = Math.abs(diff);
    return {
      totalMs: diff,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isToday: abs < 86400000,
      isPast: true,
    };
  }

  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);

  return {
    totalMs: diff,
    days,
    hours,
    minutes,
    seconds,
    isToday: days === 0,
    isPast: false,
  };
}

export function formatInTimezone(utcMs: number, timeZone: string): {
  dateLabel: string;
  timeLabel: string;
  dayName: string;
} {
  const d = new Date(utcMs);
  const dateLabel = new Intl.DateTimeFormat('en-US', {
    timeZone,
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(d);
  const timeLabel = new Intl.DateTimeFormat('en-US', {
    timeZone,
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }).format(d);
  const dayName = new Intl.DateTimeFormat('en-US', {
    timeZone,
    weekday: 'short',
  }).format(d);
  return { dateLabel, timeLabel, dayName };
}

export function downloadIcsEvent(title: string, dateIso: string, kstTime: string, description: string): void {
  const startMs = kstDateTimeToUtcMs(dateIso, kstTime);
  const endMs = startMs + 3600 * 1000;
  const toIcsDate = (ms: number) =>
    new Date(ms).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//IdolOrbit Fan Lab//KST Event//EN',
    'BEGIN:VEVENT',
    `UID:${Date.now()}@idoloribt.app`,
    `DTSTAMP:${toIcsDate(Date.now())}`,
    `DTSTART:${toIcsDate(startMs)}`,
    `DTEND:${toIcsDate(endMs)}`,
    `SUMMARY:${title.replace(/\n/g, ' ')}`,
    `DESCRIPTION:${description.replace(/\n/g, ' ')}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.ics`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
