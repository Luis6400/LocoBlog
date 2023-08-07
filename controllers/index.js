const router = require('express').Router();
const apiRoutes = require('./api/apiroutes');
const homeRoutes = require('./homeroutes/homeRoutes');

router.use('/', homeRoutes);

// router.use('/api', apiRoutes);

module.exports = router;