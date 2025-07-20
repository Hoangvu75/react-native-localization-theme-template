import { useEffect, useState } from 'react';
import { View, Text, Animated, Easing } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import { useLanguage } from '../providers/language-provider/language-provider';

export default function TranslatingScreen() {
  const { tr, translationProgress, languages } = useLanguage();
  const { languageCode } = useLocalSearchParams<{
    languageCode: string;
  }>();
  
  const targetLanguage = languages.find(lang => lang.code === languageCode);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(tr('connecting'));
  const [animatedProgress] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(animatedProgress, {
      toValue: progress,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();
  }, [progress, animatedProgress]);

  useEffect(() => {
    if (translationProgress && translationProgress.targetLanguage.code === languageCode) {
      setProgress(translationProgress.progress);
      setCurrentStep(translationProgress.step);
      
      if (translationProgress.progress >= 100) {
        setTimeout(() => {
          setCurrentStep(tr('returningToHome'));
          setTimeout(router.back, 500);
        }, 1000);
      }
    }
  }, [translationProgress, languageCode, tr]);

  const progressWidth = animatedProgress.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
    extrapolate: 'clamp',
  });

  return (
    <SafeAreaView className="bg-background flex-1">
      <View className="flex-1 justify-center items-center px-8">
        <View className="mb-8">
          <Text className="text-6xl text-center mb-4">🌐</Text>
          <Text className="text-foreground text-2xl font-bold text-center">
            {tr('translatingTo')}
          </Text>
          <Text className="text-primary text-xl font-semibold text-center mt-2">
            {targetLanguage?.nativeName}
          </Text>
        </View>

        <View className="w-full mb-6">
          <View className="bg-secondary rounded-full h-3 mb-4 overflow-hidden">
            <Animated.View
              className="bg-primary h-full rounded-full"
              style={{ width: progressWidth }}
            />
          </View>
          
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-muted text-sm">
              {tr('currentStep')}:
            </Text>
            <Text className="text-foreground text-sm font-medium">
              {Math.round(progress)}%
            </Text>
          </View>
          
          <Text className="text-foreground text-center">
            {currentStep}
          </Text>
        </View>

        <View className="mt-8">
          <Text className="text-muted text-center text-sm">
            {tr('preparingTranslation')}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
} 