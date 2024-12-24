import {useState} from 'react'

export default function ToDo({todo,deleteToDo,updateToDo}) {

    const [isEdit, setIsEdit] = useState(false);
    const [title,setTitle] = useState(todo.title);

    const handleUpdate = (e) => {
        e.preventDefault();

        updateToDo({
            id: todo.id,
            title: title,
            completed: todo.completed
        });
        setIsEdit(false);
    }

    const handleOnChange = (value) => {
        setTitle(value);
    }

    const handleCheckBox = () => {
        updateToDo({
            id: todo.id,
            title: todo.title,
            completed: !todo.completed
        });
    }

    return (
        <>
            <li className="todo-item-container">
                <div className="todo-item">
                    <input type="checkbox" checked={todo.completed} onChange={(e) => handleCheckBox(e)} />
                        {
                            !isEdit && <span onDoubleClick={()=>setIsEdit(true)} className={`todo-item-label ${todo.completed ? "line-through" : ""}`}>{todo.title}</span>
                        }
                        {
                            isEdit && <form onSubmit={handleUpdate}>
                                <input type="text" onChange={(e)=>handleOnChange(e.target.value)} onBlur={(e)=> handleUpdate(e)} className="todo-item-edit" value={title} />
                            </form>
                        }
                        <button className="x-button" onClick={() => deleteToDo(todo.id)}>
                        <svg
                            className="x-button-icon"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                        </button>
                        </div>
            </li>
        </>
    )
}
