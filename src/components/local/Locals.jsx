import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Table , Row, Col, Form, InputGroup, Button} from 'react-bootstrap';
import { app } from '../../firebaseInit';
import { getDatabase, ref, set, get } from 'firebase/database';
import { useNavigate } from 'react-router-dom';

const Locals = () => {
    //Firebase
    const navi = useNavigate();
    const db = getDatabase(app);
    const uid=sessionStorage.getItem('uid');

    const [loading, setLoading] = useState(false);
    const [query, setQuery] = useState('포켓몬');
    const [page, setPage]   = useState(1);
    const [locals, setLocals] = useState([])

    const callAPI = async() => {
        setLoading(true);
        const url = `https://dapi.kakao.com/v2/local/search/keyword.json?query=${query}&size=12&page=${page}`;
        const config = {
            headers:{"Authorization" : "KakaoAK ca4b7b39d6891e64b252f8fe84bb0760"}
          };
          const res = await axios.get(url, config);
          setLocals(res.data.documents);
          console.log(res.data.documents);
          setLoading(false);

    }

    useEffect(()=>{
        callAPI();
      }, []);
    
      const onSubmit = (e) => {
        e.preventDefault();
        setPage(1);
        callAPI();
      }

      const onClickFavorite = async(local) => {
        if(!uid){
            sessionStorage.setItem('target', '/locals');
            navi('/login');
            return;
        }
        if(window.confirm("즐겨찾기에 추가?")){
            console.log(local);
            await get(ref(db, `favorite/${uid}/${local.id}`)).then(async snapshot=>{
                if(snapshot.exists()){
                    alert("이미 즐겨찾기에 있습니다!!!!!!!!!!!!");
                }
                else{
                    await set(ref(db,`favorite/${uid}/${local.id}`), local);
                }
            })
        }
      }
    
      if(loading) return <h1 className = 'my-5'>로딩중입니다...</h1>

  return (
    <div>
      <h1 className='my-5'>지역검색</h1>
      <Row className='mb-2'>
        <Col xs={8} md={6} lg={4}>
          <Form onSubmit={onSubmit}>
            <InputGroup>
              <Form.Control onChange={(e)=>setQuery(e.target.value)} placeholder='검색어' value={query}/>
              <Button type="submit">검색</Button>
            </InputGroup>   
          </Form>
        </Col>
      </Row>
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
                    <td><Button onClick={()=>onClickFavorite(local)}>✭</Button></td>
                </tr>
            )}
        </tbody>
      </Table>
    </div>
  )
}

export default Locals
