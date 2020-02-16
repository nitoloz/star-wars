import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

const MOVIES_DATA_URL = 'https://swapi.co/api/films';

export interface ListResponse<T> {
  count: number;
  next: string;
  previous: string;
  results: T[];
}

export interface Movie {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  characters: string[];
  planets: string[];
  starships: string[];
  vehicles: string[];
  species: string[];
  created: string;
  edited: string;
  url: string;
}

@Injectable()
export class MoviesService {

  selectedMovie: Movie;

  constructor(private http: HttpClient) {
  }

  getData(): Observable<Movie[]> {
    return this.http.get<ListResponse[]>(MOVIES_DATA_URL).pipe(map((movies => movies.results)));
  }
}
