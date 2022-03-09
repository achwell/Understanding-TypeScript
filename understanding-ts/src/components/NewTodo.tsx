import React, { FC, FormEvent, useRef } from "react"
import "./NewTodo.css"

type NewToDoProps = { onAddTodo: (a: string) => void }

const NewToDo: FC<NewToDoProps> = ({ onAddTodo }) => {

    const textRef = useRef<HTMLInputElement>(null)

    const todoSubmitHandler = (event: FormEvent) => {
        event.preventDefault()
        const enteredText = textRef.current!.value
        onAddTodo(enteredText)
    }

    return (
        <form>
            <div className="form-control">
                <label htmlFor="todo-text">Todo Text</label>
                <input type="text" id="todo-text" ref={textRef} />
            </div>
            <button type="submit" onClick={todoSubmitHandler}>ADD TODO</button>
        </form>
    )
}

export default NewToDo