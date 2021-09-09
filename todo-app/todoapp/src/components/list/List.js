import React,{useState} from "react";

export default function List({ rows,removeRow,completeTask,allCompleted,setrows,settodo,todo}) {
const [active, setactive] = useState(true);

  const allComp=()=>{
    
    allCompleted(active);
    setactive(!active);
  }
  const clearInput=(event)=>{
    event.target.value="";
}
 const update=(event,row)=>{
   clearInput(event);
   settodo({...todo,[event.target.name]:event.target.value});

 }
 
  return (
    <div>
      <section className="main">
        <input className="toggle-all"  type="checkbox" />
        <label htmlFor="toggle-all" onClick={()=>allComp()}>Mark all as complete</label>

        <ul className="todo-list">
        

         
          {rows.map((row) => (
           <li key={row.id} id={row.id} className={ row.compelted===true?"completed":""}>
            <div className="view">
                <input className="toggle" checked={row.compelted} onChange={()=>{}} type="checkbox"  onClick={()=>completeTask(row)} />
            <label   >
            <input type="text" name="task" defaultValue={row.task}   defaultChecked={(e)=>update(e,row)}  />
            </label>
            <button className="destroy" onClick={()=>removeRow(row.id)} ></button>
                </div>
                </li>
              ))}
        </ul>
      </section>
      </div>
  );
}
