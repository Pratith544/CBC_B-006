export interface WeatherData {
  location: string;
  current: {
    temp_c: number;
    temp_f: number;
    condition: {
      text: string;
      icon: string;
    };
    wind_kph: number;
    wind_degree: number;
    wind_dir: string;
    pressure_mb: number;
    precip_mm: number;
    humidity: number;
    cloud: number;
    feelslike_c: number;
    uv: number;
  };
  forecast: {
    forecastday: ForecastDay[];
  };
}

export interface ForecastDay {
  date: string;
  day: {
    maxtemp_c: number;
    mintemp_c: number;
    avgtemp_c: number;
    maxwind_kph: number;
    totalprecip_mm: number;
    avghumidity: number;
    daily_chance_of_rain: number;
    condition: {
      text: string;
      icon: string;
    };
    uv: number;
  };
  hour: HourForecast[];
}

export interface HourForecast {
  time: string;
  temp_c: number;
  condition: {
    text: string;
    icon: string;
  };
  wind_kph: number;
  wind_dir: string;
  precip_mm: number;
  humidity: number;
  cloud: number;
  feelslike_c: number;
  chance_of_rain: number;
}

export interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export type ViewType = "weather" | "chatbot";

// Types for the application

export interface Question {
  id: string;
  text: string;
  type: "text" | "select" | "multiselect" | "radio" | "checkbox";
  options?: string[];
  category: "personal" | "agriculture" | "financial" | "technical";
  required: boolean;
}

export interface QuestionnaireResponse {
  [key: string]: string | string[];
}

export interface LearningModule {
  id: string;
  title: string;
  description: string;
  tags: string[];
  difficulty: "beginner" | "intermediate" | "advanced";
  estimatedTime: string;
  imageUrl?: string;
}

export interface ModuleContent {
  title: string;
  introduction: string;
  sections: ModuleSection[];
  conclusion: string;
  resources: Resource[];
}

export interface ModuleSection {
  title: string;
  content: string;
  imageUrl?: string;
  videoUrl?: string;
  quiz?: Quiz;
}

export interface Quiz {
  questions: QuizQuestion[];
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Resource {
  title: string;
  url: string;
  type: "article" | "video" | "pdf" | "website";
}

export interface UserProgress {
  userId: string;
  completedModules: string[];
  currentModule?: string;
  moduleProgress: {
    [moduleId: string]: number; // Percentage completed
  };
}
