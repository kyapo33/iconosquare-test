import { useState } from 'react';
import { EditingCell, ValueField } from '../../types';
import { useLiveChartContext } from './useLiveChartContext';

export const useLiveTable = () => {
  const { data, dispatch } = useLiveChartContext();
  const [editingCell, setEditingCell] = useState<EditingCell | null>(null);
  const [editValue, setEditValue] = useState<string>('');

  const nbTotalEvents = data?.events?.length;
  const eventsFiltered = data.events.slice(nbTotalEvents - 20, nbTotalEvents);

  const handleCellClick = (event: React.MouseEvent, index: number, field: ValueField, value: number) => {
    setEditingCell({ index, field });
    setEditValue(value.toString());
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditValue(e.target.value);
  };

  const handleSave = () => {
    if (!editingCell) return;

    const numValue = Number(editValue);
    if (isNaN(numValue)) {
      setEditingCell(null);
      return;
    }

    const updatedEvents = data.events.map((event) => {
      if (event.index === editingCell.index) {
        return {
          ...event,
          [editingCell.field]: numValue
        };
      }
      return event;
    });

    dispatch({
      type: 'update_events',
      payload: updatedEvents
    });

    setEditingCell(null);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setEditingCell(null);
    }
  };

  return {
    editingCell,
    editValue,
    handleCellClick,
    handleInputChange,
    handleSave,
    handleKeyPress,
    nbTotalEvents,
    eventsFiltered
  };
};
