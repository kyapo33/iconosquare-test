import React, { FC } from 'react';
import { ValueField } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { inputVariants, valueVariants } from '../animations/variants';

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
      <AnimatePresence mode='wait'>
        {isEditing ? (
          <motion.div
            className='w-28 h-10 flex items-center'
            key='input'
            variants={inputVariants}
            initial='hidden'
            animate='visible'
            exit='exit'
          >
            <input
              type='number'
              value={editValue}
              onChange={onInputChange}
              onKeyDown={onKeyPress}
              onBlur={onSave}
              autoFocus
              className='w-full p-2 border-0 bg-white ring-2 ring-indigo-400 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 h-10 text-indigo-800'
            />
          </motion.div>
        ) : (
          <motion.div
            className='w-28 h-10 flex items-center cursor-pointer'
            key='display'
            variants={valueVariants}
            initial='hidden'
            animate='visible'
            whileHover='hover'
            whileTap='tap'
            onClick={(event) => onCellClick(event, index, field, value)}
          >
            <motion.span
              className='px-3 py-2 rounded-lg transition-all duration-200 inline-block text-slate-600 font-medium border border-slate-200 shadow-sm w-full text-center'
              layoutId={`value-${index}-${field}`}
            >
              {value.toLocaleString()}
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EditableInput;
