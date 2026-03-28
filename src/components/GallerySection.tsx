'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

const IMAGES = [
  "/image-sasa/scene-1.jpeg",
  "/image-sasa/scene-2.jpeg",
  "/image-sasa/scene-3.jpeg",
  "/image-sasa/scene-4.jpeg",
  "/image-sasa/scene-5.jpeg",
  "/image-sasa/scene-6.jpeg",
];

export default function GallerySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0.1, 0.4], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);

  return (
    <section
      ref={containerRef}
      className="py-40 px-4 md:px-20 bg-cinematic-gradient"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div style={{ scale, opacity }} className="space-y-12">
          <div className="text-center space-y-4 mb-20">
            <h3 className="text-sm uppercase tracking-[0.5em] text-primary/70 font-light">PAP</h3>
            <h2 className="text-5xl md:text-6xl font-light text-white tracking-tight">Imutss</h2>
          </div>

          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {IMAGES.map((id, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
                viewport={{ once: true }}
                className="relative overflow-hidden rounded-2xl group shadow-2xl bg-white/5"
              >
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-10" />
                <Image
                  src={id}
                  alt={`Gallery Image ${i + 1}`}
                  width={800}
                  height={1000}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
