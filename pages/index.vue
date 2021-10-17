<template>
  <v-app>
    <div id="body">
      <header>
        <v-app-bar
          app
          color="#fcb69f"
          dark
          max-width="1000px"
        >
          <template #img="{ props }">
            <v-img
              v-bind="props"
              gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"
            />
          </template>

          <v-app-bar-nav-icon />

          <v-toolbar-title>やることリスト</v-toolbar-title>

          <v-spacer />
          <v-dialog
            v-model="addTodoDialog"
            max-width="600"
            persistent
          >
            <template #activator="{ on, attrs }">
              <v-btn
                icon
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>mdi-plus-circle-outline</v-icon>
              </v-btn>
            </template>
            <template #default="dialog">
              <v-card>
                <v-toolbar
                  color="primary"
                  dark
                >
                  やることを追加する
                </v-toolbar>
                <div class="mx-5">
                  <v-text-field v-model="todo" label="やること" class="mt-5" counter="10" />
                  <!-- <v-text-field v-model="todo.text" label="やることの説明" class="mt-5" counter="50" />
                  <h3 class="my-5 limit-title">
                    期限を入力してください
                  </h3>
                  <v-row justify="center">
                    <v-date-picker v-model="todo.limit" />
                  </v-row> -->
                </div>
                <v-card-actions class="justify-end">
                  <v-btn text color="primary" @click="addTodo()">
                    追加する
                  </v-btn>
                  <v-btn text color="primary" @click="dialog.value = false">
                    キャンセル
                  </v-btn>
                </v-card-actions>
              </v-card>
            </template>
          </v-dialog>
        </v-app-bar>
      </header>
      <main>
        <div id="todos">
          <ul>
            <li v-for="(todo, index) in todos" :key="todo.id">
              <v-card elevation="2" class="mb-1" color="green accent-2">
                <div class="todo">
                  <input type="checkbox" class="mx-5 mt-5">
                  <h4>{{ todo }}</h4>
                  <!-- <p class="time mx-5">
                    {{ todo.limit }}
                  </p>
                  <p class="text mx-5">
                    {{ todo.text }}
                  </p> -->
                  <v-spacer />
                  <v-btn icon class="mt-2">
                    <v-icon>mdi-pencil-plus</v-icon>
                  </v-btn>
                  <v-btn icon class="mt-2" @click="deleteTodo(index)">
                    <v-icon>mdi-trash-can-outline</v-icon>
                  </v-btn>
                </div>
              </v-card>
            </li>
          </ul>
        </div>
      </main>
    </div>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      addTodoDialog: false,
      todo: ''
      // todo: {
      //   title: '',
      //   text: '',
      //   limit: '',
      //   created: ''
      // }
    }
  },
  computed: {
    todos () {
      return this.$store.getters.todos
    }
  },
  methods: {
    addTodo () {
      if (this.todo) {
        this.$store.commit('addTodo', this.todo)
        this.todo = ''
        this.addTodoDialog = false
      }
    },
    deleteTodo (index) {
      this.$store.commit('deleteTodo', index)
    }
  }
}
</script>

<style>
main{
  max-width: 1000px;
  margin: 0 auto;
}
header{
  margin: 0 auto;
}
</style>
