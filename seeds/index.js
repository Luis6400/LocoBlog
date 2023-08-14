const sequelize = require('../config/connection');
const { User, Posts, Comment } = require('../models');

const userData = require('./userseed.json');
const postData = require('./postseed.json');
const commentData = require('./commentseed.json');



const seedDatabase = async () => {
  await sequelize.sync({ force: false }); // Drop and re-create the tables

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const posts = await Posts.bulkCreate(postData);

  const comments = await Comment.bulkCreate(commentData);

  console.log('Database seeded successfully.');
};

seedDatabase();
