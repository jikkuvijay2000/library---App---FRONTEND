import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Logo from '../../src/assets/Logo.jpg';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useCookies } from 'react-cookie';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../contextAPI/Headers';

function Header() {
  const { username, role, logout } = useContext(UserContext);
  const [cookies, setCookies] = useCookies(['access_token']);
  const navigate = useNavigate();

  const handleLogout = () => {
    window.localStorage.removeItem('access_token');
    logout();
    navigate('/');
  };

  return (
    <div>
      {cookies.access_token && username && role && (
        <Navbar expand="lg" bg="white" variant="light" className='fixed-top'>
          <Container>
            <Navbar.Brand href="#home">
              <img
                src={Logo}
                width="50"
                height="50"
                className="d-inline-block align-top"
                alt="React Bootstrap logo"
              />
            </Navbar.Brand>
            <Navbar.Brand>
              <b className="text-primary me-auto">Book<span className="text-warning">Holic</span></b>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto ms-3">
                <Nav.Link><Link style={{textDecoration:'none'}} className='btn' to={'/home'}>Home</Link></Nav.Link>
                <Nav.Link><Link style={{textDecoration:'none'}} className='btn' to={'/allbooks'}>Books Collection </Link></Nav.Link>
                <Nav.Link><Link style={{textDecoration:'none'}} className='btn' to={'/uploadbooks'}>Upload Books</Link></Nav.Link>
                <Nav.Link><Link style={{textDecoration:'none'}} className='btn' to={'/library'}>Library</Link></Nav.Link>
              </Nav>
              <Nav>
                <NavDropdown title={`Mr. ${username}`} id="basic-nav-dropdown">
                  <NavDropdown.Item className="text-center">{role}</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item>
                    <button onClick={handleLogout} className="btn btn-danger w-100">Logout</button>
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      )}
    </div>
  );
}

export default Header;
