import { useState, useEffect } from 'react';

// These are the ISO codes for the 22 scheduled languages of India
// plus 10 additional widely spoken Indian languages
export type SupportedLanguage = 
  | 'en' // English
  | 'hi' // Hindi
  | 'bn' // Bengali
  | 'te' // Telugu
  | 'mr' // Marathi
  | 'ta' // Tamil
  | 'ur' // Urdu
  | 'gu' // Gujarati
  | 'kn' // Kannada
  | 'ml' // Malayalam
  | 'pa' // Punjabi
  | 'or' // Odia
  | 'as' // Assamese
  | 'mai' // Maithili
  | 'sat' // Santali
  | 'ks' // Kashmiri
  | 'ne' // Nepali
  | 'sd' // Sindhi
  | 'doi' // Dogri
  | 'kok' // Konkani
  | 'mni' // Manipuri
  | 'sa' // Sanskrit
  | 'bo' // Tibetan
  | 'bho' // Bhojpuri
  | 'hne' // Chhattisgarhi
  | 'raj' // Rajasthani
  | 'gom' // Goan Konkani
  | 'kha' // Khasi
  | 'tcy' // Tulu
  | 'brx' // Bodo
  | 'mwr' // Marwari
  | 'lus'; // Mizo

// Language names in English for display purposes
export const languageNames: Record<SupportedLanguage, string> = {
  en: 'English',
  hi: 'हिन्दी (Hindi)',
  bn: 'বাংলা (Bengali)',
  te: 'తెలుగు (Telugu)',
  mr: 'मराठी (Marathi)',
  ta: 'தமிழ் (Tamil)',
  ur: 'اردو (Urdu)',
  gu: 'ગુજરાતી (Gujarati)',
  kn: 'ಕನ್ನಡ (Kannada)',
  ml: 'മലയാളം (Malayalam)',
  pa: 'ਪੰਜਾਬੀ (Punjabi)',
  or: 'ଓଡ଼ିଆ (Odia)',
  as: 'অসমীয়া (Assamese)',
  mai: 'मैथिली (Maithili)',
  sat: 'संताली (Santali)',
  ks: 'कॉशुर (Kashmiri)',
  ne: 'नेपाली (Nepali)',
  sd: 'سنڌي (Sindhi)',
  doi: 'डोगरी (Dogri)',
  kok: 'कोंकणी (Konkani)',
  mni: 'মৈতৈলোন্ (Manipuri)',
  sa: 'संस्कृतम् (Sanskrit)',
  bo: 'བོད་སྐད་ (Tibetan)',
  bho: 'भोजपुरी (Bhojpuri)',
  hne: 'छत्तीसगढ़ी (Chhattisgarhi)',
  raj: 'राजस्थानी (Rajasthani)',
  gom: 'गोंयची कोंकणी (Goan Konkani)',
  kha: 'খাসি (Khasi)',
  tcy: 'ತುಳು (Tulu)',
  brx: 'बड़ो (Bodo)',
  mwr: 'मारवाड़ी (Marwari)',
  lus: 'Mizo'
};

// Sample language detection - in a real app, you'd use a proper detection service
// like Google's Language Detection API or a similar service
const mockDetectLanguage = (text: string): Promise<SupportedLanguage> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // This is a simplified mock. In production, use a real language detection service
      const hindiPattern = /[ऀ-ॿ]/;
      const bengaliPattern = /[ঀ-৿]/;
      const teluguPattern = /[౦-౿]/;
      const tamilPattern = /[௦-௿]/;
      
      if (hindiPattern.test(text)) resolve('hi');
      else if (bengaliPattern.test(text)) resolve('bn');
      else if (teluguPattern.test(text)) resolve('te');
      else if (tamilPattern.test(text)) resolve('ta');
      else resolve('en'); // Default to English
    }, 200);
  });
};

export function useLanguageDetection() {
  const [detectedLanguage, setDetectedLanguage] = useState<SupportedLanguage>('en');
  const [isDetecting, setIsDetecting] = useState(false);
  
  const detectLanguage = async (text: string) => {
    if (!text.trim()) {
      setDetectedLanguage('en');
      return 'en';
    }
    
    setIsDetecting(true);
    try {
      const language = await mockDetectLanguage(text);
      setDetectedLanguage(language);
      setIsDetecting(false);
      return language;
    } catch (error) {
      console.error('Error detecting language:', error);
      setIsDetecting(false);
      return 'en'; // Fallback to English
    }
  };
  
  return {
    detectedLanguage,
    isDetecting,
    detectLanguage,
  };
}