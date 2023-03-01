import React, { useEffect, useState } from "react";
import { Button, Container, Form, Nav, Navbar } from "react-bootstrap"
import { Link} from "react-router-dom";
import Apis, { endpoints } from "../configs/Apis";
import {useNavigate} from "react-router";
import { useDispatch, useSelector } from "react-redux";
import cookies from 'react-cookies'
import { logoutUser } from "../ActionCreator/UserCreator";

const Header = () => {
    const [categories, setCategories] = useState([])
    const [q,setQ] = useState("")
    const dispatch = useDispatch()
    const history = useNavigate()
    const user = useSelector(state => state.user.user)

    useEffect(() => {
        const loadCategories = async () => {
            let res = await Apis.get(endpoints['categories'])
            setCategories(res.data)
        }

        loadCategories()
    },[])

    const search = (event) => {
        event.preventDefault()
        history(`/?q=${q}`)
    }

    const logout = (event) => {
        event.preventDefault()
        cookies.remove('access_token')
        cookies.remove('user')
        dispatch(logoutUser())
    }

    let path = <>
        <Link to="/login" className="nav-link text-danger">Đăng nhập</Link>
        <Link to="/register" className="nav-link text-danger">Đăng ký</Link>
    </>

    if (user !== null & user !== undefined){
        path = <>
            <Link to="/" className="nav-link text-danger">{user.username}</Link>
            <Link onClick={logout} className="nav-link text-danger">Đăng xuất</Link>
        </>
    }

    return(
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="/">ECourse App</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Link to="/" className="nav-link">Trang chủ</Link>
                        {categories.map(c => {
                            let path = `/?category_id=${c.id}`
                            return <Link to={path} className="nav-link">{c.name}</Link> })
                        }
                        {path}
                    </Nav>
                    <Form className="d-flex" onSubmit={search}>
                        <Form.Control
                        type="search"
                        placeholder="Nhập khóa học..."
                        className="me-2"
                        aria-label="Search"
                        value={q}
                        onChange={(event) => setQ(event.target.value)}
                        />
                        <Button type="submit" variant="outline-success">Tìm</Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header