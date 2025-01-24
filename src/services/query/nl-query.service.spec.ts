/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { NlQueryService } from './nl-query.service';

describe('Service: NlQuery', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NlQueryService]
    });
  });

  it('should ...', inject([NlQueryService], (service: NlQueryService) => {
    expect(service).toBeTruthy();
  }));
});
