import React,{useState,useContext} from "react";
import { Button, Col, Container, Row, Alert } from "react-bootstrap";
import { Web3Context } from "../context";

export const AddProducts = () => {
    const { web3States, setWeb3State } = useContext(Web3Context)

    let [title,setTitle]=useState();
    let [price,setPrice]=useState();
    let [stock,setStock]=useState();
    let [image,setImage]=useState();
    let [description,setDescription]=useState();


    const submitForm=()=>{
        
        // web3States.contractCon.methods.addProduct(title,web3States.web3.utils.toWei(price.toString(), 'ether'), stock,image,description).send({ from: web3States.accountCon }).then(res => {
         web3States.contract.methods.addProduct(title,web3States.web3.utils.toWei(price.toString(), 'ether'),stock,image,description).send({ from: web3States.account }).then(res => {
            console.log('success')
            document.getElementById("message").classList.remove("d-none")
        })
    }

    return (
        <Container>

            <Row className='justify-content-center'>
                <Col className='mt-4' md={8}>
                    <Row>
                        <Col xs={12}>
                        <h3>
                        Add Product 
                        </h3>
                        </Col>
                        <Col xs={12} md={6} className="mt-2">
                            <input className='form-control' name='Title' value={title} onChange={(e)=>setTitle(e.target.value)} placeholder='Title' />
                        </Col>
                        <Col xs={12} md={6} className="mt-2">
                            <input className='form-control' type="number" name="Price" value={price} onChange={(e)=>setPrice(e.target.value)} placeholder='Price' />
                        </Col>
                        <Col xs={12} md={6} className="mt-2">
                            <input className='form-control' type="number" name="Stock" value={stock} onChange={(e)=>setStock(e.target.value)} placeholder='Stock' />
                        </Col>
                        <Col xs={12} md={6} className="mt-2">
                            <input className='form-control' type="text" name="Image" value={image} onChange={(e)=>setImage(e.target.value)} placeholder='Image' />
                        </Col>
                        <Col xs={12} className="mt-2">
                            <textarea className='form-control' type="text" name="Description" value={description} onChange={(e)=>setDescription(e.target.value)} placeholder='Description' />
                        </Col>
                        <Col className='text-center mt-4'>
                            <Button onClick={submitForm} variant='outline-dark'>
                                Submit
                            </Button>
                        </Col>
                        <Col xs={12} id="message" className='d-none mt-3'>
                        <Alert variant="success">
                            <p>Add {title} has been successful.</p>
                            </Alert>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}

export default AddProducts;