import React, { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { app } from '../../firebaseInit'
import { collection, getFirestore, onSnapshot, orderBy, query } from 'firebase/firestore';
import Pagination from 'react-js-pagination';
import '../Paging.css'

const ListPage = () => {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5);
  const [total, setTotal] = useState(0)

  const [loading, setLoading] = useState(false);

  const [posts, setPosts]= useState([]);
  const email=sessionStorage.getItem("email");
  const db = getFirestore(app);
  const navi = useNavigate();

  const callAPI = () => {
    const q=query(collection(db, 'bbs'), orderBy('date', 'desc'));
    setLoading(true);

    let count=0;
    onSnapshot(q, snapshot=>{
      let rows=[];
      snapshot.forEach(row=>{
        count++;
        rows.push({no:count, id: row.id, ...row.data()});
      });
      
      const start=(page-1) * size + 1;
      const end=(page * size);
      const data=rows.filter(row=>row.no>=start && row.no<=end);
      setPosts(data);
      setTotal(count);
      setLoading(false);
    });
  }

  useEffect(()=>{
    callAPI();
  }, [page]);

  if(loading) return <h1 className='my-5'>로딩중......</h1>
  return (
    <div className='my-5'>
      <h1 className='my-5'>게시판</h1>
      {email && 
        <div className='text-end mb-2'>
          <a href="/bbs/insert"><Button className='px-5'>글쓰기</Button></a>
        </div>
      }
      <Table striped bordered hover>
        <thead>
          <tr className='table-primary text-center'>
            <td>No.</td>
            <td>Title</td>
            <td>Writer</td>
            <td>Date</td>
          </tr>
        </thead>
        <tbody>
          {posts.map(post=>
            <tr key={post.id}>
              <td>{post.no}</td>
              <td><a href={`/bbs/read/${post.id}`}>{post.title}</a></td>
              <td>{post.email}</td>
              <td>{post.date}</td>
            </tr>
          )}
        </tbody>
      </Table>
      <Pagination className="pagination"
          activePage={page}
          itemsCountPerPage={size}
          totalItemsCount={total}
          pageRangeDisplayed={5}
          prevPageText={"‹"}
          nextPageText={"›"}
          onChange={(e)=>setPage(e)}/>
    </div>
  )
}

export default ListPage