module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Post', {
    likeCnt: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    contents: {
      type: DataTypes.STRING(100),
      allowNull: false
    },

  }, {
    freezeTableName: true,
    timestamps: true,
    updatedAt: false
  });
};