import { vars } from "nativewind";

export enum ThemeType {
  LIGHT = 'light',
  DARK = 'dark',
  XMAS = 'xmas',
  PINKY = 'pinky',
  HALLOWEEN = 'halloween',
}

export interface ThemeColors {
  background: string;
  foreground: string;
  primary: string;
  secondary: string;
  muted: string;
  accent: string;
}

export class Theme {
  constructor(
    public readonly type: ThemeType,
    public readonly colors: ThemeColors,
  ) {
    this.type = type;
    this.colors = colors;
  }

  toNativeWindStyle(): Record<string, string> {
    let result: Record<string, string> = {};
    for (const key in this.colors) {
      result[`--color-${key}`] = this.colors[key as keyof ThemeColors];
    }
    return vars(result);
  }

  static getThemeByType(type: ThemeType): Theme {
    return this.allThemes.find(theme => theme.type === type) || this.light;
  }

  static light = new Theme(
    ThemeType.LIGHT,
    {
      background: '255 255 255',
      foreground: '30 41 59',
      primary: '59 130 246',
      secondary: '241 245 249',
      muted: '148 163 184',
      accent: '34 197 94',
    }
  );

  static dark = new Theme(
    ThemeType.DARK,
    {
      background: '15 23 42',
      foreground: '241 245 249',
      primary: '96 165 250',
      secondary: '51 65 85',
      muted: '100 116 139',
      accent: '34 197 94',
    }
  );

  static xmas = new Theme(
    ThemeType.XMAS,
    {
      background: '12 40 24',
      foreground: '240 253 244',
      primary: '220 38 38',
      secondary: '22 101 52',
      muted: '187 247 208',
      accent: '34 197 94',
    }
  );

  static pinky = new Theme(
    ThemeType.PINKY,
    {
      background: '253 242 248',
      foreground: '131 24 67',
      primary: '236 72 153',
      secondary: '249 168 212',
      muted: '190 24 93',
      accent: '219 39 119',
    }
  );

  static halloween = new Theme(
    ThemeType.HALLOWEEN,
    {
      background: '26 11 11',
      foreground: '254 243 199',
      primary: '234 88 12',
      secondary: '69 26 3',
      muted: '254 243 199',
      accent: '34 197 94',
    }
  );

  static allThemes = [
    this.light,
    this.dark,
    this.xmas,
    this.pinky,
    this.halloween,
  ];
}