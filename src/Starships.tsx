import React from 'react';
import {Container, Button, Spinner} from 'react-bootstrap';
import DynamicTable from './custom-hook/DynamicTable';
import useFetchData from './custom-hook/useFetchData';
import './assets/style.css';

const Starships: React.FC = () => {
    const { info, loading, page, totalPages, hasNextPage, handleNextPage, handlePreviousPage } =
    useFetchData('https://swapi.dev/api/starships', 10);

    const handlePreview = (item: any) => {
        console.log("Previw", item);
    };

    const handleEdit = (item: any) => {
        console.log('Edit', item);
    };

    const handleDelete = (item: any) => {
        console.log('Delete', item);
    };

  return (
    <>
        <Container className="mt-4">
                {loading ? (
                    <div className="text-center">
                        <Spinner animation="border" role="status">
                            <span className='visually-hidden'>Loading...</span>
                        </Spinner>
                    </div>
                ) : (
                    <div className='scrollbar-container'>
                        <DynamicTable 
                            data={info} 
                            onPreview={handlePreview}
                            onEdit={handleEdit}
                            onDelete={handleDelete} 
                        />
                    </div>
                    
                )}
            </Container>
            <div className='fixed-footer'>
                <Button className='m-2' onClick={handlePreviousPage} disabled={page === 1}>Previous</Button>
                <span className='m-2'>
                    <strong>{totalPages !== null ? `Showing Page ${page} of ${totalPages}` : 'Loading...'}</strong>
                </span>
                <Button className='m-2' onClick={handleNextPage} disabled={!hasNextPage}>Next</Button>
            </div>
    </>
  )
}

export default Starships;