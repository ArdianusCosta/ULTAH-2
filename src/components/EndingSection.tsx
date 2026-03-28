'use client';

import { motion } from 'framer-motion';
import { useLenis } from 'lenis/react';
import { Heart, RefreshCw } from 'lucide-react';

export default function EndingSection() {
  const lenis = useLenis();

  const handleReplay = () => {
    lenis?.scrollTo(0, { duration: 2, easing: (t) => 1 - Math.pow(1 - t, 4) });
  };

  return (
    <section className="h-screen w-full flex flex-col items-center justify-center bg-cinematic-gradient relative overflow-hidden">
      {/* Background Hearts */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <Heart className="w-[800px] h-[800px] text-primary/10 fill-primary/5" />
      </motion.div>

      <div className="relative z-10 text-center space-y-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="space-y-4"
        >
          <h2 className="text-6xl md:text-8xl lg:text-9xl font-light text-white tracking-tighter">
            I love you <span className="text-secondary tracking-normal">❤️</span>
          </h2>
          <p className="text-xl md:text-2xl text-white/40 tracking-[0.3em] font-light italic">Forever & always.</p>
        </motion.div>

        <motion.button
          onClick={handleReplay}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
          className="group flex flex-col items-center gap-4 cursor-pointer"
        >
          <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center transition-colors group-hover:bg-primary/20 group-hover:border-primary/50">
            <RefreshCw className="w-6 h-6 text-white/60 group-hover:text-white transition-colors rotate-0 group-hover:rotate-[360deg] duration-1000" />
          </div>
          <span className="text-xs uppercase tracking-[0.3em] text-white/40 group-hover:text-white/80">Mulai Lagi</span>
        </motion.button>
      </div>

      {/* Floating Blobs (Small) */}
      <motion.div
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-10 right-10 w-20 h-20 bg-secondary rounded-full blur-[40px] opacity-30"
        />
        <motion.div
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-10 left-10 w-32 h-32 bg-primary rounded-full blur-[50px] opacity-30"
        />
    </section>
  );
}
