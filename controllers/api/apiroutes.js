const router = require('express').Router();
const sequelize = require('../../config/connection');
const bcrypt = require('bcrypt');

const { User, Posts, Comment } = require('../../models');

router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { user_name: req.body.username } });
        if (!userData) {
            res.status(400).json({ message: 'Incorrect username or password, please try again' });
            return;
        }
        const validPassword = await userData.checkPassword(req.body.password);
        if (!validPassword) {
            res.status(401).json({ message: 'Incorrect username or password, please try again' });
            return;
        }
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            res.status(200).json({ user: userData, message: 'You are now logged in!' });
        });
    } catch (err) {
        res.status(400).json(err);
    }
});


router.post ('/newcomment', async (req, res) => {
    try {
        const commentData = await Comment.create({
            comment_content: req.body.comment_text,
            comment_postid: req.body.postid,
            comment_userid: req.session.user_id,
        });
        res.status(200).json(commentData);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/logout', async (req, res) => {
    if (req.session.logged_in) {    
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

router.post('/signup', async (req, res) => {
    try {
        const userData = await User.create({
            user_name: req.body.username,
            user_password: req.body.password,
        });
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            res.status(200).json({ user: userData, message: 'You are now logged in!' });
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/newpost', async (req, res) => {
    try {
        const postData = await Posts.create({
            post_title: req.body.post_title,
            post_content: req.body.post_content,
            post_userid: req.session.user_id,
        });
        res.status(200).json(postData);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.put('/edituser', async (req, res) => {
    try {
        const hashedpass = await bcrypt.hash(req.body.password, 10);
        const userData = await User.update({
            user_name: req.body.username,
            user_password: hashedpass,
        },
        {
            where: {
                id: req.session.user_id,
            },
        });
        res.status(200).json(userData);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.put('/editpost', async (req, res) => {
    try {
        const postData = await Posts.update({
            post_title: req.body.post_title,
            post_content: req.body.post_content,
        },
        {
            where: {
                id: req.body.postid,
            },
        });
        res.status(200).json(postData);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.delete('/deletepost', async (req, res) => {
    try {
        const postData = await Posts.destroy({
            where: {
                id: req.body.postid,
            },
        });
        res.status(200).json(postData);
    } catch (err) {
        res.status(400).json(err);
    }
});





module.exports = router;