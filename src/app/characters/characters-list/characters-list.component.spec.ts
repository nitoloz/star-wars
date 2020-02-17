import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {CharactersListComponent} from './characters-list.component';
import {MockRouter} from '../../films/can-activate-film-details.service.spec';
import {Film, FilmsService} from '../../films/films.service';
import {MatTableModule, PageEvent} from '@angular/material';
import {of} from 'rxjs';
import {Router} from '@angular/router';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {Character, CharactersService} from '../characters.service';
import {ListResponse} from '../../http.interface';


export class MockCharactersService {
  getCharactersList(pageNumber = 1) {
    return of([]);
  }

  getCharactersByFilm(film: Film) {
    return of([]);
  }

  getCharacter(characterId: number) {
    return of({});
  }
}

let charactersService: CharactersService;
let router: Router;
describe('CharactersListComponent', () => {
  let component: CharactersListComponent;
  let fixture: ComponentFixture<CharactersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatTableModule],
      declarations: [CharactersListComponent],
      providers: [
        {provide: CharactersService, useClass: MockCharactersService},
        {provide: Router, useClass: MockRouter}
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();

    charactersService = TestBed.get(CharactersService);
    router = TestBed.get(Router);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharactersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load characters data on init', () => {
    spyOn(charactersService, 'getCharactersList').and.returnValue(of({results: [{id: 1}], count: 1} as ListResponse<Character>));
    component.ngOnInit();
    expect(charactersService.getCharactersList).toHaveBeenCalled();
    expect(component.charactersCount).toBe(1);
    expect(component.characters).toEqual([{id: 1} as Character]);
  });

  it('should load characters data on paging', () => {
    spyOn(charactersService, 'getCharactersList').and.returnValue(of({results: [{id: 1}], count: 1} as ListResponse<Character>));
    component.pageData({pageIndex: 1} as PageEvent);
    expect(charactersService.getCharactersList).toHaveBeenCalledWith(2);
    expect(component.characters).toEqual([{id: 1} as Character]);
  });

});
