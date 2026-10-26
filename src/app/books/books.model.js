const { Int32 } = require('mongodb');

function formatBookDoc(book) {
    const doc = { ...book };
    if (doc.year !== undefined && !isNaN(doc.year)) {
        const numYear = Number(doc.year);
        doc.year = Number.isInteger(numYear) ? new Int32(numYear) : numYear;
    }
    return doc;
}

const defaultSingleBook = {
    title: "Book1",
    author: "Ali",
    year: new Int32(1937),
    genres: ["Fantasy", "Adventure"]
};

const defaultBatchBooks = [
    {
        title: "Future",
        author: "George Orwell",
        year: new Int32(2020),
        genres: ["Science Fiction"]
    },
    {
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        year: new Int32(1960),
        genres: ["Classic", "Fiction"]
    },
    {
        title: "Brave New World",
        author: "Aldous Huxley",
        year: new Int32(2006),
        genres: ["Dystopian", "Science Fiction"]
    }
];

module.exports = {
    formatBookDoc,
    defaultSingleBook,
    defaultBatchBooks
};
