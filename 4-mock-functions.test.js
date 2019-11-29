import axios from 'axios' 
import { 
  User,
  forEach,
 } from './4-mock-functions';

jest.mock('axios')

describe('Using mock function', () => {
  
  test('The mock function is called twice', () => {

    const mockCallback = jest.fn( x => 42 + x )

    forEach([0,1], mockCallback)

    expect(mockCallback.mock.calls.length).toBe(2)
    
  })

  test('The first argument of the first call to the function was 0', () => {

    const mockCallback = jest.fn( x => 42 + x )

    forEach([0,1], mockCallback)

    expect(mockCallback.mock.calls[0][0]).toBe(0)
    
  })

  test('The first argument of the second call to the function was 1', () => {

    const mockCallback = jest.fn( x => 42 + x )

    forEach([0,1], mockCallback)

    expect(mockCallback.mock.calls[1][0]).toBe(1)
    
  })

  test('The second argument of the second call to the function was undefined', () => {

    const mockCallback = jest.fn( x => 42 + x )

    forEach([0,1], mockCallback)

    expect(mockCallback.mock.calls[1][1]).toBeUndefined()
    
  })

  test('The return value of the first call to the function was 42', () => {

    const mockCallback = jest.fn( x => 42 + x )

    forEach([0,1], mockCallback)

    expect(mockCallback.mock.results[0].value).toBe(42)

  })

})

describe('.mock property', () => {

  test('All mock functions have this special .mock property', () => {

    const myMock = jest.fn()
  
    const a = new myMock()
    const b = {}
    const bound = myMock.bind(b)
  
    bound()
  
    console.log(myMock.mock.instances)

  })

  /** These mock members are very useful in tests to assert
   * how these functions get called, instantiated,
   * or what they returned
   */

  const someMockFunction = jest.fn( (name, ...others) => 'return value' )

  test('The function was called exactly once', () => {
    someMockFunction('first arg')
    expect(someMockFunction.mock.calls.length).toBe(1)
  })

  test("The first arg of the first call to the function was 'first arg'", () => {
    const firstArg = 'first arg'
    someMockFunction(firstArg)
    expect(someMockFunction.mock.calls[0][0]).toBe(firstArg)
  })

  test("The second arg of the first call to the function was 'second arg'", () => {
    const firstArg = 'first arg'
    const secondArg = 'second argument'
    someMockFunction(firstArg, secondArg)
    expect(someMockFunction.mock.calls[0][1]).toBe(secondArg)
  })

  test("The return value of the first call to the function was 'return value'", () => {
    const firstArg = 'first arg'
    const secondArg = 'second argument'
    someMockFunction(firstArg, secondArg)
    someMockFunction(secondArg, firstArg)
    expect(someMockFunction.mock.results[0].value).toBe('return value')
  })

    test('This function was instantiated exactly twice', () => {
      const firstArg = 'first arg'
      const secondArg = 'second argument'
      const firstInstance = new someMockFunction(firstArg, secondArg)
      const secondInstance = new someMockFunction(secondArg, firstArg)
      expect(someMockFunction.mock.calls.length).toBe(2)
    })

    // The object returned by the first instantiation of this function
    // had a `name` property whose value was set to 'test'
    test('The first instatiation should have object with property name', () => {
      const someMockFunction = jest.fn(function(name) {
        this.name = 'test'
      })
      const result = new someMockFunction('name')
      console.log(result)
      expect(someMockFunction.mock.instances[0].name).toBe('test')
    })

})

describe('Mock return values', () => {
  
  test('should return 10, \'x\', true, true', () => {
    
    const myMock = jest.fn()
    myMock
      .mockReturnValueOnce(10)
      .mockReturnValueOnce('x')
      .mockReturnValue(true)
    
    expect(myMock()).toBe(10)
    expect(myMock()).toBe('x')
    expect(myMock()).toBe(true)
    expect(myMock()).toBe(true)

  })
  
})

describe('Mocking Modules', () => {



  test('should fetch users', () => {
    const users = [{name: 'Bob'}]    
    const response = {data: users}
    axios.get.mockResolvedValue(response)

    return User.all().then( data => expect(data).toEqual(users) )
  })
  
})

describe('Mock Implementations', () => {
  
  test('should return true', () => {
    
    const myMockFn = jest.fn( cb => cb(null, true) )

    expect( myMockFn((error, val) => val)).toBeTruthy()

  })

  test('should return 43', () => {
    jest.mock('./4-mock-functions')
    const { foo } = require('./4-mock-functions')

    foo.mockImplementation( () => 42)

    expect(foo()).toBe(42)
  })
  
  test('should return true on the first call and false after that.', () => {
    
    const myMockFn = jest.fn()
    myMockFn
      .mockImplementationOnce(cb => cb(null, true))
      .mockImplementation(cb => cb(null, false))
    
    expect(myMockFn( (error, val) => val )).toBeTruthy()
    expect(myMockFn( (error, val) => val )).toBeFalsy()

  })

  test('should return \'first call\', \'second call\', \'default\', \'default\'', () => {
    
    const myMockFn = jest.fn(() => 'default')
    myMockFn
      .mockImplementationOnce(() => 'first call')
      .mockImplementationOnce(() => 'second call')
    
    expect(myMockFn()).toBe('first call')
    expect(myMockFn()).toBe('second call')
    expect(myMockFn()).toBe('default')
    expect(myMockFn()).toBe('default')

  })

  describe('Mock Names', () => {
    
    test.skip('should return 42', () => {

      const myMockFn = jest.fn()

      myMockFn
        .mockReturnValue('default')
        .mockImplementation(scalar => 42 + scalar)
        .mockName('add42')

      expect(myMockFn(0)).toBe('default')

    })

  })

describe('Custom Matchers', () => {
  
  const myMockFn = jest.fn()

  test('The mock function was called at least once', () => {
    myMockFn()
    expect(myMockFn).toBeCalled()
  })

  test('The mock function was called at least once with the specified args', () => {

    const args = ['arg1', 'arg2']
    myMockFn(...args)

    expect(myMockFn).toBeCalledWith(...args)

  })


  test('The last call to the mock function was called with the specified args', () => {

    const args = ['arg1', 'arg2']
    const lastArgs = ['argLast1', 'argLast2']
    myMockFn(...args)
    myMockFn(...lastArgs)

    expect(myMockFn).lastCalledWith(...lastArgs)

  })

  test('All calls and the name of the mock is written as a snapshot', () => {

    const args = ['arg1', 'arg2']
    myMockFn(...args)

    expect(myMockFn).toMatchSnapshot()

  })

})
  
  
  
  
  
})

