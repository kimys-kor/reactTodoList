import { useState, useEffect } from 'react';
import styled from "styled-components";


const Div = styled.div`
    margin-top: 3rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #c299ff;
`

const Table = styled.table`
    white-space: nowrap;
`
const Th = styled.th`
    width: 200px;
    font-size: 2.3rem;
`
const Td = styled.td`
    text-align: center;
    font-size: 1rem;
`


function Todolist(props){
    const {tododata, changeTododata, todoSort, importanceSort, dateSort} = {...props}
    const Sortparam = 'todo'

    const Todo = tododata.map((item)=>(
        <tr key={item.id}>
            <Td>{item.importance}</Td>
            <Td>{item.todo}</Td>
            <Td>{item.date}</Td>
            <Td><button onClick={()=>changeTododata(item.id, 'delete')}>삭제</button></Td>
            <Td><button onClick={()=>changeTododata(item.id, 'clear')}>완료</button></Td>
        </tr>
    ))

    return(
        <Div>
            <h1>할일 목록</h1>
            <Table>
                <tbody>
                    <tr>
                        <Th>중요도<button onClick={()=>importanceSort(Sortparam)}>중요도정렬</button></Th>
                        <Th>할일<button onClick={()=>todoSort(Sortparam)}>할일정렬</button></Th>
                        <Th>생성한 날짜<button onClick={()=>dateSort(Sortparam)}>날짜정렬</button></Th>
                    </tr>
                    {Todo}
                </tbody>
            </Table>
        </Div>
    )
}

export default Todolist;