import React, { act } from 'react';
import { renderHook } from '@testing-library/react';
import { LiveChartProvider, useLiveChartContext } from '../../utils/hooks/useLiveChartContext';
import { RandomEvent } from '../../types';

// Helper pour créer un événement aléatoire de test
const createTestEvent = (index: number): RandomEvent => ({
  index,
  value1: index * 10,
  value2: index * 20,
  comment: `Test event ${index}`
});

describe('useLiveChartContext reducer', () => {
  // Helper pour tester directement le réducteur
  const renderReducerHook = () => {
    return renderHook(() => useLiveChartContext(), {
      wrapper: ({ children }) => <LiveChartProvider>{children}</LiveChartProvider>
    });
  };

  // Test 1: Action 'new_event' quand pause est désactivée
  test('should add new event when not paused', () => {
    const { result } = renderReducerHook();

    const initialLength = result.current.data.events.length;
    const newEvent = createTestEvent(initialLength + 1);

    act(() => {
      result.current.dispatch({ type: 'new_event', payload: newEvent });
    });

    expect(result.current.data.events.length).toBe(initialLength + 1);
    expect(result.current.data.events[initialLength]).toEqual(newEvent);
    expect(result.current.data.originalEvents.length).toBe(initialLength + 1);
    expect(result.current.data.timeIndex).toBe(initialLength + 1);
  });

  // Test 2: Action 'new_event' quand pause est activée
  test('should save new event when paused', () => {
    const { result } = renderReducerHook();

    // D'abord, mettre en pause
    act(() => {
      result.current.dispatch({ type: 'toggle_paused' });
    });

    const initialLength = result.current.data.events.length;
    const newEvent = createTestEvent(initialLength + 1);

    act(() => {
      result.current.dispatch({ type: 'new_event', payload: newEvent });
    });

    // Les événements ne changent pas, mais le pausedEvents contient le nouvel événement
    expect(result.current.data.events.length).toBe(initialLength);
    expect(result.current.data.pausedEvents.length).toBe(1);
    expect(result.current.data.pausedEvents[0]).toEqual(newEvent);
  });

  // Test 3: Action 'toggle_paused' - activer la pause
  test('should toggle pause state to true', () => {
    const { result } = renderReducerHook();

    expect(result.current.data.paused).toBe(false);

    act(() => {
      result.current.dispatch({ type: 'toggle_paused' });
    });

    expect(result.current.data.paused).toBe(true);
  });

  // Test 4: Action 'toggle_paused' - désactiver la pause et ajouter les événements générer pendant la pause
  test('should toggle pause state to false and add paused events', () => {
    const { result } = renderReducerHook();

    // D'abord, mettre en pause
    act(() => {
      result.current.dispatch({ type: 'toggle_paused' });
    });

    const initialLength = result.current.data.events.length;
    const newEvent1 = createTestEvent(initialLength + 1);
    const newEvent2 = createTestEvent(initialLength + 2);

    // Ajouter des événements en pause
    act(() => {
      result.current.dispatch({ type: 'new_event', payload: newEvent1 });
      result.current.dispatch({ type: 'new_event', payload: newEvent2 });
    });

    expect(result.current.data.pausedEvents.length).toBe(2);

    // Désactiver la pause
    act(() => {
      result.current.dispatch({ type: 'toggle_paused' });
    });

    // Vérifier que les événements ont été ajoutés
    expect(result.current.data.paused).toBe(false);
    expect(result.current.data.events.length).toBe(initialLength + 2);
    expect(result.current.data.pausedEvents.length).toBe(0);
    expect(result.current.data.timeIndex).toBe(initialLength + 2);

    // Vérifier que les originalEvents ont également été mis à jour
    expect(result.current.data.originalEvents.length).toBe(initialLength + 2);
    expect(result.current.data.originalEvents[initialLength]).toEqual(newEvent1);
    expect(result.current.data.originalEvents[initialLength + 1]).toEqual(newEvent2);
  });

  // Test 5: Action 'update_events'
  test('should update events with new values', () => {
    const { result } = renderReducerHook();

    const updatedEvents = [...result.current.data.events];
    updatedEvents[0] = { ...updatedEvents[0], value1: 999 };

    act(() => {
      result.current.dispatch({ type: 'update_events', payload: updatedEvents });
    });

    expect(result.current.data.events[0].value1).toBe(999);
    expect(result.current.data.events.length).toBe(updatedEvents.length);

    // Vérifier que originalEvents n'a pas été modifié
    expect(result.current.data.originalEvents[0].value1).not.toBe(999);
  });

  // Test 6: Action 'edit_cell'
  test('should set and clear editing cell', () => {
    const { result } = renderReducerHook();

    const editingCell = { index: 2, field: 'value1' as const };

    act(() => {
      result.current.dispatch({ type: 'edit_cell', payload: editingCell });
    });

    expect(result.current.data.editingCell).toEqual(editingCell);

    // Clear editing cell
    act(() => {
      result.current.dispatch({ type: 'edit_cell', payload: null });
    });

    expect(result.current.data.editingCell).toBeNull();
  });

  // Test 7: Action 'reset_values'
  test('should reset values to original events', () => {
    const { result } = renderReducerHook();

    // Modifier un événement
    const updatedEvents = [...result.current.data.events];
    updatedEvents[0] = { ...updatedEvents[0], value1: 999 };

    act(() => {
      result.current.dispatch({ type: 'update_events', payload: updatedEvents });
    });

    expect(result.current.data.events[0].value1).toBe(999);

    // Réinitialiser les valeurs
    act(() => {
      result.current.dispatch({ type: 'reset_values' });
    });

    // Vérifier que les valeurs sont revenues à l'original
    expect(result.current.data.events[0].value1).toBe(result.current.data.originalEvents[0].value1);
    expect(result.current.data.editingCell).toBeNull();

    // Vérifier que tous les événements sont réinitialisés
    result.current.data.events.forEach((event, index) => {
      expect(event).toEqual(result.current.data.originalEvents[index]);
    });
  });

  // Test 8: Action 'go_to_time'
  test('should navigate to specific time and pause', () => {
    const { result } = renderReducerHook();

    // D'abord, obtenons les valeurs nécessaires
    const maxTimeIndex = result.current.data.maxTimeIndex;
    const eventsLength = result.current.data.events.length;

    // Tester avec une valeur trop petite (en dessous de maxTimeIndex)
    const tooSmallTime = maxTimeIndex - 1;
    act(() => {
      result.current.dispatch({ type: 'go_to_time', payload: tooSmallTime });
    });

    // La valeur ne peut pas descendre en dessous de maxTimeIndex
    expect(result.current.data.timeIndex).toBe(maxTimeIndex);
    expect(result.current.data.paused).toBe(true);

    // Tester avec une valeur valide (entre maxTimeIndex et events.length)
    const validTime = Math.max(maxTimeIndex + 1, Math.min(eventsLength - 1, maxTimeIndex + 2));

    act(() => {
      result.current.dispatch({ type: 'go_to_time', payload: validTime });
    });

    // La valeur devrait être exactement celle que nous avons demandée
    expect(result.current.data.timeIndex).toBe(validTime);
    expect(result.current.data.paused).toBe(true);

    // Tester avec une valeur trop grande (au-dessus de events.length)
    const tooLargeTime = eventsLength + 1;

    act(() => {
      result.current.dispatch({ type: 'go_to_time', payload: tooLargeTime });
    });

    // La valeur devrait être contrainte à events.length
    expect(result.current.data.timeIndex).toBe(eventsLength);
    expect(result.current.data.paused).toBe(true);
  });

  // Test supplémentaire pour go_to_time avec des valeurs limites
  test('should constrain timeIndex within valid bounds', () => {
    const { result } = renderReducerHook();

    // Essayer d'aller à un index négatif
    act(() => {
      result.current.dispatch({ type: 'go_to_time', payload: -5 });
    });

    // La valeur devrait être contrainte au maximum entre maxTimeIndex et events.length
    expect(result.current.data.timeIndex).toBe(result.current.data.maxTimeIndex);

    // Essayer d'aller à un index supérieur au nombre d'événements
    const tooLargeIndex = result.current.data.events.length + 10;

    act(() => {
      result.current.dispatch({ type: 'go_to_time', payload: tooLargeIndex });
    });

    // La valeur devrait être contrainte au nombre d'événements
    expect(result.current.data.timeIndex).toBe(result.current.data.events.length);
  });
});
