import Vue from 'vue'
import Vuex from 'vuex'
import todos from './todos'
import auth from '@/store/auth';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    pending: false,
  },
  mutations: {
    setPending(state, status) {
      state.pending = status;
    }
  },
  actions: {
  },
  modules: {
    auth,
    todos
  }
})
