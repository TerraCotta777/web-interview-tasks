import { useEffect, useState } from 'react';

export function useDebounce(value: string, timeout: number = 500) {
  const [result, setResult] = useState(value);

  useEffect(() => {
    const t = setTimeout(() => {
      setResult(value);
    }, timeout);

    return () => clearTimeout(t);
  }, [value, timeout]);

  return result;
}
