import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { router } from 'expo-router';
import { StorageKeys } from '../utils/storage-keys';
import { routes } from '../utils/routes';

export type Language = 'en' | 'vi' | 'es' | 'fr' | 'de' | 'ja' | 'ko' | 'zh';

// Add translation progress type
export interface TranslationProgress {
  targetLanguage: Language;
  progress: number;
  step: string;
}

const baseTranslations = {
  en: {
    welcome: 'Welcome to the App!',
    currentStep: 'Current step',
    nextStep: 'Next Step',
    christmasTheme: '🎄 Christmas Theme',
    darkTheme: '🌙 Dark Theme',
    pinkyTheme: '💗 Pinky Theme',
    lightTheme: '☀️ Light Theme',
    halloweenTheme: '🎃 Halloween Theme',
    english: '🇺🇸 English',
    vietnamese: '🇻🇳 Vietnamese',
    spanish: '🇪🇸 Spanish',
    french: '🇫🇷 French',
    german: '🇩🇪 German',
    japanese: '🇯🇵 Japanese',
    korean: '🇰🇷 Korean',
    chinese: '🇨🇳 Chinese',
    language: 'Language',
    theme: 'Theme',
    settings: 'Settings',
    loading: 'Loading...',
    translating: 'Translating...',
    error: 'Translation failed',
    removeCache: 'Remove Cache',
    cacheRemoved: '✓ Cache Cleared!',
    removeCacheConfirm: 'This will clear all translation cache. Continue?',
    // pre translate
    connecting: 'Connecting...',
    sendingTranslationRequest: 'Sending translation request...',
    processingTranslation: 'Processing translation...',
    receivingTranslationData: 'Receiving translation data...',
    parsingTranslationResults: 'Parsing translation results...',
    noTranslationReceived: 'No translation received',
    invalidJSONResponse: 'Invalid JSON response',
    translationFailed: 'Translation failed',
    translatingTo: 'Translating to',
    translationComplete: '✓ Translation complete!',
    returningToHome: 'Returning to home...',
  },
  vi: {
    connecting: 'Kết nối...',
    sendingTranslationRequest: 'Gửi yêu cầu dịch...',
    processingTranslation: 'Xử lý dịch...',
    receivingTranslationData: 'Nhận dữ liệu dịch...',
    parsingTranslationResults: 'Phân tích kết quả dịch...',
    noTranslationReceived: 'Không nhận được kết quả dịch',
    invalidJSONResponse: 'Kết quả dịch không hợp lệ',
    translationFailed: 'Dịch thất bại',
    translatingTo: 'Dịch sang',
    translationComplete: '✓ Dịch xong!',
    returningToHome: 'Quay về trang chủ...',
  },
  es: {
    connecting: 'Conectando...',
    sendingTranslationRequest: 'Enviando solicitud de traducción...',
    processingTranslation: 'Procesando traducción...',
    receivingTranslationData: 'Recibiendo datos de traducción...',
    parsingTranslationResults: 'Analizando resultados de traducción...',
    noTranslationReceived: 'No se recibió traducción',
    invalidJSONResponse: 'Respuesta JSON inválida',
    translationFailed: 'Traducción fallida',
    translatingTo: 'Traduciendo a',
    translationComplete: '✓ Traducción completa!',
    returningToHome: 'Volviendo a la página principal...',
  },
  fr: {
    connecting: 'Connexion...',
    sendingTranslationRequest: 'Envoi de la demande de traduction...',
    processingTranslation: 'Traitement de la traduction...',
    receivingTranslationData: 'Réception des données de traduction...',
    parsingTranslationResults: 'Analyse des résultats de traduction...',
    noTranslationReceived: 'Aucune traduction reçue',
    invalidJSONResponse: 'Réponse JSON invalide',
    translationFailed: 'Traduction échouée',
    translatingTo: 'Traduisant vers',
    translationComplete: '✓ Traductions terminées!',
    returningToHome: 'Retour à la page d\'accueil...',
  },
  de: {
    connecting: 'Verbinden...',
    sendingTranslationRequest: 'Übersetzungsanfrage senden...',
    processingTranslation: 'Übersetzung verarbeiten...',
    receivingTranslationData: 'Übersetzungsdaten empfangen...',
    parsingTranslationResults: 'Übersetzungsergebnisse analysieren...',
    noTranslationReceived: 'Keine Übersetzung empfangen',
    invalidJSONResponse: 'Ungültige JSON-Antwort',
    translationFailed: 'Übersetzung fehlgeschlagen',
    translatingTo: 'Übersetzt in',
    translationComplete: '✓ Übersetzung abgeschlossen!',
    returningToHome: 'Zurück zur Startseite...',
  },
  ja: {
    connecting: '接続中...',
    sendingTranslationRequest: '翻訳リクエストを送信...',
    processingTranslation: '翻訳処理中...',
    receivingTranslationData: '翻訳データを受信...',
    parsingTranslationResults: '翻訳結果を解析...',
    noTranslationReceived: '翻訳結果が受信されませんでした',
    invalidJSONResponse: '無効なJSON応答',
    translationFailed: '翻訳に失敗しました',
    translatingTo: '翻訳先',
    translationComplete: '✓ 翻訳が完了しました!',
    returningToHome: 'ホームに戻ります...',
  },
  ko: {
    connecting: '연결 중...',
    sendingTranslationRequest: '번역 요청 전송...',
    processingTranslation: '번역 처리 중...',
    receivingTranslationData: '번역 데이터 수신...',
    parsingTranslationResults: '번역 결과 분석...',
    noTranslationReceived: '번역 결과가 수신되지 않았습니다',
    invalidJSONResponse: '유효하지 않은 JSON 응답',
    translationFailed: '번역 실패',
    translatingTo: '번역 대상',
    translationComplete: '✓ 번역이 완료되었습니다!',
    returningToHome: '홈으로 돌아갑니다...',
  },
  zh: {
    connecting: '连接中...',
    sendingTranslationRequest: '发送翻译请求...',
    processingTranslation: '处理翻译...',
    receivingTranslationData: '接收翻译数据...',
    parsingTranslationResults: '解析翻译结果...',
    noTranslationReceived: '未收到翻译结果',
    invalidJSONResponse: '无效的JSON响应',
    translationFailed: '翻译失败',
    translatingTo: '翻译成',
    translationComplete: '翻译完成!',
    returningToHome: '返回主页...',
  }
};

const GEMINI_API_KEY = 'AIzaSyDQtlgBfYnwvUhKrs9glNfQWxlPGVLbhdo';
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const languageNames: Record<Language, string> = {
  en: 'English',
  vi: 'Vietnamese',
  es: 'Spanish',
  fr: 'French',
  de: 'German',
  ja: 'Japanese',
  ko: 'Korean',
  zh: 'Chinese'
};

const languageNativeNames: Record<Language, string> = {
  en: 'English',
  vi: 'Tiếng Việt',
  es: 'Español',
  fr: 'Français',
  de: 'Deutsch',
  ja: '日本語',
  ko: '한국어',
  zh: '中文'
};

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  tr: (key: keyof typeof baseTranslations.en) => string;
  languages: Record<Language, string>;
  // Add translation progress state
  translationProgress: TranslationProgress | null;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

interface LanguageProviderProps {
  children: React.ReactNode;
  defaultLanguage?: Language;
}

export function LanguageProvider({ children, defaultLanguage = 'en' }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>(defaultLanguage);
  const [translations, setTranslations] = useState<Record<Language, Partial<typeof baseTranslations.en>>>({
    en: baseTranslations.en,
    vi: baseTranslations.vi,
    es: baseTranslations.es,
    fr: baseTranslations.fr,
    de: baseTranslations.de,
    ja: baseTranslations.ja,
    ko: baseTranslations.ko,
    zh: baseTranslations.zh,
  });
  
  // Add translation progress state
  const [translationProgress, setTranslationProgress] = useState<TranslationProgress | null>(null);

  useEffect(() => {
    loadLanguageAndCache();
  }, []);

  const loadLanguageAndCache = async () => {
    try {
      const storedLanguage = await AsyncStorage.getItem(StorageKeys.LANGUAGE_STORAGE_KEY);
      if (storedLanguage && Object.keys(languageNames).includes(storedLanguage)) {
        setLanguageState(storedLanguage as Language);
      }
      const cachedTranslations = await AsyncStorage.getItem(StorageKeys.TRANSLATIONS_CACHE_KEY);
      if (cachedTranslations) {
        const parsed = JSON.parse(cachedTranslations);
        setTranslations(prev => {
          const merged: typeof prev = { ...prev };
          Object.keys(parsed).forEach(lang => {
            const language = lang as Language;
            merged[language] = {
              ...parsed[language],
              ...prev[language]
            };
          });
          return merged;
        });
      }
    } catch (error) {
      console.error('Failed to load language/cache:', error);
    }
  };

  const translateTexts = async (targetLanguage: Language, missingKeys: string[]): Promise<typeof baseTranslations.en> => {
    const manualTranslations = translations[targetLanguage];
    const textsToTranslate: Partial<typeof baseTranslations.en> = {};
    missingKeys.forEach(key => {
      textsToTranslate[key as keyof typeof baseTranslations.en] = baseTranslations.en[key as keyof typeof baseTranslations.en];
    });

    const prompt = `Translate the following English texts to ${languageNames[targetLanguage]}. 
Return ONLY a JSON object with the same keys and translated values. 
Keep emojis and special characters exactly as they are.
Maintain the same structure and formatting.

English texts to translate:
${JSON.stringify(textsToTranslate, null, 2)}

Return format: {"key": "translated text", ...}`;

    // Replace global listener pattern with state setter
    const emitProgress = (progress: number, step: string) => {
      setTranslationProgress({
        targetLanguage,
        progress,
        step
      });
    };

    try {
      emitProgress(10, tr('connecting', targetLanguage));
      await new Promise(resolve => setTimeout(resolve, 300));

      emitProgress(25, tr('sendingTranslationRequest', targetLanguage));
      await new Promise(resolve => setTimeout(resolve, 200));

      const resultPromise = model.generateContent(prompt);

      let progress = 30;
      const progressInterval = setInterval(() => {
        if (progress < 80) {
          progress += 10;
          emitProgress(progress, tr('processingTranslation', targetLanguage));
        }
      }, 300);

      const result = await resultPromise;
      clearInterval(progressInterval);

      emitProgress(85, tr('receivingTranslationData', targetLanguage));
      await new Promise(resolve => setTimeout(resolve, 200));

      const response = result.response;
      const fullText = response.text();

      emitProgress(95, tr('parsingTranslationResults', targetLanguage));
      await new Promise(resolve => setTimeout(resolve, 300));

      if (!fullText) {
        throw new Error('No translation received from Gemini');
      }

      const jsonMatch = fullText.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('Invalid JSON response from Gemini');
      }

      const geminiTranslations = JSON.parse(jsonMatch[0]);

      const finalTranslations = {
        ...manualTranslations,
        ...geminiTranslations
      };

      emitProgress(100, tr('translationComplete', targetLanguage));

      return finalTranslations;
    } catch (error) {
      console.error('Gemini translation error:', error);
      emitProgress(0, tr('translationFailed', targetLanguage));
      throw error;
    }
  };

  const setLanguage = async (newLanguage: Language) => {
    try {
      const manualTranslations = translations[newLanguage];
      const allEnglishKeys = Object.keys(baseTranslations.en);
      const missingKeys = allEnglishKeys.filter(key => !manualTranslations.hasOwnProperty(key));

      setLanguageState(newLanguage);
      await AsyncStorage.setItem(StorageKeys.LANGUAGE_STORAGE_KEY, newLanguage);

      if (newLanguage !== 'en' && missingKeys.length > 0) {
        router.push({
          pathname: routes.translating,
          params: {
            targetLanguage: newLanguage,
            languageName: languageNativeNames[newLanguage]
          }
        });

        try {
          const translated = await translateTexts(newLanguage, missingKeys);
          const newTranslations = {
            ...translations,
            [newLanguage]: translated
          };
          setTranslations(newTranslations);

          const existingCache = await AsyncStorage.getItem(StorageKeys.TRANSLATIONS_CACHE_KEY);
          const parsedCache = existingCache ? JSON.parse(existingCache) : {};
          const updatedCache = {
            ...parsedCache,
            [newLanguage]: translated
          };
          await AsyncStorage.setItem(
            StorageKeys.TRANSLATIONS_CACHE_KEY,
            JSON.stringify(updatedCache)
          );
        } catch (translationError) {
          console.error('Failed to translate:', translationError);
          router.replace(routes.home);
        }
      }
    } catch (error) {
      console.error('Failed to save language:', error);
    }
  };

  const tr = (key: keyof typeof baseTranslations.en, targetLanguage: Language | null = null): string => {
    const languageTranslations = translations[targetLanguage || language];
    return languageTranslations?.[key] || baseTranslations.en[key] || key;
  };

  let languageContext: LanguageContextType = { 
    language, 
    setLanguage, 
    tr, 
    languages: languageNames,
    translationProgress 
  }

  return (
    <LanguageContext.Provider value={languageContext}>
      {children}
    </LanguageContext.Provider>
  );
}
