export function localeDate(date) {
  if (!date) {
    return null
  }

  const [year, month, day] = date.split('-')
  return `${day}.${month}.${year}`
}

export function handleSpecSymbols(string) {
  if (!string) return null

  return string?.replace(/\&lt;br \/\&gt;|<br \/>/g, '\n')
}