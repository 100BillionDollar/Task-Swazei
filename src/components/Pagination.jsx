import { useDispatch, useSelector } from 'react-redux';
import { Pagination as BootstrapPagination, Container } from 'react-bootstrap';
import { setCurrentPage, selectCurrentPage } from '../reduxSlice/ApiSlice';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'; // Import react-icons for navigation

const Pagination = ({ totalPages }) => {
  const dispatch = useDispatch();
  const currentPage = useSelector(selectCurrentPage);
  const maxPagesToShow = 5;
  const pages = [];

  const startPage = Math.max(2, currentPage - Math.floor(maxPagesToShow / 2));
  const endPage = Math.min(totalPages - 1, startPage + maxPagesToShow - 1);

  pages.push(
    <BootstrapPagination.Item
      key={1}
      active={currentPage === 1}
      onClick={() => dispatch(setCurrentPage(1))}
      className="page-item-custom"
      aria-label="Go to page 1"
    >
      1
    </BootstrapPagination.Item>
  );

  if (startPage > 2) {
    pages.push(<BootstrapPagination.Ellipsis key="start-ellipsis" disabled />);
  }

  // Middle pages
  for (let page = startPage; page <= endPage; page++) {
    pages.push(
      <BootstrapPagination.Item
        key={page}
        active={page === currentPage}
        onClick={() => dispatch(setCurrentPage(page))}
        className="page-item-custom"
        aria-label={`Go to page ${page}`}
      >
        {page}
      </BootstrapPagination.Item>
    );
  }

  // Ellipsis after middle pages
  if (endPage < totalPages - 1) {
    pages.push(<BootstrapPagination.Ellipsis key="end-ellipsis" disabled />);
  }

  // Last page
  if (totalPages > 1) {
    pages.push(
      <BootstrapPagination.Item
        key={totalPages}
        active={currentPage === totalPages}
        onClick={() => dispatch(setCurrentPage(totalPages))}
        className="page-item-custom"
        aria-label={`Go to page ${totalPages}`}
      >
        {totalPages}
      </BootstrapPagination.Item>
    );
  }

  return (
    <Container className="pagination-container my-4">
      <BootstrapPagination className="justify-content-center">
        <BootstrapPagination.Prev
          onClick={() => dispatch(setCurrentPage(currentPage - 1))}
          disabled={currentPage === 1}
          className="page-nav"
          aria-label="Previous page"
        >
          <FaChevronLeft />
        </BootstrapPagination.Prev>
        {pages}
        <BootstrapPagination.Next
          onClick={() => dispatch(setCurrentPage(currentPage + 1))}
          disabled={currentPage === totalPages}
          className="page-nav"
          aria-label="Next page"
        >
          <FaChevronRight />
        </BootstrapPagination.Next>
      </BootstrapPagination>
    </Container>
  );
};

export default Pagination;