// عرض الكلمة بالحروف العربية المتصلة بشكل صحيح
// نعرض الكلمة كاملة كنص واحد متصل، مع إبراز موضع الحرف الناقص
import React from 'react';

interface Props {
  letters: string[];
  // خريطة: index الحرف الناقص => الحرف المُدخل (إن وجد)
  filled: Record<number, string>;
  missingIndices: number[];
  // الفهرس النشط حالياً للتعبئة
  activeIndex: number | null;
}

// نبني نص الكلمة المعروض: الحروف الموجودة + المُدخلة + شرطة سفلية للناقص
export default function WordDisplay({ letters, filled, missingIndices, activeIndex }: Props) {
  // نعرض المواضع الناقصة دائماً كفراغ (◌) في نص الكلمة المتصل،
  // حتى لا تتكرر الحروف المختارة فوق المربعات. الحروف تظهر داخل المربعات فقط.
  return (
    <div className="flex flex-col items-center gap-2" dir="rtl">
      {/* الكلمة كاملة متصلة بشكل عربي صحيح */}
      <div
        className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-purple-900 tracking-wide"
        style={{ direction: 'rtl', unicodeBidi: 'plaintext' }}
      >
        {letters.map((ch, i) => {
          const isMissing = missingIndices.includes(i);
          const isActive = activeIndex === i;

          if (!isMissing) {
            // حرف موجود - يُعرض عادياً ضمن الكلمة المتصلة
            return (
              <span key={i} className="text-purple-900">
                {ch}
              </span>
            );
          }

          // حرف ناقص - يبقى فراغاً (◌) دائماً ولا يُملأ بالحرف المختار
          // (الحرف المختار يظهر داخل المربع المخصص أسفل الكلمة فقط)
          return (
            <span
              key={i}
              className={`inline-block px-1 rounded-lg transition-all duration-300 ${
                isActive ? 'text-yellow-600 animate-pulse' : 'text-purple-300'
              }`}
            >
              ◌
            </span>
          );
        })}
      </div>

      {/* صناديق المواضع الناقصة بشكل واضح أسفل الكلمة - من اليمين إلى اليسار */}
      {/* dir=rtl يضمن أن أول صندوق (أصغر index) يظهر على أقصى اليمين */}
      <div className="flex flex-row items-center gap-1.5 flex-wrap justify-center" dir="rtl">
        {[...missingIndices].sort((a, b) => a - b).map((mi) => {
          const filledLetter = filled[mi];
          const isActive = activeIndex === mi && !filledLetter;
          return (
            <div key={mi} className="flex flex-col items-center gap-0.5">
              <span
                className={`inline-flex items-center justify-center w-11 h-11 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-xl border-4 border-dashed text-3xl sm:text-4xl lg:text-5xl font-extrabold transition-all duration-300 ${
                  filledLetter
                    ? 'bg-green-400 border-green-500 text-white scale-110'
                    : isActive
                    ? 'bg-yellow-100 border-yellow-400 text-yellow-700 animate-pulse'
                    : 'bg-white/70 border-purple-300 text-purple-400'
                }`}
              >
                {filledLetter || '؟'}
              </span>
              {isActive && (
                <span className="text-[10px] sm:text-xs font-bold text-purple-700 animate-bounce">
                  هنا 👆
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
