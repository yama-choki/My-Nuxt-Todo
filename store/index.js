/* eslint-disable array-callback-return */
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
  },
  toggleIsDone (state, index) {
    state.todos[index].isDone = !state.todos[index].isDone
  },
  sortTodos (state) {
    state.todos.sort(function (a, b) {
      if (a.created < b.created) {
        return -1
      }
    })
  }
}

export const actions = {
  getCompletedTodos ({ commit }) {
    todosRef.where('isDone', '==', true).get()
      .then((res) => {
        const todos = []
        res.forEach((x) => {
          const data = x.data()
          todos.push({
            isDone: data.isDone,
            title: data.title,
            text: data.text,
            limit: data.limit,
            created: data.created,
            id: x.id
          })
        })
        commit('getTodos', todos)
        commit('sortTodos')
      })
  },
  getIncompleteTodos ({ commit }) {
    todosRef.where('isDone', '==', false).get()
      .then((res) => {
        const todos = []
        res.forEach((x) => {
          const data = x.data()
          todos.push({
            isDone: data.isDone,
            title: data.title,
            text: data.text,
            limit: data.limit,
            created: data.created,
            id: x.id
          })
        })
        commit('getTodos', todos)
        commit('sortTodos')
      })
  },
  getTodos ({ commit }) {
    todosRef.orderBy('created', 'asc').get()
      .then((res) => {
        const todos = []
        res.forEach((x) => {
          const data = x.data()
          todos.push({
            isDone: data.isDone,
            title: data.title,
            text: data.text,
            limit: data.limit,
            created: data.created,
            id: x.id
          })
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
  },
  deleteTodo ({ dispatch }, id) {
    todosRef.doc(id).delete()
    dispatch('getTodos')
  },
  async toggleIsDone ({ commit, state }, index) {
    console.log('確認２　store/index/actions発火')
    const id = state.todos[index].id
    const todo = state.todos[index]
    await todosRef.doc(id).set({
      isDone: !todo.isDone,
      title: todo.title,
      text: todo.text,
      limit: todo.limit,
      created: todo.created
    })
    commit('toggleIsDone', index)
  }
}
