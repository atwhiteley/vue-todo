<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content>
      <v-row dense>
        <v-col cols="auto">
          <!-- Uses VueX as source of truth -->
          <TodoGrouped :myTodos="myTodos" />
        </v-col>
        <v-col>
          <!-- Uses VueX as source of truth -->
          <TodoList :myTodos="myTodos" />
        </v-col>
        <v-col>
          <!-- Designed as a standalone - give it a model and listen to the events -->
          <TodoListStandAlone 
            :myTodos="todos" 
            @toggle-completed="toggleCompleted"
            @add-todo="todos.push($event)"
            @remove-todo="todos.splice($event, 1)"
          />
        </v-col>
      </v-row>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator'
import TodoList from './components/TodoList.vue';
import TodoGrouped from './components/TodoGrouped.vue';
import TodoListStandAlone from './components/TodoListStandAlone.vue';
import { Todo } from '@/model/todo-model'

@Component({
  components: {
    TodoList,
    TodoGrouped,
    TodoListStandAlone
  }
})
export default class App extends Vue {

  // For the standalone component. This is currently not being saved in local storage.
  private todos: Todo[] = [];
  
  // Example function bound to custom event
  toggleCompleted(index: number) {
    this.todos[index].completed = !this.todos[index].completed;
  }

  mounted() {
    this.$store.dispatch('load');
  }

  get myTodos() {
    return this.$store.getters.todos as Todo[];
  }
}
</script>
