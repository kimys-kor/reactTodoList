import { useEffect, useState } from 'react';
import Todolist from './Components/Todolist';
import Completelist from  './Components/Completelist';
import styled from "styled-components";
import alldata from './todo.json'
import './App.css';

const Tabbox = styled.div`
  margin-top: 5rem !important;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-around;;
  align-items: center;
`

const Tabbutton = styled.button`
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer !important;
  border: none;
  background-color: #99ccff;
  color: white;
  font-size: 2rem;
  border-radius: 0.5rem;
`
const Input = styled.input`
  width: 300px;
  height: 2rem;
  font-size: 1rem
`

function App() {
  const [tab, setTab] = useState(0)

  const [dummydata, Setdummydata] = useState(alldata)

  const [completedata, Setcompletedata] = useState(
    dummydata.filter(function (element) {
      return element.completed === true;
    })
  )
  const [tododata, Settododata] = useState(
    dummydata.filter(function(element){
      return element.completed === false;
    })
  )

  useEffect(()=>{
    Setcompletedata(
      dummydata.filter(function (element) {
        return element.completed === true;
      })
    )
    Settododata(
      dummydata.filter(function(element){
        return element.completed === false;
      })
    )
  },[dummydata])

  

 

  const changeTododata = (id, what) => {
    if(what === 'delete'){
      Setdummydata(dummydata.filter(dummydata => dummydata.id !== id))
    } else if(what === 'clear') {
      Setdummydata(
        dummydata.map(todo => 
          todo.id === id ? {...todo, completed: !todo.completed} : todo
        )
      )
    }
  }

  const changeCompletedata = (id) =>{
    Setdummydata(
      dummydata.map(todo => 
        todo.id === id ? {...todo, completed: !todo.completed} : todo
      )
    )
  }
  
  const selectTab = (index)=>{
    setTab(index)
  }




  return (
    <>
    <Tabbox>
      <Tabbutton onClick={()=>selectTab(0)}>할일목록</Tabbutton>
      <Tabbutton onClick={()=>selectTab(1)}>완료한목록</Tabbutton>
    </Tabbox>
    <Tabbox>
      <Input placeholder="중요도 0~2" type="text"/>
      <Input placeholder="할일" type="text"/>
      <button>할일등록</button>
    </Tabbox>
    <div>
      {tab === 0 ? <Todolist tododata={tododata} changeTododata={changeTododata}></Todolist> : <Completelist completedata={completedata} changeCompletedata={changeCompletedata} ></Completelist>}
    </div>
    </>
  );
}

export default App;
