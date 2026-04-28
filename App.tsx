import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Trophy, 
  RotateCcw, 
  Play, 
  CheckCircle2, 
  XCircle, 
  BookOpen, 
  Palette,
  LayoutGrid,
  ChevronRight,
  Lightbulb
} from 'lucide-react';
import { COLOR_THEORY, COLOR_QUESTIONS } from './constants';

export default function App() {
  const [gameState, setGameState] = useState<'start' | 'theory' | 'playing' | 'end'>('start');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);

  const shuffledQuestions = useMemo(() => {
    return [...COLOR_QUESTIONS].sort(() => Math.random() - 0.5);
  }, [gameState === 'playing']);

  const currentQuestion = shuffledQuestions[currentIndex];

  const handleChoice = (choice: string) => {
    if (feedback) return;

    if (choice === currentQuestion.target) {
      setFeedback('correct');
      setScore(s => s + 1);
    } else {
      setFeedback('incorrect');
    }

    setTimeout(() => {
      setFeedback(null);
      if (currentIndex < shuffledQuestions.length - 1) {
        setCurrentIndex(i => i + 1);
      } else {
        setGameState('end');
      }
    }, 1200);
  };

  const restart = () => {
    setGameState('start');
    setCurrentIndex(0);
    setScore(0);
    setFeedback(null);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 font-sans overflow-x-hidden flex flex-col items-center justify-center p-4">
      
      {/* Dynamic Background */}
      <div className="fixed inset-0 pointer-events-none -z-10 bg-[radial-gradient(circle_at_50%_20%,#1e1b4b_0%,#020624_100%)]" />
      <div className="fixed inset-0 pointer-events-none -z-10 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />

      <AnimatePresence mode="wait">
        {gameState === 'start' && (
          <motion.div
            key="start"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="w-full max-w-2xl bg-slate-900/50 backdrop-blur-3xl p-10 md:p-16 rounded-[4rem] border border-white/5 shadow-2xl text-center"
          >
            <div className="mb-10 flex justify-center gap-6">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ y: [0, -20, 0], rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, delay: i * 0.5 }}
                  className={`w-20 h-20 rounded-3xl flex items-center justify-center shadow-xl ${
                    i === 0 ? 'bg-rose-500' : i === 1 ? 'bg-yellow-500' : 'bg-blue-500'
                  }`}
                >
                  <Palette className="w-10 h-10 text-white" />
                </motion.div>
              ))}
            </div>

            <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter italic uppercase text-transparent bg-clip-text bg-gradient-to-br from-white via-slate-400 to-slate-800 leading-none">
              SPANISH<br/>COLORS
            </h1>
            <p className="text-slate-500 font-bold uppercase tracking-[0.4em] mb-12 text-xs">Master Gender & Number Agreement</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button 
                onClick={() => setGameState('theory')}
                className="py-6 bg-slate-800 hover:bg-slate-700 text-white rounded-[2rem] font-black text-xl transition-all flex items-center justify-center gap-3 border-b-4 border-slate-950"
              >
                <BookOpen className="w-6 h-6" />
                LEARN THEORY
              </button>
              <button 
                onClick={() => setGameState('playing')}
                className="py-6 bg-white text-slate-900 rounded-[2rem] font-black text-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 border-b-4 border-slate-300"
              >
                <Play className="w-6 h-6 fill-slate-900" />
                PLAY GAME
              </button>
            </div>
          </motion.div>
        )}

        {gameState === 'theory' && (
          <motion.div
            key="theory"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="w-full max-w-4xl bg-slate-900/50 backdrop-blur-3xl p-8 md:p-12 rounded-[3.5rem] border border-white/5 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-slate-900" />
                </div>
                <div>
                  <h2 className="text-2xl font-black italic uppercase tracking-tight text-white">Color Theory</h2>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Basic Rules & Agreement</p>
                </div>
              </div>
              <button 
                onClick={() => setGameState('start')}
                className="p-3 hover:bg-white/10 rounded-full transition-all"
              >
                <RotateCcw className="w-6 h-6" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
              {COLOR_THEORY.map((item, i) => (
                <div key={i} className="p-6 bg-slate-950/50 rounded-3xl border border-white/5 hover:border-white/20 transition-all group">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl shadow-inner border border-white/10" style={{ backgroundColor: item.hex }} />
                    <span className="font-black text-lg italic text-white uppercase">{item.spanish}</span>
                  </div>
                  <p className="text-slate-400 text-sm font-medium leading-relaxed">{item.rules}</p>
                </div>
              ))}
            </div>

            <div className="bg-blue-500/10 p-6 rounded-3xl border border-blue-500/20 flex items-start gap-4 mb-8">
              <Lightbulb className="w-8 h-8 text-blue-400 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-black text-blue-400 uppercase text-xs tracking-widest mb-2">Key Pro Tip</h3>
                <p className="text-slate-300 text-sm">Colors that end in <span className="text-white font-bold">-o</span> (rojo, amarillo, blanco) change to <span className="text-white font-bold">-a</span> for feminine nouns. Colors that end in consonants or <span className="text-white font-bold">-e</span> (azul, verde, naranja) usually stay the same for both genders!</p>
              </div>
            </div>

            <button 
              onClick={() => setGameState('playing')}
              className="w-full py-6 bg-white text-slate-900 rounded-[2rem] font-black text-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 shadow-2xl"
            >
              START PRACTICE <ChevronRight className="w-6 h-6" />
            </button>
          </motion.div>
        )}

        {gameState === 'playing' && (
          <motion.div
            key="playing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full max-w-4xl flex flex-col items-center"
          >
            {/* Play HUD */}
            <div className="w-full flex justify-between items-center mb-10 px-4 max-w-3xl">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center p-1">
                   <div 
                     className="w-full h-full rounded-full transition-colors duration-500 shadow-inner" 
                     style={{ backgroundColor: currentQuestion.target === 'azul' ? '#3b82f6' : currentQuestion.target.includes('roj') ? '#ef4444' : currentQuestion.target.includes('amarill') ? '#eab308' : '#fff' }} 
                   />
                </div>
                <div>
                   <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">Question</div>
                   <div className="text-2xl font-black italic">{currentIndex + 1} / {shuffledQuestions.length}</div>
                </div>
              </div>

              <div className="bg-slate-900/80 px-6 py-2 rounded-full border border-white/10 backdrop-blur-md">
                 <span className="text-slate-500 font-bold uppercase text-[10px] tracking-widest mr-3">Score</span>
                 <span className="text-xl font-black">{score}</span>
              </div>
            </div>

            <div className="w-full max-w-2xl relative">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={currentIndex}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  className="bg-slate-900/80 backdrop-blur-3xl border border-white/10 p-12 md:p-16 rounded-[4rem] w-full text-center relative overflow-hidden shadow-2xl"
                >
                  <h2 className="text-4xl md:text-6xl font-black mb-6 italic tracking-tight uppercase leading-tight text-white">
                    "{currentQuestion.prompt}"
                  </h2>
                  <p className="text-slate-500 font-bold mb-12 text-sm md:text-base italic uppercase tracking-wide">({currentQuestion.translation})</p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {currentQuestion.choices.map(choice => (
                      <button
                        key={choice}
                        disabled={!!feedback}
                        onClick={() => handleChoice(choice)}
                        className={`py-6 rounded-3xl font-black text-2xl transition-all border-b-6 shadow-lg ${
                          feedback === 'correct' && choice === currentQuestion.target
                            ? 'bg-emerald-500 border-emerald-800 text-white scale-105'
                            : feedback === 'incorrect' && choice === currentQuestion.target
                            ? 'bg-rose-500 border-rose-800 text-white'
                            : 'bg-slate-800 border-slate-950 text-slate-100 hover:bg-slate-700 hover:translate-y-[-2px]'
                        }`}
                      >
                        {choice}
                      </button>
                    ))}
                  </div>

                  {/* Feedback Overlays */}
                  <AnimatePresence>
                    {feedback && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className={`absolute inset-0 z-30 flex flex-col items-center justify-center backdrop-blur-md rounded-[3rem] ${feedback === 'correct' ? 'bg-emerald-500/10' : 'bg-rose-500/10'}`}
                      >
                         {feedback === 'correct' ? (
                           <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex flex-col items-center">
                              <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(16,185,129,0.5)]">
                                 <CheckCircle2 className="w-12 h-12 text-white" />
                              </div>
                              <div className="text-4xl font-black uppercase italic text-white">Excelente!</div>
                           </motion.div>
                         ) : (
                           <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex flex-col items-center">
                              <div className="w-24 h-24 bg-rose-500 rounded-full flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(244,63,94,0.5)]">
                                 <XCircle className="w-12 h-12 text-white" />
                              </div>
                              <div className="text-4xl font-black uppercase italic text-rose-400 mb-2">Incorrecto</div>
                              <div className="px-6 py-2 bg-white/10 rounded-full text-white font-black uppercase text-xs tracking-widest italic">{currentQuestion.target}</div>
                           </motion.div>
                         )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {gameState === 'end' && (
          <motion.div
            key="end"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-lg bg-slate-900/90 backdrop-blur-3xl p-16 md:p-20 rounded-[5rem] border border-white/5 shadow-2xl text-center relative overflow-hidden"
          >
            <div className="absolute top-0 inset-x-0 h-3 bg-gradient-to-r from-rose-500 via-yellow-500 to-blue-500" />
            
            <div className="relative mb-10">
              <Trophy className="w-32 h-32 text-yellow-400 mx-auto drop-shadow-[0_0_30px_rgba(250,204,21,0.6)]" />
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-4 border-dashed border-yellow-400/20 rounded-full scale-110"
              />
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black mb-4 italic tracking-tighter uppercase leading-none text-white">
              GRAN TRABAJO!
            </h1>
            <p className="text-slate-500 font-bold mb-12 uppercase tracking-[0.3em] text-xs">Test Completed Successfully</p>
            
            <div className="flex justify-center gap-8 mb-16">
               <div className="text-center">
                  <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Total score</div>
                  <div className="text-6xl font-black text-white italic leading-none">{score} <span className="text-xl text-slate-700">/ {shuffledQuestions.length}</span></div>
               </div>
            </div>

            <button 
              onClick={restart}
              className="w-full py-8 bg-white text-slate-900 rounded-[3rem] font-black text-2xl hover:scale-105 active:scale-95 transition-all shadow-xl flex items-center justify-center gap-4 border-b-6 border-slate-300"
            >
              <RotateCcw className="w-10 h-10" />
              PLAY AGAIN
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Blobs */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
         <div className="absolute top-1/4 -left-20 w-80 h-80 bg-rose-500/10 blur-[120px] rounded-full animate-pulse" />
         <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-blue-500/10 blur-[120px] rounded-full animate-pulse [animation-delay:2s]" />
      </div>
    </div>
  );
}
