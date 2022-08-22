import React from "react";
import { Row, Col, Container } from "react-bootstrap";

const Heder = () => {
    return (
        <div className="bg-dark">
            <Container>
                <Row>
                    <Col className="py-5 text-white text-center">
                        <h2 >DappShop</h2>
                        <h5 className="text-white-50">With this shop hompeage template</h5>
                    </Col>
                </Row>
            </Container>
        </div>

    )
}

export default Heder;