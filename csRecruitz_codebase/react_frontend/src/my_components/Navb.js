import React, {Component} from "react";
import './Personal.css';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import {Container} from "react-bootstrap";
import SignInModal from './signinmodal';
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import Form from "react-bootstrap/Form";
import {ToggleButton, ToggleButtonGroup} from "@mui/material";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  backdrop:false,
  show:true,
    borderRadius:5,
    border:0
};


class Navb extends Component {
    state={
        signinopen:false,
        userORemp:"Jobseeker"
    }


    constructor(props) {
    super(props);

    this.handleClick=this.handleClick.bind(this);
    this.handleClickLogin=this.handleClickLogin.bind(this);
    this.handleClose=this.handleClose.bind(this);
    this.handleChangeUser=this.handleChangeUser.bind(this);
   }

    handleClick() {
        this.setState({signinopen: true})
        console.log(this.state.signinopen)
   }
   handleClickLogin() {

        console.log("login tipse")
   }

      handleClose() {
      this.setState({'signinopen':false})
      console.log(this.state.signinopen)
      }

      handleChangeUser(event) {
        console.log(event.target.value)
        this.setState({'userORemp':event.target.value})

      }

    render() {
        return (
            <React.Fragment>
                            <Navbar  expand="lg" sticky="top" style={{
                height:80,
                width:"100%",
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
        <Nav.Link style={{
                 color:"#410390",
                 marginRight:8

        }} className="navHover" onClick={this.handleClick}>Sign Out</Nav.Link>

      </Nav>
    </Navbar.Collapse>
  </Container>
             </Navbar>


        <div>
      <Modal
        open={true}
        onClose={this.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{background:"rgba(0,0,0,0)"}}
      >
        <Box sx={style}>
            <div style={{display:"inline",position:'absolute',width:'49%'}}>
                <Typography id="modal-modal-title" variant="h5" component="h2" style={{color:"#410390",fontWeight:"bold",paddingTop:'3px'}}>
                Log In
              </Typography>
            </div>
            <div style={{display:"inline",position:'absolute',width:'49%',left:'54%'}}>
                <ToggleButtonGroup
                  color="primary"
                  value={this.state.userORemp}
                  exclusive
                  onChange={this.handleChangeUser}
                   size="small"
                >
                  <ToggleButton value="Jobseeker">Jobseeker</ToggleButton>
                  <ToggleButton value="Employer">Employer</ToggleButton>
            </ToggleButtonGroup>
            </div>


            <Form style={{marginTop:'80px',marginBottom:'20px'}}>
                <InputLabel id="demo-simple-select-label" style={{fontSize:'14px'}}>E-mail</InputLabel>
                <input style={{width:'98%', padding:'7px',marginBottom:14,borderRadius:'5px',borderWidth:1}} type="text"  onChange={this.handlerkeyword}></input>

                <InputLabel id="demo-simple-select-label" style={{fontSize:'14px'}}>Password</InputLabel>
                <input style={{width:'98%', padding:'7px',marginBottom:14,borderRadius:'5px',borderWidth:1}} type="password"  onChange={this.handlerkeyword}></input>
            </Form>

            <div style={{display:"inline",position:'absolute',width:'49%'}}>
                    <a href=""><Typography id="modal-modal-description" sx={{ mt: 2,color:"#3C6DE5" }}>
            Forgot Password?
                    </Typography></a>
            </div>
            <div style={{display:"inline",position:'absolute',width:'49%',left:'47%'}}>
                <button className='btn btn-success' style={{marginTop:"6px",width:'45%'}} onClick={this.handleClickLogin}>Log In</button>
            </div>


            <div style={{marginTop:"80px"}}>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Do not have an account?
          </Typography>
            </div>

        </Box>
      </Modal>
    </div>

            </React.Fragment>

        )
    }
}

export default Navb;

// <div id="modal" className="signinmodal">
//            <h1>hi</h1>
//        </div>

        // BackdropProps={{ invisible: true }}