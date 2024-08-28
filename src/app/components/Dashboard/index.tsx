"use client";

// components/index.tsx
import React from 'react';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';
import Line from '../Charts/Line';


const index: React.FC = () => {
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
                text: 'Product Trends by Month',
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
        <>
            <Line />
        </>
    );
};

export default index;