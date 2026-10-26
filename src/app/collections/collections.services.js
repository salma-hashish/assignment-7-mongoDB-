const collectionsRepo = require('./collections.repo');

class CollectionsService {
    async createBooksCollection() {
        return await collectionsRepo.createBooksCollection();
    }

    async createAuthorsCollection(authorData) {
        const payload = (authorData && Object.keys(authorData).length > 0)
            ? authorData
            : { name: "Author1", nationality: "British" };
        return await collectionsRepo.createImplicitAuthorsCollection(payload);
    }

    async createCappedLogsCollection() {
        return await collectionsRepo.createCappedLogsCollection();
    }

    async createBooksTitleIndex() {
        return await collectionsRepo.createBooksTitleIndex();
    }
}

module.exports = new CollectionsService();
