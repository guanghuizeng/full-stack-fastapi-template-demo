import { useState, useCallback, useEffect } from 'react'
import zhCN from '../locales/zh-CN'
import enUS from '../locales/en-US'

type Locale = 'zh-CN' | 'en-US'
type Messages = typeof zhCN

const messages: Record<Locale, Messages> = {
  'zh-CN': zhCN,
  'en-US': enUS,
}

const LOCALE_KEY = 'locale'

export function useI18n() {
  const [locale, setLocaleState] = useState<Locale>(() => {
    const savedLocale = localStorage.getItem(LOCALE_KEY)
    return (savedLocale as Locale) || 'zh-CN'
  })

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale)
    localStorage.setItem(LOCALE_KEY, newLocale)
  }, [])

  const t = useCallback((key: string) => {
    const keys = key.split('.')
    let value: any = messages[locale]
    
    for (const k of keys) {
      if (value === undefined) return key
      value = value[k]
    }
    
    return value || key
  }, [locale])

  const changeLocale = useCallback((newLocale: Locale) => {
    setLocale(newLocale)
  }, [setLocale])

  return {
    locale,
    t,
    changeLocale,
  }
} 