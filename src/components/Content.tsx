import React, { FC } from 'react';
import LiveTable from './LiveTable';
import LiveChart from './LiveChart';

const Content: FC = () => {
  return (
    <div className='mx-auto max-w-7xl px-8'>
      <LiveChart />
      <LiveTable />
    </div>
  );
};

export default Content;
