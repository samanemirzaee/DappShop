import React from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import Footer from "./Footer";
import Navbarcomponent from "./Navbar";

const Layout = (props) => {
    return (
        <>
            <Navbarcomponent />
            
                {props.children}
            
            <Footer />
        </>
    )
}

export default Layout;