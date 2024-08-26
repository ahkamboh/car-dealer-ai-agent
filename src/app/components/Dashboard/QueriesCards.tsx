// components/Queries.tsx
import React, { useState } from 'react';
  {/* @ts-ignore */}
import QueriesTable, { QueryData } from './QueriesTable';
import QueryForm from './QueriesForm';
import {

  BarList,
  Color,
  ProgressBar,
  SparkBarChart,
  Tracker,

} from '@tremor/react';


interface Tracker {
  color: Color;
  tooltip: string;
}
const datahero = [
  { name: '/Augest', value: 456 },


];

const chartdata = [
  {
    month: 'Jan 21',
    Performance: 4000,
    Benchmark: 3000,
  },
  {
    month: 'Feb 21',
    Performance: 3000,
    Benchmark: 2000,
  },
  {
    month: 'Mar 21',
    Performance: 2000,
    Benchmark: 1700,
  },
  {
    month: 'Apr 21',
    Performance: 2780,
    Benchmark: 2500,
  },
  {
    month: 'May 21',
    Performance: 1890,
    Benchmark: 1890,
  },
  {
    month: 'Jun 21',
    Performance: 2390,
    Benchmark: 2000,
  },
  {
    month: 'Jul 21',
    Performance: 3490,
    Benchmark: 3000,
  },
];

const data: Tracker[] = [
  { color: 'emerald', tooltip: 'Operational' },
  { color: 'emerald', tooltip: 'Operational' },
  { color: 'emerald', tooltip: 'Operational' },
  { color: 'emerald', tooltip: 'Operational' },
  { color: 'emerald', tooltip: 'Operational' },
  { color: 'emerald', tooltip: 'Operational' },
  { color: 'emerald', tooltip: 'Operational' },
  { color: 'emerald', tooltip: 'Operational' },
  { color: 'emerald', tooltip: 'Operational' },
  { color: 'emerald', tooltip: 'Operational' },
  { color: 'emerald', tooltip: 'Operational' },
  { color: 'emerald', tooltip: 'Operational' },
  { color: 'emerald', tooltip: 'Operational' },
  { color: 'emerald', tooltip: 'Operational' },
  { color: 'rose', tooltip: 'Downtime' },
  { color: 'emerald', tooltip: 'Operational' },
  { color: 'emerald', tooltip: 'Operational' },
  { color: 'emerald', tooltip: 'Operational' },
  { color: 'emerald', tooltip: 'Operational' },
  { color: 'gray', tooltip: 'Maintenance' },
  { color: 'emerald', tooltip: 'Operational' },
  { color: 'emerald', tooltip: 'Operational' },
  { color: 'emerald', tooltip: 'Operational' },
  { color: 'yellow', tooltip: 'Degraded' },
  { color: 'emerald', tooltip: 'Operational' },
];


interface QueriesProps {
  isFormVisible: boolean;
}

function QueriesCards() {
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      <div className="w-full p-2 bg-[#242424] border rounded-md border-[#5c5a5acb]">
        <div className="flex w-full text-white p-4 justify-between">
          <div className="plus-jakarta-sans-400 grid">
            Today Queries
            <span className="plus-jakarta-sans-700 text-xl ">120</span>
          </div>
          <div className="w-10 h-10 bg-[#22303a] rounded-lg flex justify-center items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 23 23"  fill="none" stroke="#0D99FF" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-between-vertical-end"><rect width="7" height="13" x="3" y="3" rx="1"/><path d="m9 22 3-3 3 3"/><rect width="7" height="13" x="14" y="3" rx="1"/></svg>
          </div>
        </div>
        <Tracker data={data} className="mt-2" />

      </div>
      <div className="w-full p-2 bg-[#242424] border rounded-md border-[#5c5a5acb]">
        <div className="flex w-full text-white p-4 justify-between">
          <div className="plus-jakarta-sans-400 grid">
            Yesterday Queries
            <span className="plus-jakarta-sans-700 text-xl ">120</span>
          </div>
          <div className="w-10 h-10 bg-[#22303a] rounded-lg flex justify-center items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 23 23"  fill="none" stroke="#0D99FF"  stroke-width="1" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-between-vertical-start"><rect width="7" height="13" x="3" y="8" rx="1"/><path d="m15 2-3 3-3-3"/><rect width="7" height="13" x="14" y="8" rx="1"/></svg>
          </div>
        </div>

        <div className="w-full"><SparkBarChart
          data={chartdata}
          index="date"
          categories={['Performance', 'Benchmark']}
          colors={['blue', 'cyan']}
          className='w-full'
        />
        </div>

      </div>
      <div className="w-full p-2 bg-[#242424] border rounded-md border-[#5c5a5acb]">
        <div className="flex w-full text-white p-4 justify-between">
          <div className="plus-jakarta-sans-400 grid">
            Weekly Queries
            <span className="plus-jakarta-sans-700 text-xl ">120</span>
          </div>
          <div className="w-10 h-10 bg-[#22303a] rounded-lg flex justify-center items-center">

            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 23 23" fill="none" stroke="#0D99FF" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-calendar-cog"><path d="m15.2 16.9-.9-.4" /><path d="m15.2 19.1-.9.4" /><path d="M16 2v4" /><path d="m16.9 15.2-.4-.9" /><path d="m16.9 20.8-.4.9" /><path d="m19.5 14.3-.4.9" /><path d="m19.5 21.7-.4-.9" /><path d="M21 10.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6" /><path d="m21.7 16.5-.9.4" /><path d="m21.7 19.5-.9-.4" /><path d="M3 10h18" /><path d="M8 2v4" /><circle cx="18" cy="18" r="3" /></svg>
          </div>
        </div>
        <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content flex items-center justify-between">
          <span>$9,012 &bull; 45%</span>
          <span>$20,000</span>
        </p>
        <ProgressBar value={45} color="teal" className="mt-5" />
      </div>
      <div className="w-full p-2 bg-[#242424] border rounded-md border-[#5c5a5acb]">
        <div className="flex w-full text-white p-4 justify-between">
          <div className="plus-jakarta-sans-400 grid">
            Monthly Queries
            <span className="plus-jakarta-sans-700 text-xl ">120</span>
          </div>
          <div className="w-10 h-10 bg-[#22303a] rounded-lg flex justify-center items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 23 23" fill="none" stroke="#0D99FF" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-calendar-check"><path d="M8 2v4" /><path d="M16 2v4" /><rect width="18" height="18" x="3" y="4" rx="2" /><path d="M3 10h18" /><path d="m9 16 2 2 4-4" /></svg>
          </div>
        </div>
        <BarList data={datahero} className="mx-auto max-w-sm mt-4" />
      </div>
    </div>
  );
}

export default QueriesCards;
