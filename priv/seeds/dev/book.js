const Book = require('../../../src/models/book')
exports.seed = function () {
  // Deletes ALL existing entries
  return Book.deleteMany()
    .then(function () {
      // Inserts seed entries
      return Book.create([
        {
          id: 1,
          title: "La disciplina di Penelope",
          author: "Gianrico Carofiglio",
          genre: "Thriller",
          isbn: "9788804726739",
          published: "2021/01/19",
          created_at: new Date(),
          edited_at: null
        },
        {
          id: 2,
          title: "Fattoria degli animali",
          author: "George Orwell",
          genre: "Narrativa",
          isbn: "9788807903793",
          published: "1945-08-17",
          created_at: new Date(),
          edited_at: null
        },
        {
          id: 3,
          title: "Lungo petalo di mare",
          author: "Isabel Allende",
          genre: "Narrativa",
          isbn: "9788807894442",
          published: "2021-01-07",
          created_at: new Date(),
          edited_at: null
        },
        {
          id: 4,
          title: "L'arte di legare le persone",
          author: "Paolo Milone",
          genre: "Autem",
          isbn: "9788806246372",
          published: "2021-01-19",
          created_at: new Date(),
          edited_at: null
        },
      ])
    })
}

