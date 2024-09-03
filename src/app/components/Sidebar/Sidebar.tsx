"use client";
import { useState } from 'react';
import Link from 'next/link';
import React from 'react';
import { HomeIcon, CogIcon, ArrowLeftIcon, ChartPieIcon, BriefcaseIcon, UserGroupIcon, StarIcon, HandRaisedIcon, UserIcon, MegaphoneIcon, FolderIcon, BookOpenIcon, BellIcon } from '@heroicons/react/24/solid';
import { Sidebar } from "flowbite-react";
import SidebarDropdown from './SidebarDropdown';
import SidebarDropdownItem from './SidebarDropdownItem';
import SideBarItem from './SidebarItem';
import Cookies from 'js-cookie';
import { FolderOpenIcon, TagIcon } from '@heroicons/react/20/solid';

type Props = {
    isMinimized: boolean,
    setMinimized: any,
};

function index(parameter: Props) {
    const [activeLink, SetActiveLink] = useState('Dashboard');
    const [expandedLink, setExpandedLink] = useState('');
    let token = Cookies.get('token');

    return (
        // <nav id="default-sidebar" className={`fixed top-0 left-0 z-50 w-64 h-[calc(100vh-16px)] transition-transform mt-16    ${parameter.isMinimized ? "-translate-x-full" : "translate-x-0"}   ${parameter.isMinimized ? 'sm:w-24 text-center ' : 'sm:w-64'}    sm:translate-x-0 sm:border-spacing-1 rounded-sm sm:border-r-gray-500  bg-white p-6 shadow-xl shadow-slate-900/10`} aria-label="Sidebar">
        <nav id="drawer-right-example" className={`fixed top-0 left-0 z-30 w-64 h-[calc(100vh-16px)] transition-transform mt-16 pb-3 bg-slate-50  overflow-x-visible dark:bg-gray-800 ${parameter.isMinimized ? "-translate-x-full" : "translate-x-0 overflow-y-auto pb-10"} ${parameter.isMinimized ? "-translate-x-full" : "translate-x-0"}   ${parameter.isMinimized ? 'sm:w-24 text-center ' : 'sm:w-64'}    sm:translate-x-0 sm:border-spacing-1  sm:border-r-gray-500 rounded-2xl bg-white  shadow-xl shadow-slate-900/10`} aria-label="Sidebar">
            <div className='overflow-y-visible z-30 rounded bg-slate-50 py-4 px-4 dark:bg-gray-800'>
                <ul className="font-medium ">

                    <SideBarItem isMinimized={parameter.isMinimized} href={"/"} label="Dashboard" icon={<ChartPieIcon className='w-6 h-6' />} activeLink={activeLink} SetActiveLink={SetActiveLink} />

                    {/* Sidebar Dropdown */}
                    <SidebarDropdown isMinimized={parameter.isMinimized} expandedLink={expandedLink} setExpandedLink={setExpandedLink} title="Vacancies" icon={<BriefcaseIcon className='w-6 h-6' />}>
                        <SidebarDropdownItem href={"/vacancy/vacant_positions/"} label="Vacant Positions" activeLink={activeLink} SetActiveLink={SetActiveLink} />
                        <SidebarDropdownItem href={"/vacancy/requests"} label="Requests" activeLink={activeLink} SetActiveLink={SetActiveLink} />
                        <SidebarDropdownItem href={"/vacancy/approved"} label="Approved" activeLink={activeLink} SetActiveLink={SetActiveLink} />
                        <SidebarDropdownItem href={"/vacancy/queued"} label="Queued" activeLink={activeLink} SetActiveLink={SetActiveLink} />
                    </SidebarDropdown>

                    <SideBarItem isMinimized={parameter.isMinimized} href={"/applicants"} label="Applicants" icon={<FolderOpenIcon className='w-6 h-6' />} activeLink={activeLink} SetActiveLink={SetActiveLink} />

                    <SidebarDropdown isMinimized={parameter.isMinimized} expandedLink={expandedLink} setExpandedLink={setExpandedLink} title="Applications" icon={<UserGroupIcon className='w-6 h-6' />}>
                        <SidebarDropdownItem href={"/applications/masterlist"} label="Master list" activeLink={activeLink} SetActiveLink={SetActiveLink} />
                        <SidebarDropdownItem href={"/applications/shortlisted"} label="Shortlisted" activeLink={activeLink} SetActiveLink={SetActiveLink} />
                        <SidebarDropdownItem href={"/applications/disqualified"} label="Disqualified" activeLink={activeLink} SetActiveLink={SetActiveLink} />
                        {/* <SidebarDropdownItem href={"/applications/interviewed"} label="Interviewed" activeLink={activeLink} SetActiveLink={SetActiveLink} />
                        <SidebarDropdownItem href={"/applications/appointed"} label="Appointed" activeLink={activeLink} SetActiveLink={SetActiveLink} /> */}
                    </SidebarDropdown>

                    {/* SideBarItem  */}
                    <SideBarItem isMinimized={parameter.isMinimized} href={"/meeting"} label="PSB Meetings" icon={<StarIcon className='w-6 h-6' />} activeLink={activeLink} SetActiveLink={SetActiveLink} />

                    <SideBarItem isMinimized={parameter.isMinimized} href={"/notices"} label="Notices" icon={<BellIcon className='w-6 h-6' />} activeLink={activeLink} SetActiveLink={SetActiveLink} />

                    <SideBarItem isMinimized={parameter.isMinimized} href={"/results"} label="PSB Results" icon={<TagIcon className='w-6 h-6' />} activeLink={activeLink} SetActiveLink={SetActiveLink} />



                    <SideBarItem isMinimized={parameter.isMinimized} href={"/"} label="Oath Taking" icon={<HandRaisedIcon className='w-6 h-6' />} activeLink={activeLink} SetActiveLink={SetActiveLink} />

                    <SideBarItem isMinimized={parameter.isMinimized} href={"/"} label="Orientation" icon={<MegaphoneIcon className='w-6 h-6' />} activeLink={activeLink} SetActiveLink={SetActiveLink} />

                    <SideBarItem isMinimized={parameter.isMinimized} href={"/employees"} label="Employees" icon={<UserIcon className='w-6 h-6' />} activeLink={activeLink} SetActiveLink={SetActiveLink} />

                    <SideBarItem isMinimized={parameter.isMinimized} href={"/"} label="Leaves" icon={<FolderIcon className='w-6 h-6' />} activeLink={activeLink} SetActiveLink={SetActiveLink} />

                    <SidebarDropdown isMinimized={parameter.isMinimized} expandedLink={expandedLink} setExpandedLink={setExpandedLink} title="Reports" icon={<BookOpenIcon className='w-6 h-6' />}>
                        <SidebarDropdownItem href={"/"} label="Request for Publication" activeLink={activeLink} SetActiveLink={SetActiveLink} />
                        <SidebarDropdownItem href={"/"} label="Notice to CSC" activeLink={activeLink} SetActiveLink={SetActiveLink} />
                        <SidebarDropdownItem href={"/"} label="Initial Comparative Assessment Form" activeLink={activeLink} SetActiveLink={SetActiveLink} />
                        <SidebarDropdownItem href={"/"} label="Final Comparative Asessment Form" activeLink={activeLink} SetActiveLink={SetActiveLink} />
                        <SidebarDropdownItem href={"/"} label="Report For Appointment" activeLink={activeLink} SetActiveLink={SetActiveLink} />
                    </SidebarDropdown>

                    <SidebarDropdown isMinimized={parameter.isMinimized} expandedLink={expandedLink} setExpandedLink={setExpandedLink} title="Settings" icon={<CogIcon className='w-6 h-6' />}>
                        <SidebarDropdownItem href={"/settings/governors"} label="Governors" activeLink={activeLink} SetActiveLink={SetActiveLink} />
                        <SidebarDropdownItem href={"/settings/offices"} label="Offices" activeLink={activeLink} SetActiveLink={SetActiveLink} />
                        <SidebarDropdownItem href={"/settings/divisions"} label="Divisions/Sections/Units" activeLink={activeLink} SetActiveLink={SetActiveLink} />
                        <SidebarDropdownItem href={"/settings/psb"} label="PSB" activeLink={activeLink} SetActiveLink={SetActiveLink} />
                        <SidebarDropdownItem href={"/settings/positions"} label="Positions" activeLink={activeLink} SetActiveLink={SetActiveLink} />
                        <SidebarDropdownItem href={"/settings/plantillas"} label="Permanent Plantillas" activeLink={activeLink} SetActiveLink={SetActiveLink} />
                        <SidebarDropdownItem href={"/settings/other_positions"} label="Casual Plantillas" activeLink={activeLink} SetActiveLink={SetActiveLink} />
                        <SidebarDropdownItem href={"/settings/user_management"} label="User Management" activeLink={activeLink} SetActiveLink={SetActiveLink} />
                        <SidebarDropdownItem href={"/settings/holidays"} label="Holidays/Suspensions" activeLink={activeLink} SetActiveLink={SetActiveLink} />
                        <SidebarDropdownItem href={"/settings/salary_grades"} label="Salary Grade" activeLink={activeLink} SetActiveLink={SetActiveLink} />
                    </SidebarDropdown>

                </ul>
            </div>
        </nav>
    )
}

export default index