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
        expect(R.map(R.pick(['title', 'author']), res.body)).toEqual([
          { title: "La disciplina di Penelope", author: "Gianrico Carofiglio" },
          { title: "Fattoria degli animali", author: "George Orwell" },
          { title: "Lungo petalo di mare", author: "Isabel Allende" },
          { title: "L'arte di legare le persone", author: "Paolo Milone" }
        ]);
        expect(R.prop('status', res)).toEqual(200)
        done();
      });
  })

  it("should get a book", (done) => {
    request(app)
      .get('/v1/book/1')
      .set('Authorization', 'Bearer admin')
      .end((err, res) => {
        expect(R.pick(['title', 'author'])(res.body))
          .toEqual({ title: "La disciplina di Penelope", author: "Gianrico Carofiglio" });
        expect(R.prop('status', res)).toEqual(200)
        done();
      });
  })

  it("should create new book", (done) => {
    let body = {
      "title": "Persone normali",
      "author": "Sally Rooney",
      "genre": "Narrativa",
      "published": "9788806245740",
      "isbn": "2020-06-03"
    }
    request(app)
      .post('/v1/book')
      .set('Authorization', 'Bearer admin')
      .send(body)
      .end((err, res) => {
        expect(R.pick(['code', 'status'], res.body)).toEqual(
          { title: "Persone normali", author: "Sally Rooney" });
        expect(R.prop('status', res)).toEqual(201)
        done();
      });
  })

  it("should patch a book", (done) => {
    request(app)
      .patch('/v1/book/1')
      .set('Authorization', 'Bearer admin')
      .send({
        "genre": 'Narrativa',
      })
      .end((err, res) => {
        expect(R.pick(['code', 'status', 'genre'], res.body))
          .toEqual({ title: "La disciplina di Penelope", author: "Gianrico Carofiglio", genre: 'Narrativa' })
        expect(R.prop('status', res)).toEqual(200)
        done();
      });
  })

  it("should delete a book", (done) => {
    request(app)
      .delete('/v1/book/1')
      .set('Authorization', 'Bearer admin')
      .end((err, res) => {
        // console.log(res.body, res.error)
        expect(R.pick(['title'], res.body))
          .toEqual({ title: "La disciplina di Penelope" })
        expect(R.prop('status', res)).toEqual(200)
        done();
      });
  })

})
