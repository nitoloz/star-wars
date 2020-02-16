import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {SWAPI_BASE_URL, ListResponse} from '../http.interface';

export interface Film {
  id: number;
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
export class FilmsService {

  selectedFilm: Film;

  constructor(private http: HttpClient) {
  }

  getFilmsList(): Observable<Film[]> {
    return this.http.get<ListResponse<Film>>(`${SWAPI_BASE_URL}/films`)
      .pipe(map((films => films.results.map(film => {
          film.id = parseInt(film.url.substring(27, film.url.length - 1), 10);
          return film;
        })
      )));
  }

  getFilm(filmId: number): Observable<Film> {
    return this.http.get<Film>(`${SWAPI_BASE_URL}/films/${filmId}`)
      .pipe(map((film => film)));
  }
}
