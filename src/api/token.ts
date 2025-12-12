import { BASE_URL } from './constants';

export const getToken = async (): Promise<string> => {
  const response = await fetch(`${BASE_URL}/tokens`, {
    method: 'POST',
  });

  if (!response.ok) {
    throw new Error(
      `Could not fetch token from ${response.url}. Response status: ${response.status} ${response.statusText}.`
    );
  }

  const data = await response.json();
  const token = data.token;

  if (!token) {
    throw new Error('Token not found!');
  }

  return token;
};
