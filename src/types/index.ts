export interface RandomEvent {
  index: number;
  value1: number;
  value2: number;
  comment: string;
}

export interface LiveChartState {
  events: RandomEvent[];
}

export type LiveChartAction = { type: 'new_event'; payload: RandomEvent };
  
  export interface LiveChartContextType {
    data: LiveChartState;
    dispatch: React.Dispatch<LiveChartAction>;
  } 
  