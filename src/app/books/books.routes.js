const { Router } = require('express');
const booksController = require('./books.controller');

const booksRouter = Router();

booksRouter.post('/', booksController.insertOneBook.bind(booksController));
booksRouter.post('/batch', booksController.insertBatchBooks.bind(booksController));
booksRouter.get('/title', booksController.findBookByTitle.bind(booksController));
booksRouter.get('/year', booksController.findBooksByYearRange.bind(booksController));
booksRouter.get('/genre', booksController.findBooksByGenre.bind(booksController));
booksRouter.get('/skip-limit', booksController.findBooksSkipLimit.bind(booksController));
booksRouter.get('/year-integer', booksController.findBooksWhereYearIsInteger.bind(booksController));
booksRouter.get('/exclude-genres', booksController.findBooksExcludingGenres.bind(booksController));
booksRouter.delete('/before-year', booksController.deleteBooksBeforeYear.bind(booksController));
booksRouter.get('/before-year', booksController.deleteBooksBeforeYear.bind(booksController));
booksRouter.get('/aggregate1', booksController.aggregate1.bind(booksController));
booksRouter.get('/aggregate2', booksController.aggregate2.bind(booksController));
booksRouter.get('/aggregate3', booksController.aggregate3.bind(booksController));
booksRouter.get('/aggregate4', booksController.aggregate4.bind(booksController));
booksRouter.patch('/:title', booksController.updateBookYear.bind(booksController));

module.exports = booksRouter;
