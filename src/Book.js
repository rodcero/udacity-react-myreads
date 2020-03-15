import React from 'react';
import PropTypes from 'prop-types';

export default function Book({ book, onMove }) {
  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url("${book.imageLinks.thumbnail}")`,
            }}
          ></div>
          <div className="book-shelf-changer">
            <select
              value={book.shelf || 'move'}
              onChange={ev => onMove(ev.target.value)}
            >
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

Book.propTypes = {
  book: PropTypes.object.isRequired,
  onMove: PropTypes.func.isRequired,
};
