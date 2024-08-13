import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Container, Spinner, Table } from 'react-bootstrap';

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
                <Table striped bordered hover>
                    <thead className='text-center'>
                        <tr>
                            <th>Name</th>
                            <th>Rotation Period</th>
                            <th>Orbital Period</th>
                            <th>Diameter</th>
                            <th>Climate</th>
                            <th>Gravity</th>
                            <th>Terrain</th>
                            <th>Surface Water</th>
                            <th>Population</th>
                        </tr>
                    </thead>
                    <tbody className='text-center'>
                    {info.map((user, index) => (
                        <tr key={index}>
                            <td>{user.name}</td>
                            <td>{user.rotation_period}</td>
                            <td>{user.orbital_period}</td>
                            <td>{user.diameter}</td>
                            <td>{user.climate}</td>
                            <td>{user.gravity}</td>
                            <td>{user.terrain}</td>
                            <td>{user.surface_water}</td>
                            <td>{user.population}</td>
                        </tr>
                        ))}
                    </tbody>
                </Table>
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