import { useState } from 'react';
import type { SupportedLanguage } from './use-language-detection';

// Free LibreTranslate API endpoint
const TRANSLATE_API_URL = 'https://translate.argosopentech.com/translate';

// Map our language codes to LibreTranslate codes
const languageMap: Partial<Record<SupportedLanguage, string>> = {
  en: 'en',
  hi: 'hi',
  bn: 'bn',
  mr: 'mr',
  ta: 'ta',
  gu: 'gu',
  kn: 'kn',
  ml: 'ml',
  pa: 'pa',
  te: 'te',
  ur: 'ur',
  ne: 'ne',
  sa: 'sa'
  // Note: Some languages might not be supported by LibreTranslate
};

export function useTranslation() {
  const [isTranslating, setIsTranslating] = useState(false);
  
  const translateText = async (text: string, source: string, target: string): Promise<string> => {
    try {
      const response = await fetch(TRANSLATE_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          q: text,
          source: source,
          target: target,
        }),
      });
      
      if (!response.ok) {
        throw new Error('Translation failed');
      }
      
      const data = await response.json();
      return data.translatedText;
    } catch (error) {
      console.error('Translation error:', error);
      return text; // Return original text on error
    }
  };
  
  const translateToEnglish = async (text: string, sourceLanguage: SupportedLanguage): Promise<string> => {
    if (sourceLanguage === 'en') return text;
    
    setIsTranslating(true);
    try {
      // Get the corresponding LibreTranslate language code
      const sourceLang = languageMap[sourceLanguage] || 'en';
      
      // Attempt translation
      const translatedText = await translateText(text, sourceLang, 'en');
      return translatedText;
    } catch (error) {
      console.error('Translation error:', error);
      return text;
    } finally {
      setIsTranslating(false);
    }
  };
  
  const translateFromEnglish = async (text: string, targetLanguage: SupportedLanguage): Promise<string> => {
    if (targetLanguage === 'en') return text;
    
    setIsTranslating(true);
    try {
      // Get the corresponding LibreTranslate language code
      const targetLang = languageMap[targetLanguage] || 'en';
      
      // Attempt translation
      const translatedText = await translateText(text, 'en', targetLang);
      return translatedText;
    } catch (error) {
      console.error('Translation error:', error);
      return text;
    } finally {
      setIsTranslating(false);
    }
  };
  
  return {
    isTranslating,
    translateToEnglish,
    translateFromEnglish,
  };
}