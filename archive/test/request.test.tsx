import { m } from '../lib';

interface PostResponse {
  userId: number;
  id: number;
  title: string;
  body: string;
}

test('request success', () => {
  const returnJSON = {
    body:
      'repudiandae veniam quaerat sunt sed alias aut fugiat sit autem sed est voluptatem omnis possimus esse voluptatibus quis est aut tenetur dolor neque',
    id: 5,
    title: 'nesciunt quas odio',
    userId: 1,
  };
  global.fetch = jest.fn().mockImplementationOnce(() =>
    Promise.resolve({
      ok: true,
      json: () => {
        return returnJSON;
      },
    }),
  );

  expect.assertions(1);

  return m
    .request<PostResponse>({
      url: 'https://jsonplaceholder.typicode.com/posts/5',
    })
    .then((data) => expect(data).toEqual(returnJSON));
});

test('request fail', () => {
  const returnJSON = {
    ok: false,
    json: () => {
      return { data: 'random' };
    },
  };
  global.fetch = jest
    .fn()
    .mockImplementationOnce(() => Promise.resolve(returnJSON));

  expect.assertions(1);

  return m
    .request<PostResponse>({
      url: 'https://jsonplaceholder.typicode.com/posts/5',
    })
    .catch((data) => expect(data).toEqual(returnJSON));
});
