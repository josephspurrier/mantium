import { useState } from '@/lib/state';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { z } from '@/lib/z';

interface PostResponse {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface UserReponse {
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

let alreadyRan = false;

const useEffect = (f: () => void, when: string[] = []) => {
  if (when.length === 0) {
    if (!alreadyRan) {
      alreadyRan = true;
      f();
    }
  }
};

export const JSONRequest = (): JSX.Element => {
  const [getPost, setPost] = useState({} as PostResponse);
  const [getUser, setUser] = useState({} as UserReponse);

  useEffect(() => {
    z.request<PostResponse>({
      url: 'https://jsonplaceholder.typicode.com/posts/5',
    })
      .then((data) => {
        console.log('post data:', data);
        setPost(data);

        return z
          .request<UserReponse>({
            url: `https://jsonplaceholder.typicode.com/users/${data.userId}`,
          })
          .then((udata) => {
            console.log('user data:', udata);
            setUser(udata);
          })
          .catch((error: Response) => {
            console.warn(error);
          });
      })
      .catch((error: Response) => {
        console.warn(error);
      });
  });

  return (
    <>
      <a title='home' href='#/'>
        Back
      </a>
      <h1>Title: {getPost().title}</h1>
      <h2>By: {getUser().name}</h2>
      <i>Post ID: {getPost().id}</i>
      <p>{getPost().body}</p>
    </>
  );
};
