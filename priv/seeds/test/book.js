exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('books').del()
    .then(function () {
      // Inserts seed entries
      return knex('books').insert([
        {
          id: 1,
          title: 'Lo spettatore musicale',
          author: 'Piero Violante',
          genre: 'Arti e spettacolo',
          isbn: '9788838940309',
          published: '2021-02-11',
          created_at: new Date(),
          edited_at: null
        },
        {
          id: 2,
          title: 'E allora le foibe?',
          author: 'Eric Gobetti',
          genre: 'Società, politica e comunicazione',
          isbn: '9788858141120',
          published: '2021-01-14',
          created_at: new Date(),
          edited_at: null
        },
        {
          id: 3,
          title: 'Una rabbia semplice',
          author: 'Davide Longo',
          genre: 'Giallo',
          isbn: '9788806248147',
          published: '2021-01-26',
          created_at: new Date(),
          edited_at: null
        },
        {
          id: 4,
          title: 'Contratto esempio',
          author: "L'appello",
          genre: 'Narrativa',
          isbn: '9788804734246',
          published: '2020-11-03',
          created_at: new Date(),
          edited_at: null
        },
      ])
    })
}

