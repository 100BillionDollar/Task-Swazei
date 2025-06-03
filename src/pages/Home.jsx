import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Alert, Spinner } from 'react-bootstrap';
import { apiCall, selectApiData, selectApiLoading, selectApiError, selectCurrentPage, selectSearchQuery, setCurrentPage } from '../reduxSlice/ApiSlice';
import MovieCardComponent from '../components/MovieCardComponent';
import Search from '../components/Search';
import Pagination from '../components/Pagination';
import useDebounce from '../hooks/useDebaunce';


function Home() {
  const dispatch = useDispatch();
  const data = useSelector(selectApiData);
  const loading = useSelector(selectApiLoading);
  const error = useSelector(selectApiError);
  const currentPage = useSelector(selectCurrentPage);
  const searchQuery = useSelector(selectSearchQuery);
   const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const totalPages = data?.total_pages || 1;

  useEffect(() => {
    // if(debouncedSearchQuery){
    //   dispatch(setCurrentPage(1))
    // }
    
    dispatch(apiCall({
      method: 'GET',
      url: debouncedSearchQuery
        ? `search/movie?query=${encodeURIComponent(debouncedSearchQuery.trim().toLowerCase())}&language=en-US&page=${currentPage}`
        : `movie/popular?language=en-US&page=${currentPage}`
    }));
  }, [dispatch, currentPage, debouncedSearchQuery]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      dispatch(setCurrentPage(page));
    }
  };

  return (
    <Container className="py-4">
      <Search />
       {loading && (
        <div className="d-flex justify-content-center my-4">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}
      {error && (
        <Alert variant="danger" className="my-3">
          Error: {error}
        </Alert>
      )}

      {!loading && !error && data?.results?.length > 0 && (
        <MovieCardComponent data={data} />
      )}
      {!loading && !error && (!data?.results || data.results.length === 0) && (
        <Alert variant="info" className="my-3">
          No movies found.
        </Alert>
      )}
      <Pagination totalPages={totalPages} />
    </Container>
  );
}

export default Home;