import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CharacterDetailsComponent} from './character-details.component';
import {RouterTestingModule} from '@angular/router/testing';
import {FilmsService} from '../../films/films.service';
import {MatButtonModule, MatIconModule} from '@angular/material';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {CharactersService} from '../characters.service';
import {MockCharactersService} from '../characters-list/characters-list.component.spec';

describe('CharacterDetailsComponent', () => {
  let component: CharacterDetailsComponent;
  let fixture: ComponentFixture<CharacterDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatIconModule, MatButtonModule, RouterTestingModule],
      declarations: [CharacterDetailsComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [{provide: CharactersService, useClass: MockCharactersService}]
    })
      .compileComponents();
    // const householdsService = TestBed.get(FilmsService);
    // householdsService.selectedSimulation = {
    //   _id: {$oid: '1'},
    //   simName: '',
    //   type: '',
    //   resultLoadCurve: {} as any,
    //   availabilities: [],
    //   appliances: []
    // } as Simulation;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
