{
  'use strict';

  const select = {
    templateOf: {
      book: '#template-book',
    },
    containerOf: {
      bookList: '.books-list',
    },
    all: {
      filters: '.filters',
    }
  };

  const templates = {
    book: Handlebars.compile(document.querySelector(select.templateOf.book).innerHTML),
  };

  const favoriteBooks = [];

  const filters = [];

  function render() {
    const booksListContainer = document.querySelector(select.containerOf.bookList);

    for (let book of dataSource.books) {

      const generatedHTML = templates.book(book);
      const generatedDOM = utils.createDOMFromHTML(generatedHTML);

      booksListContainer.appendChild(generatedDOM);
    }
  }

  function initActions() {

    const booksListContainer = document.querySelector(select.containerOf.bookList);

    booksListContainer.addEventListener('dblclick', function (event) {
      event.preventDefault();

      const clickedElement = event.target.offsetParent;

      if (clickedElement.classList.contains('book__image')) {
        const bookId = clickedElement.getAttribute('data-id');

        if (favoriteBooks.includes(bookId)) {
          clickedElement.classList.remove('favorite');
          const index = favoriteBooks.indexOf(bookId);
          favoriteBooks.splice(index, 1);

        } else {
          clickedElement.classList.add('favorite');
          favoriteBooks.push(bookId);
        }
      }
    });

    const filtersForm = document.querySelector(select.all.filters);

    filtersForm.addEventListener('click', function (event) {

      if (
        event.target.tagName === 'INPUT' &&
        event.target.type === 'checkbox' &&
        event.target.name === 'filter'
      ) {
        const filterValue = event.target.value;

        if (event.target.checked) {
          filters.push(filterValue);
        } else {
          const index = filters.indexOf(filterValue);
          if (index !== -1) {
            filters.splice(index, 1);
          }
        }
        console.log(filters);
        filterBooks();
      }
    });
  }

  function filterBooks() {
    for (let book of dataSource.books) {
      let shouldBeHidden = false;

      for (let filter of filters) {
        if (!book.details[filter]) {
          shouldBeHidden = true;
          break;
        }
      }

      const bookElement = document.querySelector(`.book__image[data-id="${book.id}"]`);
      if (shouldBeHidden) {
        bookElement.classList.add('hidden');
      } else {
        bookElement.classList.remove('hidden');
      }
    }
  }

  render();
  initActions();
  filterBooks();
}