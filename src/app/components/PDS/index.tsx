"use client";
import { Tabs } from 'flowbite-react';
import React, { useContext } from 'react'
import { FormElement } from '../commons/FormElement';
import { Field } from 'formik';
import DatePicker from "../DatePicker";
import { PDSContext, usePDSContext } from "@/app/contexts/PDSContext"
import { formContextType } from '@/app/types/pds';

type Props = {
    // readonly?: boolean,
    // errors: any,
    // touched: any,
    // isEmployee?: boolean,
    // initialValues: any
    // setValues: Function
}

function index() {
    console.log(usePDSContext);
    // const parameter = useContext();
    return (
        <>
        </>
        // <Tabs.Group
        //     aria-label="Default tabs"
        //     style="default"
        // >
        //     <Tabs.Item
        //         active
        //         // icon={HiUserCircle}
        //         title="Personal"
        //     >

        //         <div className='grid lg:grid-cols-4 grid-col'>
        //             <FormElement
        //                 name="employee_id"
        //                 label="Employee ID"
        //                 errors={parameter.errors}
        //                 touched={parameter.touched}
        //                 className='lg:col-span-2'
        //             >
        //                 <Field
        //                     id="employee_id"
        //                     name="employee_id"
        //                     placeholder="Employee ID"
        //                     className="w-full p-4 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
        //                 />
        //             </FormElement>

        //             <FormElement
        //                 name="employee_type"
        //                 label="Employee Type"
        //                 errors={parameter.errors}
        //                 touched={parameter.touched}
        //             >
        //                 <Field as="select"
        //                     id="employee_type"
        //                     name="employee_type"
        //                     placeholder="Employee Type"
        //                     className="w-full p-4 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
        //                 >
        //                     <option value="">Select Type </option>
        //                     <option value="Permanent">Permanent</option>
        //                     <option value="Casual">Casual</option>
        //                     <option value="Elective">Elective </option>
        //                     <option value="Coterminous">Coterminous</option>
        //                     <option value="Contractual">Contractual</option>

        //                 </Field>
        //             </FormElement>

        //         </div>


        //         <div className='grid lg:grid-cols-4 grid-col'>
        //             <FormElement
        //                 name="birth_place"
        //                 label="First Name"
        //                 errors={parameter.errors}
        //                 touched={parameter.touched}
        //             // className='lg:col-span-2'
        //             >
        //                 <Field
        //                     id="first_name"
        //                     name="first_name"
        //                     placeholder="First Name"
        //                     className="w-full p-4 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
        //                 />
        //             </FormElement>
        //             <FormElement
        //                 name="middle_name"
        //                 label="Middle Name"
        //                 errors={parameter.errors}
        //                 touched={parameter.touched}
        //             >
        //                 <Field
        //                     id="middle_name"
        //                     name="middle_name"
        //                     placeholder="Middle Name"
        //                     className="w-full p-4 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
        //                 />
        //             </FormElement>

        //             <FormElement
        //                 name="last_name"
        //                 label="Last Name"
        //                 errors={parameter.errors}
        //                 touched={parameter.touched}
        //             >
        //                 <Field
        //                     id="last_name"
        //                     name="last_name"
        //                     placeholder="Last Name"
        //                     className="w-full p-4 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
        //                 />
        //             </FormElement>


        //             <FormElement
        //                 name="suffix"
        //                 label="Suffix"
        //                 errors={parameter.errors}
        //                 touched={parameter.touched}
        //             >
        //                 <Field
        //                     id="suffix"
        //                     name="suffix"
        //                     placeholder="Suffix"
        //                     className="w-full p-4 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
        //                 />
        //             </FormElement>


        //             <FormElement
        //                 name="birth_place"
        //                 label="Birth Place"
        //                 errors={parameter.errors}
        //                 touched={parameter.touched}
        //                 className='lg:col-span-4'
        //             >
        //                 <Field
        //                     id="birth_place"
        //                     name="birth_place"
        //                     placeholder="Birth Place"
        //                     className="w-full p-4 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
        //                 />
        //             </FormElement>
        //             <FormElement
        //                 name="birth_date"
        //                 label="Birthdate"
        //                 errors={parameter.errors}
        //                 touched={parameter.touched}
        //             >
        //                 <DatePicker
        //                     initialValues={parameter.initialValues}
        //                     setValues={parameter.setValues}
        //                     name="birth_date"
        //                     placeholder="Enter Date"
        //                     className="w-full p-4 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
        //                 />
        //             </FormElement>

        //             <FormElement
        //                 name="age"
        //                 label="Age"
        //                 errors={parameter.errors}
        //                 touched={parameter.touched}
        //             >
        //                 <Field
        //                     id="age"
        //                     name="age"
        //                     placeholder="Age"
        //                     className="w-full p-4 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
        //                 />
        //             </FormElement>

        //             <FormElement
        //                 name="sex"
        //                 label="Sex"
        //                 errors={parameter.errors}
        //                 touched={parameter.touched}
        //             >
        //                 <Field
        //                     as="select"
        //                     id="sex"
        //                     name="sex"
        //                     className="w-full p-4 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
        //                 >
        //                     <option value="">Select Type </option>
        //                     <option value="Female">Female</option>
        //                     <option value="Male">Male</option>
        //                 </Field>
        //             </FormElement>

        //             <FormElement
        //                 name="height"
        //                 label="Height"
        //                 errors={parameter.errors}
        //                 touched={parameter.touched}
        //             >
        //                 <Field
        //                     id="height"
        //                     name="height"
        //                     placeholder="Height"
        //                     className="w-full p-4 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
        //                 />
        //             </FormElement>

        //             <FormElement
        //                 name="weight"
        //                 label="Weight"
        //                 errors={parameter.errors}
        //                 touched={parameter.touched}
        //             >
        //                 <Field
        //                     id="weight"
        //                     name="weight"
        //                     placeholder="Weight"
        //                     className="w-full p-4 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
        //                 />
        //             </FormElement>
        //         </div>
        //     </Tabs.Item>
        //     <Tabs.Item
        //         // icon={MdDashboard}
        //         title="Family and Education"
        //     >
        //         <p>
        //             This is
        //             <span className="font-medium text-gray-800 dark:text-white">
        //                 Dashboard tab's associated content
        //             </span>
        //             .
        //             Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to
        //             control the content visibility and styling.
        //         </p>
        //     </Tabs.Item>
        //     <Tabs.Item
        //         // icon={HiAdjustments}
        //         title="Eligibility and Experience"
        //     >
        //         <p>
        //             This is
        //             <span className="font-medium text-gray-800 dark:text-white">
        //                 Settings tab's associated content
        //             </span>
        //             .
        //             Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to
        //             control the content visibility and styling.
        //         </p>
        //     </Tabs.Item>
        //     <Tabs.Item
        //         // icon={HiClipboardList}
        //         title="Voluntary Work and Experience"
        //     >
        //         <p>
        //             This is
        //             <span className="font-medium text-gray-800 dark:text-white">
        //                 Contacts tab's associated content
        //             </span>
        //             .
        //             Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to
        //             control the content visibility and styling.
        //         </p>
        //     </Tabs.Item>
        //     <Tabs.Item

        //         title="Other Information"
        //     >
        //         <p>
        //             Disabled content
        //         </p>
        //     </Tabs.Item>
        // </Tabs.Group>
    )
}

export default index