import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { app } from '../../firebaseInit'
import { getFirestore, doc, getDoc, deleteDoc } from 'firebase/firestore'
import { Button, Card, Row, Col, Form } from 'react-bootstrap'
import Comments from './Comments'

const ReadPage = () => {
  const navi = useNavigate();
  const [loading, setLoading] = useState(false);
  const {id} = useParams();
  const db = getFirestore(app);
  const [post, setPost] = useState('')

  const callAPI = async() => {
    setLoading(true);
    const res = await getDoc(doc(db,'bbs', id));
    console.log(res.data());
    setPost(res.data());
    setLoading(false);
  }

  useEffect(()=>{
    callAPI();
  }, []);

  const onClickDelete = async() => {
    if(!window.confirm(`${id}번 게시글을 삭제하실래요?`)) return;
    setLoading(true);
    await deleteDoc(doc(db, 'bbs', id));
    setLoading(false);
    navi('/bbs/list');
  }

  const onClickUpdate = () => {
    navi(`/bbs/update/${id}`);
  }

  if(loading) return <h1 className='my-5 text-center'>로딩중......</h1>
  return (
    <Row className='justify-content-center my-5'>
      <Col xs={10} md={8} lg={7}>
        {sessionStorage.getItem("email")===post.email &&
          <div className='mb-2 text-end'>
            <Button onClick={onClickUpdate} size="sm" className='px-3 me-1' variant='success'>수정</Button>
            <Button onClick={onClickDelete} size="sm" className='px-3' variant='danger'>삭제</Button>
          </div>
        }
        <Card>
          <Card.Body>
            <h5>{post.title}</h5>
            <hr/>
            <div>
              <Form.Control rows={10} as="textarea" readOnly style={{border:'none'}}>{post.body}</Form.Control>
            </div>
          </Card.Body>
          <Card.Footer className='text-muted'>
            Posted on {post.date} by {post.date}
          </Card.Footer>
        </Card>
        <Comments/>
      </Col>
    </Row>
  )
}

export default ReadPage