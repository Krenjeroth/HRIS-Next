"use client";
import { Button, Tabs, TabsRef, ToggleSwitch } from 'flowbite-react';
import React, { useContext, useState, useMemo, useRef, useEffect } from 'react'
import { FormElement } from '../commons/FormElement';
import { HiUser, HiUserGroup, HiUserCircle, HiIdentification, HiCollection, HiBookmark, HiAcademicCap, HiBriefcase } from 'react-icons/hi';
import Personal from './Personal';
import Family from './Family';
import Education from './Education';
import Eligiblility from './Eligibility';
import WorkExperience from './WorkExperience';
import VoluntaryWork from './VoluntaryWork';
import LearningAndDevelopment from './LearningAndDevelopment';
import OtherInformation from './OtherInformation';
import { Field, useFormikContext } from 'formik';
import { FormFieldError } from '../commons/FormFieldError';
import { usePDSContext } from '@/app/contexts/PDSContext';
import CharacterReference from './CharacterReference';
import EmployeeDetail from './EmployeeDetails';
import SearchPerson from './SearchPerson';
import ApplicationDetails from './ApplicationDetails';

type Props = {
    formActiveTab: number,
    setFormActiveTab: Function,
}

function ApplicationPDS(parameter: Props) {

    const [activeTab, setActiveTab] = useState<number>(0);
    const tabsRef = useRef<TabsRef>(null);
    const props = { 'setFormActiveTab': parameter.setFormActiveTab, tabsRef };
    const { setFieldValue, submitForm } = useFormikContext();
    const validations = ['Search Personal', 'Personal', 'Family', 'Education', 'CS Eligibility', 'Learning and Development', 'Other Information'];
    const context = usePDSContext();



    useEffect(() => {
        props.tabsRef.current?.setActiveTab(parameter.formActiveTab);
    }, [parameter.formActiveTab]);

    useEffect(() => {
        parameter.setFormActiveTab(0);
    }, [context.initialValues]);



    // tabs
    return (
        <>
            <Tabs.Group
                aria-label="Pills"
                style="pills"
                ref={props.tabsRef}
                onActiveTabChange={(tab) => {
                    parameter.setFormActiveTab(tab);
                }}

            >
                <Tabs.Item
                    active
                    icon={HiUserCircle}
                    title={`Application Details`}
                >
                    <SearchPerson />
                    <div className="col-span-2 md:col-span-2 flex mx-auto mt-5">
                        <Button className='mx-2 btn btn-sm text-white rounded-lg bg-green-400  hover:scale-90 shadow-sm text' onClick={() => {
                            if (context.submitSearchPerson) {
                                context.submitSearchPerson();
                            }
                        }}>
                            Search and Fill Form
                        </Button>
                    </div>
                    <ApplicationDetails />


                </Tabs.Item>

                <Tabs.Item
                    active
                    icon={HiUser}
                    title={`Personal`}
                >
                    <EmployeeDetail />
                    <Personal />

                </Tabs.Item>
                <Tabs.Item
                    icon={HiUserGroup}
                    title={`Family`}
                    autoFocus
                >
                    <Family />
                </Tabs.Item >
                <Tabs.Item
                    icon={HiAcademicCap}
                    title={`Education`}
                    autoFocus
                >
                    <Education />
                </Tabs.Item >
                < Tabs.Item
                    icon={HiIdentification}
                    title={`CS Eligibility and Experience`}
                >
                    <Eligiblility />
                    <WorkExperience />
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
                    </div>
                </Tabs.Item>
                <Tabs.Item
                    id='other_information'
                    icon={HiBookmark}
                    title={`Other Information`}
                >
                    <OtherInformation />
                    <CharacterReference />


                </Tabs.Item>

            </Tabs.Group >
            <div className='col-span-4 md:col-span-4 grid md:grid-cols-2 grid-col mt-4'>
                <hr className='text-cyan-600 mt-6 col-span-2 md:col-span-2 mb-3' />
                <div className="mt-2  col-span-2 md:col-span-2 flex mx-auto">
                    {parameter.formActiveTab != 0 ?
                        <Button className='mx-2 btn btn-sm text-white rounded-lg bg-stone-500  hover:scale-90 shadow-sm text' onClick={() => {
                            parameter.setFormActiveTab(parameter.formActiveTab - 1);
                        }}>
                            Back
                        </Button>
                        : <></>
                    }



                    <Button className={`mx-2 btn btn-sm text-white rounded-lg   ${(context.process == "Delete" && (parameter.formActiveTab == (validations.length - 1)) ? "bg-red-500 hidden" : "bg-cyan-500")} hover:scale-90 shadow-sm text`} onClick={() => {
                        if (parameter.formActiveTab < (validations.length - 1)) {
                            parameter.setFormActiveTab(parameter.formActiveTab + 1);
                        }
                        else {
                            submitForm();
                            const element = document.getElementById('drawer_title');
                            if (element) {
                                element.scrollIntoView({ behavior: 'smooth' });
                            }
                        }
                    }}>
                        {parameter.formActiveTab == (validations.length - 1) ? "Submit" : "Next"}
                    </Button>

                    {context.process == "Delete" ?
                        <Button className={`mx-2 btn btn-sm text-white rounded-lg   bg-red-500  hover:scale-90 shadow-sm text`} onClick={() => {
                            submitForm();
                            const element = document.getElementById('drawer_title');
                            if (element) {
                                element.scrollIntoView({ behavior: 'smooth' });
                            }
                        }}>
                            Delete
                        </Button>
                        : ""}
                </div>


            </div >

        </>
    )
}

export default ApplicationPDS