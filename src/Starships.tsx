import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Container, Spinner, Table } from 'react-bootstrap';

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
                <Table striped bordered hover>
                    <thead className='text-center'>
                        <tr>
                            <th>Name</th>
                            <th>Model</th>
                            <th>Manufacturer</th>
                            <th>Cost in Credits</th>
                            <th>Length</th>
                            <th>Max-Atmosphering-Speed</th>
                            <th>Crew</th>
                            <th>Passengers</th>
                            <th>Cargo-Capacity</th>
                            <th>Consumables</th>
                            <th>Hyperdrive-Rating</th>
                            <th>MGLT</th>
                            <th>Starship-Class</th>
                        </tr>
                    </thead>
                    <tbody className='text-center'>
                    {info.map((user, index) => (
                        <tr key={index}>
                            <td>{user.name}</td>
                            <td>{user.model}</td>
                            <td>{user.manufacturer}</td>
                            <td>{user.cost_in_credits}</td>
                            <td>{user.length}</td>
                            <td>{user.max_atmosphering_speed}</td>
                            <td>{user.crew}</td>
                            <td>{user.passengers}</td>
                            <td>{user.cargo_capacity}</td>
                            <td>{user.consumables}</td>
                            <td>{user.hyperdrive_rating}</td>
                            <td>{user.MGLT}</td>
                            <td>{user.starship_class}</td>
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

export default Starships;