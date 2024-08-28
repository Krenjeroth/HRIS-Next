"use client";

// components/line.tsx
import React from 'react';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';

// Dynamically import the Chart component to avoid SSR issues
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const Line: React.FC = () => {
    const chartData = {
        series: [{
            name: 'Sales',
            data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
        }],
        options: {
            chart: {
                height: 350,
                type: 'line',
                zoom: {
                    enabled: false
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'smooth'
            },
            title: {
                text: 'Applicants Per Month',
                align: 'left'
            },
            grid: {
                row: {
                    colors: ['#f3f3f3', 'transparent'], // Alternating rows color
                    opacity: 0.5
                },
            },
            xaxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
            }
        } as ApexOptions,
    };

    return (
        <div>
            <Chart
                options={chartData.options}
                series={chartData.series}
                type="line"
                height={350}
            />
        </div>
    );

    // return (

    //     // <div className="max-w-sm w-full bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6">
    //     //     <div className="flex justify-between mb-5">
    //     //         <div className="grid gap-4 grid-cols-2">
    //     //             <div>
    //     //                 <h5 className="inline-flex items-center text-gray-500 dark:text-gray-400 leading-none font-normal mb-2">Clicks</h5>
    //     //                 <p className="text-gray-900 dark:text-white text-2xl leading-none font-bold">42,3k</p>
    //     //             </div>
    //     //         </div>
    //     //     </div>
    //     <div>
    //         <Chart
    //             options={chartData.options}
    //             series={chartData.series}
    //             type="pie"
    //             width="380"
    //         />
    //     </div >
    //     //     <div className="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between mt-2.5">
    //     //         <div className="pt-5">
    //     //             <a href="#" className="px-5 py-2.5 text-sm font-medium text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
    //     //                 <svg className="w-3.5 h-3.5 text-white me-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
    //     //                     <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2Zm-3 15H4.828a1 1 0 0 1 0-2h6.238a1 1 0 0 1 0 2Zm0-4H4.828a1 1 0 0 1 0-2h6.238a1 1 0 1 1 0 2Z" />
    //     //                     <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
    //     //                 </svg>
    //     //                 View full report
    //     //             </a>
    //     //         </div>
    //     //     </div>
    //     // </div>

    // );
};

export default Line;