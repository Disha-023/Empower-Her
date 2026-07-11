let activeUsers = [];

module.exports = {
  addActiveUser: (userId) => {
    if (!activeUsers.includes(userId)) activeUsers.push(userId);
  },
  removeActiveUser: (userId) => {
    activeUsers = activeUsers.filter(id => id !== userId);
  },
  getActiveUsersCount: () => activeUsers.length
};
