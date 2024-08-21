import { Button, Table } from "react-bootstrap";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";

interface DynamicTableProps {
    data: any[];
    onPreview: (item: any) => void;
    onEdit: (item: any) => void;
    onDelete: (item: any) => void;
}
const DynamicTable: React.FC<DynamicTableProps> = ({ data, onPreview, onEdit, onDelete }) => {
    if(data.length === 0) return null;

    const headers = Object.keys(data[0]);

    return (
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
                        <td className="action-cell">
                            <Button variant="link" onClick={() => onPreview(item)}>
                                <FaEye />
                            </Button>
                            <Button variant="link" onClick={() => onEdit(item)}>
                                <FaEdit />
                            </Button>
                            <Button variant="link" onClick={() => onDelete(item)}>
                                <FaTrash />
                            </Button>
                        </td>
                        {headers.map((header, colIndex) => (
                            <td key={colIndex}>{item[header]}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default DynamicTable;