import React, { FC } from 'react';
import { useLiveTable } from '../utils/hooks/useLiveTable';
import EditableInput from './EditableInput';

const LiveTable: FC = () => {
  const { eventsFiltered, editingCell, editValue, handleCellClick, handleInputChange, handleSave, handleKeyPress } =
    useLiveTable();

  return (
    <div className='bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl shadow-lg overflow-hidden my-8 border border-indigo-100'>
      <div className='overflow-x-auto'>
        <table className='min-w-full'>
          <thead>
            <tr className='bg-gradient-to-r from-indigo-500/10 to-purple-500/10 text-left'>
              <th scope='col' className='px-6 py-4 text-xs font-semibold text-indigo-800 uppercase tracking-wider'>
                Index
              </th>
              <th
                scope='col'
                className='px-6 py-4 text-xs font-semibold text-indigo-800 text-center uppercase tracking-wider'
              >
                Value 1
              </th>
              <th
                scope='col'
                className='px-6 py-4 text-xs font-semibold text-indigo-800 text-center uppercase tracking-wider'
              >
                Value 2
              </th>
            </tr>
          </thead>
          <tbody>
            {eventsFiltered.map((event, idx) => (
              <tr
                key={event.index}
                className={`${idx % 2 === 0 ? 'bg-white' : 'bg-indigo-50/30'} hover:bg-indigo-100/40 transition-colors duration-150`}
              >
                <td className='px-6 py-4 whitespace-nowrap'>
                  <div className='flex items-center'>
                    <div className='text-sm font-medium text-gray-900'>{event.index}</div>
                  </div>
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <EditableInput
                    isEditing={!!(editingCell && editingCell.index === event.index && editingCell.field === 'value1')}
                    value={event.value1}
                    editValue={editValue}
                    index={event.index}
                    field='value1'
                    onCellClick={handleCellClick}
                    onInputChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    onSave={handleSave}
                  />
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <EditableInput
                    isEditing={!!(editingCell && editingCell.index === event.index && editingCell.field === 'value2')}
                    value={event.value2}
                    editValue={editValue}
                    index={event.index}
                    field='value2'
                    onCellClick={handleCellClick}
                    onInputChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    onSave={handleSave}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LiveTable;
