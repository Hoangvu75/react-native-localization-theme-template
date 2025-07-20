export enum LanguageCode {
  EN = 'en',
  VI = 'vi',
  ES = 'es',
  FR = 'fr',
  DE = 'de',
  JA = 'ja',
  KO = 'ko',
  ZH = 'zh',
}

export class Language {
  name: string = '';
  nativeName: string = '';

  constructor(
    public readonly code: LanguageCode,
  ) {
    this.name = this.getName();
    this.nativeName = this.getNativeName();
  }

  private getName(): string {
    switch (this.code) {
      case LanguageCode.EN:
        return 'English';
      case LanguageCode.VI:
        return 'Vietnamese';
      case LanguageCode.ES:
        return 'Spanish';
      case LanguageCode.FR:
        return 'French';
      case LanguageCode.DE:
        return 'German';
      case LanguageCode.JA:
        return 'Japanese';
      case LanguageCode.KO:
        return 'Korean';
      case LanguageCode.ZH:
        return 'Chinese';
    }
  }

  private getNativeName(): string {
    switch (this.code) {
      case LanguageCode.EN:
        return 'English';
      case LanguageCode.VI:
        return 'Tiếng Việt';
      case LanguageCode.ES:
        return 'Español';
      case LanguageCode.FR:
        return 'Français';
      case LanguageCode.DE:
        return 'Deutsch';
      case LanguageCode.JA:
        return '日本語';
      case LanguageCode.KO:
        return '한국어';
      case LanguageCode.ZH:
        return '中文';
    }
  }

  static getLanguageByCode(code: LanguageCode): Language {
    return this.allLanguages.find(lang => lang.code === code) || this.enLanguage;
  }

  static enLanguage = new Language(LanguageCode.EN);
  static viLanguage = new Language(LanguageCode.VI);
  static esLanguage = new Language(LanguageCode.ES);
  static frLanguage = new Language(LanguageCode.FR);
  static deLanguage = new Language(LanguageCode.DE);
  static jaLanguage = new Language(LanguageCode.JA);
  static koLanguage = new Language(LanguageCode.KO);
  static zhLanguage = new Language(LanguageCode.ZH);
  
  static allLanguages = [
    this.enLanguage,
    this.viLanguage,
    this.esLanguage,
    this.frLanguage,
    this.deLanguage,
    this.jaLanguage,
    this.koLanguage,
    this.zhLanguage
  ];
}

