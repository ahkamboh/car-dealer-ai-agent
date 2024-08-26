import React, { useEffect, useState } from "react";
import { AreaCharts } from "../../components/Charts/AreaCharts";
import { LineChars } from "../../components/Charts/LineCharts";
import { BarCharts } from "../../components/Charts/BarCharts";
function AnalyticalArea() {
  const [queryData, setQueryData] = useState([]);
  const [todayQueries, setTodayQueries] = useState(0);
  const [yesterdayQueries, setYesterdayQueries] = useState(0);
  const [weeklyQueries, setWeeklyQueries] = useState(0);
  const [monthlyQueries, setMonthlyQueries] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/customer/readAll");
        if (response.ok) {
          const data = await response.json();
          setQueryData(data.data); // Access the data array from the API response

          // Get current date details
          const now = new Date();
          const todayStart = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate()
          );
          const yesterdayStart = new Date(todayStart);
          yesterdayStart.setDate(todayStart.getDate() - 1);

          const weekStart = new Date(todayStart);
          weekStart.setDate(todayStart.getDate() - todayStart.getDay()); // Start of the week (Sunday)

          const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

          // Filter queries for today, yesterday, this week, and this month
          const todayCount = data.data.filter((query: { CreatedAt: string | number | Date; }) => {
            const queryDate = new Date(query.CreatedAt);
            return queryDate >= todayStart;
          }).length;

          const yesterdayCount = data.data.filter((query: { CreatedAt: string | number | Date; }) => {
            const queryDate = new Date(query.CreatedAt);
            return queryDate >= yesterdayStart && queryDate < todayStart;
          }).length;

          const weeklyCount = data.data.filter((query: { CreatedAt: string | number | Date; }) => {
            const queryDate = new Date(query.CreatedAt);
            return queryDate >= weekStart;
          }).length;

          const monthlyCount = data.data.filter((query: { CreatedAt: string | number | Date; }) => {
            const queryDate = new Date(query.CreatedAt);
            return queryDate >= monthStart;
          }).length;

          setTodayQueries(todayCount);
          setYesterdayQueries(yesterdayCount);
          setWeeklyQueries(weeklyCount);
          setMonthlyQueries(monthlyCount);
        } else {
          console.error("Failed to fetch data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div
      className="w-full h-full bg-[#261e35] overflow-y-auto p-5"
      style={{ height: "calc(100vh - 6rem)" }}
    >
      {/* Cards  */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="w-full bg-[#3c354a] border rounded-md border-[#5c5a5acb] overflow-hidden">
          <div className="flex w-full text-white p-4 justify-between">
            <div className="plus-jakarta-sans-400 grid">
              Today Queries
              <span className="plus-jakarta-sans-700 text-xl ">
                {todayQueries}
              </span>
            </div>
            <div className="flex justify-center items-center gap-2 pb-5">
              <svg width="20" height="20" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="0.380952" y="-0.380952" width="15.2381" height="15.2381" rx="7.61905" transform="matrix(1 0 0 -1 0 15.7381)" stroke="#E72D04" stroke-width="0.761905" />
                <path d="M8.32325 11.8709C8.14472 12.0494 7.85528 12.0494 7.67675 11.8709L4.76751 8.96162C4.58899 8.78309 4.58899 8.49364 4.76751 8.31512C4.94604 8.13659 5.23548 8.13659 5.41401 8.31512L8 10.9011L10.586 8.31512C10.7645 8.13659 11.054 8.13659 11.2325 8.31512C11.411 8.49364 11.411 8.78309 11.2325 8.96162L8.32325 11.8709ZM7.54286 5.45237C7.54286 5.1999 7.74753 4.99523 8 4.99523C8.25247 4.99523 8.45714 5.1999 8.45714 5.45237L7.54286 5.45237ZM7.54286 11.5476L7.54286 5.45237L8.45714 5.45237L8.45714 11.5476L7.54286 11.5476Z" fill="#E72D04" />
              </svg>


              <div className="text-[#E72D04]">6.2%</div>
            </div>
          </div>
          <div className="w-full">
            <svg
              width="207"
              height="80"
              viewBox="0 0 207 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 79L37.1498 46.5847C37.957 45.8609 39.1941 45.9121 39.9387 46.7003L56.3531 64.0734C56.8422 64.5911 57.5699 64.8096 58.2634 64.647L94.943 56.0464C95.4738 55.922 95.9307 55.5862 96.2081 55.1169L115.211 22.9666C115.976 21.6728 117.841 21.6531 118.633 22.9305L138.454 54.9054C138.818 55.4937 139.461 55.8516 140.154 55.8516H175.443C176.18 55.8516 176.858 55.4457 177.206 54.7954L206 1"
                stroke="url(#paint0_linear_60_185)"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M1 79L37.1498 46.5847C37.957 45.8609 39.1941 45.9121 39.9387 46.7003L56.3531 64.0734C56.8422 64.5911 57.5699 64.8096 58.2634 64.647L94.943 56.0464C95.4738 55.922 95.9307 55.5862 96.2081 55.1169L115.211 22.9666C115.976 21.6728 117.841 21.6531 118.633 22.9305L138.454 54.9054C138.818 55.4937 139.461 55.8516 140.154 55.8516H175.443C176.18 55.8516 176.858 55.4457 177.206 54.7954L206 1"
                stroke="url(#paint1_linear_60_185)"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_60_185"
                  x1="206"
                  y1="20.4997"
                  x2="41.0906"
                  y2="17.5079"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#E323FF" />
                  <stop offset="1" stop-color="#7517F8" />
                </linearGradient>
                <linearGradient
                  id="paint1_linear_60_185"
                  x1="1"
                  y1="79"
                  x2="206"
                  y2="79"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#3C354A" />
                  <stop offset="1" stop-color="white" stop-opacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
        <div className="w-full bg-[#3c354a] border rounded-md border-[#5c5a5acb] overflow-hidden">
          <div className="flex w-full text-white p-4 justify-between">
            <div className="plus-jakarta-sans-400 grid">
              Yesterday Queries
              <span className="plus-jakarta-sans-700 text-xl ">
                {yesterdayQueries}
              </span>
            </div>
            <div className="flex justify-center items-center gap-2 pb-5">

              <svg width="20" height="20" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="0.380952" y="0.880952" width="15.2381" height="15.2381" rx="7.61905" stroke="#00C287" stroke-width="0.761905" />
                <path d="M8.32325 5.12914C8.14472 4.95062 7.85528 4.95062 7.67675 5.12914L4.76751 8.03838C4.58899 8.21691 4.58899 8.50636 4.76751 8.68488C4.94604 8.86341 5.23548 8.86341 5.41401 8.68488L8 6.09889L10.586 8.68488C10.7645 8.86341 11.054 8.86341 11.2325 8.68488C11.411 8.50636 11.411 8.21691 11.2325 8.03838L8.32325 5.12914ZM7.54286 11.5476C7.54286 11.8001 7.74753 12.0048 8 12.0048C8.25247 12.0048 8.45714 11.8001 8.45714 11.5476L7.54286 11.5476ZM7.54286 5.45239L7.54286 11.5476L8.45714 11.5476L8.45714 5.45239L7.54286 5.45239Z" fill="#00C287" />
              </svg>

              <div className="text-[#00C287]">8.2%</div>
            </div>
          </div>
          <div className="w-full">
            <svg
              width="202"
              height="70"
              viewBox="0 0 202 70"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.5 68.5L19.2589 37.0805C20.0245 35.7259 21.9755 35.7259 22.7411 37.0805L38.9995 65.8453C39.7081 67.0989 41.4695 67.2154 42.337 66.066L60.2862 42.2833C60.4276 42.0959 60.601 41.9349 60.7983 41.8076L89.6645 23.1842C90.651 22.5477 91.971 22.8939 92.5182 23.9325L114.403 65.4695C115.117 66.8239 117.026 66.9071 117.854 65.6199L139.207 32.4551C139.399 32.1571 139.667 31.9154 139.983 31.7548L200.5 1"
                stroke="url(#paint0_linear_60_162)"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M1.5 68.5L19.2589 37.0805C20.0245 35.7259 21.9755 35.7259 22.7411 37.0805L38.9995 65.8453C39.7081 67.0989 41.4695 67.2154 42.337 66.066L60.2862 42.2833C60.4276 42.0959 60.601 41.9349 60.7983 41.8076L89.6645 23.1842C90.651 22.5477 91.971 22.8939 92.5182 23.9325L114.403 65.4695C115.117 66.8239 117.026 66.9071 117.854 65.6199L139.207 32.4551C139.399 32.1571 139.667 31.9154 139.983 31.7548L200.5 1"
                stroke="url(#paint1_linear_60_162)"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_60_162"
                  x1="200.5"
                  y1="-8.99974"
                  x2="8.75521"
                  y2="-8.99974"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#4DFFDF" />
                  <stop offset="1" stop-color="#4DA1FF" />
                </linearGradient>
                <linearGradient
                  id="paint1_linear_60_162"
                  x1="1.5"
                  y1="68.5"
                  x2="200.5"
                  y2="68.5"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#3C354A" />
                  <stop offset="1" stop-color="white" stop-opacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
        <div className="w-full bg-[#3c354a] border rounded-md border-[#5c5a5acb] overflow-hidden">
          <div className="flex w-full text-white p-4 justify-between">
            <div className="plus-jakarta-sans-400 grid">
              weekly Queries
              <span className="plus-jakarta-sans-700 text-xl ">
                {weeklyQueries}
              </span>
            </div>
            <div className="flex justify-center items-center gap-2 pb-5">
              <svg width="20" height="20" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="0.380952" y="-0.380952" width="15.2381" height="15.2381" rx="7.61905" transform="matrix(1 0 0 -1 0 15.7381)" stroke="#E72D04" stroke-width="0.761905" />
                <path d="M8.32325 11.8709C8.14472 12.0494 7.85528 12.0494 7.67675 11.8709L4.76751 8.96162C4.58899 8.78309 4.58899 8.49364 4.76751 8.31512C4.94604 8.13659 5.23548 8.13659 5.41401 8.31512L8 10.9011L10.586 8.31512C10.7645 8.13659 11.054 8.13659 11.2325 8.31512C11.411 8.49364 11.411 8.78309 11.2325 8.96162L8.32325 11.8709ZM7.54286 5.45237C7.54286 5.1999 7.74753 4.99523 8 4.99523C8.25247 4.99523 8.45714 5.1999 8.45714 5.45237L7.54286 5.45237ZM7.54286 11.5476L7.54286 5.45237L8.45714 5.45237L8.45714 11.5476L7.54286 11.5476Z" fill="#E72D04" />
              </svg>


              <div className="text-[#E72D04]">1.2%</div>
            </div>
          </div>
          <div className="w-full">
            <svg
              width="210"
              height="41"
              viewBox="0 0 210 41"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 1.5H39.3028C39.9213 1.5 40.505 1.78614 40.8838 2.27504L68.2026 37.5333C69.1829 38.7986 71.1784 38.4569 71.682 36.9376L79.764 12.5539C79.9573 11.9706 80.408 11.5085 80.9863 11.3008L107.247 1.86886C107.887 1.63895 108.6 1.75011 109.14 2.16395L157.305 39.0925C158.273 39.8346 159.673 39.5451 160.268 38.4802L174.862 12.3375C175.115 11.8837 175.535 11.5463 176.033 11.3968L209 1.5"
                stroke="url(#paint0_linear_60_126)"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M1 1.5H39.3028C39.9213 1.5 40.505 1.78614 40.8838 2.27504L68.2026 37.5333C69.1829 38.7986 71.1784 38.4569 71.682 36.9376L79.764 12.5539C79.9573 11.9706 80.408 11.5085 80.9863 11.3008L107.247 1.86886C107.887 1.63895 108.6 1.75011 109.14 2.16395L157.305 39.0925C158.273 39.8346 159.673 39.5451 160.268 38.4802L174.862 12.3375C175.115 11.8837 175.535 11.5463 176.033 11.3968L209 1.5"
                stroke="url(#paint1_linear_60_126)"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_60_126"
                  x1="209"
                  y1="11.2499"
                  x2="6.1894"
                  y2="12.1744"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#7517F8" />
                  <stop offset="0.927083" stop-color="#E323FF" />
                </linearGradient>
                <linearGradient
                  id="paint1_linear_60_126"
                  x1="1"
                  y1="40.5"
                  x2="209"
                  y2="40.5"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#3C354A" />
                  <stop offset="1" stop-color="white" stop-opacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
        <div className="w-full bg-[#3c354a] border rounded-md border-[#5c5a5acb] overflow-hidden">
          <div className="flex w-full text-white p-4 justify-between">
            <div className="plus-jakarta-sans-400 grid">
              Monthly Queries
              <span className="plus-jakarta-sans-700 text-xl ">
                {monthlyQueries}
              </span>
            </div>
            <div className="flex justify-center items-center gap-2 pb-5">
              <svg width="20" height="20" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="0.380952" y="-0.380952" width="15.2381" height="15.2381" rx="7.61905" transform="matrix(1 0 0 -1 0 15.7381)" stroke="#E72D04" stroke-width="0.761905" />
                <path d="M8.32325 11.8709C8.14472 12.0494 7.85528 12.0494 7.67675 11.8709L4.76751 8.96162C4.58899 8.78309 4.58899 8.49364 4.76751 8.31512C4.94604 8.13659 5.23548 8.13659 5.41401 8.31512L8 10.9011L10.586 8.31512C10.7645 8.13659 11.054 8.13659 11.2325 8.31512C11.411 8.49364 11.411 8.78309 11.2325 8.96162L8.32325 11.8709ZM7.54286 5.45237C7.54286 5.1999 7.74753 4.99523 8 4.99523C8.25247 4.99523 8.45714 5.1999 8.45714 5.45237L7.54286 5.45237ZM7.54286 11.5476L7.54286 5.45237L8.45714 5.45237L8.45714 11.5476L7.54286 11.5476Z" fill="#E72D04" />
              </svg>


              <div className="text-[#E72D04]">9.2%</div>
            </div>
          </div>
          <div className="w-full">

            <svg className="scale-95" viewBox="0 0 579 173" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_28_1)">
                <path d="M1.4794 10.7216V9.51065L4.51562 4.72727H5.55966V6.40341H4.94176L3.0277 9.43253V9.48935H7.34233V10.7216H1.4794ZM4.97017 12V10.3523L4.99858 9.81605V4.72727H6.44034V12H4.97017ZM9.45703 12L7.97266 6.54545H9.5032L10.3484 10.2102H10.3981L11.2788 6.54545H12.7809L13.6758 10.1889H13.7219L14.5529 6.54545H16.0799L14.5991 12H12.9975L12.06 8.5696H11.9925L11.055 12H9.45703Z" fill="#868B93" />
                <path d="M4.2777 76.0994C3.7474 76.0994 3.27509 76.0083 2.8608 75.826C2.44886 75.6413 2.12334 75.388 1.88423 75.0661C1.64749 74.7417 1.52557 74.3677 1.51847 73.9439H3.06676C3.07623 74.1214 3.13423 74.2777 3.24077 74.4126C3.34967 74.5452 3.49408 74.6482 3.67401 74.7216C3.85393 74.795 4.05634 74.8317 4.28125 74.8317C4.51562 74.8317 4.72277 74.7902 4.9027 74.7074C5.08262 74.6245 5.22348 74.5097 5.32528 74.3629C5.42708 74.2161 5.47798 74.0469 5.47798 73.8551C5.47798 73.661 5.42353 73.4893 5.31463 73.3402C5.2081 73.1887 5.05421 73.0703 4.85298 72.9851C4.65412 72.8999 4.41738 72.8572 4.14276 72.8572H3.46449V71.728H4.14276C4.37476 71.728 4.57955 71.6877 4.7571 71.6072C4.93703 71.5268 5.0767 71.4155 5.17614 71.2734C5.27557 71.129 5.32528 70.9609 5.32528 70.7692C5.32528 70.5869 5.28149 70.4271 5.19389 70.2898C5.10866 70.1501 4.98793 70.0412 4.83168 69.9631C4.67779 69.8849 4.49787 69.8459 4.2919 69.8459C4.08357 69.8459 3.89299 69.8838 3.72017 69.9595C3.54735 70.0329 3.40885 70.1383 3.30469 70.2756C3.20052 70.4129 3.14489 70.5739 3.13778 70.7585H1.66406C1.67116 70.3395 1.79072 69.9702 2.02273 69.6506C2.25473 69.331 2.56723 69.0812 2.96023 68.9013C3.35559 68.719 3.80185 68.6278 4.29901 68.6278C4.8009 68.6278 5.24006 68.719 5.61648 68.9013C5.9929 69.0836 6.28527 69.3298 6.49361 69.6399C6.70431 69.9477 6.80848 70.2933 6.80611 70.6768C6.80848 71.084 6.68182 71.4238 6.42614 71.696C6.17282 71.9683 5.84257 72.1411 5.43537 72.2145V72.2713C5.97041 72.34 6.3776 72.5258 6.65696 72.8288C6.93868 73.1295 7.07836 73.5059 7.07599 73.9581C7.07836 74.3724 6.95881 74.7405 6.71733 75.0625C6.47822 75.3845 6.14796 75.6378 5.72656 75.8224C5.30516 76.0071 4.82221 76.0994 4.2777 76.0994ZM9.27148 76L7.78711 70.5455H9.31765L10.1628 74.2102H10.2125L11.0932 70.5455H12.5953L13.4902 74.1889H13.5364L14.3674 70.5455H15.8944L14.4135 76H12.812L11.8745 72.5696H11.807L10.8695 76H9.27148Z" fill="#868B93" />
                <path d="M2.58949 108V106.892L5.17827 104.495C5.39844 104.282 5.5831 104.09 5.73224 103.92C5.88376 103.749 5.99858 103.582 6.0767 103.419C6.15483 103.253 6.19389 103.075 6.19389 102.883C6.19389 102.67 6.14536 102.486 6.0483 102.332C5.95123 102.176 5.81866 102.057 5.65057 101.974C5.48248 101.888 5.2919 101.846 5.07884 101.846C4.8563 101.846 4.66217 101.891 4.49645 101.981C4.33073 102.071 4.20289 102.2 4.11293 102.368C4.02296 102.536 3.97798 102.736 3.97798 102.968H2.51847C2.51847 102.492 2.62618 102.079 2.84162 101.729C3.05705 101.378 3.3589 101.107 3.74716 100.915C4.13542 100.724 4.58286 100.628 5.08949 100.628C5.61032 100.628 6.06368 100.72 6.44957 100.905C6.83783 101.087 7.13968 101.34 7.35511 101.665C7.57055 101.989 7.67827 102.361 7.67827 102.78C7.67827 103.054 7.62382 103.326 7.51491 103.593C7.40838 103.861 7.2178 104.158 6.94318 104.484C6.66856 104.809 6.28149 105.198 5.78196 105.653L4.72017 106.693V106.743H7.77415V108H2.58949ZM9.97852 108L8.49414 102.545H10.0247L10.8699 106.21H10.9196L11.8002 102.545H13.3024L14.1973 106.189H14.2434L15.0744 102.545H16.6014L15.1206 108H13.519L12.5815 104.57H12.514L11.5765 108H9.97852Z" fill="#868B93" />
                <path d="M7.35511 164.727V172H5.81747V166.187H5.77486L4.10938 167.231V165.867L5.9098 164.727H7.35511ZM10.1738 172L8.68945 166.545H10.22L11.0652 170.21H11.1149L11.9956 166.545H13.4977L14.3926 170.189H14.4387L15.2697 166.545H16.7967L15.3159 172H13.7143L12.7768 168.57H12.7093L11.7718 172H10.1738Z" fill="#868B93" />
                <path d="M28 168.293H106.909C108.761 168.293 110.461 167.269 111.327 165.632L195.926 5.85025C197.479 2.91686 201.407 2.28316 203.804 4.57926L285.72 83.0521C286.651 83.9437 287.89 84.4415 289.179 84.4415H401.018C402.627 84.4415 404.138 85.216 405.078 86.5224L458.135 160.307C459.074 161.613 460.585 162.388 462.194 162.388H577" stroke="url(#paint0_linear_28_1)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M577 10.5918H498.014C496.203 10.5918 494.534 11.5713 493.65 13.1522L408.347 165.758C407.027 168.12 404.068 169.003 401.669 167.751L318.917 124.55C318.203 124.177 317.409 123.982 316.603 123.982H204.549C202.634 123.982 200.888 122.889 200.051 121.167L146.737 11.4072C145.9 9.6851 144.154 8.59184 142.239 8.59184H28" stroke="url(#paint1_linear_28_1)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
              </g>
              <defs>
                <linearGradient id="paint0_linear_28_1" x1="577" y1="0" x2="48.0156" y2="0" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#4DFFDF" />
                  <stop offset="1" stop-color="#4DA1FF" />
                </linearGradient>
                <linearGradient id="paint1_linear_28_1" x1="28" y1="132.397" x2="563.31" y2="130.85" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#E323FF" />
                  <stop offset="1" stop-color="#7517F8" />
                </linearGradient>
                <clipPath id="clip0_28_1">
                  <rect width="579" height="173" fill="white" />
                </clipPath>
              </defs>
            </svg>

          </div>
        </div>

      </div>
      <div className="mt-5 sm:flex grid gap-5">
        <div className="w-full bg-[#3c354a] border rounded-md border-[#5c5a5acb] p-3">
          <AreaCharts />
        </div>
        <div className="w-full bg-[#3c354a] border rounded-md border-[#5c5a5acb] p-3">
          <BarCharts />
        </div>
      </div>
      <div className="mt-5 flex gap-5 h-80">
      <div className="w-full bg-[#3c354a] border rounded-md border-[#5c5a5acb] p-3">
          <LineChars />
        </div>

      </div>


    </div>
  );
}

export default AnalyticalArea;