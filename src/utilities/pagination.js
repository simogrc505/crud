const { compose, curry, assoc, length } = require('ramda')

const append_headers = curry((res, params) => {
  return res
    .set('x-total', params.total)
    .set('x-page', params.page)
    .set('x-count', length(params.docs))
    .set('x-limit', params.limit)
    .set('x-from', ((params.page - 1) * params.limit) + 1)
    .set('x-to', ((params.page - 1) * params.limit) + params.docs.length + 1)
})

const create_filters = curry((params, results) => {
  return compose(
    assoc('offset', (parseInt(params.page) - 1) * parseInt(params.limit)),
    assoc('limit', parseInt(params.limit)),
    assoc('page', parseInt(params.page))

  )(results)
})

module.exports = {
  append_headers,
  create_filters,
}