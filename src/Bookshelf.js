import React from 'react';
import Book from './Book';
import PropTypes from 'prop-types';

export default function Bookshelf({ title, books, onShelve }) {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map((book, index) => (
            <Book
              key={index}
              book={book}
              shelf={book.shelf}
              onShelve={destination => onShelve(book, destination)}
            />
          ))}
        </ol>
      </div>
    </div>
  );
}

Bookshelf.propTypes = {
  title: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired,
  onShelve: PropTypes.func.isRequired,
};
