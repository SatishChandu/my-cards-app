import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row, Spinner, Table } from 'react-bootstrap';

interface Profile {
    name: string;
    model: string;
    manufacturer: string;
    cost_in_credits: string;
    length: string;
    max_atmosphering_speed: string;
    crew: string;
    passengers: string;
    cargo_capacity: string;
    consumables: string;
    hyperdrive_rating: string;
    MGLT: string;
    starship_class: string;
}

const Starships: React.FC = () => {
    const [info, setInfo] = useState<Profile[]>([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [hasNextPage, setHasNextPage] = useState(true);
    const [totalPages, setTotalPages] = useState<number>(0);
    const pageSize = 10;

    useEffect(() => {
      fetchData(page, pageSize);
  },[page, pageSize]);

  const fetchData = async (pageNumber: number, pageSize: number) => {
      setLoading(true);
      try {
          const res =  await axios.get(`https://swapi.dev/api/starships/?page=${pageNumber}`);
          setInfo(res.data.results);

          const totalRecords = res.data.count;
          setTotalPages(Math.ceil(totalRecords / pageSize));
        
          setHasNextPage(res.data.next != null);
      } catch(err) {
          console.error("Error in fetching the data", err);
      } finally {
          setLoading(false);
      }
  };

  const handleNext: React.MouseEventHandler = () => {
      setPage(prevPage => prevPage + 1);
      window.scrollTo(0, 0);
  };

  const handlePrevious: React.MouseEventHandler = () => {
      setPage(prevPage => (prevPage > 1 ? prevPage - 1: 1));
      window.scrollTo(0, 0)
  }  
  return (
    <>
        <div>
        <Container className="mt-4">
            {loading ? (
                <div className="text-center">
                    <Spinner animation="border" role="status">
                        <span className='visually-hidden'>Loading...</span>
                    </Spinner>
                </div>
            ) : (
            <Row>
              {info.map((user, index) => (
                <Col sm={12} md={6} lg={4} xl={3} key={index} className="mb-4">
                    <Table striped bordered hover key={index}>
                        <tbody>
                            <tr>
                                <td><strong>Name</strong></td>
                                <td>{user.name}</td>
                            </tr>
                            <tr>
                                <td><strong>Model</strong></td>
                                <td>{user.model}</td>
                            </tr>
                            <tr>
                                <td><strong>Manufacturer</strong></td>
                                <td>{user.manufacturer}</td>
                            </tr>
                            <tr>
                                <td><strong>Cost in Credits</strong></td>
                                <td>{user.cost_in_credits}</td>
                            </tr>
                            <tr>
                                <td><strong>Length</strong></td>
                                <td>{user.length}</td>
                            </tr>
                            <tr>
                                <td><strong>Max-Atmosphering-Speed</strong></td>
                                <td>{user.max_atmosphering_speed}</td>
                            </tr>
                            <tr>
                                <td><strong>Crew</strong></td>
                                <td>{user.crew}</td>
                            </tr>
                            <tr>
                                <td><strong>Passengers</strong></td>
                                <td>{user.passengers}</td>
                            </tr>
                            <tr>
                                <td><strong>Cargo-Capacity</strong></td>
                                <td>{user.cargo_capacity}</td>
                            </tr>
                            <tr>
                                <td><strong>Consumables</strong></td>
                                <td>{user.consumables}</td>
                            </tr>
                            <tr>
                                <td><strong>Hyperdrive-Rating</strong></td>
                                <td>{user.hyperdrive_rating}</td>
                            </tr>
                            <tr>
                                <td><strong>MGLT</strong></td>
                                <td>{user.MGLT}</td>
                            </tr>
                            <tr>
                                <td><strong>Starship-Class</strong></td>
                                <td>{user.starship_class}</td>
                            </tr>
                        </tbody>
                    </Table>
                </Col>
              ))}
            </Row>
            )}
        </Container>
        <div className='d-flex justify-content-between align-content-center'>
            <Button className='m-2' onClick={handlePrevious} disabled={page === 1}>Previous</Button>
            <span className='m-2'>
                <strong>{totalPages !== null ? `Showing Page ${page} of ${totalPages}` : 'Loading...'}</strong>
            </span>
            <Button className='m-2' onClick={handleNext} disabled={!hasNextPage}>Next</Button>
        </div>
        </div> 
    </>
  )
}

export default Starships;