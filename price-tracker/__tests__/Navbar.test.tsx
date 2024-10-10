import { render, screen } from '@testing-library/react';
import Navbar from '../src/components/Navbar'; // Adjust the import as necessary
import '@testing-library/jest-dom';


describe('Navbar', () => {
  test('renders the Navbar correctly', () => {
    render(<Navbar />);
    
    const linkElement = screen.getByText(/Stock Tracker - M2/i);
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', '/'); // Check if the link has the correct href attribute
  });
});
