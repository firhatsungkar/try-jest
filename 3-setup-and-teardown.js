export const initializeCityDatabase = () => {
  console.info('Initialize City database...')
}

export const clearCityDatabase = () => {
  console.info('Clearing city database...')
}

export const isCity = (city) => city ? true : false

export const initializeFoodDatabase = () => {
  console.info('Initialize Food database...')
}

export const isValidCityFoodPair = (...foods) => foods.length > 0 ? true : false