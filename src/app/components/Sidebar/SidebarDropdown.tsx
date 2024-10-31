"use client";
import React, { useEffect } from 'react'
import { useState } from 'react';
import { ReactNode } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/20/solid';
import { Tooltip } from 'flowbite-react';


type Props = {
    title: String,
    icon: any,
    children: ReactNode,
    isMinimized: boolean,
    expandedLink: String,
    setExpandedLink: any,
};


function SidebarDropdown(parameter: Props) {
    const [isOpen, setIsOpen] = useState(false);
    useEffect(() => {
        if (parameter.expandedLink != parameter.title) {
            setIsOpen(false);
        }
    }, [parameter.expandedLink])
    return (
        <>
            <li className={`dropdown overflow-x-visible`}>

                <button className={`group flex items-center w-full p-2 text-gray-900 transition duration-100 scale-95 rounded-lg group  hover:bg-blue-500 mb-4 hover:text-white hover:scale-100 hover:shadow-md `} onClick={() => {
                    setIsOpen(!isOpen);
                    parameter.setExpandedLink(parameter.title);
                }}>
                    <div className={`flex-shrink-0 mx-auto  transition duration-75  group-hover:text-white scale-95 group-hover:scale-100 ${parameter.isMinimized ? 'text-gray-500' : 'sm:text-gray-500 '}`}>
                        <Tooltip
                            className={`${parameter.isMinimized ? "text-xs" : "hidden"}`}
                            content={parameter.title}
                            trigger="hover"
                            placement="right"
                            style="light"
                        >
                            {parameter.icon}
                        </Tooltip>
                    </div>
                    <span className={`flex-1 mx-2 text-left whitespace-nowrap transition-transform ${parameter.isMinimized ? 'sm:hidden' : ''}`} >
                        {parameter.title}
                        {isOpen && (
                            <ChevronUpIcon className={`w-6 h-6 float-right`} />
                        )}
                        {isOpen == false && (
                            <ChevronDownIcon className={`w-6 h-6 float-right`} />
                        )}
                    </span>

                </button>
                {isOpen && (
                    <ul className={`dropdown-menu  ${parameter.isMinimized ? 'rounded-lg bg-white w-56 p-1 border border-1 shadow-sm text-xs' : ''}`} >
                        {parameter.children}
                    </ul>
                )}
            </li>
        </>
    );
}

export default SidebarDropdown;