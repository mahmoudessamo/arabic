// حفظ أعلى نتيجة محلياً

const KEY = 'akmel_alkalima_best';

export function getBestScore(): number {
  try {
    return Number(localStorage.getItem(KEY) || 0);
  } catch {
    return 0;
  }
}

export function setBestScore(score: number) {
  try {
    const best = getBestScore();
    if (score > best) localStorage.setItem(KEY, String(score));
  } catch {
    // تجاهل
  }
}
