import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import Bookshelf from './Bookshelf';
import { Route, Switch, Link } from 'react-router-dom';
import Search from './Search';

class BooksApp extends React.Component {
  state = {
    currentlyReading: { title: 'Currently Reading', books: [] },
    wantToRead: { title: 'Want to Read', books: [] },
    read: { title: 'Read', books: [] },
  };

  componentWillMount() {
    const prev = this.state;
    BooksAPI.getAll().then(books => {
      books.forEach(book => {
        prev[book.shelf].books.push(book);
      });
      this.setState({ ...prev });
    });
  }

  onMove = (book, shelf) => {
    this.remove(book);
    book.shelf = shelf;
    if (shelf === 'none') return;
    this.setState(prev => ({
      ...prev,
      [shelf]: {
        ...prev[shelf],
        books: [...prev[shelf].books, book],
      },
    }));
  };

  remove = book => {
    const shelves = this.state;
    let books = shelves[book.shelf].books;
    books = books.filter(b => b.id !== book.id);
    shelves[book.shelf].books = books;
    this.setState({ ...shelves });
  };

  render() {
    const state = this.state;

    return (
      <div className="app">
        <Switch>
          <Route exact path="/search">
            <Search />
          </Route>
          <Route exact path="/">
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  {Object.entries(state).map(([key, { title, books }]) => (
                    <Bookshelf
                      key={key}
                      title={title}
                      books={books}
                      onMove={this.onMove}
                    />
                  ))}
                </div>
              </div>
              <div className="open-search">
                <Link to="/search">Add a book</Link>
              </div>
            </div>
          </Route>
        </Switch>
      </div>
    );
  }
}

export default BooksApp;
