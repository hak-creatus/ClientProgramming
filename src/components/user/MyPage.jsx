import React, { useEffect, useState } from 'react'
import {Row, Col, Card, Button, InputGroup, Form} from 'react-bootstrap';
import {app} from '../../firebaseInit'
import { doc, getFirestore, setDoc, getDoc } from 'firebase/firestore';
import ModalPhoto from './ModalPhoto';

const MyPage = () => {
    const [loading, setLoading] = useState(false);
    const db = getFirestore(app);
    const uid = sessionStorage.getItem('uid');
    const [form, setForm] = useState({
        email:sessionStorage.getItem('email'),
        name:'김김김',
        phone:'010-1111-0000',
        address1:'메롱시티',
        address2:'파인애플 집'

    });

    const {email, name, phone, address1, address2} = form;

    const onChangeForm = (e) => {
        setForm({...form, [e.target.name]:e.target.value});
    }

    const onSubmit = async(e) => {
        e.preventDefault();
        if(name===""){
            alert("이름을 입력하세요!");
            return;
        }
        if(!window.confirm("변경된 내용을 저장?")) return;
        console.log(form);
        setLoading(true);
        await setDoc(doc(db, `users/${uid}`), form);
        setLoading(false);
    }

    const callAPI = async() => {
        setLoading(true);
        const res=await getDoc(doc(db, `users/${uid}`));
        if(res.data()){
            setForm(res.data());
        }
        setLoading(false);
    }

    useEffect(()=>{
        callAPI()
    }, []);

    if(loading) return (<div>로딩중</div>)
  return (
    <Row>
        <Col>
            <Card>
                <Card.Header>
                    <h3 className='text-center'>마이 페이지</h3>
                </Card.Header>
                <Card.Body>
                    <div>
                        <ModalPhoto form={form} setForm={setForm} setLoading={setLoading}/>
                        <span style={{fontSize:'20px'}} className='ms-3'>{email}</span>
                        <hr/>
                    </div>
                    <form onSubmit={onSubmit}>
                        <InputGroup className='mb-2'>
                            <InputGroup.Text>이름</InputGroup.Text>
                            <Form.Control name='name' value={name} onChange={onChangeForm}/>
                        </InputGroup>
                        <InputGroup className='mb-2'>
                            <InputGroup.Text>전화</InputGroup.Text>
                            <Form.Control name='phone' value={phone} onChange={onChangeForm}/>
                        </InputGroup>
                        <InputGroup className='mb-2'>
                            <InputGroup.Text>주소</InputGroup.Text>
                            <Form.Control name='address1' value={address1} onChange={onChangeForm}/>
                        </InputGroup>
                        <Form.Control name='address2' value={address2} onChange={onChangeForm}/>
                        <div className='text-center mt'>
                            <Button className='px-5' type='submit'>저장</Button>
                            <Button variant='secondary' >취소</Button>
                        </div>

                    </form>
                </Card.Body>
            </Card>
        </Col>
    </Row>
  )
}

export default MyPage
