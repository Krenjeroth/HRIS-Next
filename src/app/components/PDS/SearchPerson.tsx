"use client";
import React, { useContext, useState, useMemo, useRef, useEffect } from 'react'
import { FormElement } from '../commons/FormElement';
import { Field, useFormikContext } from 'formik';
import DatePicker from "../DatePicker";
import { usePDSContext } from "@/app/contexts/PDSContext"
import { formContextType } from '@/app/types/pds';
import { country } from '@/app/types/pds';
import countryList from 'react-select-country-list';
import { UserCircleIcon } from '@heroicons/react/24/solid';
import Address from '../Address';
import { Button } from 'flowbite-react';
import { type } from 'os';





function SearchPerson
    () {
    const context = usePDSContext();
    const options = useMemo(() => countryList().getData(), []);
    const { setFieldValue } = useFormikContext();



    return (
        <div className='grid lg:grid-cols-4 grid-col mt-4'>
            <div className='col-span-4'>
                <span className=' text-cyan-600 font-medium text-lg '>Search Person</span>
                <hr className='text-cyan-600 mt-6' />
            </div>

            <FormElement
                name="search_employee_id"
                label="Employee ID"
                errors={context.errors}
                touched={context.touched}
                className='col-span-4 md:col-span-1'
            >
                <Field
                    id="search_employee_id"
                    name="search_employee_id"
                    placeholder="Employee Id"
                    className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                    autoComplete="on"
                />
            </FormElement>


            <FormElement
                name="search_first_name"
                label="First Name"
                errors={context.errors}
                touched={context.touched}
                className='col-span-4 md:col-span-1'
            >
                <Field
                    id="search_first_name"
                    name="search_first_name"
                    placeholder="First Name"
                    className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                    autoComplete="on"
                />
            </FormElement>


            <FormElement
                name="search_middle_name"
                label="Middle Name"
                errors={context.errors}
                touched={context.touched}
                className='col-span-4 md:col-span-1'
            >
                <Field
                    id="search_middle_name"
                    name="search_middle_name"
                    placeholder="Middle Name"
                    className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                />
            </FormElement>

            <FormElement
                name="search_last_name"
                label="Last Name"
                errors={context.errors}
                touched={context.touched}
                className='col-span-4 md:col-span-1'
            >
                <Field
                    id="search_last_name"
                    name="search_last_name"
                    placeholder="Last Name"
                    className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                />
            </FormElement>

            <FormElement
                name="search_suffix"
                label="Suffix"
                errors={context.errors}
                touched={context.touched}
                className='col-span-4 md:col-span-1'
            >
                <Field
                    id="search_suffix"
                    name="search_suffix"
                    placeholder="Suffix"
                    className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                />
            </FormElement>


        </div>
    )
}

export default SearchPerson
