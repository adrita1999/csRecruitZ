import React, {Component} from "react";
import './Personal.css';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import {Container} from "react-bootstrap";
class Navb extends Component {

    render() {
        return (
            <Navbar  expand="lg" sticky="top" style={{
                height:80,
                background:"#F1FFE8",
                boxShadow:"0px 0px 5px 1px #93BF7A"
            }}>
  <Container>
    <Navbar.Brand href="/" className="navBrand" style={{
        marginLeft:-55,
        fontSize:38,
        fontWeight:"bold",
        color:"#410390"
    }}>csRecruitZ</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
    <Nav  style={{
        marginLeft:735,
        marginRight:-120
    }}>
        <Nav.Link href="/" style={{
                 color:"#410390",
                 marginRight:8

        }} className="navHover">Home</Nav.Link>
        <Nav.Link href="/dashboard" style={{
                 color:"#410390",
                 marginRight:8

        }} className="navHover">Dashboard</Nav.Link>
        <Nav.Link href="/" style={{
                 color:"#410390",
                 marginRight:8

        }} className="navHover">Notifications</Nav.Link>
        <Nav.Link href="/" style={{
                 color:"#410390",
                 marginRight:8

        }} className="navHover">Contact Us</Nav.Link>
        <Nav.Link href="/" style={{
                 color:"#410390",
                 marginRight:8

        }} className="navHover">Sign Out</Nav.Link>

      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
        )
    }
}

export default Navb;