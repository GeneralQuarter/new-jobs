import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import { FocusEvent } from 'react';

interface JobsNavbarProps {
  onSearchTermChange?: (searchTerm: string) => void;
}

export function JobsNavbar({ onSearchTermChange }: JobsNavbarProps) {
  const handleFocus = (event: FocusEvent<HTMLInputElement>) => event.target.select();

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand>Jobs</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Form inline>
          <FormControl type="text" placeholder="Search" onChange={e => onSearchTermChange?.(e.target.value)} onFocus={handleFocus} />
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
}