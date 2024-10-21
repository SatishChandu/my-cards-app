import { useState } from "react";
import { Button, Table } from "react-bootstrap";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import PreviewModal from "../PreviewModal";

interface DynamicTableProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any[];
    onEdit: (item: any) => void;
    onDelete: (item: any) => void;
}
const DynamicTable: React.FC<DynamicTableProps> = ({ data, onEdit, onDelete }) => {
    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState<any>(null);

    if(data.length === 0) return null;

    const headers = Object.keys(data[0]);
 
    const handlePreview = (item: any) => {
        setSelectedItem(item);
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
        setSelectedItem(null);
    }

    return (
        <>
            <Table striped bordered hover>
            <thead className="text-center">
                <tr>
                    <th>ACTIONS</th>
                    {headers.map((header, index) => (
                        <th key={index}>{header.replace('_', ' ').toUpperCase()}</th>
                    ))}
                </tr>
            </thead>
            <tbody className="text-center">
                {data.map((item, rowIndex) => (
                    <tr key={rowIndex}>
                        <td>
                            <div className="action-cell">
                                <Button variant="info" className="m-2" onClick={() => handlePreview(item)}>
                                    <FaEye />
                                </Button>
                                <Button variant="warning" className="m-2" onClick={() => onEdit(item)}>
                                    <FaEdit />
                                </Button>
                                <Button variant="danger" className="m-2" onClick={() => onDelete(item)}>
                                    <FaTrash />
                                </Button>
                            </div>
                        </td>
                        {headers.map((header, colIndex) => (
                            <td key={colIndex}>
                                {header === 'homeworldData' ? (
                                    <div className="view-button">
                                        <Button variant="info" size="sm" onClick={() => handlePreview(item.homeworldData)}>
                                            View
                                        </Button>
                                    </div>
                                ) : (
                                    item[header]
                                )}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </Table>

        {selectedItem && (
            <PreviewModal show={showModal} handleClose={handleClose} itemData={selectedItem} /> 
        )}
        </>
    );
};

export default DynamicTable;