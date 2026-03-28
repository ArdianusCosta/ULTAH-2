'use client';

import { motion } from 'framer-motion';

const PARAGRAPHS = [
  "Untukmu tersayang,",
  "Tidak ada kata yang cukup kuat, tidak ada bahasa yang cukup indah, untuk menggambarkan betapa berartinya dirimu bagiku. Setiap hari terasa seperti hadiah karena aku bisa melaluinya bersamamu.",
  "Kamu telah menunjukkan kebaikan dan cinta yang tidak pernah aku bayangkan sebelumnya, membuat momen tersederhana terasa luar biasa dan saat-saat tersulit terasa lebih ringan.",
  "Saat kita menatap masa depan, satu-satunya harapanku adalah terus membangun cerita indah ini bersama. Terima kasih telah menjadi orang favoritku, hatiku, dan rumahku.",
  "Dengan seluruh cintaku,"
];

export default function LoveLetterSection() {
  return (
    <section className="py-60 px-8 bg-black">
      <div className="max-w-xl mx-auto space-y-12">
        <motion.div
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 2 }}
           className="text-center space-y-12"
        >
          <div className="w-12 h-[1px] bg-primary/40 mx-auto mb-16" />
          
          {PARAGRAPHS.map((p, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 1.5, 
                delay: i * 0.5, 
                ease: "easeOut" 
              }}
              className={`text-xl md:text-2xl font-light leading-relaxed text-white/80 ${i === 0 || i === PARAGRAPHS.length - 1 ? 'italic font-serif text-primary' : ''}`}
            >
              {p}
            </motion.p>
          ))}

          <div className="w-12 h-[1px] bg-primary/40 mx-auto mt-16" />
        </motion.div>
      </div>
    </section>
  );
}
