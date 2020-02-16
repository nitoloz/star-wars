import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {forkJoin, Observable} from 'rxjs';
import {finalize, map, tap} from 'rxjs/operators';
import {SWAPI_BASE_URL, ListResponse} from '../http.interface';
import {Film} from '../films/films.service';
import {LoaderService} from '../loader/loader.service';

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
  filmsData: Film[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
}

@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  selectedCharacter: Character;

  constructor(private http: HttpClient, private loaderService: LoaderService) {
  }

  getCharactersList(pageNumber = 1): Observable<ListResponse<Character>> {
    this.loaderService.startLoading();
    return this.http.get<ListResponse<Character>>(`${SWAPI_BASE_URL}/people/?page=${pageNumber}`)
      .pipe(map((characters => {
          characters.results.forEach(character => {
            character.id = this.getCharacterId(character.url);
          });
          return characters;
        }
      )), finalize(() => this.loaderService.finishLoading()));
  }

  getCharactersByFilm(film: Film) {
    return forkJoin(film.characters.map(characterUrl => {
      this.loaderService.startLoading();
      return this.http.get<Character>(characterUrl)
        .pipe(map(character => {
          character.id = this.getCharacterId(character.url);
          return character;
        }), finalize(() => this.loaderService.finishLoading()))
    }));
  }

  getCharacter(characterId: number): Observable<Character> {
    this.loaderService.startLoading();
    return this.http.get<Character>(`${SWAPI_BASE_URL}/people/${characterId}`)
      .pipe(map(character => {
        character.id = this.getCharacterId(character.url);
        return character;
      }), finalize(() => this.loaderService.finishLoading()));
  }

  private getCharacterId(characterUrl: string): number {
    return parseInt(characterUrl.substring(CHARACTER_HTTP_URL_LENGTH, characterUrl.length - 1), 10);
  }
}
