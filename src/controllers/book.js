const { compose, bind, tap, prop, assoc, mergeDeepLeft } = require('ramda')

const repo = require('../models/repo/books')
const input = require('../input-filters/books')
const error = require('../views/error')
const view = require('../views/book')

// AUTH
const auth = require('@wdalmut/mini-auth')
const token = require('@wdalmut/token-auth')
const me = require('../middleware/auth')

// UTILITIES
const { create_filters, append_headers, knex_adapter } = require('../utilities/paginate-library')

const list = (req, res) => {
  let params = create_filters(Object.assign({}, {
    page: 1,
    limit: 20,
    orderBy: "id",
    order: "ASC",
  }, req.query));

  knex_adapter(repo.list(params), repo.count(params), params)
    .then(append_headers(res)) // header di paginazione dei dati
    .then(prop('results')) // propago solo la pagina di lavoro
    .then(compose(bind(res.json, res), view.many))
    .catch(error.generic(res))
}

const get = (req, res) => {
  repo
    .get(req.params.id)
    .then(compose(bind(res.json, res), view.one))
    .catch(error.generic(res))
}

const create = (req, res) => {
  req.body.created_at = new Date()
  repo
    .create(req.body)
    .then(compose(bind(res.status(201).json, res), view.one))
    .catch(error.generic(res))
}

const patch = (req, res) => {
  repo
    .update(req.params.id, req.body)
    .then(compose(bind(res.json, res), view.one))
    .catch(error.generic(res))
}

const remove = (req, res) => {
  repo
    .delete(req.params.id, req.body)
    .then(compose(bind(res.json, res), view.one))
    .catch(error.generic(res))
}

let books = require('express').Router()

books.get('/',
  auth(me),
  input.list_books,
  list
)

books.get('/:id',
  auth(me),
  get
)

books.post('/',
  auth(me),
 input.create_book,
  create
)

books.patch('/:id',
  auth(me),
  input.patch_book,
  patch
)

books.delete('/:id',
  auth(me),
  remove
)

module.exports = books
