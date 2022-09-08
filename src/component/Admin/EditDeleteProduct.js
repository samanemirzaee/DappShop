import React, { useContext, useEffect, useState } from "react";
import { Button, Table, Modal, InputGroup, Form, Col, Toast, ToastContainer } from "react-bootstrap";
import { Web3Context } from "../context";
import axios from 'axios'
import Products from "../product";


const EditDeleteProduct = () => {
    const { web3States, setWeb3State } = useContext(Web3Context)
    const [productList, setProductList] = useState([])
    const [coin, setCoin] = useState({})
    const [show, setShow] = useState(false);
    const [showOne, setShowOne] = useState(false);
    const [showTwo, setShowTwo] = useState(false);
    const [message, setMessage] = useState("");

    // const [showComponent, setShowComponent] = useState(false);
    let [productId, setProductId] = useState()
    let [productTitle, setProductTitle] = useState()
    let [productPrice, setProductPrice] = useState()
    let [productStock, setProductStock] = useState()
    let [productImage, setProductImage] = useState()
    let [productDescription, setProductDescription] = useState()
    const [count,setCount]=useState(1)


    function showProductList(){
        if (web3States.contract) {
            web3States.contract.methods.productList().call({ from: web3States.account }).then(res => {

                setProductList(res)
            })
        }
    }

    useEffect(() => {

        axios.get('https://sourcearena.ir/api/?token=bdf23cbb69b1af9b65c84db150fd302c&crypto_v2=eth')
            .then((res) => setCoin(res.data))
            .catch(err => console.log(err))

        showProductList()

    }, [])


    const handleClose = () => {
        setShow(false);
    }

    const handleShow = (id, title, price, stock, image, description) => {
        setShow(true);
        // setShowComponent(true)
        setProductId(id)
        setProductTitle(title)
        setProductPrice(price)
        setProductStock(stock)
        setProductImage(image)
        setProductDescription(description)
    }

    function ChangeProduct() {
        if (web3States.account) {
            web3States.contract.methods.editProduct(productId, productTitle,
                web3States.web3.utils.toWei(productPrice.toString(), 'ether')
                , productStock,
                productImage, productDescription).send({ from: web3States.account }).then(res => {
                    console.log(res)
                    setMessage("Changes saved")
                    showProductList()
                    setShowTwo(true)
                    document.getElementById("id_modal").style.onHide = handleClose()
                }).catch(err => {
                    console.log(err)
                    setMessage("Only admin is allowed")
                    setShowOne(true)
                    document.getElementById("id_modal").style.onHide = handleClose()
                })
        } else {
            setMessage("First connect to your wallet")
            setShowOne(true)
            document.getElementById("id_modal").style.onHide = handleClose()
        }
    }

    function DeleteProduct(id){
        if (web3States.account) {
            web3States.contract.methods.deleteProduct(id).send({ from: web3States.account }).then(res => {
                    console.log(res)
                    setMessage("The product has been removed")
                    setShowTwo(true)
                    showProductList()
                }).catch(err => {
                    console.log(err)
                    setMessage("Only admin is allowed")
                    setShowOne(true)
                })
        } else {
            setMessage("First connect to your wallet")
            setShowOne(true)
        }


    }
    return (
        <>
                    {web3States.isOwner ?
                            <div className='container w-100 h-100'>
                            {/* message */}
                            <Col xs={6}>
                                <ToastContainer className="p-3" position="top-center">
                                    <Toast onClose={() => setShowOne(false)}
                                        show={showOne} delay={5000} autohide>
                                        <Toast.Header className="text-white bg-danger">
                                            <strong className="me-auto">Error</strong>
                                        </Toast.Header>
                                        <Toast.Body className="bg-light">{message}</Toast.Body>
                                    </Toast>
                                </ToastContainer>
                            </Col>
                            <Col xs={6}>
                                <ToastContainer className="p-3" position="top-center">
                                    <Toast onClose={() => setShowTwo(false)}
                                        show={showTwo} delay={5000} autohide>
                                        <Toast.Header className="text-white bg-success">
                                            <strong className="me-auto">Message</strong>
                                        </Toast.Header>
                                        <Toast.Body className="bg-light">{message}</Toast.Body>
                                    </Toast>
                                </ToastContainer>
                            </Col>
                
                
                
                            {/* Modal */}
                            <Modal id="id_modal" show={show} onHide={handleClose}>
                                <Modal.Header className="bg-primary p-3 text-white" closeButton >
                                    <Modal.Title>Product</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                
                                    <Form>
                                        <Form.Group className="mb-4" controlId="exampleForm.ControlInput1">
                                            <Form.Label>Title</Form.Label>
                                            <Form.Control
                                                type="text"
                                                value={productTitle} onChange={(e) => setProductTitle(e.target.value)} />
                                        </Form.Group>
                                        <Form.Group className="mb-4" controlId="exampleForm.ControlInput1">
                                            <Form.Label>Price</Form.Label>
                                            <InputGroup >
                                                <InputGroup.Text id="basic-addon2">ETH</InputGroup.Text>
                                                <Form.Control type="number" value={productPrice}
                                                    onChange={(e) => setProductPrice(e.target.value)} />
                                            </InputGroup>
                                        </Form.Group>
                                        <Form.Group className="mb-4" controlId="exampleForm.ControlInput1">
                                            <Form.Label>Stock</Form.Label>
                                            <Form.Control
                                                type="number"
                                                value={productStock}
                                                onChange={(e) => setProductStock(e.target.value)} />
                                        </Form.Group>
                                        <Form.Group className="mb-4" controlId="exampleForm.ControlInput1">
                                            <Col className="d-flex gap-2 mb-1" style={{ height: '3.5rem', width: '3.5rem' }}>
                                                <Form.Label>Image</Form.Label>
                                                <img className="w-100 h-100 " src={productImage} />
                                            </Col>
                                            <InputGroup >
                                                <InputGroup.Text id="basic-addon2">URL</InputGroup.Text>
                                                <Form.Control type="text" value={productImage}
                                                    onChange={(e) => setProductImage(e.target.value)} />
                                            </InputGroup>
                                        </Form.Group>
                                        <Form.Group
                                            className="mb-4"
                                            controlId="exampleForm.ControlTextarea1">
                                            <Form.Label>Description</Form.Label>
                                            <Form.Control as="textarea" rows={3}
                                                value={productDescription}
                                                onChange={(e) => setProductDescription(e.target.value)} 
                                                style={{resize: "none"}}/>
                                        </Form.Group>
                                    </Form>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClose}>
                                        Close
                                    </Button>
                                    <Button variant="primary" onClick={() => {
                                        ChangeProduct();
                                    }}>
                                        Save Changes
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                
                            {/* Table */}
                            {
                                <Table className='mt-4'>
                                    <thead >
                                        <tr className='bg-light'>
                                            <th ></th>
                                            <th>Image</th>
                                            <th>Title</th>
                                            <th>Price(ETH)</th>
                                            <th>stock</th>
                                            <th>Description</th>
                                            <th>Edit/Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody >
                
                                        {productList.filter(x => x['title']).map((prList, idx) => {
                                            return ( 
                                                <tr key={idx} value={prList.id}>
                                                    <td>{idx+1}</td>
                                                    <td style={{ height: '4rem', width: '4rem' }}>
                                                        <img className="w-100 h-100 " src={prList.image} />
                                                    </td>
                                                    <td>{prList.title.substring(0, 20) + '...'}</td>
                                                    <td>
                                                        Eth {web3States.web3.utils.fromWei(prList.price,'ether')}
                                                        <br />
                                                        $ {(web3States.web3.utils.fromWei(prList.price,'ether') * coin.price).toFixed(2)}
                                                    </td>
                                                    <td>{prList.stock}</td>
                                                    <td>{prList.description.substring(0, 30) + '...'}</td>
                                                    <td >
                                                        <Button className="me-2" variant="outline-primary"
                                                            onClick={() => handleShow(
                                                                prList.id,
                                                                prList.title,
                                                                web3States.web3.utils.fromWei(prList.price,'ether'),
                                                                prList.stock,
                                                                prList.image,
                                                                prList.description
                                                            )}>
                
                                                            <i class="fa-solid fa-pencil"></i></Button>
                                                        <Button variant="outline-danger" 
                                                            onClick={()=>DeleteProduct(prList.id)}
                                                        ><i class="fa-solid fa-trash-can"></i></Button>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                
                                    </tbody>
                                </Table>
                            }
                
                        </div>
                
                    :
                    <Products/>
                    }

        </>
    )
}

export default EditDeleteProduct;