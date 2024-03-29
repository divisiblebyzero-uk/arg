export class Round {
    name: string;
    venue: string;          // Indoor or Outdoor
    scoringType: string;    // Metric or Imperial
    distances: Distance[];

    constructor(
        name: string,
        venue: string,
        scoringType: string,
        distances: Distance[]) {

        this.name = name;
        this.venue = venue;
        this.scoringType = scoringType;
        this.distances = distances;
    }
}

export class Distance {
    length: Measurement;
    arrows: number;
    faceSize: Measurement;

    constructor(
        length: Measurement,
        arrows: number,
        faceSize: Measurement
    ) {
        this.length = length;
        this.arrows = arrows;
        this.faceSize = faceSize;
    }
}

export class Measurement {
    value: number;
    units: string;          // cm, m, yd or in
    displayString: string;

    constructor (
        value: number,
        units: string
    ) {
        this.value = value;
        this.units = units;
        this.displayString = `${value} ${units}`;
    }

    public inMetres(): number {
        switch(this.units) {
            case 'cm':
                return this.value / 100;
            case 'm':
                return this.value;
            case 'yd':
                return this.value * 0.9144;
            case 'in':
                return this.value * 0.0254;
            default:
                console.log('Unknown units ${Units}');
                return 0;
            }
    }
}

export const ROUNDS: Round[] = [
    new Round('Portsmouth', 'Indoor', 'Metric', [new Distance(new Measurement(20, 'yd'), 60, new Measurement(60, 'cm'))]),
    new Round('Frostbite', 'Outdoor', 'Metric', [new Distance(new Measurement(30, 'm'), 36, new Measurement(80, 'cm'))]),
    
    new Round('New National', 'Outdoor', 'Imperial', [new Distance(new Measurement(100, 'yd'), 48, new Measurement(122, 'cm')), new Distance(new Measurement(80, 'yd'), 24, new Measurement(122, 'cm'))]),
    new Round('Long National', 'Outdoor', 'Imperial', [new Distance(new Measurement(80, 'yd'), 48, new Measurement(122, 'cm')), new Distance(new Measurement(60, 'yd'), 24, new Measurement(122, 'cm'))]),
    new Round('National', 'Outdoor', 'Imperial', [new Distance(new Measurement(60, 'yd'), 48, new Measurement(122, 'cm')), new Distance(new Measurement(50, 'yd'), 24, new Measurement(122, 'cm'))]),
    new Round('National 50', 'Outdoor', 'Imperial', [new Distance(new Measurement(50, 'yd'), 48, new Measurement(122, 'cm')), new Distance(new Measurement(40, 'yd'), 24, new Measurement(122, 'cm'))]),
    new Round('National 40', 'Outdoor', 'Imperial', [new Distance(new Measurement(40, 'yd'), 48, new Measurement(122, 'cm')), new Distance(new Measurement(30, 'yd'), 24, new Measurement(122, 'cm'))]),
    new Round('National 30', 'Outdoor', 'Imperial', [new Distance(new Measurement(30, 'yd'), 48, new Measurement(122, 'cm')), new Distance(new Measurement(20, 'yd'), 24, new Measurement(122, 'cm'))]),
    
    new Round('York', 'Outdoor', 'Imperial', [new Distance(new Measurement(100, 'yd'), 72, new Measurement(122, 'cm')), new Distance(new Measurement(80, 'yd'), 48, new Measurement(122, 'cm')), new Distance(new Measurement(60, 'yd'), 24, new Measurement(122, 'cm'))]),
    new Round('Hereford/Bristol I', 'Outdoor', 'Imperial', [new Distance(new Measurement(80, 'yd'), 72, new Measurement(122, 'cm')), new Distance(new Measurement(60, 'yd'), 48, new Measurement(122, 'cm')), new Distance(new Measurement(50, 'yd'), 24, new Measurement(122, 'cm'))]),
    new Round('Bristol II', 'Outdoor', 'Imperial', [new Distance(new Measurement(60, 'yd'), 72, new Measurement(122, 'cm')), new Distance(new Measurement(50, 'yd'), 48, new Measurement(122, 'cm')), new Distance(new Measurement(40, 'yd'), 24, new Measurement(122, 'cm'))]),
    new Round('Bristol III', 'Outdoor', 'Imperial', [new Distance(new Measurement(50, 'yd'), 72, new Measurement(122, 'cm')), new Distance(new Measurement(40, 'yd'), 48, new Measurement(122, 'cm')), new Distance(new Measurement(30, 'yd'), 24, new Measurement(122, 'cm'))]),
    new Round('Bristol IV', 'Outdoor', 'Imperial', [new Distance(new Measurement(40, 'yd'), 72, new Measurement(122, 'cm')), new Distance(new Measurement(30, 'yd'), 48, new Measurement(122, 'cm')), new Distance(new Measurement(20, 'yd'), 24, new Measurement(122, 'cm'))]),
    new Round('Bristol V', 'Outdoor', 'Imperial', [new Distance(new Measurement(30, 'yd'), 72, new Measurement(122, 'cm')), new Distance(new Measurement(20, 'yd'), 48, new Measurement(122, 'cm')), new Distance(new Measurement(10, 'yd'), 24, new Measurement(122, 'cm'))]),

    new Round('St George', 'Outdoor', 'Imperial', [new Distance(new Measurement(100, 'yd'), 36, new Measurement(122, 'cm')), new Distance(new Measurement(80, 'yd'), 36, new Measurement(122, 'cm')), new Distance(new Measurement(60, 'yd'), 36, new Measurement(122, 'cm'))]),
    new Round('Albion', 'Outdoor', 'Imperial', [new Distance(new Measurement(80, 'yd'), 36, new Measurement(122, 'cm')), new Distance(new Measurement(60, 'yd'), 36, new Measurement(122, 'cm')), new Distance(new Measurement(50, 'yd'), 36, new Measurement(122, 'cm'))]),
    new Round('Windsor', 'Outdoor', 'Imperial', [new Distance(new Measurement(60, 'yd'), 36, new Measurement(122, 'cm')), new Distance(new Measurement(50, 'yd'), 36, new Measurement(122, 'cm')), new Distance(new Measurement(40, 'yd'), 36, new Measurement(122, 'cm'))]),
    new Round('Windsor 50', 'Outdoor', 'Imperial', [new Distance(new Measurement(50, 'yd'), 36, new Measurement(122, 'cm')), new Distance(new Measurement(40, 'yd'), 36, new Measurement(122, 'cm')), new Distance(new Measurement(30, 'yd'), 36, new Measurement(122, 'cm'))]),
    new Round('Windsor 40', 'Outdoor', 'Imperial', [new Distance(new Measurement(40, 'yd'), 36, new Measurement(122, 'cm')), new Distance(new Measurement(30, 'yd'), 36, new Measurement(122, 'cm')), new Distance(new Measurement(20, 'yd'), 36, new Measurement(122, 'cm'))]),
    new Round('Windsor 30', 'Outdoor', 'Imperial', [new Distance(new Measurement(30, 'yd'), 36, new Measurement(122, 'cm')), new Distance(new Measurement(20, 'yd'), 36, new Measurement(122, 'cm')), new Distance(new Measurement(10, 'yd'), 36, new Measurement(122, 'cm'))]),

    new Round('New Western', 'Outdoor', 'Imperial', [new Distance(new Measurement(100, 'yd'), 48, new Measurement(122, 'cm')), new Distance(new Measurement(80, 'yd'), 48, new Measurement(122, 'cm'))]),
    new Round('Long Western', 'Outdoor', 'Imperial', [new Distance(new Measurement(80, 'yd'), 48, new Measurement(122, 'cm')), new Distance(new Measurement(60, 'yd'), 48, new Measurement(122, 'cm'))]),
    new Round('Western', 'Outdoor', 'Imperial', [new Distance(new Measurement(60, 'yd'), 48, new Measurement(122, 'cm')), new Distance(new Measurement(50, 'yd'), 48, new Measurement(122, 'cm'))]),
    new Round('Western 50', 'Outdoor', 'Imperial', [new Distance(new Measurement(50, 'yd'), 48, new Measurement(122, 'cm')), new Distance(new Measurement(40, 'yd'), 48, new Measurement(122, 'cm'))]),
    new Round('Western 40', 'Outdoor', 'Imperial', [new Distance(new Measurement(40, 'yd'), 48, new Measurement(122, 'cm')), new Distance(new Measurement(30, 'yd'), 48, new Measurement(122, 'cm'))]),
    new Round('Western 30', 'Outdoor', 'Imperial', [new Distance(new Measurement(30, 'yd'), 48, new Measurement(122, 'cm')), new Distance(new Measurement(20, 'yd'), 48, new Measurement(122, 'cm'))]),

];
