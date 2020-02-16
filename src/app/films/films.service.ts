import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {forkJoin, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {SWAPI_BASE_URL, ListResponse} from '../http.interface';
import {Character} from '../characters/characters.service';

const FILM_HTTP_URL_LENGTH = `${SWAPI_BASE_URL}/films/`.length;

export interface Film {
  id: number;
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  characters: string[];
  charactersData: Character[];
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
          film.id = this.getFilmId(film.url);
          return film;
        })
      )));
  }

  getFilmsByCharacter(character: Character) {
    return forkJoin(character.films.map(filmUrl =>
      this.http.get<Film>(filmUrl)
        .pipe(map(film => {
          film.id = this.getFilmId(film.url);
          return film;
        }))
    ));
  }

  getFilm(filmId: number): Observable<Film> {
    return this.http.get<Film>(`${SWAPI_BASE_URL}/films/${filmId}`);
  }

  private getFilmId(filmUrl: string): number {
    return parseInt(filmUrl.substring(FILM_HTTP_URL_LENGTH, filmUrl.length - 1), 10);
  }
}
