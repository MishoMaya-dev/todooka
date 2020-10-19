import { v1 as uuid } from 'uuid'
import BaseUsers from '@/baseData/data'

export default {
  getUser({ email, password }) {
    const user = BaseUsers.find(user => user.email === email)
    if (user && user.password === password) {
      delete user.password
      return emitServer(user, 1)
    } else {
      return emitServer( { failed: true }, 1, true)
    }
  },
  getUserByToken(token) {
    const user = BaseUsers.find(user => user.token === token)
    if (user) {
      delete user.password
      return emitServer(user, 1)
    } else {
      return emitServer( { failed: true }, 1, true)
    }
  },
  setUser(newUser) {
    const user = {
      ...newUser,
      id: uuid(),
      login: newUser.email,
      token: newUser.password + newUser.password,
      todos: [],
    };
    window.baseUsers = BaseUsers
    BaseUsers.push({ ...user })
    if (user) {
      delete user.password
      return emitServer(user, 1)
    } else {
      return emitServer( { failed: true }, 1, true)
    }
  }
}

function emitServer(response, secDelay, rejected = false) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (rejected) {
        reject(response)
      } else {
        resolve(response)
      }
    }, secDelay * 1000)
  })
}