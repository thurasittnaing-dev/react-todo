import {useState,useEffect, useCallback} from 'react'

export default function ToDoFilter({filterToDo}) {

    const [filterState, setFilterState] = useState("all");

    useEffect(() => {
        filterToDo(filterState);
    }, [filterState,filterToDo])
  return (
    <>
        <div>
            <button className={`button filter-button ${filterState == "all" ? "filter-button-active" : ""}`} onClick={() => setFilterState("all")}>
              All
            </button>
            <button className={`button filter-button ${filterState == "active" ? "filter-button-active" : ""}`} onClick={() => setFilterState("active")}>To Do</button>
            <button className={`button filter-button ${filterState == "completed" ? "filter-button-active" : ""}`} onClick={() => setFilterState("completed")}>Completed</button>
        </div>
    </>
  )
}
