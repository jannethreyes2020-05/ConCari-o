export default function ProductInfo() {
  return (
    <section className="py-24 bg-black border-y border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-8 leading-tight">Más que un regalo material, <span className="text-[#FF8C69]">un recuerdo.</span></h2>
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold mb-2 text-cyan-400">Variedad de temáticas</h3>
                <p className="text-gray-400">Cumpleaños, aniversarios, agradecimientos, celebraciones corporativas, entre otros.</p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-cyan-400">Contenido personalizado</h3>
                <p className="text-gray-400">Cada caja puede incluir productos adaptados al gusto del cliente (dulces, bebidas, accesorios, artículos de cuidado personal, mensajes escritos a mano).</p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-cyan-400">Enfoque emocional</h3>
                <p className="text-gray-400">Buscamos crear una conexión genuina con la persona que recibe el detalle.</p>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/5] rounded-3xl overflow-hidden">
              <img 
                src="https://res.cloudinary.com/dpla2cq4j/image/upload/v1773437294/Cajas_con_regalos_flotando_azul_fh7fun.jpg" 
                alt="Detalle de caja" 
                className="w-full h-full object-cover opacity-80"
              />
            </div>
            <div className="absolute -bottom-8 -left-8 bg-[#111] p-8 rounded-3xl border border-white/10 max-w-xs hidden md:block">
              <p className="text-lg font-bold mb-2">"El mejor regalo que he recibido."</p>
              <p className="text-sm text-gray-400">- Cliente Feliz</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
