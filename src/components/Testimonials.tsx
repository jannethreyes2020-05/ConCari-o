import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'María Fernanda',
    text: 'La caja de aniversario superó mis expectativas. Los detalles personalizados hicieron llorar a mi esposo de la emoción.',
    image: 'https://i.pravatar.cc/150?img=1'
  },
  {
    name: 'Carlos Ruiz',
    text: 'Usé a Padme para pedir un regalo de último minuto para mi mamá. Fue súper rápido y la entrega llegó perfecta.',
    image: 'https://i.pravatar.cc/150?img=11'
  },
  {
    name: 'Ana Sofía',
    text: 'Excelente presentación y calidad en los productos. Se nota el cariño que le ponen a cada caja que arman.',
    image: 'https://i.pravatar.cc/150?img=5'
  }
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-[#0a0a0a]">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">Lo que dicen nuestros clientes</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="p-8 rounded-3xl bg-[#111] border border-white/5">
              <div className="flex gap-1 text-[#FF8C69] mb-6">
                {[...Array(5)].map((_, j) => <Star key={j} size={16} fill="currentColor" />)}
              </div>
              <p className="text-gray-300 mb-8 italic">"{t.text}"</p>
              <div className="flex items-center gap-4">
                <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                <span className="font-bold">{t.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
