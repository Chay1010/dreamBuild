import React, { useState } from 'react';
import { PageProps } from '../types';
import { ArrowLeft, Sparkles, Heart, Eye, Share2, BadgeCheck, Palette, ArrowRight, Tag, Box, PenTool, Circle, Grid } from 'lucide-react';
import { translations } from '../translations';

type Category = 'all' | 'paint' | 'body' | 'art' | 'rims';

export const GalleryPage: React.FC<PageProps> = ({ onSwitch, lang }) => {
  const t = translations[lang].gallery;
  const [activeCategory, setActiveCategory] = useState<Category>('all');

  // Expanded dataset with categories
  const artists = [
    {
      id: 1,
      name: "Akira Digital",
      handle: "@akira_builds",
      image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
      art: "https://images.unsplash.com/photo-1614200179396-2bdb77ebf81b?q=80&w=1200&auto=format&fit=crop",
      style: "Cyberpunk Tokyo",
      category: "paint",
      signature: "Akira",
      likes: "12.4k",
      views: "45k",
      price: "$1,200"
    },
    {
      id: 2,
      name: "Marcus V8",
      handle: "@muscle_revival",
      image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=150&q=80",
      art: "https://images.unsplash.com/photo-1611566026373-c6c85447dbdc?q=80&w=1200&auto=format&fit=crop",
      style: "Widebody Muscle",
      category: "body",
      signature: "Marcus",
      likes: "8.9k",
      views: "32k",
      price: "$850"
    },
    {
      id: 3,
      name: "Elena Corsa",
      handle: "@euro_clean",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80",
      art: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=1200&auto=format&fit=crop",
      style: "Stance Culture",
      category: "rims",
      signature: "E.Corsa",
      likes: "15.1k",
      views: "60k",
      price: "$2,100"
    },
    {
      id: 4,
      name: "Drift King",
      handle: "@sideways_logic",
      image: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=150&q=80",
      art: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=1200&auto=format&fit=crop",
      style: "Abstract Livery",
      category: "art",
      signature: "DK",
      likes: "22k",
      views: "89k",
      price: "$3,500"
    },
    {
      id: 5,
      name: "Carbon Lab",
      handle: "@carbon_fiber_everything",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
      art: "https://images.unsplash.com/photo-1493238792015-164369288140?q=80&w=1200&auto=format&fit=crop",
      style: "Exposed Carbon",
      category: "body",
      signature: "CLab",
      likes: "6.5k",
      views: "12k",
      price: "$900"
    }
  ];

  const categories = [
    { id: 'all', label: t.categories.all, icon: Grid },
    { id: 'paint', label: t.categories.paint, icon: Palette },
    { id: 'body', label: t.categories.body, icon: Box },
    { id: 'art', label: t.categories.art, icon: PenTool },
    { id: 'rims', label: t.categories.rims, icon: Circle },
  ];

  const filteredArtists = activeCategory === 'all' 
    ? artists 
    : artists.filter(artist => artist.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#00C853] selection:text-black">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#050505]/80 backdrop-blur-md border-b border-white/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => onSwitch('landing')} 
              className="p-2 rounded-full hover:bg-white/10 transition-colors text-gray-400 hover:text-white"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-bold flex items-center gap-2 tracking-tight">
              <Sparkles className="w-5 h-5 text-[#00C853]" />
              {t.title}
            </h1>
          </div>
          <button 
            onClick={() => onSwitch('app')}
            className="hidden md:flex items-center gap-2 bg-[#00C853] text-black px-4 py-2 rounded-full text-sm font-bold hover:bg-[#00E676] transition-colors"
          >
            {translations[lang].nav.launch}
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Intro */}
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500">
            The Hall of <span className="text-[#00C853]">Fame</span>.
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto font-light">
            {t.subtitle}
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as Category)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 ${
                activeCategory === cat.id
                  ? 'bg-[#00C853] text-black shadow-[0_0_20px_rgba(0,200,83,0.3)]'
                  : 'bg-[#111] text-gray-400 border border-white/10 hover:border-white/30 hover:text-white'
              }`}
            >
              <cat.icon className="w-4 h-4" />
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="space-y-24">
          {filteredArtists.length > 0 ? (
            filteredArtists.map((artist) => (
              <div 
                key={artist.id} 
                className="group relative animate-fade-in"
              >
                {/* Card Container */}
                <div className="relative rounded-[2.5rem] overflow-hidden border border-white/10 bg-[#111] shadow-2xl transition-all duration-500 hover:border-[#00C853]/50 hover:shadow-[0_0_50px_rgba(0,200,83,0.1)]">
                  
                  <div className="grid md:grid-cols-12 gap-0">
                    {/* Image Side */}
                    <div className="md:col-span-8 relative h-[400px] md:h-[600px] overflow-hidden">
                      <img 
                        src={artist.art} 
                        alt={artist.style}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-[#111]"></div>
                      
                      {/* Style Tag */}
                      <div className="absolute top-6 left-6">
                        <div className="bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 flex items-center gap-2">
                          <Palette className="w-4 h-4 text-[#00C853]" />
                          <span className="text-xs font-bold tracking-widest uppercase">{artist.style}</span>
                        </div>
                      </div>
                    </div>

                    {/* Info Side */}
                    <div className="md:col-span-4 p-8 md:p-12 flex flex-col justify-between relative bg-[#111]">
                      
                      {/* Artist Profile */}
                      <div className="flex items-center gap-4 mb-8">
                        <div className="relative">
                          <img src={artist.image} alt={artist.name} className="w-16 h-16 rounded-full border-2 border-[#00C853]" />
                          <div className="absolute -bottom-1 -right-1 bg-[#00C853] p-1 rounded-full text-black">
                             <BadgeCheck className="w-3 h-3" />
                          </div>
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white">{artist.name}</h3>
                          <p className="text-sm text-gray-500 font-mono">{artist.handle}</p>
                          <span className="text-[10px] text-[#00C853] uppercase font-bold tracking-wider">{t.verified}</span>
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-4 py-8 border-t border-white/5 border-b mb-8">
                         <div>
                            <div className="flex items-center gap-2 text-gray-400 text-xs uppercase tracking-wider mb-1">
                               <Heart className="w-3 h-3" /> {t.likes}
                            </div>
                            <div className="text-2xl font-mono font-bold">{artist.likes}</div>
                         </div>
                         <div>
                            <div className="flex items-center gap-2 text-gray-400 text-xs uppercase tracking-wider mb-1">
                               <Eye className="w-3 h-3" /> {t.views}
                            </div>
                            <div className="text-2xl font-mono font-bold">{artist.views}</div>
                         </div>
                         <div>
                            <div className="flex items-center gap-2 text-gray-400 text-xs uppercase tracking-wider mb-1">
                               <Tag className="w-3 h-3" /> {t.price}
                            </div>
                            <div className="text-2xl font-mono font-bold text-[#00C853]">{artist.price}</div>
                         </div>
                      </div>

                      {/* Signature */}
                      <div className="font-heading text-4xl text-gray-700 italic opacity-50 absolute top-8 right-8 pointer-events-none select-none">
                        {artist.signature}
                      </div>

                      {/* Actions */}
                      <div className="space-y-4">
                        <button 
                           onClick={() => onSwitch('app')}
                           className="w-full bg-white text-black font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-[#00C853] hover:text-black transition-all group/btn"
                        >
                           <Sparkles className="w-5 h-5 fill-current" />
                           <span>{t.remix}</span>
                           <ArrowRight className="w-4 h-4 opacity-0 group-hover/btn:opacity-100 group-hover/btn:translate-x-1 transition-all" />
                        </button>
                        <button className="w-full bg-[#222] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-[#333] transition-colors border border-[#333]">
                           <Share2 className="w-5 h-5" />
                           <span>Share Concept</span>
                        </button>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
             <div className="text-center py-20 bg-[#111] rounded-3xl border border-dashed border-gray-800">
                <Box className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-400">No masterpieces found in this category yet.</h3>
             </div>
          )}
        </div>

        {/* Call to Action Footer */}
        <div className="mt-24 text-center">
           <p className="text-gray-500 mb-6">Want to be featured here?</p>
           <button 
             onClick={() => onSwitch('app')}
             className="text-[#00C853] font-bold text-lg hover:underline underline-offset-4 decoration-2"
           >
             Start Creating in Studio &rarr;
           </button>
        </div>

      </main>
      
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};