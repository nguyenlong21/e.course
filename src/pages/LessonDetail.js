import { useEffect, useState } from "react"
import { Badge, Button, Col, Form, Image, Row } from "react-bootstrap"
import Moment from "react-moment"
import { useSelector } from "react-redux"
import { useParams, Link } from "react-router-dom"
import Apis, { endpoints } from "../configs/Apis"
import cookies from "react-cookies"
import logo from '../images/icon_logo.svg'
import Rating from "react-rating"

const LessonDetail = () => {
    const [lesson, setLesson] = useState([])
    const [comments, setComments] = useState([])
    const [commentContent, setCommentContent] = useState([])
    const [rate, setRate] = useState(0)
    const [change, setChange] = useState(1)
    const { lessonId } = useParams()
    const user = useSelector(state => state.user.user)
    
    useEffect(()=>{
        const loadLesson = async () => {
            try{
                let res = await Apis.get(endpoints['lesson-detail'](lessonId),{
                    headers: {
                        "Authorization": `Bearer ${cookies.load("access_token")}`
                    }
                })
                setLesson(res.data)
                setRate(res.data.rate)
            } catch(err){
                console.error(err)
            } 
        }
        const loadComments = async () =>{
            try{
                let res = await Apis.get(endpoints['comments'](lessonId))
                setComments(res.data)
            } catch(err){
                console.error(err)
            } 
        }

        loadLesson()
        loadComments()

    },[change])
    const addComment = async (event) =>{
        event.preventDefault()
        
        try{
            let res = await Apis.post(endpoints['add-comment'](lessonId),{ 
                "content": commentContent
            },{
                headers: {
                    "Authorization": `Bearer ${cookies.load("access_token")}`
                }
            })
            console.info(res.data)
            comments.push(res.data)
            setComments(comments)
            setChange(comments.length)

        } catch(err){
            console.error(err)
        } 
    

    }
    const saveRating = async (rate) => {
        try{
            let res = await Apis.post(endpoints['rating'](lessonId), {
                "rating": rate
            },{
                headers: {
                    "Authorization": `Bearer ${cookies.load("access_token")}`
                }
            })
            console.info(res.data)
        }catch(err){
            console.error(err)
        }
    }
    let comment = <b><Link to="/login" style={{ textDecoration: 'none', color: 'red' }}>Đăng nhập</Link> để bình luận</b>
    let rating = ""
    
    if (user !== null && user !== undefined) {
        comment = <Form onSubmit={addComment}>
                        <Form.Group className="mb-3" controlId="commentContent">
                            <Form.Control as="textarea" value={commentContent} onChange={(event =>setCommentContent(event.target.value) )} placeholder="Nhập bình luận" rows={3} />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Thêm bình luận
                        </Button>
                    </Form>

        rating = <Rating initialRating={rate} onClick={saveRating}/> 
                
    }   
    return( 
        <>
            <h1 className="text-center text-danger">CHI TIẾT BÀI HỌC</h1>
            <br />
            <Row>
                <Col md={4} xs={12}>
                    <Image src={lesson.image} rounded fluid />
                </Col>
                <Col md={8} xs={12}>
                    <h2>{lesson.subject}</h2>
                    <p>Ngày tạo: {lesson.created_date}</p>
                    {/* <p>
                        {lesson.tag.map(t => <Badge bg="secondary">{t.name}</Badge>)}
                    </p> */}
                    <p>
                        {rating}
                    </p>
                </Col>
            </Row> 
            <hr/>
            <div>{lesson.content}</div>
            <hr/>
            {comment}
            <hr/>
            {comments.map(c => <>
                                <Row>
                                    <Col md ={1} xs = {5}>
                                        <Image src={logo} roundedCircle fluid />
                                    </Col>
                                    <Col md ={11} xs ={7}>
                                        <p><b>Nguời dùng {c.creator}</b></p>
                                        <p>{c.content}</p>                                
                                        <p><Moment fromNow>{c.created_date}</Moment></p>
                                    </Col>                                  
                                </Row>
                                <br/>
                                </>
                                
                                )
            }
        </>
            

        
    )
}
export default LessonDetail