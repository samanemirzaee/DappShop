import React, { useState, useContext, useEffect } from "react";
import { Button, Modal } from 'react-bootstrap';
import Web3 from "web3";
import { Abi } from "./Abi";
import { Web3Context } from "./context";

const Connect = () => {
    const { web3States, setWeb3State } = useContext(Web3Context)
    const [account, setAccount] = useState();
    const [message, setMessage] = useState("");
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const connectToWallet = async () => {
        let web3, contract;
        if (typeof window.ethereum !== "undefined") {
            let accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
            web3 = new Web3(Web3.givenProvider);
            web3.eth.getChainId().then(res => {
                if (res == "97") {
                    setAccount(accounts[0])
                    contract = new web3.eth.Contract(Abi, "0x16Fccd1a9572CD8a42a9B349efa87eb9a276c212")

                    contract.methods.owner().call({ from: accounts[0] }).then(res => {
                        // setWeb3State({ web3Con: web3, contractCon: contract, accountCon: accounts[0], isOwner: (res??"").toLowerCase() == (accounts[0]??"").toLowerCase() })
                        setWeb3State({ web3: web3, contract: contract, account: accounts[0],isOwner:(res??"").toLowerCase()==(accounts[0]??"").toLowerCase() })
                   
                    })

                } else {
                    handleShow(true)
                    setMessage("Switch your network to Moonbase Alpha")
                }
            })
        } else {
            handleShow(true)
            setMessage("Metamask is not Installed")
        }
    }

    useEffect(() => {
        let web3, contract;
        web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545/');
        contract = new web3.eth.Contract(Abi, "0x16Fccd1a9572CD8a42a9B349efa87eb9a276c212")
        // setWeb3State({ web3Con: web3, contractCon: contract, accountCon: null, isOwner: false })
       setWeb3State({ web3: web3, contract: contract, account: null, isOwner: false })

    }
        , [])

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header className="bg-danger text-white" closeButton>
                    <Modal.Title>Error</Modal.Title>
                </Modal.Header>
                <Modal.Body>{message}</Modal.Body>
                <Modal.Footer className='justify-content-center'>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            <Button onClick={connectToWallet} value="success">
                {account ? (account.substring(0, 4) + '...' + account.slice(-4)) : 'Connect'}
            </Button>
        </>
    )
}

export default Connect;