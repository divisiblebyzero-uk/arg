import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { /*ChartDataSets,*/ ChartConfiguration, ChartType, Chart } from 'chart.js';
//import { Color, Label } from 'ng2-charts';
import { Round, ROUNDS } from '../../model/round';
import { HandicapCalculationService } from '../../service/handicap-calculation-service.service';
import {default as Annotation} from 'chartjs-plugin-annotation';

@Component({
  selector: 'app-round-handicap-chart',
  templateUrl: './round-handicap-chart.component.html',
  styleUrls: ['./round-handicap-chart.component.sass']
})
export class RoundHandicapChartComponent implements OnInit {

  round!: Round;
  handicapTable!: Map<number, number>;

  constructor(private route: ActivatedRoute, private hcs: HandicapCalculationService) {
    Chart.register(Annotation)
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const round = ROUNDS.find(r => r.name == params['name']);
      if (round) {
        this.round = round;
        this.handicapTable = this.hcs.getHandicapTable(round);
        this.lineChartLabels = [];
        const data: number[] = [];

        this.handicapTable.forEach((value: number, key: number) => {
          this.lineChartLabels.push('' + key);
          data.push(value);
        });
        this.handicapData = [ {data: data }];


      }
    })
  }
  public lineChartLabels: (string&any)[] = [];
  public handicapData: (number[]&any)[] = [];

  public lineChartConfiguration: (ChartConfiguration['options'] & { responsive: any}) = {
    responsive: true,/*
    elements: {
      line: {
        tension: 0.5
      }
    },
    plugins: {
      legend: { display: false },
      annotation: {
        annotations: [
          {
            type: 'line',
            scaleID: 'x',
            value: "58",
            borderColor: 'yellow',
            borderWidth: 2,
            label: {
              position: 'center',
              //enabled: true,
              color: 'orange',
              content: '3rd',
              font: {
                weight: 'bold'
              }
            }
          },
          {
            type: 'line',
            scaleID: 'x',
            value: "50",
            borderColor: 'orange',
            borderWidth: 2,
            label: {
              position: 'center',
              //enabled: true,
              color: 'orange',
              content: '2nd',
              font: {
                weight: 'bold'
              }
            }
          },
          {
            type: 'line',
            scaleID: 'x',
            value: "44",
            borderColor: 'red',
            borderWidth: 2,
            label: {
              position: 'center',
              //enabled: true,
              color: 'orange',
              content: '1st',
              font: {
                weight: 'bold'
              }
            }
          },
          {
            type: 'line',
            scaleID: 'x',
            value: "36",
            borderColor: 'green',
            borderWidth: 2,
            label: {
              position: 'center',
              //enabled: true,
              color: 'orange',
              content: 'Bowman',
              font: {
                weight: 'bold'
              }
            }
          },

        ],
      }
    },
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      x: {},
      y:
        {
          position: 'left',
          labels: ["score"]
        }
    },
*/
  }
/*
  public handicapData: ChartDataSets[] = [];
  public lineChartLabels: Label[] = [];

  public lineChartOptions: (ChartOptions & { responsive: any }) = {
    responsive: true,
    legend: { display: false },
    scales: {
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Handicap'
        }
      }],
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Score'
        }
      }],
    }
  };
  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];
*/
  public lineChartLegend = true;
  public lineChartType = "line" as ChartType;
  public lineChartPlugins = [];
}