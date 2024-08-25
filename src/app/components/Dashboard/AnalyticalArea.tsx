import React, { useEffect, useState } from 'react';
import { CircularBarChart } from '../../components/Charts/CircularBarChart';
import { AreaCharts } from '../../components/Charts/AreaCharts';
import { LineChars } from '../../components/Charts/LineCharts';
import { BarCharts } from '../../components/Charts/BarCharts';
import TodoList from './TodoList';
import ChatComponent from './ChatComponent';
import ActiveUsersMap from './ActiveUsersMap';

function AnalyticalArea() {
  const [queryData, setQueryData] = useState([]);
  const [todayQueries, setTodayQueries] = useState(0);
  const [yesterdayQueries, setYesterdayQueries] = useState(0);
  const [monthlyQueries, setMonthlyQueries] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://crm-backend-gold.vercel.app/api/query');
        if (response.ok) {
          const data = await response.json();
          setQueryData(data);
  
          // Get current date and adjust for time zone by stripping time parts
          const now = new Date();
          const todayDateString = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString().split('T')[0];
          const yesterdayDateString = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1).toISOString().split('T')[0];
          const currentMonth = now.getMonth();
          const currentYear = now.getFullYear();

          // Filter queries for today, yesterday, and this month
          const todayCount = data.filter((query: { querydate: string }) => {
            const queryDateString = new Date(query.querydate).toISOString().split('T')[0];
            return queryDateString === todayDateString;
          }).length;
  
          const yesterdayCount = data.filter((query: { querydate: string }) => {
            const queryDateString = new Date(query.querydate).toISOString().split('T')[0];
            return queryDateString === yesterdayDateString;
          }).length;
  
          const monthlyCount = data.filter((query: { querydate: string }) => {
            const queryDate = new Date(query.querydate);
            return (
              queryDate.getFullYear() === currentYear &&
              queryDate.getMonth() === currentMonth
            );
          }).length;
  
          setTodayQueries(todayCount);
          setYesterdayQueries(yesterdayCount);
          setMonthlyQueries(monthlyCount);
        } else {
          console.error('Failed to fetch data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);

  return (
    <div className="w-full h-full bg-[#261e35] overflow-y-auto p-5" style={{ height: 'calc(100vh - 6rem)' }}>
      {/* Cards  */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="w-full bg-[#3c354a] border rounded-md border-[#5c5a5acb]">
          <div className="flex w-full text-white p-4 justify-between">
            <div className="plus-jakarta-sans-400 grid">
              Today Queries
              <span className="plus-jakarta-sans-700 text-xl ">{todayQueries}</span>
            </div>
            <div className="w-10 h-10 bg-[#372c44] rounded-lg flex justify-center items-center">
              <svg width="22" height="22" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.0346 3.25977H7.6072C4.78845 3.25977 3.02112 5.25535 3.02112 8.08052V15.7017C3.02112 18.5269 4.7802 20.5224 7.6072 20.5224H15.6959C18.5238 20.5224 20.2829 18.5269 20.2829 15.7017V12.0094"  stroke="#ec5eb7" strokeLinecap="round" strokeLinejoin="round" />
                <path fillRule="evenodd" clipRule="evenodd" d="M8.59214 10.714L15.4424 3.86374C16.2958 3.01124 17.6791 3.01124 18.5325 3.86374L19.6481 4.97932C20.5015 5.83274 20.5015 7.21691 19.6481 8.06941L12.7648 14.9527C12.3917 15.3258 11.8857 15.5357 11.3577 15.5357H7.92389L8.01006 12.0707C8.02289 11.561 8.23097 11.0752 8.59214 10.714Z"  stroke="#ec5eb7" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M14.4014 4.92212L18.5869 9.10762" stroke="#ec5eb7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
          <div className="w-full">
           
<svg width="207" height="80" viewBox="0 0 207 80" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1 79L37.1498 46.5847C37.957 45.8609 39.1941 45.9121 39.9387 46.7003L56.3531 64.0734C56.8422 64.5911 57.5699 64.8096 58.2634 64.647L94.943 56.0464C95.4738 55.922 95.9307 55.5862 96.2081 55.1169L115.211 22.9666C115.976 21.6728 117.841 21.6531 118.633 22.9305L138.454 54.9054C138.818 55.4937 139.461 55.8516 140.154 55.8516H175.443C176.18 55.8516 176.858 55.4457 177.206 54.7954L206 1" stroke="url(#paint0_linear_60_185)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M1 79L37.1498 46.5847C37.957 45.8609 39.1941 45.9121 39.9387 46.7003L56.3531 64.0734C56.8422 64.5911 57.5699 64.8096 58.2634 64.647L94.943 56.0464C95.4738 55.922 95.9307 55.5862 96.2081 55.1169L115.211 22.9666C115.976 21.6728 117.841 21.6531 118.633 22.9305L138.454 54.9054C138.818 55.4937 139.461 55.8516 140.154 55.8516H175.443C176.18 55.8516 176.858 55.4457 177.206 54.7954L206 1" stroke="url(#paint1_linear_60_185)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<defs>
<linearGradient id="paint0_linear_60_185" x1="206" y1="20.4997" x2="41.0906" y2="17.5079" gradientUnits="userSpaceOnUse">
<stop stop-color="#E323FF"/>
<stop offset="1" stop-color="#7517F8"/>
</linearGradient>
<linearGradient id="paint1_linear_60_185" x1="1" y1="79" x2="206" y2="79" gradientUnits="userSpaceOnUse">
<stop stop-color="#3C354A"/>
<stop offset="1" stop-color="white" stop-opacity="0"/>
</linearGradient>
</defs>
</svg>

          </div>
        </div>
        <div className="w-full bg-[#3c354a] border rounded-md border-[#5c5a5acb]">
          <div className="flex w-full text-white p-4 justify-between">
            <div className="plus-jakarta-sans-400 grid">
              Yesterday Queries
              <span className="plus-jakarta-sans-700 text-xl ">{yesterdayQueries}</span>
            </div>
            <div className="w-10 h-10 bg-[#372c44] rounded-lg flex justify-center items-center">
              <svg width="22" height="22" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.0346 3.25977H7.6072C4.78845 3.25977 3.02112 5.25535 3.02112 8.08052V15.7017C3.02112 18.5269 4.7802 20.5224 7.6072 20.5224H15.6959C18.5238 20.5224 20.2829 18.5269 20.2829 15.7017V12.0094"  stroke="#ec5eb7" strokeLinecap="round" strokeLinejoin="round" />
                <path fillRule="evenodd" clipRule="evenodd" d="M8.59214 10.714L15.4424 3.86374C16.2958 3.01124 17.6791 3.01124 18.5325 3.86374L19.6481 4.97932C20.5015 5.83274 20.5015 7.21691 19.6481 8.06941L12.7648 14.9527C12.3917 15.3258 11.8857 15.5357 11.3577 15.5357H7.92389L8.01006 12.0707C8.02289 11.561 8.23097 11.0752 8.59214 10.714Z"  stroke="#ec5eb7" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M14.4014 4.92212L18.5869 9.10762" stroke="#ec5eb7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
          <div className="w-full">
            
<svg width="202" height="70" viewBox="0 0 202 70" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1.5 68.5L19.2589 37.0805C20.0245 35.7259 21.9755 35.7259 22.7411 37.0805L38.9995 65.8453C39.7081 67.0989 41.4695 67.2154 42.337 66.066L60.2862 42.2833C60.4276 42.0959 60.601 41.9349 60.7983 41.8076L89.6645 23.1842C90.651 22.5477 91.971 22.8939 92.5182 23.9325L114.403 65.4695C115.117 66.8239 117.026 66.9071 117.854 65.6199L139.207 32.4551C139.399 32.1571 139.667 31.9154 139.983 31.7548L200.5 1" stroke="url(#paint0_linear_60_162)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M1.5 68.5L19.2589 37.0805C20.0245 35.7259 21.9755 35.7259 22.7411 37.0805L38.9995 65.8453C39.7081 67.0989 41.4695 67.2154 42.337 66.066L60.2862 42.2833C60.4276 42.0959 60.601 41.9349 60.7983 41.8076L89.6645 23.1842C90.651 22.5477 91.971 22.8939 92.5182 23.9325L114.403 65.4695C115.117 66.8239 117.026 66.9071 117.854 65.6199L139.207 32.4551C139.399 32.1571 139.667 31.9154 139.983 31.7548L200.5 1" stroke="url(#paint1_linear_60_162)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<defs>
<linearGradient id="paint0_linear_60_162" x1="200.5" y1="-8.99974" x2="8.75521" y2="-8.99974" gradientUnits="userSpaceOnUse">
<stop stop-color="#4DFFDF"/>
<stop offset="1" stop-color="#4DA1FF"/>
</linearGradient>
<linearGradient id="paint1_linear_60_162" x1="1.5" y1="68.5" x2="200.5" y2="68.5" gradientUnits="userSpaceOnUse">
<stop stop-color="#3C354A"/>
<stop offset="1" stop-color="white" stop-opacity="0"/>
</linearGradient>
</defs>
</svg>

          </div>
        </div>
        <div className="w-full bg-[#3c354a] border rounded-md border-[#5c5a5acb]">
          <div className="flex w-full text-white p-4 justify-between">
            <div className="plus-jakarta-sans-400 grid">
              Monthly Queries
              <span className="plus-jakarta-sans-700 text-xl ">{monthlyQueries}</span>
            </div>
            <div className="w-10 h-10 bg-[#2f2727] rounded-lg flex justify-center items-center">
              <svg width="22" height="22" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.0346 3.25977H7.6072C4.78845 3.25977 3.02112 5.25535 3.02112 8.08052V15.7017C3.02112 18.5269 4.7802 20.5224 7.6072 20.5224H15.6959C18.5238 20.5224 20.2829 18.5269 20.2829 15.7017V12.0094"  stroke="#ec5eb7" strokeLinecap="round" strokeLinejoin="round" />
                <path fillRule="evenodd" clipRule="evenodd" d="M8.59214 10.714L15.4424 3.86374C16.2958 3.01124 17.6791 3.01124 18.5325 3.86374L19.6481 4.97932C20.5015 5.83274 20.5015 7.21691 19.6481 8.06941L12.7648 14.9527C12.3917 15.3258 11.8857 15.5357 11.3577 15.5357H7.92389L8.01006 12.0707C8.02289 11.561 8.23097 11.0752 8.59214 10.714Z" stroke="#0D99FF" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M14.4014 4.92212L18.5869 9.10762" stroke="#0D99FF" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
          <div className="w-full">
            <img src="/images/dashboard/blueGraphLine.svg" className='w-full' alt="blueGraphLine-Today-queries" />
          </div>
        </div>
        <div className="w-full text-white  bg-[#3c354a] border rounded-md border-[#5c5a5acb]  relative justify-center grid">
          <div className="plus-jakarta-sans-400 w-full text-end px-4 pt-2">
            Monthly Queries
          </div>
          <div className="relative -top-4"><CircularBarChart /> </div>
        </div>
      </div>
      <div className="mt-5 flex gap-5">
        <div className="w-full bg-[#3c354a] border rounded-md border-[#5c5a5acb] p-3">
          <AreaCharts />
        </div>
        <div className="w-full bg-[#3c354a] border rounded-md border-[#5c5a5acb] p-3">
          <LineChars />
        </div>
      </div>
      <div className="mt-5 flex gap-5">
        <div className="w-full bg-[#3c354a] border rounded-md border-[#5c5a5acb] p-3">
          <BarCharts />
        </div>
        <div className="w-full bg-[#3c354a] border rounded-md border-[#5c5a5acb] p-3">
          <LineChars />
        </div>
      </div>


    </div>
  );
}

export default AnalyticalArea;
