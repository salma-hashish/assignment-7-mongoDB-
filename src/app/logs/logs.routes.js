const { Router } = require('express');
const logsController = require('./logs.controller');

const logsRouter = Router();

logsRouter.post('/', logsController.createLog.bind(logsController));
logsRouter.get('/', logsController.getLogs.bind(logsController));

module.exports = logsRouter;
