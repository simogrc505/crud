const { compose, bind, prop, assoc, mergeDeepLeft, tap } = require('ramda')

const input = require('../input-filters/book')
const error = require('../views/error')
const config = require('config')
const repo = require('../models/repo/books')
const view = require('../views/book')
// AUTH
const auth = require('@wdalmut/mini-auth')
const forward = require('@wdalmut/forward-auth')

const { create_filters, append_headers } = require('../utilities/pagination')

const list = (req, res) => {
  let params = compose(
    mergeDeepLeft(req.query),
    assoc('page', 1),
    assoc('limit', 25),
    assoc('orderBy', 'created_at'),
    assoc('order', 'ASC')
  )({})

  return repo
    .list(params)
    .then(create_filters(params))// ASSOC OFFSET E LIMIT AL RISULTATO DA PASSARE AD APPEND HEADERS(PER SETTARE I VARI CUSTOM HEADERS)
    .then(tap(append_headers(res)))
    .then(prop('docs'))
    .then(compose(bind(res.json, res), view.many))
    .catch(error.generic(res))
}

const get = (req, res) => {
  return repo
    .get(req.params.id)
    .then(compose(bind(res.json, res), view.one))
    .catch(error.generic(res))
}
const create = (req, res) => {
  return repo.create(req.body)
    .then(compose(bind(res.status(201).json, res), view.one))
    .catch(error.generic(res))
}

const patch = (req, res) => {
  return repo.update(req.params.id, req.body)
    .then(compose(bind(res.json, res), view.one))
    .catch(error.generic(res))
}

const remove = (req, res) => {
  repo
    .delete(req.params.id)
    .then(compose(bind(res.json, res), view.one))
    .catch(error.generic(res))
}

let book = require('express').Router()

book.get('/',
  auth(forward(`${config.host_name}/v1/me`)),
  input.validate_books_input,
  list
)

book.get('/:id',
  auth(forward(`${config.host_name}/v1/me`)),
  get
)

book.post('/',
  auth(forward(`${config.host_name}/v1/me`)),
  input.validate_create_book_input,
  create
)

book.patch('/:id',
  auth(forward(`${config.host_name}/v1/me`)),
  input.validate_patch_book_input,
  patch
)

book.delete('/:id',
  auth(forward(`${config.host_name}/v1/me`)),
  remove
)

module.exports = book