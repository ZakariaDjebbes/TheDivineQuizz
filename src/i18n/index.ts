import { ar } from './ar'
import { de } from './de'
import { en } from './en'
import { es } from './es'
import { fr } from './fr'
import { ru } from './ru'
import type { Language, LocaleCode, Translation } from './types'

export const TRANSLATIONS: Record<LocaleCode, Translation> = {
  en,
  fr,
  ar,
  de,
  ru,
  es,
}

/** Listed in the picker in this order; names are written in their own language. */
export const LANGUAGES: Language[] = [
  { code: 'en', name: 'English', dir: 'ltr' },
  { code: 'fr', name: 'Français', dir: 'ltr' },
  { code: 'es', name: 'Español', dir: 'ltr' },
  { code: 'de', name: 'Deutsch', dir: 'ltr' },
  { code: 'ru', name: 'Русский', dir: 'ltr' },
  { code: 'ar', name: 'العربية', dir: 'rtl' },
]

export const DEFAULT_LOCALE: LocaleCode = 'en'

export function isLocaleCode(value: string): value is LocaleCode {
  return value in TRANSLATIONS
}

export function directionOf(code: LocaleCode): 'ltr' | 'rtl' {
  return LANGUAGES.find((language) => language.code === code)?.dir ?? 'ltr'
}

/** First supported language among the browser's preferences, else English. */
export function detectLocale(preferences: readonly string[]): LocaleCode {
  for (const preference of preferences) {
    const base = preference.toLowerCase().split('-')[0]
    if (isLocaleCode(base)) return base
  }
  return DEFAULT_LOCALE
}

export type { Language, LocaleCode, Translation }
