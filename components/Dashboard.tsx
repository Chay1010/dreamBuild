import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { PageProps } from '../types';
import { ChevronLeft, Box, PaintBucket, Car, Settings, Play, CheckCircle2, Sliders, Video, Loader2, Download, Upload, X, Zap, MonitorPlay, Globe, Terminal, Activity, Crosshair, Wrench, Sparkles } from 'lucide-react';
import { BeforeAfterSlider } from './BeforeAfterSlider';
import { translations } from '../translations';

declare global {
  interface Window {
    aistudio?: {
      hasSelectedApiKey: () => Promise<boolean>;
      openSelectKey: () => Promise<void>;
    };
  }
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        src?: string | null;
        'camera-controls'?: boolean;
        'auto-rotate'?: boolean;
        'shadow-intensity'?: string;
        style?: React.CSSProperties;
      };
    }
  }
}

// Convert File to Base64
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

export const Dashboard: React.FC<PageProps> = ({ onSwitch, lang, setLang }) => {
  const t = translations[lang].dashboard;
  const [activeTab, setActiveTab] = useState('paint');

  // Settings State
  const [neonColor, setNeonColor] = useState('#00FF41');
  const [material, setMaterial] = useState('Matte Vinyl Wrap');
  const [bodyKit, setBodyKit] = useState('Widebody (Riveted)');
  const [rimStyle, setRimStyle] = useState('TE37 Style');
  const [resolution, setResolution] = useState('2K (QHD)');

  const [creativity, setCreativity] = useState(50);
  const [customPrompt, setCustomPrompt] = useState('');

  // State for Demo/Simulation Mode
  const [isSimulationMode, setIsSimulationMode] = useState(false);

  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [isGeneratingVideo, setIsGeneratingVideo] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [generatedVideo, setGeneratedVideo] = useState<string | null>(null);
  const [inputImage, setInputImage] = useState<string | null>(null);
  const [inputModel3D, setInputModel3D] = useState<string | null>(null);

  const [playbackRate, setPlaybackRate] = useState(1);

  // Terminal Logs State
  const [logs, setLogs] = useState<string[]>([]);
  const logsEndRef = useRef<HTMLDivElement>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Initial System Logs
    setLogs([
      `[${new Date().toLocaleTimeString('en-US', { hour12: false })}] SYSTEM_BOOT_SEQUENCE_INIT`,
      `[${new Date().toLocaleTimeString('en-US', { hour12: false })}] GPU_CLUSTER_CONNECTED: OK`,
      `[${new Date().toLocaleTimeString('en-US', { hour12: false })}] WAITING_FOR_INPUT...`
    ]);
  }, []);

  useEffect(() => {
    // Auto-scroll logs
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setLogs(prev => [...prev, `[${timestamp}] ${message}`]);
  };

  // --- Interactive Handlers ---
  const handleTabChange = (id: string) => {
    setActiveTab(id);
    addLog(`MODULE SELECTED: ${id.toUpperCase()}`);
  };

  const handleColorChange = (color: string) => {
    setNeonColor(color);
    addLog(`ACCENT COLOR SET: ${color.toUpperCase()}`);
  };

  const handleMaterialChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMaterial(e.target.value);
    addLog(`MATERIAL UPDATED: ${e.target.value.toUpperCase()}`);
  };

  const handleBodyKitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setBodyKit(e.target.value);
    addLog(`AERO KIT INSTALLED: ${e.target.value.toUpperCase()}`);
  };

  const handleRimChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRimStyle(e.target.value);
    addLog(`RIMS MOUNTED: ${e.target.value.toUpperCase()}`);
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.name.endsWith('.glb') || file.name.endsWith('.gltf')) {
        const url = URL.createObjectURL(file);
        setInputModel3D(url);
        setInputImage(null);
        addLog(`LOADED 3D MODEL: ${file.name.toUpperCase()}`);
      } else {
        const base64 = await fileToBase64(file);
        setInputImage(base64);
        setInputModel3D(null);
        addLog(`LOADED IMAGE SOURCE: ${file.name.toUpperCase()}`);
        addLog(`RESOLUTION: ${Math.floor(file.size / 1024)} KB`);
      }
      setGeneratedImage(null);
      setGeneratedVideo(null);
    }
  };

  const simulateProcessingLogs = async () => {
    const sequence = [
      t.logs.init,
      t.logs.upload,
      t.logs.analyze,
      t.logs.legal,
      t.logs.render,
      t.logs.finalize
    ];

    for (const msg of sequence) {
      if (!isGeneratingImage && !isGeneratingVideo && !isSimulationMode) break;
      addLog(msg);
      await new Promise(r => setTimeout(r, 800 + Math.random() * 500));
    }
  };

  const handleGenerateImage = async () => {
    setIsGeneratingImage(true);
    setGeneratedVideo(null);
    // Do not clear logs completely, just add a separator
    addLog("--- STARTING GENERATION SEQUENCE ---");

    // Start visual log simulation in background
    const logPromise = simulateProcessingLogs();

    try {
      // --- SIMULATION MODE LOGIC ---
      if (isSimulationMode) {
        await new Promise(r => setTimeout(r, 4000)); // Fake processing time
        // Return a pre-defined high-quality image
        setGeneratedImage("https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1600&q=80");
        addLog(t.logs.complete);
        setIsGeneratingImage(false);
        return;
      }
      // -----------------------------

      if (typeof window !== 'undefined' && window.aistudio && !await window.aistudio.hasSelectedApiKey()) {
        addLog("AUTH_REQ: WAITING FOR API KEY...");
        await window.aistudio.openSelectKey();
      }

      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

      const systemPrompt = `You are an expert automotive designer. You will be provided with a text description and possibly an input image of a car. 
      Your goal is to generate a photorealistic, 8k, cinematic render of the car modified according to the user's specifications.
      
      Specs:
      - Category: ${activeTab} focused modification.
      - Accent Color: ${neonColor}.
      - Material: ${material}.
      - Body Kit: ${bodyKit}.
      - Wheels: ${rimStyle}.
      
      Details: ${customPrompt || "Modernize the design, aggressive stance, clean fitment"}.
      
      Style:
      - Unreal Engine 5 render, raytracing, volumetric fog, studio lighting.
      - If an input image is provided, respect the camera angle and car model but apply the mods.
      `;

      let contentsPayload: any = {
        parts: [{ text: systemPrompt }]
      };

      // If we have an input image, we use it for Img2Img (edit)
      if (inputImage) {
        const base64Data = inputImage.split(',')[1];
        contentsPayload.parts.unshift({
          inlineData: {
            mimeType: 'image/png', // Assuming PNG/JPEG, Gemini handles common types
            data: base64Data
          }
        });
      }

      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-image-preview',
        contents: contentsPayload,
        config: {
          imageConfig: {
            aspectRatio: "16:9",
            imageSize: "2K"
          }
        },
      });

      let imageFound = false;
      if (response.candidates?.[0]?.content?.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            const base64EncodeString: string = part.inlineData.data;
            const imageUrl = `data:image/png;base64,${base64EncodeString}`;
            setGeneratedImage(imageUrl);
            addLog(t.logs.complete);
            imageFound = true;
          }
        }
      }

      if (!imageFound) {
        addLog("ERR: NO IMAGE OUTPUT RECEIVED.");
      }

    } catch (error: any) {
      console.error(error);
      if ((error.message?.includes('Requested entity was not found') || error.status === 403) && typeof window !== 'undefined' && window.aistudio) {
        addLog("ERR_PERM: PAID KEY REQUIRED.");
        await window.aistudio.openSelectKey();
      } else {
        addLog(`ERR_SYS: ${error.message || 'UNKNOWN ERROR'}`);
      }
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const handleGenerateVideo = async () => {
    if (!generatedImage) return;

    setIsGeneratingVideo(true);
    addLog("INIT VIDEO SEQUENCE (VEO-3.1)...");

    try {
      if (isSimulationMode) {
        await new Promise(r => setTimeout(r, 4000));
        setGeneratedVideo("https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4");
        addLog("VIDEO RENDER COMPLETE.");
        setIsGeneratingVideo(false);
        return;
      }

      if (typeof window !== 'undefined' && window.aistudio && !await window.aistudio.hasSelectedApiKey()) {
        addLog("AUTH_REQ: API KEY...");
        await window.aistudio.openSelectKey();
      }

      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const base64Data = generatedImage.split(',')[1];

      let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: `Cinematic drone shot orbiting a futuristic car with ${neonColor} neon accents and ${material} finish, showroom lighting, highly detailed, photorealistic 4k, seamless loop`,
        image: {
          imageBytes: base64Data,
          mimeType: 'image/png',
        },
        config: {
          numberOfVideos: 1,
          resolution: '720p',
          aspectRatio: '16:9'
        }
      });

      addLog("JOB SUBMITTED. AWAITING FRAMES...");

      while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 5000));
        operation = await ai.operations.getVideosOperation({ operation: operation });
        addLog("PROCESSING CHUNK...");
      }

      const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
      if (downloadLink) {
        const videoRes = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
        const videoBlob = await videoRes.blob();
        const videoUrl = URL.createObjectURL(videoBlob);
        setGeneratedVideo(videoUrl);
        addLog("VIDEO STREAM READY.");
      } else {
        addLog("ERR: VIDEO GEN FAILED.");
      }

    } catch (error: any) {
      console.error(error);
      if (error.message?.includes('Requested entity was not found') || error.status === 403) {
        addLog("ERR_PERM: CHECK BILLING.");
        await window.aistudio.openSelectKey();
      } else {
        addLog("ERR_GEN: " + error.message);
      }
    } finally {
      setIsGeneratingVideo(false);
    }
  };

  const handleClearModel = () => {
    setInputModel3D(null);
    setInputImage(null);
    setGeneratedImage(null);
    setGeneratedVideo(null);
    addLog("WORKSPACE CLEARED.");
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const displayContent = () => {
    if (generatedVideo) {
      return (
        <div className="relative w-full h-full group/video">
          <video
            ref={videoRef}
            src={generatedVideo}
            controls
            autoPlay
            loop
            muted={isSimulationMode}
            className="w-full h-full object-contain z-10"
            onRateChange={(e) => setPlaybackRate(e.currentTarget.playbackRate)}
          />
          <div className="absolute top-4 right-4 z-20">
            <span className="bg-purple-600/80 backdrop-blur px-2 py-1 rounded text-[10px] font-bold text-white border border-purple-400">
              {isSimulationMode ? 'DEMO SIMULATION' : 'VEO 3.1 PREVIEW'}
            </span>
          </div>
        </div>
      );
    }

    if (generatedImage) {
      // If we have an input image too, show comparison slider
      if (inputImage && !isGeneratingImage) {
        return (
          <BeforeAfterSlider
            beforeImage={inputImage}
            afterImage={generatedImage}
            beforeLabel={translations[lang].hero.before}
            afterLabel={translations[lang].hero.after}
          />
        );
      }

      return (
        <img
          src={generatedImage}
          alt="Visualizer"
          className={`w-full h-full object-contain transition-opacity duration-500 ${isGeneratingImage ? 'opacity-50 blur-sm' : 'opacity-100'}`}
        />
      );
    }

    if (inputImage) {
      return (
        <div className="relative w-full h-full">
          <img
            src={inputImage}
            alt="Input Source"
            className="w-full h-full object-contain opacity-80"
          />
          <div className="absolute top-4 left-4 bg-black/60 px-2 py-1 rounded text-[10px] text-blue-400 border border-blue-500/30">
            SOURCE IMAGE LOCKED
          </div>
        </div>
      );
    }

    if (inputModel3D) {
      return (
        <div className="w-full h-full relative">
          <model-viewer
            src={inputModel3D}
            camera-controls
            auto-rotate
            shadow-intensity="1"
            style={{ width: '100%', height: '100%', backgroundColor: 'transparent' }}
          >
          </model-viewer>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/60 px-3 py-1 rounded-full text-[10px] text-[#00FF41] border border-[#00FF41]/30 pointer-events-none">
            INTERACTIVE 3D PREVIEW
          </div>
        </div>
      );
    }

    return (
      <div className="w-full h-full flex flex-col items-center justify-center text-gray-700">
        <Crosshair className="w-16 h-16 mb-4 opacity-20" />
        <p className="text-xs font-mono opacity-50">NO SIGNAL INPUT</p>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#0e0e0e] text-gray-200 font-sans overflow-hidden flex flex-col md:flex-row h-screen">
      {/* Sidebar */}
      <aside className="w-full md:w-20 lg:w-64 bg-[#111] border-r border-[#222] flex md:flex-col justify-between z-20 shrink-0 h-16 md:h-full">
        <div className="flex md:block w-full">
          <div className="h-16 md:h-20 flex items-center justify-center lg:justify-start lg:px-6 border-b border-[#222] shrink-0 w-16 md:w-full">
            <img src="/assets/logo-icon.png" alt="Logo" className="w-8 h-8 object-contain" />
            <span className="hidden lg:block ml-3 font-bold tracking-wider text-gray-100">{t.studio}</span>
          </div>

          <nav className="flex md:block p-0 md:p-4 space-x-2 md:space-x-0 md:space-y-2 overflow-x-auto md:overflow-visible items-center flex-1 no-scrollbar">
            {[
              { id: 'paint', icon: PaintBucket, label: t.paint },
              { id: 'parts', icon: Box, label: t.parts },
              { id: 'wheels', icon: Car, label: t.wheels },
              { id: 'settings', icon: Settings, label: t.settings },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => handleTabChange(item.id)}
                className={`flex-1 md:w-full flex items-center justify-center lg:justify-start p-3 rounded-lg transition-all duration-200 group whitespace-nowrap ${activeTab === item.id
                  ? 'bg-[#00FF41]/10 text-[#00FF41] border border-[#00FF41]/20'
                  : 'text-gray-500 hover:bg-[#222] hover:text-gray-300'
                  }`}
              >
                <item.icon className="w-5 h-5 shrink-0" />
                <span className="hidden lg:block ml-3 font-medium text-sm">{item.label}</span>
                {activeTab === item.id && (
                  <div className="hidden lg:block ml-auto w-1.5 h-1.5 rounded-full bg-[#00FF41] shadow-[0_0_8px_#00FF41]" />
                )}
              </button>
            ))}
          </nav>
        </div>

        <div className="hidden md:block p-4 border-t border-[#222] space-y-2">
          {/* Dashboard Language Switcher */}
          <button
            onClick={() => setLang(lang === 'en' ? 'fr' : 'en')}
            className="w-full flex items-center justify-center lg:justify-start p-3 text-gray-500 hover:text-white transition-colors gap-2"
          >
            <Globe className="w-4 h-4" />
            <span className="hidden lg:block ml-2 text-sm font-medium">{lang.toUpperCase()}</span>
          </button>

          <button
            onClick={() => onSwitch('landing')}
            className="w-full flex items-center justify-center lg:justify-start p-3 text-gray-500 hover:text-white transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="hidden lg:block ml-2 text-sm font-medium">{translations[lang].nav.backHome}</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative h-[calc(100vh-64px)] md:h-screen overflow-hidden">
        {/* Top Bar */}
        <header className="h-16 border-b border-[#222] bg-[#0e0e0e]/80 backdrop-blur-sm flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-bold text-white tracking-tight hidden sm:block">{t.project}: Cyber-Sedan X</h2>
            <h2 className="text-lg font-bold text-white tracking-tight sm:hidden">Studio</h2>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-yellow-500/10 text-yellow-500 border border-yellow-500/20">{t.draft}</span>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-xs font-mono text-gray-500">
              <Activity className={`w-3 h-3 ${isGeneratingImage || isGeneratingVideo ? 'text-[#00FF41] animate-pulse' : 'text-gray-600'}`} />
              {isGeneratingImage || isGeneratingVideo ? `${t.gpu} ${t.processing}` : `${t.gpu} ${t.connected}`}
            </div>
            <div className="w-8 h-8 rounded-full bg-[#222] border border-[#333]"></div>
          </div>
        </header>

        {/* Studio Workspace */}
        <div className="flex-1 p-4 lg:p-6 flex flex-col lg:flex-row gap-6 overflow-hidden">

          {/* Controls Panel - SCROLLABLE but pinned height using min-h-0 and flex-1 logic */}
          <div className="w-full lg:w-80 gap-4 flex-shrink-0 flex flex-col h-full overflow-hidden">

            {/* Scrollable Settings Area - min-h-0 is CRITICAL for flex child scrolling */}
            <div className="bg-[#111] border border-[#222] rounded-xl p-6 flex-1 overflow-y-auto custom-scrollbar min-h-0">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <Sliders className="w-4 h-4" /> {t.controls}
                </h3>

                {/* Simulation Mode Toggle */}
                <button
                  onClick={() => {
                    setIsSimulationMode(!isSimulationMode);
                    addLog(isSimulationMode ? "DEMO MODE: DISABLED" : "DEMO MODE: ENABLED");
                  }}
                  className={`flex items-center gap-2 px-2 py-1 rounded text-[10px] font-bold border transition-colors ${isSimulationMode
                    ? 'bg-blue-900/30 text-blue-400 border-blue-500/50'
                    : 'bg-transparent text-gray-600 border-gray-700 hover:border-gray-500'
                    }`}
                  title="Enable for Presentation/Demo (No API usage)"
                >
                  <MonitorPlay className="w-3 h-3" />
                  {isSimulationMode ? t.demoModeOn : t.demoMode}
                </button>
              </div>

              <div className="space-y-6">

                {/* File Upload Section - Global */}
                <div className="pb-4 border-b border-[#222]">
                  <label className="block text-xs font-mono text-gray-500 mb-2">{t.inputSource}</label>
                  <input
                    type="file"
                    accept="image/*,.glb,.gltf"
                    onChange={handleFileUpload}
                    ref={fileInputRef}
                    className="hidden"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="flex-1 flex items-center justify-center gap-2 bg-[#222] hover:bg-[#333] border border-[#333] hover:border-gray-500 text-gray-300 py-3 rounded-lg transition-all text-xs font-bold"
                    >
                      <Upload className="w-4 h-4" />
                      {t.uploadModel}
                    </button>
                    {(inputImage || inputModel3D || generatedImage) && (
                      <button
                        onClick={handleClearModel}
                        className="px-3 bg-red-900/20 text-red-500 border border-red-900/50 rounded-lg hover:bg-red-900/40"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                {/* --- Tab Specific Controls --- */}

                {/* PAINT TAB */}
                {activeTab === 'paint' && (
                  <div className="space-y-6 animate-fade-in">
                    <div>
                      <label className="block text-xs font-mono text-gray-500 mb-2">{t.neonColor}</label>
                      <div className="flex gap-2 flex-wrap">
                        {['#00FF41', '#A855F7', '#06B6D4', '#F43F5E', '#FFFFFF'].map((color) => (
                          <button
                            key={color}
                            onClick={() => handleColorChange(color)}
                            className={`w-8 h-8 rounded opacity-80 hover:opacity-100 transition-all ${neonColor === color ? 'ring-2 ring-white/20 ring-offset-2 ring-offset-[#111] scale-110' : ''}`}
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-gray-500 mb-2">{t.material}</label>
                      <select
                        value={material}
                        onChange={handleMaterialChange}
                        className="w-full bg-[#0e0e0e] border border-[#333] rounded-md px-3 py-2 text-sm text-gray-300 focus:outline-none focus:border-[#00FF41]"
                      >
                        <option>Matte Vinyl Wrap</option>
                        <option>High Gloss Paint</option>
                        <option>Forged Carbon Fiber</option>
                        <option>Brushed Aluminum</option>
                        <option>Rusted Patina</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* PARTS TAB */}
                {activeTab === 'parts' && (
                  <div className="space-y-6 animate-fade-in">
                    <div>
                      <label className="block text-xs font-mono text-gray-500 mb-2">{t.tools.bodyStyle}</label>
                      <select
                        value={bodyKit}
                        onChange={handleBodyKitChange}
                        className="w-full bg-[#0e0e0e] border border-[#333] rounded-md px-3 py-2 text-sm text-gray-300 focus:outline-none focus:border-[#00FF41]"
                      >
                        <option>Widebody (Riveted)</option>
                        <option>Clean Widebody</option>
                        <option>OEM +</option>
                        <option>Time Attack Aero</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-gray-500 mb-2">{t.tools.spoiler}</label>
                      <select className="w-full bg-[#0e0e0e] border border-[#333] rounded-md px-3 py-2 text-sm text-gray-300 focus:outline-none focus:border-[#00FF41]">
                        <option>GT Wing (High)</option>
                        <option>Ducktail</option>
                        <option>Chassis Mount</option>
                        <option>None</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* WHEELS TAB */}
                {activeTab === 'wheels' && (
                  <div className="space-y-6 animate-fade-in">
                    <div>
                      <label className="block text-xs font-mono text-gray-500 mb-2">{t.tools.rimStyle}</label>
                      <select
                        value={rimStyle}
                        onChange={handleRimChange}
                        className="w-full bg-[#0e0e0e] border border-[#333] rounded-md px-3 py-2 text-sm text-gray-300 focus:outline-none focus:border-[#00FF41]"
                      >
                        <option>TE37 Style</option>
                        <option>Mesh (BBS)</option>
                        <option>5-Spoke Deep Dish</option>
                        <option>Turbofan</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-gray-500 mb-2">{t.tools.fitment}</label>
                      <div className="space-y-3">
                        <div className="flex justify-between text-xs text-gray-500"><span>Ride Height</span><span>Low</span></div>
                        <input type="range" className="w-full h-1 bg-[#333] rounded-lg appearance-none cursor-pointer accent-[#00FF41]" />
                        <div className="flex justify-between text-xs text-gray-500"><span>Camber</span><span>-5°</span></div>
                        <input type="range" className="w-full h-1 bg-[#333] rounded-lg appearance-none cursor-pointer accent-[#00FF41]" />
                      </div>
                    </div>
                  </div>
                )}

                {/* SETTINGS TAB */}
                {activeTab === 'settings' && (
                  <div className="space-y-6 animate-fade-in">
                    <div>
                      <label className="block text-xs font-mono text-gray-500 mb-2">{t.tools.resolution}</label>
                      <select
                        value={resolution}
                        onChange={(e) => setResolution(e.target.value)}
                        className="w-full bg-[#0e0e0e] border border-[#333] rounded-md px-3 py-2 text-sm text-gray-300 focus:outline-none focus:border-[#00FF41]"
                      >
                        <option>1080p (FHD)</option>
                        <option>2K (QHD)</option>
                        <option>4K (UHD)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-gray-500 mb-2">{t.tools.aspectRatio}</label>
                      <div className="flex gap-2">
                        <button className="flex-1 py-2 bg-[#222] text-xs font-bold rounded hover:bg-[#333] text-[#00FF41] border border-[#00FF41]/30">16:9</button>
                        <button className="flex-1 py-2 bg-[#111] text-xs font-bold rounded hover:bg-[#222] text-gray-500 border border-[#333]">9:16</button>
                        <button className="flex-1 py-2 bg-[#111] text-xs font-bold rounded hover:bg-[#222] text-gray-500 border border-[#333]">1:1</button>
                      </div>
                    </div>
                  </div>
                )}

                {/* --- Global Controls --- */}

                <div>
                  <label className="block text-xs font-mono text-gray-500 mb-2">{t.customDetails}</label>
                  <textarea
                    value={customPrompt}
                    onChange={(e) => setCustomPrompt(e.target.value)}
                    placeholder={t.customPlaceholder}
                    className="w-full bg-[#0e0e0e] border border-[#333] rounded-md px-3 py-2 text-sm text-gray-300 focus:outline-none focus:border-[#00FF41] min-h-[80px]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-gray-500 mb-2">{t.creativity}</label>
                  <input
                    type="range"
                    value={creativity}
                    onChange={(e) => setCreativity(Number(e.target.value))}
                    className="w-full h-1 bg-[#333] rounded-lg appearance-none cursor-pointer accent-[#00FF41]"
                  />
                  <div className="flex justify-between text-[10px] text-gray-600 font-mono mt-1">
                    <span>{t.conservative}</span>
                    <span>{t.wild}</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-[#222] space-y-3">
                <button
                  onClick={handleGenerateImage}
                  disabled={isGeneratingImage || isGeneratingVideo}
                  className={`w-full group relative overflow-hidden rounded-md bg-transparent border border-[#00FF41] px-4 py-3 text-sm font-bold text-[#00FF41] hover:text-black transition-colors ${isGeneratingImage ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <div className="absolute inset-0 bg-[#00FF41] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
                  <span className="relative flex items-center justify-center gap-2">
                    {isGeneratingImage ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4 fill-current" />}
                    {isGeneratingImage ? t.generating : isSimulationMode ? t.simulate : t.generate}
                  </span>
                </button>

                <button
                  onClick={handleGenerateVideo}
                  disabled={!generatedImage || isGeneratingVideo}
                  className={`w-full group relative overflow-hidden rounded-md bg-transparent border border-purple-500 px-4 py-3 text-sm font-bold text-purple-500 transition-colors ${!generatedImage || isGeneratingVideo ? 'opacity-50 cursor-not-allowed' : 'hover:text-white'
                    }`}
                >
                  <div className={`absolute inset-0 bg-purple-500 transition-transform duration-300 ease-out ${!generatedImage || isGeneratingVideo ? 'translate-y-full' : 'translate-y-full group-hover:translate-y-0'
                    }`}></div>
                  <span className="relative flex items-center justify-center gap-2">
                    {isGeneratingVideo ? <Loader2 className="w-4 h-4 animate-spin" /> : <Video className="w-4 h-4 fill-current" />}
                    {isGeneratingVideo ? t.rendering : isSimulationMode ? t.simulateVideo : t.generateVideo}
                  </span>
                </button>
              </div>
            </div>

            {/* Terminal Panel - FIXED AT BOTTOM */}
            <div className="bg-[#050505] border border-[#222] rounded-xl p-4 h-48 flex-shrink-0 flex flex-col overflow-hidden shadow-inner relative z-10">
              <div className="flex justify-between items-center mb-2 border-b border-[#333] pb-2">
                <div className="text-[10px] text-gray-500 font-mono flex items-center gap-2">
                  <Terminal className="w-3 h-3" /> {t.status}
                </div>
                <div className="w-2 h-2 rounded-full bg-[#00FF41] animate-pulse"></div>
              </div>
              <div className="flex-1 overflow-y-auto font-mono text-[10px] space-y-1 text-[#00FF41]/80 scrollbar-thin scrollbar-thumb-gray-800">
                {logs.length === 0 && <span className="opacity-50 text-gray-500">_SYSTEM READY...</span>}
                {logs.map((log, i) => (
                  <div key={i}>{log}</div>
                ))}
                <div ref={logsEndRef} />
              </div>
            </div>
          </div>

          {/* Visualization Area */}
          <div className="flex-1 flex flex-col h-full min-h-[400px]">
            <div className="flex-1 bg-[#080808] rounded-2xl border border-[#222] relative overflow-hidden group flex items-center justify-center shadow-2xl">

              {/* Professional Grid Overlay */}
              <div
                className="absolute inset-0 opacity-[0.05] pointer-events-none"
                style={{
                  backgroundImage: `linear-gradient(#444 1px, transparent 1px), linear-gradient(90deg, #444 1px, transparent 1px)`,
                  backgroundSize: '40px 40px'
                }}
              ></div>
              <div className="absolute top-0 left-0 w-full h-full border-2 border-[#111] pointer-events-none z-20"></div>

              {/* Corner Brackets */}
              <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-gray-600 z-20"></div>
              <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-gray-600 z-20"></div>
              <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-gray-600 z-20"></div>
              <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-gray-600 z-20"></div>

              {/* Main Content (3D Model, Video, or Image) */}
              <div className="relative z-10 w-full h-full p-8 flex items-center justify-center">
                {displayContent()}
              </div>

              {!generatedVideo && !inputModel3D && generatedImage && (
                <>
                  <div className="absolute top-6 left-6 z-30">
                    <div className="bg-black/60 backdrop-blur-md border border-[#333] p-4 rounded-lg shadow-xl">
                      <h4 className="text-[#00FF41] text-xs font-bold font-mono mb-2">{t.analysis}</h4>
                      <ul className="space-y-1 text-[10px] font-mono text-gray-400">
                        <li className="flex justify-between w-48"><span>MATERIAL:</span> <span className="text-white">{material}</span></li>
                        <li className="flex justify-between w-48"><span>ACCENT:</span> <span className="text-white" style={{ color: neonColor }}>{neonColor}</span></li>
                        <li className="flex justify-between w-48"><span>RENDER:</span> <span className="text-white">8K_RAYTRACE</span></li>
                      </ul>
                    </div>
                  </div>

                  {/* Legal Status Overlay */}
                  <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between pointer-events-none z-30">
                    <div className="flex items-center gap-3 bg-black/80 backdrop-blur border-l-4 border-[#00FF41] px-4 py-3 rounded-r-lg shadow-[0_0_20px_rgba(0,255,65,0.1)] animate-in fade-in slide-in-from-bottom-4 duration-700">
                      <CheckCircle2 className="w-5 h-5 text-[#00FF41]" />
                      <div>
                        <div className="text-[10px] text-gray-400 font-bold tracking-wider">{t.legalGuard}</div>
                        <div className="text-sm font-mono text-white">{t.compliant}</div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Scanning Effect Line (Active during generation) */}
              {(isGeneratingImage || isGeneratingVideo) && (
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00FF41] to-transparent opacity-80 animate-[scan_2s_ease-in-out_infinite] pointer-events-none z-30 box-shadow-[0_0_15px_#00FF41]"></div>
              )}
            </div>
          </div>
        </div>
      </main>

      <style>{`
        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
        /* Custom Scrollbar for Controls */
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #0e0e0e; 
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #333; 
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #555; 
        }
      `}</style>
    </div>
  );
};