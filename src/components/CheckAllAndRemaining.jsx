import React from 'react'

export default function CheckAllAndRemaining({count,checkAllToDos}) {


    return (
        <>
            <div className="check-all-container">
            <div>
                <div onClick={checkAllToDos} className="button">Check All</div>
            </div>

            <span>{count} item{count > 1 ? 's' : ''} remaining</span>
            </div>
        </>
    )
}
