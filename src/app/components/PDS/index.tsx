"use client";
import { Button, Tabs, TabsRef, ToggleSwitch } from 'flowbite-react';
import React, { useContext, useState, useMemo, useRef } from 'react'
import { FormElement } from '../commons/FormElement';
import { HiUser, HiUserGroup, HiUserCircle, HiIdentification, HiCollection, HiBookmark } from 'react-icons/hi';
import Personal from './Personal';
import FamilyEducation from './Family';
import Education from './Education';
import Eligiblility from './Eligibility';
import WorkExperience from './WorkExperience';
import VoluntaryWork from './VoluntaryWork';
import LearningAndDevelopment from './LearningAndDevelopment';
import OtherInformation from './OtherInformation';
import { Field } from 'formik';
import { FormFieldError } from '../commons/FormFieldError';



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
                <div className='col-span-4 md:col-span-4 grid md:grid-cols-2 grid-col mt-4'>
                    <hr className='text-cyan-600 mt-6 col-span-2 md:col-span-2 mb-3' />
                    <div className="mt-2  col-span-2 md:col-span-2 flex mx-auto">
                        <Button className='mx-2 btn btn-sm text-white rounded-lg bg-stone-500  hover:scale-90 shadow-sm text' onClick={() => {
                            window.scrollTo(0, 0);
                            props.tabsRef.current?.setActiveTab(1);
                        }
                        }>
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
                <div className='col-span-4 md:col-span-4 grid md:grid-cols-2 grid-col mt-4'>
                    <hr className='text-cyan-600 mt-6 col-span-2 md:col-span-2 mb-3' />
                    <div className="mt-2  col-span-2 md:col-span-2 flex mx-auto">
                        <Button className='mx-2 btn btn-sm text-white rounded-lg bg-stone-500  hover:scale-90 shadow-sm text' onClick={() => props.tabsRef.current?.setActiveTab(0)}>
                            Back
                        </Button>
                        <Button className='mx-2 btn btn-sm text-white rounded-lg bg-stone-500  hover:scale-90 shadow-sm text' onClick={() => props.tabsRef.current?.setActiveTab(2)}>
                            Next
                        </Button>
                    </div>
                </div>
            </Tabs.Item >
            < Tabs.Item
                icon={HiIdentification}
                title={`Civil Service Eligibility and Experience`}
            >
                <Eligiblility />
                <WorkExperience />
                <div className='col-span-4 md:col-span-4 grid md:grid-cols-2 grid-col mt-4'>
                    <hr className='text-cyan-600 mt-6 col-span-2 md:col-span-2 mb-3' />
                    <div className="mt-2  col-span-2 md:col-span-2 flex mx-auto">
                        <Button className='mx-2 btn btn-sm text-white rounded-lg bg-stone-500  hover:scale-90 shadow-sm text' onClick={() => props.tabsRef.current?.setActiveTab(1)}>
                            Back
                        </Button>
                        <Button className='mx-2 btn btn-sm text-white rounded-lg bg-stone-500  hover:scale-90 shadow-sm text' onClick={() => props.tabsRef.current?.setActiveTab(3)}>
                            Next
                        </Button>
                    </div>
                </div>
            </ Tabs.Item>
            <Tabs.Item
                icon={HiCollection}
                title={`Voluntary Work, and Learning and Development`}
            >
                <VoluntaryWork />
                {/* <hr className='text-cyan-600 col-span-4 md:col-span-4 grid md:grid-cols-2 grid-col mt-4' /> */}
                <LearningAndDevelopment />
                <div className='col-span-4 md:col-span-4 grid md:grid-cols-2 grid-col mt-4'>
                    <hr className='text-cyan-600 mt-6 col-span-2 md:col-span-2 mb-3' />
                    <div className="mt-2  col-span-2 md:col-span-2 flex mx-auto">
                        <Button className='mx-2 btn btn-sm text-white rounded-lg bg-stone-500  hover:scale-90 shadow-sm text' onClick={() => props.tabsRef.current?.setActiveTab(2)}>
                            Back
                        </Button>
                        <Button className='mx-2 btn btn-sm text-white rounded-lg bg-stone-500  hover:scale-90 shadow-sm text' onClick={() => props.tabsRef.current?.setActiveTab(4)}>
                            Next
                        </Button>
                    </div>
                </div>
            </Tabs.Item>
            <Tabs.Item
                icon={HiBookmark}
                title={`Other Information`}
            >
                <OtherInformation />
                <div className='col-span-4 md:col-span-4 grid md:grid-cols-2 grid-col mt-4'>
                    <hr className='text-cyan-600 mt-6 col-span-2 md:col-span-2 mb-3' />
                    <div className="mt-2  col-span-2 md:col-span-2 flex mx-auto">
                        <Button className='mx-2 btn btn-sm text-white rounded-lg bg-stone-500  hover:scale-90 shadow-sm text' onClick={() => props.tabsRef.current?.setActiveTab(3)}>
                            Back
                        </Button>
                        <Button className='mx-2 btn btn-sm text-white rounded-lg bg-stone-500  hover:scale-90 shadow-sm text' onClick={() => props.tabsRef.current?.setActiveTab(5)}>
                            Submit
                        </Button>
                    </div>
                </div>
            </Tabs.Item>
        </Tabs.Group >
    )
}

export default index