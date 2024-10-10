import { Row, Col } from "react-bootstrap"
import DotLoader from "react-spinners/DotLoader"

const LoadingSpinner = () => {
    return (
   
        <Row>
            <Col className="d-flex align-items-center justify-content-center h-100 w-100">
            <DotLoader/>

            </Col>
        </Row>

    )
}

export default LoadingSpinner