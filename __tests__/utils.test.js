const { convertTimestamps, createArticleReference, formatComments } = require('../utils/data-manipulation')

describe('convertTimestamps()', () => {
    test('does not mutate the data given', () => {

        const testArticles = [{
            title: 'Student SUES Mitch!',
            topic: 'mitch',
            author: 'rogersop',
            body: 'We all love Mitch and his wonderful, unique typing style. However, the volume of his typing has ALLEGEDLY burst another students eardrums, and they are now suing for damages',
            created_at: 1163852514171
        },
        {
            title: 'UNCOVERED: catspiracy to bring down democracy',
            topic: 'cats',
            author: 'rogersop',
            body: 'Bastet walks amongst us, and the cats are taking arms!',
            created_at: 1037708514171
        }]

        convertTimestamps(testArticles)

        expect(testArticles).toEqual([{
            title: 'Student SUES Mitch!',
            topic: 'mitch',
            author: 'rogersop',
            body: 'We all love Mitch and his wonderful, unique typing style. However, the volume of his typing has ALLEGEDLY burst another students eardrums, and they are now suing for damages',
            created_at: 1163852514171
        },
        {
            title: 'UNCOVERED: catspiracy to bring down democracy',
            topic: 'cats',
            author: 'rogersop',
            body: 'Bastet walks amongst us, and the cats are taking arms!',
            created_at: 1037708514171
        }])
    });

    test('convert the timestamp property into javascript date', () => {
        const testArticles = [{
            title: 'Student SUES Mitch!',
            topic: 'mitch',
            author: 'rogersop',
            body: 'We all love Mitch and his wonderful, unique typing style. However, the volume of his typing has ALLEGEDLY burst another students eardrums, and they are now suing for damages',
            created_at: 1163852514171
        },
        {
            title: 'UNCOVERED: catspiracy to bring down democracy',
            topic: 'cats',
            author: 'rogersop',
            body: 'Bastet walks amongst us, and the cats are taking arms!',
            created_at: 1037708514171
        }]

        const expectedOutput = [{
            title: 'Student SUES Mitch!',
            topic: 'mitch',
            author: 'rogersop',
            body: 'We all love Mitch and his wonderful, unique typing style. However, the volume of his typing has ALLEGEDLY burst another students eardrums, and they are now suing for damages',
            created_at: 'Sat Nov 18 2006'
        },
        {
            title: 'UNCOVERED: catspiracy to bring down democracy',
            topic: 'cats',
            author: 'rogersop',
            body: 'Bastet walks amongst us, and the cats are taking arms!',
            created_at: 'Tue Nov 19 2002'
        }]

        expect(convertTimestamps(testArticles)).toEqual(expectedOutput)
    })
});

describe('createArticleReference', () => {
    test('does not mutate the data given', () => {
        const input = [{
            article_id: 3,
            title: 'Eight pug gifs that remind me of mitch',
            body: 'some gifs',
            votes: 0,
            topic: 'mitch',
            created_at: '2010-11-17T12:21:54.171Z',
            author: 'icellusedkars'
        },
        {
            article_id: 4,
            title: 'Student SUES Mitch!',
            body: 'We all love Mitch and his wonderful, unique typing style. However, the volume of his typing has ALLEGEDLY burst another students eardrums, and they are now suing for damages',
            votes: 0,
            topic: 'mitch',
            created_at: '2006-11-18T12:21:54.171Z',
            author: 'rogersop'
        }]

        createArticleReference(input)
        expect(input).toEqual([{
            article_id: 3,
            title: 'Eight pug gifs that remind me of mitch',
            body: 'some gifs',
            votes: 0,
            topic: 'mitch',
            created_at: '2010-11-17T12:21:54.171Z',
            author: 'icellusedkars'
        },
        {
            article_id: 4,
            title: 'Student SUES Mitch!',
            body: 'We all love Mitch and his wonderful, unique typing style. However, the volume of his typing has ALLEGEDLY burst another students eardrums, and they are now suing for damages',
            votes: 0,
            topic: 'mitch',
            created_at: '2006-11-18T12:21:54.171Z',
            author: 'rogersop'
        }]);
    });

    test('returns object with article reference', () => {
        const input = [{
            article_id: 3,
            title: 'Eight pug gifs that remind me of mitch',
            body: 'some gifs',
            votes: 0,
            topic: 'mitch',
            created_at: '2010-11-17T12:21:54.171Z',
            author: 'icellusedkars'
        },
        {
            article_id: 4,
            title: 'Student SUES Mitch!',
            body: 'We all love Mitch and his wonderful, unique typing style. However, the volume of his typing has ALLEGEDLY burst another students eardrums, and they are now suing for damages',
            votes: 0,
            topic: 'mitch',
            created_at: '2006-11-18T12:21:54.171Z',
            author: 'rogersop'
        }]
        expect(createArticleReference(input)).toEqual({ 'Eight pug gifs that remind me of mitch': 3, 'Student SUES Mitch!': 4 })
    })
})

describe('formatComments', () => {
    test('returns an empty array, if passed an empty array', () => {
        const comments = [];
        expect(formatComments(comments, {})).toEqual([]);
        expect(formatComments(comments, {})).not.toBe(comments);
    });

    test('converts created_by key to author', () => {
        const comments = [{ created_by: 'ant' }, { created_by: 'bee' }];
        const formattedComments = formatComments(comments, {});
        expect(formattedComments[0].author).toEqual('ant');
        expect(formattedComments[0].created_by).toBe(undefined);
        expect(formattedComments[1].author).toEqual('bee');
        expect(formattedComments[1].created_by).toBe(undefined);
    });

    test('replaces belongs_to value with appropriate id when passed a reference object', () => {
        const comments = [{ belongs_to: 'title1' }, { belongs_to: 'title2' }];
        const ref = { title1: 1, title2: 2 };
        const formattedComments = formatComments(comments, ref);
        expect(formattedComments[0].article_id).toEqual(1);
        expect(formattedComments[1].article_id).toEqual(2);
    });
});