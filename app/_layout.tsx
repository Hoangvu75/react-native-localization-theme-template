import { Stack } from 'expo-router';
import { ThemeProvider } from '../providers/theme-provider';
import { LanguageProvider } from '../providers/language-provider';
import { routes } from '../utils/routes';
import '../global.css';

function RootLayoutNav() {
  let commonOptions = {
    headerShown: false,
  }
  return (
    <Stack>
      <Stack.Screen name={routes.home} options={commonOptions} />
      <Stack.Screen name={routes.translating} options={commonOptions} />
    </Stack>
  );
}



export default function RootLayout() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <RootLayoutNav />
      </ThemeProvider>
    </LanguageProvider>
  );
} 