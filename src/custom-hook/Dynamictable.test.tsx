import { render, screen } from '@testing-library/react';
import DynamicTable from './DynamicTable';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import '@testing-library/jest-dom';

const mockData = [
    {id: 1, name: 'Item 1', gender: 'Male'},
    {id: 2, name: 'Item 2', gender: 'Female'}
];

describe('Dynamic Table', () => {
    test('renders the table headers correctly', () => {
        render(<DynamicTable data={mockData} onEdit={vi.fn()} onDelete={vi.fn()} />);
        const headers = ["ACTIONS", "ID", "NAME", "GENDER"];
        headers.forEach((header) => {
            expect(screen.getByText(header)).toBeInTheDocument();
        }); 
    });

    test('renders the table rows and cells correctly', () => {
        render(<DynamicTable data={mockData} onEdit={vi.fn()} onDelete={vi.fn()} />);

        mockData.forEach((item) => {
            expect(screen.getByText(item.name)).toBeInTheDocument();
            expect(screen.getByText(item.gender)).toBeInTheDocument();
        });
    });

    // test('opens preview modal on preview button click', () => {
    //     render(<DynamicTable data={mockData} onEdit={vi.fn()} onDelete={vi.fn()} />);

    //     const previewButton = screen.getAllByRole('button', {name: /eye/i})[0];
    //     userEvent.click(previewButton); 

    //     expect(screen.getByText('Item 1')).toBeInTheDocument();
    // });
});

