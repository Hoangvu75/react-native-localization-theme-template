import { Language, useLanguage } from "providers/language-provider";
import { Text, TouchableOpacity } from "react-native";

interface LanguageButtonProps {
  languageKey: Language;
}

export default function LanguageButton(props: LanguageButtonProps) {
  const { language, setLanguage } = useLanguage();
  const { tr } = useLanguage();

  const languageTranslationMap = {
    en: 'english' as const,
    vi: 'vietnamese' as const,
    es: 'spanish' as const,
    fr: 'french' as const,
    de: 'german' as const,
    ja: 'japanese' as const,
    ko: 'korean' as const,
    zh: 'chinese' as const,
  };

  let languageKey = props.languageKey;

  return (
    <TouchableOpacity
      key={languageKey}
      className={`p-4 rounded-lg mb-2 ${language === languageKey ? 'bg-primary' : 'bg-secondary'}`}
      onPress={() => setLanguage(languageKey as Language)}
    >
      <Text className={`text-center ${language === languageKey ? 'text-background font-bold' : 'text-foreground'}`}>
        {tr(languageTranslationMap[languageKey as keyof typeof languageTranslationMap])} {language === languageKey && '✓'}
      </Text>
    </TouchableOpacity>
  );
}