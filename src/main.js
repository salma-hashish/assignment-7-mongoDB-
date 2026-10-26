require('dotenv').config();
const express = require('express');
const { connectDB } = require('./common/db/mongodb');

const collectionsRouter = require('./app/collections/collections.routes');
const booksRouter = require('./app/books/books.routes');
const logsRouter = require('./app/logs/logs.routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/collection', collectionsRouter);
app.use('/books', booksRouter);
app.use('/logs', logsRouter);

app.use((req, res) => {
    res.status(404).json({ error: `Route not found: ${req.method} ${req.originalUrl}` });
});

app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    await connectDB();
});

module.exports = app;
