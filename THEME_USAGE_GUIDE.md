# Theme Usage Guide - Simplified Edition

## Available Themes

Your app supports 5 different themes:
- **light**: Clean white background with blue accents
- **dark**: Dark background for low-light environments  
- **xmas**: Christmas theme with festive green and red colors
- **pinky**: Pink theme with warm, feminine colors
- **halloween**: Spooky dark theme with orange accents

## New Simplified Approach ✨

We now use **NativeWind's CSS variables approach** - much cleaner than before!

### How It Works

1. **CSS Variables**: Each theme sets color variables like `--color-primary`
2. **Simple Classes**: Just use `bg-primary`, `text-foreground` etc.
3. **No Safelist**: No more complex Tailwind safelist needed!
4. **Auto Theme Switch**: Colors change automatically when theme switches

## Usage

### 1. Wrap Your App

```tsx
// app/_layout.tsx
import { ThemeProvider } from '../state/theme/ThemeProvider';

export default function RootLayout() {
  return (
    <ThemeProvider>
      <YourApp />
    </ThemeProvider>
  );
}
```

### 2. Use the Hook

```tsx
import { useTheme } from '../state/theme/ThemeProvider';

export default function MyComponent() {
  const { theme, setTheme } = useTheme();

  return (
    <View className="bg-background flex-1 p-4">
      <Text className="text-foreground text-xl">
        Current theme: {theme}
      </Text>
      
      <TouchableOpacity 
        className="bg-primary p-4 rounded-lg mt-4"
        onPress={() => setTheme('xmas')}
      >
        <Text className="text-background text-center">
          Switch to Christmas
        </Text>
      </TouchableOpacity>
    </View>
  );
}
```

## Available Classes

### Background Classes
- `bg-background` - Main background color
- `bg-primary` - Primary button/accent color
- `bg-secondary` - Secondary background color  
- `bg-accent` - Accent highlight color
- `bg-muted` - Muted background color

### Text Classes  
- `text-foreground` - Primary text color
- `text-background` - Text on colored backgrounds (high contrast)
- `text-muted` - Muted/secondary text color

### Border Classes
- `border-primary` - Primary border color
- `border-secondary` - Secondary border color

## Example Components

### Simple Button
```tsx
<TouchableOpacity className="bg-primary p-4 rounded-lg">
  <Text className="text-background text-center font-semibold">
    Click Me
  </Text>
</TouchableOpacity>
```

### Card Component
```tsx
<View className="bg-secondary p-6 rounded-xl">
  <Text className="text-foreground text-xl font-bold mb-2">
    Card Title
  </Text>
  <Text className="text-muted">
    Card description text
  </Text>
</View>
```

### Theme Picker
```tsx
const themes = ['light', 'dark', 'xmas', 'pinky', 'halloween'] as const;

function ThemePicker() {
  const { theme, setTheme } = useTheme();
  
  return (
    <View className="bg-secondary p-4 rounded-lg">
      <Text className="text-foreground text-lg mb-4">Choose Theme</Text>
      {themes.map((themeOption) => (
        <TouchableOpacity
          key={themeOption}
          className={`p-3 rounded-lg mb-2 ${
            theme === themeOption ? 'bg-primary' : 'bg-accent'
          }`}
          onPress={() => setTheme(themeOption)}
        >
          <Text className="text-background capitalize text-center">
            {themeOption}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
```

## Theme Color Values

### Light Theme
- Background: White (#ffffff)
- Primary: Blue (#3b82f6) 
- Text: Dark slate (#1e293b)

### Dark Theme
- Background: Dark slate (#0f172a)
- Primary: Light blue (#60a5fa)
- Text: Light gray (#f1f5f9)

### Christmas Theme
- Background: Dark green (#0c2818)
- Primary: Christmas red (#dc2626)
- Accent: Christmas green (#22c55e)

### Pinky Theme  
- Background: Soft pink (#fdf2f8)
- Primary: Hot pink (#ec4899)
- Text: Dark pink (#831843)

### Halloween Theme
- Background: Dark brown (#1a0b0b)
- Primary: Pumpkin orange (#ea580c) 
- Text: Light amber (#fef3c7)

## Benefits of New Approach

✅ **90% Less Code**: No more complex class generation  
✅ **No Safelist Needed**: CSS variables handle everything  
✅ **Better Performance**: No runtime class string building  
✅ **Cleaner Components**: Simple, readable class names  
✅ **Type Safe**: Full TypeScript support  
✅ **Auto Storage**: Theme persists automatically  

## Migration from Old System

**Before (Complex):**
```tsx
const { bg, text, primary, primaryForeground } = this.themeClasses;
<View className={`${bg} flex-1`}>
  <Text className={`${text} text-lg`}>
    <TouchableOpacity className={`${primary} p-4`}>
      <Text className={`${primaryForeground}`}>
```

**After (Simple):**
```tsx
<View className="bg-background flex-1">
  <Text className="text-foreground text-lg">
    <TouchableOpacity className="bg-primary p-4">
      <Text className="text-background">
```

The new system is **much simpler, more maintainable, and follows NativeWind best practices**! 🎉
