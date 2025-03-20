import React, { FC } from 'react';
import { useLiveTable } from '../utils/hooks/useLiveTable';

const LiveTable: FC = () => {
  const {
    eventsFiltered,
    editingCell,
    editValue,
    handleCellClick,
    handleInputChange,
    handleSave,
    handleKeyPress,
    nbTotalEvents
  } = useLiveTable();

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
                  <div className='text-sm font-medium transition-all duration-150 h-10 flex items-center justify-center'>
                    {editingCell && editingCell.index === event.index && editingCell.field === 'value1' ? (
                      <div className='w-24 h-10 flex items-center'>
                        <input
                          type='number'
                          value={editValue}
                          onChange={handleInputChange}
                          onKeyDown={handleKeyPress}
                          onBlur={handleSave}
                          autoFocus
                          className='w-full p-2 border-0 bg-white ring-2 ring-indigo-400 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 h-10'
                        />
                      </div>
                    ) : (
                      <div
                        className='w-24 h-10 flex items-center cursor-pointer'
                        onClick={(e) => handleCellClick(e, event.index, 'value1', event.value1)}
                      >
                        <span className='px-3 py-2 rounded-lg bg-gradient-to-r hover:from-indigo-100 hover:to-purple-100 inline-block text-indigo-700 font-medium border border-indigo-200 shadow-sm w-full text-center'>
                          {event.value1.toLocaleString()}
                        </span>
                      </div>
                    )}
                  </div>
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <div className='text-sm font-medium transition-all duration-150 h-10 flex items-center justify-center'>
                    {editingCell && editingCell.index === event.index && editingCell.field === 'value2' ? (
                      <div className='w-24 h-10 flex items-center'>
                        <input
                          type='number'
                          value={editValue}
                          onChange={handleInputChange}
                          onKeyDown={handleKeyPress}
                          onBlur={handleSave}
                          autoFocus
                          className='w-full p-2 border-0 bg-white ring-2 ring-indigo-400 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 h-10'
                        />
                      </div>
                    ) : (
                      <div
                        className='w-24 h-10 flex items-center cursor-pointer'
                        onClick={(e) => handleCellClick(e, event.index, 'value2', event.value2)}
                      >
                        <span className='px-3 py-2 rounded-lg bg-gradient-to-r hover:from-indigo-100 hover:to-purple-100 inline-block text-indigo-700 font-medium border border-indigo-200 shadow-sm w-full text-center'>
                          {event.value2.toLocaleString()}
                        </span>
                      </div>
                    )}
                  </div>
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
