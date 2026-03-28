'use client';

import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useEffect, useState } from 'react';

interface IntroScreenProps {
  onStart: () => void;
}

export default function IntroScreen({ onStart }: IntroScreenProps) {
  const [hearts, setHearts] = useState<{ x: string; delay: number; duration: number }[]>([]);

  useEffect(() => {
    const newHearts = [...Array(12)].map(() => ({
      x: Math.random() * 100 + "%",
      delay: Math.random() * 20,
      duration: Math.random() * 10 + 10,
    }));
    setHearts(newHearts);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 2,
        filter: "blur(20px)",
      }}
      transition={{ duration: 1.5, ease: [0.7, 0, 0.3, 1] }}
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Background Image with Blur */}
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.4 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("/image-sasa/scene-1.jpeg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(8px)',
        }}
      />

      {/* Vignette Overlay */}
      <div className="absolute inset-0 z-1 bg-radial-vignette opacity-80" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-8 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <h2 className="text-sm uppercase tracking-[0.8em] text-white/60 mb-4 font-light">
            For You, My Love
          </h2>
          <h1 className="text-4xl md:text-6xl font-light text-white tracking-tight leading-tight">
            A Special Gift <br />
            <span className="italic font-serif text-primary/90">Waiting inside...</span>
          </h1>
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onStart}
          className="group relative mt-8 flex items-center justify-center gap-3 px-10 py-5 rounded-full bg-white/5 border border-white/20 backdrop-blur-md transition-all hover:bg-white/10 hover:border-white/40 group overflow-hidden"
        >
          {/* Inner Glow */}
          <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity blur-xl rounded-full" />

          <span className="relative z-10 text-xl md:text-2xl font-light text-white tracking-wide">
            Open it
          </span>
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="relative z-10"
          >
            <Heart className="w-6 h-6 md:w-8 md:h-8 text-primary fill-primary/40" />
          </motion.div>
        </motion.button>

        {/* <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="mt-4 text-[10px] uppercase tracking-[0.3em] text-white/30"
        >
          Please turn on your sound
        </motion.p> */}
      </div>

      {/* Floating Petals/Hearts for the Intro */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        {hearts.map((heart, i) => (
          <motion.div
            key={i}
            initial={{
              x: heart.x,
              y: "-10%",
              rotate: 0,
              opacity: 0
            }}
            animate={{
              y: "110%",
              rotate: 360,
              opacity: [0, 1, 1, 0]
            }}
            transition={{
              duration: heart.duration,
              repeat: Infinity,
              delay: heart.delay,
              ease: "linear"
            }}
            className="absolute text-primary/40"
          >
            ❤️
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
