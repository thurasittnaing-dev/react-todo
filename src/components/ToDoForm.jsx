import {useState} from 'react'

export default function ToDoForm({addToDo}) {

     const [title, setTitle] = useState("");

    const handleSumit = (e) => {
        e.preventDefault();
        const todo = {
            title: title,
            completed: false
        }
        addToDo(todo);
        setTitle("");
    }

  return (
    <>
    <form action="#" onSubmit={(e) => handleSumit(e)}>
        <input
        type="text"
        className="todo-input"
        placeholder="What do you need to do?"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        />
    </form>
    </>
  )
}
