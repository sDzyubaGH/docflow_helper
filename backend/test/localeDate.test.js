import { localeDate } from '../utils/functions.js' 

test('Локализация даты', () => {
  expect(localeDate('2023-02-26').toBe('26.02.2023'))
})