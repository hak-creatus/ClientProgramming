import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Route, Routes } from 'react-router-dom';
import About from '../About';
import Books from '../book/Books';
import Login from './Login';
import { useNavigate } from 'react-router-dom';
import MyPage from './MyPage';
import Join from './Join';
import Cart from '../book/Cart';
import ListPage from '../bbs/ListPage';
import InsertPage from '../bbs/InsertPage';
import ReadPage from '../bbs/ReadPage';
import UpdatePage from '../bbs/UpdatePage';

const Menu = () => {
    const navi = useNavigate();
    const onLogout = (e) => {
        e.preventDefault();
        if(window.confirm("정말로 로그아웃하실래요?")){
            sessionStorage.clear();
            navi("/");
        }
    }

    return (
        <>
            <Navbar bg='primary' variant='dark'>
                <Container fluid>
                    <Navbar.Brand href="/">Home</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll"/>
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            navbarScroll>
                            <Nav.Link href="/books">도서검색</Nav.Link>
                            <Nav.Link href="/cart">장바구니</Nav.Link>
                            <Nav.Link href="/bbs/list">게시판</Nav.Link>
                        </Nav>
                        {sessionStorage.getItem("uid") ?
                            <>
                                <Nav>
                                    <Nav.Link href="/mypage">{sessionStorage.getItem("email")}</Nav.Link>
                                </Nav>
                                <Nav>
                                    <Nav.Link href="#" onClick={onLogout}>로그아웃</Nav.Link>
                                </Nav>
                            </>
                            :
                            <Nav>
                                <Nav.Link href="/login">로그인</Nav.Link>
                            </Nav>    
                        }
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Routes>
                <Route path="/" element={<About/>}/>
                <Route path="/books" element={<Books/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/mypage" element={<MyPage/>}/>
                <Route path="/join" element={<Join/>}/>
                <Route path="/cart" element={<Cart/>}/>
                <Route path="/bbs/list" element={<ListPage/>}/>
                <Route path="/bbs/insert" element={<InsertPage/>}/>
                <Route path="/bbs/read/:id" element={<ReadPage/>}/>
                <Route path="/bbs/update/:id" element={<UpdatePage/>}/>
            </Routes>
        </>
    )
}

export default Menu