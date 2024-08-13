import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Navigation: React.FC = () => {
  return (
    <>
      <Navbar bg="primary" data-bs-theme="dark" className='sticky-top m-1 p-2'>
          <Container>
            <Navbar.Brand>StarWarsAPI</Navbar.Brand>
            <Nav className="me-auto">
              <LinkContainer to="people">
                <Nav.Link>People</Nav.Link>
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