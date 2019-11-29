import axios from 'axios'

export function forEach(items, callback) {
  for (let index = 0; index < items.length; index++) {
    callback(items[index]);
  }
}

export class User {
  static all() {
    return axios.get('/users.json').then(response => response.data)
  }
}

export const foo = () => {
  // some implentation
}