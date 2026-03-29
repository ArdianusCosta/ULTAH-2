'use client';

import { motion } from 'framer-motion';

const PARAGRAPHS = [
  "Orang dewasa,",
  "Ulang tahun kamu jatuh di hari Minggu, dan kebetulan banget itu bertepatan dengan Minggu Palma. Dalam tradisi Katolik, Minggu Palma memperingati saat Yesus memasuki Yerusalem dan disambut dengan daun palma yang menghiasi jalan-Nya.",
  "Entah kenapa, itu buat aku inget kamu. Sama kaya daun palma yang menghiasi jalan itu, kamu juga hadir dan menghiasi hidupku dengan cara yang sederhana tapi berarti.",
  "Terima kasih karena sudah menjadi bagian dari hariku, membuat hal-hal kecil terasa lebih baik, dan menemani langkahku sejauh ini.",
  "Semoga di usia yang baru ini, kamu selalu diberi kebahagiaan, ketenangan, dan hal-hal baik yang pantas kamu dapatkan.",
  "Dibuat dengan Cintax,"
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
