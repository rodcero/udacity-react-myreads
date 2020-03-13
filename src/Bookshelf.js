import React from 'react';
import Book from './Book';

export default function Bookshelf({ title, books, onMove }) {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map((book, index) => (
            <li key={index}>
              <Book
                book={book}
                onMove={destination => onMove(book, destination)}
              />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
