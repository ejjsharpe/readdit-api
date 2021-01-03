process.env.NODE_ENV = 'test'
const app = require('../app')
const request = require('supertest')
const connection = require('../db/connection');

describe('app', () => {
    beforeEach(() => connection.seed.run())
    afterAll(() => connection.destroy())

    describe('/api', () => {
        const expectedResponse = {
            GET: [
                '/api/users',
                '/api/users/:username',
                '/api/topics',
                '/api/articles',
                '/api/articles/:article_id',
                '/api/articles/:article_id/comments'
            ],
            PATCH: ['/api/articles/:article_id', '/api/comments/:comment_id'],
            POST: [
                '/api/topics',
                '/api/articles',
                '/api/users',
                '/api/articles/:article_id/comments'
            ],
            DELETE: ['/articles/:article_id', '/comments/:comment_id']
        }

        test.only('GET - 200 - sends a list of all endpoints', async () => {
            const { body } = await request(app)
                .get('/api')
                .expect(200)
            expect(body['reddit-clone-api']).toEqual(expectedResponse)
        })
    });

    describe('/users', () => {
        test('GET - 200 - responds with an array of all users', async () => {
            const { body } = await request(app)
                .get('/api/users')
                .expect(200)
            expect(Object.keys(body.users[0])).toEqual(expect.arrayContaining(['username', 'name', 'avatar_url']))
            expect(body.users.length).toBe(4)
        })

        test('POST - 201 - responds with added user', async () => {
            const userToAdd = {
                username: 'superman69',
                name: 'john',
                avatar_url:
                    'https://avatarfiles.alphacoders.com/170/thumb-170221.png',
            }
            const { body } = await request(app)
                .post('/api/users')
                .send(userToAdd)
                .expect(201)
            expect(body.user).toEqual(userToAdd)
        })

        test('POST - 400 - when a notNullable field is not provided', async () => {
            const userToAdd = {
                username: 'shekky222',
                avatar_url:
                    'https://avatarfiles.alphacoders.com/170/thumb-170221.png',
            }
            const { body } = await request(app)
                .post('/api/users')
                .send(userToAdd)
                .expect(400)
            expect(body.msg).toEqual('Bad request')
        })

    });

    describe('/users/:username', () => {
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

        test('GET - 404 - when no user exists with given username', async () => {
            const { body } = await request(app)
                .get('/api/users/snakedude299')
                .expect(404)
            expect(body.msg).toEqual('Not found')
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

        test('POST - 201 - responds with the created topic', async () => {
            const { body } = await request(app)
                .post('/api/topics')
                .send({ description: 'a discussion about the latest in video gaming', slug: 'gaming' })
                .expect(201)
            expect(body.topic).toEqual({ description: 'a discussion about the latest in video gaming', slug: 'gaming' })
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

        test('GET - 200 - defaults to sort_by=created at and order=desc', async () => {
            const { body } = await request(app)
                .get('/api/articles')
                .expect(200)
            expect(body.articles).toBeSortedBy('created_at', { descending: true })
        });

        test('GET - 200 - accepts query for sort_by', async () => {
            const { body } = await request(app)
                .get('/api/articles?sort_by=author')
                .expect(200)
            expect(body.articles).toBeSortedBy('author', { descending: true })
        });

        test('GET - 200 - accepts query for order', async () => {
            const { body } = await request(app)
                .get('/api/articles?order=asc')
                .expect(200)
            expect(body.articles).toBeSortedBy('created_at', { ascending: true })
        });

        test('GET - 200 - accepts limit query', async () => {
            const { body } = await request(app)
                .get('/api/articles?limit=5')
                .expect(200)
            expect(body.articles.length).toBe(5)
        });

        test('GET - 400 - when invalid sort_by query is given', async () => {
            const { body } = await request(app)
                .get('/api/articles?sort_by=sausages')
                .expect(400)
            expect(body.msg).toBe('Bad request')
        });

        test('GET - 200 - ignores order query if invalid query is given', async () => {
            const { body } = await request(app)
                .get('/api/articles?order=sausages')
                .expect(200)
            expect(body.articles).toBeSortedBy('created_at', { ascending: true })
        });

        test('POST - 201 - responds with created article and success message', async () => {
            const articleToPost = {
                title: 'The Life and Times of Mittens',
                topic: 'cats',
                author: 'butter_bridge',
                body: 'meow',
                votes: 100
            }
            const { body } = await request(app)
                .post('/api/articles')
                .send(articleToPost)
                .expect(201)
            expect(Object.keys(body.article)).toEqual(expect.arrayContaining(['title', 'topic', 'author', 'body', 'created_at', 'votes']))
            expect(body.article.title).toBe('The Life and Times of Mittens')
        })


    });

    describe('/articles/:article_id', () => {
        test('GET - 200 - responds with article corresponding to article ID given', async () => {
            const { body } = await request(app)
                .get('/api/articles/1')
                .expect(200)
            expect(Object.keys(body.article)).toEqual(expect.arrayContaining(['article_id', 'title', 'body', 'votes', 'created_at', 'author', 'comment_count']))
            expect(body.article.article_id).toBe(1)
        });

        test('GET - 200 - response has comment_count prop with correct number of comments', async () => {
            const { body } = await request(app)
                .get('/api/articles/1')
                .expect(200)
            expect(body.article.comment_count).toBe('13')
        });

        test('GET - 404 - responds with 404 if theres is no article with given ID', async () => {
            const { body } = await request(app)
                .get('/api/articles/399')
                .expect(404)
            expect(body.msg).toBe('Not found')
        });

        test('GET - 400 - responds with 400 if article_id given is invalid', async () => {
            const { body } = await request(app)
                .get('/api/articles/elliot')
                .expect(400)
            expect(body.msg).toBe('Bad request')
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
        test('GET - 200 - gets all comments for the article given by article ID', async () => {
            const { body } = await request(app)
                .get('/api/articles/1/comments')
                .expect(200)
            expect(body.comments[0].article_id).toBe(1)
            expect(Object.keys(body.comments[0])).toEqual(expect.arrayContaining(['comment_id', 'author', 'article_id', 'votes', 'created_at', 'body']))
        });

        test('GET - 200 - defaults to sorted_by=created_at and order=descending', async () => {
            const { body } = await request(app)
                .get('/api/articles/1/comments')
                .expect(200)
            expect(body.comments).toBeSortedBy('created_at', { descending: true })
        });

        test('GET - 200 - accepts query for sort_by', async () => {
            const { body } = await request(app)
                .get('/api/articles/1/comments?sort_by=votes')
                .expect(200)
            expect(body.comments[0].article_id).toBe(1)
            expect(Object.keys(body.comments[0])).toEqual(expect.arrayContaining(['comment_id', 'author', 'article_id', 'votes', 'created_at', 'body']))
            expect(body.comments).toBeSortedBy('votes', { descending: true })
        });

        test('GET - 200 - accepts query for order', async () => {
            const { body } = await request(app)
                .get('/api/articles/1/comments?order=asc')
                .expect(200)
            expect(body.comments[0].article_id).toBe(1)
            expect(Object.keys(body.comments[0])).toEqual(expect.arrayContaining(['comment_id', 'author', 'article_id', 'votes', 'created_at', 'body']))
            expect(body.comments).toBeSortedBy('created_at', { ascending: true })
        });

        test('POST - 201 - creates comment for the article with corresponding articleID', async () => {
            const { body } = await request(app)
                .post('/api/articles/2/comments')
                .send({ username: 'butter_bridge', body: 'great read!' })
                .expect(201)
            expect(body.comment.body).toBe('great read!')
            expect(body.comment.article_id).toBe(2)
            expect(body.comment.created_at).not.toBe(null)
            expect(body.comment.author).toBe('butter_bridge')

        })
    });

    describe('/comments/:comment_id', () => {
        test('PATCH - 202 - can alter votes prop by the inc_votes value given', async () => {
            const { body } = await request(app)
                .patch('/api/comments/1')
                .send({ inc_votes: -20 })
                .expect(202)
            expect(body.comment.votes).toBe(0)
        });

        test('DELETE - 204 - deletes property and returng deletion success message', async () => {
            await request(app)
                .delete('/api/comments/1')
                .expect(204)
        });
    });
});