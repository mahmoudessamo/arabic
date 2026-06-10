import React from 'react';
import Game from './game/Game';

function App() {
  return (
    <div className="h-screen w-full flex items-center justify-center p-2 sm:p-3 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 overflow-hidden">
      {/* حاوية اللعبة - تملأ الشاشة بالكامل دون تمرير */}
      <div className="w-full max-w-4xl h-full max-h-[96vh] bg-gradient-to-br from-sky-400 via-cyan-400 to-teal-400 rounded-[2rem] shadow-2xl relative border-4 border-white/40 overflow-hidden flex flex-col">
        {/* عناصر زخرفية في الخلفية */}
        <div className="absolute top-6 right-10 text-5xl opacity-30 animate-pulse pointer-events-none">☁️</div>
        <div className="absolute top-16 left-12 text-4xl opacity-30 pointer-events-none">☁️</div>
        <div className="absolute bottom-8 right-1/4 text-3xl opacity-20 pointer-events-none">🌈</div>
        <div className="relative z-10 flex-1 min-h-0 flex flex-col">
          <Game />
        </div>
      </div>
    </div>
  );
}

export default App;
