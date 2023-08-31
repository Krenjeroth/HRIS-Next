"use client";
import { Tabs } from 'flowbite-react';
import React, { useContext } from 'react'
import { FormElement } from '../commons/FormElement';
import { Field } from 'formik';
import DatePicker from "../DatePicker";
import { usePDSContext } from "@/app/contexts/PDSContext"
import { formContextType } from '@/app/types/pds';

function index() {
    const context = usePDSContext();
    return (
        <Tabs.Group
            aria-label="Default tabs"
            style="default"
        >
            <Tabs.Item
                active
                // icon={HiUserCircle}
                title="Personal"
            >

                <div className='grid lg:grid-cols-4 grid-col'>
                    <FormElement
                        name="employee_id"
                        label="Employee ID *"
                        errors={context.errors}
                        touched={context.touched}
                        className='lg:col-span-2'
                    >
                        <Field
                            id="employee_id"
                            name="employee_id"
                            placeholder="Employee ID"
                            className="w-full p-4 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                        />
                    </FormElement>

                    <FormElement
                        name="employee_type"
                        label="Employee Type"
                        className='lg:col-span-2'
                        errors={context.errors}
                        touched={context.touched}
                    >
                        <Field as="select"
                            id="employee_type"
                            name="employee_type"
                            placeholder="Employee Type"
                            className="w-full p-4 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                        >
                            <option value="">Select Type </option>
                            <option value="Permanent">Permanent</option>
                            <option value="Casual">Casual</option>
                            <option value="Elective">Elective </option>
                            <option value="Coterminous">Coterminous</option>
                            <option value="Contractual">Contractual</option>

                        </Field>
                    </FormElement>
                </div>


                <div className='grid lg:grid-cols-4 grid-col'>
                    <FormElement
                        name="first_name"
                        label="Employee ID *"
                        errors={context.errors}
                        touched={context.touched}
                        className='lg:col-span-2'
                    >
                        <Field
                            id="First Name"
                            name="first_name"
                            placeholder="First Name"
                            className="w-full p-4 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                            autoComplete="on"
                        />
                    </FormElement>


                    <FormElement
                        name="middle_name"
                        label="Middle Name"
                        errors={context.errors}
                        touched={context.touched}
                    >
                        <Field
                            id="middle_name"
                            name="middle_name"
                            placeholder="Middle Name"
                            className="w-full p-4 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                        />
                    </FormElement>

                    <FormElement
                        name="last_name"
                        label="Last Name"
                        errors={context.errors}
                        touched={context.touched}
                    >
                        <Field
                            id="last_name"
                            name="last_name"
                            placeholder="Last Name"
                            className="w-full p-4 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                        />
                    </FormElement>


                    <FormElement
                        name="suffix"
                        label="Suffix"
                        errors={context.errors}
                        touched={context.touched}
                    >
                        <Field
                            id="suffix"
                            name="suffix"
                            placeholder="Suffix"
                            className="w-full p-4 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                        />
                    </FormElement>


                    <FormElement
                        name="birth_place"
                        label="Birth Place"
                        errors={context.errors}
                        touched={context.touched}
                        className='lg:col-span-4'
                    >
                        <Field
                            name="birth_place"
                            id="birth_place"
                            placeholder="Birth Place"
                            className="w-full p-4 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                        />
                    </FormElement>
                    <FormElement
                        name="birth_date"
                        label="Birthdate"
                        errors={context.errors}
                        touched={context.touched}
                    >
                        <DatePicker
                            initialValues={context.initialValues}
                            setValues={context.setValues}
                            name="birth_date"
                            id="birth_date"
                            placeholder="Enter Date"
                            className="w-full p-4 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                        />
                    </FormElement>

                    <FormElement
                        name="age"
                        label="Age"
                        errors={context.errors}
                        touched={context.touched}
                    >
                        <Field
                            id="age"
                            name="age"
                            placeholder="Age"
                            className="w-full p-4 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                        />
                    </FormElement>

                    <FormElement
                        name="sex"
                        label="Sex"
                        errors={context.errors}
                        touched={context.touched}
                    >
                        <Field
                            as="select"
                            id="sex"
                            name="sex"
                            className="w-full p-4 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                        >
                            <option value="">Select Type </option>
                            <option value="Female">Female</option>
                            <option value="Male">Male</option>
                        </Field>
                    </FormElement>

                    <FormElement
                        name="height"
                        label="Height"
                        errors={context.errors}
                        touched={context.touched}
                    >
                        <Field
                            id="height"
                            name="height"
                            placeholder="Height"
                            className="w-full p-4 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                        />
                    </FormElement>

                    <FormElement
                        name="weight"
                        label="Weight"
                        errors={context.errors}
                        touched={context.touched}
                    >
                        <Field
                            id="weight"
                            name="weight"
                            placeholder="Weight"
                            className="w-full p-4 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                        />
                    </FormElement>
                </div>
            </Tabs.Item>
            <Tabs.Item
                // icon={MdDashboard}
                title="Family and Education"
            >
                <p>
                    This is
                    <span className="font-medium text-gray-800 dark:text-white">
                        Dashboard tab's associated content
                    </span>
                    .
                    Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to
                    control the content visibility and styling.
                </p>
            </Tabs.Item>
            <Tabs.Item
                // icon={HiAdjustments}
                title="Eligibility and Experience"
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
            </Tabs.Item>
            <Tabs.Item
                // icon={HiClipboardList}
                title="Voluntary Work and Experience"
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

                title="Other Information"
            >
                <p>
                    Disabled content
                </p>
            </Tabs.Item>
        </Tabs.Group>
    )
}

export default index