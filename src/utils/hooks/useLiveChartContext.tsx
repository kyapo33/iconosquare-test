import React, { useContext, useReducer, createContext } from 'react';
import { createRandomEvent } from '../utils';
import { RandomEvent, LiveChartState, LiveChartAction, LiveChartContextType } from '../../types';

const LiveChartContext = createContext<LiveChartContextType | undefined>(undefined);

const initialEvents: RandomEvent[] = Array.from(Array(50)).map((_, ix) => createRandomEvent(ix));

const initialData: LiveChartState = {
  events: initialEvents,
  originalEvents: initialEvents.map((event) => ({ ...event })),
  paused: false,
  pausedEvents: [],
  editingCell: null
};

const liveChartReducer = (state: LiveChartState, action: LiveChartAction): LiveChartState => {
  switch (action.type) {
    case 'new_event':
      if (state.paused) {
        // En mode pause, stocker l'événement pour plus tard
        return {
          ...state,
          pausedEvents: [...state.pausedEvents, action.payload]
        };
      }

      const newEvent = action.payload;
      return {
        ...state,
        events: [...state.events, newEvent],
        originalEvents: [...state.originalEvents, { ...newEvent }]
      };

    case 'toggle_paused':
      if (state.paused) {
        //retourner en mode normal et ajouter tous les événements stockés
        const allPausedEvents = [...state.pausedEvents];
        return {
          ...state,
          paused: false,
          events: [...state.events, ...allPausedEvents], // Ajouter tous les événements en une fois
          originalEvents: [...state.originalEvents, ...allPausedEvents.map((event) => ({ ...event }))],
          pausedEvents: [] // Vider le buffer après avoir ajouté les événements
        };
      } else {
        return {
          ...state,
          paused: true
        };
      }

    case 'update_events':
      return {
        ...state,
        events: action.payload
      };

    case 'edit_cell':
      return {
        ...state,
        editingCell: action.payload
      };

    case 'reset_values':
      return {
        ...state,
        events: state.originalEvents.map((event) => ({ ...event })),
        editingCell: null
      };

    default:
      throw new Error(`Unhandled action type: ${(action as LiveChartAction).type}`);
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
