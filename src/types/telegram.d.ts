/* eslint-disable @typescript-eslint/no-explicit-any */
export {}

declare global {
  interface TelegramWebAppUser {
    id: number;
    is_bot: boolean;
    first_name: string;
    last_name?: string;
    username?: string;
    language_code?: string;
  }

  interface TelegramWebAppInitDataUnsafe {
    user?: TelegramWebAppUser;
    chat?: unknown;
    auth_date?: number;
    hash?: string;
    [key: string]: any;
  }

  interface TelegramWebApp {
    initData: string;
    initDataUnsafe: TelegramWebAppInitDataUnsafe;
    version: string;
    platform: string;
    colorScheme: 'light' | 'dark';
    themeParams: Record<string, any>;

    isExpanded: boolean;
    viewportHeight: number;
    viewportStableHeight: number;

    expand(): void;
    close(): void;
    sendData(data: string): void;
    ready(): void;
    setHeaderColor(colorKey: 'bg_color' | 'secondary_bg_color' | 'button_color'): void;
  }

  interface Window {
    Telegram: {
      WebApp: TelegramWebApp;
    };
  }
}
