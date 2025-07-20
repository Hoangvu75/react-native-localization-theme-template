import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { StorageKeys } from '../../utils/storage-keys';
import { routes } from '../../utils/routes';
import { geminiModel } from 'utils/gemini-model';
import { Language, LanguageCode } from './language';
import { Translation, translationMap } from './translation';

export interface TranslationProgress {
  targetLanguage: Language;
  progress: number;
  step: string;
}

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  tr: (key: keyof Translation) => string;
  languages: Language[];
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

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(Language.getLanguageByCode(LanguageCode.EN));
  const [translations, setTranslations] = useState<Record<LanguageCode, Partial<Translation>>>(translationMap);
  const [translationProgress, setTranslationProgress] = useState<TranslationProgress | null>(null);

  useEffect(() => {
    loadLanguageAndCache();
  }, []);

  const loadLanguageAndCache = async () => {
    try {
      const storedLanguageCode = await AsyncStorage.getItem(StorageKeys.LANGUAGE_STORAGE_KEY);
      if (storedLanguageCode && Object.values(LanguageCode).includes(storedLanguageCode as LanguageCode)) {
        const foundLanguage = Language.getLanguageByCode(storedLanguageCode as LanguageCode);
        if (foundLanguage) {
          setLanguageState(foundLanguage);
        }
      }
      const cachedTranslations = await AsyncStorage.getItem(StorageKeys.TRANSLATIONS_CACHE_KEY);
      if (cachedTranslations) {
        const parsed = JSON.parse(cachedTranslations);
        setTranslations(prev => {
          const merged: typeof prev = { ...prev };
          Object.keys(parsed).forEach(langCode => {
            const languageCode = langCode as LanguageCode;
            merged[languageCode] = {
              ...prev[languageCode],
              ...parsed[languageCode]
            };
          });
          return merged;
        });
      }
    } catch (error) {
      console.error('Failed to load language/cache:', error);
    }
  };

  const translateTexts = async (targetLanguage: Language, missingKeys: string[]): Promise<Translation> => {
    const manualTranslations = translations[targetLanguage.code];
    const textsToTranslate: Partial<Translation> = {};
    missingKeys.forEach(key => {
      textsToTranslate[key as keyof Translation] = translationMap[LanguageCode.EN][key as keyof Translation];
    });

    const prompt = `Translate the following English texts to ${targetLanguage.name}. 
Return ONLY a JSON object with the same keys and translated values. 
Keep emojis and special characters exactly as they are.
Maintain the same structure and formatting.

English texts to translate:
${JSON.stringify(textsToTranslate, null, 2)}

Return format: {"key": "translated text", ...}`;

    const emitProgress = (progress: number, step: string) => {
      setTranslationProgress({
        targetLanguage,
        progress,
        step
      });
    };

    try {
      emitProgress(10, tr('connecting', targetLanguage.code));
      await new Promise(resolve => setTimeout(resolve, 300));

      emitProgress(25, tr('sendingTranslationRequest', targetLanguage.code));
      await new Promise(resolve => setTimeout(resolve, 200));

      const resultPromise = geminiModel.generateContent(prompt);

      let progress = 30;
      const progressInterval = setInterval(() => {
        if (progress < 80) {
          progress += 10;
          emitProgress(progress, tr('processingTranslation', targetLanguage.code));
        }
      }, 300);

      const result = await resultPromise;
      clearInterval(progressInterval);

      emitProgress(85, tr('receivingTranslationData', targetLanguage.code));
      await new Promise(resolve => setTimeout(resolve, 200));

      const response = result.response;
      const fullText = response.text();

      emitProgress(95, tr('parsingTranslationResults', targetLanguage.code));
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

      emitProgress(100, tr('translationComplete', targetLanguage.code));

      return finalTranslations;
    } catch (error) {
      console.error('Gemini translation error:', error);
      emitProgress(0, tr('translationFailed', targetLanguage.code));
      throw error;
    }
  };

  const setLanguage = async (newLanguage: Language) => {
    const updateStateAndCache = async () => {
      setLanguageState(newLanguage);
      await AsyncStorage.setItem(StorageKeys.LANGUAGE_STORAGE_KEY, newLanguage.code);
    }

    try {
      const manualTranslations = translations[newLanguage.code];
      const allEnglishKeys = Object.keys(translationMap[LanguageCode.EN]);
      const missingKeys = allEnglishKeys.filter(key => !manualTranslations.hasOwnProperty(key));
      updateStateAndCache();
      if (newLanguage.code !== LanguageCode.EN && missingKeys.length > 0) {
        router.push({
          pathname: routes.translating,
          params: {
            languageCode: newLanguage.code
          }
        });
        try {
          const translated = await translateTexts(newLanguage, missingKeys);
          const newTranslations = {
            ...translations,
            [newLanguage.code]: translated
          };
          setTranslations(newTranslations);

          const existingCache = await AsyncStorage.getItem(StorageKeys.TRANSLATIONS_CACHE_KEY);
          const parsedCache = existingCache ? JSON.parse(existingCache) : {};
          const updatedCache = {
            ...parsedCache,
            [newLanguage.code]: translated
          };
          await AsyncStorage.setItem(StorageKeys.TRANSLATIONS_CACHE_KEY, JSON.stringify(updatedCache));
        } catch (translationError) {
          console.error('Failed to translate:', translationError);
          router.replace(routes.home);
        }
      }
    } catch (error) {
      console.error('Failed to save language:', error);
    }
  };

  const tr = (key: keyof Translation, targetLanguageCode: LanguageCode | null = null): string => {
    const languageCode = targetLanguageCode || language.code;
    const languageTranslations = translations[languageCode];
    return languageTranslations?.[key] || translationMap[LanguageCode.EN][key] || key;
  };

  const languageContext: LanguageContextType = { 
    language, 
    setLanguage, 
    tr, 
    languages: Language.allLanguages,
    translationProgress 
  };

  return (
    <LanguageContext.Provider value={languageContext}>
      {children}
    </LanguageContext.Provider>
  );
}
