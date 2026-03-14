import { useState, useEffect } from 'react';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const { items, setIsOpen } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? 'bg-black/80 backdrop-blur-md py-4 border-b border-white/10' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="text-2xl font-extrabold tracking-tighter">
          <span className="text-cyan-400">CON</span><span className="text-[#FF8C69]">CARIÑO</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
          <a href="#about" className="hover:text-white transition-colors">Nosotros</a>
          <a href="#products" className="hover:text-white transition-colors">Regalos</a>
          <a href="#why" className="hover:text-white transition-colors">Por qué elegirnos</a>
          <a href="#testimonials" className="hover:text-white transition-colors">Reseñas</a>
          <a href="#blog" className="hover:text-white transition-colors">Blog</a>
        </div>

        <button 
          onClick={() => setIsOpen(true)}
          className="relative p-2 text-white hover:text-cyan-400 transition-colors"
        >
          <ShoppingBag size={24} />
          {itemCount > 0 && (
            <span className="absolute top-0 right-0 bg-[#FF8C69] text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {itemCount}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
}
