// شاشة اللعب الرئيسية
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Volume2, RotateCcw, Home, Star } from 'lucide-react';
import { LEVELS, LEVEL_OPTIONS, WordItem } from '../data/words';
import { generateOptions, shuffle } from '../utils/helpers';
import { audioManager } from '../audio/AudioManager';
import WordDisplay from './WordDisplay';
import LetterOptions from './LetterOptions';
import ProgressBar from './ProgressBar';
import Confetti from './Confetti';
import Stars from './Stars';

interface Props {
  level: number;
  onFinish: (stats: { score: number; correct: number; wrong: number }) => void;
  onHome: () => void;
  soundOn: boolean;
}

export default function GameScreen({ level, onFinish, onHome, soundOn }: Props) {
  // قائمة الكلمات مخلوطة لهذا المستوى
  const words = useMemo<WordItem[]>(() => shuffle(LEVELS[level]), [level]);
  const optionsCount = LEVEL_OPTIONS[level];

  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [stars, setStars] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);

  const current = words[index];

  // الحروف المُدخلة في المواضع الناقصة
  const [filled, setFilled] = useState<Record<number, string>>({});
  // اختيارات الحروف الحالية
  const [options, setOptions] = useState<string[]>([]);
  // حالات أزرار الاختيار
  const [btnStates, setBtnStates] = useState<Record<number, 'correct' | 'wrong' | null>>({});
  const [disabledBtns, setDisabledBtns] = useState<number[]>([]);

  const [showConfetti, setShowConfetti] = useState(false);
  const [showStars, setShowStars] = useState(false);
  const [starsKey, setStarsKey] = useState(0);

  const advanceTimer = useRef<number | null>(null);
  // قفل لمنع النقر أثناء الانتقال
  const lockedRef = useRef(false);

  // إعداد سؤال جديد
  useEffect(() => {
    if (!current) return;
    const correctLetters = current.missingIndices.map((mi) => current.letters[mi]);
    setOptions(generateOptions(correctLetters, optionsCount));
    setFilled({});
    setBtnStates({});
    setDisabledBtns([]);
    setShowConfetti(false);
    setShowStars(false);
    lockedRef.current = false;

    // نطق الكلمة عند ظهور سؤال جديد (تلميح للطفل)
    const t = window.setTimeout(() => {
      audioManager.speak(current.pronunciation);
    }, 500);
    return () => window.clearTimeout(t);
  }, [index, current, optionsCount]);

  // تنظيف المؤقت
  useEffect(() => {
    return () => {
      if (advanceTimer.current) window.clearTimeout(advanceTimer.current);
    };
  }, []);

  // ترتيب المواضع الناقصة من اليمين إلى اليسار (اتجاه القراءة العربية)
  // في الكلمة العربية الحرف ذو index الأصغر يُكتب على اليمين،
  // لذا نملأ من الأصغر (اليمين) إلى الأكبر (اليسار)
  const orderedMissing = useMemo(() => {
    if (!current) return [];
    return [...current.missingIndices].sort((a, b) => a - b);
  }, [current]);

  // الفهرس الناقص النشط (أول موضع غير مملوء من جهة اليمين)
  const activeIndex = useMemo(() => {
    const next = orderedMissing.find((mi) => !filled[mi]);
    return next ?? null;
  }, [orderedMissing, filled]);

  const handleSelect = (letter: string, btnIndex: number) => {
    if (!current || lockedRef.current) return;

    // إعادة حساب الموضع النشط لحظياً (من اليمين إلى اليسار - اتجاه القراءة العربية)
    const ordered = [...current.missingIndices].sort((a, b) => a - b);
    const currentActiveIndex = ordered.find((mi) => !filled[mi]);
    if (currentActiveIndex === undefined) return;

    const expected = current.letters[currentActiveIndex];

    if (letter === expected) {
      // إجابة صحيحة
      audioManager.playSuccess();
      const newFilled = { ...filled, [currentActiveIndex]: letter };
      setFilled(newFilled);
      setBtnStates((s) => ({ ...s, [btnIndex]: 'correct' }));
      setDisabledBtns((d) => [...d, btnIndex]);

      // تأثير النجوم
      setShowStars(true);
      setStarsKey((k) => k + 1);

      // هل اكتملت الكلمة؟
      const allFilled = current.missingIndices.every((mi) => newFilled[mi]);
      if (allFilled) {
        // قفل الإدخال أثناء الاحتفال والانتقال
        lockedRef.current = true;
        // الكلمة كاملة
        setShowConfetti(true);
        const gained = 10;
        const newScore = score + gained;
        setScore(newScore);
        setStars((s) => s + 1);
        setCorrectCount((c) => c + 1);

        // نطق الكلمة بعد الاكتمال
        window.setTimeout(() => audioManager.speak(current.pronunciation), 400);

        // الانتقال للكلمة التالية أو الإنهاء
        advanceTimer.current = window.setTimeout(() => {
          if (index + 1 >= words.length) {
            onFinish({
              score: newScore,
              correct: correctCount + 1,
              wrong: wrongCount,
            });
          } else {
            setIndex((i) => i + 1);
          }
        }, 1800);
      } else {
        // إعادة تعيين حالات الأزرار غير الصحيحة لإتاحة الحرف التالي
        window.setTimeout(() => {
          setBtnStates((s) => {
            const ns: Record<number, 'correct' | 'wrong' | null> = {};
            Object.keys(s).forEach((k) => {
              const ki = Number(k);
              ns[ki] = s[ki] === 'correct' ? 'correct' : null;
            });
            return ns;
          });
        }, 400);
      }
    } else {
      // إجابة خاطئة
      audioManager.playError();
      setWrongCount((w) => w + 1);
      setScore((s) => Math.max(0, s - 2));
      setBtnStates((s) => ({ ...s, [btnIndex]: 'wrong' }));

      // إزالة حالة الخطأ بعد لحظة
      window.setTimeout(() => {
        setBtnStates((s) => ({ ...s, [btnIndex]: null }));
      }, 600);
    }
  };

  const replayPronunciation = () => {
    audioManager.unlock();
    if (current) audioManager.speak(current.pronunciation);
  };

  if (!current) return null;

  return (
    <div className="relative flex flex-col flex-1 min-h-0 p-3 sm:p-4 lg:p-5 overflow-hidden">
      <Confetti show={showConfetti} />

      {/* الشريط العلوي */}
      <div className="mb-2 shrink-0">
        <div className="flex items-center justify-between gap-3 mb-2">
          <button
            onClick={onHome}
            className="bg-white/90 hover:bg-white text-purple-700 rounded-full p-2 shadow-md transition-transform hover:scale-110 active:scale-95"
            aria-label="الرئيسية"
          >
            <Home size={22} />
          </button>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 bg-white/90 rounded-full px-3 py-1.5 shadow-md">
              <Star size={20} className="text-yellow-500" fill="currentColor" />
              <span className="font-extrabold text-purple-800 text-lg">{stars}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/90 rounded-full px-3 py-1.5 shadow-md">
              <span className="font-bold text-purple-600 text-sm">النقاط</span>
              <span className="font-extrabold text-purple-800 text-lg">{score}</span>
            </div>
          </div>
        </div>
        <ProgressBar current={index} total={words.length} />
      </div>

      {/* منطقة الصورة */}
      <div className="flex-1 min-h-0 flex flex-col items-center justify-around gap-2">
        <div className="relative shrink-0">
          <Stars show={showStars} originKey={starsKey} />
          <div className="bg-white rounded-2xl p-1.5 sm:p-2 shadow-2xl border-4 border-white/60">
            <img
              src={current.image}
              alt={current.word}
              className="h-[15vh] sm:h-[17vh] lg:h-[19vh] w-auto object-contain"
              draggable={false}
            />
          </div>
          {/* زر إعادة نطق الكلمة */}
          <button
            onClick={replayPronunciation}
            className="absolute -bottom-3 -left-3 bg-amber-400 hover:bg-amber-500 text-white rounded-full p-2.5 shadow-lg transition-transform hover:scale-110 active:scale-95"
            aria-label="نطق الكلمة"
          >
            <Volume2 size={24} />
          </button>
        </div>

        {/* الكلمة بالحروف الناقصة */}
        <div className="bg-white/40 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-lg shrink-0">
          <WordDisplay
            letters={current.letters}
            filled={filled}
            missingIndices={current.missingIndices}
            activeIndex={activeIndex}
          />
        </div>

        {/* اختيارات الحروف */}
        <div className="shrink-0">
          <p className="text-white text-center font-bold mb-1.5 text-sm sm:text-base">
            انقر على الحرف الصحيح ليملأ الفراغ 👇
          </p>
          <LetterOptions
            options={options}
            onSelect={handleSelect}
            states={btnStates}
            disabledIndices={disabledBtns}
          />
        </div>
      </div>
    </div>
  );
}
