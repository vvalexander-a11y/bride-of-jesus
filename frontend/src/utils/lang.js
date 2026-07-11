export const URL_LANGS = ['en', 'ru', 'es']

export function localizedPath(path, lang) {
  if (lang === 'he') return path
  return path === '/' ? `/${lang}` : `/${lang}${path}`
}
