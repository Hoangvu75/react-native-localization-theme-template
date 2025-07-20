import { useLanguage } from "providers/language-provider";
import { Theme, useTheme } from "providers/theme-provider";
import { Text, TouchableOpacity } from "react-native";

interface ThemeButtonProps {
  themeKey: Theme;
}

export default function ThemeButton(props: ThemeButtonProps) {
  const { theme, setTheme } = useTheme();
  const { tr } = useLanguage();

  const themeTranslationMap = {
    light: 'lightTheme' as const,
    dark: 'darkTheme' as const, 
    xmas: 'christmasTheme' as const,
    pinky: 'pinkyTheme' as const,
    halloween: 'halloweenTheme' as const,
  };

  let themeKey = props.themeKey;

  return (
    <TouchableOpacity
      className={`p-4 rounded-lg mb-4 ${theme === themeKey ? 'bg-primary' : 'bg-secondary'}`}
      onPress={() => setTheme(themeKey as Theme)}
    >
      <Text className={`text-center ${theme === themeKey ? 'text-background font-bold' : 'text-foreground'}`}>
        {tr(themeTranslationMap[themeKey as keyof typeof themeTranslationMap])} {theme === themeKey && '✓'}
      </Text>
    </TouchableOpacity>
  );
}