import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import Book from './Book';

export default class Search extends Component {
  state = {
    books: [],
    searchText: '',
  };

  componentDidMount() {
    console.log('search mounted');
  }

  searchBook(query) {
    if (query) {
      BooksAPI.search(query)
        .then(books => {
          console.log(books);
          this.setState({ books });
        })
        .catch(e => console.log('error', e));
    }
  }

  onSearchChange = e => {
    const { value } = e.target;
    this.setState({ searchText: value });
    this.searchBook(value);
  };

  render() {
    const { books, searchText } = this.state;
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
            {books.map((book, index) => (
              <Book key={index} book={book} />
            ))}
          </ol>
        </div>
      </div>
    );
  }
}
