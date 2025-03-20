import React, { FC } from 'react';
import { ValueField } from '../types';

interface EditableInputProps {
  isEditing: boolean;
  value: number;
  editValue: string;
  index: number;
  field: ValueField;
  onCellClick: (e: React.MouseEvent, index: number, field: ValueField, value: number) => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
  onSave: () => void;
}

const EditableInput: FC<EditableInputProps> = ({
  isEditing,
  value,
  editValue,
  index,
  field,
  onCellClick,
  onInputChange,
  onKeyPress,
  onSave
}) => {
  return (
    <div className='text-sm font-medium transition-all duration-150 h-10 flex items-center justify-center'>
      {isEditing ? (
        <div className='w-24 h-10 flex items-center'>
          <input
            type='number'
            value={editValue}
            onChange={onInputChange}
            onKeyDown={onKeyPress}
            onBlur={onSave}
            autoFocus
            className='w-full p-2 border-0 bg-white ring-2 ring-indigo-400 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 h-10'
          />
        </div>
      ) : (
        <div
          className='w-24 h-10 flex items-center cursor-pointer'
          onClick={(event) => onCellClick(event, index, field, value)}
        >
          <span className='px-3 py-2 rounded-lg bg-gradient-to-r hover:from-indigo-100 hover:to-purple-100 inline-block text-indigo-700 font-medium border border-indigo-200 shadow-sm w-full text-center'>
            {value.toLocaleString()}
          </span>
        </div>
      )}
    </div>
  );
};

export default EditableInput;
