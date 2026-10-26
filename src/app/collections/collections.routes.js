const { Router } = require('express');
const collectionsController = require('./collections.controller');

const collectionsRouter = Router();

collectionsRouter.post('/books', collectionsController.createBooksCollection.bind(collectionsController));
collectionsRouter.post('/authors', collectionsController.createAuthorsCollection.bind(collectionsController));
collectionsRouter.post('/logs/capped', collectionsController.createCappedLogs.bind(collectionsController));
collectionsRouter.post('/books/index', collectionsController.createBooksIndex.bind(collectionsController));

module.exports = collectionsRouter;
