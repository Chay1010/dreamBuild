import React, { useState, useEffect } from 'react';
import { PageProps } from '../types';
import { ArrowLeft, Shield, Users, HelpCircle, FileText, Linkedin, Twitter, Mail, Zap, Cpu, Globe, Recycle, Camera, Sliders, PlayCircle, Lock, Eye, FileCheck, Box, Car, Settings, PaintBucket, ArrowRight, ScanLine, Smartphone, CreditCard, Building2, Check, CheckCircle2 } from 'lucide-react';
import { translations } from '../translations';

const PageLayout: React.FC<{ title: string; icon: React.ReactNode; onSwitch: PageProps['onSwitch']; children: React.ReactNode }> = ({ title, icon, onSwitch, children }) => (
  <div className="min-h-screen bg-[#F8F9FA] text-gray-900 font-sans">
    <header className="bg-white border-b border-gray-200 py-4 px-6 sticky top-0 z-50 shadow-sm/50 backdrop-blur-md bg-white/90">
      <div className="max-w-6xl mx-auto flex items-center gap-4">
        <button onClick={() => onSwitch('landing')} className="p-2 hover:bg-gray-100 rounded-full transition-colors group">
          <ArrowLeft className="w-6 h-6 text-gray-600 group-hover:text-[#00C853] transition-colors" />
        </button>
        <h1 className="text-xl font-bold flex items-center gap-2 text-gray-800">
          {icon} {title}
        </h1>
      </div>
    </header>
    <main className="max-w-6xl mx-auto px-6 py-12">
      {children}
    </main>
  </div>
);

export const TeamPage: React.FC<PageProps> = ({ onSwitch, lang }) => {
  const t = translations[lang].info;
  const teamMembers = [
    { 
      name: "Sarah Jenkins", 
      role: "CEO & Founder", 
      bio: "Former Tesla design lead obsessed with restomods.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80" 
    },
    { 
      name: "David Chen", 
      role: "CTO & AI Architect", 
      bio: "PhD in Computer Vision. Built the engine for rim detection.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80" 
    },
    { 
      name: "Amira Khalid", 
      role: "Head of Product", 
      bio: "UX wizard ensuring your dream car doesn't look like a nightmare.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80" 
    },
    { 
      name: "James Wilson", 
      role: "Senior ML Engineer", 
      bio: "Specializes in NeRFs and 3D reconstruction pipelines.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80" 
    },
    { 
      name: "Sofia Rodriguez", 
      role: "Marketing Director", 
      bio: "Connecting car culture with future tech.",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80" 
    },
    { 
      name: "Michael Chang", 
      role: "Lead Developer", 
      bio: "Full-stack engineer. Drives a tuned '98 Supra.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80" 
    }
  ];

  return (
    <PageLayout title={t.team} icon={<Users className="w-6 h-6 text-[#00C853]" />} onSwitch={onSwitch}>
      <div className="text-center mb-16 relative">
        <span className="text-[#00C853] font-bold tracking-wider uppercase text-xs md:text-sm mb-3 block">{t.squad}</span>
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
          {t.meet} <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00C853] to-emerald-700">{t.visionaries}</span>
        </h2>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
          {t.teamDesc}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {teamMembers.map((member, i) => (
          <div key={i} className="group relative bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-2xl hover:shadow-emerald-900/5 transition-all duration-500">
            {/* Image Container */}
            <div className="aspect-[4/3] overflow-hidden relative bg-gray-100">
               <img 
                 src={member.image} 
                 alt={member.name} 
                 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter grayscale group-hover:grayscale-0" 
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
               
               {/* Floating Socials */}
               <div className="absolute bottom-5 right-5 flex gap-3 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out delay-75">
                  <a href="#" className="w-9 h-9 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-[#00C853] hover:border-[#00C853] transition-all border border-white/30">
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a href="#" className="w-9 h-9 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-[#00C853] hover:border-[#00C853] transition-all border border-white/30">
                    <Twitter className="w-4 h-4" />
                  </a>
                  <a href="#" className="w-9 h-9 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-[#00C853] hover:border-[#00C853] transition-all border border-white/30">
                    <Mail className="w-4 h-4" />
                  </a>
               </div>
            </div>

            {/* Content */}
            <div className="p-7 relative">
              <div className="mb-4">
                 <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#00C853] transition-colors mb-1">{member.name}</h3>
                 <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{member.role}</p>
              </div>
              <div className="w-full h-px bg-gray-100 group-hover:bg-[#00C853]/20 transition-colors mb-4"></div>
              <p className="text-gray-500 text-sm leading-relaxed">
                {member.bio}
              </p>
            </div>
            
            {/* Decorative Element */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#00C853]/5 rounded-bl-[100px] -mr-8 -mt-8 pointer-events-none group-hover:bg-[#00C853]/10 transition-colors"></div>
          </div>
        ))}
      </div>
    </PageLayout>
  );
};

export const AboutPage: React.FC<PageProps> = ({ onSwitch, lang }) => {
  const t = translations[lang].info;
  return (
  <PageLayout title={t.about} icon={<HelpCircle className="w-6 h-6 text-[#00C853]" />} onSwitch={onSwitch}>
    
    {/* Hero / Intro */}
    <div className="relative rounded-3xl overflow-hidden bg-white shadow-sm border border-gray-100 mb-12">
      <div className="grid md:grid-cols-2 gap-0">
        <div className="p-10 flex flex-col justify-center">
          <span className="text-[#00C853] font-bold tracking-wider uppercase text-xs mb-3">{t.vision}</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
            {t.reimagine} <span className="text-[#00C853]">{t.autoParts}</span>.
          </h2>
          <p className="text-gray-500 text-lg leading-relaxed mb-6">
            {t.aboutDesc}
          </p>
          <div className="flex items-center gap-3">
             <div className="h-10 w-1 bg-[#00C853] rounded-full"></div>
             <p className="text-gray-900 font-bold italic">"The Eye Buys the Dream."</p>
          </div>
        </div>
        <div className="relative h-64 md:h-auto bg-gray-100">
          <img 
            src="https://images.unsplash.com/photo-1618424181497-157f2c908584?q=80&w=2000&auto=format&fit=crop" 
            alt="Futuristic Car Wireframe" 
            className="w-full h-full object-cover grayscale mix-blend-multiply opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-transparent md:bg-gradient-to-r"></div>
        </div>
      </div>
    </div>

    {/* The Three Pillars */}
    <div className="grid md:grid-cols-3 gap-6 mb-12">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
        <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center mb-6 text-gray-700">
          <Globe className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-3">{t.sellers}</h3>
        <p className="text-gray-500 leading-relaxed">
          Giving salvage yards and mechanics the marketing tools of Fortune 500 car brands using Generative AI.
        </p>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
        <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mb-6 text-[#00C853]">
          <Cpu className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-3">{t.techStack}</h3>
        <p className="text-gray-500 leading-relaxed">
          Powered by Google's Gemini 3 Pro for photorealism and Veo 3.1 for cinematic video generation.
        </p>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
        <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center mb-6 text-gray-700">
          <Recycle className="w-6 h-6" /> 
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-3">{t.sustainability}</h3>
        <p className="text-gray-500 leading-relaxed">
          Promoting the circular economy by making used parts desirable again, reducing manufacturing waste.
        </p>
      </div>
    </div>

    {/* Stats / Impact */}
    <div className="bg-[#0e0e0e] rounded-3xl p-10 md:p-16 text-center text-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
         <div className="absolute right-0 top-0 w-64 h-64 bg-[#00C853] rounded-full blur-[100px]"></div>
         <div className="absolute left-0 bottom-0 w-64 h-64 bg-blue-600 rounded-full blur-[100px]"></div>
      </div>
      
      <div className="relative z-10 max-w-3xl mx-auto">
        <h3 className="text-2xl md:text-3xl font-bold mb-6">{t.futureCommerce}</h3>
        <p className="text-gray-400 mb-10 text-lg">
          We are not just generating images; we are generating value for the $1.2 Trillion global automotive aftermarket industry.
        </p>
        <button onClick={() => onSwitch('app')} className="bg-[#00C853] text-black font-bold py-4 px-10 rounded-full hover:scale-105 transition-transform shadow-[0_0_20px_rgba(0,200,83,0.4)] flex items-center gap-2 mx-auto">
          <Zap className="w-5 h-5 fill-current" />
          {t.tryTech}
        </button>
      </div>
    </div>

  </PageLayout>
  );
};

export const HowItWorksPage: React.FC<PageProps> = ({ onSwitch, lang }) => {
  const t = translations[lang].info;
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const steps = [
    {
      id: 0,
      title: t.step1,
      subtitle: "Ingest & Identify",
      icon: Box,
      description: "Upload a raw image or 3D scan of your part. Our computer vision algorithms automatically detect the type, material, and condition.",
      color: "text-blue-500",
      bg: "bg-blue-500"
    },
    {
      id: 1,
      title: t.step2,
      subtitle: "Match & Fit",
      icon: Car,
      description: "The AI reconstructs the perfect vehicle context. It places your rim on a cyber-sedan or your bumper on a drift missile.",
      color: "text-[#00C853]",
      bg: "bg-[#00C853]"
    },
    {
      id: 2,
      title: t.step3,
      subtitle: "Tune & Render",
      icon: Settings,
      description: "Fine-tune the aesthetics using the Studio controls. Adjust lighting, paint finish (Matte/Gloss), and camera angles before finalizing.",
      color: "text-purple-500",
      bg: "bg-purple-500"
    }
  ];

  return (
    <PageLayout title={t.howItWorks} icon={<FileText className="w-6 h-6 text-[#00C853]" />} onSwitch={onSwitch}>
      <div className="text-center mb-16 max-w-3xl mx-auto">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-6">
          Master the <span className="text-[#00C853]">{t.pipeline}</span>
        </h2>
        <p className="text-lg text-gray-500">
          {t.howDesc}
        </p>
      </div>

      {/* Interactive Process Visualization */}
      <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
        
        {/* Left: Interactive Steps List */}
        <div className="space-y-4">
          {steps.map((step, index) => (
            <div 
              key={step.id}
              className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer ${
                activeStep === index 
                  ? 'bg-white border-[#00C853] shadow-lg shadow-green-900/5 scale-[1.02]' 
                  : 'bg-white border-gray-100 hover:border-gray-200'
              }`}
              onClick={() => setActiveStep(index)}
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                  activeStep === index ? `${step.bg} text-white` : 'bg-gray-50 text-gray-400'
                }`}>
                  <step.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className={`font-bold text-lg mb-1 ${activeStep === index ? 'text-gray-900' : 'text-gray-500'}`}>
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right: Simulated Screen Preview */}
        <div className="relative">
          {/* Phone Frame */}
          <div className="relative mx-auto border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-xl">
            <div className="w-[148px] h-[18px] bg-gray-800 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute"></div>
            <div className="h-[32px] w-[3px] bg-gray-800 absolute -start-[17px] top-[72px] rounded-s-lg"></div>
            <div className="h-[46px] w-[3px] bg-gray-800 absolute -start-[17px] top-[124px] rounded-s-lg"></div>
            <div className="h-[64px] w-[3px] bg-gray-800 absolute -end-[17px] top-[142px] rounded-e-lg"></div>
            <div className="rounded-[2rem] overflow-hidden w-full h-full bg-[#0e0e0e] text-white relative flex flex-col">
              
              {/* Fake App Header */}
              <div className="bg-[#111] p-4 flex justify-between items-center border-b border-[#222]">
                <span className="font-bold text-xs text-[#00FF41]">STUDIO v2.1</span>
                <div className="flex gap-1">
                   <div className="w-2 h-2 rounded-full bg-red-500"></div>
                   <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                </div>
              </div>

              {/* Fake Sidebar Icons (Animated) */}
              <div className="absolute left-0 top-16 bottom-0 w-12 bg-[#111] border-r border-[#222] flex flex-col items-center py-4 gap-4">
                <div className={`w-8 h-8 rounded flex items-center justify-center transition-all duration-300 ${activeStep === 0 ? 'bg-[#00FF41]/20 text-[#00FF41]' : 'text-gray-600'}`}>
                  <Box className="w-4 h-4" />
                </div>
                <div className={`w-8 h-8 rounded flex items-center justify-center transition-all duration-300 ${activeStep === 1 ? 'bg-[#00FF41]/20 text-[#00FF41]' : 'text-gray-600'}`}>
                  <Car className="w-4 h-4" />
                </div>
                <div className={`w-8 h-8 rounded flex items-center justify-center transition-all duration-300 ${activeStep === 2 ? 'bg-[#00FF41]/20 text-[#00FF41]' : 'text-gray-600'}`}>
                  <Settings className="w-4 h-4" />
                </div>
              </div>

              {/* Fake Content Area */}
              <div className="ml-12 p-4 flex-1 flex flex-col">
                 <div className="flex-1 bg-[#1a1a1a] rounded-xl border border-[#333] relative overflow-hidden flex items-center justify-center mb-4">
                    {/* Animated Content Switching */}
                    {activeStep === 0 && (
                      <div className="text-center animate-fade-in">
                        <ScanLine className="w-12 h-12 text-blue-500 mx-auto mb-2 animate-pulse" />
                        <span className="text-[10px] font-mono text-blue-400">SCANNING GEOMETRY...</span>
                      </div>
                    )}
                    {activeStep === 1 && (
                      <div className="text-center animate-fade-in">
                        <Car className="w-12 h-12 text-[#00FF41] mx-auto mb-2" />
                        <span className="text-[10px] font-mono text-[#00FF41]">FITTING TO CHASSIS...</span>
                      </div>
                    )}
                    {activeStep === 2 && (
                      <div className="text-center animate-fade-in">
                         <div className="flex gap-1 justify-center mb-2">
                           <div className="w-1 h-6 bg-purple-500 rounded-full animate-[bounce_1s_infinite]"></div>
                           <div className="w-1 h-4 bg-purple-500 rounded-full animate-[bounce_1.2s_infinite]"></div>
                           <div className="w-1 h-8 bg-purple-500 rounded-full animate-[bounce_0.8s_infinite]"></div>
                         </div>
                        <span className="text-[10px] font-mono text-purple-400">RENDERING 4K...</span>
                      </div>
                    )}
                 </div>

                 {/* Fake Controls */}
                 <div className="h-24 bg-[#111] rounded-xl border border-[#222] p-3 space-y-2">
                    <div className="h-1 bg-[#333] rounded-full overflow-hidden">
                      <div className={`h-full transition-all duration-1000 ${
                        activeStep === 0 ? 'w-1/3 bg-blue-500' :
                        activeStep === 1 ? 'w-2/3 bg-[#00FF41]' :
                        'w-full bg-purple-500'
                      }`}></div>
                    </div>
                    <div className="flex justify-between items-center">
                       <div className="h-2 w-12 bg-[#333] rounded"></div>
                       <div className="h-6 w-16 bg-[#222] rounded border border-[#333] text-[8px] text-gray-500 flex items-center justify-center">
                         ADJUST
                       </div>
                    </div>
                 </div>
              </div>

            </div>
          </div>
          
          {/* Decor */}
          <div className="absolute top-1/2 -right-12 lg:-right-24 -translate-y-1/2 hidden md:block">
            <div className="space-y-4">
              <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100 flex items-center gap-3 w-48 opacity-50">
                <Shield className="w-4 h-4 text-gray-400" />
                <div className="h-2 w-20 bg-gray-100 rounded"></div>
              </div>
              <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-100 flex items-center gap-3 w-56 -ml-4 scale-110 relative z-10">
                <CheckCircle2 className="w-5 h-5 text-[#00C853]" />
                <div>
                   <div className="text-xs font-bold text-gray-900">Step Complete</div>
                   <div className="text-[10px] text-gray-500">Ready for export</div>
                </div>
              </div>
              <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100 flex items-center gap-3 w-48 opacity-50">
                <PaintBucket className="w-4 h-4 text-gray-400" />
                <div className="h-2 w-20 bg-gray-100 rounded"></div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gray-900 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
           <div className="w-12 h-12 bg-[#00C853] rounded-full flex items-center justify-center animate-pulse">
             <Zap className="w-6 h-6 text-black fill-black" />
           </div>
           <div>
             <h4 className="text-white font-bold text-xl">Ready to transform your inventory?</h4>
             <p className="text-gray-400">Join 500+ sellers using DreamBuild today.</p>
           </div>
        </div>
        <button 
          onClick={() => onSwitch('app')}
          className="bg-white text-black font-bold py-3 px-8 rounded-xl hover:bg-gray-100 transition-colors whitespace-nowrap"
        >
          {t.launchFree}
        </button>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
      `}</style>
    </PageLayout>
  );
};

export const PrivacyPage: React.FC<PageProps> = ({ onSwitch, lang }) => {
  const t = translations[lang].info;
  return (
  <PageLayout title={t.privacy} icon={<Shield className="w-6 h-6 text-[#00C853]" />} onSwitch={onSwitch}>
    <div className="grid md:grid-cols-12 gap-8">
      
      {/* Sidebar Navigation (Visual Only) */}
      <div className="md:col-span-4 lg:col-span-3 space-y-2">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 sticky top-24">
          <h4 className="font-bold text-gray-900 mb-4 px-2">{t.tableContents}</h4>
          <ul className="space-y-1 text-sm">
            <li className="px-3 py-2 bg-green-50 text-[#00C853] font-medium rounded-lg">1. {t.dataCollection}</li>
            <li className="px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer">2. {t.imageProcessing}</li>
            <li className="px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer">3. {t.thirdParty}</li>
            <li className="px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer">4. {t.aiSafety}</li>
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="md:col-span-8 lg:col-span-9 space-y-8">
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <Lock className="w-6 h-6 text-[#00C853]" />
            <h3 className="text-xl font-bold text-gray-900">1. {t.dataCollection}</h3>
          </div>
          <p className="text-gray-500 leading-relaxed mb-4">
            Your privacy is paramount. When you use DreamBuild AI, we collect only the necessary information to provide our services. This includes account information and the specific images you upload for processing.
          </p>
          <p className="text-gray-500 leading-relaxed">
            All data is encrypted in transit using TLS 1.3 and at rest using AES-256 encryption. We do not store your original photos on our public servers longer than 24 hours.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <Eye className="w-6 h-6 text-[#00C853]" />
            <h3 className="text-xl font-bold text-gray-900">2. {t.imageProcessing}</h3>
          </div>
          <p className="text-gray-500 leading-relaxed">
             Uploaded images are processed by Google's Gemini Vision Pro and Veo models. By using our service, you grant us a temporary license to process these images solely for the purpose of generating the requested output. We do not use your private uploads to train our public models without explicit consent.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <FileCheck className="w-6 h-6 text-[#00C853]" />
            <h3 className="text-xl font-bold text-gray-900">3. {t.aiSafety}</h3>
          </div>
          <p className="text-gray-500 leading-relaxed mb-4">
            We are committed to responsible AI. Our "Legal Guard" system analyzes all generated output to ensure compliance with standard traffic regulations (e.g., headlight color, tint darkness).
          </p>
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
             <p className="text-yellow-800 text-sm">
               <strong>Note:</strong> While we strive for accuracy, DreamBuild AI generated concepts are for artistic and visualization purposes. Always consult local laws before modifying a real vehicle.
             </p>
          </div>
        </div>
      </div>
    </div>
  </PageLayout>
  );
};

export const PricingPage: React.FC<PageProps> = ({ onSwitch, lang }) => {
  const t = translations[lang].info;
  return (
  <PageLayout title={t.pricing} icon={<CreditCard className="w-6 h-6 text-[#00C853]" />} onSwitch={onSwitch}>
    {/* Partners Section */}
    <div className="mb-20">
      <div className="text-center mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{t.trusted}</h2>
        <p className="text-gray-500">Powering the visualization engines of top automotive brands.</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
         {/* Placeholder Logos */}
         {['AutoCorp', 'SpeedMasters', 'RimZone', 'EcoParts'].map((partner, i) => (
            <div key={i} className="h-16 border border-gray-200 rounded-xl flex items-center justify-center bg-white shadow-sm font-bold text-xl text-gray-400 select-none">
               <Building2 className="w-5 h-5 mr-2 opacity-50" /> {partner}
            </div>
         ))}
      </div>
    </div>

    {/* Pricing Section */}
    <div className="text-center mb-12">
       <h2 className="text-3xl font-extrabold text-gray-900 mb-4">{t.chooseEngine} <span className="text-[#00C853]">{t.engine}</span></h2>
       <p className="text-lg text-gray-500 max-w-2xl mx-auto">Whether you're a weekend wrencher or a multinational dealership, we have a plan for you.</p>
    </div>

    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
       {/* Free Tier */}
       <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm relative hover:-translate-y-1 transition-transform duration-300">
          <h3 className="text-lg font-bold text-gray-900">{t.garage}</h3>
          <div className="text-4xl font-extrabold text-gray-900 my-4">$0<span className="text-sm text-gray-500 font-medium">/mo</span></div>
          <p className="text-gray-500 text-sm mb-6">For hobbyists and dreamers.</p>
          <button onClick={() => onSwitch('app')} className="w-full py-3 border-2 border-gray-900 rounded-xl font-bold hover:bg-gray-50 transition-colors">{t.launchFree}</button>
          <ul className="mt-8 space-y-4 text-sm text-gray-600">
             <li className="flex gap-3"><Check className="w-5 h-5 text-[#00C853]" /> 3 Renders / Day</li>
             <li className="flex gap-3"><Check className="w-5 h-5 text-[#00C853]" /> Standard Resolution (1080p)</li>
             <li className="flex gap-3"><Check className="w-5 h-5 text-[#00C853]" /> Community Support</li>
          </ul>
       </div>

       {/* Pro Tier */}
       <div className="bg-[#0e0e0e] text-white p-8 rounded-3xl border border-[#00C853] shadow-[0_10px_40px_rgba(0,200,83,0.15)] relative transform md:-translate-y-4 hover:-translate-y-5 transition-transform duration-300">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#00C853] text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Most Popular</div>
          <h3 className="text-lg font-bold">{t.proTuner}</h3>
          <div className="text-4xl font-extrabold my-4 text-[#00FF41]">$29<span className="text-sm text-gray-400 font-medium">/mo</span></div>
          <p className="text-gray-400 text-sm mb-6">For serious builders and shops.</p>
          <button onClick={() => onSwitch('app')} className="w-full py-3 bg-[#00C853] text-black rounded-xl font-bold hover:bg-[#00E676] transition-colors shadow-lg shadow-green-900/20">{t.goPro}</button>
          <ul className="mt-8 space-y-4 text-sm text-gray-300">
             <li className="flex gap-3"><Check className="w-5 h-5 text-[#00FF41]" /> Unlimited Renders</li>
             <li className="flex gap-3"><Check className="w-5 h-5 text-[#00FF41]" /> 4K Ultra-HD Export</li>
             <li className="flex gap-3"><Check className="w-5 h-5 text-[#00FF41]" /> Veo Video Generation</li>
             <li className="flex gap-3"><Check className="w-5 h-5 text-[#00FF41]" /> Commercial License</li>
          </ul>
       </div>

       {/* Enterprise Tier */}
       <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm relative hover:-translate-y-1 transition-transform duration-300">
          <h3 className="text-lg font-bold text-gray-900">{t.dealer}</h3>
          <div className="text-4xl font-extrabold text-gray-900 my-4">$99<span className="text-sm text-gray-500 font-medium">/mo</span></div>
          <p className="text-gray-500 text-sm mb-6">For high-volume dealerships.</p>
          <button className="w-full py-3 border-2 border-gray-200 text-gray-600 rounded-xl font-bold hover:border-gray-900 hover:text-gray-900 transition-colors">{t.contactSales}</button>
          <ul className="mt-8 space-y-4 text-sm text-gray-600">
             <li className="flex gap-3"><Check className="w-5 h-5 text-[#00C853]" /> API Access</li>
             <li className="flex gap-3"><Check className="w-5 h-5 text-[#00C853]" /> Bulk Image Processing</li>
             <li className="flex gap-3"><Check className="w-5 h-5 text-[#00C853]" /> Dedicated Success Manager</li>
             <li className="flex gap-3"><Check className="w-5 h-5 text-[#00C853]" /> Custom Branding</li>
          </ul>
       </div>
    </div>
  </PageLayout>
  );
};
