const db = require('../../common/db/mongodb');
const { booksValidationSchema, cappedLogsOptions, booksTitleIndex } = require('./collections.model');

class CollectionsRepo {
    async createBooksCollection() {
        try {
            await db.createCollection("books", {
                validator: booksValidationSchema
            });
            return { ok: 1 };
        } catch (error) {
            if (error.codeName === 'NamespaceExists' || error.code === 48) {
                await db.command({
                    collMod: "books",
                    validator: booksValidationSchema
                });
                return { ok: 1 };
            }
            throw error;
        }
    }

    async createImplicitAuthorsCollection(data) {
        const result = await db.collection("authors").insertOne(data);
        return result;
    }

    async createCappedLogsCollection() {
        try {
            await db.createCollection("logs", cappedLogsOptions);
            return { ok: 1 };
        } catch (error) {
            if (error.codeName === 'NamespaceExists' || error.code === 48) {
                await db.collection("logs").drop();
                await db.createCollection("logs", cappedLogsOptions);
                return { ok: 1 };
            }
            throw error;
        }
    }

    async createBooksTitleIndex() {
        const indexName = await db.collection("books").createIndex(booksTitleIndex);
        return indexName;
    }
}

module.exports = new CollectionsRepo();
