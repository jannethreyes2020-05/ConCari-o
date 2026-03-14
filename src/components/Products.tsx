import { motion } from 'framer-motion';

const products = [
  {
    id: 'caja1',
    name: 'CAJA 1 - Special Day',
    desc: 'Perfecta para cumpleaños y aniversarios. Incluye dulces premium y mensaje personalizado.',
    price: 35,
    image: 'https://res.cloudinary.com/dpla2cq4j/image/upload/v1773437294/Cajas_con_regalos_flotando_azul_fh7fun.jpg'
  },
  {
    id: 'caja2',
    name: 'CAJA 2 - Celebrations',
    desc: 'Ideal para logros y celebraciones corporativas. Elegancia en cada detalle.',
    price: 35,
    image: 'https://res.cloudinary.com/dpla2cq4j/image/upload/v1773437279/Cajas_con_regalos_flotando_blanca_t7bfw6.jpg'
  },
  {
    id: 'caja3',
    name: 'CAJA 3 - Novelty',
    desc: 'Un detalle único para cualquier ocasión. Sorprende con artículos de cuidado personal.',
    price: 30,
    image: 'https://res.cloudinary.com/dpla2cq4j/image/upload/v1773439647/Cajas_con_regalos_flotando_rosa_s88aff.jpg'
  }
];

export default function Products() {
  return (
    <section id="products" className="py-24 bg-black">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Nuestros Productos</h2>
          <p className="text-gray-400">Pídelos fácilmente usando a Padme, nuestra asistente de voz.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <motion.div 
              key={product.id}
              whileHover={{ y: -10 }}
              className="group rounded-3xl bg-[#111] border border-white/5 overflow-hidden"
            >
              <div className="aspect-square overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="p-8">
                <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                <p className="text-gray-400 text-sm mb-6 h-10">{product.desc}</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-[#FF8C69]">${product.price}</span>
                  <button className="px-6 py-2 rounded-full border border-white/20 text-sm font-semibold hover:bg-white hover:text-black transition-colors">
                    Agregar al carrito
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
