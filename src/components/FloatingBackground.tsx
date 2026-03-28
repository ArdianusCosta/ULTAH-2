'use client';

import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Heart } from 'lucide-react';

export default function FloatingBackground() {
  const [mounted, setMounted] = useState(false);
  const { scrollYProgress } = useScroll();

  // Mouse position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring for cursor interaction
  const smoothX = useSpring(mouseX, { damping: 50, stiffness: 200 });
  const smoothY = useSpring(mouseY, { damping: 50, stiffness: 200 });

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      // Offset from center
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      mouseX.set(e.clientX - centerX);
      mouseY.set(e.clientY - centerY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Parallax layers based on scroll
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -500]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -800]);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-[-10] pointer-events-none overflow-hidden select-none">
      {/* Layer 1: Slow / Blobs */}
      <motion.div style={{ y: y1 }} className="absolute inset-0">
        <Blob
          className="top-[15%] left-[5%] w-[450px] h-[450px] bg-primary/10"
          smoothX={smoothX} smoothY={smoothY} factor={0.02}
          floatDuration={12}
        />
        <Blob
          className="bottom-[25%] right-[5%] w-[550px] h-[550px] bg-secondary/10"
          smoothX={smoothX} smoothY={smoothY} factor={0.015}
          floatDuration={15}
        />
      </motion.div>

      {/* Layer 2: Medium / Hearts */}
      <motion.div style={{ y: y2 }} className="absolute inset-0">
        <HeartElement
          className="top-[35%] right-[20%] w-24 h-24"
          smoothX={smoothX} smoothY={smoothY} factor={0.04}
          floatDuration={8}
        />
        <HeartElement
          className="bottom-[45%] left-[15%] w-32 h-32"
          smoothX={smoothX} smoothY={smoothY} factor={0.03}
          floatDuration={10}
        />
        <Blob
          className="top-[50%] left-[40%] w-[300px] h-[300px] bg-accent/5 blur-3xl"
          smoothX={smoothX} smoothY={smoothY} factor={0.025}
          floatDuration={20}
        />
      </motion.div>

      {/* Layer 3: Fast / Accents */}
      <motion.div style={{ y: y3 }} className="absolute inset-0">
        <HeartElement
          className="top-[65%] right-[40%] w-16 h-16 opacity-30"
          smoothX={smoothX} smoothY={smoothY} factor={0.08}
          floatDuration={6}
        />
        <Blob
          className="bottom-[10%] left-[30%] w-[250px] h-[250px] bg-primary/5 blur-2xl"
          smoothX={smoothX} smoothY={smoothY} factor={0.06}
          floatDuration={14}
        />
      </motion.div>
    </div>
  );
}

interface InteractiveProps {
  className?: string;
  smoothX: any;
  smoothY: any;
  factor: number;
  floatDuration: number;
}

function Blob({ className, smoothX, smoothY, factor, floatDuration }: InteractiveProps) {
  const x = useTransform(smoothX, (v: number) => v * factor);
  const y = useTransform(smoothY, (v: number) => v * factor);

  return (
    <motion.div
      style={{ x, y }}
      animate={{
        y: [0, -30, 0],
        rotate: [0, 10, 0],
        scale: [1, 1.05, 1],
      }}
      transition={{
        duration: floatDuration,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className={`absolute rounded-full blur-[100px] backdrop-blur-3xl ${className}`}
    />
  );
}

function HeartElement({ className, smoothX, smoothY, factor, floatDuration }: InteractiveProps) {
  const x = useTransform(smoothX, (v: number) => v * factor);
  const y = useTransform(smoothY, (v: number) => v * factor);

  return (
    <motion.div
      style={{ x, y }}
      animate={{
        y: [0, -40, 0],
        rotate: [-5, 5, -5],
        scale: [0.9, 1.1, 0.9],
      }}
      transition={{
        duration: floatDuration,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className={`absolute text-primary/20 pointer-events-none drop-shadow-2xl ${className}`}
    >
      <Heart className="w-full h-full fill-current filter blur-[1px]" />
    </motion.div>
  );
}
