"use client";

// components/index.tsx
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';
import CardDataStats from './CardDataStats';
import HttpService from '../../../../lib/http.services';
import { ArrowLeftEndOnRectangleIcon, ArrowRightIcon, BriefcaseIcon, ClipboardIcon, EyeIcon, PencilIcon, TrashIcon, UserIcon } from '@heroicons/react/24/solid';
import { StarIcon } from '@heroicons/react/20/solid';
import { HiPaperClip } from 'react-icons/hi';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

type chartData = {
    data: number[],
    categories: string[],
}




type cardData = {
    total_employees: string,
    total_permanent_plantillas: string,
    vacant_permanent_positions: string,
    received_applications: string
}


const index: React.FC = () => {


    const [cardData, setCardData] = useState<cardData>({
        total_employees: "0",
        total_permanent_plantillas: "0",
        vacant_permanent_positions: "0",
        received_applications: "0"
    });

    const [personnelPerOffice, setPersonnelPerOffice] = useState<chartData>({
        data: [],
        categories: []
    });

    const [personnel, setPersonnel] = useState<chartData>({
        data: [],
        categories: []
    });



    const [applicantionsPerMonth, setApplicantionsPerMonth] = useState<chartData>({
        data: [],
        categories: []
    });



    useEffect(() => {
        // query
        async function getCardData() {
            const resp = await HttpService.get("get-card-data");
            if (resp != null) {
                let data = resp.data;
                setCardData({
                    total_employees: data.total_employees,
                    total_permanent_plantillas: data.total_permanent_plantillas,
                    vacant_permanent_positions: data.vacant_permanent_positions,
                    received_applications: data.received_applications
                })
            }
        }
        getCardData();
    }, [])


    useEffect(() => {

        // query
        async function getPersonnelPerOffice() {
            const resp = await HttpService.get("get-personnel-per-office");
            if (resp != null) {
                let data = resp.data;
                setPersonnelPerOffice({
                    data: data.data,
                    categories: data.label
                })
                // setCardData({
                //     total_employees: data.total_employees,
                //     total_permanent_plantillas: data.total_permanent_plantillas,
                //     vacant_permanent_positions: data.vacant_permanent_positions,
                //     received_applications: data.received_applications
                // })
            }
        }
        getPersonnelPerOffice();
    }, []);


    useEffect(() => {

        // query
        async function getPersonnel() {
            const resp = await HttpService.get("get-personnel");
            if (resp != null) {
                let data = resp.data;
                setPersonnel({
                    data: data.data,
                    categories: data.label
                })
            }
        }
        getPersonnel();
    }, [])


    useEffect(() => {

        // query
        async function getApplicationsPerMonth() {
            const resp = await HttpService.get("get-applications-per-month");
            if (resp != null) {
                let data = resp.data;
                setApplicantionsPerMonth({
                    data: data.data,
                    categories: data.label
                })
            }
        }
        getApplicationsPerMonth();
    }, [])


    const applicantsData = {
        series: [{
            name: 'Applications',
            data: applicantionsPerMonth.data
        }],
        options: {
            chart: {
                height: 350,
                type: 'line',
                zoom: {
                    enabled: false
                }
            },
            // dataLabels: {
            //     enabled: false
            // },
            stroke: {
                curve: 'smooth'
            },
            title: {
                text: 'Applications Per Month',
                align: 'left'
            },
            grid: {
                row: {
                    colors: ['#f3f3f3', 'transparent'], // Alternating rows color
                    opacity: 0.5
                },
            },
            xaxis: {
                categories: applicantionsPerMonth.categories,
            }
        } as ApexOptions,
    };


    const employeessData = {
        series: personnel.data,
        options: {
            chart: {
                type: 'pie',
            },
            labels: personnel.categories,
            // dataLabels: {
            //     enabled: false
            // },
            stroke: {
                curve: 'smooth'
            },
            title: {
                text: 'PLGU Personnel',
                align: 'left'
            },
            grid: {
                row: {
                    colors: ['#f3f3f3', 'transparent'], // Alternating rows color
                    opacity: 0.5
                },
            },
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }]
        } as ApexOptions,
    };

    const employeesPerOfficeData = {
        series: [{
            name: 'Personnel',
            data: personnelPerOffice.data
        }],
        options: {
            chart: {
                type: 'bar',
                height: 350
            },
            plotOptions: {
                bar: {
                    borderRadius: 4,
                    horizontal: false,
                }
            },
            dataLabels: {
                enabled: false
            },
            xaxis: {
                categories: personnelPerOffice.categories,
            },
            title: {
                text: 'Personnel Per Office',
                align: 'left',
            },
        } as ApexOptions,
    };




    return (
        <>

            <CardDataStats title="Total Employees" total={cardData.total_employees} rate="" >
                <UserIcon className="text-white  w-7 h-7 mx-auto my-auto" />
            </CardDataStats>
            <CardDataStats title="Plantillas (Permanent)" total={cardData.total_permanent_plantillas} rate="" >
                <BriefcaseIcon className="text-white  w-7 h-7 mx-auto my-auto" />
            </CardDataStats>
            <CardDataStats title="Vacant Positions (Permanent)" total={cardData.vacant_permanent_positions} rate="" >
                <StarIcon className="text-white  w-7 h-7 mx-auto my-auto" />
            </CardDataStats>
            <CardDataStats title="Received Applications" total={cardData.received_applications} rate="" >
                <HiPaperClip className="text-white  w-7 h-7 mx-auto my-auto" />
            </CardDataStats>



            <div className='col-span-4 lg:col-span-2 m-2  rounded-2xl bg-white p-6 shadow-xl shadow-slate-900/10'>
                <Chart
                    options={applicantsData.options}
                    series={applicantsData.series}
                    type="line"
                    height={350}
                />
            </div>
            <div className='col-span-4 lg:col-span-2  m-2  rounded-2xl bg-white p-6 shadow-xl shadow-slate-900/10'>
                <Chart
                    options={employeessData.options}
                    series={employeessData.series}
                    type="pie"
                    height={350}
                />
            </div>

            <div className='col-span-4 m-2  rounded-2xl bg-white p-6 shadow-xl shadow-slate-900/10'>
                <Chart
                    options={employeesPerOfficeData.options}
                    series={employeesPerOfficeData.series}
                    type="bar"
                    height={350}
                />
            </div>
        </>


    );
};

export default index;