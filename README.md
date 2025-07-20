# My Expo App

A React Native application with dynamic theming and multi-language support.

## 🚀 Features

- **🌙 Dynamic Theming**: 5 built-in themes (Light, Dark, Christmas, Pinky, Halloween)
- **🌍 Multi-language Support**: 8 languages with AI-powered translation

## 📁 Project Structure

```
my-expo-app/
├── app/                          # App screens (Expo Router)
│   ├── _layout.tsx              # Root layout with providers
│   ├── home.tsx                 # Main home screen
│   └── translating.tsx          # Translation progress screen
├── components/                   # Reusable UI components
│   ├── language-button.tsx      # Language selection button
│   └── theme-button.tsx         # Theme selection button
├── providers/                    # React Context providers
│   ├── language-provider.tsx    # Language state management
│   └── theme-provider.tsx       # Theme state management
├── utils/                        # Utility functions and constants
│   ├── routes.ts                # App route definitions
│   └── storage-keys.ts          # AsyncStorage key constants
├── assets/                       # Static assets (images, icons)
├── global.css                    # Global Tailwind styles
├── package.json                  # Dependencies and scripts
└── tailwind.config.js           # Tailwind configuration
```

## 🎨 Theme System

### Available Themes

| Theme | Description | Primary Color |
|-------|-------------|---------------|
| `light` | Clean light theme | Blue |
| `dark` | Modern dark theme | Blue |
| `xmas` | Christmas themed | Red/Green |
| `pinky` | Pink themed | Pink |
| `halloween` | Halloween themed | Orange |

### Using Themes

#### 1. Theme Provider Setup

The theme system is automatically available throughout the app via the `ThemeProvider`:

```tsx
// app/_layout.tsx
export default function RootLayout() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <RootLayoutNav />
      </ThemeProvider>
    </LanguageProvider>
  );
}
```

#### 2. Using the Theme Hook

```tsx
import { useTheme } from '../providers/theme-provider';

function MyComponent() {
  const { theme, setTheme, themes } = useTheme();
  
  return (
    <View>
      <Text>Current theme: {theme}</Text>
      <TouchableOpacity onPress={() => setTheme('dark')}>
        <Text>Switch to Dark Theme</Text>
      </TouchableOpacity>
    </View>
  );
}
```

#### 3. Theme-Aware Styling

Use Tailwind classes that automatically adapt to the current theme:

```tsx
<View className="bg-background">
  <Text className="text-foreground text-xl">
    This text adapts to the current theme
  </Text>
  <TouchableOpacity className="bg-primary p-4 rounded-lg">
    <Text className="text-background">Primary Button</Text>
  </TouchableOpacity>
</View>
```

## 🌍 Language System

### Supported Languages

| Code | Language | Native Name |
|------|----------|-------------|
| `en` | English | English |
| `vi` | Vietnamese | Tiếng Việt |
| `es` | Spanish | Español |
| `fr` | French | Français |
| `de` | German | Deutsch |
| `ja` | Japanese | 日本語 |
| `ko` | Korean | 한국어 |
| `zh` | Chinese | 中文 |

### Using Languages

#### 1. Language Provider Setup

The language system is automatically available via the `LanguageProvider`:

```tsx
// app/_layout.tsx - Already set up in your project
<LanguageProvider>
  <ThemeProvider>
    <RootLayoutNav />
  </ThemeProvider>
</LanguageProvider>
```

#### 2. Using the Language Hook

```tsx
import { useLanguage } from '../providers/language-provider';

function MyComponent() {
  const { language, setLanguage, tr, languages, translationProgress } = useLanguage();
  
  return (
    <View>
      <Text>{tr('welcome')}</Text>
      <TouchableOpacity onPress={() => setLanguage('es')}>
        <Text>Switch to Spanish</Text>
      </TouchableOpacity>
    </View>
  );
}
```
