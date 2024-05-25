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

    function render() {
        const booksListContainer = document.querySelector(select.containerOf.bookList);

        for (let book of dataSource.books) {

            const generatedHTML = templates.book(book);
            const generatedDOM = utils.createDOMFromHTML(generatedHTML);

            booksListContainer.appendChild(generatedDOM);
        }
    }
    render();
}