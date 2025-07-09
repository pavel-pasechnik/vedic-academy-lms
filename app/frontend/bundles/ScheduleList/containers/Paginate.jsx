import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

const Paginate = ({ max, onChange, maxVisible = 5, versionedNullifier }) => {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [versionedNullifier]);

  useEffect(() => {
    onChange(currentPage);
  }, [currentPage, versionedNullifier, onChange]);

  const pages = Array.from({ length: max }, (_, i) => i + 1);

  const visiblePages = pages.slice(
    Math.max(currentPage - Math.ceil(maxVisible / 2), 0),
    Math.min(currentPage - Math.ceil(maxVisible / 2) + maxVisible, max)
  );

  return (
    <nav className='pagination'>
      <ul className='pagination__list'>
        {visiblePages.map(page => (
          <li
            key={page}
            className={`pagination__item${page === currentPage ? ' pagination__item--active' : ''}`}>
            <button
              type='button'
              className='pagination__button'
              onClick={() => setCurrentPage(page)}
              disabled={page === currentPage}>
              {page}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Paginate.propTypes = {
  max: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  maxVisible: PropTypes.number,
  versionedNullifier: PropTypes.any,
};

Paginate.defaultProps = {
  maxVisible: 5,
};

export default Paginate;
