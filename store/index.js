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
    console.log('確認４　store/index/mutations発火')
    console.log(state.todos)
    console.log(index)
    state.todos[index].isDone = !state.todos[index].isDone
    console.log('確認５　store/index/mutations終了')
  }
}

export const actions = {
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
  toggleIsDone ({ commit }, id) {
    console.log('確認２　store/index/actions発火')
    todosRef.doc(id).isDone = !todosRef.doc(id).isDone
    console.log('確認３　firebaseのisDoneを変更した後')
    commit('toggleIsDone')
    console.log('確認６　store/index/actions終了')
  }
}
