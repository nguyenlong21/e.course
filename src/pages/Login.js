import { type } from "@testing-library/user-event/dist/type";
import {useState} from "react";
import { Button, Container, Form } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { useNavigate} from 'react-router-dom'
import loginUser from "../ActionCreator/UserCreator";
import Apis, { endpoints } from "../configs/Apis";
import cookies from 'react-cookies'

const Login = () => {
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const dispatch = useDispatch()
    const nav = useNavigate()

    const login = async (event) => {
        event.preventDefault()
        
        try {
            const info = await Apis.get(endpoints['oauth2-info'])   

            const res = await Apis.post(endpoints['login'],{
                'client_id': info.data.client_id,
                'client_secret': info.data.client_secret,
                'username': username,
                'password': password,
                'grant_type': 'password'
            })

            cookies.save('access_token', res.data.access_token)

            const user = await Apis.get(endpoints['current-user'], {
                headers: {
                    'Authorization': `Bearer ${cookies.load('access_token')}`
                }
            })

            console.info(user)

            cookies.save('user', user.data)

            dispatch(loginUser(user.data))

            if (user.status === 200)
                nav("/")

        } catch(err){
            console.error(err)
        }
    }
    return(
        <Container>
            <h1 className="text-center text-danger">ĐĂNG NHẬP</h1>
            <br />
            <Form onSubmit={login}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text"  placeholder="Nhập username..." 
                    value={username} onChange={(event) => setUsername(event.target.value)}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Nhập password..." 
                    value={password} onChange={(event) => setPassword(event.target.value)}/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>
                    <Button variant="primary" type="submit">Đăng nhập</Button>
                    </Form.Label>
                </Form.Group>             
            </Form>
        </Container>
    )
}

export default Login