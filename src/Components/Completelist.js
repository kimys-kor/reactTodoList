import { useState } from "react";
import styled from "styled-components";

const Div = styled.div`
    margin-top: 3rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-Color: #ffb3ff;
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

function Completelist(props){
    const {completedata, changeCompletedata, todoSort, importanceSort, dateSort} = {...props};
    const Sortparam = 'complete'

    const Complete = completedata.map((item)=>(
        <tr key={item.id}>
            <Td>{item.importance}</Td>
            <Td>{item.todo}</Td>
            <Td>{item.date}</Td>
            <Td><button onClick={()=>changeCompletedata(item.id)}>할일목록으로 이동</button></Td>
        </tr>
    ))

    return(
        <Div>
            <h1>완료한 목록</h1>
            <Table>
                <tbody>
                    <tr>
                        <Th>중요도<button onClick={()=>importanceSort(Sortparam)}>중요도정렬</button></Th>
                        <Th>할일<button onClick={()=>todoSort(Sortparam)}>할일정렬</button></Th>
                        <Th>생성한 날짜<button onClick={()=>dateSort(Sortparam)}>날짜정렬</button></Th>
                    </tr>
                    {Complete}
                </tbody>
            </Table>
        </Div>
    )
}

export default Completelist;