<template>
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
</template>

<script>
export default {
}
</script>

<style>
.limit-title{
  display: flex;
  justify-content: center;
}
</style>
