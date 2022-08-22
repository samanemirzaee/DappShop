import React, { useContext, useEffect, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import ProductCard from "./ProductCard";
import { Web3Context } from "../context";


const Products = () => {
    const { web3States, setWeb3State } = useContext(Web3Context)
    const [productList, setProductList] = useState([])


    useEffect(() => {
        console.log('1')
        if (web3States.contract) {
            // if (web3States.contractCon) {
            console.log('2')
            // web3States.contractCon.methods.productList().call({ from: web3States.accountCon }).then(res => {
            web3States.contract.methods.productList().call({ from: web3States.account }).then(res => {

                setProductList(res)
                console.log(res)
            })
        }
        return () => {

        }
    }, [web3States.contract])
    // }, [web3States.contractCon])

    return (

        <Container>
            <Row>
                {productList.length > 0 ?

                    productList.filter(x => x['title']).map((item, i) =>
                        <Col  className="mt-3 mb-3" >
                            <ProductCard title={item['title']} description={item['description']} image={item['image']} />
                        </Col>
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