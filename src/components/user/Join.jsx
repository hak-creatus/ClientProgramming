import React, { useState} from 'react'
import {Row, Col, InputGroup, Form, Card, Button} from 'react-bootstrap'
import { app } from '../../firebaseInit'
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

const Join = () => {
    const navi = useNavigate();
    const auth = getAuth(app);
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        email: 'blue@test.com',
        pass:'12341234',
        pass1:'12341234'
    });

    const {email, pass, pass1} = form;

    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name]:e.target.value
        })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if(email==="" || pass==="" || pass1===""){
            alert("모든 내용을 입력하세요!");
        }else if(pass!==pass1){
            alert("비밀번호가 일치하지 않습니다!");
        }else{
            if(window.confirm("회원가입을 하실래요?")){
                setLoading(true);
                createUserWithEmailAndPassword(auth, email, pass)
                .then(success=>{
                    alert("회원가입성공!");
                    setLoading(true);
                    navi('/login');
                })
                .catch(err=>{
                    alert("회원가입오류:" + err.message);
                    setLoading(false);
                });
            }
        }
    }

    if(loading) return <h1 className='text-center my-5'>로딩중입니다....</h1>
    return (
        <Row className='justify-content-center my-5'>
        <Col xs={8} md={6} lg={4}>
            <Card>
                <Card.Header className='text-center'>
                    <h3>회원가입</h3>
                </Card.Header>
                <Card.Body>
                    <form onSubmit={onSubmit}>
                        <InputGroup className='mb-2'>
                            <InputGroup.Text style={{width:'100px'}} className='justify-content-center'>이메일</InputGroup.Text>
                            <Form.Control name="email" value={email} onChange={onChange}/>
                        </InputGroup>
                        <InputGroup className='mb-3'>
                            <InputGroup.Text style={{width:'100px'}} className='justify-content-center'>비밀번호</InputGroup.Text>
                            <Form.Control name="pass" type="password" value={pass} onChange={onChange}/>
                        </InputGroup>
                        <InputGroup className='mb-3'>
                            <InputGroup.Text style={{width:'100px'}} className='justify-content-center'>비밀번호확인</InputGroup.Text>
                            <Form.Control name="pass1" type="password" value={pass1} onChange={onChange}/>
                        </InputGroup>
                        <Button className='w-100' type="submit">회원가입</Button>
                    </form>
                </Card.Body>
            </Card>
        </Col>
    </Row>
    )
}

export default Join