import { useEffect, useState } from 'react';
import { View, Text, Animated, Easing } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import { useLanguage } from '../providers/language-provider';

export default function TranslatingScreen() {
  const { tr } = useLanguage();
  const { targetLanguage, languageName } = useLocalSearchParams<{
    targetLanguage: string;
    languageName: string;
  }>();  
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(tr('connecting'));
  const [animatedProgress] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(animatedProgress, {
      toValue: progress,
      duration: 300,
      easing: Easing.out(Easing.quad),
      useNativeDriver: false,
    }).start();
  }, [progress, animatedProgress]);

  useEffect(() => {
    const handleTranslationProgress = (event: any) => {
      if (event.targetLanguage === targetLanguage) {
        setProgress(event.progress);
        setCurrentStep(event.step);
        
        if (event.progress >= 100) {
          setTimeout(router.back, 1000);
        }
      }
    };

    const globalThis = global as any;
    globalThis.translationProgressListeners = globalThis.translationProgressListeners || [];
    globalThis.translationProgressListeners.push(handleTranslationProgress);

    return () => {
      if (globalThis.translationProgressListeners) {
        globalThis.translationProgressListeners = globalThis.translationProgressListeners.filter(
          (listener: any) => listener !== handleTranslationProgress
        );
      }
    };
  }, [targetLanguage]);

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
            {languageName}
          </Text>
        </View>

        <View className="w-full mb-6">
          <View className="bg-secondary rounded-full h-3 mb-4 overflow-hidden">
            <Animated.View
              className="bg-primary h-full rounded-full"
              style={{ width: progressWidth }}
            />
          </View>
          
          <Text className="text-foreground text-lg font-semibold text-center mb-2">
            {Math.round(progress)}%
          </Text>
          
          <Text className="text-muted text-base text-center">
            {currentStep}
          </Text>
        </View>

        <View className="flex-row justify-center items-center mt-4">
          {[0, 1, 2].map((index) => (
            <Animated.View
              key={index}
              className="w-2 h-2 bg-primary rounded-full mx-1"
              style={{
                opacity: animatedProgress.interpolate({
                  inputRange: [0, 100],
                  outputRange: [0.3, 1],
                  extrapolate: 'clamp',
                }),
                transform: [
                  {
                    scale: animatedProgress.interpolate({
                      inputRange: [0, 50, 100],
                      outputRange: [1, 1.2, 1],
                      extrapolate: 'clamp',
                    }),
                  },
                ],
              }}
            />
          ))}
        </View>

        {progress >= 100 && (
          <View className="mt-8">
            <Text className="text-accent text-lg font-semibold text-center">
              {tr('translationComplete')}
            </Text>
            <Text className="text-muted text-sm text-center mt-2">
              {tr('returningToHome')}
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
