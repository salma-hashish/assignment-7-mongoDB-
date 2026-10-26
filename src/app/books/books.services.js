const booksRepo = require('./books.repo');
const { formatBookDoc, defaultSingleBook, defaultBatchBooks } = require('./books.model');
const { Int32 } = require('mongodb');

class BooksService {
    async insertBook(bookData) {
        const payload = (bookData && Object.keys(bookData).length > 0)
            ? formatBookDoc(bookData)
            : defaultSingleBook;
        return await booksRepo.insertOne(payload);
    }

    async insertBatchBooks(booksData) {
        let payload;
        if (Array.isArray(booksData) && booksData.length >= 3) {
            payload = booksData.map(formatBookDoc);
        } else if (Array.isArray(booksData) && booksData.length > 0) {
            payload = booksData.map(formatBookDoc);
        } else {
            payload = defaultBatchBooks;
        }
        return await booksRepo.insertMany(payload);
    }

    async updateBookYear(title, year) {
        const targetTitle = title || "Future";
        const newYear = year !== undefined ? Number(year) : 2022;
        const formattedYear = Number.isInteger(newYear) ? new Int32(newYear) : newYear;
        return await booksRepo.updateYearByTitle(targetTitle, formattedYear);
    }

    async findBookByTitle(title) {
        const targetTitle = title || "Brave New World";
        return await booksRepo.findByTitle(targetTitle);
    }

    async findBooksByYearRange(from, to) {
        const fromYear = from ? parseInt(from, 10) : 1990;
        const toYear = to ? parseInt(to, 10) : 2010;
        return await booksRepo.findByYearRange(fromYear, toYear);
    }

    async findBooksByGenre(genre) {
        const targetGenre = genre || "Science Fiction";
        return await booksRepo.findByGenre(targetGenre);
    }

    async findBooksWithSkipLimit(skip = 2, limit = 3) {
        return await booksRepo.findWithSkipLimit(Number(skip), Number(limit));
    }

    async findBooksWhereYearIsInteger() {
        return await booksRepo.findWhereYearIsInteger();
    }

    async findBooksExcludingGenres(genres) {
        const excluded = Array.isArray(genres) && genres.length > 0
            ? genres
            : ["Horror", "Science Fiction"];
        return await booksRepo.findExcludingGenres(excluded);
    }

    async deleteBooksBeforeYear(year) {
        const targetYear = year ? parseInt(year, 10) : 2000;
        return await booksRepo.deleteBeforeYear(targetYear);
    }

    async aggregateFilterAndSort() {
        return await booksRepo.aggregateFilterAndSort(2000);
    }

    async aggregateProjectFields() {
        return await booksRepo.aggregateProjectFields(2000);
    }

    async aggregateUnwindGenres() {
        return await booksRepo.aggregateUnwindGenres();
    }

    async aggregateJoinWithLogs() {
        return await booksRepo.aggregateJoinWithLogs();
    }
}

module.exports = new BooksService();
