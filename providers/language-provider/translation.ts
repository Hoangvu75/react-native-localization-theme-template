import { LanguageCode } from "./language";

export interface Translation {
  welcome?: string;
  nextStep?: string;
  christmasTheme?: string;
  darkTheme?: string;
  pinkyTheme?: string;
  lightTheme?: string;
  halloweenTheme?: string;
  english?: string;
  vietnamese?: string;
  spanish?: string;
  french?: string;
  german?: string;
  japanese?: string;
  korean?: string;
  chinese?: string;
  language?: string;
  theme?: string;
  settings?: string;
  loading?: string;
  translating?: string;
  error?: string;
  removeCache?: string;
  cacheRemoved?: string;
  removeCacheConfirm?: string;
  // Translation progress keys - these are required for all languages
  connecting: string;
  currentStep: string;
  sendingTranslationRequest: string;
  processingTranslation: string;
  receivingTranslationData: string;
  parsingTranslationResults: string;
  noTranslationReceived: string;
  invalidJSONResponse: string;
  translationFailed: string;
  translatingTo: string;
  translationComplete: string;
  returningToHome: string;
  preparingTranslation: string;
}

export const translationMap: Record<LanguageCode, Translation> = {
  [LanguageCode.EN]: {
    welcome: 'Welcome to the App!',
    nextStep: 'Next Step',
    christmasTheme: '🎄 Christmas Theme',
    darkTheme: '🌙 Dark Theme',
    pinkyTheme: '💗 Pinky Theme',
    lightTheme: '☀️ Light Theme',
    halloweenTheme: '🎃 Halloween Theme',
    english: '🇺🇸 English',
    vietnamese: '🇻🇳 Vietnamese',
    spanish: '🇪🇸 Spanish',
    french: '🇫🇷 French',
    german: '🇩🇪 German',
    japanese: '🇯🇵 Japanese',
    korean: '🇰🇷 Korean',
    chinese: '🇨🇳 Chinese',
    language: 'Language',
    theme: 'Theme',
    settings: 'Settings',
    loading: 'Loading...',
    translating: 'Translating...',
    error: 'Translation failed',
    removeCache: 'Remove Cache',
    cacheRemoved: '✓ Cache Cleared!',
    removeCacheConfirm: 'This will clear all translation cache. Continue?',
    connecting: 'Connecting...',
    currentStep: 'Current step',
    sendingTranslationRequest: 'Sending translation request...',
    processingTranslation: 'Processing translation...',
    receivingTranslationData: 'Receiving translation data...',
    parsingTranslationResults: 'Parsing translation results...',
    noTranslationReceived: 'No translation received',
    invalidJSONResponse: 'Invalid JSON response',
    translationFailed: 'Translation failed',
    translatingTo: 'Translating to',
    translationComplete: '✓ Translation complete!',
    returningToHome: 'Returning to home...',
    preparingTranslation: 'Please wait while we prepare your translation...',
  },
  [LanguageCode.VI]: {
    connecting: 'Kết nối...',
    currentStep: 'Bước hiện tại',
    sendingTranslationRequest: 'Gửi yêu cầu dịch...',
    processingTranslation: 'Xử lý dịch...',
    receivingTranslationData: 'Nhận dữ liệu dịch...',
    parsingTranslationResults: 'Phân tích kết quả dịch...',
    noTranslationReceived: 'Không nhận được kết quả dịch',
    invalidJSONResponse: 'Kết quả dịch không hợp lệ',
    translationFailed: 'Dịch thất bại',
    translatingTo: 'Dịch sang',
    translationComplete: '✓ Dịch xong!',
    returningToHome: 'Quay về trang chủ...',
    preparingTranslation: 'Vui lòng chờ trong khi chúng tôi chuẩn bị dịch...',
  },
  [LanguageCode.ES]: {
    connecting: 'Conectando...',
    currentStep: 'Paso actual',
    sendingTranslationRequest: 'Enviando solicitud de traducción...',
    processingTranslation: 'Procesando traducción...',
    receivingTranslationData: 'Recibiendo datos de traducción...',
    parsingTranslationResults: 'Analizando resultados de traducción...',
    noTranslationReceived: 'No se recibió traducción',
    invalidJSONResponse: 'Respuesta JSON inválida',
    translationFailed: 'Traducción fallida',
    translatingTo: 'Traduciendo a',
    translationComplete: '✓ Traducción completa!',
    returningToHome: 'Volviendo a la página principal...',
    preparingTranslation: 'Por favor, espere mientras preparamos su traducción...',
  },
  [LanguageCode.FR]: {
    connecting: 'Connexion...',
    currentStep: 'Étape actuelle',
    sendingTranslationRequest: 'Envoi de la demande de traduction...',
    processingTranslation: 'Traitement de la traduction...',
    receivingTranslationData: 'Réception des données de traduction...',
    parsingTranslationResults: 'Analyse des résultats de traduction...',
    noTranslationReceived: 'Aucune traduction reçue',
    invalidJSONResponse: 'Réponse JSON invalide',
    translationFailed: 'Traduction échouée',
    translatingTo: 'Traduisant vers',
    translationComplete: '✓ Traductions terminées!',
    returningToHome: 'Retour à la page d\'accueil...',
    preparingTranslation: 'Veuillez patienter pendant que nous préparons votre traduction...',
  },
  [LanguageCode.DE]: {
    connecting: 'Verbinden...',
    currentStep: 'Aktueller Schritt',
    sendingTranslationRequest: 'Übersetzungsanfrage senden...',
    processingTranslation: 'Übersetzung verarbeiten...',
    receivingTranslationData: 'Übersetzungsdaten empfangen...',
    parsingTranslationResults: 'Übersetzungsergebnisse analysieren...',
    noTranslationReceived: 'Keine Übersetzung empfangen',
    invalidJSONResponse: 'Ungültige JSON-Antwort',
    translationFailed: 'Übersetzung fehlgeschlagen',
    translatingTo: 'Übersetzt in',
    translationComplete: '✓ Übersetzung abgeschlossen!',
    returningToHome: 'Zurück zur Startseite...',
    preparingTranslation: 'Bitte warten Sie, während wir Ihre Übersetzung vorbereiten...',
  },
  [LanguageCode.JA]: {
    connecting: '接続中...',
    currentStep: '現在のステップ',
    sendingTranslationRequest: '翻訳リクエストを送信...',
    processingTranslation: '翻訳処理中...',
    receivingTranslationData: '翻訳デイタを受信...',
    parsingTranslationResults: '翻訳結果を解析...',
    noTranslationReceived: '翻訳結果が受信されませんでした',
    invalidJSONResponse: '無効なJSON応答',
    translationFailed: '翻訳に失敗しました',
    translatingTo: '翻訳先',
    translationComplete: '✓ 翻訳が完了しました!',
    returningToHome: 'ホームに戻ります...',
    preparingTranslation: '翻訳を準備しています...',
  },
  [LanguageCode.KO]: {
    connecting: '연결 중...',
    currentStep: '현재 단계',
    sendingTranslationRequest: '번역 요청 전송...',
    processingTranslation: '번역 처리 중...',
    receivingTranslationData: '번역 데이터 수신...',
    parsingTranslationResults: '번역 결과 분석...',
    noTranslationReceived: '번역 결과가 수신되지 않았습니다',
    invalidJSONResponse: '유효하지 않은 JSON 응답',
    translationFailed: '번역 실패',
    translatingTo: '번역 대상',
    translationComplete: '✓ 번역이 완료되었습니다!',
    returningToHome: '홈으로 돌아갑니다...',
    preparingTranslation: '번역을 준비하고 있습니다...',
  },
  [LanguageCode.ZH]: {
    connecting: '连接中...',
    currentStep: '当前步骤',
    sendingTranslationRequest: '发送翻译请求...',
    processingTranslation: '处理翻译...',
    receivingTranslationData: '接收翻译数据...',
    parsingTranslationResults: '解析翻译结果...',
    noTranslationReceived: '未收到翻译结果',
    invalidJSONResponse: '无效的JSON响应',
    translationFailed: '翻译失败',
    translatingTo: '翻译成',
    translationComplete: '翻译完成!',
    returningToHome: '返回主页...',
    preparingTranslation: '正在准备翻译...',
  },
};