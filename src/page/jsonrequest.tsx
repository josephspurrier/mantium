// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { m } from '../lib';
import { useEffect } from '../lib/useeffect';

interface PostResponse {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface UserResponse {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export const JSONRequest = (): JSX.Element => {
  const [getPost, setPost] = m.useState({} as PostResponse);
  const [getUser, setUser] = m.useState({} as UserResponse);

  // FIXME: This needs to run just once.
  useEffect(() => {
    m.request<PostResponse>({
      url: 'https://jsonplaceholder.typicode.com/posts/5',
    })
      .then((data: PostResponse) => {
        setPost(data);

        return m.request<UserResponse>({
          url: `https://jsonplaceholder.typicode.com/users/${data.userId}`,
        });
      })
      .then((udata: UserResponse) => {
        setUser(udata);
      })
      .catch((error: Response) => {
        console.warn(error);
      });
  }, []);

  return (
    <>
      <a title='home' href='#/'>
        Back
      </a>
      <h1>Title: {getPost.title}</h1>
      <h2>By: {getUser.name}</h2>
      <i>Post ID: {getPost.id}</i>
      <p>{getPost.body}</p>
    </>
  );
};
