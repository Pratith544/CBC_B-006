"use client";

import {
  useEffect,
  useRef,
  useState,
  useCallback,
  MutableRefObject,
} from "react";
import { Mic, MicOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Role = "user" | "assistant";
interface ChatMessage {
  id: string;
  role: Role;
  content: string;
}

const languages = [
  { code: "en-IN", name: "English (India)" },
  { code: "hi-IN", name: "Hindi" },
  { code: "bn-IN", name: "Bengali" },
  { code: "ta-IN", name: "Tamil" },
  { code: "te-IN", name: "Telugu" },
  { code: "mr-IN", name: "Marathi" },
  { code: "gu-IN", name: "Gujarati" },
  { code: "kn-IN", name: "Kannada" },
  { code: "ml-IN", name: "Malayalam" },
] as const;

// Helper to speak any text in the chosen language
function speak(text: string, lang: string) {
  if (!("speechSynthesis" in window)) return;
  const u = new SpeechSynthesisUtterance(text);
  u.lang = lang;
  speechSynthesis.speak(u);
}

export default function VoiceChat() {
  const [selectedLang, setSelectedLang] =
    useState<(typeof languages)[number]["code"]>("en-IN");
  const [listening, setListening] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const recognizerRef = useRef() as MutableRefObject<SpeechRecognition | null>;

  /* ------------------------------------------------------------------
     Initialise / re-initialise SpeechRecognition whenever language
     changes (Chrome’s webkitSpeechRecognition variant is the de-facto).
     ------------------------------------------------------------------ */
  useEffect(() => {
    if (!("webkitSpeechRecognition" in window)) return;

    const Rec = (window as any).webkitSpeechRecognition as {
      new (): SpeechRecognition;
    };
    const rec = new Rec();
    rec.continuous = true; // keep microphone open
    rec.interimResults = false; // only final results
    rec.lang = selectedLang;

    /* On every final transcript:
       - append to chat,
       - fetch assistant reply from backend,
       - speak it out loud.
    */
    rec.onresult = (e: any) => {
      const transcript = e.results[e.results.length - 1][0].transcript.trim();
      if (!transcript) return;

      addMessage("user", transcript);
      askAssistant(transcript);
    };

    rec.onerror = () => {
      // Mic permission revoked or other error – stop listening gracefully
      setListening(false);
      rec.stop();
    };

    recognizerRef.current = rec;
    // Restart in new language if already listening
    if (listening) {
      rec.start();
    }
    // Clean-up
    return () => rec.stop();
  }, [selectedLang]); // eslint-disable-line react-hooks/exhaustive-deps

  /** Append a message to chat list */
  const addMessage = useCallback((role: Role, content: string) => {
    setMessages((prev) => [
      ...prev,
      { id: `${Date.now()}-${Math.random()}`, role, content },
    ]);
  }, []);

  /** Call backend route that wraps *Gemini 2.0 Flash Lite* */
  const askAssistant = async (userText: string) => {
    try {
      const res = await fetch("/api/gemini-chat", {
        method: "POST",
        body: JSON.stringify({
          messages: [...messages, { role: "user", content: userText }],
          language: selectedLang,
        }),
      });
      const data = (await res.json()) as { assistant: string };
      addMessage("assistant", data.assistant);
      // Speak the assistant reply
      speak(data.assistant, selectedLang);
    } catch (err) {
      addMessage(
        "assistant",
        "⚠️ Sorry, I ran into a problem processing that."
      );
    }
  };

  /** Start or stop microphone */
  const toggleListening = () => {
    const rec = recognizerRef.current;
    if (!rec) return;

    if (listening) {
      rec.stop();
      setListening(false);
    } else {
      rec.start();
      setListening(true);
    }
  };

  /* Speak the very first assistant greeting once at mount */
  useEffect(() => {
    if (messages.length === 0) {
      const hello =
        selectedLang === "hi-IN"
          ? "नमस्ते! मैं आपकी सहायता के लिये तैयार हूँ।"
          : "Hello! How can I help you today?";
      addMessage("assistant", hello);
      speak(hello, selectedLang);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="flex flex-col gap-4 max-w-xl w-full">
      {/* Language picker + mic control */}
      <div className="flex items-center gap-4">
        <Select
          value={selectedLang}
          onValueChange={(v) => setSelectedLang(v as any)}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Language" />
          </SelectTrigger>
          <SelectContent>
            {languages.map((l) => (
              <SelectItem key={l.code} value={l.code}>
                {l.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          onClick={toggleListening}
          variant={listening ? "destructive" : "default"}
          size="icon"
          title={listening ? "Stop listening" : "Start listening"}
        >
          {listening ? (
            <MicOff className="w-5 h-5" />
          ) : (
            <Mic className="w-5 h-5" />
          )}
        </Button>
      </div>

      {/* Conversation thread */}
      <div className="h-[360px] overflow-y-auto rounded-lg border p-4 space-y-3 bg-muted">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`px-3 py-2 rounded-md whitespace-pre-line ${
              m.role === "user"
                ? "bg-primary text-primary-foreground ml-auto"
                : "bg-white dark:bg-zinc-800"
            } max-w-[80%]`}
          >
            {m.content}
          </div>
        ))}
        {listening && (
          <p className="text-xs text-muted-foreground text-center">
            🎤 Listening…
          </p>
        )}
      </div>
    </div>
  );
}
