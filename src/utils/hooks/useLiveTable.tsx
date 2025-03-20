import { useState, useEffect } from 'react';
import { ValueField } from '../../types';
import { useLiveChartContext } from './useLiveChartContext';
import { useTimeControls } from './useTimeControls';

export const useLiveTable = () => {
  const { data, dispatch } = useLiveChartContext();
  const [editValue, setEditValue] = useState<string>('');

  const { eventsFiltered } = useTimeControls();

  // Réagir au changement de cellule en édition (venant du contexte)
  useEffect(() => {
    if (data.editingCell) {
      const eventToEdit = data.events.find((event) => event.index === data.editingCell?.index);
      if (eventToEdit) {
        setEditValue(eventToEdit[data.editingCell.field].toString());
      }
    }
  }, [data.editingCell, data.events]);

  const handleCellClick = (event: React.MouseEvent, index: number, field: ValueField, value: number) => {
    if (!data.paused) {
      dispatch({ type: 'toggle_paused' });
    }

    dispatch({
      type: 'edit_cell',
      payload: { index, field }
    });

    setEditValue(value.toString());
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditValue(e.target.value);
  };

  const handleSave = () => {
    if (!data.editingCell) return;

    const numValue = Number(editValue);
    if (isNaN(numValue)) {
      dispatch({ type: 'edit_cell', payload: null });
      return;
    }

    const updatedEvents = data.events.map((event) => {
      if (event.index === data.editingCell?.index) {
        return {
          ...event,
          [data.editingCell.field]: numValue
        };
      }
      return event;
    });

    dispatch({
      type: 'update_events',
      payload: updatedEvents
    });

    dispatch({ type: 'edit_cell', payload: null });

    if (data.paused && data.pausedEvents.length === 0) {
      dispatch({ type: 'toggle_paused' });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      dispatch({ type: 'edit_cell', payload: null });

      if (data.paused && data.pausedEvents.length === 0) {
        dispatch({ type: 'toggle_paused' });
      }
    }
  };

  return {
    editingCell: data.editingCell,
    editValue,
    handleCellClick,
    handleInputChange,
    handleSave,
    handleKeyPress,
    eventsFiltered
  };
};
