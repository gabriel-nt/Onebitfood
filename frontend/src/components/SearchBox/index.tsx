import { FormEvent, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import { useRouter } from 'next/router';

const SearchBox = () => {
  const router = useRouter();
  const [query, setQuery]= useState('');

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();

    router.push(`/restaurants?q=${query}`)
  }

  return (
    <Form className="d-flex mx-5 my-2" onSubmit={(e) => handleSearch(e)}>
      <Form.Control
        type="text"
        placeholder="Buscar Restaurantes..."
        className="me-2"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <Button variant="outline-custom-red" type="submit">
        <FaSearch />
      </Button>
    </Form>
  )
}

export default SearchBox;