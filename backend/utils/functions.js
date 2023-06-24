export function localeDate(date) {
  if (!date) {
    return null
  }

  const [year, month, day] = date.split('-')
  return `${day}.${month}.${year}`
}

export function localeTaskStatus(status) {
  if (!status) {
    return null
  }

  switch (status) {
    case "Задача": {
      return 'Не завершена'
    }
    case "Задача закрыта": {
      return "Завершена"
    }
  }
}