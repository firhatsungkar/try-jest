
export const fetchData = (callback) => {

  return new Promise((resolve) => {
    setTimeout(() => {
      const data = 'peanut butter'

      if (callback) {

        return callback(data)

      }

      resolve(data)

    }, 600)
  })
}

export const fetchDataError = (callback) => {

  return new Promise((_, rejected) => {
    setTimeout(() => {
      const data = 'peanut butter'

      if (callback) {

        return callback(data)

      }

      const error = new Error('Error fetching data.')

      rejected(error)

    }, 600)
  })
}