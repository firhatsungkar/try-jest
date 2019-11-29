import {
  initializeCityDatabase,
  clearCityDatabase,
  isCity,
  initializeFoodDatabase,
  isValidCityFoodPair,
} from './3-setup-and-teardown';

describe('Repeating Setup For Many Tests', () => {

  beforeEach(() => {
    initializeCityDatabase()
  })

  afterEach(() => {
    clearCityDatabase()
  })

  test('city database has Vienna', () => {
    expect(isCity('Vienna')).toBeTruthy()
  })

  test('city database has San Juan', () => {
    expect(isCity('San Juan')).toBeTruthy()
  })

})

describe('One-Time Setup', () => {

  beforeAll(() => {
    initializeCityDatabase()
  })

  afterAll(() => {
    clearCityDatabase()
  })

  test('city database has Vienna', () => {
    expect(isCity('Vienna')).toBeTruthy()
  })

  test('city database has San Juan', () => {
    expect(isCity('San Juan')).toBeTruthy()
  })

})

describe('Scoping', () => {
  beforeEach(() => {
    return initializeCityDatabase();
  });
  
  test('city database has Vienna', () => {
    expect(isCity('Vienna')).toBeTruthy();
  });
  
  test('city database has San Juan', () => {
    expect(isCity('San Juan')).toBeTruthy();
  });

  describe('matching cities to foods', () => {
    // Applies only to tests in this describe block
    beforeEach(() => {
      return initializeFoodDatabase();
    });
  
    test('Vienna <3 sausage', () => {
      expect(isValidCityFoodPair('Vienna', 'Wiener Schnitzel')).toBe(true);
    });
  
    test('San Juan <3 plantains', () => {
      expect(isValidCityFoodPair('San Juan', 'Mofongo')).toBe(true);
    });

  });

})

describe('General Advice', () => {

  /** General Advice
   * If a test is failing,
   * one of the first things to check should be whether
   * the test is failing when it's the only test that runs.To run only
   * one test with Jest, temporarily change that test command to a test.only:
  */

  test.only('this will be the only test that runs', () => {
    expect(true).not.toBe(false);
  });
  
  test('this test will not run', () => {
    expect('A').toBe('A');
  });

})