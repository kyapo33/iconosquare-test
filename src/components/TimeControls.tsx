import React, { FC } from 'react';
import { useTimeControls } from '../utils/hooks/useTimeControls';

const TimeControls: FC = () => {
  const { timeInfo, timeNavigation, playControls, resetControls } = useTimeControls();
  const { currentTime, maxTime, isAtStart, isAtEnd } = timeInfo;
  const { handleGoToStart, handleGoBack, handleGoForward, handleGoToEnd, handleSliderChange } = timeNavigation;
  const { isPaused, handleTogglePause } = playControls;
  const { handleReset } = resetControls;

  return (
    <div className='mb-4 bg-white p-4 rounded-lg shadow'>
      <h3 className='text-lg font-semibold mb-3 text-gray-700'>Time Navigation</h3>

      <div className='flex items-center mb-2'>
        <span className='text-xs text-gray-500 w-16'>
          {currentTime} / {maxTime}
        </span>
        <div className='flex-1 mx-2'>
          <input
            type='range'
            min={20}
            max={maxTime}
            value={currentTime}
            onChange={handleSliderChange}
            className='w-full h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer'
          />
        </div>
        <span className='text-xs text-gray-500 w-12 text-right'>{Math.round((currentTime / maxTime) * 100)}%</span>
      </div>

      <div className='flex justify-center space-x-3 mb-3'>
        <button
          onClick={handleGoToStart}
          disabled={isAtStart}
          className={`p-2 rounded ${
            isAtStart ? 'bg-gray-200 text-gray-400' : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
          title='Go to start'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-4 h-4'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5' />
          </svg>
        </button>

        <button
          onClick={handleGoBack}
          disabled={isAtStart}
          className={`p-2 rounded ${
            isAtStart ? 'bg-gray-200 text-gray-400' : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
          title='Back 5 events'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-4 h-4'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
          </svg>
        </button>

        <button
          onClick={handleTogglePause}
          className='p-2 rounded bg-blue-500 text-white hover:bg-blue-600'
          title={isPaused ? 'Play' : 'Pause'}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-4 h-4'
          >
            {isPaused ? (
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z'
              />
            ) : (
              <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 5.25v13.5m-7.5-13.5v13.5' />
            )}
          </svg>
        </button>

        <button onClick={handleReset} className='p-2 rounded bg-blue-500 text-white hover:bg-blue-600' title='Reset'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-4 h-4'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99'
            />
          </svg>
        </button>

        <button
          onClick={handleGoForward}
          disabled={isAtEnd}
          className={`p-2 rounded ${
            isAtEnd ? 'bg-gray-200 text-gray-400' : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
          title='Forward 5 events'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-4 h-4'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
          </svg>
        </button>

        <button
          onClick={handleGoToEnd}
          disabled={isAtEnd}
          className={`p-2 rounded ${
            isAtEnd ? 'bg-gray-200 text-gray-400' : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
          title='Go to end'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-4 h-4'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5' />
          </svg>
        </button>
      </div>
    </div>
  );
};
export default TimeControls;
