class Todo {
  constructor(marker = '', title, description, timer = false, time = 0, done = false, id = null) {
    this.marker = marker
    this.title = title
    this.description = description
    this.timer = timer
    this.time = time
    this.done = done
    this.id = id
  }
}

export default  {
  state: {
    todos: [],
  },
  
  mutations: {
    setTodos(state, todos) {
      state.todos = todos
    },
    resetTodos(state) {
      state.todos = []
    },
    editDone(state, id) {
      const todo = state.todos.find(t => t.id === id)
      todo.done = !todo.done
    },
    createTodo(state, newTodo) {
      state.todos.push(newTodo)
    },
    editTodo(state, payload) {
      const todo = state.todos.find(t => t.id === payload.id)
      todo.marker = payload.marker
      todo.title = payload.title
      todo.description = payload.description
      todo.timer = payload.timer
      todo.time = payload.time
    },
    deleteTodo(state, id) {
      const index = state.todos.findIndex(t => t.id === id)
      state.todos.splice(index, 1)
    }
  },
  
  actions: {
    editDone({commit}, id) {
      commit('editDone', id)
    },
    createTodo({commit}, payload) {
      const marker = payload.marker + '.svg'
      const id = this.state.length + 1
      const newTodo = new Todo(
        '',
        payload.title,
        payload.description,
        payload.timer,
        payload.time,
      )
      commit('createTodo', {...newTodo, id, marker})
    },
    editTodo({commit}, payload) {
      commit('editTodo', payload)
    },
    deleteTodo({commit}, id) {
      commit('deleteTodo', id)
    }
  },
  
  getters: {
    todos(state) {
      return state.todos
    },
  }
}
