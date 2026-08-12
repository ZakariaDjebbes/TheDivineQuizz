import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  DEFAULT_LOCALE,
  TRANSLATIONS,
  detectLocale,
  directionOf,
  isLocaleCode,
  type LocaleCode,
  type Translation,
} from './index'

const STORAGE_KEY = 'divine-quizz:locale'

interface LocaleValue {
  locale: LocaleCode
  dir: 'ltr' | 'rtl'
  t: Translation
  setLocale: (code: LocaleCode) => void
}

const LocaleContext = createContext<LocaleValue | null>(null)

function initialLocale(): LocaleCode {
  if (typeof window === 'undefined') return DEFAULT_LOCALE
  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (stored && isLocaleCode(stored)) return stored
  return detectLocale(window.navigator.languages ?? [window.navigator.language])
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<LocaleCode>(initialLocale)
  const dir = directionOf(locale)

  // The document itself carries the language, so `dir:` variants, text
  // selection and screen readers all follow the picker.
  useEffect(() => {
    document.documentElement.lang = locale
    document.documentElement.dir = dir
  }, [locale, dir])

  const setLocale = useCallback((code: LocaleCode) => {
    setLocaleState(code)
    try {
      window.localStorage.setItem(STORAGE_KEY, code)
    } catch {
      // Private browsing can refuse storage; the choice still applies here.
    }
  }, [])

  const value = useMemo<LocaleValue>(
    () => ({ locale, dir, t: TRANSLATIONS[locale], setLocale }),
    [locale, dir, setLocale],
  )

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  )
}

export function useLocale(): LocaleValue {
  const value = useContext(LocaleContext)
  if (!value) throw new Error('useLocale must be used inside a LocaleProvider')
  return value
}
