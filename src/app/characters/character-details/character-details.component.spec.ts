import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CharacterDetailsComponent} from './character-details.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {Character, CharactersService} from '../characters.service';
import {MockCharactersService} from '../characters-list/characters-list.component.spec';

describe('CharacterDetailsComponent', () => {
  let component: CharacterDetailsComponent;
  let fixture: ComponentFixture<CharacterDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CharacterDetailsComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [{provide: CharactersService, useClass: MockCharactersService}]
    })
      .compileComponents();
    const charactersService = TestBed.get(CharactersService);
    charactersService.selectedCharacter = {
      id: 1,
      name: 'Luke',
      mass: '11',
      url: 'https://swapi.co/api/people/1/',
      films: []
    } as Character;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    const charactersService = TestBed.get(CharactersService);
    expect(component).toBeTruthy();
    expect(component.character).toEqual(charactersService.selectedCharacter);
  });
});
