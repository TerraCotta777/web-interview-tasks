import { useState } from 'react';
import { Link } from 'react-router-dom';

import { superheroApi } from '~entities/superhero';

export function HomePage() {
  const [searchValue, setSearchedValue] = useState('');

  const { data, isLoading, error } = superheroApi.useSearchSuperheros({
    query: searchValue,
  });

  return (
    <div>
      <h1 className="font-display text-center text-4xl">Superhero Directory</h1>
      <p>
        Welcome to the Superhero Directory! Here you can find information about
        your favorite superheroes.
      </p>
      <input
        className="border"
        value={searchValue}
        onChange={(e) => setSearchedValue(e.target.value)}
      />
      {isLoading && <p className="text-center text-gray-500">Loading...</p>}
      {error && !data && (
        <p className="text-center text-red-500">
          Failed to load superhero data.
        </p>
      )}
      {data?.results.length === 0 && (
        <p className="text-center text-gray-500">No superheroes found.</p>
      )}
      {data?.results && data.results.length > 0 && (
        <ul>
          {data.results.map((superhero) => (
            <Link key={superhero.id} to={`/${superhero.id}`}>
              <li>
                <p>{superhero.name}</p>
              </li>
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
}
