const request = require('supertest');
const app = require('../app');
const connection = require('../connection');

describe('Test routes', () => {
    beforeEach(done => connection.query('TRUNCATE bookmark', done));
    it('GET / sends "Hello World" as json', (done) => {
        request(app)
            .get('/')
            .expect(200)
            .expect('Content-type', /json/)
            .then(response => {
                const expected = { message: 'Hello World!' };
                expect(response.body).toEqual(expected);
                done();
            });
    });

    it('POST /bookmarks with missing fields gives a 422', (done) => {
        request(app)
            .post('/bookmarks')
            .send({})
            .expect(422)
            .expect('Content-type', /json/)
            .then(res => {
                const expected = { error: "required field(s) missing" };
                expect(res.body).toEqual(expected);
                done();
            })
    });

    it('POST /bookmarks successful with 201 and response is bookmark as json', (done) => {
        request(app)
            .post('/bookmarks')
            .send({ url: 'https://jestjs.io', title: 'jest' })
            .expect(201)
            .expect('Content-type', /json/)
            .then(res => {
                const expected = { id: expect.any(Number), url: 'https://jestjs.io', title: 'jest' };
                expect(res.body).toEqual(expected);
                done();
            })
            .catch(done);
    })

    describe('GET /bookmarks/:id', () => {
        const testBookmark = { url: 'https://nodejs.org/', title: 'Node.js' };
        beforeEach((done) => connection.query(
            'TRUNCATE bookmark', () => connection.query(
                'INSERT INTO bookmark SET ?', testBookmark, done
            )
        ));
        it('gives a 404 when id not found', (done) => {
            request(app)
                .get('/bookmarks/19')
                .expect(404)
                .expect('Content-type', /json/)
                .then(response => {
                    const expected = { error: 'Bookmark not found' };
                    expect(response.body).toEqual(expected);
                    done();
                });
        });
        it('gives a 200 and the correct object when is found', (done) => {
            request(app)
                .get('/bookmarks/1')
                .expect(200)
                .expect('Content-type', /json/)
                .then(res => {
                    const expected = { id: 1, url: testBookmark.url, title: testBookmark.title };
                    expect(res.body).toEqual(expected);
                    done();
                });
        });
    });

});

