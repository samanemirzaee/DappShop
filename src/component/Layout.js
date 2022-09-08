import React from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import Footer from "./Footer";
import Navbarcomponent from "./Navbar";


const Layout = (props) => {
    return (
        <div className="d-flex flex-column " >
            <div>
            <Navbarcomponent />

            </div>
            <div className="mb-5">
                {props.children}

            </div>
            <div className="mt-5">
            <Footer />

            </div>
        </div>
    )
}

export default Layout;