import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {forkJoin, Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {SWAPI_BASE_URL, ListResponse} from '../http.interface';
import {Film} from '../films/films.service';

const CHARACTER_HTTP_URL_LENGTH = `${SWAPI_BASE_URL}/people/`.length;

export interface Character {
  id: number;
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
}

@Injectable()
export class CharactersService {

  selectedCharacter: Character;

  constructor(private http: HttpClient) {
  }

  getCharactersList(): Observable<Character[]> {
    return this.http.get<ListResponse<Character>>(`${SWAPI_BASE_URL}/people`)
      .pipe(map((characters => characters.results.map(character => {
          character.id = parseInt(character.url.substring(CHARACTER_HTTP_URL_LENGTH, character.url.length - 1), 10);
          return character;
        })
      )));
  }

  getCharactersByFilm(film: Film) {
    return forkJoin(film.characters.map(characterUrl =>
      this.http.get<Character>(characterUrl)
        .pipe(map(character => {
          character.id = parseInt(character.url.substring(CHARACTER_HTTP_URL_LENGTH, character.url.length - 1), 10);
          return character;
        }))));
  }

  getCharacter(characterId: number): Observable<Character> {
    return this.http.get<Character>(`${SWAPI_BASE_URL}/people/${characterId}`)
      .pipe(map(character => {
        character.id = characterId;
        return character;
      }));
  }

  getCharacterByUrl(characterUrl: string): Observable<Character> {
    return this.http.get<Character>(characterUrl)
      .pipe(map(character => {
        character.id = parseInt(character.url.substring(CHARACTER_HTTP_URL_LENGTH, character.url.length - 1), 10);
        return character;
      }));
  }
}
