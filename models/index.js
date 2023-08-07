const User = require('./users');
const Posts = require('./posts');
const Comment = require('./comments');

User.hasMany(Posts, {
    foreignKey: 'post_userid',
    onDelete: 'CASCADE'
});

Posts.belongsTo(User, {
    foreignKey: 'post_userid'
});

User.hasMany(Comment, {
    foreignKey: 'comment_userid',
    onDelete: 'CASCADE'
});

Comment.belongsTo(User, {
    foreignKey: 'comment_userid'
});

Posts.hasMany(Comment, {
    foreignKey: 'comment_postid',
    onDelete: 'CASCADE'
});

Comment.belongsTo(Posts, {
    foreignKey: 'comment_postid'
});

module.exports = {User, Posts, Comment};