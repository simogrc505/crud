module.exports = {
  up(db) {
    return db.collection('books').createIndex({created_at: 1})
  },

  down(db) {
  }
};