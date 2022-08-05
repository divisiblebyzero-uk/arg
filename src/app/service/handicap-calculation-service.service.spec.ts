import { ExpressionType } from '@angular/compiler';
import { TestBed } from '@angular/core/testing';
import { Round, ROUNDS } from '../model/round';
import { HandicapCalculationService } from './handicap-calculation-service.service';



describe('HandicapCalculationService', () => {
  let service: HandicapCalculationService;
  let rounds: Round[] = ROUNDS;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HandicapCalculationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return handicap of 51 for York score of 500', () => {
    const round = rounds.find(round => round.name == 'York');
    if (round) {
        expect(service.getHandicapForScore(round, 500)).toBe(51);
    }
  })
});
