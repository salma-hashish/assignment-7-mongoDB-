const db = require('../../common/db/mongodb');

class LogsRepo {
    get collection() {
        return db.collection('logs');
    }

    async insertOne(log) {
        return await this.collection.insertOne(log);
    }

    async find(filter = {}) {
        return await this.collection.find(filter).toArray();
    }
}

module.exports = new LogsRepo();
