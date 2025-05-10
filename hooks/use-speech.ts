import { useState, useEffect, useRef } from 'react';
import type { SupportedLanguage } from './use-language-detection';

export function useSpeech() {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);
  const [audioFrequencyData, setAudioFrequencyData] = useState<number[]>([]);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  
  // Initialize audio context and analyser for real frequency data
  useEffect(() => {
    if (typeof window !== 'undefined') {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 256;
    }
    
    return () => {
      if (audioContextRef.current?.state !== 'closed') {
        audioContextRef.current?.close();
      }
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);
  
  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition;
      
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = true;
        recognitionRef.current.interimResults = true;
        
        recognitionRef.current.onresult = (event: any) => {
          let interimTranscript = '';
          let finalTranscript = '';
          
          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
              finalTranscript += transcript + ' ';
            } else {
              interimTranscript += transcript;
            }
          }
          
          setTranscript(finalTranscript || interimTranscript);
        };
        
        recognitionRef.current.onerror = (event: any) => {
          console.error('Speech recognition error', event.error);
          setError(`Speech recognition error: ${event.error}`);
          setIsListening(false);
        };
        
        recognitionRef.current.onend = () => {
          if (isListening) {
            recognitionRef.current.start();
          }
        };
      } else {
        setError('Speech recognition is not supported in your browser.');
      }
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.onend = null;
        recognitionRef.current.onresult = null;
        recognitionRef.current.onerror = null;
        
        if (isListening) {
          recognitionRef.current.stop();
        }
      }
    };
  }, [isListening]);
  
  // Update frequency data visualization
  useEffect(() => {
    let animationFrameId: number;
    
    const updateFrequencyData = () => {
      if (analyserRef.current && (isListening || isSpeaking)) {
        const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
        analyserRef.current.getByteFrequencyData(dataArray);
        setAudioFrequencyData(Array.from(dataArray));
        animationFrameId = requestAnimationFrame(updateFrequencyData);
      }
    };
    
    if (isListening || isSpeaking) {
      updateFrequencyData();
    }
    
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isListening, isSpeaking]);
  
  const startListening = async (language: SupportedLanguage = 'en') => {
    setTranscript('');
    setError(null);
    
    if (recognitionRef.current) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaStreamRef.current = stream;
        
        const source = audioContextRef.current!.createMediaStreamSource(stream);
        source.connect(analyserRef.current!);
        
        const languageMap: Record<SupportedLanguage, string> = {
          en: 'en-US',
          hi: 'hi-IN',
          bn: 'bn-IN',
          te: 'te-IN',
          mr: 'mr-IN',
          ta: 'ta-IN',
          ur: 'ur-IN',
          gu: 'gu-IN',
          kn: 'kn-IN',
          ml: 'ml-IN',
          pa: 'pa-IN',
          or: 'or-IN',
          as: 'as-IN',
          mai: 'hi-IN',
          sat: 'hi-IN',
          ks: 'ks-IN',
          ne: 'ne-NP',
          sd: 'sd-IN',
          doi: 'hi-IN',
          kok: 'kok-IN',
          mni: 'mni-IN',
          sa: 'sa-IN',
          bo: 'bo-CN',
          bho: 'hi-IN',
          hne: 'hi-IN',
          raj: 'hi-IN',
          gom: 'kok-IN',
          kha: 'en-IN',
          tcy: 'kn-IN',
          brx: 'hi-IN',
          mwr: 'hi-IN',
          lus: 'en-IN',
        };
        
        recognitionRef.current.lang = languageMap[language];
        recognitionRef.current.start();
        setIsListening(true);
      } catch (error) {
        console.error('Error starting speech recognition:', error);
        setError('Could not start speech recognition. Please check microphone permissions.');
      }
    } else {
      setError('Speech recognition is not supported in your browser.');
    }
  };
  
  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
      
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach(track => track.stop());
      }
    }
  };
  
  const speak = async (text: string, language: SupportedLanguage = 'en') => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      
      const languageMap: Record<SupportedLanguage, string> = {
        en: 'en-US',
        hi: 'hi-IN',
        bn: 'bn-IN',
        te: 'te-IN',
        mr: 'mr-IN',
        ta: 'ta-IN',
        ur: 'ur-IN',
        gu: 'gu-IN',
        kn: 'kn-IN',
        ml: 'ml-IN',
        pa: 'pa-IN',
        or: 'or-IN',
        as: 'as-IN',
        mai: 'hi-IN',
        sat: 'hi-IN',
        ks: 'ks-IN',
        ne: 'ne-NP',
        sd: 'sd-IN',
        doi: 'hi-IN',
        kok: 'kok-IN',
        mni: 'mni-IN',
        sa: 'sa-IN',
        bo: 'bo-CN',
        bho: 'hi-IN',
        hne: 'hi-IN',
        raj: 'hi-IN',
        gom: 'kok-IN',
        kha: 'en-IN',
        tcy: 'kn-IN',
        brx: 'hi-IN',
        mwr: 'hi-IN',
        lus: 'en-IN',
      };
      
      utterance.lang = languageMap[language];
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      
      // Get available voices and select the appropriate one
      const voices = window.speechSynthesis.getVoices();
      const voice = voices.find(v => v.lang.startsWith(languageMap[language]));
      if (voice) {
        utterance.voice = voice;
      }
      
      setIsSpeaking(true);
      
      utterance.onend = () => {
        setIsSpeaking(false);
        setAudioFrequencyData([]);
      };
      
      utterance.onerror = (event) => {
        console.error('Speech synthesis error:', event);
        setIsSpeaking(false);
        setAudioFrequencyData([]);
      };
      
      window.speechSynthesis.speak(utterance);
      
      // Create oscillator for visualization during speech
      const oscillator = audioContextRef.current!.createOscillator();
      oscillator.connect(analyserRef.current!);
      oscillator.start();
      utterance.onend = () => {
        oscillator.stop();
        setIsSpeaking(false);
        setAudioFrequencyData([]);
      };
    } else {
      setError('Speech synthesis is not supported in your browser.');
    }
  };
  
  return {
    isListening,
    isSpeaking,
    transcript,
    error,
    audioFrequencyData,
    startListening,
    stopListening,
    speak,
  };
}