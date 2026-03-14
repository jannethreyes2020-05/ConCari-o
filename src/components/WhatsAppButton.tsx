import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  return (
    <a 
      href="https://wa.me/1234567890" 
      target="_blank" 
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-40 w-16 h-16 bg-[#25D366] rounded-full shadow-2xl flex items-center justify-center hover:bg-[#20bd5a] transition-colors hover:scale-110 duration-300"
    >
      <MessageCircle size={32} className="text-white" />
    </a>
  );
}
