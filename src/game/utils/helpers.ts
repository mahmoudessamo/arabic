// دوال مساعدة عامة

import { ARABIC_LETTERS } from '../data/words';

// خلط مصفوفة بترتيب عشوائي (Fisher-Yates)
export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// توليد اختيارات الحروف: الحروف الصحيحة + حروف خاطئة عشوائية
export function generateOptions(correctLetters: string[], total: number): string[] {
  const correctSet = new Set(correctLetters);
  const options = [...correctSet];

  // إضافة حروف خاطئة حتى نصل للعدد المطلوب
  const pool = ARABIC_LETTERS.filter((l) => !correctSet.has(l));
  const shuffledPool = shuffle(pool);

  let idx = 0;
  while (options.length < total && idx < shuffledPool.length) {
    options.push(shuffledPool[idx]);
    idx++;
  }

  return shuffle(options);
}
