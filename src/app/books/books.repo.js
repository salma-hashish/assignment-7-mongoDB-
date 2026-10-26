const db = require('../../common/db/mongodb');

class BooksRepo {
    get collection() {
        return db.collection('books');
    }

    get logsCollection() {
        return db.collection('logs');
    }

    async insertOne(book) {
        return await this.collection.insertOne(book);
    }

    async insertMany(books) {
        return await this.collection.insertMany(books);
    }

    async updateYearByTitle(title, year) {
        return await this.collection.updateOne(
            { title: title },
            { $set: { year: year } }
        );
    }

    async findByTitle(title) {
        return await this.collection.findOne({ title: title });
    }

    async findByYearRange(from, to) {
        return await this.collection.find({
            year: { $gte: from, $lte: to }
        }).toArray();
    }

    async findByGenre(genre) {
        return await this.collection.find({
            genres: genre
        }).toArray();
    }

    async findWithSkipLimit(skip = 2, limit = 3) {
        return await this.collection.find()
            .sort({ year: -1 })
            .skip(skip)
            .limit(limit)
            .toArray();
    }

    async findWhereYearIsInteger() {
        return await this.collection.find({
            $or: [
                { year: { $type: "int" } },
                { year: { $type: 16 } },
                { year: { $type: "long" } },
                { year: { $type: 18 } }
            ]
        }).toArray();
    }

    async findExcludingGenres(excludedGenres = ["Horror", "Science Fiction"]) {
        return await this.collection.find({
            genres: { $nin: excludedGenres }
        }).toArray();
    }

    async deleteBeforeYear(year = 2000) {
        return await this.collection.deleteMany({
            year: { $lt: year }
        });
    }

    async aggregateFilterAndSort(minYear = 2000) {
        const pipeline = [
            {
                $match: {
                    year: { $gt: minYear }
                }
            },
            {
                $sort: {
                    year: -1
                }
            }
        ];
        return await this.collection.aggregate(pipeline).toArray();
    }

    async aggregateProjectFields(minYear = 2000) {
        const pipeline = [
            {
                $match: {
                    year: { $gt: minYear }
                }
            },
            {
                $project: {
                    _id: 0,
                    title: 1,
                    author: 1,
                    year: 1
                }
            }
        ];
        return await this.collection.aggregate(pipeline).toArray();
    }

    async aggregateUnwindGenres() {
        const pipeline = [
            {
                $unwind: "$genres"
            },
            {
                $project: {
                    _id: 0,
                    title: 1,
                    genres: 1
                }
            }
        ];
        return await this.collection.aggregate(pipeline).toArray();
    }

    async aggregateJoinWithLogs() {
        const pipeline = [
            {
                $lookup: {
                    from: "books",
                    let: { bookId: "$book_id" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $or: [
                                        { $eq: ["$_id", "$$bookId"] },
                                        { $eq: [{ $toString: "$_id" }, { $toString: "$$bookId" }] }
                                    ]
                                }
                            }
                        },
                        {
                            $project: {
                                _id: 0,
                                title: 1,
                                author: 1,
                                year: 1
                            }
                        }
                    ],
                    as: "book_details"
                }
            },
            {
                $project: {
                    _id: 0,
                    action: 1,
                    book_details: 1
                }
            }
        ];
        return await this.logsCollection.aggregate(pipeline).toArray();
    }
}

module.exports = new BooksRepo();
