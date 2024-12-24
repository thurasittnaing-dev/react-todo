import React from 'react'

export default function ClearCompleted({clearCompleted}) {
  return (
    <>
        <div>
            <button onClick={clearCompleted} className="button">Clear completed</button>
        </div>
    </>
  )
}
