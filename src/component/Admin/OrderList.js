import React, { useContext, useEffect, useState } from "react";
import { Button, Table, Modal, InputGroup, Form, Col, Toast, ToastContainer } from "react-bootstrap";
import { Web3Context } from "../context";
import axios from 'axios'
import Products from "../product";


const OrderListAdmin = () => {
    const { web3States, setWeb3State } = useContext(Web3Context)
    const [productList, setProductList] = useState([])
    const [orderList, setorderList] = useState([])
    const [coin, setCoin] = useState({})
    const [show, setShow] = useState(false);
    const [showOne, setShowOne] = useState(false);
    const [showTwo, setShowTwo] = useState(false);
    const [message, setMessage] = useState("");
    const [myStatus, setMyStatus] = useState([])


    let [MyListProducts, setMyListProducts] = useState([])
    let [orderId, setOrderId] = useState()
    let [orderUser, setOrderUser] = useState()
    let [orderDate, setOrderDate] = useState()
    let [orderAmount, setOrderAmount] = useState()
    let [orderStatus, setOrderStatus] = useState()
    let date
    let pr = []

    function showOrderList(){
        web3States.contract.methods.orderList().call({ from: web3States.account }).then(res => {
            setorderList(res)
        })
    }
    useEffect(() => {
        axios.get('https://sourcearena.ir/api/?token=bdf23cbb69b1af9b65c84db150fd302c&crypto_v2=eth')
            .then((res) => setCoin(res.data))
            .catch(err => console.log(err))

        if (web3States.contract) {
            showOrderList()
            web3States.contract.methods.productList().call({ from: web3States.account }).then(res => {
                setProductList(res)
            })
        }
    }, [])
    const handleClose = () => {
        setShow(false);
        setMyListProducts([])
        setMyStatus()
    }

    const handleShow = (id, user, date, amount, status, productsID, productsCount) => {
        setShow(true);
        setOrderId(id)
        setOrderUser(user)
        setOrderDate(date)
        setOrderAmount(amount)
        setOrderStatus(status)
        for (let index = 0; index < productsID.length; index++) {
            const OneProduct = productList.filter(item => item.id === productsID[index])
            pr.push({
                productId: OneProduct[0].id,
                productTitle: OneProduct[0].title,
                productImage: OneProduct[0].image,
                productPriceETH: web3States.web3.utils.fromWei(OneProduct[0].price, 'ether'),
                productCount: productsCount[index]
            })
        }
        setMyListProducts(pr)
        console.log(pr.length)
    }
    const handleChangeStatus = (e) => {
        setMyStatus(e.target.value);
    }
    function ChangeOrder() {
        if (web3States.isOwner) {
            console.log("one")
            if (myStatus && myStatus !== orderStatus) {
                console.log("two")
                web3States.contract.methods.editOrderStatus(orderId, myStatus).send({ from: web3States.account }).then(res => {
                    setMessage("Changes saved")
                    showOrderList()
                    setShowTwo(true)
                    document.getElementById("id_Modal").style.onHide = handleClose()
                }).catch(err => {
                    console.log(err)
                })

            } else {
                console.log("tree")
                setMessage("Change the status")
                setShowOne(true)
                document.getElementById("id_Modal").style.onHide = handleClose()
            }
        } else {
            console.log("for")
            setMessage("Only admin is allowed")
            setShowOne(true)
            document.getElementById("id_Modal").style.onHide = handleClose()
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
                    <Modal id="id_Modal" show={show} onHide={handleClose}>
                        <Modal.Header className="bg-primary p-3 text-white" closeButton >
                            <Modal.Title>Product</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>

                            <Form>
                                <Form.Group className="mb-4" controlId="exampleForm.ControlInput1">
                                    <Form.Label >Address Wallet : {orderUser}</Form.Label>
                                    <hr className='w-100 mx-auto mt-1' />
                                    <Form.Label>Date : {orderDate}</Form.Label>
                                    <hr className='w-100 mx-auto mt-1' />
                                    <Form.Label>Amount : ETH {orderAmount}</Form.Label>
                                    <hr className='w-100 mx-auto mt-1' />
                                    <Form.Label>Status : </Form.Label>
                                    {['waiting', 'delivery'].map((type, idx) => {

                                        return (
                                            <div key={idx} className="mb-3">
                                                <Form.Check
                                                    type="radio"
                                                    id={`${type}`}
                                                    label={`${type}`}
                                                    value={`${type}`}
                                                    onChange={handleChangeStatus}
                                                    name="gender"
                                                    checked={orderStatus == type ? true : null}
                                                />
                                            </div>

                                        )
                                    })}

                                </Form.Group>
                                {

                                    <Table className='mt-4'>
                                        <thead >
                                            <tr className='bg-light'>
                                                <th ></th>
                                                <th>Title</th>
                                                <th>Image</th>
                                                <th>Price(ETH)</th>
                                                <th>Count</th>
                                            </tr>
                                        </thead>
                                        <tbody >

                                            {MyListProducts.map((prList, idx) => {
                                                return (
                                                    <tr key={idx} value={prList.id}>

                                                        <td>{idx + 1}</td>
                                                        <td style={{ height: '3rem', width: '3rem' }}>
                                                            <img className="w-100 h-100 " src={prList.productImage} />
                                                        </td>
                                                        <td>{prList.productTitle.substring(0, 15) + '...'}</td>
                                                        <td>{prList.productPriceETH}</td>
                                                        <td>{prList.productCount}</td>

                                                    </tr>
                                                );
                                            })}

                                        </tbody>
                                    </Table>
                                }
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={() => {
                                ChangeOrder();
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
                                    <th>Address Wallet</th>
                                    <th>Date</th>
                                    <th>Amount</th>
                                    <th>Status</th>
                                    <th>Edit/Delete</th>
                                </tr>
                            </thead>
                            <tbody >

                                {orderList.filter(x => x.user !== "0x0000000000000000000000000000000000000000")
                                    .map((prList, idx) => {
                                        date = new Date(parseInt(prList.date) * 1000)
                                        return (
                                            <tr key={idx} value={prList.id}>

                                                <td>{idx + 1}</td>
                                                <td >
                                                    {prList.user.substring(0, 5) + '...' + prList.user.slice(-5)}
                                                </td>
                                                <td >
                                                    {
                                                        date.toLocaleString()
                                                    }
                                                </td>
                                                <td>ETH {web3States.web3.utils.fromWei(prList.amount, 'ether')}
                                                    <br />
                                                    $ {(web3States.web3.utils.fromWei(prList.amount, 'ether') * coin.price).toFixed(2)}

                                                </td>
                                                <td>{prList.status}</td>
                                                <td >
                                                    <Button className="me-2 p-2" variant="outline-primary"
                                                        onClick={() => handleShow(
                                                            prList.id,
                                                            prList.user,
                                                            date.toLocaleString(),
                                                            web3States.web3.utils.fromWei(prList.amount, 'ether'),
                                                            prList.status,
                                                            prList.productsID,
                                                            prList.productsCount
                                                        )}
                                                    >

                                                        <i className="fa-solid fa-pencil"></i>
                                                    </Button>
                                                    <Button className=" p-2" variant="outline-danger"
                                                    // onClick={() => DeleteProduct(prList.id)}
                                                    ><i className="fa-solid fa-trash-can"></i></Button>
                                                </td>
                                            </tr>
                                        );
                                    })}

                            </tbody>
                        </Table>
                    }

                </div>
                :
                <Products />
            }
        </>

    )
}
export default OrderListAdmin