const router = require('express').Router();
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
    try {
        res.render('home', { layout: 'main' });
    } catch (err) {
        res.status(500).json(err);
    }    
});

module.exports = router;