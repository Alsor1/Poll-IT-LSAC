import React, {useState} from 'react'

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../../assets/logo.png'

//import css
import '../navbar/navbar.css'

// Import components
import CreatePoll from "../createPoll/createPoll";
import Login from "../login/login"
import Register from "../register/register"

function CollapsibleExample() {
  const [isOpen, setIsOpen]= useState(false);
  const [isOpenLogin, setIsOpenLogin] = useState(false);

  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">
          <img src={logo} alt="Testoasa" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            
          </Nav>
          <Nav className="primary">

           {/* Create Poll button */}
          <Nav.Link href="#" style={{color:"#04395E"}} onClick={() => setIsOpen(true)}>
              Create Poll
          </Nav.Link>
          <CreatePoll open={isOpen} onClose={() => setIsOpen(false)}></CreatePoll>

          {/* Login */}
            <Nav.Link href="#" style={{color:"#04395E"}} onClick={() => setIsOpenLogin(true)}>Login</Nav.Link>
            <Login/>

            {/* Register */}
            <Nav.Link eventKey={2} href="#" style={{color:"#04395E"}}>
              Register
            </Nav.Link>
            <Register />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CollapsibleExample;