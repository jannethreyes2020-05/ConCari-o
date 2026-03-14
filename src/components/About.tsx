export default function About() {
  return (
    <section id="about" className="py-24 bg-[#0a0a0a]">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-8">Nuestra Tradición</h2>
          <p className="text-gray-400 text-lg md:text-xl leading-relaxed mb-16">
            En CONCARIÑO, creemos que cada regalo cuenta una historia. Durante años, nos hemos dedicado a crear experiencias únicas a través de cajas de regalos personalizadas, diseñadas para emocionar y perdurar en la memoria.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-[#111] border border-white/5">
              <div className="text-4xl font-extrabold text-cyan-400 mb-2">5+</div>
              <div className="text-gray-400">Años en el mercado</div>
            </div>
            <div className="p-8 rounded-3xl bg-[#111] border border-white/5">
              <div className="text-4xl font-extrabold text-[#FF8C69] mb-2">10k+</div>
              <div className="text-gray-400">Regalos entregados</div>
            </div>
            <div className="p-8 rounded-3xl bg-[#111] border border-white/5">
              <div className="text-4xl font-extrabold text-white mb-2">100%</div>
              <div className="text-gray-400">Personalización</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
