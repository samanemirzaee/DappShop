import React, { useContext } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import { ListOrder } from "../contextTwo";


const ProductCard = (props) => {
    let { myListOrder, setmyListOrder } = useContext(ListOrder)


    function HandleClick() {
        const oneProduct = myListOrder.filter(i => i.productId == props.id)
        if (oneProduct.length == 0) {
            setmyListOrder([...myListOrder,
            {
                productId: props.id,
                productTitle: props.title,
                productImage: props.image,
                productPriceUSD: props.price_usd,
                productPriceETH: props.price_eth,
                productDescription: props.description,
                productCount: 1
            }])
        } else {
            setmyListOrder(myListOrder.map(p => {
                if (p.productId == props.id && p.productCount+1 < props.stock) { p.productCount += 1 }
                return p
            }))
        }
    }
    return (
        <>
            <Card style={{ width: '16rem' }}>

                <Card.Img className="px-5 py-4" variant="top" style={{ height: '160px' }} src={props.image} />
                <Card.Body className="pt-0">
                    <Row>
                        <Col xs={12} md={12}>
                            <Card.Title>{props.title.substring(0, 20) + '...'}</Card.Title>
                            <Card.Text>
                                {props.description.substring(0, 25) + '...'}
                            </Card.Text>
                        </Col>
                        <Col xs={12} md={12} className="d-flex gap-1 justify-content-between">
                            <Col  >
                                <span >ETH </span>
                                <span >{props.price_eth}</span>
                            </Col>
                            <Col className="d-flex gap-1 justify-content-end">
                                <span >$ </span>
                                <span >{props.price_usd.toFixed(2)}</span>
                            </Col>
                        </Col>

                        <Col xs={12} md={12} className="text-center mt-2">
                            {props.stock >= 1 ?
                                <Button variant="outline-dark" onClick={HandleClick} >
                                    Add To Card</Button>
                                :
                                <Button variant="outline-dark"  disabled>
                                unavailable </Button>

                        
                            }

                        </Col>
                    </Row>
                </Card.Body>
            </Card>

        </>
    )
}
export default ProductCard;