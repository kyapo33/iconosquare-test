export interface RandomEvent {
  index: number;
  value1: number;
  value2: number;
  comment: string;
}

export interface LiveChartState {
  events: RandomEvent[];
  paused: boolean;
}

export type LiveChartAction = 
  | { type: 'new_event'; payload: RandomEvent }
  | { type: 'toggle_paused' };
  
export interface LiveChartContextType {
  data: LiveChartState;
  dispatch: React.Dispatch<LiveChartAction>;
} 
  