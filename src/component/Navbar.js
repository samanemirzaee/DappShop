import React, { useContext } from "react";
import { Navbar, Container, Nav, Button, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import Connect from "./Connect";
import { Web3Context } from "./context";

const Navbarcomponent = () => {
    const { web3States, setWeb3State } = useContext(Web3Context)

    return (
        <Navbar bg="light" variant="light">
            <Container>

                <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                <Nav className="me-auto">
                    <Link className="nav-link" to="/">Home</Link>
                    <Link className="nav-link" to="/product">Products</Link>
                    <Link className="nav-link" to="/Aboutus">About Us</Link>
                    {web3States.isOwner ?
                        <NavDropdown title="Admin" id="basic-nav-dropdown">
                            <Link className="nav-link" to="/AddProduct">Add Product</Link>
                        </NavDropdown>

                        :
                        null
                    }

                </Nav>
                <Nav>
                    <Nav.Link href="#home">
                        <Button variant="outline-dark"><i class="fa-solid fa-cart-arrow-down"></i> Cart <span class="badge bg-dark text-white ms-1 rounded-pill">0</span></Button>
                    </Nav.Link>
                    <Nav.Link>
                        <Connect />
                    </Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default Navbarcomponent;