const logsRepo = require('./logs.repo');
const { formatLogDoc, defaultLog } = require('./logs.model');

class LogsService {
    async createLog(logData) {
        const payload = (logData && Object.keys(logData).length > 0)
            ? formatLogDoc(logData)
            : defaultLog;
        return await logsRepo.insertOne(payload);
    }

    async getAllLogs() {
        return await logsRepo.find({});
    }
}

module.exports = new LogsService();
