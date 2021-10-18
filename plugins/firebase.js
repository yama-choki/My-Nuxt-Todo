import firebase from 'firebase'

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: 'AIzaSyAY3VLL6Z3DAhboU8AkfVK6ILZ_xbgIcgk',
    authDomain: 'my-todo-list-2fd47.firebaseapp.com',
    projectId: 'my-todo-list-2fd47',
    storageBucket: 'my-todo-list-2fd47.appspot.com',
    messagingSenderId: '718521569498',
    appId: '1:718521569498:web:4322941abb4e273afe55e3',
    measurementId: 'G-6ZJSLZSLC8'
  })
}

export default firebase
