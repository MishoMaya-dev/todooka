import http from '@/service/http';
import router from '@/router';

class User {
  constructor(user) {
    this.id = user.id;
    this.login = user.login;
    this.name = user.name;
  }
}

export default {
  state: {
    user: null,
  },
  mutations: {
    setUser(state, user) {
      localStorage.setItem('user-token', user.token)
      state.user = new User(user)
    },
    clearUser(state) {
      localStorage.clear()
      state.user = null
    },
  },
  actions: {
    async login({ commit }, userData) {
      try {
        commit('setPending', true)
        const user = await http.getUser(userData)
        commit('setUser', user)
        commit('setTodos', user.todos)
        await router.push('/')
      } finally {
        commit('setPending', false)
      }
    },
    async registration({ commit }, userData) {
      try {
        commit('setPending', true)
        const user = await http.setUser(userData)
        commit('setUser', user)
        commit('setTodos', user.todos)
        await router.push('/')
      } finally {
        commit('setPending', false)
      }
    },
    async getUserByToken({ commit }) {
      try {
        commit('setPending', true)
        const token = localStorage.getItem('user-token')
        if (!token) {
          await router.push('/login')
          return
        }
        const user = await http.getUserByToken(token)
        commit('setUser', user)
        commit('setTodos', user.todos)
        await router.push('/')
      } finally {
        commit('setPending', false)
      }
    },
    logout({ commit }) {
      commit('setPending', true)
      commit('clearUser')
      commit('resetTodos')
      router.push('/login')
      commit('setPending', false)
    }
  },
  getters: {
    isAuth: state => !!state.user,
  }
}