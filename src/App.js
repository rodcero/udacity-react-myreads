import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import Bookshelf from './Bookshelf';
import { Route, Switch, Link } from 'react-router-dom';
import Search from './Search';
import BookDetails from './BookDetails';

class BooksApp extends React.Component {
  state = {
    books: {},
    booksByShelf: {
      currentlyReading: [],
      wantToRead: [],
      read: [],
    },
    shelves: [
      { key: 'currentlyReading', title: 'Currently Reading' },
      { key: 'wantToRead', title: 'Want to Read' },
      { key: 'read', title: 'Read' },
    ],
  };

  componentWillMount() {
    const prev = this.state;
    BooksAPI.getAll().then(books => {
      books.forEach(book => {
        prev.books[book.id] = book;
        prev.booksByShelf[book.shelf].push(book.id);
      });
      this.setState({ ...prev });
    });
  }

  updateBook = (book, shelf) => {
    BooksAPI.update(book, shelf).then(booksByShelf => {
      this.setState(prev => ({
        books: { ...prev.books, [book.id]: { ...book, shelf } },
        booksByShelf,
      }));

      if (shelf === 'none') {
        let books = { ...this.state.books };
        delete books[book.id];
        this.setState({ books: { ...books } });
      }
    });
  };

  render() {
    const { shelves, books, booksByShelf } = this.state;

    return (
      <div className="app">
        <Switch>
          <Route exact path="/search">
            <Search onShelve={this.updateBook} bookCollection={books} />
          </Route>
          <Route exact path="/">
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  {shelves.map(({ key, title }) => (
                    <Bookshelf
                      key={key}
                      title={title}
                      books={booksByShelf[key].map(id => books[id])}
                      onShelve={this.updateBook}
                    />
                  ))}
                </div>
              </div>
              <div className="open-search">
                <Link to="/search">Add a book</Link>
              </div>
            </div>
          </Route>
          <Route
            path="/book/:bookId"
            render={props => {
              const { bookId } = props.match.params;
              return <BookDetails bookId={bookId} />;
            }}
          ></Route>
        </Switch>
      </div>
    );
  }
}

export default BooksApp;
