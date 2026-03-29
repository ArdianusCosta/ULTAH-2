'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const TEXT = "Halo Sasa, sekarang kamu sudah 17 tahun. Selamat ulang tahun ya. Semoga di usia yang baru ini, semua hal yang kamu harapkan bisa perlahan tercapai. Semoga kamu selalu diberi kesehatan, kebahagiaan, dan kekuatan untuk menjalani setiap langkah ke depan. Tetap jadi diri sendiri, dan jangan pernah lupa untuk selalu bersyukur sama Tuhan yaaa saaaa.";
export default function RevealSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: textRef,
    offset: ["start 0.8", "end 0.3"]
  });

  const words = TEXT.split(" ");

  return (
    <section
      ref={containerRef}
      className="relative min-h-[150vh] w-full flex items-center justify-center py-40 bg-black/50"
    >
      <div className="max-w-4xl px-8 text-center">
        <div 
          ref={textRef}
          className="flex flex-wrap justify-center gap-x-3 gap-y-4"
        >
          {words.map((word, i) => {
            const start = i / words.length;
            const end = (i + 1) / words.length;

            return (
              <Word
                key={i}
                range={[start, end]}
                progress={scrollYProgress}
              >
                {word}
              </Word>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Word({ children, range, progress }: { children: string, range: [number, number], progress: any }) {
  const opacity = useTransform(progress, range, [0.1, 1]);
  const blur = useTransform(progress, range, ["4px", "0px"]);
  const y = useTransform(progress, range, [10, 0]);

  return (
    <motion.span
      style={{ opacity, filter: `blur(${blur})`, y }}
      className="text-2xl md:text-4xl lg:text-5xl font-light text-white tracking-wide"
    >
      {children}
    </motion.span>
  );
}
