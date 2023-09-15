"use client";
import { Button, Tabs, TabsRef, ToggleSwitch } from 'flowbite-react';
import React, { useContext, useState, useMemo, useRef } from 'react'
import { FormElement } from '../commons/FormElement';
import { HiUser, HiUserGroup, HiUserCircle, HiIdentification, HiCollection, HiBookmark } from 'react-icons/hi';
import Personal from './Personal';
import FamilyEducation from './Family';
import Education from './Education';



function index() {

    const [activeTab, setActiveTab] = useState<number>(0);
    const tabsRef = useRef<TabsRef>(null);
    const props = { setActiveTab, tabsRef };

    return (
        <Tabs.Group
            aria-label="Pills"
            style="pills"
            ref={props.tabsRef}
            onActiveTabChange={(tab) => props.setActiveTab(tab)}
        >
            <Tabs.Item
                active
                icon={HiUser}
                title={`Personal`}
            >
                <Personal />
                <div className='grid lg:grid-cols-4 grid-col'>
                    <div className='col-span-4 mt-5 mx-auto'>
                        <Button className='btn btn-sm text-white rounded-lg bg-stone-600  hover:scale-90 shadow-sm text' onClick={() => props.tabsRef.current?.setActiveTab(1)}>
                            Next
                        </Button>
                    </div>
                </div>
            </Tabs.Item>
            <Tabs.Item
                icon={HiUserGroup}
                title={`Family and Education`}
            >
                <FamilyEducation />
                <Education></Education>
            </Tabs.Item >
            < Tabs.Item
                icon={HiIdentification}
                title={`Eligibility and Experience`}
            >
                <p>
                    This is
                    <span className="font-medium text-gray-800 dark:text-white">
                        Settings tab's associated content
                    </span>
                    .
                    Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to
                    control the content visibility and styling.
                </p>
            </ Tabs.Item>
            <Tabs.Item
                icon={HiCollection}
                title={`Voluntary Work and Experience`}
            >
                <p>
                    This is
                    <span className="font-medium text-gray-800 dark:text-white">
                        Contacts tab's associated content
                    </span>
                    .
                    Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to
                    control the content visibility and styling.
                </p>
            </Tabs.Item>
            <Tabs.Item
                icon={HiBookmark}
                title={`Other Information`}
            >
                <p>
                    Disabled content
                </p>
            </Tabs.Item>
        </Tabs.Group >
    )
}

export default index