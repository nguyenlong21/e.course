import { useEffect, useState } from "react"
import { Row } from "react-bootstrap"
import { useLocation } from "react-router"
import Apis, { endpoints } from "../configs/Apis"
import CourseCard from "../layouts/CourseCard"

const Home = () => {
    const [courses, setCourses] = useState([])
    const location = useLocation()
    useEffect(()=>{
        const loadCourses = async () => {
            
            try{
                let res = await Apis.get(`${endpoints['courses']}${location.search}`)
                setCourses(res.data)
            } catch(err){
                console.error(err)
            } 
            
        }

        loadCourses()
    },[location.search])
    
    return(
        <>
            <h1 className="text-center text-danger">DANH MỤC KHÓA HỌC</h1>
            <br />
            <Row>
                {courses.map(c => <CourseCard obj={c} />)}
            </Row>
        </>
    )
}

export default Home