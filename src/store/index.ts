import Vue from 'vue'
import Vuex from 'vuex'
import { Todo } from '@/model/todo-model'
import { loadTodos, saveTodos } from '@/service/localStorage'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    myTodos: [] as Todo[],
  },
  getters: {
    todos: state => state.myTodos,
    uncompletedTodos: state => state.myTodos.filter(todo => !todo.completed),
  },
  mutations: {
    toggleCompleted: (state, index: number) => state.myTodos[index].completed = !state.myTodos[index].completed,
    removeTodo: (state, val: number | Todo) => {
      // Narrow the type
      if (typeof val === "number") {
        state.myTodos.splice(val, 1);
      } else {
        const index = state.myTodos.indexOf(val);
        if (index >= 0) {
          state.myTodos.splice(index, 1);
        } 
      }

      // Or by using a custom type guard
      if (isTodo(val)) {
        // It's the object
      } else {
        // it's an index
      }
    },
    addTodo: (state, payload: Todo) => state.myTodos.push(payload),
    setTodos: (state, payload: Todo[]) => {
      state.myTodos = payload;
    }
  },
  actions: {
    load: (context) => {
      const todos = loadTodos();
      if (todos !== null) {
        context.commit('setTodos', todos);
      }
    },
    save: context => {
      saveTodos(context.state.myTodos);
    }
  }
})

/**
 * Example custom type guard.
 */
const isTodo = (todo: unknown): todo is Todo => {
  if (typeof todo === "object") {
    if (!todo)
      return false;
    return 'text' in todo;
  }
  return false;
}
