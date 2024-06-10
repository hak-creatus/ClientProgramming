import React, { useState } from 'react'
import {Form, Button} from 'react-bootstrap'
import { app } from "../../firebaseInit"
import { addDoc, getFirestore, collection } from 'firebase/firestore'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'

const InsertPage = () => {
  const navi = useNavigate();
  const db = getFirestore(app);
  const [form, setForm] = useState({
    title:'',
    body:'',
  });
  
  const { title, body } = form;
  const onChangeForm = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  const onSubmit = async(e) => {
    e.preventDefault();
    if(title==="" || body===""){
      alert("제목이나 내용을 입력하세요!");
      return;
    }

    const now = new Date();
    await addDoc(collection(db, 'bbs'), {
        ...form, 
        email:sessionStorage.getItem('email'),
        date: moment(now).format('YYYY-MM-DD HH:mm:ss')
      });
    navi('/bbs/list');
  }

  return (
    <div className='my-5'>
      <h1>글쓰기</h1>
      <form className='px-5' onSubmit={onSubmit}>
        <Form.Control onChange={onChangeForm} name="title" value={title}
          placeholder='제목을 입력하세요.' className='mb-2'/>
        <Form.Control onChange={onChangeForm} name="body" value={body}
          placeholder='내용을 입력하세요.' as="textarea" rows={10}/>
        <div className='text-center my-3'>
          <Button className='px-5 me-3' type="submit">등록</Button>
          <Button className='px-5' variant='secondary' type="reset">취소</Button>
        </div>  
      </form>
    </div>
  )
}

export default InsertPage