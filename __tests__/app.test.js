process.env.NODE_ENV = 'test'
const app = require('../app')
const request = require('supertest')
const connection = require('../db/connection');

describe('app', () => {
    beforeEach(() => connection.seed.run())
    afterAll(() => connection.destroy())



    describe('/topics', () => {
        test('GET - 200 - responds with all topics', () => {
            return request(app)
                .get('/api/topics')
                .expect(200)
                .then(res => {
                    expect(res.body.topics).toEqual(expect.any(Array))
                    expect(Object.keys(res.body.topics[0])).toEqual(expect.arrayContaining(['slug', 'description']))
                    expect(res.body.topics.length).toBe(3)
                })
        });
    });


    describe('/articles', () => {
        test('GET - 200 - responds with all articles', () => {
            return request(app)
                .get('/api/articles')
                .expect(200)
                .then(res => {
                    expect(res.body.articles).toEqual(expect.any(Array))
                    expect(Object.keys(res.body.articles[0])).toEqual(expect.arrayContaining(['article_id', 'title', 'body', 'votes', 'topic', 'created_at', 'author']))
                    expect(res.body.articles.length).toBe(12)
                })
        });
    });



});