import React, { FC } from 'react';
import { useLiveTable } from '../utils/hooks/useLiveTable';
import EditableInput from './EditableInput';
import { motion, AnimatePresence } from 'framer-motion';
import { rowVariants, tableContainerVariants } from '../animations/variants';
import { AnimatedContainer } from '../animations/AnimatedComponents';

const LiveTable: FC = () => {
  const { eventsFiltered, editingCell, editValue, handleCellClick, handleInputChange, handleSave, handleKeyPress } =
    useLiveTable();

  return (
    <AnimatedContainer className='bg-gradient-to-br from-white to-slate-50 rounded-xl shadow-xl p-6 border border-slate-100'>
      <motion.div className='bg-white rounded-xl shadow-inner overflow-hidden' variants={tableContainerVariants}>
        <div className='overflow-x-auto'>
          <table className='min-w-full divide-y divide-slate-200'>
            <thead>
              <tr className='bg-gradient-to-r from-indigo-50 to-violet-50'>
                <motion.th
                  scope='col'
                  className='px-6 py-4 text-xs font-semibold text-indigo-600 uppercase tracking-wider'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.3 }}
                >
                  Index
                </motion.th>
                <motion.th
                  scope='col'
                  className='px-6 py-4 text-xs font-semibold text-indigo-600 text-center uppercase tracking-wider'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.3 }}
                >
                  Value 1
                </motion.th>
                <motion.th
                  scope='col'
                  className='px-6 py-4 text-xs font-semibold text-indigo-600 text-center uppercase tracking-wider'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.3 }}
                >
                  Value 2
                </motion.th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-slate-100'>
              <AnimatePresence>
                {eventsFiltered.length === 0 ? (
                  <motion.tr initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <td colSpan={3} className='px-6 py-10 text-center text-sm text-slate-500'>
                      No data available
                    </td>
                  </motion.tr>
                ) : (
                  eventsFiltered.map((event, idx) => (
                    <motion.tr
                      key={event.index}
                      custom={idx}
                      variants={rowVariants}
                      initial='hidden'
                      animate='visible'
                      whileHover='hover'
                      className={`${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'} transition-colors duration-150`}
                    >
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <div className='flex items-center'>
                          <div className='text-sm font-medium text-slate-700'>{event.index}</div>
                        </div>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <EditableInput
                          isEditing={
                            !!(editingCell && editingCell.index === event.index && editingCell.field === 'value1')
                          }
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
                          isEditing={
                            !!(editingCell && editingCell.index === event.index && editingCell.field === 'value2')
                          }
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
                    </motion.tr>
                  ))
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </motion.div>
      <motion.div
        className='mt-4 text-xs text-slate-500 italic px-2'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        Click on any value to edit it
      </motion.div>
    </AnimatedContainer>
  );
};

export default LiveTable;
