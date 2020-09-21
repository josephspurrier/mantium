import { z } from '@/lib/z';

interface Request {
  url: string;
}

export const request = <T>(
  req: Request,
  data: RequestInit = {},
): Promise<T> => {
  return fetch(req.url, data)
    .then((response: Response) => {
      if (response.ok) {
        return response.json() as Promise<T>;
      } else {
        return Promise.reject(response);
      }
    })
    .catch(function (error: Response) {
      throw error;
    })
    .finally(() => {
      z.redraw();
    });
};
