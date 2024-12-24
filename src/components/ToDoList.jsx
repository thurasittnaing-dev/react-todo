import React from 'react'
import ToDo from './ToDo'

export default function ToDoList({todos,deleteToDo,updateToDo}) {
  return (
    <>
        <ul className="todo-list">
            {
                todos.map(todo => <ToDo key={todo.id} todo={todo} deleteToDo={deleteToDo} updateToDo={updateToDo} />)
            }
        </ul>
    </>
  )
}
