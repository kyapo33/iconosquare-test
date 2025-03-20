import React, { FC } from 'react';
import { useTimeControls } from '../utils/hooks/useTimeControls';
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PlayIcon,
  PauseIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';
import { timeControlsContainerVariants, buttonHoverEffect, buttonTapEffect } from '../animations/variants';
import { AnimatedContainer, AnimatedItem, AnimatedButton, AnimatedText } from '../animations/AnimatedComponents';

const TimeControls: FC = () => {
  const { timeInfo, timeNavigation, playControls, resetControls } = useTimeControls();
  const { currentTime, maxTime, isAtStart, isAtEnd } = timeInfo;
  const { handleGoToStart, handleGoBack, handleGoForward, handleGoToEnd, handleSliderChange } = timeNavigation;
  const { isPaused, handleTogglePause } = playControls;
  const { handleReset } = resetControls;

  return (
    <AnimatedContainer
      className='bg-white rounded-xl shadow-md p-5 border border-slate-100'
      variants={timeControlsContainerVariants}
    >
      <AnimatedItem className='flex items-center justify-between mb-4'>
        <h3 className='text-lg font-bold text-indigo-600'>Time Navigation</h3>
        <motion.div
          className='flex items-center gap-2 bg-indigo-50 px-3 py-1 rounded-full'
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <AnimatedText
            className='text-sm font-medium text-indigo-700'
            key={currentTime}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            {Math.round((currentTime / maxTime) * 100)}%
          </AnimatedText>
        </motion.div>
      </AnimatedItem>

      <AnimatedItem className='flex items-center gap-4 mb-4'>
        <AnimatedText
          className='text-sm font-medium text-slate-500 min-w-[60px]'
          key={currentTime}
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          {currentTime} / {maxTime}
        </AnimatedText>
        <div className='relative flex-1'>
          <input
            type='range'
            min={20}
            max={maxTime}
            value={currentTime}
            onChange={handleSliderChange}
            className='w-full h-2 appearance-none bg-slate-200 rounded-full outline-none cursor-pointer slider-thumb'
          />
        </div>
      </AnimatedItem>

      <AnimatedItem className='flex justify-center items-center gap-2'>
        <motion.div className='flex items-center bg-slate-100 p-1 rounded-lg' whileHover={{ scale: 1.02 }}>
          <AnimatedButton
            onClick={handleGoToStart}
            disabled={isAtStart}
            className={`p-2 rounded-md transition-all duration-200 ${
              isAtStart
                ? 'text-slate-400 cursor-not-allowed'
                : 'text-indigo-600 hover:bg-indigo-50 active:bg-indigo-100'
            }`}
            title='Go to start'
            whileHover={!isAtStart ? buttonHoverEffect : {}}
            whileTap={!isAtStart ? buttonTapEffect : {}}
          >
            <ChevronDoubleLeftIcon className='w-5 h-5' />
          </AnimatedButton>

          <AnimatedButton
            onClick={handleGoBack}
            disabled={isAtStart}
            className={`p-2 rounded-md transition-all duration-200 ${
              isAtStart
                ? 'text-slate-400 cursor-not-allowed'
                : 'text-indigo-600 hover:bg-indigo-50 active:bg-indigo-100'
            }`}
            title='Back 5 events'
            whileHover={!isAtStart ? buttonHoverEffect : {}}
            whileTap={!isAtStart ? buttonTapEffect : {}}
          >
            <ChevronLeftIcon className='w-5 h-5' />
          </AnimatedButton>
        </motion.div>

        <AnimatedButton
          onClick={handleTogglePause}
          className='p-3 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md hover:shadow-lg transition-all duration-200'
          title={isPaused ? 'Play' : 'Pause'}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          initial={{ rotate: 0 }}
          animate={{ rotate: isPaused ? 0 : 0 }}
        >
          <AnimatePresence mode='wait'>
            {isPaused ? (
              <motion.div
                key='play'
                initial={{ opacity: 0, rotate: -30 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 30 }}
                transition={{ duration: 0.2 }}
              >
                <PlayIcon className='w-5 h-5' />
              </motion.div>
            ) : (
              <motion.div
                key='pause'
                initial={{ opacity: 0, rotate: -30 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 30 }}
                transition={{ duration: 0.2 }}
              >
                <PauseIcon className='w-5 h-5' />
              </motion.div>
            )}
          </AnimatePresence>
        </AnimatedButton>

        <AnimatedButton
          onClick={handleReset}
          className='p-2 rounded-full bg-slate-100 text-indigo-600 hover:bg-indigo-50 active:bg-indigo-100 transition-all duration-200'
          title='Reset'
          whileHover={{ scale: 1.1, rotate: 180 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.3 }}
        >
          <ArrowPathIcon className='w-5 h-5' />
        </AnimatedButton>

        <motion.div className='flex items-center bg-slate-100 p-1 rounded-lg' whileHover={{ scale: 1.02 }}>
          <AnimatedButton
            onClick={handleGoForward}
            disabled={isAtEnd}
            className={`p-2 rounded-md transition-all duration-200 ${
              isAtEnd ? 'text-slate-400 cursor-not-allowed' : 'text-indigo-600 hover:bg-indigo-50 active:bg-indigo-100'
            }`}
            title='Forward 5 events'
            whileHover={!isAtEnd ? buttonHoverEffect : {}}
            whileTap={!isAtEnd ? buttonTapEffect : {}}
          >
            <ChevronRightIcon className='w-5 h-5' />
          </AnimatedButton>

          <AnimatedButton
            onClick={handleGoToEnd}
            disabled={isAtEnd}
            className={`p-2 rounded-md transition-all duration-200 ${
              isAtEnd ? 'text-slate-400 cursor-not-allowed' : 'text-indigo-600 hover:bg-indigo-50 active:bg-indigo-100'
            }`}
            title='Go to end'
            whileHover={!isAtEnd ? buttonHoverEffect : {}}
            whileTap={!isAtEnd ? buttonTapEffect : {}}
          >
            <ChevronDoubleRightIcon className='w-5 h-5' />
          </AnimatedButton>
        </motion.div>
      </AnimatedItem>
    </AnimatedContainer>
  );
};

export default TimeControls;
