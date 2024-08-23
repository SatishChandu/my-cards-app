import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import './assets/style.css';

interface PreviewModalProps {
    show: boolean;
    handleClose: () => void;
    itemData: any;
}

const PreviewModal: React.FC<PreviewModalProps> = ({show, handleClose, itemData}) => {
    const renderValue = (value: any) => {
        if(typeof value === "string" || typeof value === "number") {
            return value;
        }
        if(Array.isArray(value)) {
            return value.join(', ');
        }
        if(typeof value === 'object') {
            return (
                <ul>
                    {Object.entries(value).map(([key, subValue]) => (
                        <li key={key}><strong>{key.replace('_', ' ').toUpperCase()}:</strong> {renderValue(subValue)}</li>
                    ))}
                </ul>
            );
        }
        return null;
    };
  return (
    <>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header>
                <Modal.Title>User Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {itemData && (
                    <ul>
                        {Object.entries(itemData).map(([key, value]) => (
                            <li key={key}><strong>{key.replace('_', ' ').toUpperCase()}:</strong> {renderValue(value)}</li>
                        ))}
                    </ul>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
            </Modal.Footer>
        </Modal>
    </>
  )
}

export default PreviewModal;