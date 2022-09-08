import React, { useContext, useEffect, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import axios from 'axios'
import ProductCard from "./ProductCard";
import { Web3Context } from "../context";

const Products = () => {
    const { web3States, setWeb3State } = useContext(Web3Context)

    const [productList, setProductList] = useState([])
    const [coin, setCoin] = useState({})


    useEffect(() => {
        console.log('1')

        axios.get('https://sourcearena.ir/api/?token=bdf23cbb69b1af9b65c84db150fd302c&crypto_v2=eth')
        .then((res) => setCoin(res.data))
        .catch(err => console.log(err))

        if (web3States.contract) {
            web3States.contract.methods.productList().call({ from: web3States.account }).then(res => {
                setProductList(res)
            })
        }
    }, [web3States.contract])

    return (

        <Container className="w-100 h-100 mb-5">
            <Row>
                {productList.length > 0 ?
                    productList.filter(x => x['title']).map((item, i) => {
                        return (
                            <Col className="mt-3 mb-3 d-flex gap-2" key={i} >
                                <ProductCard
                                    id={item['id']}
                                    title={item['title']}
                                    description={item['description']}
                                    image={item['image']}
                                    stock={item['stock']}
                                    price_eth={web3States.web3.utils.fromWei(item['price'], 'ether')}
                                    price_usd={(web3States.web3.utils.fromWei(item['price'], 'ether')) * coin.price}
                                />
                            </Col>
                        )
                    }
                    )

                    :
                    <Col className="text-center mt-2">
                        <i className="fa fa-spin fa-spinner fa-3x"></i>
                    </Col>
                }
            </Row>
        </Container>
    )
}

export default Products;