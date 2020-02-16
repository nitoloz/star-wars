import {TestBed} from '@angular/core/testing';

import {CharactersService, SIMULATION_TYPE} from './characters.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('HouseholdsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [CharactersService]
  }));

  it('should be created', () => {
    const service: CharactersService = TestBed.get(CharactersService);
    expect(service).toBeTruthy();
  });

  it('should return correct household type icon', () => {
    const service: CharactersService = TestBed.get(CharactersService);
    expect(service.getHouseholdTypeIcon(SIMULATION_TYPE.HOUSEHOLD_SINGLE)).toBe('person');
    expect(service.getHouseholdTypeIcon(SIMULATION_TYPE.HOUSEHOLD_FAMILE)).toBe('people_alt');
  });
});
