'use client';

import { useState, useRef } from "react";
import HeroSection from "@/components/HeroSection";
import RevealSection from "@/components/RevealSection";
import StorySection from "@/components/StorySection";
import GallerySection from "@/components/GallerySection";
import LoveLetterSection from "@/components/LoveLetterSection";
import EndingSection from "@/components/EndingSection";
import IntroScreen from "@/components/IntroScreen";
import FloatingBackground from "@/components/FloatingBackground";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [hasStarted, setHasStarted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleStart = () => {
    setHasStarted(true);
    if (audioRef.current) {
      audioRef.current.play().catch(err => console.log("Audio play failed:", err));
    }
  };

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-between">
      <AnimatePresence mode="wait">
        {!hasStarted && (
          <IntroScreen key="intro" onStart={handleStart} />
        )}
      </AnimatePresence>
      
      <AnimatePresence>
        {hasStarted && (
          <motion.div
            key="content"
            initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.5, ease: [0.7, 0, 0.3, 1] }}
            className="relative w-full flex flex-col items-center justify-between"
          >
            <FloatingBackground />
            <HeroSection />
            <RevealSection />
            <StorySection />
            <GallerySection />
            <LoveLetterSection />
            <EndingSection />
          </motion.div>
        )}
      </AnimatePresence>

      <audio 
        ref={audioRef}
        id="bg-music"
        src="/music/perfect.mp3" 
        loop 
        preload="auto"
      />
    </main>
  );
}
