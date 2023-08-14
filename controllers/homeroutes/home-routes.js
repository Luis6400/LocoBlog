const router = require('express').Router();
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');
const {Posts, Comment } =  require('../../models')
const { getUsername, getMainFeed, getMyFeed, getOnePost } = require('../../utils/helpers');

router.get('/', async (req, res) => {
    try {
        const postdata = await getMainFeed();
        postdata.reverse();
        const logcheck = req.session.logged_in;
        
        res.render('home', {logged_in: req.session.logged_in, layout: 'main', postdata });
    } catch (err) {
        res.status(500).json(err);
    }    
});

router.get('/login', async (req, res) => {
    try {
        res.render('login', {logged_in: req.session.logged_in, layout: 'main'});
    } catch (err) {
        res.status(500).json(err);
    }    
})

router.get('/signup', async (req, res) => {
    try {
        res.render('signup', {logged_in: req.session.logged_in, layout: 'main'});
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get('/newpost', withAuth, async (req, res) => {
    try {
        res.render('post', {logged_in: req.session.logged_in, layout: 'main'});
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get('/dashboard', withAuth, async (req, res) => {
    try {
        getMyFeed(req.session.user_id)
        .then((postdata) => {
            res.render('dash', {logged_in: req.session.logged_in, layout: 'main', postdata});
        })
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get('/settings', withAuth, async (req, res) => {
    try {
        res.render('settings', {logged_in: req.session.logged_in, layout: 'main'});
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get('/post/:id', async (req, res) => {
    try {
        
        getOnePost(req.params.id)
        .then((postdata) => {
            if(postdata.post.post_userid === req.session.user_id) {
                postdata.post.post_mine = true;
            }
            res.render('onepost', {logged_in: req.session.logged_in,layout: 'main', postdata});
            
        })
    } catch (err) {
        res.status(500).json(err);
    }
})



    

module.exports = router;