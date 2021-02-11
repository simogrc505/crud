const config = require('config');
const knex = require('knex')(config.db);
const mock = require('mock-require')

global.db_init = (done) => {
  return knex.seed
    .run().then(() => {
      return done();
    }).catch((err) => {
      fail(err)
      done();
    });
}

mock('../../src/middleware/auth', (token) => {
  return Promise.resolve({
    id: 1,
    role: "ROLE_ADMIN",
    active: true,
    token: 'admin',
    firstname: 'walter',
    lastname: 'dal mut',
    username: 'walter.dalmut@corley.it'
  });
})


