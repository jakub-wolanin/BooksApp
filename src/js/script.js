{
  'use strict';

  const select = {
    templateOf: {
      book: '#template-book',
    },
    containerOf: {
      bookList: '.books-list',
    },
  };

  const templates = {
    book: Handlebars.compile(document.querySelector(select.templateOf.book).innerHTML),
  };

  const favoriteBooks = [];

  function render() {
    const booksListContainer = document.querySelector(select.containerOf.bookList);

    for (let book of dataSource.books) {

      const generatedHTML = templates.book(book);
      const generatedDOM = utils.createDOMFromHTML(generatedHTML);

      booksListContainer.appendChild(generatedDOM);
    }
  }

  function initActions() {

    const bookImages = document.querySelectorAll('.book__image');

    for (let bookImage of bookImages) {
      bookImage.addEventListener('dblclick', function (event) {
        event.preventDefault();

        bookImage.classList.add('favorite');

        const bookId = bookImage.getAttribute('data-id');

        favoriteBooks.push(bookId);
      });
    }
  }

  render();
  initActions();
}