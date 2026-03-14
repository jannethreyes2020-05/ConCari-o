import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1.2, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const blur = useTransform(scrollYProgress, [0, 0.3], ['blur(0px)', 'blur(10px)']);

  return (
    <div ref={containerRef} className="h-[400vh] relative bg-black">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        <motion.video
          style={{ scale }}
          className="absolute inset-0 w-full h-full object-cover opacity-60"
          src="https://res.cloudinary.com/dpla2cq4j/image/upload/v1773436983/Crea_una_transicin_dinmica_usando_el_produc_kv1zw2.mp4"
          muted
          playsInline
          autoPlay
          loop
          preload="auto"
        />
        
        <motion.div 
          style={{ opacity, filter: blur }}
          className="relative z-10 flex flex-col items-center text-center px-4"
        >
          <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter mb-4">
            <span className="text-cyan-400">CON</span>
            <span className="text-[#FF8C69]">CARIÑO</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl font-light">
            Cajas de regalos personalizadas. Regala alegría, regala un detalle para recordar.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="px-8 py-4 rounded-full border border-white text-white hover:bg-white hover:text-black transition-colors duration-300 font-semibold">
              Explorar Regalos
            </button>
            <button className="px-8 py-4 rounded-full bg-white text-black hover:bg-gray-200 transition-colors duration-300 font-semibold">
              Pedir con Padme
            </button>
          </div>
        </motion.div>
        
        {/* Gradient overlay at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-10" />
      </div>
    </div>
  );
}
