const sequelize = require('sequelize');
const { User, Posts, Comment } = require('../models');


module.exports = {

getUsername: (id) => {
    User.findOne({
        where: {
            id: id
        }
    }).then((user) => {
        return user.user_name;
    }
    )
},

getMainFeed: async (postid) => {
    const postsraw = await Posts.findAll();
    const posts = postsraw.map((post) => post.get({ plain: true }));
    const postdata = [];
    for(let i = 0; i < posts.length; i++) {
        var post = posts[i];
        var user = await User.findOne({ where: { id: post.post_userid } });
        post.username = user.user_name;
        var commentsraww = await Comment.findAll({ where: { comment_postid: post.id } });
        var comments = commentsraww.map((comment) => comment.get({ plain: true }));
        for(let j = 0; j < comments.length; j++) {
            var comment = comments[j];
            var userc = await User.findOne({ where: { id: comment.comment_userid } });
            comment.username = userc.user_name;
        }
        
        var combined = { post, comments };
        postdata.push(combined);
    }
    
    return postdata;
    

},

getMyFeed: async (userid) => {
    const postsraw = await Posts.findAll({ where: { post_userid: userid } });
    const posts = postsraw.map((post) => post.get({ plain: true }));
    const postdata = [];
    for(let i = 0; i < posts.length; i++) {
        var post = posts[i];
        var user = await User.findOne({ where: { id: post.post_userid } });
        post.username = user.user_name;
        var commentsraww = await Comment.findAll({ where: { comment_postid: post.id } });
        var comments = commentsraww.map((comment) => comment.get({ plain: true }));
        for(let j = 0; j < comments.length; j++) {
            var comment = comments[j];
            var userc = await User.findOne({ where: { id: comment.comment_userid } });
            comment.username = userc.user_name;
        }
        
        var combined = { post, comments };
        postdata.push(combined);
    }
    
    return postdata;

},

getOnePost: async (postid) => {
    var postdata = [];
    var post = await Posts.findOne({ where: { id: postid } });
    post = post.get({ plain: true });
    var user = await User.findOne({ where: { id: post.post_userid } });
        post.username = user.user_name;
        var commentsraww = await Comment.findAll({ where: { comment_postid: post.id } });
        var comments = commentsraww.map((comment) => comment.get({ plain: true }));
        for(let j = 0; j < comments.length; j++) {
            var comment = comments[j];
            var userc = await User.findOne({ where: { id: comment.comment_userid } });
            comment.username = userc.user_name;
        }
        
        var combined = { post, comments };
        
    return combined;
},


};

