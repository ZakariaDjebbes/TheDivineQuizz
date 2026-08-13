import { LANGUAGES } from '../i18n'
import { useLocale } from '../i18n/LocaleContext'
import { isLocaleCode } from '../i18n'

/**
 * A native select, deliberately: it gets keyboard handling, screen-reader
 * semantics and the platform's own picker on mobile for free. Only the chrome
 * around it is custom.
 */
export function LanguagePicker() {
  const { locale, t, setLocale } = useLocale()

  return (
    <div className="relative">
      <label htmlFor="language" className="sr-only">
        {t.ui.language}
      </label>
      <select
        id="language"
        value={locale}
        onChange={(event) => {
          const next = event.target.value
          if (isLocaleCode(next)) setLocale(next)
        }}
        className="cursor-pointer appearance-none rounded-full border border-white/12 bg-transparent py-2 ps-4 pe-9 text-xs font-medium text-white/60 transition-colors outline-none hover:border-white/30 hover:text-white/90 focus-visible:ring-2 focus-visible:ring-white/40"
      >
        {LANGUAGES.map((language) => (
          <option
            key={language.code}
            value={language.code}
            className="bg-[color:var(--color-ink)] text-white"
          >
            {language.name}
          </option>
        ))}
      </select>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 end-3.5 flex items-center text-[10px] text-white/40"
      >
        ▼
      </span>
    </div>
  )
}
