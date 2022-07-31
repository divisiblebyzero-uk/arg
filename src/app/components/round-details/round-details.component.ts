import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Round, ROUNDS } from 'src/app/model/round';
import { HandicapCalculationService } from 'src/app/service/handicap-calculation-service.service';


@Component({
  selector: 'app-round-details',
  templateUrl: './round-details.component.html',
  styleUrls: ['./round-details.component.sass']
})
export class RoundDetailsComponent implements OnInit {

  round!: Round;

  constructor(private route: ActivatedRoute, private hcs: HandicapCalculationService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const round = ROUNDS.find(r => r.name == params['name']);
      if (round) {
        this.round = round;
      }
    })
  }

  public getRequiredScore(classification: string): string {
    return this.hcs.getRequiredScore(this.round, classification, 'Male', 'Senior', 'Recurve');
  }

}