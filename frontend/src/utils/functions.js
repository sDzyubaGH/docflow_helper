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

export function getCategories(categories, allCategories) {
  if (!categories) return null

  let categoriesString = ''

  const splitedCat = categories.split(';')

  for (const ac of allCategories) {
    for (const sc of splitedCat) {
      if (parseInt(sc) === ac.id) {
        categoriesString += ac.name + ' '
      }
    }
  }
  return categoriesString
}