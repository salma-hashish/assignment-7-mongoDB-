const collectionsService = require('./collections.services');

class CollectionsController {
    async createBooksCollection(req, res) {
        try {
            const result = await collectionsService.createBooksCollection();
            return res.status(201).json(result);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async createAuthorsCollection(req, res) {
        try {
            const result = await collectionsService.createAuthorsCollection(req.body);
            return res.status(201).json(result);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async createCappedLogs(req, res) {
        try {
            const result = await collectionsService.createCappedLogsCollection();
            return res.status(201).json(result);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async createBooksIndex(req, res) {
        try {
            const result = await collectionsService.createBooksTitleIndex();
            return res.status(200).send(result);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new CollectionsController();
