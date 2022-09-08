import React from "react";
import { Row, Col, Container } from "react-bootstrap";

const Heder = () => {
    return (
        <div className="bg-dark">
            <Container>
                <Row>
                    <Col className="py-4 text-white text-center">
                        <h2 >DappShop</h2>
                    </Col>
                </Row>
            </Container>
        </div>

    )
}

export default Heder;