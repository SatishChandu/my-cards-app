import React, { useEffect, useState } from 'react';
import {Container, Table, Row, Col, Button, Spinner} from 'react-bootstrap';
import axios from 'axios';

interface Profile {
    name: string;
    height: string;
    mass: string;
    hair_color: string;
    skin_color: string;
    eye_color: string;
    birth_year: string;
    gender: string;
}

const People: React.FC = () => {
    const [info, setInfo] = useState<Profile[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasNextPage, setHasNextPage] = useState(true);
    const [totalPages, setTotalPages] = useState<number>(0);
    const pageSize = 10;

    useEffect(() => {
        fetchData(page, pageSize);
    },[page, pageSize]);

    const fetchData = async (pageNumber: number, pageSize: number) => {
        setLoading(true);
        try {
            const res =  await axios.get(`https://swapi.dev/api/people/?page=${pageNumber}`);
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
                                <td><strong>Height</strong></td>
                                <td>{user.height}</td>
                            </tr>
                            <tr>
                                <td><strong>Mass</strong></td>
                                <td>{user.mass}</td>
                            </tr>
                            <tr>
                                <td><strong>Hair Color</strong></td>
                                <td>{user.hair_color}</td>
                            </tr>
                            <tr>
                                <td><strong>Skin Color</strong></td>
                                <td>{user.skin_color}</td>
                            </tr>
                            <tr>
                                <td><strong>Eye Color</strong></td>
                                <td>{user.eye_color}</td>
                            </tr>
                            <tr>
                                <td><strong>Birth Year</strong></td>
                                <td>{user.birth_year}</td>
                            </tr>
                            <tr>
                                <td><strong>Gender</strong></td>
                                <td>{user.gender}</td>
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

export default People;