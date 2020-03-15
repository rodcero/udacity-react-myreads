import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import Book from './Book';
import PropTypes from 'prop-types';

export default class Search extends Component {
  static propTypes = {
    bookCollection: PropTypes.object.isRequired,
  };

  state = {
    books: [],
    searchText: '',
    error: false,
  };

  searchBook(query) {
    if (query) {
      BooksAPI.search(query)
        .then(books => {
          this.setState({ books, error: false });
        })
        .catch(e => {
          console.log(e);
          this.setState({ books: [], error: true });
        });
    }
  }

  onSearchChange = e => {
    const { value } = e.target;
    this.setState({ searchText: value });
    this.searchBook(value);
  };

  onMove = (book, shelf) => {
    this.props.onAdd(book, shelf);
  };

  render() {
    const { bookCollection } = this.props;
    const { books, searchText, error } = this.state;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={this.onSearchChange}
              value={searchText}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {error ? (
              <div>
                <div>
                  <b>ERROR:</b> There was and error getting list of books, make
                  sure you are using correct search terms.
                </div>
                <div>
                  <b>NOTES:</b> The search from BooksAPI is limited to a
                  particular set of search terms. You can find these search
                  terms here:
                </div>
                <a
                  href="https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md"
                  target="_blank"
                >
                  Search terms here.
                </a>
              </div>
            ) : (
              books.map((book, index) => (
                <Book
                  key={index}
                  book={book}
                  shelf={
                    bookCollection[book.id] && bookCollection[book.id].shelf
                  }
                  shelved={bookCollection[book.id] != null}
                  onMove={shelf => this.onMove(book, shelf)}
                />
              ))
            )}
          </ol>
        </div>
      </div>
    );
  }
}
