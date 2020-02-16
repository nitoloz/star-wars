import {TestBed} from '@angular/core/testing';

import {FilmsService, SIMULATION_TYPE} from './films.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('HouseholdsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [FilmsService]
  }));

  it('should be created', () => {
    const service: FilmsService = TestBed.get(FilmsService);
    expect(service).toBeTruthy();
  });

  it('should return correct household type icon', () => {
    const service: FilmsService = TestBed.get(FilmsService);
    expect(service.getHouseholdTypeIcon(SIMULATION_TYPE.HOUSEHOLD_SINGLE)).toBe('person');
    expect(service.getHouseholdTypeIcon(SIMULATION_TYPE.HOUSEHOLD_FAMILE)).toBe('people_alt');
  });
});
