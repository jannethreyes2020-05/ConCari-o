/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CartProvider } from './context/CartContext';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Products from './components/Products';
import Features from './components/Features';
import ProductInfo from './components/ProductInfo';
import Testimonials from './components/Testimonials';
import Blog from './components/Blog';
import Footer from './components/Footer';
import VoiceAgent from './components/VoiceAgent';
import Cart from './components/Cart';
import WhatsAppButton from './components/WhatsAppButton';

export default function App() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-black text-white font-sans selection:bg-cyan-400/30">
        <Navigation />
        <Hero />
        <About />
        <Products />
        <Features />
        <ProductInfo />
        <Testimonials />
        <Blog />
        <Footer />
        <VoiceAgent />
        <Cart />
        <WhatsAppButton />
      </div>
    </CartProvider>
  );
}
