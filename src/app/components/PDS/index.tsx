"use client";
import { Tabs } from 'flowbite-react';
import React from 'react'
import { FormElement } from '../commons/FormElement';
import { Field } from 'formik';
type Props = {
    readonly?: boolean,
    errors: any,
    touched: any,
}

function index(parameter: Props) {
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

                <div className='grid grid-cols-4'>
                    <FormElement
                        name="employee_id"
                        label="Employee ID"
                        errors={parameter.errors}
                        touched={parameter.touched}
                        col_span='col-span-2'
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
                        errors={parameter.errors}
                        touched={parameter.touched}
                    >
                        <Field
                            id="employee_type"
                            name="employee_type"
                            placeholder="Employee Type"
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