const { compose, bind, tap, prop, assoc, mergeDeepLeft } = require('ramda')

const input = require('../input-filters/book')
const error = require('../views/error')
const view = require('../views/book')
const config = require('config')

// AUTH
const auth = require('@wdalmut/mini-auth')
const forward = require('@wdalmut/forward-auth')

// UTILITIES

const {get_books, get_book, create_book, update_book, delete_book} = require('../microservices/books')

const list = (req, res) => {
  return get_books()
    .then(compose(bind(res.json, res), view.many))
    .catch(error.generic(res))
}

const get = (req, res) => {
  return get_book(req.params.id)
    .then(compose(bind(res.json, res), view.one))
    .catch(error.generic(res))
}

const create = (req, res) => {
  return create_book(req.body)
    .then(compose(bind(res.status(201).json, res), view.one))
    .catch(error.generic(res))
}

const patch = (req, res) => {
  return update_book(req.params.id, req.body)
    .then(compose(bind(res.json, res), view.one))
    .catch(error.generic(res))
}

const remove = (req, res) => {
  return delete_book(req.params.id)
    .then(compose(bind(res.json, res), view.one))
    .catch(error.generic(res))
}

let books = require('express').Router()

books.get('/',
  auth(forward(`${config.host_name}/v1/me`)),
  input.validate_books_input,
  list
)

books.get('/:id',
  auth(forward(`${config.host_name}/v1/me`)),
  get
)

books.post('/',
  auth(forward(`${config.host_name}/v1/me`)),
  input.validate_create_book_input,
  create
)

books.patch('/:id',
  auth(forward(`${config.host_name}/v1/me`)),
  input.validate_patch_book_input,
  patch
)

books.delete('/:id',
  auth(forward(`${config.host_name}/v1/me`)),
  remove
)

module.exports = books