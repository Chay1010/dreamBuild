import React, { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { Dashboard } from './components/Dashboard';
import { TeamPage, AboutPage, HowItWorksPage, PrivacyPage, PricingPage } from './components/InfoPages';
import { GalleryPage } from './components/GalleryPage';
import { ChatBot } from './components/ChatBot';
import { PageView, Language } from './types';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageView>('landing');
  const [lang, setLang] = useState<Language>('en');

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage onSwitch={setCurrentPage} lang={lang} setLang={setLang} />;
      case 'app':
        return <Dashboard onSwitch={setCurrentPage} lang={lang} setLang={setLang} />;
      case 'team':
        return <TeamPage onSwitch={setCurrentPage} lang={lang} setLang={setLang} />;
      case 'about':
        return <AboutPage onSwitch={setCurrentPage} lang={lang} setLang={setLang} />;
      case 'pricing':
        return <PricingPage onSwitch={setCurrentPage} lang={lang} setLang={setLang} />;
      case 'how-it-works':
        return <HowItWorksPage onSwitch={setCurrentPage} lang={lang} setLang={setLang} />;
      case 'privacy':
        return <PrivacyPage onSwitch={setCurrentPage} lang={lang} setLang={setLang} />;
      case 'gallery':
        return <GalleryPage onSwitch={setCurrentPage} lang={lang} setLang={setLang} />;
      default:
        return <LandingPage onSwitch={setCurrentPage} lang={lang} setLang={setLang} />;
    }
  };

  return (
    <div className="antialiased">
      {renderPage()}
      <ChatBot lang={lang} />
    </div>
  );
}