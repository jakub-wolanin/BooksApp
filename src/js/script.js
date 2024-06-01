'use strict';

class BooksList {
  constructor() {
    const thisBooksList = this;
    thisBooksList.initData();
    thisBooksList.getElements();
    thisBooksList.render();
    thisBooksList.initActions();
  }

  initData() {
    this.data = dataSource.books;
  }

  getElements() {
    const thisBooksList = this;
    thisBooksList.select = {
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

    thisBooksList.templates = {
      book: Handlebars.compile(document.querySelector(thisBooksList.select.templateOf.book).innerHTML),
    };

    thisBooksList.favoriteBooks = [];
    thisBooksList.filters = [];
    thisBooksList.booksListContainer = document.querySelector(thisBooksList.select.containerOf.bookList);
    thisBooksList.filtersForm = document.querySelector(thisBooksList.select.all.filters);
  }

  render() {
    const thisBooksList = this;
    for (let book of thisBooksList.data) {
      const ratingBgc = thisBooksList.determineRatingBgc(book.rating);
      const ratingWidth = book.rating * 10;

      book.ratingBgc = ratingBgc;
      book.ratingWidth = ratingWidth;

      const generatedHTML = thisBooksList.templates.book(book);
      const generatedDOM = utils.createDOMFromHTML(generatedHTML);

      thisBooksList.booksListContainer.appendChild(generatedDOM);
    }
  }

  initActions() {
    const thisBooksList = this;
    thisBooksList.booksListContainer.addEventListener('dblclick', (event) => {
      event.preventDefault();

      const clickedElement = event.target.offsetParent;

      if (clickedElement.classList.contains('book__image')) {
        const bookId = clickedElement.getAttribute('data-id');

        if (thisBooksList.favoriteBooks.includes(bookId)) {
          clickedElement.classList.remove('favorite');
          const index = thisBooksList.favoriteBooks.indexOf(bookId);
          thisBooksList.favoriteBooks.splice(index, 1);
        } else {
          clickedElement.classList.add('favorite');
          thisBooksList.favoriteBooks.push(bookId);
        }
      }
    });

    thisBooksList.filtersForm.addEventListener('click', (event) => {
      if (
        event.target.tagName === 'INPUT' &&
        event.target.type === 'checkbox' &&
        event.target.name === 'filter'
      ) {
        const filterValue = event.target.value;

        if (event.target.checked) {
          thisBooksList.filters.push(filterValue);
        } else {
          const index = thisBooksList.filters.indexOf(filterValue);
          if (index !== -1) {
            thisBooksList.filters.splice(index, 1);
          }
        }
        thisBooksList.filterBooks();
      }
    });
  }

  filterBooks() {
    const thisBooksList = this;
    for (let book of thisBooksList.data) {
      let shouldBeHidden = false;

      for (let filter of thisBooksList.filters) {
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

  determineRatingBgc(rating) {
    let background = '';
    if (rating < 6) {
      background = 'linear-gradient(to bottom, #fefcea 0%, #f1da36 100%)';
    } else if (rating > 6 && rating <= 8) {
      background = 'linear-gradient(to bottom, #b4df5b 0%, #b4df5b 100%)';
    } else if (rating > 8 && rating <= 9) {
      background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
    } else {
      background = 'linear-gradient(to bottom, #ff0084 0%, #ff0084 100%)';
    }
    return background;
  }
}

const app = new BooksList();
console.log(app);