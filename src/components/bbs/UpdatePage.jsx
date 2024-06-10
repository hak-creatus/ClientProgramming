import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { app } from '../../firebaseInit'
import { getFirestore, getDoc, doc, setDoc } from 'firebase/firestore'
import { Button, Form } from 'react-bootstrap'

const UpdatePage = () => {
  const navi = useNavigate();
  const {id} = useParams();
  const db = getFirestore(app);
  const [post, setPost] = useState('');
  const [loading, setLoading] = useState(false);
  const { title, body } = post;

  const callAPI = async() => {
    setLoading(true);
    const res = await getDoc(doc(db,'bbs', id));
    console.log(res.data());
    setPost(res.data());
    setLoading(false);
  }

  const onSubmit = async(e) => {
    e.preventDefault();
    if(!window.confirm("게시글을 수정하실래요?")) return;
    setLoading(true);
    await setDoc(doc(db, 'bbs', id), post);
    setLoading(false);
    navi(`/bbs/read/${id}`);
  }

  const onChangeForm = (e) => {
    setPost({...post, [e.target.name]:e.target.value});
  }

  useEffect(()=>{
    callAPI();
  }, []);

  if(loading) return <h1 className='my-5 text-center'>로딩중......</h1>
  return (
    <div className='my-5 px-5'>
      <h1 className='text-center'>글수정</h1>
      <form onSubmit={onSubmit}>
        <Form.Control name="title" onChange={onChangeForm} value={title} placeholder='제목을 입력하세요.' className='mb-2'/>
        <Form.Control name="body" onChange={onChangeForm} value={body} as="textarea" rows={10} placeholder='내용을 입력하세요.'/>
        <div className='text-center my-3'>
          <Button className='px-5 me-3' type="submit">수정</Button>
          <Button className='px-5' variant='secondary' type="reset">취소</Button>
        </div> 
      </form>
    </div>
  );
}

export default UpdatePage