import { Package, Sparkles, Mic, Clock } from 'lucide-react';

const features = [
  {
    icon: <Package size={32} />,
    title: 'Cajas Originales',
    desc: 'Diseños exclusivos que destacan desde el primer vistazo.'
  },
  {
    icon: <Sparkles size={32} />,
    title: 'Personalización',
    desc: 'Adaptamos cada detalle a los gustos de esa persona especial.'
  },
  {
    icon: <Mic size={32} />,
    title: 'Atención IA',
    desc: 'Padme te ayuda a elegir y comprar usando solo tu voz.'
  },
  {
    icon: <Clock size={32} />,
    title: 'Entrega Rápida',
    desc: 'Llegamos a tiempo para que tu sorpresa sea perfecta.'
  }
];

export default function Features() {
  return (
    <section id="why" className="py-24 bg-[#0a0a0a]">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">¿Por qué CONCARIÑO?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => (
            <div key={idx} className="p-8 rounded-3xl bg-black border border-white/5 text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-[#111] flex items-center justify-center text-cyan-400 mb-6">
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
