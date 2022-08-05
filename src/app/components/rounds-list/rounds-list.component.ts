import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { arrow } from '@popperjs/core';
import { ROUNDS, Round } from '../../model/round';
import { AGEGROUPS, BOWTYPES, CLASSIFICATIONS, GENDERS, HandicapCalculationService, RoundConfiguration } from '../../service/handicap-calculation-service.service';

@Component({
  selector: 'app-rounds-list',
  templateUrl: './rounds-list.component.html',
  styleUrls: ['./rounds-list.component.sass']
})
export class RoundsListComponent implements OnInit {

  classifications = CLASSIFICATIONS;  
  genders = GENDERS;
  bowTypes = BOWTYPES;
  ageGroups = AGEGROUPS;

  ROUND_TYPES = ["Imperial", "Metric", "Indoor"];
  IMPERIAL_ROUND_DISTANCES = [100, 80, 60, 50, 40, 30, 20, 10 ];
  METRIC_ROUND_DISTANCES = [];
  INDOOR_ROUND_DISTANCES = [];

  rounds: Round[] = ROUNDS;

  roundConfiguration: RoundConfiguration = {
    bowType: "Recurve",
    gender: "Male", 
    ageGroup: "Senior"
  }

  height!: number;
  width!: number;

  constructor(private router: Router, private hcs: HandicapCalculationService) { }

  ngOnInit(): void {
    this.height = window.innerHeight;
    this.width = window.innerWidth;
  }

  showDetails(round: Round): void {
    this.router.navigate(['/round-details', round.name]);
  }

  public getRoundDistances(roundType: string): number[] {
    if (roundType == "Imperial") {
      return this.IMPERIAL_ROUND_DISTANCES;
    } else if (roundType == "Metric") {
      return this.METRIC_ROUND_DISTANCES;
    } else if (roundType == "Indoor") {
      return this.INDOOR_ROUND_DISTANCES;
    } else {
      return [];
    }
  }

  public getRounds(roundType: string): Round[] {
    if (roundType == "Imperial") {
      return this.rounds.filter(round => {return round.scoringType === roundType});
    } else if (roundType == "Indoor") {
      return this.rounds.filter(round => {return round.venue === "Indoor"});
    } else if (roundType == "Metric") {
      return this.rounds.filter(round => {return round.scoringType === "Metric" && round.venue === "Outdoor"})
    } else {
      return [];
    }
  }

  public getDozensByDistance(round: Round, distance: number): string {
    var arrows = 0;
    round.distances.forEach(d => {
      if (d.length.value == distance) {
        arrows += d.arrows;
      }
    });
    const dozens = arrows / 12;
    if (dozens == 0) {
      return '';
    } else {
      return "" + dozens;
    }
    
  }

  public getRequiredScore(round: Round, classification: string): string {
    return this.hcs.getRequiredScore(round, classification, this.roundConfiguration);
  }
}
