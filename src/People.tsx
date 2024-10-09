import React from "react";
import { Container, Button, Spinner } from "react-bootstrap";
import DynamicTable from "./custom-hook/DynamicTable";
import useFetchData from "./custom-hook/useFetchData";
import "./assets/style.css";

const People: React.FC = () => {
  const {
    info,
    loading,
    page,
    totalPages,
    hasNextPage,
    handleNextPage,
    handlePreviousPage,
  } = useFetchData("https://swapi.dev/api/people", 10);

  const handleEdit = (item: unknown) => {
    console.log("Edit", item);
  };

  const handleDelete = (item: unknown) => {
    console.log("Delete", item);
  };

  return (
    <>
      <Container className="mt-4">
        {loading ? (
          <div className="text-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : (
          <div className="scrollbar-container">
            <DynamicTable
              data={info}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        )}
      </Container>
      <div className="fixed-footer">
        <Button
          className="m-2"
          onClick={handlePreviousPage}
          disabled={page === 1}
        >
          Previous
        </Button>
        <span className="m-2">
          <strong>
            {totalPages !== null
              ? `Showing Page ${page} of ${totalPages}`
              : "Loading..."}
          </strong>
        </span>
        <Button
          className="m-2"
          onClick={handleNextPage}
          disabled={!hasNextPage}
        >
          Next
        </Button>
      </div>
    </>
  );
};

export default People;
