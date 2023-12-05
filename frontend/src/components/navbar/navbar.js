import React, { useState, useEffect } from 'react';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../../assets/logo.png';
import burger from '../../assets/burger.png';

// Import css
import '../navbar/navbar.css';

// Import components
import CreatePoll from '../createPoll/createPoll';
import Login from '../login/login';
import Register from '../register/register';
import Logout from '../logout/logout'; // Assuming you have a Logout component

function CollapsibleExample() {
  // Sticky navbar
  const [sticky, setSticky] = useState(false);

  // Open/close login/register/createpoll
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenLogin, setIsOpenLogin] = useState(false);
  const [isOpenRegister, setIsOpenRegister] = useState(false);
  const [user, setUser] = useState(null); // State to store user information

  useEffect(() => {
    // Check if user is logged in on component mount
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    const handleScroll = () => {
      setSticky(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    // Handle the logout action, e.g., clear localStorage and setUser(null)
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <nav className={`${sticky ? 'sticky' : ''}`}>
      <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">
            <img src={logo} alt="Testoasa" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav className="primary">


              {/* Login/Logout */}
              {user ? (
                <Nav.Link href="#">
                  <Logout user={user} onLogout={handleLogout} />
                </Nav.Link>
              ) : (
                <>
                  <Nav.Link href="#" style={{ color: '#04395E' }} onClick={() => setIsOpenLogin(true)}>
                    Login
                  </Nav.Link>
                  <Login open={isOpenLogin} onClose={() => setIsOpenLogin(false)}>
                    {' '}
                  </Login>
                </>
              )}

              {/* Register/Create Poll */}
              {user ? (
                <>
                    <Nav.Link href="#" style={{ color: '#04395E' }} onClick={() => setIsOpen(true)}>
                      Create Poll
                    </Nav.Link>
                    <CreatePoll open={isOpen} onClose={() => setIsOpen(false)}></CreatePoll>
                  </>
              ) : (
                <>
                  <Nav.Link href="#" style={{ color: '#04395E' }} onClick={() => setIsOpenLogin(true)}>
                    Register
                  </Nav.Link>
                  <Register open={isOpenRegister} onClose={() => setIsOpenRegister(false)}></Register>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </nav>
  );
}

export default CollapsibleExample;
