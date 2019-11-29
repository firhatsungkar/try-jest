import { fetchData, fetchDataError } from './2-test-async-code';

describe('Callback', () => {

  test('the data is peanut butter', (done) => {
    function callback(data) {
      expect(data).toBe('peanut butter')
      done()
    }

    fetchData(callback)
  })

})

describe('Promises', () => {

  test('the data is peanut butter', () => {
    return fetchData().then( data => {
      expect(data).toBe('peanut butter')
    })
  })

  test('the data is peanut butter', () => {
    return expect(fetchData()).resolves.toBe('peanut butter')
  })

  test('the fetch fails with an error', () => {
    expect.assertions(1)
    return fetchDataError().catch(
      error => expect(error.message).toMatch(/error/gi)
    )
  })

  test('the fetch fails with an error', () => {
    return expect(fetchDataError()).rejects.toMatchObject(Error('Error fetching data.'))
  })

})

describe('Async/Await', () => {

  test('the data is peanut butter', async () => {
    const data = await fetchData()
    expect(data).toBe('peanut butter')
  })

  test('the data is peanut butter', async () => {
    await expect(fetchData()).resolves.toBe('peanut butter')
  })

  test('the fetch fails with an error', async () => {
    expect.assertions(1)
    try {
      await fetchDataError()
    } catch (error) {
      expect(error.message).toMatch(/error/gi)
    }
  })

  test('the fetch fails with an error', async () => {
    return expect(fetchDataError()).rejects.toMatchObject(Error('Error fetching data.'))
  })

})