const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];
const db = {};
let sequelize;

if (config.use_env_variable) {
 sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
 sequelize = new Sequelize(config.database, config.username, config.password, config);
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.User = require('./user')(sequelize, Sequelize);
db.Post = require('./post')(sequelize, Sequelize);
db.Like = require('./like')(sequelize, Sequelize);

// 1 : N 관계 User : Post
db.User.hasMany(db.Post, { onDelete: 'cascade' });
db.Post.belongsTo(db.User);

// M : N 관계 User : Post => Like
db.User.belongsToMany(db.Post, { through: 'Like', as: 'Liked' }); // User가 봤을때 Post는 Liked!
db.Post.belongsToMany(db.User, { through: 'Like', as: 'Liker' }); // Post가 봤을때 User는 Liker!

module.exports = db;