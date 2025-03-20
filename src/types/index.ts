export interface RandomEvent {
  index: number;
  value1: number;
  value2: number;
  comment: string;
}

export interface EditingCell {
  index: number;
  field: ValueField;
}

export type ValueField = 'value1' | 'value2';

export interface LiveChartState {
  events: RandomEvent[];
  originalEvents: RandomEvent[];
  paused: boolean;
  pausedEvents: RandomEvent[];
  editingCell: EditingCell | null;
  timeIndex: number;
  maxTimeIndex: number;
}

export type LiveChartAction =
  | { type: 'new_event'; payload: RandomEvent }
  | { type: 'toggle_paused' }
  | { type: 'update_events'; payload: RandomEvent[] }
  | { type: 'edit_cell'; payload: EditingCell | null }
  | { type: 'reset_values' }
  | { type: 'go_to_time'; payload: number };

export interface LiveChartContextType {
  data: LiveChartState;
  dispatch: React.Dispatch<LiveChartAction>;
}
