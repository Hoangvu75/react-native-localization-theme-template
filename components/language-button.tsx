import { Language, LanguageCode } from "providers/language-provider/language";
import {  useLanguage } from "providers/language-provider/language-provider";
import { Translation } from "providers/language-provider/translation";
import { Text, TouchableOpacity } from "react-native";

interface LanguageButtonProps {
  language: Language;
}

export default function LanguageButton(props: LanguageButtonProps) {
  const { language: currentLanguage, setLanguage } = useLanguage();
  const { tr } = useLanguage();

  const languageTranslationMap: Record<LanguageCode, keyof Translation> = {
    [LanguageCode.EN]: 'english',
    [LanguageCode.VI]: 'vietnamese',
    [LanguageCode.ES]: 'spanish',
    [LanguageCode.FR]: 'french',
    [LanguageCode.DE]: 'german',
    [LanguageCode.JA]: 'japanese',
    [LanguageCode.KO]: 'korean',
    [LanguageCode.ZH]: 'chinese',
  } as const;

  const { language } = props;
  const isSelected = currentLanguage.code === language.code;

  return (
    <TouchableOpacity
      key={language.code}
      className={`p-4 rounded-lg mb-2 ${isSelected ? 'bg-primary' : 'bg-secondary'}`}
      onPress={() => setLanguage(language)}
    >
      <Text className={`text-center ${isSelected ? 'text-background font-bold' : 'text-foreground'}`}>
        {tr(languageTranslationMap[language.code])} {isSelected && '✓'}
      </Text>
    </TouchableOpacity>
  );
}