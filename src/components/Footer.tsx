export default function Footer() {
  return (
    <footer className="bg-[#050505] pt-24 pb-12 border-t border-white/10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <div className="text-3xl font-extrabold tracking-tighter mb-6">
              <span className="text-cyan-400">CON</span><span className="text-[#FF8C69]">CARIÑO</span>
            </div>
            <p className="text-gray-400 max-w-sm mb-8">
              Cajas de regalos personalizadas. Regala alegría, regala un detalle para recordar.
            </p>
            <form className="flex gap-2 max-w-md">
              <input 
                type="email" 
                placeholder="Tu correo electrónico" 
                className="bg-[#111] border border-white/10 rounded-full px-6 py-3 flex-1 focus:outline-none focus:border-cyan-400"
              />
              <button className="bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-gray-200 transition-colors">
                Suscribirse
              </button>
            </form>
          </div>
          
          <div>
            <h4 className="font-bold mb-6">Enlaces</h4>
            <ul className="space-y-4 text-gray-400">
              <li><a href="#about" className="hover:text-white transition-colors">Nosotros</a></li>
              <li><a href="#products" className="hover:text-white transition-colors">Regalos</a></li>
              <li><a href="#why" className="hover:text-white transition-colors">Por qué elegirnos</a></li>
              <li><a href="#blog" className="hover:text-white transition-colors">Blog</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-6">Contacto</h4>
            <ul className="space-y-4 text-gray-400">
              <li>hola@concarino.com</li>
              <li>+1 234 567 890</li>
              <li>Calle Principal 123, Ciudad</li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} CONCARIÑO. Todos los derechos reservados.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
            <a href="#" className="hover:text-white transition-colors">Facebook</a>
            <a href="#" className="hover:text-white transition-colors">TikTok</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
