const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({
  passError: true,
})

module.exports = {
  validate_books_input: validator.query(Joi.object({
    limit: Joi.number().integer().min(1).default(25).max(1000),
    page: Joi.number().integer().min(0).default(1),
    orderBy: Joi.string(),
    order: Joi.string(),
    published: Joi.date(),
  })),
  validate_create_book_input: validator.body(Joi.object({
    title: Joi.string().required(),
    author: Joi.string().required(),
    genre: Joi.string(),
    isbn: Joi.string(),
    published: Joi.string(),
  })),
  validate_patch_book_input: validator.body(Joi.object({
    title: Joi.string(),
    author: Joi.string(),
    genre: Joi.string(),
    isbn: Joi.string(),
    published: Joi.string(),
  })),
};
