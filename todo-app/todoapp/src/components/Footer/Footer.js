import React,{useState} from "react";

export default function Footer({rowCount,activeTodo,allTodo,completedTo}) {
  const [isActive, setActive] = useState("");
 

  
 
 

 const addActiveClass=(e)=>{
    const clicked = e.target.id
    if(isActive === clicked) { 
       setActive("");
    } else {
        setActive(clicked);
        
        if(clicked==="first"){
          allTodo();
        }else if(clicked==="second"){
          activeTodo();
        }else{
          completedTo();
        }
   }
}


  return (
    <div>
      <footer className="footer">
        <span className="todo-count">
          <strong>{rowCount()} </strong>
           items left
        </span>

        <ul className="filters">
          <li>
            <a id="first" onClick={(e)=>addActiveClass(e)} className={isActive === "first"? 'selected': ''}>All</a>
          </li>
          <li>
            <a onClick={(e)=>addActiveClass(e)}   className={isActive === "second"? 'selected': ''} id="second"
        >Active</a>
          </li>
          <li>
            <a  onClick={(e)=>addActiveClass(e)}  className={isActive === "third"? 'selected': ''} id="third" >Completed</a>
          </li>
        </ul>

        <button className="clear-completed">Clear completed</button>
      </footer>
    </div>
  );
}
