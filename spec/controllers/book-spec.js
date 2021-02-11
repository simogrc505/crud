const R = require('ramda');
const request = require('supertest');
describe("Book action", () => {
  beforeEach(db_init);

  let app;

  beforeEach((done) => {
    app = require('../../src');
    done();
  });

  it("should list books", (done) => {
    request(app)
      .get('/v1/book')
      .set('Authorization', 'Bearer admin')
      .end((err, res) => {
      //  console.log(err, res.body)
        expect(R.map(R.pick(['title', 'author']), res.body)).toEqual([
          { title: 'Lo spettatore musicale', author: 'Piero Violante', },
          { title: 'E allora le foibe?', author: 'Eric Gobetti'},
          { title: 'Una rabbia semplice', author: 'Davide Longo' },
          { title: 'Contratto esempio', author: "L'appello", }
        ]);
        expect(R.prop('status', res)).toEqual(200)
        done();
      });
  })

  it("should get a book", (done) => {
    request(app)
      .get('/v1/book/0b3f8a0a-c288-455b-8f9b-acc720e23805')
      .set('Authorization', 'Bearer admin')
      .end((err, res) => {
        expect(R.pick(['title', 'author'])(res.body))
          .toEqual({ title: 'Lo spettatore musicale', author: 'Piero Violante', });
        expect(R.prop('status', res)).toEqual(200)
        done();
      });
  })

  it("should create new book", (done) => {
    let body = {
      "title": "Il libro di Talbott",
      "author": "Chuck Palahniuk",
      "genre": "Narrativa",
      "isbn": "9788804707950",
      "published": "2019-01-29",
    }
    request(app)
      .post('/v1/book')
      .set('Authorization', 'Bearer admin')
      .send(body)
      .end((err, res) => {
        // console.log(err, res.body)
        expect(R.pick(['title', 'author'], res.body)).toEqual(
          { title: "Il libro di Talbott", author: "Chuck Palahniuk" });
        expect(R.prop('status', res)).toEqual(201)
        done();
      });
  })

  it("should patch a book", (done) => {
    request(app)
      .patch('/v1/book/0b3f8a0a-c288-455b-8f9b-acc720e23805')
      .set('Authorization', 'Bearer admin')
      .send({
        "published": "2021-02-01",
      })
      .end((err, res) => {
        expect(R.pick(['title', 'author'], res.body))
          .toEqual({ title: 'Lo spettatore musicale', author: 'Piero Violante', })
        expect(R.prop('status', res)).toEqual(200)
        done();
      });
  })

  it("should delete a book", (done) => {
    request(app)
      .delete('/v1/book/0b3f8a0a-c288-455b-8f9b-acc720e23805')
      .set('Authorization', 'Bearer admin')
      .end((err, res) => {
        // console.log(res.body, res.error)
        expect(R.pick(['title'], res.body))
          .toEqual({ title: "Lo spettatore musicale" })
        expect(R.prop('status', res)).toEqual(200)
        done();
      });
  })

})