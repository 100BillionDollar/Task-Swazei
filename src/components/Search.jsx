import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Container, Row, Col, InputGroup } from 'react-bootstrap';
import { setSearchQuery, selectSearchQuery } from '../reduxSlice/ApiSlice';
import { FaSearch } from 'react-icons/fa';

const Search = () => {
  const dispatch = useDispatch();
  const searchQuery = useSelector(selectSearchQuery);
  const [isFocused, setIsFocused] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) { 
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll); 
  }, []);

  return (
    <Container className={`search-container my-4 ${isScrolled ? 'scrolled' : ''}`}>
      <Form>
        <Row className="justify-content-center">
          <Col xs={12} md={8}>
            <InputGroup className={`search-input-group ${isFocused ? 'focused' : ''}`}>
              <InputGroup.Text className="search-icon">
                <FaSearch />
              </InputGroup.Text>
              <Form.Control
                type="search"
                placeholder="Search for something..."
                value={searchQuery}
                onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className="search-input"
                aria-label="Search query"
              />
            </InputGroup>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default Search;