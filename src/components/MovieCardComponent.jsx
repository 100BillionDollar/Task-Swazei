import { useState, useCallback } from 'react';
import { Row, Col, Card, Button, Modal } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHeart, FaHeartBroken } from 'react-icons/fa';

const MovieCardComponent = ({ data }) => {
      const [favorites, setFavorites] = useState({});
    const toggleFavorite = useCallback((movieId) => {
    setFavorites(prev => ({
      ...prev,
      [movieId]: !prev[movieId]
    }));
  }, []);

  return (
    <>
      <Row xs={1} md={2} lg={3} className="g-4">
        {data.results.map((item, index) => {
          const {
            id,
            backdrop_path,
            original_language,
            original_title,
            overview,
            popularity,
            release_date,
            title,
            vote_average,
            vote_count
          } = item;

          return (
            <Col key={`${id}-${index}`}>
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <Card 
                  className="h-100 shadow-sm hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => handleCardClick(item)}
                >
                  {backdrop_path && (
                    <Card.Img
                      variant="top"
                      src={`https://image.tmdb.org/t/p/w500${backdrop_path}`}
                      alt={title}
                      className="object-cover"
                      style={{ height: '200px' }}
                      loading="lazy"
                    />
                  )}
                  <Card.Body className="d-flex flex-column">
                    <Card.Title className="text-lg font-semibold">
                      {title || original_title}
                    </Card.Title>
                    <Card.Text className="text-sm text-muted flex-grow-1">
                      {overview?.substring(0, 100)}...
                    </Card.Text>
                    <div className="mt-2">
                      <p className="mb-1">
                        <strong>Release:</strong> {release_date || 'N/A'}
                      </p>
                      <p className="mb-1">
                        <strong>Rating:</strong> {vote_average?.toFixed(1)} ({vote_count} votes)
                      </p>
                      <p className="mb-1">
                        <strong>Popularity:</strong> {popularity?.toFixed(1)}
                      </p>
                      <p className="mb-1">
                        <strong>Language:</strong> {original_language?.toUpperCase()}
                      </p>
                    </div>
                    <Button
                      variant={favorites[id] ? 'danger' : 'outline-danger'}
                      size="sm"
                      className="mt-2 align-self-start"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(id);
                      }}
                      aria-label={favorites[id] ? 'Remove from favorites' : 'Add to favorites'}
                    >
                      {favorites[id] ? <FaHeartBroken /> : <FaHeart />}
                      <span className="ms-1">{favorites[id] ? 'Remove from Favorites' : 'Add to Favorites'}</span>
                    </Button>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default MovieCardComponent;