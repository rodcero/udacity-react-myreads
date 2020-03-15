import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import Bookshelf from './Bookshelf';
import { Route, Switch, Link } from 'react-router-dom';
import Search from './Search';

class BooksApp extends React.Component {
  state = {
    books: {},
    booksByShelf: {
      currentlyReading: [],
      wantToRead: [],
      read: [],
    },
    shelfs: [
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

  onMove = (book, shelf) => {
    this.removeBookFromShelf(book.id, book.shelf);
    if (shelf === 'none') {
      this.addBook(book, shelf).then(() => {
        let books = { ...this.state.books };
        delete books[book.id];
        this.setState({ books: { ...books } });
      });
    } else {
      this.addBookToShelf(book.id, shelf);
    }
  };

  addBook = (book, shelf) => {
    return BooksAPI.update(book, shelf).then(res => {
      this.setState(prev => ({
        books: { ...prev.books, [book.id]: book },
        booksByShelf: res,
      }));
    });
  };

  addBookToShelf = (bookid, shelf) => {
    console.log('addBookToShelf', bookid, shelf);
    this.setState(prev => ({
      booksByShelf: {
        ...prev.booksByShelf,
        [shelf]: [...prev.booksByShelf[shelf], bookid],
      },
    }));
  };

  removeBookFromShelf = (bookid, shelf) => {
    console.log('removeBookFromShelf', bookid, shelf);
    const shelfBooks = [...this.state.booksByShelf[shelf]].filter(
      id => id !== bookid
    );
    this.setState(prev => ({
      booksByShelf: { ...prev.booksByShelf, [shelf]: shelfBooks },
    }));
  };

  render() {
    const { shelfs, books, booksByShelf } = this.state;

    return (
      <div className="app">
        <Switch>
          <Route exact path="/search">
            <Search onAdd={this.addBook} bookCollection={books} />
          </Route>
          <Route exact path="/">
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  {shelfs.map(({ key, title }) => (
                    <Bookshelf
                      key={key}
                      title={title}
                      books={booksByShelf[key].map(id => books[id])}
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
