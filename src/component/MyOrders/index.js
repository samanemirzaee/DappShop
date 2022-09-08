import React, { useContext, useEffect, useState } from "react";
import { Button, Table, Modal, InputGroup, Form, Col, Toast, ToastContainer } from "react-bootstrap";
import axios from 'axios'
import { Web3Context } from "../context";

const MyOrders = () => {
    const { web3States, setWeb3State } = useContext(Web3Context)
    const [myOrderList, setMyOrderList] = useState([])
    const [coin, setCoin] = useState({})
    let date


    useEffect(() => {
        axios.get('https://sourcearena.ir/api/?token=bdf23cbb69b1af9b65c84db150fd302c&crypto_v2=eth')
            .then((res) => setCoin(res.data))
            .catch(err => console.log(err))

        if (web3States.account) {
            web3States.contract.methods.myOrders().call({ from: web3States.account }).then(res => {
                setMyOrderList(res)
            })
        }
    }, [web3States.account])
    return (
        <div className='container w-100 h-100'>
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
                        </tr>
                    </thead>
                    <tbody >

                        {myOrderList.filter(x => x.user !== "0x0000000000000000000000000000000000000000")
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
                                        {/* <td >
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
                                                </td> */}
                                    </tr>
                                );
                            })}

                    </tbody>
                </Table>
            }


        </div>
    )
}
export default MyOrders