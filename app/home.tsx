import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../providers/theme-provider/theme-provider';
import { Theme } from '../providers/theme-provider/theme';
import { useLanguage } from '../providers/language-provider/language-provider';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StorageKeys } from '../utils/storage-keys';
import ThemeButton from 'components/theme-button';
import LanguageButton from 'components/language-button';

export default function HomeScreen() {
  const { themes } = useTheme();
  const { tr, languages } = useLanguage();

  const removeCache = () => {
    Alert.alert(
      tr('removeCache'),
      tr('removeCacheConfirm'),
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem(StorageKeys.LANGUAGE_STORAGE_KEY);
              await AsyncStorage.removeItem(StorageKeys.TRANSLATIONS_CACHE_KEY);
              await AsyncStorage.removeItem(StorageKeys.THEME_STORAGE_KEY);
              Alert.alert('Success', tr('cacheRemoved'));
            } catch (error) {
              console.error('Failed to remove cache:', error);
              Alert.alert('Error', 'Failed to clear cache');
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView className="bg-background flex-1">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <Text className="text-foreground text-2xl font-bold mb-4">
          {tr('welcome')}
        </Text>

        <TouchableOpacity
          className="bg-primary p-4 rounded-lg mb-4"
          onPress={() => removeCache()}
        >
          <Text className="text-background text-center">
            {tr('removeCache')}
          </Text>
        </TouchableOpacity>

        <Text className="text-foreground text-xl font-bold mb-4 mt-6">
          {tr('theme')}:
        </Text>

        {
          themes.map((theme) =>
            <ThemeButton key={theme.type} theme={theme} />
          )
        }

        <Text className="text-foreground text-xl font-bold mb-4 mt-6">
          {tr('language')}:
        </Text>

        {
          languages.map((language) =>
            <LanguageButton key={language.code} language={language} />
          )
        }
      </ScrollView>
    </SafeAreaView>
  );
}
