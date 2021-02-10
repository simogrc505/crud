const request = require('request')
const config = require('config')

module.exports = {
  get_books: () => new Promise((resolve, reject) => {
    request({
      uri: `${config.host_name}`,
      method: 'GET',
      json: true,
    }, (err, response) => {

      if (err || response.statusCode >= 400) {
        return reject(err || response.body)
      }

      return resolve(response)
    })
  }),

  get_book: (id) => new Promise((resolve, reject) => {
    request({
      uri: `${config.host_name}/${id}`,
      method: 'GET',
      json: true,
      qs: qs
    }, (err, response) => {
      if (err || response.statusCode >= 400) {
        return reject(err || response.body)
      }

      return resolve(response)
    })
  }),

  create_book: (body) => new Promise((resolve, reject) => {
    request({
      uri: config.host_name,
      method: 'POST',
      json: true,
      body: body
    }, (err, response) => {
    
      if (err || response.statusCode >= 400) {
        return reject(err || response.body)
      }

      return resolve(response.body)
    })
  }),

  update_book: (id, body) => new Promise((resolve, reject) => {
    request({
      uri: `${config.host_name}/${id}`,
      method: 'PATCH',
      json: true,
      body: body
    }, (err, response) => {
      
      if (err || response.statusCode >= 400) {
        return reject(err || response.body)
      }

      return resolve(response.body)
    })
  }),

  delete_book: (id) => new Promise((resolve, reject) => {
    request({
      uri: `${config.host_name}/${id}`,
      method: 'DELETE',
      json: true,
    }, (err, response) => {
      
      if (err || response.statusCode >= 400) {
        return reject(err || response.body)
      }

      return resolve(response.body)
    })
  })

}