import React from 'react';
import Book from './Book';

export default function Bookshelf({ title, books, onMove }) {
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
              onMove={destination => onMove(book, destination)}
            />
          ))}
        </ol>
      </div>
    </div>
  );
}
