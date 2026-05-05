/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState, useRef } from "react";
import confetti from "canvas-confetti";
import { motion } from "motion/react";
import { Cake, Sparkles, PartyPopper, Volume2, VolumeX } from "lucide-react";

export default function App() {
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.log("Audio play prevented", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    // Only trigger once when mounted
    let active = true;
    const timer = setTimeout(() => {
      if (active) triggerFireworks();
    }, 500);
    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, []);

  const triggerFireworks = () => {
    if (!canvasRef.current) return;
    const myConfetti = confetti.create(canvasRef.current, { resize: true });
    
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 50 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0 || !canvasRef.current) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      myConfetti({
        ...defaults, particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      myConfetti({
        ...defaults, particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);
  };

  const handleCakeClick = () => {
    setCandlesBlown(true);
    triggerFireworks();
    
    if (audioRef.current && !isPlaying) {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(e => console.log("Audio play prevented", e));
    }
    
    if (canvasRef.current) {
      const myConfetti = confetti.create(canvasRef.current, { resize: true });
      // Confetti burst from cake
      myConfetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 },
        zIndex: 50
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0118] flex flex-col items-center justify-center overflow-hidden relative font-sans text-center px-4">
      
      {/* Audio Element */}
<audio ref={audioRef} loop>
  {/* Menggunakan link MP3 instrumen yang lebih stabil */}
  <source src="https://files.freemusicarchive.org/storage-freemusicarchive-org/music/ccCommunity/Kai_Engel/Chapter_One__Cold/Kai_Engel_-_04_-_Moonlight_Reprise.mp3" type="audio/mpeg" />
</audio>
      
      {/* Floating Music Button */}
      <button 
        onClick={toggleMusic} 
        className="fixed top-6 right-6 z-50 p-3 bg-white/5 backdrop-blur-md rounded-full border border-white/20 text-white/80 hover:text-white hover:bg-white/10 transition-colors shadow-lg cursor-pointer"
      >
        {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
      </button>

      {/* Background Mesh Gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[500px] h-[500px] bg-purple-600/30 rounded-full blur-[120px]"></div>
        <div className="absolute -bottom-[10%] -right-[10%] w-[600px] h-[600px] bg-pink-600/20 rounded-full blur-[120px]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-600/10 rounded-full blur-[150px]"></div>
      </div>

      {/* Canvas for Confetti */}
      <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 w-full h-full z-50"></canvas>

      {/* Decorative Fireworks (Static) */}
      <div className="absolute top-20 left-10 md:left-20 w-24 h-24 md:w-32 md:h-32 opacity-60 pointer-events-none">
        <div className="absolute inset-0 border-2 border-dashed border-yellow-400 rounded-full animate-pulse"></div>
        <div className="absolute inset-4 border border-white/40 rounded-full"></div>
      </div>
      <div className="absolute top-40 right-10 md:right-32 w-32 h-32 md:w-48 md:h-48 opacity-40 pointer-events-none">
        <div className="absolute inset-0 border-2 border-dotted border-pink-400 rounded-full"></div>
        <div className="absolute inset-8 border border-purple-300 rounded-full"></div>
      </div>
      <div className="absolute bottom-24 left-10 md:left-40 w-24 h-24 opacity-50 pointer-events-none">
        <div className="absolute h-full w-[1px] left-1/2 bg-gradient-to-t from-transparent via-white to-transparent rotate-0"></div>
        <div className="absolute h-full w-[1px] left-1/2 bg-gradient-to-t from-transparent via-white to-transparent rotate-45"></div>
        <div className="absolute h-full w-[1px] left-1/2 bg-gradient-to-t from-transparent via-white to-transparent rotate-90"></div>
        <div className="absolute h-full w-[1px] left-1/2 bg-gradient-to-t from-transparent via-white to-transparent rotate-[135deg]"></div>
      </div>

      {/* Main Glass Card */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 w-full max-w-[600px] bg-white/5 backdrop-blur-2xl border border-white/20 rounded-[40px] shadow-2xl p-8 md:p-12 flex flex-col items-center text-center mt-10 md:mt-0"
      >
        <div className="mb-6 px-4 py-1 rounded-full bg-white/10 border border-white/10 text-white/60 text-xs uppercase tracking-[0.3em] font-medium">
          Special Celebration
        </div>
        
        <h2 className="text-pink-300 text-3xl font-light tracking-wide mb-2 italic">Selamat Ulang Tahun</h2>
        <motion.h1 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5, type: "spring" }}
          className="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 tracking-tight mb-8"
        >
          Wulan
        </motion.h1>

        {/* Visual / Interactive Cake Element */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 1, type: "spring", stiffness: 100 }}
          className="relative w-48 h-40 flex flex-col items-center justify-end mb-8 cursor-pointer group"
          onClick={handleCakeClick}
        >
          {/* Flame / Sparkles */}
          <div className="absolute top-0 flex justify-center mb-4 relative h-16 z-40">
            {!candlesBlown ? (
              <motion.div 
                animate={{ y: [0, -5, 0], opacity: [0.8, 1, 0.8] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="text-yellow-400 text-5xl filter drop-shadow-[0_0_15px_rgba(250,204,21,1)]"
              >
                🔥
              </motion.div>
            ) : (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-white relative top-[-10px]"
              >
                <Sparkles size={48} className="animate-spin-slow text-pink-300 drop-shadow-[0_0_15px_rgba(244,114,182,1)]" />
              </motion.div>
            )}
          </div>
          
          <div className="relative transform transition-transform group-hover:scale-105 duration-300 flex flex-col items-center">
            {/* Candle */}
            <div className={`w-2 h-10 ${candlesBlown ? 'bg-gradient-to-b from-gray-400 to-gray-200' : 'bg-gradient-to-b from-orange-400 to-yellow-200'} rounded-t-full mb-[-2px] relative z-20`}>
              {!candlesBlown && (
                <>
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-4 h-6 bg-orange-500 blur-[4px] rounded-full opacity-80 animate-pulse"></div>
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-2 h-4 bg-yellow-200 rounded-full"></div>
                </>
              )}
            </div>
            {/* Top Layer */}
            <div className="w-32 h-12 bg-pink-100 rounded-t-xl border-x border-t border-white/30 z-20"></div>
            {/* Middle Cream */}
            <div className="w-36 h-4 bg-white/80 -mt-1 z-30 flex justify-around px-2">
              <div className="w-4 h-4 bg-white/80 rounded-full mt-2"></div>
              <div className="w-4 h-4 bg-white/80 rounded-full mt-2"></div>
              <div className="w-4 h-4 bg-white/80 rounded-full mt-2"></div>
            </div>
            {/* Bottom Layer */}
            <div className="w-40 h-16 bg-pink-200/90 rounded-t-lg rounded-b-sm border-x border-b border-white/20 z-10 shadow-lg flex items-center justify-center">
              <span className="text-pink-600/50 font-bold tracking-widest text-xs uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                {!candlesBlown ? 'TIUP LILIN' : 'KEMBANG API LAGI'}
              </span>
            </div>
            {/* Plate shadow */}
            <div className="w-48 h-2 bg-black/20 blur-sm rounded-full mt-1"></div>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="text-white/60 leading-relaxed max-w-sm mb-10"
        >
          Semoga di hari yang spesial ini, semua impianmu menjadi kenyataan. Teruslah bersinar dan bahagia selalu! ✨
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="flex justify-center w-full"
        >
          <div className="px-8 py-3 rounded-full bg-white text-[#0a0118] font-semibold text-sm hover:bg-pink-100 cursor-pointer transition-colors duration-200 shadow-[0_0_20px_rgba(255,255,255,0.3)]">
            Kirim Doa
          </div>
        </motion.div>
      </motion.div>

      {/* Confetti/Sparkles */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-yellow-400 rounded-full opacity-40 animate-pulse"></div>
        <div className="absolute top-2/3 right-1/4 w-3 h-3 bg-pink-400 rotate-45 opacity-30 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 right-1/3 w-2 h-2 bg-blue-400 rounded-full opacity-40 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute top-1/2 right-10 w-4 h-1 bg-white/20 rounded-full -rotate-12 animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute bottom-10 left-10 w-1 h-4 bg-purple-400/30 rounded-full rotate-45 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
      </div>
    </div>
  );
}
