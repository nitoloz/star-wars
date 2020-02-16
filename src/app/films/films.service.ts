import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {SWAPI_BASE_URL, ListResponse} from '../http.interface';

export interface Film {
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

  getData(): Observable<Film[]> {
    return this.http.get<ListResponse<Film>>(`${SWAPI_BASE_URL}/films`)
      .pipe(map((films => films.results)));
  }
}
