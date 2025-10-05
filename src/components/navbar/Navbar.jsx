import { Navbar as DlNavbar, Nav, Container } from 'react-bootstrap';

import {NavLink} from 'react-router-dom';

import './index.css';

export const Navbar = () => {
    return (
        <>
            <DlNavbar className='home-navbar'>
                <Container className='home-navbar-container'>
                    <Nav className="me-auto home-navbar-nav">
                        <Nav.Link as={NavLink} to="/">HOME</Nav.Link>
                        <Nav.Link as={NavLink} to="/about">ABOUT</Nav.Link>
                        <Nav.Link as={NavLink} to="/rules">RULE & REGULATION</Nav.Link>
                        <Nav.Link as={NavLink} to="/paper">PAPER</Nav.Link>
                        <Nav.Link as={NavLink} to="/syllabus">SYLLABUS</Nav.Link>
                        <Nav.Link as={NavLink} to="/econtent">E CONTENT</Nav.Link>
                        <Nav.Link as={NavLink} to="/journals">JOURNALS</Nav.Link>
                        <Nav.Link as={NavLink} to="/contactus">CONTACT US</Nav.Link>
                    </Nav>
                </Container>
            </DlNavbar>
        </>
    )
}