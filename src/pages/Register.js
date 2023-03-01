import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button, Container, Form } from "react-bootstrap"
import Apis, { endpoints } from "../configs/Apis"

const Register = () => {
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState()
    const [firstName,setFirstName] = useState()
    const [lastName,setLastName] = useState()
    const [email,setEmail] = useState()
    const avatar = useRef()
    const nav = useNavigate()

    const register = (event) =>{
        event.preventDefault()

        let registerUser = async () => {
            const formData = new FormData()
            formData.append('first_name', firstName)
            formData.append('last_name', lastName)
            formData.append('username', username)
            formData.append('password', password)
            formData.append('email', email)
            formData.append('avatar', avatar.current.files[0])
            
            try{
                const res = await Apis.post(endpoints['register'], formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
  
                if (res.status === 201)
                    nav("/login")
            }catch (err) {
                console.error(err)
            } 
        }
        if (password !== null && password === confirmPassword){
            registerUser()
        }
    }

    return(
        <Container>
            <h1 className="text-center text-danger">ĐĂNG KÝ</h1>
            <br />
            <Form onSubmit={register}>
                <RegisterForm id='firstName' label='First Name' type='text' value={firstName} 
                    change={(event) => setFirstName(event.target.value)}/>
                
                <RegisterForm id='lastName' label='Last Name' type='text' value={lastName} 
                    change={(event) => setLastName(event.target.value)}/>
                
                <RegisterForm id='email' label='Email' type='email' value={email} 
                    change={(event) => setEmail(event.target.value)}/>
                
                <RegisterForm id='username' label='Username' type='text' value={username} 
                    change={(event) => setUsername(event.target.value)}/>

                <RegisterForm id='password' label='Password' type='password' value={password}
                    change={(event) => setPassword(event.target.value)}/>

                <RegisterForm id='confirm' label='Confirm Password' type='password' value={confirmPassword}
                    change={(event) => setConfirmPassword(event.target.value)}/>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Avatar</Form.Label>  
                    <Form.Control type="file" ref={avatar}/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>
                        <Button variant="primary" type="submit">Đăng ký</Button>
                    </Form.Label>
                </Form.Group>
                
            </Form>
                
        </Container>
    )
}
export default Register

function RegisterForm(props) {
    return(
        <Form.Group className="mb-3" controlId={props.id}>
            <Form.Label>{props.label}</Form.Label>
            <Form.Control type={props.type} value={props.value} onChange={props.change}/>
        </Form.Group>
    )
}