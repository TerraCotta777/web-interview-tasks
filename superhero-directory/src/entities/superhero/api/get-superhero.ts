import { config } from '~shared/config';
import { isResponseError, ResponseError, ResponseSuccess } from '~shared/response';

import { skipToken, useQuery } from '@tanstack/react-query';

import { superheroKeys } from './keys';

import { Superhero } from '../superhero';

export type Params = {
  id?: string;
};

export function useSuperhero(params: Params) {
  const { id } = params;

  return useQuery({
    queryKey: superheroKeys.superhero(id ?? ''),
    queryFn: id
      ? async () => {
          const response: ResponseSuccess<Superhero> | ResponseError = await fetch(
            `${config.apiHost}/api/${config.apiToken}/${id}`,
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          ).then(async (res) => {
            if (!res.ok) {
              const error: ResponseError = await res.json();

              throw new Error(
                `Error ${res.status}: ${res.statusText} - ${error.error}`
              );
            }

            return res.json();
          });

          if (isResponseError(response)) {
            throw new Error(`Error: ${response.error}`);
          }

          return response;
        }
      : skipToken,
  });
}
