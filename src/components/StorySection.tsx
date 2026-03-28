'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

export default function StorySection() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const stories = [
    {
      title: "Memory 1",
      imagePath: "/image-sasa/scene-1.jpeg",
    },
    {
      title: "Memory 2",
      imagePath: "/image-sasa/scene-2.jpeg",
    },
    {
      title: "Memory 3",
      imagePath: "/image-sasa/scene-3.jpeg"
    },
    {
      title: "Memory 4",
      imagePath: "/image-sasa/scene-4.jpeg"
    },
    {
      title: "Memory 5",
      imagePath: "/image-sasa/scene-5.jpeg"
    }
  ];

  // Start from the right (100%) and move to the left
  const x = useTransform(scrollYProgress, [0, 1], ["85%", "-250%"]);

  return (
    <section ref={targetRef} className="relative h-[400vh] bg-black">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        {/* Decorative ECG/EKG Heartbeat Line */}
        <div 
          className="absolute left-0 right-0 h-20 opacity-30 pointer-events-none z-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 40' width='100' height='40'%3E%3Cpath d='M0 20 L30 20 L35 5 L40 35 L45 20 L100 20' fill='none' stroke='%23ff4d6d' stroke-width='1.5'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat-x',
            backgroundPosition: 'center',
            filter: 'drop-shadow(0 0 8px rgba(255, 77, 109, 0.8))',
          }}
        />
        
        <motion.div style={{ x }} className="flex gap-16 px-4 items-center relative z-10">
          {stories.map((story, i) => (
            <div 
              key={i} 
              className="relative h-[55vh] w-[75vw] md:w-[45vw] lg:w-[35vw] shrink-0 overflow-hidden rounded-[2.5rem] shadow-[0_40px_100px_rgba(0,0,0,0.9)] border border-white/5 group bg-white/5"
            >
              <Image
                src={story.imagePath}
                alt={story.title}
                fill
                priority={i === 0}
                sizes="(max-width: 768px) 75vw, (max-width: 1200px) 45vw, 35vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 pointer-events-none group-hover:opacity-40 transition-opacity duration-700" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
