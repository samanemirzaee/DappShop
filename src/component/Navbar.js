import React, { useContext, useState } from "react";
import { Navbar, Container, Nav, Button, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import Connect from "./Connect";
import { Web3Context } from "./context";
import { ListOrder } from "./contextTwo";
import './Navbar.css';

const Navbarcomponent = () => {
    const { web3States, setWeb3State } = useContext(Web3Context)
    let { myListOrder, setmyListOrder } = useContext(ListOrder)

    const [show, setShow] = useState(false);
    const showDropdown = (e) => {
        setShow(!show);
    }
    const hideDropdown = e => {
        setShow(false);
    }

    return (
        <Navbar bg="light" variant="light">
            <Container>

                <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                <Nav className="me-auto">
                    <Link className="nav-link" to="/">Home</Link>
                    <Link className="nav-link" to="/product">Products</Link>
                    {web3States.account ? 
                        < Link className="nav-link" to="/MyOrders">MyOrder</Link>
                    :null}
                <Link className="nav-link" to="/Aboutus">About Us</Link>
                {web3States.isOwner ?
                    <NavDropdown title="Admin" id="basic-nav-dropdown"
                        show={show}
                        onMouseEnter={showDropdown}
                        onMouseLeave={hideDropdown}>
                        <Link className="nav-link class-color" to="/AddProduct">Add Product</Link>
                        <Link className="nav-link class-color" to="/EditDeleteProduct">Edit\Delete Product</Link>
                        <Link className="nav-link class-color" to='/ListOfOrders'>Listo of orders</Link>

                    </NavDropdown>

                    :
                    null

                }

            </Nav>
            <Nav>
                <Nav.Link>
                    <Link to="/OrderListOfProducts">
                        <Button variant="outline-dark"><i className="fa-solid fa-cart-arrow-down"></i> Cart <span className="badge bg-dark text-white ms-1 rounded-pill">
                            {myListOrder.reduce((sum, current) => sum + current.productCount, 0)}
                        </span></Button>
                    </Link>
                </Nav.Link>
                <Nav.Link>
                    <Connect />
                </Nav.Link>
            </Nav>
        </Container>
        </Navbar >
    )
}

export default Navbarcomponent;