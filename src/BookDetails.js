import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI';
import PropTypes from 'prop-types';

export default class BookDetails extends Component {
  static propTypes = {
    bookId: PropTypes.string.isRequired,
  };

  state = {
    book: null,
  };

  componentDidMount() {
    BooksAPI.get(this.props.bookId).then(book => this.setState({ book }));
  }

  render() {
    const { book } = this.state;
    if (!book) return null;

    return (
      <div className="content">
        <div className="item"></div>
        <div className="item-center">
          <div className="bd-title">{book.title}</div>
          <div className="bd-subtitle">{book.subtitle}</div>
          <div className="details">
            <div className="left">
              <div
                className="book-cover"
                style={{
                  width: 300,
                  height: 400,
                  backgroundImage: book.imageLinks
                    ? `url("${book.imageLinks.thumbnail}")`
                    : 'none',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '300px 400px',
                }}
              ></div>
            </div>
            <div className="right">
              <table>
                <tbody>
                  <tr>
                    <td>Authors</td>
                    <td>{book.authors.join(', ')}</td>
                  </tr>
                  <tr>
                    <td>Publisher</td>
                    <td>{book.publisher}</td>
                  </tr>
                  <tr>
                    <td>Published Date</td>
                    <td>{book.publishedDate}</td>
                  </tr>
                  <tr>
                    <td>Page Count</td>
                    <td>{book.pageCount}</td>
                  </tr>
                  <tr>
                    <td>categories</td>
                    <td>{book.categories.join(',')}</td>
                  </tr>
                  <tr>
                    <td>
                      <a href={book.infoLink}>Buy it.</a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="bd-desc">
            <b>Descripton:</b>
            <div>{book.description}</div>
          </div>
        </div>
        <div className="item"></div>
      </div>
    );
  }
}
