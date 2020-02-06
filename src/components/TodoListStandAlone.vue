<!-- Todo list duplicate implementation, but instead of using VueX - deal with local state & signal events to parent for state change -->
<template>
  <v-container class="todo-list">
    <v-row>
      <v-col>
        <span>{{ statusMessage }}</span>
      </v-col>
    </v-row>
    <v-row align="baseline">
      <v-col>
        <v-text-field @keydown.enter="addTodo" v-model="newTodo" />
      </v-col>
      <v-col cols="auto">
        <v-menu open-on-hover offsetY :close-on-click="false">
          <template v-slot:activator="{ on }">
            <v-btn :color="color" v-on="on">Color</v-btn>
          </template>
          <v-color-picker v-model="color"></v-color-picker>
        </v-menu>
      </v-col>
      <v-col cols="auto">
        <v-btn @click="addTodo">Add</v-btn>
      </v-col>
    </v-row>
    <v-row align="baseline" dense v-for="(todo, index) in myTodos" :key="index">
      <v-col cols="auto">
        <div class="indicator" :style="{ backgroundColor: todo.color}"></div>
      </v-col>
      <v-col>
        <v-checkbox :color="todo.color" hide-details :label="todo.text" 
          @change="toggleCompleted(index)" :input-value="todo.completed" />
      </v-col>
      <v-col cols="auto">
        <v-btn small @click="removeTodo(index)">Remove</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<style lang="stylus" scoped>
  >>> .v-text-field 
    color: white 
  .indicator 
    width: 20px
    height: 20px 
    position: relative 
    top: 4px
</style>

<script lang="ts">
import Vue from 'vue';
import { Component, Watch, Prop, Emit } from 'vue-property-decorator'
import { Todo } from '@/model/todo-model'

@Component
export default class TodoListStandAlone extends Vue {
  @Prop() myTodos!: Todo[];
  
  private newTodo = '';
  private color = '';

  // Deep ensures this function fires on every change in the model. Use with care.
  // I've added a store watcher that does the same thing which is cleaner since the presentation
  // layer should not take care of this but left the code here as an example watcher.
  @Watch('myTodos', { deep : true })
  onChange() {
    this.$store.dispatch('save');
  }
 
  @Emit()
  addTodo() {
    if (this.newTodo.length > 0) {
        return {
            text: this.newTodo,
            completed: false,
            color: this.color
        }
    }
  }
  
  @Emit()
  toggleCompleted(index: number) {
    // No implementation needed. Index will be available as $event in the parent template.
    // Note that both @toggleCompleted and @toggle-completed are valid ways to listen to this event.
  }

  @Emit()
  removeTodo(index: number) {
    // No implementation needed. Index will be available as $event in the parent template.
    // Note that both @removeTodo and @remove-todo are valid ways to listen to this event.
  }

  get statusMessage() {
    const length = this.uncompletedTodos.length;
    if (length > 0) {
      return `You have ${length} stuff${length > 1 ? 's':''} to do.`;
    }
    return 'You have completed everything you champ!'
  }

  get uncompletedTodos() {
    return this.myTodos.filter(todo => !todo.completed);
  }
}
</script>
