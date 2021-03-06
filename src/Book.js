import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function Book({ book, onShelve, shelved, shelf }) {
  const shelveNames = {
    currentlyReading: 'Currently Reading',
    wantToRead: 'Want to Read',
    read: 'Read',
  };

  return (
    <li>
      <div className="book">
        {shelved && <div className="shelved">{shelveNames[shelf]}</div>}
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: book.imageLinks
                ? `url("${book.imageLinks.thumbnail}")`
                : 'none',
              border: shelved && '5px solid #de773a',
            }}
          >
            <Link className="book-link" to={`book/${book.id}`}></Link>
          </div>
          <div className="book-shelf-changer">
            <select value={shelf} onChange={ev => onShelve(ev.target.value)}>
              <option value="move" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">
          {book.authors ? book.authors.join(',') : ''}
        </div>
      </div>
    </li>
  );
}

Book.defaultProps = {
  shelved: false,
  shelf: 'none',
};

Book.propTypes = {
  book: PropTypes.object.isRequired,
  onShelve: PropTypes.func.isRequired,
  shelved: PropTypes.bool.isRequired,
  shelf: PropTypes.string.isRequired,
};
