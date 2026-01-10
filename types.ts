
export type PageView = 'landing' | 'app' | 'team' | 'about' | 'how-it-works' | 'privacy' | 'pricing' | 'gallery';
export type Language = 'en' | 'fr';

export interface PageProps {
  onSwitch: (page: PageView) => void;
  lang: Language;
  setLang: (lang: Language) => void;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        src?: string;
        poster?: string;
        alt?: string;
        'camera-controls'?: boolean;
        'auto-rotate'?: boolean;
        ar?: boolean;
        [key: string]: any;
      };
    }
  }
}