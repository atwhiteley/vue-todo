import { Todo } from '../model/todo-model'

const savePath = 'vueworkshop-todo-app';

export const loadTodos = () => {
    const rawJson = localStorage.getItem(savePath);
    if (!rawJson)
        return null;

    try {
        const myTodos = JSON.parse(rawJson) as Todo[];
        return myTodos;
    } catch (err) {
        console.warn('Error during parsing', err);
    }
    return null;
}

export const saveTodos = (data: Todo[]) => {
    localStorage.setItem(savePath, JSON.stringify(data));
}