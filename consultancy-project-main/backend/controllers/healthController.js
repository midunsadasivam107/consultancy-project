const { env } = require('../config/appConfig');

const startedAt = new Date().toISOString();

function getHealth(req, res) {
  res.json({
    status: 'ok',
    env,
    startedAt,
    timestamp: new Date().toISOString(),
  });
}

module.exports = { getHealth };
