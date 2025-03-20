import React, { FC } from 'react';
import { Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import useLiveChart from '../utils/hooks/useLiveChart';
import TimeControls from './TimeControls';
import { motion } from 'framer-motion';
import { chartVariants } from '../animations/variants';
import { AnimatedContainer } from '../animations/AnimatedComponents';

const LiveChart: FC = () => {
  const { eventsFiltered, handleChartClick } = useLiveChart();

  return (
    <AnimatedContainer className='mb-10 bg-gradient-to-br from-white to-slate-50 rounded-xl shadow-xl p-6 border border-slate-100'>
      <TimeControls />
      <motion.div
        className='mt-6 bg-white rounded-xl p-3 shadow-inner'
        variants={chartVariants}
        whileHover={{ boxShadow: 'inset 0 2px 10px rgba(0, 0, 0, 0.07)' }}
      >
        <ResponsiveContainer height={320}>
          <AreaChart
            onClick={(event) => handleChartClick(event)}
            data={eventsFiltered}
            margin={{ top: 20, right: 30, left: 10, bottom: 10 }}
          >
            <defs>
              <linearGradient id='colorUv' x1='0' y1='0' x2='0' y2='1'>
                <stop offset='5%' stopColor='#8884d8' stopOpacity={0.8} />
                <stop offset='95%' stopColor='#8884d8' stopOpacity={0} />
              </linearGradient>
              <linearGradient id='colorPv' x1='0' y1='0' x2='0' y2='1'>
                <stop offset='5%' stopColor='#82ca9d' stopOpacity={0.8} />
                <stop offset='95%' stopColor='#82ca9d' stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey='index'
              tick={{ fill: '#6b7280', fontSize: 12 }}
              axisLine={{ stroke: '#e5e7eb' }}
              tickLine={{ stroke: '#e5e7eb' }}
            />
            <YAxis
              tick={{ fill: '#6b7280', fontSize: 12 }}
              axisLine={{ stroke: '#e5e7eb' }}
              tickLine={{ stroke: '#e5e7eb' }}
            />
            <CartesianGrid strokeDasharray='3 3' stroke='#f3f4f6' />
            <Tooltip />
            <Area
              type='monotone'
              dataKey='value1'
              name='Value 1'
              stroke='#8884d8'
              strokeWidth={2}
              fillOpacity={1}
              fill='url(#colorUv)'
            />
            <Area
              type='monotone'
              dataKey='value2'
              name='Value 2'
              stroke='#82ca9d'
              strokeWidth={2}
              fillOpacity={1}
              fill='url(#colorPv)'
            />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>
    </AnimatedContainer>
  );
};

export default LiveChart;
