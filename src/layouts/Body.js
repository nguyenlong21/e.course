import { BrowserRouter, Routes, Route } from "react-router-dom"
import Footer from "./Footer"
import Header from "./Header"
import Home from "../pages/Home"
import Lesson from "../pages/Lesson"
import LessonDetail from "../pages/LessonDetail"
import Login from "../pages/Login"
import Register from "../pages/Register"


const Body = () => {

    return(
        <>
            <BrowserRouter>
                <Header />     
                <br />
                <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="/courses/:courseId/lessons/" element={<Lesson/>} />
                    <Route path="/lessons/:lessonId/" element={<LessonDetail/>} />
                    <Route path="/login" element={<Login/>} />
                    <Route path="/register" element={<Register/>} />
                </Routes>
                <br/>
                <Footer />    
            </BrowserRouter>    
        </>
           
    )
}
export default Body