import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
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
  width: 250px;
  height: 2rem;
  font-size: 1rem
`

function App() {
  const [tab, setTab] = useState(0)

  // 이 부분은 컴포넌트 상태값이 바뀔 때 마다 실행됩니다. useMemo나 컴포넌트 밖으로 빼시는건 어떨까요?
  const reversedata = []
  for(let i=alldata.length-1; i >= 0; i--) {
    reversedata.push(alldata[i]);
  }
  //


  const [dummydata, Setdummydata] = useState(reversedata)

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

  const { register, handleSubmit } = useForm();

  const onSubmit = data => {
    const temp = data;
    temp.id = dummydata[0].id+1;
    temp.completed = false;
    temp.date = String(new Date().toISOString());
    Setdummydata([temp, ...dummydata]);
  }

  const importanceSort = (what)=>{
    if(what === 'todo'){
      if(tododata[0].importance > tododata[tododata.length-1].importance){
        const sortedTododata = tododata.slice(0).sort((a,b)=>{
            return a.importance - b.importance;
          })
        Settododata(sortedTododata)
      } else {
          const sortedTododata = tododata.slice(0).sort((a,b)=>{
              return b.importance - a.importance;
            })
          Settododata(sortedTododata)
      }
    } else {
      if(completedata[0].importance > completedata[completedata.length-1].importance){
        const sortedCompleteData = completedata.slice(0).sort((a,b)=>{
            return a.importance - b.importance;
          })
          Setcompletedata(sortedCompleteData)
      } else {
          const sortedCompleteData = completedata.slice(0).sort((a,b)=>{
              return b.importance - a.importance;
            })
            Setcompletedata(sortedCompleteData)
      }
    }
  }

  const todoSort = (what)=>{
    if (what === 'todo') {
      if (tododata[0].todo > tododata[tododata.length - 1].todo){
        const sortedTododata = tododata.slice(0).sort().reverse();
        Settododata(sortedTododata)
      }else {
        const sortedTododata = tododata.slice(0).sort().reverse()
        Settododata(sortedTododata)
      }
    } else {
      if (completedata[0].todo > completedata[completedata.length - 1].todo){
        const sortedCompleteData = completedata.slice(0).sort().reverse();
        Setcompletedata(sortedCompleteData)
      }else {
        const sortedCompleteData = completedata.slice(0).sort().reverse()
        Setcompletedata(sortedCompleteData)
      }
    }
  }

  const dateSort = (what)=>{
    if (what === 'todo') {
      if (new Date(tododata[0].date).valueOf() > new Date(tododata[tododata.length - 1].date).valueOf()) {
        const sortedTododata = tododata.slice(0).sort((a, b)=>{
          return new Date(a.date).valueOf() - new Date(b.date).valueOf()
        })
        Settododata(sortedTododata)
      } else {
        const sortedTododata = tododata.slice(0).sort((a, b)=>{
          return new Date(b.date).valueOf() - new Date(a.date).valueOf()
        })
        Settododata(sortedTododata)
      }
    } else {
      if (new Date(completedata[0].date).valueOf() > new Date(completedata[completedata.length - 1].date).valueOf()) {
        const sortedCompleteData = completedata.slice(0).sort((a, b)=>{
          return new Date(a.date).valueOf() - new Date(b.date).valueOf()
        })
        Setcompletedata(sortedCompleteData)
      } else {
        const sortedCompleteData = completedata.slice(0).sort((a, b)=>{
          return new Date(b.date).valueOf() - new Date(a.date).valueOf()
        })
        Setcompletedata(sortedCompleteData)
      }
    }
    
  }

  

  return (
    <>
      <Tabbox>
        <Tabbutton onClick={() => selectTab(0)}>할일목록</Tabbutton>
        <Tabbutton onClick={() => selectTab(1)}>완료한목록</Tabbutton>
      </Tabbox>
      <Tabbox>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input placeholder="중요도" type="number" {...register("importance")} />
          <Input placeholder="할일" {...register("todo")} />
          <button type="submit" >등록 </button>
        </form>
      </Tabbox>
      <div>
        {tab === 0 ?
          <Todolist
            tododata={tododata}
            changeTododata={changeTododata}
            importanceSort={importanceSort}
            todoSort={todoSort}
            dateSort={dateSort} />
          :
          <Completelist
            completedata={completedata}
            changeCompletedata={changeCompletedata}
            importanceSort={importanceSort}
            todoSort={todoSort}
            dateSort={dateSort} />}
      </div>
    </>
  );
}

export default App;
