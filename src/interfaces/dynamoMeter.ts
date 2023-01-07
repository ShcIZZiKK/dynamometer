interface Prizes {
  id: number;
  image: string;
  name: string;
  color: string;
}

export interface StateDynamoMeter {
  step: number;
  prizeId: number;
  prizes: Prizes[];
  power: number;
  pointsToWin: number;
  animateMeasure: boolean;
  showingMeasureEnd: boolean;
}
