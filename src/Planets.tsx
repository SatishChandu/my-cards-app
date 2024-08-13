import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row, Spinner, Table } from 'react-bootstrap';

interface Profile {
    name: string;
    rotation_period: string;
    orbital_period: string;
    diameter: string;
    climate: string;
    gravity: string;
    terrain: string;
    surface_water: string;
    population: string;
}

const Planets: React.FC = () => {
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
            const res =  await axios.get(`https://swapi.dev/api/planets/?page=${pageNumber}`);
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
                                <td><strong>Rotation Period</strong></td>
                                <td>{user.rotation_period}</td>
                            </tr>
                            <tr>
                                <td><strong>Orbital Period</strong></td>
                                <td>{user.orbital_period}</td>
                            </tr>
                            <tr>
                                <td><strong>Diameter</strong></td>
                                <td>{user.diameter}</td>
                            </tr>
                            <tr>
                                <td><strong>Climate</strong></td>
                                <td>{user.climate}</td>
                            </tr>
                            <tr>
                                <td><strong>Gravity</strong></td>
                                <td>{user.gravity}</td>
                            </tr>
                            <tr>
                                <td><strong>Terrain</strong></td>
                                <td>{user.terrain}</td>
                            </tr>
                            <tr>
                                <td><strong>Surface Water</strong></td>
                                <td>{user.surface_water}</td>
                            </tr>
                            <tr>
                                <td><strong>Population</strong></td>
                                <td>{user.population}</td>
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

export default Planets;