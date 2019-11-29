describe('Common Matchers', () => {

  test('two plus two is four', () => {
    const { twoPlusTwo } = require('./1-using-matcher')
    expect(twoPlusTwo).toBe(4)
  })

  test('object assignment', () => {
    const { dataObj } =require('./1-using-matcher')
    const data = {one: 1}
    data['two'] = 2

    expect(data).toEqual({one: 1, two:2})
    expect(dataObj).toEqual({one: 1, two:2})
  })


})

describe('Truthiness', () => {

  test('null', () => {
    const { NULL } = require('./1-using-matcher')
    expect(NULL).toBeNull()
    expect(NULL).toBeDefined()
    expect(NULL).not.toBeUndefined()
    expect(NULL).not.toBeTruthy()
    expect(NULL).toBeFalsy()
  })

  test('zero', () => {
    const { zero } = require('./1-using-matcher')
    expect(zero).not.toBeNull()
    expect(zero).toBeDefined()
    expect(zero).not.toBeUndefined()
    expect(zero).not.toBeTruthy()
    expect(zero).toBeFalsy()
  })

})

describe('Numbers', () => {

  test('two plus two', () => {
    const { twoPlusTwo } = require('./1-using-matcher')
    expect(twoPlusTwo).toBeGreaterThan(3)
    expect(twoPlusTwo).toBeGreaterThanOrEqual(3.5)
    expect(twoPlusTwo).toBeLessThan(5)
    expect(twoPlusTwo).toBeLessThanOrEqual(4.5)
  })

  test('adding floating point number', () => {
    const value = 0.1 + 0.2
    expect(value).not.toBe(0.3)
    expect(value).toBeCloseTo(0.3)
  })

})

describe('String', () => {

  test('there is no I in team', () => {
    const { string1 } = require('./1-using-matcher')
    expect('team').not.toMatch(/I/)
  })

  test('but there is a "stop" in Christoph', () => {
    expect('Chirstoph').toMatch(/stop/)
  })

})

describe('Array and iterables', () => {

  test('the shopping list has beer on it', () => {
    const { shoppingList } = require('./1-using-matcher')
    expect(shoppingList).toContain('diapers')
  })

})

describe('Exceptions', () => {

  test('compiling android goes as expected', () => {
    const { compileAndroidCode } = require('./1-using-matcher')

    expect(compileAndroidCode).toThrow()
    expect(compileAndroidCode).toThrow(Error)
    expect(compileAndroidCode).toThrowError()

    expect(compileAndroidCode).toThrow('You are using wrong JDK')
    expect(compileAndroidCode).toThrow(/JDK/)

  })

})
