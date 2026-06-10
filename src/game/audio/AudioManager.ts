// مدير الصوت: مؤثرات الإجابة الصحيحة والخاطئة + نطق الكلمات
// يستخدم Web Audio API للمؤثرات و SpeechSynthesis للنطق العربي

export class AudioManager {
  private ctx: AudioContext | null = null;
  private enabled = true;
  private voicesLoaded = false;
  private cachedVoices: SpeechSynthesisVoice[] = [];

  constructor() {
    // تحميل الأصوات مبكراً والاستماع لتغيّرها
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.loadVoices();
      // بعض المتصفحات تحمّل الأصوات بشكل غير متزامن
      window.speechSynthesis.onvoiceschanged = () => {
        this.loadVoices();
      };
    }
  }

  private loadVoices() {
    if (!('speechSynthesis' in window)) return;
    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      this.cachedVoices = voices;
      this.voicesLoaded = true;
    }
  }

  private ensureCtx() {
    if (!this.ctx) {
      const Ctor = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new Ctor();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  setEnabled(on: boolean) {
    this.enabled = on;
  }

  isEnabled() {
    return this.enabled;
  }

  // نغمة بسيطة
  private tone(freq: number, start: number, dur: number, type: OscillatorType = 'sine', vol = 0.25) {
    if (!this.enabled) return;
    const ctx = this.ensureCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime + start);
    gain.gain.setValueAtTime(0, ctx.currentTime + start);
    gain.gain.linearRampToValueAtTime(vol, ctx.currentTime + start + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + start + dur);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(ctx.currentTime + start);
    osc.stop(ctx.currentTime + start + dur + 0.05);
  }

  // صوت نجاح بهيج (نغمة صاعدة)
  playSuccess() {
    if (!this.enabled) return;
    this.tone(523.25, 0, 0.15, 'triangle', 0.3);   // C5
    this.tone(659.25, 0.12, 0.15, 'triangle', 0.3); // E5
    this.tone(783.99, 0.24, 0.25, 'triangle', 0.3); // G5
    this.tone(1046.5, 0.36, 0.3, 'triangle', 0.3);  // C6
  }

  // صوت خطأ (نغمة هابطة خشنة)
  playError() {
    if (!this.enabled) return;
    this.tone(220, 0, 0.18, 'sawtooth', 0.2);
    this.tone(164.81, 0.14, 0.25, 'sawtooth', 0.2);
  }

  // صوت نقرة الزر
  playClick() {
    if (!this.enabled) return;
    this.tone(440, 0, 0.08, 'square', 0.12);
  }

  // نطق الكلمة بالعربية
  speak(text: string) {
    if (!this.enabled) return;
    if (!('speechSynthesis' in window)) return;
    try {
      // إلغاء أي نطق سابق
      window.speechSynthesis.cancel();

      // تأكد من تحميل الأصوات
      if (!this.voicesLoaded) {
        this.loadVoices();
      }

      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = 'ar-SA';
      utter.rate = 0.75;
      utter.pitch = 1.1;
      utter.volume = 1;

      // محاولة إيجاد صوت عربي
      const voices = this.cachedVoices.length > 0 ? this.cachedVoices : window.speechSynthesis.getVoices();
      const arVoice = voices.find((v) => v.lang && v.lang.toLowerCase().startsWith('ar'));
      if (arVoice) {
        utter.voice = arVoice;
        utter.lang = arVoice.lang;
      }

      // بعض المتصفحات تحتاج تأخير بسيط بعد cancel
      window.setTimeout(() => {
        window.speechSynthesis.speak(utter);
      }, 60);
    } catch (e) {
      // تجاهل أي خطأ في النطق
    }
  }

  // فتح سياق الصوت عند أول تفاعل
  unlock() {
    this.ensureCtx();
    // تحميل الأصوات
    this.loadVoices();
    // بعض المتصفحات تتطلب نطقاً صامتاً لفتح القناة
    if ('speechSynthesis' in window) {
      try {
        const warm = new SpeechSynthesisUtterance('');
        warm.volume = 0;
        window.speechSynthesis.speak(warm);
        window.speechSynthesis.cancel();
      } catch (e) {
        // تجاهل
      }
    }
  }
}

export const audioManager = new AudioManager();
