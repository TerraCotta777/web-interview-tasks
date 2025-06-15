import { config } from '~shared/config';
import { ResponseError, ResponseSuccess } from '~shared/response';

import { skipToken, useQuery } from '@tanstack/react-query';

import { superheroKeys } from './keys';

import { Superhero } from '../superhero';

type ResponsePayload = {
  'results-for': string;
  results: Superhero[];
};

export type Params = {
  query: string;
};

export function useSearchSuperheros(params: Params) {
  const { query: superheroName } = params;

  // Method documentation: https://superheroapi.com/#name
  // Example call: GET https://superheroapi.com/api/${access-token}/search/${superhero-name}
  return useQuery({
    queryKey: superheroKeys.search(superheroName),
    queryFn: superheroName
      ? async () => {
          const response: ResponseSuccess<ResponsePayload> = await fetch(
            `${config.apiHost}/api/${config.apiToken}h/search/${superheroName}`,
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

          return response;
        }
      : skipToken,
  });
}
