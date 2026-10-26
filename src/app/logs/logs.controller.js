const logsService = require('./logs.services');

class LogsController {
    async createLog(req, res) {
        try {
            const result = await logsService.createLog(req.body);
            return res.status(201).json(result);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async getLogs(req, res) {
        try {
            const result = await logsService.getAllLogs();
            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new LogsController();
