process.env.NODE_ENV = 'test'
const app = require('../app')
const request = require('supertest')
const connection = require('../db/connection');

describe('app', () => {
    beforeEach(() => connection.seed.run())
    afterAll(() => connection.destroy())

    describe('users/:username', () => {
        test('GET - 200 - responds user data corresponding to username', async () => {
            const expectedUser = {
                username: 'lurker',
                name: 'do_nothing',
                avatar_url:
                    'https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png',
            }

            const { body } = await request(app)
                .get('/api/users/lurker')
                .expect(200)
            expect(body.user).toEqual(expectedUser)
        });
    });

    describe('/topics', () => {
        test('GET - 200 - responds with all topics', async () => {
            const { body } = await request(app)
                .get('/api/topics')
                .expect(200)
            expect(body.topics).toEqual(expect.any(Array))
            expect(Object.keys(body.topics[0])).toEqual(expect.arrayContaining(['slug', 'description']))
            expect(body.topics.length).toBe(3)
        });
    });


    describe('/articles', () => {
        test('GET - 200 - responds with all articles', async () => {
            const { body } = await request(app)
                .get('/api/articles')
                .expect(200)
            expect(body.articles).toEqual(expect.any(Array))
            expect(Object.keys(body.articles[0])).toEqual(expect.arrayContaining(['article_id', 'title', 'body', 'votes', 'topic', 'created_at', 'author']))
            expect(body.articles.length).toBe(12)
        });


    });

    describe('/articles/:article_id', () => {
        test('GET - 200 - responds with article corresponding to article ID given', async () => {
            const { body } = await request(app)
                .get('/api/articles/1')
                .expect(200)
            expect(Object.keys(body.article)).toEqual(expect.arrayContaining(['article_id', 'title', 'body', 'votes', 'created_at', 'author', 'comment_count']))
            expect(body.article.article_id).toBe(1)
        });

        test('PATCH - 202 - adjusts votes property by the inc_votes value given', async () => {
            const { body } = await request(app)
                .patch('/api/articles/1')
                .send({ inc_votes: 20 })
                .expect(202)
            expect(body.article.votes).toBe(120);
        });

        test('DELETE - 202 - deletes correct article and responds with deleted message', async () => {
            const { body } = await request(app)
                .delete('/api/articles/1')
                .expect(202)
            expect(body.msg).toEqual('"Living in the shadow of a great man" was deleted')

            const test = await request(app)
                .get('/api/articles/1')
                .expect(404)
            expect(test.body.msg).toEqual('Not found')

        })
    });

    describe('/articles/:article_id/comments', () => {
        test.only('GET - 200 - gets all comments for the article given by article ID', async () => {
            const { body } = await request(app)
                .get('/api/articles/1/comments')
                .expect(200)
            expect(body.comments[0].article_id).toBe(1)
            expect(Object.keys(body.comments[0])).toEqual(expect.arrayContaining(['comment_id', 'author', 'article_id', 'votes', 'created_at', 'body']))
        });
    });
});