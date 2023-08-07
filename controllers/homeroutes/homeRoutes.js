const router = require('express').Router();
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
    try {
        // const postsraww = await Posts.findAll();
        // const posts = postData.map((post) => post.get({ plain: true }));
        // const postdata = [];
        // for(let i = 0; i < posts.length; i++) {
        //     var post = postsraw[i];
        //     var commentsraww = await Comments.findAll({ where: { comment_postid: post.id } });
        //     var comments = commentsraww.map((comment) => comment.get({ plain: true }));
        //     var combined = { post, commentsraw };
        //     postdata.push(combined);
        // }
        res.render('home', { layout: 'main' });
    } catch (err) {
        res.status(500).json(err);
    }    
});

router.get('/login', async (req, res) => {
    

module.exports = router;