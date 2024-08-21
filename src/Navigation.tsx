import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { NavLink } from 'react-router-dom';

const Navigation: React.FC = () => {
  return (
    <>
      <Navbar bg="primary" data-bs-theme="dark" className='sticky-top'>
          <Container>
            <Navbar.Brand>StarWarsAPI</Navbar.Brand>
            <Nav className="me-auto">
              <LinkContainer to="people">
                <Nav.Link as={NavLink} to="/">People</Nav.Link>
              </LinkContainer>
              <LinkContainer to="planets">
                <Nav.Link>Planets</Nav.Link>
              </LinkContainer>
              <LinkContainer to="starships">
                <Nav.Link>Starships</Nav.Link>
              </LinkContainer>
            </Nav>
          </Container>
      </Navbar>
    </>
  )
}

export default Navigation;