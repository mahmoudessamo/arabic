// المكوّن الرئيسي للعبة: إدارة الشاشات والحالة العامة
import React, { useEffect, useState } from 'react';
import StartScreen from './components/StartScreen';
import GameScreen from './components/GameScreen';
import EndScreen from './components/EndScreen';
import { audioManager } from './audio/AudioManager';
import { getBestScore, setBestScore } from './utils/storage';

type Screen = 'start' | 'play' | 'end';

interface EndStats {
  score: number;
  correct: number;
  wrong: number;
}

export default function Game() {
  const [screen, setScreen] = useState<Screen>('start');
  const [level, setLevel] = useState(0);
  const [soundOn, setSoundOn] = useState(true);
  const [bestScore, setBest] = useState(getBestScore());
  const [endStats, setEndStats] = useState<EndStats>({ score: 0, correct: 0, wrong: 0 });

  // مزامنة حالة الصوت مع المدير
  useEffect(() => {
    audioManager.setEnabled(soundOn);
  }, [soundOn]);

  const handleStart = (lvl: number) => {
    audioManager.unlock();
    audioManager.playClick();
    setLevel(lvl);
    setScreen('play');
  };

  const handleFinish = (stats: EndStats) => {
    setEndStats(stats);
    setBestScore(stats.score);
    setBest(getBestScore());
    setScreen('end');
  };

  const handleReplay = () => {
    audioManager.playClick();
    setScreen('play');
  };

  const handleNextLevel = () => {
    audioManager.playClick();
    setLevel((l) => l + 1);
    setScreen('play');
  };

  const handleHome = () => {
    audioManager.playClick();
    setScreen('start');
  };

  const toggleSound = () => {
    setSoundOn((s) => {
      const next = !s;
      audioManager.setEnabled(next);
      if (next) audioManager.unlock();
      return next;
    });
  };

  return (
    <div
      dir="rtl"
      className="w-full flex-1 min-h-0 flex items-stretch justify-center font-sans"
      style={{ fontFamily: "'Tajawal', 'Cairo', sans-serif" }}
    >
      <div className="w-full mx-auto flex flex-col flex-1 min-h-0">
      {screen === 'start' && (
        <StartScreen
          onStart={handleStart}
          soundOn={soundOn}
          onToggleSound={toggleSound}
          bestScore={bestScore}
        />
      )}
      {screen === 'play' && (
        // key لإعادة تهيئة الشاشة عند إعادة اللعب أو تغيير المستوى
        <GameScreen
          key={`${level}-${screen}-${endStats.score}`}
          level={level}
          onFinish={handleFinish}
          onHome={handleHome}
          soundOn={soundOn}
        />
      )}
      {screen === 'end' && (
        <EndScreen
          level={level}
          score={endStats.score}
          correct={endStats.correct}
          wrong={endStats.wrong}
          onReplay={handleReplay}
          onNextLevel={handleNextLevel}
          onHome={handleHome}
        />
      )}
      </div>
    </div>
  );
}
