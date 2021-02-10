const { pick, map } = require('ramda');

const fields = ['id', 'title', 'author', 'genre', 'isbn', 'published', 'created_at', 'edited_at']

module.exports = {
  one: pick(fields),
  many: map(pick(fields)),
}