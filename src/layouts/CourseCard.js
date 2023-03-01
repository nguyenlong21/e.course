import { Card, Col } from "react-bootstrap"
import { Link } from "react-router-dom"


const CourseCard = (props) => {
    let path = `/courses/${props.obj.id}/lessons/`
    if(props.type === "lesson")
        path = `/lessons/${props.obj.id}`
    return(
        <Col md={3} xs={12}>
            <Link to={path} style={{ textDecoration: 'none', color: 'inherit' }}>
                <Card>
                    <Card.Img variant="top" src={props.obj.image}/>
                    <Card.Body>
                        <Card.Title>{props.obj.subject}</Card.Title>
                        <Card.Text>
                            Ngày tạo: {props.obj.created_date}
                        </Card.Text>                                                         
                    </Card.Body>
                </Card>
            </Link>
        </Col>
         
    )
}
export default CourseCard