const booksService = require('./books.services');

class BooksController {
    async insertOneBook(req, res) {
        try {
            const result = await booksService.insertBook(req.body);
            return res.status(201).json(result);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async insertBatchBooks(req, res) {
        try {
            const result = await booksService.insertBatchBooks(req.body);
            return res.status(201).json(result);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async updateBookYear(req, res) {
        try {
            const title = req.params.title || "Future";
            const year = req.body && req.body.year !== undefined ? req.body.year : 2022;
            const result = await booksService.updateBookYear(title, year);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async findBookByTitle(req, res) {
        try {
            const title = req.query.title || "Brave New World";
            const result = await booksService.findBookByTitle(title);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async findBooksByYearRange(req, res) {
        try {
            const { from, to } = req.query;
            const result = await booksService.findBooksByYearRange(from, to);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async findBooksByGenre(req, res) {
        try {
            const genre = req.query.genre || "Science Fiction";
            const result = await booksService.findBooksByGenre(genre);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async findBooksSkipLimit(req, res) {
        try {
            const { skip, limit } = req.query;
            const result = await booksService.findBooksWithSkipLimit(skip, limit);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async findBooksWhereYearIsInteger(req, res) {
        try {
            const result = await booksService.findBooksWhereYearIsInteger();
            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async findBooksExcludingGenres(req, res) {
        try {
            const result = await booksService.findBooksExcludingGenres();
            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async deleteBooksBeforeYear(req, res) {
        try {
            const year = req.query.year || 2000;
            const result = await booksService.deleteBooksBeforeYear(year);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async aggregate1(req, res) {
        try {
            const result = await booksService.aggregateFilterAndSort();
            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async aggregate2(req, res) {
        try {
            const result = await booksService.aggregateProjectFields();
            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async aggregate3(req, res) {
        try {
            const result = await booksService.aggregateUnwindGenres();
            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async aggregate4(req, res) {
        try {
            const result = await booksService.aggregateJoinWithLogs();
            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new BooksController();
