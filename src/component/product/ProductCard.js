import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";

const ProductCard = (props) => {
    return (
        <Card  style={{ width: '18rem' }}>
            <Card.Img className="p-4" variant="top" style={{height:'180px'}} src={props.image} />
            <Card.Body>
                <Row>
                    <Col xs={12} md={12}>
                        <Card.Title>{props.title.substring(0, 20) + '...'}</Card.Title>
                        <Card.Text>
                            {props.description.substring(0, 50) + '...'}
                        </Card.Text>
                    </Col>
                    <Col  xs={12} md={12} className="text-center mt-2">
                    <Button variant="outline-dark">Add To Card</Button>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    )
}
export default ProductCard;