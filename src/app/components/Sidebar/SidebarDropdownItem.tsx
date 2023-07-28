"use client";
import React, { ReactNode } from 'react'
import { useState } from 'react';
import Link from 'next/link';
import { Tooltip } from 'flowbite-react';

type Props = {
    href: any,
    label: String,
    activeLink: String,
    SetActiveLink: any
};

function SidebarDropdownItem(parameter: Props) {
    return (
        <li>
            <Link href={parameter.href} className={`flex items-center w-full p-2 text-gray-600 transition duration-75 rounded-lg pl-11 group hover:bg-cyan-500 scale-95 hover:text-white hover:scale-95 hover:shadow-md ${parameter.activeLink == parameter.label ? "bg-cyan-500 text-white hover:scale-95 shadow-md" : ""}`} onClick={() => parameter.SetActiveLink(parameter.label)} >
                <span className="flex-1 ml-3 text-left whitespace-pre-wrap ">
                    {parameter.label}
                </span>
            </Link>
        </li>
    );
}

export default SidebarDropdownItem;