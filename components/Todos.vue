<template>
  <div id="todos">
    <ul>
      <li v-for="todo in todos" :key="todo">
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
            <v-btn icon class="mt-2">
              <v-icon>mdi-trash-can-outline</v-icon>
            </v-btn>
          </div>
        </v-card>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      todos: ['予定１', '予定２', '予定３']
    }
  }
}
</script>

<style>
#todos{
  margin-top: 80px;
}
#todos ul {
  padding: 0;
}
#todos ul li{
  list-style: none;
}
.todo{
  display: flex;
  height: 50px;
  align-content: center;
}
.todo h4{
  width: 250px;
  line-height: 50px;
}
.time{
  width: 200px;
  line-height: 50px;
}
</style>
