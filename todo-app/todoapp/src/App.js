import "./App.css";
import Filter from "./components/Filter/Filter";
import List from "./components/list/List";
import Footer from "./components/Footer/Footer";
import React, { useState, useEffect } from "react";

function App() {
  const [rows, setrows] = useState([]);
  const [rowsBackUp, setrowsBackUp] = useState([]);

  const [todo, settodo] = useState({ id:0,task:"",compelted:false})
  const changeHandler=(event)=>{
      
      settodo({...todo,[event.target.name]:event.target.value,id:Math.floor(Math.random() * 10000)});
  }

  const removeRow = (rmId) => {
    let newRows = rows.filter((row) => row.id !== rmId);
    setrows(newRows);
  };
  const allCompleted=(input)=>{
   let all=rows.map((row)=>{
      row.compelted=input;
      return row;
    });
    setrows(all);

    
  }
  const rowCount=()=>{
  let arr= rows.filter((element)=>
      element.compelted===false
    )
    return arr.length;
  }
  const completeTask = (row) => {
    
    let todos= rows.map((element) => {
      if (element.id === row.id) {
        element.compelted = !element.compelted;
      }
      return element;
    });
    setrows(todos);
   
  };
  //filter
  const allTodo=()=>{
    setrows(rowsBackUp);
  }

  const activeTodo=()=>{
  let active= rows.filter((row)=>row.compelted===false)
  setrowsBackUp([...rows]);
  setrows(active);
  }
  const completedTo=()=>{
    let active= rows.filter((row)=>row.compelted===true)
  setrowsBackUp([...rows]);
  setrows(active);
  }

  useEffect(() => {}, []);

  return (
    <div>
      <section className="todoapp">
        <Filter settodo={settodo} todo={todo} changeHandler={changeHandler} setrows={setrows} rows={rows} />

        <List  settodo={settodo} todo={todo} setrows={setrows} allCompleted={allCompleted} rows={rows} removeRow={removeRow} completeTask={completeTask} />

        <Footer rowCount={rowCount} activeTodo={activeTodo} allTodo={allTodo} completedTo={completedTo}/>
      </section>

      <footer className="info">
        <p>Click to edit a todo</p>
        <p>
          Created by <a href="https://d12n.me/">Dmitry Sharabin</a>
        </p>
        <p>
          Part of <a href="http://todomvc.com">TodoMVC</a>
        </p>
      </footer>
    </div>
  );
}

export default App;
