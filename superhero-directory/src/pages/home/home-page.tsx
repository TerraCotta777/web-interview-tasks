import { ChangeEvent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { superheroApi } from '~entities/superhero';

import { useDebounce } from '~shared/useDebounce';

export function HomePage() {
  const [searchValue, setSearchedValue] = useState(
    localStorage.getItem('last-search') || ''
  );

  const debouncedValue = useDebounce(searchValue, 700);
  const { data, isLoading, error } = superheroApi.useSearchSuperheros({
    query: debouncedValue,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchedValue(e.target.value);
  };

  useEffect(() => {
    localStorage.setItem('last-search', debouncedValue);
  }, [debouncedValue]);

  return (
    <div className="p-4">
      <h1 className="font-display text-center text-4xl">Superhero Directory</h1>
      <p className="mb-4 text-center">
        Welcome to the Superhero Directory! Here you can find information about
        your favorite superheroes.
      </p>
      <div className="relative w-1/2 mx-auto">
        <input
          className="mb-4 w-full rounded-xl border border-green-800 px-4 py-2 text-lg shadow focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="🔍 Search"
          name="search superhero"
          value={searchValue}
          onChange={handleChange}
        />
        {searchValue && (
          <button
            onClick={() => setSearchedValue('')}
            className="absolute top-6 right-3 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>
      {isLoading && (
        <p className="flex items-center justify-center gap-2 text-gray-500">
          <span className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
          Loading...
        </p>
      )}
      {error && <p className="text-center text-red-500">{error.message}</p>}
      {data?.results?.length === 0 && (
        <p className="text-center text-gray-500">No superheroes found.</p>
      )}
      {data?.results && data.results.length > 0 && (
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {data.results.map((superhero) => (
            <Link key={superhero.id} to={`/${superhero.id}`}>
              <li className="group relative min-h-full overflow-hidden rounded-xl border border-green-800 bg-white p-4 shadow transition hover:shadow-lg">
                <img
                  src={superhero.image.url}
                  alt={superhero.name}
                  className="h-56 w-full rounded-md object-cover transition-transform group-hover:scale-105"
                />
                <div className="mt-3">
                  <h2 className="text-lg font-bold group-hover:text-blue-600">
                    {superhero.name}
                  </h2>
                  <p className="text-sm text-gray-600">
                    {superhero.biography['full-name']}
                  </p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              </li>
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
}
