import React, { useState, useContext } from "react";
import { Button, Col, Container, Row, Alert, InputGroup, Form } from "react-bootstrap";
import { Web3Context } from "../context";
import Products from "../product";

export const AddProducts = () => {
    const { web3States, setWeb3State } = useContext(Web3Context)

    let [title, setTitle] = useState();
    let [price, setPrice] = useState();
    let [stock, setStock] = useState();
    let [image, setImage] = useState();
    let [description, setDescription] = useState();


    const submitForm = () => {

        web3States.contract.methods.addProduct(title, web3States.web3.utils.toWei(price.toString(), 'ether'), stock, image, description).send({ from: web3States.account }).then(res => {
            document.getElementById("message").classList.remove("d-none")
            document.getElementById("Title").value=""
            document.getElementById("Price").value=""
            document.getElementById("Stock").value=""
            document.getElementById("Image").value=""
            document.getElementById("Description").value=""
        })
    }

    return (
        <>
            {web3States.isOwner ?
                <Container className="w-100 h-100">

                    <Row className='justify-content-center '>
                        <Col className='mt-4' md={8}>
                            <Row>
                                <Col xs={12}>
                                    <h3>
                                        Add Product
                                    </h3>
                                </Col>
                                <Col xs={12} md={6} className="mt-4">
                                    <input id='Title' className='form-control' name='Title' value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Title' />
                                </Col>
                                <Col xs={12} md={6} className="mt-4">
                                    <InputGroup >
                                        <InputGroup.Text id="basic-addon2">ETH</InputGroup.Text>
                                        <Form.Control type="number" id="Price" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" />
                                    </InputGroup>
                                </Col>
                                <Col xs={12} md={6} className="mt-4">
                                    <input className='form-control' id="Stock" type="number" name="Stock" value={stock} onChange={(e) => setStock(e.target.value)} placeholder='Stock' />
                                </Col>
                                <Col xs={12} md={6} className="mt-4">
                                    <InputGroup >
                                        <InputGroup.Text id="basic-addon2">URL</InputGroup.Text>
                                        <Form.Control type="txet" id="Image" value={image} onChange={(e) => setImage(e.target.value)} placeholder='Image' />
                                    </InputGroup>
                                </Col>
                                <Col xs={12} className="mt-4">
                                    <textarea className='form-control' type="text" id="Description" name="Description" 
                                    value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Description' />
                                </Col>
                                <Col className='text-center mt-4'>
                                    <Button onClick={submitForm} variant='outline-dark'>
                                        Add Product
                                    </Button>
                                </Col>
                                <Col xs={12} id="message" className='d-none mt-4'>
                                    <Alert variant="success">
                                        <p>Add {title} has been successful.</p>
                                    </Alert>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>

                :<Products/>}
        </>
    )
}

export default AddProducts;