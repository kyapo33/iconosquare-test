import React, { useContext, useReducer, createContext } from 'react';
import { createRandomEvent } from '../utils';
import { RandomEvent, LiveChartState, LiveChartAction, LiveChartContextType } from '../../types';

const LiveChartContext = createContext<LiveChartContextType | undefined>(undefined);

const initialEvents: RandomEvent[] = Array.from(Array(50)).map((_, ix) => createRandomEvent(ix));

const initialData: LiveChartState = {
  events: initialEvents,
  paused: false
};

const liveChartReducer = (state: LiveChartState, action: LiveChartAction): LiveChartState => {
  switch (action.type) {
    case 'new_event':
      if (state.paused) {
        return state;
      }
      return {
        ...state,
        events: [...state.events, action.payload]
      };
    case 'toggle_paused':
      return {
        ...state,
        paused: !state.paused
      };
    case 'update_events':
      return {
        ...state,
        events: action.payload
      };
    default: {
      throw new Error(`Unhandled action type: ${(action as any).type}`);
    }
  }
};

interface LiveChartProviderProps {
  children: React.ReactNode;
}

const LiveChartProvider: React.FC<LiveChartProviderProps> = ({ children }) => {
  const [data, dispatch] = useReducer(liveChartReducer, initialData);
  return (
    <LiveChartContext.Provider
      value={{
        data,
        dispatch
      }}
    >
      {children}
    </LiveChartContext.Provider>
  );
};

const useLiveChartContext = (): LiveChartContextType => {
  const context = useContext(LiveChartContext);
  if (!context) {
    throw new Error('useLiveChartContext should be used within an LiveChartProvider');
  }

  return context;
};

export { LiveChartProvider, useLiveChartContext };
