import firebase from '@/plugins/firebase'

const db = firebase.firestore()
const todosRef = db.collection('todos')

export const state = () => ({
  todos: []
})

export const getters = {
  todos: (state) => {
    return state.todos
  }
}

export const mutations = {
  getTodos (state, todos) {
    state.todos = todos
  },
  deleteTodo (state, index) {
    state.todos.splice(index, 1)
  }
}

export const actions = {
  getTodos ({ commit }) {
    todosRef.orderBy('created', 'asc').get()
      .then((res) => {
        const todos = []
        res.forEach((x) => {
          todos.push(x.data())
        })
        commit('getTodos', todos)
      })
  },
  submitTodo ({ dispatch }, todo) {
    todosRef.add({
      isDone: false,
      title: todo.title,
      text: todo.text,
      limit: todo.limit,
      created: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => {
      dispatch('getTodos')
    })
  }
}
