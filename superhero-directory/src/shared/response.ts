export type ResponseError = {
  response: 'error';
  error: string;
};

export type ResponseSuccess<T> = {
  response: 'success';
} & T;

export function isResponseError(value: unknown): value is ResponseError {
  return (
    typeof value === 'object' &&
    value !== null &&
    'response' in value &&
    (value as { response?: unknown }).response === 'error'
  );
}
