import { Injectable } from '@angular/core';
import { Distance, Round } from '../model/round';

@Injectable({
  providedIn: 'root'
})
export class HandicapCalculationService {

  private handicapTables: Map<string, Map<number, number>> = new Map<string, Map<number, number>>();

  constructor() { 
    this.populateHandicapClassificationLookupMap();
  }

  public getHandicapForScore(round: Round, score: number): number {
    const handicapTable = this.getHandicapTable(round);
    for (let i = 0; i < 101; i++) {
      if (handicapTable.has(i) && handicapTable.get(i)! <= score) {
        return i;
      }
    }
    return 100;
  }

  public getHandicapTable(round: Round): Map<number, number> {
    const potentialTable = this.handicapTables.get(round.name);
    if (potentialTable) {
      return potentialTable;
    } else {
      const newTable = new Map<number, number>();
      for (let i = 0; i < 101; i++) {
        newTable.set(i, this.calculateScoreForHandicap(i, round));
      }    
      this.handicapTables.set(round.name, newTable);
      return newTable;
    }
  }

  private calculateScoreForHandicap(handicap: number, round: Round): number {
    var runningTotal = 0;
    round.distances.forEach(distance => runningTotal += Math.round(distance.arrows * this.calculateScoreForHandicapAndDistance(handicap, distance, round.scoringType)));
    return runningTotal;
  }

  private calculateScoreForHandicapAndDistance(handicap: number, distance: Distance, scoringType: string): number {
    const rootMeanSquare = this.getRootMeanSquare(handicap, distance);
    let averageScore = 0;

    if (scoringType == 'Imperial') {
      for (let i = 1; i <= 4; i++) {
        averageScore += Math.exp(-Math.pow(i * distance.faceSize.inMetres()*100 / 10.0 + 0.357, 2.0) / Math.pow(rootMeanSquare, 2.0));
      }
      return 9.0 - 2.0 * averageScore - Math.exp(-Math.pow((distance.faceSize.inMetres()*100) / 2.0 + 0.357, 2.0) / Math.pow(rootMeanSquare, 2.0));

    } else if (scoringType == 'Metric') {
      for (let i = 1; i <= 10; i++) {
        averageScore += Math.exp(-Math.pow((i * distance.faceSize.inMetres()*100 / 20.0) + 0.357, 2.0) / Math.pow(rootMeanSquare, 2.0));
      }
      return 10-averageScore;
    }
    console.log("Unknown scoring style");
    return 0;
  }

  private getRootMeanSquare(handicap: number, distance: Distance): number {
    const rangeInMetres: number = distance.length.inMetres();

    return 100.0 * rangeInMetres * Math.pow(1.036, 12.9 + handicap) * 5.0 * Math.pow(10.0, -4.0) * (1.0 + 1.429 * Math.pow(10.0, -6.0) * Math.pow(1.07, 4.3 + handicap) * Math.pow(rangeInMetres, 2.0));

  }

  public getRequiredScore(round: Round, classification: string, roundConfiguration: RoundConfiguration): string {
    
    const cm = this.hclm.filter(m => { return m.roundConfiguration === JSON.stringify(roundConfiguration) });
    if (cm.length > 0) {
      const candidate = cm[0];
      const hc = candidate.classificationMap.get(classification);
      if (hc) {
        const score = this.getHandicapTable(round).get(hc);
        if (score) {
          return "" + score;
        }
      } 
      }


    return "";
  }

  hclm: { roundConfiguration: string, classificationMap: Map<string, number>} [] = [];

  private populateHandicapClassificationLookupMap() {
    const maleSeniorRecurveClassificationMap = new Map<string, number>();
    maleSeniorRecurveClassificationMap.set("Bowman", 36);
    maleSeniorRecurveClassificationMap.set("1st", 44);
    maleSeniorRecurveClassificationMap.set("2nd", 50);
    maleSeniorRecurveClassificationMap.set("3rd", 58);

    this.hclm.push( { roundConfiguration: JSON.stringify({     bowType: 'Recurve',     gender: 'Male',ageGroup: 'Senior'}), classificationMap: maleSeniorRecurveClassificationMap});

    const femaleSeniorRecurveClassificationMap = new Map<string, number>();
    femaleSeniorRecurveClassificationMap.set("Bowman", 41);
    femaleSeniorRecurveClassificationMap.set("1st", 50);
    femaleSeniorRecurveClassificationMap.set("2nd", 57);
    femaleSeniorRecurveClassificationMap.set("3rd", 65);

    this.hclm.push( { roundConfiguration: JSON.stringify({     bowType: 'Recurve',     gender: 'Female',ageGroup: 'Senior'}), classificationMap: femaleSeniorRecurveClassificationMap});

  }
  


}

export const GENDERS: string[] = ['Male', 'Female'];
export const BOWTYPES: string[] = ['Recurve', 'Compound', 'Longbow', 'Barebow'];
export const AGEGROUPS: string[] = ['Senior', 'U-18', 'U-16', 'U-14', 'U-12'];

export const CLASSIFICATIONS: string[] = ['GMB', 'MB', 'Bowman', '1st', '2nd', '3rd'];

export interface RoundConfiguration {
  bowType: string;
  gender: string;
  ageGroup: string;
}

