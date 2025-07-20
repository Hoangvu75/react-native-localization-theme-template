import { useLanguage } from "providers/language-provider/language-provider";
import { useTheme } from "providers/theme-provider/theme-provider";
import { Theme, ThemeType } from "providers/theme-provider/theme";
import { Text, TouchableOpacity } from "react-native";
import { Translation } from "providers/language-provider/translation";

interface ThemeButtonProps {
  theme: Theme;
}

export default function ThemeButton(props: ThemeButtonProps) {
  const { theme: currentTheme, setTheme } = useTheme();
  const { tr } = useLanguage();

  const themeTranslationMap: Record<ThemeType, keyof Translation> = {
    [ThemeType.LIGHT]: 'lightTheme' as const,
    [ThemeType.DARK]: 'darkTheme' as const, 
    [ThemeType.XMAS]: 'christmasTheme' as const,
    [ThemeType.PINKY]: 'pinkyTheme' as const,
    [ThemeType.HALLOWEEN]: 'halloweenTheme' as const,
  };

  let themeKey = props.theme;

  return (
    <TouchableOpacity
      className={`p-4 rounded-lg mb-4 ${currentTheme.type === themeKey.type ? 'bg-primary' : 'bg-secondary'}`}
      onPress={() => setTheme(themeKey as Theme)}
    >
      <Text className={`text-center ${currentTheme.type === themeKey.type ? 'text-background font-bold' : 'text-foreground'}`}>
        {tr(themeTranslationMap[themeKey.type])} {currentTheme.type === themeKey.type && '✓'}
      </Text>
    </TouchableOpacity>
  );
}