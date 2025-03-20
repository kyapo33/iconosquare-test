import React, { FC } from 'react';
import { Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import useLiveChart from '../utils/hooks/useLiveChart';
import TimeControls from './TimeControls';

const LiveChart: FC = () => {
  const { eventsFiltered, handleChartClick } = useLiveChart();

  return (
    <div className='mb-8'>
      <div className='flex justify-between items-center mb-4'>
        <h2 className='text-xl font-semibold'>Live Chart</h2>
      </div>

      <TimeControls />

      <ResponsiveContainer height={250}>
        <AreaChart
          onClick={(event) => handleChartClick(event)}
          data={eventsFiltered}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
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
          <XAxis dataKey='index' />
          <YAxis />
          <CartesianGrid strokeDasharray='3 3' />
          <Tooltip />
          <Area
            isAnimationActive={false}
            type='monotone'
            dataKey='value1'
            stroke='#8884d8'
            fillOpacity={1}
            fill='url(#colorUv)'
          />
          <Area
            isAnimationActive={false}
            type='monotone'
            dataKey='value2'
            stroke='#82ca9d'
            fillOpacity={1}
            fill='url(#colorPv)'
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LiveChart;
