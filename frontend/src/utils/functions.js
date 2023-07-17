export function localeDate(date) {
  if (!date) {
    return null
  }

  const [year, month, day] = date.split('-')
  return `${day}.${month}.${year}`
}

export function handleSpecSymbols(string) {
  if (!string) return null

  if (string.match(/\&lt;br \/\&gt;|<br \/>/g, '\n')) {
    return string?.replace(/\&lt;br \/\&gt;|<br \/>/g, '\n')
  }

  if (string.match(/\&quot;/g)) {
    return string.replace(/\&quot;/g, '"')
  }

  // Какой-то другой случай
  return string
}

export function getCategories(categories, allCategories) {
  if (!categories) return null

  const splitedCat = categories.split(';')

  const foundedCategories = []

  for (const ac of allCategories) {
    for (const sc of splitedCat) {
      if (parseInt(sc) === ac.id) {
        foundedCategories.push(ac.name)
      }
    }
  }

  return foundedCategories.join(', ')
}