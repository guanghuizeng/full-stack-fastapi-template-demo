import { useState } from 'react'
import enUS from '../locales/en-US'
import zhCN from '../locales/zh-CN'

type Language = 'en-US' | 'zh-CN'
type TranslationKey = string
type TranslationValue = string | Record<string, any>

export function useI18n() {
  const [language, setLanguage] = useState<Language>('en-US')

  const translations = {
    'en-US': enUS,
    'zh-CN': zhCN,
  }

  const t = (key: TranslationKey, params?: Record<string, string>) => {
    const keys = key.split('.')
    let value: TranslationValue = translations[language]

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = (value as Record<string, TranslationValue>)[k]
      } else {
        return key
      }
    }

    if (typeof value === 'string' && params) {
      return value.replace(/\{\{(\w+)\}\}/g, (_: string, key: string) => params[key] || `{{${key}}}`)
    }

    return typeof value === 'string' ? value : key
  }

  return {
    language,
    setLanguage,
    t,
  }
}

export default useI18n 