import { RequestHandler } from "express"
import { Todo } from "../models/todo"

const TODOS: Todo[] = []

export const createTodo: RequestHandler = (req, res, next) => {
    const { text } = req.body as { text: string }
    const newTodo = new Todo(Math.random().toString(), text)
    TODOS.push(newTodo)
    res.status(201).json({ message: "Created new todo", createdTodo: newTodo })
}
export const getTodos: RequestHandler = (req, res, next) => {
    res.status(200).json(TODOS)
}

export const updateTodo: RequestHandler<{ id: string }> = (req, res, next) => {
    const todoId = req.params.id
    const { text } = req.body as { text: string }
    const todoIndex = TODOS.findIndex(todo => todo.id === todoId)
    if (todoIndex < 0) {
        throw new Error("Could not find todo with id " + todoId)
    }
    TODOS[todoIndex] = new Todo(TODOS[todoIndex].id, text)
    res.status(204).json({ message: "Updated!", updatedTodo: TODOS[todoIndex] })
}

export const deleteTodo: RequestHandler<{ id: string }> = (req, res, next) => {
    const todoId = req.params.id
    const todoIndex = TODOS.findIndex(todo => todo.id === todoId)
    if (todoIndex < 0) {
        throw new Error("Could not find todo with id " + todoId)
    }
    TODOS.slice(todoIndex, 1)
    res.status(204).json({ message: "Deleted!" })
}