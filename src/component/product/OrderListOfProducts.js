import React, { useContext, useEffect, useState } from "react";
import { Button, Table, Modal, Alert, Form, Col, Toast, ToastContainer } from "react-bootstrap";
import axios from 'axios'
import { ListOrder } from "../contextTwo";
import { Web3Context } from "../context";

const OrderListOfProducts = () => {
    const { web3States, setWeb3State } = useContext(Web3Context)
    let { myListOrder, setmyListOrder } = useContext(ListOrder)

    const [productList, setProductList] = useState([])
    const [coin, setCoin] = useState({})
    const [show, setShow] = useState(false);
    const [showOne, setShowOne] = useState(false);
    const [showTwo, setShowTwo] = useState(false);
    const [message, setMessage] = useState("");
    const [messageErrorEmail, setMessageErrorEmail] = useState('')
    const [messageErrorFullName, setMessageErrorFullName] = useState('')
    const [messagePostAddress, setMessagePostAddress] = useState('')

    const [ListProductId, setListProductId] = useState([])
    const [ListProductCount, setListProductCount] = useState([])
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [postAddress, setPostAddress] = useState('')
    const [count, setCount] = useState(1)
    const EmailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/


    function HandleMinus(id) {
        const oneProduct = (myListOrder.filter(p => p.productId == id && p.productCount == 1))
        const otherCountProduct = (myListOrder.filter(p => p.productId == id && p.productCount > 1))
        if (oneProduct.length == 1) {
            setmyListOrder(myListOrder.filter(p => p.productId != id))
        } else if (otherCountProduct.length == 1) {
            setmyListOrder(myListOrder.map(p => {
                if (p.productId == id) { p.productCount -= 1 }
                return p
            }))
        }
    }

    function HandlePlus(id) {
        setmyListOrder(myListOrder.map(p => {
            if (p.productId == id) { p.productCount += 1 }
            return p
        }))
    }

    const handleShow = () => {
        setShow(true);
    }
    const handleClose = () => {
        setShow(false);
        setMessageErrorFullName('')
        document.getElementById('id-FullName').style.borderColor = 'rgb(206,212,218)'
        setMessageErrorEmail('')
        document.getElementById('id-email').style.borderColor = 'rgb(206,212,218)'
        setMessagePostAddress('')
        document.getElementById('id-PostAddress').style.borderColor = 'rgb(206,212,218)'
    }
    useEffect(() => {
        if (web3States.contract) {
            web3States.contract.methods.productList().call({ from: web3States.account }).then(res => {

                setProductList(res)
                console.log(res)
            })
        }

    }, [])

    useEffect(() => {
        setListProductId(myListOrder.map(p => { return (p.productId) }))
        setListProductCount(myListOrder.map(p => { return p.productCount }))

    }, [myListOrder])


    function SaveOrder() {
        let sum = 0;
        productList.map(prlist => {
            myListOrder.map(item => {
                if (prlist.id == item.productId) { sum += prlist.price * item.productCount }
            })
        })
        if (ListProductId.length && ListProductCount.length
            && web3States.account) {

            if ((EmailRegex.test(email)) && (email !== '') &&
            fullName !== '' && postAddress !== '') {
                document.getElementById("id-message").style.display="none"
                web3States.contract.methods.addOrder(
                    ListProductId, ListProductCount, fullName, email, postAddress
                ).send({
                    from: web3States.account,
                    value: sum
                }).then(res => {
                    setMessage("Order saved")
                    setShowTwo(true)
                    setmyListOrder([])
                    document.getElementById("id_modal").style.onHide = handleClose()
                }).catch(err => {
                    setMessage("Insufficient funds.")
                    setShowOne(true)
                    document.getElementById("id_modal").style.onHide = handleClose()
                })
            } else {
                document.getElementById("id-message").classList.remove("d-none")
            }
        } else {
            setMessage("First connect to your wallet")
            setShowOne(true)
            document.getElementById("id_modal").style.onHide = handleClose()
        }

    }
    function HandleEmail() {
        if (!(EmailRegex.test(email)) && (email !== '')) {
            setMessageErrorEmail('The email is incorrect')
            //استفاده کرد value به صورت زیر می توان از 
            // console.log(document.getElementById('id-input').value)
            document.getElementById('id-email').style.borderColor = 'rgb(230,112,123)'
        } else if (email === '') {
            setMessageErrorEmail('Please enter email.')
            document.getElementById('id-email').style.borderColor = 'rgb(230,112,123)'
        } else {
            setMessageErrorEmail('')
            document.getElementById('id-email').style.borderColor = 'rgb(206,212,218)'
        }
    }

    function HandleFullName() {
        if (fullName === '') {
            setMessageErrorFullName('Please enter full name.')
            document.getElementById('id-FullName').style.borderColor = 'rgb(230,112,123)'
        } else {
            setMessageErrorFullName('')
            document.getElementById('id-FullName').style.borderColor = 'rgb(206,212,218)'
        }
    }

    function HandlePostAddress() {
        if (postAddress === '') {
            setMessagePostAddress('Please enter post address.')
            document.getElementById('id-PostAddress').style.borderColor = 'rgb(230,112,123)'
        } else {
            setMessagePostAddress('')
            document.getElementById('id-PostAddress').style.borderColor = 'rgb(206,212,218)'
        }
    }

    return (
        <div className="container w-100 h-100">
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
                    <Modal.Title>Information</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Col xs={12} id="id-message" className='d-none mt-4'>
                        <Alert variant="danger">
                            <p>Please fill in the fields</p>
                        </Alert>
                    </Col>
                    <Form>
                        <Form.Group className="mb-4" >
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control
                                id="id-FullName"
                                type="text"
                                value={fullName}
                                onBlur={HandleFullName}
                                onChange={(e) => setFullName(e.target.value)} />
                            <small className="text-danger fs-6">{messageErrorFullName}</small>

                        </Form.Group>
                        <Form.Group className="mb-4" >
                            <Form.Label >Email</Form.Label>
                            <Form.Control id="id-email" type="text" onBlur={HandleEmail}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} />
                            <small className="text-danger fs-6">{messageErrorEmail}</small>
                        </Form.Group>
                        <Form.Group
                            className="mb-4"
                        >
                            <Form.Label>Post Address</Form.Label>
                            <Form.Control as="textarea" rows={2}
                                id="id-PostAddress"
                                onBlur={HandlePostAddress}
                                value={postAddress}
                                onChange={(e) => setPostAddress(e.target.value)}
                                style={{ resize: "none" }} />
                            <small className="text-danger fs-6">{messagePostAddress}</small>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button id="id-btn-saveOrder" variant="primary" onClick={() => {
                        SaveOrder()
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
                            <th>Price</th>
                            <th>ProductCount</th>
                        </tr>
                    </thead>
                    <tbody >

                        {myListOrder.filter(x => x['productTitle']).map((prList, idx) => {
                            return (
                                <tr key={idx} value={prList.id}>
                                    {/* <EditProducts showComponent={showComponent}
                                     setShowComponent={setShowComponent}/> */}

                                    <td>{idx + 1}</td>
                                    <td style={{ height: '4rem', width: '4rem' }}>
                                        <img className="w-100 h-100 " src={prList.productImage} />
                                    </td>
                                    <td>{prList.productTitle.substring(0, 20) + '...'}</td>
                                    <td>Eth {(prList.productPriceETH * prList.productCount).toFixed(3)}
                                        <br />
                                        $ {(prList.productPriceUSD * prList.productCount).toFixed(2)}
                                    </td>
                                    <td>
                                        <button type="button" className="btn btn-outline-secondary  p-1"
                                            onClick={() => HandleMinus(prList.productId)}
                                        >
                                            <i className="fa-solid fa-minus"></i></button>
                                        <span className="mx-1 fs-6"> {prList.productCount}</span>
                                        <button type="button" className="btn btn-outline-danger ms-1 p-1"
                                            onClick={() => HandlePlus(prList.productId)}
                                        >
                                            <i className="fa-solid fa-plus"></i></button>

                                    </td>
                                </tr>
                            );
                        })}
                        {myListOrder.length ?
                            <tr>
                                <td colSpan={3}></td>
                                <td>
                                    <span >Eth {myListOrder.reduce((sum, current) => sum + ((current.productPriceETH) * (current.productCount)), 0).toFixed(3)}</span>
                                    <br />
                                    <span >$ {myListOrder.reduce((sum, current) => sum + ((current.productPriceUSD) * (current.productCount)), 0).toFixed(3)}</span>
                                </td>
                                <td>
                                    <button type="button" className="btn btn-outline-success"
                                        onClick={handleShow}>Final payment</button>
                                </td>
                            </tr>

                            :
                            ""}

                    </tbody>
                </Table>

            }

        </div>
    )
}

export default OrderListOfProducts;