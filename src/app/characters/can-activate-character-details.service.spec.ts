import {TestBed} from '@angular/core/testing';

import {CanActivateCharacterDetailsService} from './can-activate-character-details.service';
import {FilmsService, Simulation} from "./films.service";
import {MockHouseholdsService} from "./households-list/households-list.component.spec";
import {ActivatedRoute, ActivatedRouteSnapshot, convertToParamMap, Router} from "@angular/router";
import {of} from "rxjs/internal/observable/of";
import {Observable} from "rxjs/internal/Observable";

export class MockRouter {
  navigate(path) {
  }
}

let householdsService: FilmsService;
let router: Router;
describe('CanActivateDetailsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CanActivateCharacterDetailsService,
        {provide: FilmsService, useClass: MockHouseholdsService},
        {provide: Router, useClass: MockRouter}
      ]
    });
    householdsService = TestBed.get(FilmsService);
    router = TestBed.get(Router);
  });

  it('should return true if selectedFilm is loaded', () => {
    householdsService.selectedFilm = {
      _id: {$oid: '1'},
      simName: '',
      type: '',
      resultLoadCurve: {} as any,
      availabilities: [],
      appliances: []
    } as Simulation;
    const service: CanActivateCharacterDetailsService = TestBed.get(CanActivateCharacterDetailsService);
    expect(service.canActivate(<any>{params: {id: '1'}}, null)).toBeTruthy();
  });

  it('should load simulation if it`s missing', () => {
    spyOn(householdsService, 'getFilmsList').and.returnValue(of([{
      _id: {$oid: '1'},
      simName: '',
      type: '',
      resultLoadCurve: {} as any,
      availabilities: [],
      appliances: []
    }]));
    householdsService.selectedFilm = {
      _id: {$oid: '2'},
      simName: '',
      type: '',
      resultLoadCurve: {} as any,
      availabilities: [],
      appliances: []
    } as Simulation;
    const service: CanActivateCharacterDetailsService = TestBed.get(CanActivateCharacterDetailsService);
    const resultObservable = service.canActivate(<any>{params: {id: '1'}}, null) as Observable<boolean>;
    resultObservable.subscribe((result: boolean) => {
      expect(result).toBeTruthy();
      expect(householdsService.selectedFilm._id.$oid).toBe('1');
      expect(householdsService.getFilmsList).toHaveBeenCalled();
    })
  });

  it('should return false if there is no simulation with given id', () => {
    spyOn(router, 'navigate');
    spyOn(householdsService, 'getFilmsList').and.returnValue(of([{
      _id: {$oid: '3'},
      simName: '',
      type: '',
      resultLoadCurve: {} as any,
      availabilities: [],
      appliances: []
    }]));
    householdsService.selectedFilm = {
      _id: {$oid: '2'},
      simName: '',
      type: '',
      resultLoadCurve: {} as any,
      availabilities: [],
      appliances: []
    } as Simulation;
    const service: CanActivateCharacterDetailsService = TestBed.get(CanActivateCharacterDetailsService);
    const resultObservable = service.canActivate(<any>{params: {id: '1'}}, null) as Observable<boolean>;
    resultObservable.subscribe((result: boolean) => {
      expect(result).toBeFalsy();
      expect(householdsService.selectedFilm._id.$oid).toBe('2');
      expect(householdsService.getFilmsList).toHaveBeenCalled();
      expect(router.navigate).toHaveBeenCalledWith(['/households']);
    })
  });
});
