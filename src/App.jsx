import './reset.css';
import './App.css';
import { useCallback, useEffect,useState } from 'react';
import ToDoForm from './components/ToDoForm';
import ToDoList from './components/ToDoList';
import CheckAllAndRemaining from './components/CheckAllAndRemaining';
import ToDoFilter from './components/ToDoFilter';
import ClearCompleted from './components/ClearCompleted';

function App() {

    const [todos, setTodos] = useState([]);
    const [filterTodos, setFilterTodos] = useState([]);

    useEffect(() => {
       fetch("http://localhost:5000/todos")
       .then(response => response.json())
       .then(data => {
        setTodos(data);
        setFilterTodos(data);
       });
     }, []);

     const deleteToDo = (id) => {
        fetch(`http://localhost:5000/todos/${id}`, {method: 'DELETE'});
        setTodos((prevToDos) => prevToDos.filter((todo) => todo.id !== id));
     }

     const updateToDo = (todo) => {
        console.log(todo);
        fetch(`http://localhost:5000/todos/${todo.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(todo)
        });
        setTodos((prevToDos) => prevToDos.map((t) => t.id === todo.id ? todo : t));
     }

    const checkAllToDos = () => {
        todos.forEach(todo => {
            todo.completed = true;
            updateToDo(todo);
        });

        setTodos((prevToDos) => prevToDos.map((todo) => {
            return {
                ...todo,
                completed: true
            }
        }));
    }

    const clearCompleted = () => {
        todos.forEach(todo => {
            if(todo.completed){
                deleteToDo(todo.id);
            };
        });
        setTodos((prevTodo) => prevTodo.filter((todo) => !todo.completed));
    }

    const addToDo = (todo) => {
        let id =  todos.length + 1 + "";
        let insertToDo = {...todo,id};

        fetch("http://localhost:5000/todos", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(insertToDo)
        })
        .then(response => response.json())
        .then(data => {
            setTodos((prevToDos) => [...prevToDos, data]);
            setFilterTodos((prevToDos) => [...prevToDos, data]);
        });
    }

    const filterToDo = useCallback((type) => {
        if(type === "all"){
            setFilterTodos(todos);
        }

        if(type === "active"){
            setFilterTodos(todos.filter(todo => !todo.completed));
        }

        if(type === "completed"){
            setFilterTodos(todos.filter(todo => todo.completed));
        }
    }, [todos]);

    return (
        <div className="todo-app-container">
        <div className="todo-app">
            <h2>Mini Todo List</h2>
            <ToDoForm addToDo={addToDo} />
            <ToDoList todos={filterTodos} deleteToDo={deleteToDo} updateToDo={updateToDo} />
            <CheckAllAndRemaining count={todos.filter(t=> !t.completed).length} checkAllToDos={checkAllToDos} />
            <div className="other-buttons-container">
                <ToDoFilter filterToDo={filterToDo} />
                <ClearCompleted clearCompleted={clearCompleted} />
            </div>
        </div>
        </div>
    );
}

export default App;
