const router = require('express').Router();
const apiRoutes = require('./api/apiroutes.js');
const homeRoutes = require('./homeroutes/home-routes.js');

router.use('/', homeRoutes);

router.use('/api', apiRoutes);

module.exports = router;