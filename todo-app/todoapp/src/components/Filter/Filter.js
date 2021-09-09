import React,{useState} from 'react'

export default function Filter({setrows,rows,changeHandler,todo,settodo}) {
   
   
    const clearInput=(event)=>{
        event.target.value="";
    }
    const onSubmit=(event)=>{
       
        setrows([...rows,todo]);
    }
    const something=(event)=> {
        
        if (event.key === "Enter") {
           
            clearInput(event);
            event.preventDefault();
            onSubmit();
        }
    }
    return (
        <div>
            <header className="header">
          <h1>todos</h1>
          <form >
            <input
              className="new-todo"
              name="task"
              placeholder="What needs to be done?"
              autoFocus
              onChange={changeHandler}
              onKeyDown={(event) => something(event) }
            />
          </form>
        </header>
        </div>
    )
}
