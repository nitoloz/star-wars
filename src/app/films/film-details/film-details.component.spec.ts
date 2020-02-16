import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FilmDetailsComponent} from './film-details.component';
import {MatButtonModule, MatIconModule} from "@angular/material";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {FilmsService, Simulation} from "../films.service";
import {RouterTestingModule} from "@angular/router/testing";
import {MockHouseholdsService} from "../households-list/households-list.component.spec";

describe('HouseholdDetailsComponent', () => {
  let component: FilmDetailsComponent;
  let fixture: ComponentFixture<FilmDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatIconModule, MatButtonModule, RouterTestingModule],
      declarations: [FilmDetailsComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [{provide: FilmsService, useClass: MockHouseholdsService}]
    })
      .compileComponents();
    const householdsService = TestBed.get(FilmsService);
    householdsService.selectedSimulation = {
      _id: {$oid: '1'},
      simName: '',
      type: '',
      resultLoadCurve: {} as any,
      availabilities: [],
      appliances: []
    } as Simulation;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilmDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
