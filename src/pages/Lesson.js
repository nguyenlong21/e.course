import { useEffect, useState } from "react"
import { Card, Col, Row } from "react-bootstrap"
import { Link, useParams } from "react-router-dom"
import Apis, { endpoints } from "../configs/Apis"
import CourseCard from "../layouts/CourseCard"


const Lesson = () => {
    const [lessons, setLessons] = useState([])
    const { courseId } = useParams()
    
    useEffect(()=>{
        const loadLesson = async () => {
            try{
                let res = await Apis.get(endpoints['lessons'](courseId))
                setLessons(res.data)
            } catch(err){
                console.error(err)
            } 
            
        }

        loadLesson()
    },[])

    return(
        <>
            <h1 className="text-center text-danger">DANH SÁCH BÀI HỌC</h1>
            <br />
            <Row>
                {lessons.map(l => <CourseCard obj={l} type="lesson" />)}
            </Row>
        </>
        
    )
}
export default Lesson