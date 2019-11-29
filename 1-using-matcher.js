module.exports = {
  'twoPlusTwo': (2+2),
  'dataObj': function() {
    const data = {one: 1}
    data['two'] = 2
    return data
  }(),
  NULL: null,
  zero: 0,
  shoppingList: [
    'diapers',
    'kleenex',
    'trash bags',
    'paper towels',
    'beer',
  ],
  compileAndroidCode: () => {
    throw new Error('You are using wrong JDK')
  }
}