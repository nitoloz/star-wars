import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CharactersListTableComponent} from './characters-list-table.component';
import {MockRouter} from '../../films/can-activate-film-details.service.spec';
import {MatTableModule} from '@angular/material';
import {Router} from '@angular/router';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {Character, CharactersService} from '../characters.service';
import {MockCharactersService} from '../characters-list/characters-list.component.spec';

let charactersService: CharactersService;
let router: Router;
describe('CharactersListTableComponent', () => {
  let component: CharactersListTableComponent;
  let fixture: ComponentFixture<CharactersListTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatTableModule],
      declarations: [CharactersListTableComponent],
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
    fixture = TestBed.createComponent(CharactersListTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to details page', () => {
    spyOn(router, 'navigate');
    component.showDetails({id: 1} as Character);
    expect(router.navigate).toHaveBeenCalledWith(['/characters', 1]);
    expect(charactersService.selectedCharacter).toEqual({id: 1} as Character);
  });

});
