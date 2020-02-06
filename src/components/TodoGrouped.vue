<!-- Groups todo's by color, shows the todos on hover and you have the ability to remove them via the menu -->
<template>
  <v-container>
    <v-row v-for="grouped in myGroupedTodos" :key="grouped.color">
      <v-col>
        <v-menu open-on-hover offsetY>
          <template v-slot:activator="{ on }">
            <div v-on="on" class="block" :style="{ backgroundColor: grouped.color }">
              <span>{{ grouped.todos.length }}</span>
            </div>
          </template>
          <v-list>
            <v-list-item v-for="(todo, index) in grouped.todos" :key="index">
              <v-list-item-content>
                {{ todo.text }}
              </v-list-item-content>
              <v-list-item-action>
                <v-btn @click="removeTodo(todo)"><v-icon>mdi-delete</v-icon></v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-col>
    </v-row>
  </v-container>
</template>

<style lang="stylus" scoped>
  .block 
    width: 50px 
    height: 50px 
    display: flex 
    span 
      margin: auto
      color: white
      text-shadow: 1px 1px 0 black
</style>

<script lang="ts">
import Vue from 'vue';
import { Component, Watch, Prop } from 'vue-property-decorator'
import { Todo } from '@/model/todo-model'

interface GroupedTodo {
  todos: Todo[];
  color: string;
}

type GroupedTodos = Record<string, GroupedTodo>

@Component
export default class TodoGrouped extends Vue {
  @Prop() myTodos!: Todo[];

  removeTodo(todo: Todo) {
    this.$store.commit('removeTodo', todo);
  }

  get myGroupedTodos(): GroupedTodos {
    const myGroupedTodos: GroupedTodos = {};

    for (const todo of this.myTodos) {
      if (myGroupedTodos[todo.color]) {
        myGroupedTodos[todo.color].todos.push(todo);
      } else {
        myGroupedTodos[todo.color] = {
          todos: [todo],
          color: todo.color,
        }
      }
    }

    return myGroupedTodos;
  }
}
</script>
