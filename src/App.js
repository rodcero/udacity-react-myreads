import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import Bookshelf from './Bookshelf';
import { Route, Switch, Link } from 'react-router-dom';
import Search from './Search';

class BooksApp extends React.Component {
  state = {
    shelves: {
      currentlyReading: { title: 'Currently Reading', books: [] },
      wantToRead: { title: 'Want to Read', books: [] },
      read: { title: 'Read', books: [] },
    },
  };

  componentWillMount() {
    let { shelves } = this.state;
    BooksAPI.getAll().then(books => {
      books.forEach(book => {
        shelves[book.shelf].books.push(book);
      });
      this.setState({ shelves });
    });
  }

  render() {
    const { shelves } = this.state;

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
                  {Object.entries(shelves).map(([key, { title, books }]) => (
                    <Bookshelf key={key} title={title} books={books} />
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
