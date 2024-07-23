"use client";
import { Tooltip } from 'flowbite-react';
import Link from 'next/link';
import React from 'react'
import { useState } from 'react';
import { ReactNode } from 'react';


type Props = {
    href: any,
    label: String,
    icon: any,
    activeLink: String,
    SetActiveLink: any,
    isMinimized: boolean
};




function SideBarItem(parameter: Props) {
    return (
        <li>
            <Link href={parameter.href} className={` flex items-center w-full p-2 scale-95  transition duration-75 rounded-lg group  hover:bg-blue-500 mb-4 hover:text-white hover:scale-100 hover:shadow-md ${parameter.activeLink == parameter.label ? "bg-blue-500 hover:scale-100 shadow-md text-white" : "text-gray-900"} `} onClick={() => parameter.SetActiveLink(parameter.label)} >
                <div className={`scale-95 flex-shrink-0  text-gray-500  transition   duration-75 group-hover:bg-blue-500 group-hover:text-white group-hover:scale-100 mx-auto ${parameter.isMinimized ? parameter.activeLink == parameter.label ? 'text-white' :'text-gray-500 sm:text-gray-500 ' : parameter.activeLink == parameter.label ? 'text-white' : 'text-gray-500'} `}>
                    <Tooltip
                        className={`${parameter.isMinimized ? "text-xs" : "hidden"}`}
                        content={parameter.label}
                        trigger="hover"
                        placement="right"
                        style="light"
                    >
                        {parameter.icon}
                    </Tooltip>
                </div>
                <span className={`flex-1 ml-3 text-left whitespace-nowrap ${parameter.isMinimized ? 'sm:hidden' : ''}`}>
                    {parameter.label}
                </span>
            </Link>
        </li>
    );
}

export default SideBarItem;