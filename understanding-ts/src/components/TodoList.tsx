import React, { FC } from "react"
import Todo from "../todo.model"

import "./TodoList.css"

interface TodoListPorps { items: Todo[], onDeleteTodo: (id: string) => void }

const ToDoList: FC<TodoListPorps> = ({ items, onDeleteTodo }) => {


    return <ul>{
        items.map(todo => <li key={todo.id}>
            <span>{todo.text}</span>
            <button onClick={onDeleteTodo.bind(null, todo.id)}>DELETE</button>
        </li>)
    }</ul>
}

export default ToDoList

