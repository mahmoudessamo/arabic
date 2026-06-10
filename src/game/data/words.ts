// قاعدة بيانات الكلمات لكل مستوى
// كل كلمة: صورة، الكلمة كاملة، مواضع الحروف الناقصة (indices)

export interface WordItem {
  id: string;
  image: string;           // مسار الصورة
  word: string;            // الكلمة الكاملة بالحروف المنفصلة
  letters: string[];       // أحرف الكلمة كمصفوفة
  missingIndices: number[]; // مواضع الحروف الناقصة
  pronunciation: string;   // النطق للقراءة الصوتية
}

// تحويل النص إلى مصفوفة حروف (كل عنصر حرف عربي واحد)
const toLetters = (w: string): string[] => Array.from(w);

// المستوى الأول: حرف واحد ناقص من 3 اختيارات (كلمات قصيرة سهلة)
export const LEVEL_1: WordItem[] = [
  { id: 'apple', image: 'assets/sprites/apple.png', word: 'تفاحة', letters: toLetters('تفاحة'), missingIndices: [1], pronunciation: 'تُفّاحة' },
  { id: 'cat', image: 'assets/sprites/cat.png', word: 'قطة', letters: toLetters('قطة'), missingIndices: [1], pronunciation: 'قِطّة' },
  { id: 'ball', image: 'assets/sprites/ball.png', word: 'كرة', letters: toLetters('كرة'), missingIndices: [1], pronunciation: 'كُرة' },
  { id: 'sun', image: 'assets/sprites/sun.png', word: 'شمس', letters: toLetters('شمس'), missingIndices: [1], pronunciation: 'شَمس' },
  { id: 'fish', image: 'assets/sprites/fish.png', word: 'سمكة', letters: toLetters('سمكة'), missingIndices: [1], pronunciation: 'سَمكة' },
  { id: 'bird', image: 'assets/sprites/bird.png', word: 'طير', letters: toLetters('طير'), missingIndices: [1], pronunciation: 'طَير' },
  { id: 'duck', image: 'assets/sprites/duck.png', word: 'بطة', letters: toLetters('بطة'), missingIndices: [1], pronunciation: 'بَطّة' },
  { id: 'key', image: 'assets/sprites/key.png', word: 'مفتاح', letters: toLetters('مفتاح'), missingIndices: [1], pronunciation: 'مِفتاح' },
];

// المستوى الثاني: حرف واحد ناقص من 5 اختيارات
export const LEVEL_2: WordItem[] = [
  { id: 'book', image: 'assets/sprites/book.png', word: 'كتاب', letters: toLetters('كتاب'), missingIndices: [1], pronunciation: 'كِتاب' },
  { id: 'banana', image: 'assets/sprites/banana.png', word: 'موزة', letters: toLetters('موزة'), missingIndices: [1], pronunciation: 'مَوزة' },
  { id: 'tree', image: 'assets/sprites/tree.png', word: 'شجرة', letters: toLetters('شجرة'), missingIndices: [2], pronunciation: 'شَجرة' },
  { id: 'house', image: 'assets/sprites/house.png', word: 'منزل', letters: toLetters('منزل'), missingIndices: [2], pronunciation: 'مَنزِل' },
  { id: 'flower', image: 'assets/sprites/flower.png', word: 'وردة', letters: toLetters('وردة'), missingIndices: [1], pronunciation: 'وَردة' },
  { id: 'rabbit', image: 'assets/sprites/rabbit.png', word: 'أرنب', letters: toLetters('أرنب'), missingIndices: [2], pronunciation: 'أَرنَب' },
  { id: 'grape', image: 'assets/sprites/grape.png', word: 'عنب', letters: toLetters('عنب'), missingIndices: [1], pronunciation: 'عِنَب' },
  { id: 'carrot', image: 'assets/sprites/carrot.png', word: 'جزر', letters: toLetters('جزر'), missingIndices: [1], pronunciation: 'جَزَر' },
];

// المستوى الثالث: حرفان ناقصان (متوسط الصعوبة)
export const LEVEL_3: WordItem[] = [
  { id: 'car3', image: 'assets/sprites/car.png', word: 'سيارة', letters: toLetters('سيارة'), missingIndices: [1, 3], pronunciation: 'سَيّارة' },
  { id: 'apple3', image: 'assets/sprites/apple.png', word: 'تفاحة', letters: toLetters('تفاحة'), missingIndices: [1, 3], pronunciation: 'تُفّاحة' },
  { id: 'tree3', image: 'assets/sprites/tree.png', word: 'شجرة', letters: toLetters('شجرة'), missingIndices: [1, 2], pronunciation: 'شَجرة' },
  { id: 'fish3', image: 'assets/sprites/fish.png', word: 'سمكة', letters: toLetters('سمكة'), missingIndices: [1, 2], pronunciation: 'سَمكة' },
  { id: 'book3', image: 'assets/sprites/book.png', word: 'كتاب', letters: toLetters('كتاب'), missingIndices: [1, 3], pronunciation: 'كِتاب' },
  { id: 'house3', image: 'assets/sprites/house.png', word: 'منزل', letters: toLetters('منزل'), missingIndices: [1, 3], pronunciation: 'مَنزِل' },
  { id: 'orange3', image: 'assets/sprites/orange.png', word: 'برتقال', letters: toLetters('برتقال'), missingIndices: [1, 3], pronunciation: 'بُرتُقال' },
  { id: 'chair3', image: 'assets/sprites/chair.png', word: 'كرسي', letters: toLetters('كرسي'), missingIndices: [1, 2], pronunciation: 'كُرسي' },
];

// المستوى الرابع: حروف ناقصة أكثر في كلمات أطول (صعب)
export const LEVEL_4: WordItem[] = [
  { id: 'elephant4', image: 'assets/sprites/elephant.png', word: 'فيل', letters: toLetters('فيل'), missingIndices: [0, 2], pronunciation: 'فيل' },
  { id: 'lion4', image: 'assets/sprites/lion.png', word: 'أسد', letters: toLetters('أسد'), missingIndices: [1, 2], pronunciation: 'أَسَد' },
  { id: 'window4', image: 'assets/sprites/window.png', word: 'نافذة', letters: toLetters('نافذة'), missingIndices: [1, 3], pronunciation: 'نافِذة' },
  { id: 'cloud4', image: 'assets/sprites/cloud.png', word: 'سحابة', letters: toLetters('سحابة'), missingIndices: [1, 2, 3], pronunciation: 'سَحابة' },
  { id: 'mountain4', image: 'assets/sprites/mountain.png', word: 'جبل', letters: toLetters('جبل'), missingIndices: [0, 1, 2], pronunciation: 'جَبَل' },
  { id: 'key4', image: 'assets/sprites/key.png', word: 'مفتاح', letters: toLetters('مفتاح'), missingIndices: [1, 3], pronunciation: 'مِفتاح' },
  { id: 'orange4', image: 'assets/sprites/orange.png', word: 'برتقال', letters: toLetters('برتقال'), missingIndices: [1, 3, 5], pronunciation: 'بُرتُقال' },
  { id: 'rabbit4', image: 'assets/sprites/rabbit.png', word: 'أرنب', letters: toLetters('أرنب'), missingIndices: [1, 2, 3], pronunciation: 'أَرنَب' },
];

// المستوى الخامس: تحدٍّ كبير - أغلب حروف الكلمة ناقصة (صعب جداً)
export const LEVEL_5: WordItem[] = [
  { id: 'car5', image: 'assets/sprites/car.png', word: 'سيارة', letters: toLetters('سيارة'), missingIndices: [0, 2, 4], pronunciation: 'سَيّارة' },
  { id: 'window5', image: 'assets/sprites/window.png', word: 'نافذة', letters: toLetters('نافذة'), missingIndices: [0, 2, 4], pronunciation: 'نافِذة' },
  { id: 'cloud5', image: 'assets/sprites/cloud.png', word: 'سحابة', letters: toLetters('سحابة'), missingIndices: [0, 2, 4], pronunciation: 'سَحابة' },
  { id: 'orange5', image: 'assets/sprites/orange.png', word: 'برتقال', letters: toLetters('برتقال'), missingIndices: [0, 2, 4], pronunciation: 'بُرتُقال' },
  { id: 'chair5', image: 'assets/sprites/chair.png', word: 'كرسي', letters: toLetters('كرسي'), missingIndices: [0, 1, 2, 3], pronunciation: 'كُرسي' },
  { id: 'elephant5', image: 'assets/sprites/elephant.png', word: 'فيل', letters: toLetters('فيل'), missingIndices: [0, 1, 2], pronunciation: 'فيل' },
  { id: 'tree5', image: 'assets/sprites/tree.png', word: 'شجرة', letters: toLetters('شجرة'), missingIndices: [0, 1, 2, 3], pronunciation: 'شَجرة' },
  { id: 'lion5', image: 'assets/sprites/lion.png', word: 'أسد', letters: toLetters('أسد'), missingIndices: [0, 1, 2], pronunciation: 'أَسَد' },
];

// المستوى السادس: كلمات أطول مع حرفين ناقصين
export const LEVEL_6: WordItem[] = [
  { id: 'banana6', image: 'assets/sprites/banana.png', word: 'موزة', letters: toLetters('موزة'), missingIndices: [0, 2], pronunciation: 'مَوزة' },
  { id: 'flower6', image: 'assets/sprites/flower.png', word: 'وردة', letters: toLetters('وردة'), missingIndices: [0, 2], pronunciation: 'وَردة' },
  { id: 'grape6', image: 'assets/sprites/grape.png', word: 'عنب', letters: toLetters('عنب'), missingIndices: [0, 2], pronunciation: 'عِنَب' },
  { id: 'carrot6', image: 'assets/sprites/carrot.png', word: 'جزر', letters: toLetters('جزر'), missingIndices: [0, 2], pronunciation: 'جَزَر' },
  { id: 'duck6', image: 'assets/sprites/duck.png', word: 'بطة', letters: toLetters('بطة'), missingIndices: [0, 2], pronunciation: 'بَطّة' },
  { id: 'sun6', image: 'assets/sprites/sun.png', word: 'شمس', letters: toLetters('شمس'), missingIndices: [0, 2], pronunciation: 'شَمس' },
  { id: 'cat6', image: 'assets/sprites/cat.png', word: 'قطة', letters: toLetters('قطة'), missingIndices: [0, 2], pronunciation: 'قِطّة' },
  { id: 'ball6', image: 'assets/sprites/ball.png', word: 'كرة', letters: toLetters('كرة'), missingIndices: [0, 2], pronunciation: 'كُرة' },
];

// المستوى السابع: ثلاثة حروف ناقصة في كلمات متوسطة (صعب)
export const LEVEL_7: WordItem[] = [
  { id: 'book7', image: 'assets/sprites/book.png', word: 'كتاب', letters: toLetters('كتاب'), missingIndices: [0, 1, 3], pronunciation: 'كِتاب' },
  { id: 'house7', image: 'assets/sprites/house.png', word: 'منزل', letters: toLetters('منزل'), missingIndices: [0, 2, 3], pronunciation: 'مَنزِل' },
  { id: 'fish7', image: 'assets/sprites/fish.png', word: 'سمكة', letters: toLetters('سمكة'), missingIndices: [0, 1, 3], pronunciation: 'سَمكة' },
  { id: 'rabbit7', image: 'assets/sprites/rabbit.png', word: 'أرنب', letters: toLetters('أرنب'), missingIndices: [0, 1, 3], pronunciation: 'أَرنَب' },
  { id: 'apple7', image: 'assets/sprites/apple.png', word: 'تفاحة', letters: toLetters('تفاحة'), missingIndices: [0, 2, 4], pronunciation: 'تُفّاحة' },
  { id: 'tree7', image: 'assets/sprites/tree.png', word: 'شجرة', letters: toLetters('شجرة'), missingIndices: [0, 1, 3], pronunciation: 'شَجرة' },
  { id: 'chair7', image: 'assets/sprites/chair.png', word: 'كرسي', letters: toLetters('كرسي'), missingIndices: [0, 1, 3], pronunciation: 'كُرسي' },
  { id: 'lion7', image: 'assets/sprites/lion.png', word: 'أسد', letters: toLetters('أسد'), missingIndices: [0, 1, 2], pronunciation: 'أَسَد' },
];

// المستوى الثامن: كلمات طويلة بأربعة حروف ناقصة (صعب جداً)
export const LEVEL_8: WordItem[] = [
  { id: 'orange8', image: 'assets/sprites/orange.png', word: 'برتقال', letters: toLetters('برتقال'), missingIndices: [0, 2, 4, 5], pronunciation: 'بُرتُقال' },
  { id: 'window8', image: 'assets/sprites/window.png', word: 'نافذة', letters: toLetters('نافذة'), missingIndices: [0, 1, 3, 4], pronunciation: 'نافِذة' },
  { id: 'cloud8', image: 'assets/sprites/cloud.png', word: 'سحابة', letters: toLetters('سحابة'), missingIndices: [0, 1, 3, 4], pronunciation: 'سَحابة' },
  { id: 'car8', image: 'assets/sprites/car.png', word: 'سيارة', letters: toLetters('سيارة'), missingIndices: [0, 1, 3, 4], pronunciation: 'سَيّارة' },
  { id: 'key8', image: 'assets/sprites/key.png', word: 'مفتاح', letters: toLetters('مفتاح'), missingIndices: [0, 2, 3, 4], pronunciation: 'مِفتاح' },
  { id: 'apple8', image: 'assets/sprites/apple.png', word: 'تفاحة', letters: toLetters('تفاحة'), missingIndices: [0, 1, 2, 3], pronunciation: 'تُفّاحة' },
  { id: 'tree8', image: 'assets/sprites/tree.png', word: 'شجرة', letters: toLetters('شجرة'), missingIndices: [0, 1, 2, 3], pronunciation: 'شَجرة' },
  { id: 'chair8', image: 'assets/sprites/chair.png', word: 'كرسي', letters: toLetters('كرسي'), missingIndices: [0, 1, 2, 3], pronunciation: 'كُرسي' },
];

// المستوى التاسع: تحدٍّ نهائي - كل حروف الكلمة ناقصة (احترافي)
export const LEVEL_9: WordItem[] = [
  { id: 'orange9', image: 'assets/sprites/orange.png', word: 'برتقال', letters: toLetters('برتقال'), missingIndices: [0, 1, 2, 3, 4, 5], pronunciation: 'بُرتُقال' },
  { id: 'window9', image: 'assets/sprites/window.png', word: 'نافذة', letters: toLetters('نافذة'), missingIndices: [0, 1, 2, 3, 4], pronunciation: 'نافِذة' },
  { id: 'cloud9', image: 'assets/sprites/cloud.png', word: 'سحابة', letters: toLetters('سحابة'), missingIndices: [0, 1, 2, 3, 4], pronunciation: 'سَحابة' },
  { id: 'car9', image: 'assets/sprites/car.png', word: 'سيارة', letters: toLetters('سيارة'), missingIndices: [0, 1, 2, 3, 4], pronunciation: 'سَيّارة' },
  { id: 'house9', image: 'assets/sprites/house.png', word: 'منزل', letters: toLetters('منزل'), missingIndices: [0, 1, 2, 3], pronunciation: 'مَنزِل' },
  { id: 'rabbit9', image: 'assets/sprites/rabbit.png', word: 'أرنب', letters: toLetters('أرنب'), missingIndices: [0, 1, 2, 3], pronunciation: 'أَرنَب' },
  { id: 'fish9', image: 'assets/sprites/fish.png', word: 'سمكة', letters: toLetters('سمكة'), missingIndices: [0, 1, 2, 3], pronunciation: 'سَمكة' },
  { id: 'book9', image: 'assets/sprites/book.png', word: 'كتاب', letters: toLetters('كتاب'), missingIndices: [0, 1, 2, 3], pronunciation: 'كِتاب' },
];

export const LEVELS: WordItem[][] = [
  LEVEL_1, LEVEL_2, LEVEL_3, LEVEL_4, LEVEL_5, LEVEL_6, LEVEL_7, LEVEL_8, LEVEL_9,
];

export const LEVEL_NAMES = [
  'المستوى الأول',
  'المستوى الثاني',
  'المستوى الثالث',
  'المستوى الرابع',
  'المستوى الخامس',
  'المستوى السادس',
  'المستوى السابع',
  'المستوى الثامن',
  'المستوى التاسع',
];

// عدد اختيارات الحروف لكل مستوى (يزيد مع الصعوبة)
export const LEVEL_OPTIONS = [3, 5, 4, 6, 8, 6, 7, 8, 9];

// بنك الحروف العربية لتوليد الاختيارات الخاطئة
export const ARABIC_LETTERS = Array.from('ابتثجحخدذرزسشصضطظعغفقكلمنهوي');
