export const SWAPI_BASE_URL = 'https://swapi.co/api';

export interface ListResponse<T> {
  count: number;
  next: string;
  previous: string;
  results: T[];
}
