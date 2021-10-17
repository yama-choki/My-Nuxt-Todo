export const state = () => ({
  todos: ['あれ', 'これ', 'それ']
})

export const getters = {
  todos: (state) => {
    return state.todos
  }
}

export const mutations = {
  addTodo (state, todo) {
    state.todos.push(todo)
  },
  deleteTodo (state, index) {
    state.todos.splice(index, 1)
  }
}
