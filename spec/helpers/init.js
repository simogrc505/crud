const config = require('config')
const data = require('../../priv/seeds/test/book')


const mock = require('mock-require')

const user_role_admin = {
  id: '406a548e-9bdf-4f57-a9ba-42a727d72040',
  username: 'admin@gmail.com',
  role: 'ROLE_ADMIN',
}

const user_role_superadmin = {
  id: 'c06e4daf-9f9f-4502-977d-20a3a3c2d5b2',
  username: 'luca.bianchi@corley.it',
  role: 'ROLE_SUPERADMIN',
}

mock('@wdalmut/forward-auth', (auth) => (req) => {
  const token = (req.headers.authorization).split(' ')[1]
  if (token === 'admin') {
    return Promise.resolve(user_role_admin)
  }

  if (token === 'superadmin') {
    return Promise.resolve(user_role_superadmin)
  }
  if (!token) {
    return Promise.reject({error: 401, status: "Unauthorized"})
  }
})

global.db_init = (done) => {
  return data.seed().then(() => done()).catch((err) => {
    if (err) {
      throw err
    }

    done()
  })
}