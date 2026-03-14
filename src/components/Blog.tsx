const posts = [
  {
    title: '5 ideas de regalos para aniversarios inolvidables',
    date: '12 Oct 2025',
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=800&auto=format&fit=crop'
  },
  {
    title: 'Cómo personalizar una caja para tu mejor amiga',
    date: '05 Nov 2025',
    image: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?q=80&w=800&auto=format&fit=crop'
  },
  {
    title: 'Regalos corporativos que sí emocionan',
    date: '20 Nov 2025',
    image: 'https://images.unsplash.com/photo-1513128034602-7814ccaddd4e?q=80&w=800&auto=format&fit=crop'
  }
];

export default function Blog() {
  return (
    <section id="blog" className="py-24 bg-black">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-end mb-16">
          <h2 className="text-3xl md:text-5xl font-bold">Nuestro Blog</h2>
          <button className="text-cyan-400 hover:text-cyan-300 font-semibold hidden md:block">Ver todos los artículos</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post, i) => (
            <div key={i} className="group cursor-pointer">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden mb-6">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <p className="text-gray-500 text-sm mb-2">{post.date}</p>
              <h3 className="text-xl font-bold group-hover:text-[#FF8C69] transition-colors">{post.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
