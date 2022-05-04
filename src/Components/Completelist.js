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
    const array = props.completedata
    console.log(array, '완료목록')
    const changeCompletedata = props.changeCompletedata;

    const Complete = array.map((item)=>(
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
                        <Th>중요도</Th>
                        <Th>할일</Th>
                        <Th>완료한 날짜</Th>
                    </tr>
                    {Complete}
                </tbody>
            </Table>
        </Div>
    )
}

export default Completelist;