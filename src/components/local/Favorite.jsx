import React, { useEffect, useState } from 'react'
import {app} from '../../firebaseInit'
import { getDatabase, ref, onValue, remove } from 'firebase/database'
import { Table , Button} from 'react-bootstrap';

const Favorite = () => {
    const [loading, setLoading] = useState(false);
    const [locals, setLocals] = useState([]);
    const db = getDatabase(app);
    const uid = sessionStorage.getItem("uid");

    const callAPI = () => {
        setLoading(true);
        onValue(ref(db, `favorite/${uid}`), snapshot=>{
            let rows=[];
            snapshot.forEach(row=>
                {
                    rows.push({...row.val()});
                }
            );
            console.log(rows);
            setLocals(rows);
            setLoading(false);
        })

    }

    const onClickDelete = async(local) =>{
        if(window.confirm(`${local.id}번을 삭제하실래예?`))
        {
            await remove(ref(db,`favorite/${uid}/${local.id}`));
        } else
        {
            return;
        }
    }

    useEffect(()=>{
        callAPI();
    }, []);

    if(loading) return <h1 className='my-5'>로딩중입니다...</h1>

  return (
    <div>
      <h1>즐겨찾기</h1>
      <Table>
        <thead>
            <tr>
                <td>ID</td>
                <td>장소명</td>
                <td>주소</td>
                <td>전화</td>
                <td>즐겨찾기</td>
            </tr>
        </thead>
        <tbody>
            {locals.map(local=>
                <tr key={local.id}>
                    <td>{local.id}</td>
                    <td>{local.place_name}</td>
                    <td>{local.address_name}</td>
                    <td>{local.phone}</td>
                    <td><Button onClick={()=>onClickDelete(local)}>🗑</Button></td>
                </tr>
            )}
        </tbody>
      </Table>
    </div>
  )
}

export default Favorite
