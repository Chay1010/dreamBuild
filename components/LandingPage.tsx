import React, { useState, useRef } from 'react';
import { PageProps } from '../types';
import { ArrowRight, ShieldCheck, Megaphone, Car, Loader2, Upload, Sparkles, Check, Zap, Globe, DollarSign, Handshake, Speaker } from 'lucide-react';
import { translations } from '../translations';

export const LandingPage: React.FC<PageProps> = ({ onSwitch, lang, setLang }) => {
  const t = translations[lang];
  const [sliderPosition, setSliderPosition] = useState(50);
  const heroRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (heroRef.current) {
      const rect = heroRef.current.getBoundingClientRect();
      const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const position = ((x - rect.left) / rect.width) * 100;
      setSliderPosition(Math.min(Math.max(position, 0), 100));
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-gray-900 font-sans selection:bg-[#00C853] selection:text-white pb-20 overflow-x-hidden">

      {/* --- Header --- */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 py-4 px-6 sticky top-0 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-1 select-none cursor-pointer group" onClick={() => window.location.reload()}>
              <img src="/assets/logo.png" alt="DreamBuild AI" className="h-16 w-auto object-contain" />
            </div>

            <nav className="hidden md:flex items-center gap-8">
              {[
                { label: t.nav.gallery, key: 'gallery' },
                { label: t.nav.team, key: 'team' },
                { label: t.nav.about, key: 'about' },
                { label: t.nav.pricing, key: 'pricing' },
                { label: t.nav.howItWorks, key: 'how-it-works' }
              ].map((item) => (
                <button
                  key={item.key}
                  onClick={() => onSwitch(item.key as any)}
                  className={`text-sm font-semibold transition-colors ${item.key === 'gallery' ? 'text-[#00C853] font-bold' : 'text-gray-500 hover:text-[#00C853]'}`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            {/* Language Switcher */}
            <button
              onClick={() => setLang(lang === 'en' ? 'fr' : 'en')}
              className="flex items-center gap-1 text-sm font-bold text-gray-600 hover:text-black transition-colors"
            >
              <Globe className="w-4 h-4" />
              {lang.toUpperCase()}
            </button>

            <button
              onClick={() => onSwitch('app')}
              className="group flex items-center gap-2 bg-[#0e0e0e] hover:bg-[#00C853] text-white hover:text-black px-5 py-2.5 rounded-full font-bold transition-all duration-300 shadow-lg shadow-black/5 hover:shadow-green-400/30"
            >
              <span>{t.nav.launch}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-[1400px] mx-auto px-4 md:px-6 mt-12 space-y-24">

        {/* --- Hero Section (Interactive Slider) --- */}
        <section className="text-center space-y-8">
          <div className="space-y-4 max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 border border-green-100 text-[#00C853] text-xs font-bold tracking-wide uppercase mb-2">
              <Sparkles className="w-3 h-3" /> {t.hero.badge}
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 leading-[1.1] tracking-tight">
              {t.hero.title1} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00C853] to-emerald-700">{t.hero.title2}</span>
            </h1>
            <p className="text-xl text-gray-500 font-medium max-w-2xl mx-auto">
              {t.hero.subtitle}
            </p>
          </div>

          {/* The Slider Component */}
          <div
            ref={heroRef}
            className="relative w-full max-w-5xl mx-auto h-[400px] md:h-[600px] rounded-[2.5rem] overflow-hidden shadow-2xl cursor-ew-resize select-none border-[8px] border-white ring-1 ring-gray-100"
            onMouseMove={handleMouseMove}
            onTouchMove={handleMouseMove}
          >
            {/* Base Image (After/Supercar) */}
            <div className="absolute inset-0">
              <img
                src="/assets/after.png"
                className="w-full h-full object-cover"
                draggable="false"
                alt="After"
              />
              <div className="absolute top-8 right-8 bg-black/60 backdrop-blur-md text-white px-4 py-2 rounded-xl font-bold text-sm border border-white/10">
                {t.hero.after}
              </div>
            </div>

            {/* Overlay Image (Before/Rusty) - Clipped */}
            <div
              className="absolute inset-0 w-full h-full"
              style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
              <img
                src="/assets/before.png"
                className="w-full h-full object-cover grayscale"
                draggable="false"
                alt="Before"
              />
              <div className="absolute top-8 left-8 bg-white/90 backdrop-blur-md text-gray-900 px-4 py-2 rounded-xl font-bold text-sm shadow-sm">
                {t.hero.before}
              </div>
            </div>

            {/* Slider Handle */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-10 flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.5)]"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center border-4 border-[#00C853] text-[#00C853]">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="rotate-180 absolute"><path d="m9 18 6-6-6-6" /></svg>
              </div>
            </div>
          </div>
        </section>

        {/* --- Workflow / Demo Section --- */}
        <section>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-4">{t.demo.title}</h2>
            <p className="text-gray-500">{t.demo.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
            {/* Connecting Lines (Desktop only) */}
            <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -z-10 -translate-y-1/2"></div>

            {/* Step 1: Input */}
            {/* Step 1: Input */}
            <div className="bg-white p-2 rounded-[2rem] shadow-xl shadow-gray-200/50 border border-gray-100 group hover:-translate-y-2 transition-transform duration-300">
              <div className="bg-gray-50 rounded-[1.5rem] p-8 h-full flex flex-col items-center text-center relative overflow-hidden">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-6 z-10 font-bold text-gray-400">01</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{t.demo.step1}</h3>
                <p className="text-sm text-gray-500 mb-6">{t.demo.step1desc}</p>

                <div className="relative w-full aspect-square bg-white rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center group-hover:border-[#00C853] transition-colors cursor-pointer overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=800&auto=format&fit=crop"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    alt="Input wheel"
                  />
                  <div className="absolute inset-0 bg-white/50 backdrop-blur-[2px] flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Upload className="w-8 h-8 text-[#00C853] mb-2" />
                    <span className="text-xs font-bold text-gray-900">{t.demo.step1btn}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2: Processing (The Magic) - Redesigned */}
            <div className="bg-white p-2 rounded-[2rem] shadow-xl shadow-purple-500/20 border border-purple-200 group relative z-10 scale-105">
              <div className="bg-[#111] rounded-[1.5rem] p-8 h-full flex flex-col items-center text-center text-white relative overflow-hidden ring-1 ring-white/10">
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/40 via-transparent to-[#00C853]/20 opacity-60"></div>
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>

                {/* New Icon & Glow */}
                <div className="relative w-20 h-20 mb-8 z-10">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-xl opacity-50 animate-pulse"></div>
                  <div className="relative w-full h-full bg-gradient-to-br from-white to-gray-200 rounded-2xl shadow-2xl flex items-center justify-center text-purple-600 transform group-hover:rotate-12 transition-transform duration-500">
                    <Zap className="w-10 h-10 fill-current" />
                  </div>
                </div>

                <h3 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 mb-3 relative z-10">{t.demo.step2}</h3>
                <p className="text-sm text-gray-400 mb-8 relative z-10 max-w-[80%]">{t.demo.step2desc}</p>

                <button
                  onClick={() => onSwitch('app')}
                  className="w-full relative overflow-hidden bg-white text-black font-extrabold py-4 px-6 rounded-xl hover:scale-[1.02] active:scale-95 transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)] flex items-center justify-center gap-2 mb-6 group/btn z-10"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 translate-x-[-100%] group-hover/btn:translate-x-0 transition-transform duration-300"></div>
                  <span className="relative z-10">{t.demo.step2btn}</span>
                  <Sparkles className="w-4 h-4 fill-black relative z-10" />
                </button>

                <div className="flex items-center gap-2 text-purple-400 text-[10px] font-mono tracking-widest uppercase bg-white/5 py-1.5 px-3 rounded-full border border-white/5 relative z-10">
                  <Loader2 className="w-3 h-3 animate-spin" />
                  <span>{t.demo.step2status}</span>
                </div>
              </div>
            </div>

            {/* Step 3: Output */}
            <div className="bg-white p-2 rounded-[2rem] shadow-xl shadow-gray-200/50 border border-gray-100 group hover:-translate-y-2 transition-transform duration-300">
              <div className="bg-gray-50 rounded-[1.5rem] p-8 h-full flex flex-col items-center text-center relative">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-6 z-10 font-bold text-gray-400">03</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{t.demo.step3}</h3>
                <p className="text-sm text-gray-500 mb-6">{t.demo.step3desc}</p>

                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-lg group-hover:shadow-2xl transition-all">
                  <img
                    src="https://images.unsplash.com/photo-1614169649710-bce8e293ae66?q=80&w=1000&auto=format&fit=crop"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    alt="Cyber Car Concept"
                  />
                  <div className="absolute bottom-2 left-2 right-2 bg-[#00C853]/90 backdrop-blur-md text-white py-2 px-3 rounded-lg flex items-center justify-center gap-2">
                    <ShieldCheck className="w-3 h-3 shrink-0" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">{t.demo.legal}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- Features Grid (Ad Maker & Business) --- */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">

          {/* Ad Maker Feature */}
          <div className="bg-white rounded-[2.5rem] p-10 border border-gray-200 shadow-sm flex flex-col md:flex-row items-center gap-8 overflow-hidden relative group">
            <div className="flex-1 z-10">
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6">
                <Megaphone className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">{t.features.adMaker}</h3>
              <p className="text-gray-500 mb-6 leading-relaxed">
                {t.features.adDesc}
              </p>
              <div className="flex items-center gap-2 text-sm font-bold text-gray-900">
                <Check className="w-4 h-4 text-[#00C853]" /> {t.features.oneClick}
              </div>
            </div>

            {/* Mockup Card */}
            <div className="w-full md:w-64 shrink-0 rotate-3 group-hover:rotate-0 transition-transform duration-500">
              <div className="bg-white p-3 rounded-2xl shadow-2xl border border-gray-100">
                <div className="aspect-[4/5] rounded-xl bg-gray-900 relative overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1489824904134-891ab64532f1?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover opacity-80" alt="Engine Part" />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <div className="w-8 h-1 bg-white/50 rounded-full"></div>
                    <div className="w-8 h-1 bg-white/20 rounded-full"></div>
                  </div>
                  <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black to-transparent">
                    <div className="bg-[#00C853] text-black text-xs font-bold px-2 py-1 rounded w-fit mb-2">$150.00</div>
                    <p className="text-white text-xs font-bold">DreamBuild Parts Store</p>
                    <p className="text-gray-400 text-[10px]">(555) 000-0000</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Virtual Try On Feature */}
          <div className="bg-[#0e0e0e] text-white rounded-[2.5rem] p-10 border border-gray-800 shadow-sm flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 rounded-full blur-[80px] -mr-16 -mt-16 pointer-events-none"></div>

            <div className="z-10">
              <div className="w-12 h-12 bg-red-500/10 rounded-2xl flex items-center justify-center text-red-500 mb-6 border border-red-500/20">
                <Car className="w-6 h-6" />
              </div>
              <div className="flex items-center gap-3 mb-3">
                <h3 className="text-2xl font-bold">{t.features.virtualTry}</h3>
                <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full">{t.features.beta}</span>
              </div>
              <p className="text-gray-400 mb-8 leading-relaxed">
                {t.features.virtualDesc}
              </p>
            </div>

            <div className="bg-[#1a1a1a] rounded-xl p-4 flex items-center gap-4 border border-[#333]">
              <div className="w-12 h-12 rounded-lg bg-[#222] flex items-center justify-center">
                <Upload className="w-5 h-5 text-gray-500" />
              </div>
              <div>
                <div className="text-sm font-bold text-gray-200">{t.features.uploadCar}</div>
                <div className="text-xs text-gray-500">{t.features.comingSoon}</div>
              </div>
              <button className="ml-auto w-8 h-8 rounded-full bg-[#333] flex items-center justify-center text-gray-500 cursor-not-allowed">
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </section>

        {/* --- Business Model (Value Props) --- */}
        <section className="border-t border-gray-200 pt-16">
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4 tracking-tight">{t.business.title}</h2>
            <p className="text-lg text-gray-500 font-medium">{t.business.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: t.business.saas, desc: t.business.saasDesc, Icon: DollarSign },
              { title: t.business.affiliate, desc: t.business.affiliateDesc, Icon: Handshake },
              { title: t.business.native, desc: t.business.nativeDesc, Icon: Speaker }
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center p-8 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="text-5xl mb-6 bg-gray-50 w-20 h-20 flex items-center justify-center rounded-2xl">
                  <item.Icon className="w-10 h-10 text-gray-700" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h4>
                <p className="text-gray-500 leading-relaxed text-sm font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <div className="text-center py-8 border-t border-gray-200">
          <p className="text-gray-400 text-xs font-medium tracking-wide uppercase">{t.footer}</p>
        </div>
      </div>
    </div>
  );
};