import firebase from '@/plugins/firebase'

const db = firebase.firestore()
const todosRef = db.collection('todos')

export const state = () => ({
  todos: []
})

export const getters = {
  todos: (state) => {
    return state.todos.slice()
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

export const actions = {
  submitTodo ({ commit }, todo) {
    todosRef.add({})
      .then((res) => {
        todosRef.doc(res.id)
          .set({
            todo,
            id: res.id
          }).then(() => {
            commit('addTodos', todo)
          })
      })
  }
}
