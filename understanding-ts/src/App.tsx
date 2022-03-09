import React, { FC, useState } from 'react'
import NewToDo from './components/NewTodo';
import ToDoList from './components/TodoList';
import Todo from './todo.model';

const App: FC = () => {
  const [todos, setTodos] = useState<Todo[]>([])

  const toDoAddHandler = (text: string) => setTodos(prevTodos => [...prevTodos, { id: new Date().getMilliseconds().toString(), text }])

  const todoDeleteHandler = (id: string): void => setTodos(todos.filter(todo => todo.id !== id))

  return (
    <div className="App">
      <NewToDo onAddTodo={toDoAddHandler} />
      <ToDoList items={todos} onDeleteTodo={todoDeleteHandler} />
    </div>
  );
}

export default App
