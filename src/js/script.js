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

        const bookId = bookImage.getAttribute('data-id');

        if (favoriteBooks.includes(bookId)) {
          bookImage.classList.remove('favorite');
          const index = favoriteBooks.indexOf(bookId);
          favoriteBooks.splice(index, 1);
          
        } else {
          bookImage.classList.add('favorite');
          favoriteBooks.push(bookId);
        }
      });
    }
  }

  render();
  initActions();
}