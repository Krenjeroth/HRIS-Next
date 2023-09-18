"use client";
import React, { useContext, useState, useMemo, useRef, useEffect } from 'react'
import { FormElement } from '../commons/FormElement';
import { Field, FieldArray, useFormikContext } from 'formik';
import DatePicker from "../DatePicker";
import { usePDSContext } from "@/app/contexts/PDSContext"
import { Button, Tooltip } from 'flowbite-react';
import { HiUserAdd, HiUserRemove } from 'react-icons/hi';
import { date } from 'yup';
import { FormFieldError } from '../commons/FormFieldError';
import { child } from '@/app/types/pds';
import { initial } from 'lodash';


function Family() {
    const { setFieldValue } = useFormikContext();
    const context = usePDSContext();
    const [children, setChildren] = useState<child[]>([...context.initialValues.children]);

    useEffect(() => {
        let reinitializeValues = context.initialValues;
        reinitializeValues.children = children;
    }, [children])



    return (
        <>
            <div className='grid md:grid-cols-4 grid-col'>
                <div className='col-span-4 md:col-span-4'>
                    <span className=' text-cyan-600 font-medium text-lg '>II. Family and Education</span>
                    <hr className='text-cyan-600 mt-6' />
                </div>

                <div className='col-span-4 mt-4'>
                    <span className=' text-cyan-600 font-medium '> Spouse Information</span>
                    {/* <hr className='text-cyan-600' /> */}
                </div>
                <FormElement
                    name="spouse_first_name"
                    label="First Name "
                    errors={context.errors}
                    touched={context.touched}
                    className='col-span-4 md:col-span-1'
                >
                    <Field
                        id="spouse_first_name"
                        name="spouse_first_name"
                        placeholder="First Name"
                        className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                        autoComplete="on"
                    />
                </FormElement>


                <FormElement
                    name="spouse_middle_name"
                    label="Middle Name"
                    errors={context.errors}
                    touched={context.touched}
                    className='col-span-4 md:col-span-1'
                >
                    <Field
                        id="spouse_middle_name"
                        name="spouse_middle_name"
                        placeholder="Middle Name"
                        className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                    />
                </FormElement>

                <FormElement
                    name="spouse_last_name"
                    label="Last Name "
                    errors={context.errors}
                    touched={context.touched}
                    className='col-span-4 md:col-span-1'
                >
                    <Field
                        id="spouse_last_name"
                        name="spouse_last_name"
                        placeholder="Last Name"
                        className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                    />
                </FormElement>


                <FormElement
                    name="spouse_suffix"
                    label="Suffix"
                    errors={context.errors}
                    touched={context.touched}
                    className='col-span-4 md:col-span-1'
                >
                    <Field
                        id="spouse_suffix"
                        name="spouse_suffix"
                        placeholder="Suffix"
                        className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                    />
                </FormElement>

                <FormElement
                    name="spouse_occupation"
                    label="Occupation"
                    errors={context.errors}
                    touched={context.touched}
                    className='col-span-4 md:col-span-1'
                >
                    <Field
                        id="spouse_occupation"
                        name="spouse_occupation"
                        placeholder="Occupation"
                        className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                    />
                </FormElement>

                <FormElement
                    name="spouse_employer"
                    label="Employer/Business Name"
                    errors={context.errors}
                    touched={context.touched}
                    className='col-span-4 md:col-span-1'
                >
                    <Field
                        id="spouse_employer"
                        name="spouse_employer"
                        placeholder="Employer/Business Name"
                        className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                    />
                </FormElement>

                <FormElement
                    name="spouse_employer_address"
                    label="Business Address"
                    errors={context.errors}
                    touched={context.touched}
                    className='col-span-4 md:col-span-1'
                >
                    <Field
                        id="spouse_employer_address"
                        name="spouse_employer_address"
                        placeholder="Business Address"
                        className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                    />
                </FormElement>

                <FormElement
                    name="spouse_employer_telephone"
                    label="Telephone"
                    errors={context.errors}
                    touched={context.touched}
                    className='col-span-4 md:col-span-1'
                >
                    <Field
                        id="spouse_employer_telephone"
                        name="spouse_employer_telephone"
                        placeholder="Telephone"
                        className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                    />
                </FormElement>


            </div>
            <div className='grid lg:grid-cols-4 grid-col' >

                <div className='col-span-4 md:col-span-4 mt-4'>
                    <span className=' text-cyan-600 font-medium '> Children</span>
                    {/* <hr className='text-cyan-600' /> */}
                </div>

                <FieldArray name="children">
                    {({ insert, remove, push }) => (
                        <>
                            {children.map((object, index: number) => {
                                return <div className='col-span-4 md:col-span-4 grid md:grid-cols-4 grid-col' key={index}>
                                    {/* <div className="mt-2 mx-2 col-span-4 md:col-span-1">
                                        <Field
                                            id={`children.${index}.number`}
                                            name={`children.${index}.number`}
                                            placeholder="Number"
                                            className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                                            autoComplete="on"
                                        />
                                    </div> */}

                                    <div className="mt-2 mx-2 col-span-4 md:col-span-2">
                                        <Field
                                            id={`children.${index}.name`}
                                            name={`children.${index}.name`}
                                            placeholder="Name *"
                                            className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                                            autoComplete="on"
                                        />
                                    </div>
                                    <div className="mt-2 mx-2 col-span-4 md:col-span-1">
                                        <DatePicker
                                            initialValues={context.initialValues}
                                            id={`children.${index}.birthday`}
                                            name={`children.${index}.birthday`}
                                            placeholderText="Birthday *"
                                            className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                                        />
                                    </div>
                                    <div className="mt-1 col-span-4 md:col-span-1 mx-auto ">
                                        <Button className='mt-3 btn btn-sm text-white rounded-lg  bg-red-500 hover:bg-red-500 hover:scale-90 shadow-sm float-left align-middle ' onClick={() => {
                                            remove(index);
                                            let reinitialize_children = [...children].filter((object, filterIndedx: number) => {
                                                return index != filterIndedx;
                                            });

                                            reinitialize_children = reinitialize_children.map((object, index: number) => {
                                                object.number = index + 1;
                                                return object;
                                            });

                                            setChildren(reinitialize_children);
                                        }
                                        }>
                                            <Tooltip content="Remove Child">
                                                <HiUserRemove className='' />
                                            </Tooltip>
                                        </Button>
                                    </div>
                                </div>
                            })}
                            <div className='col-span-4 md:col-span-4 grid md:grid-cols-4 grid-col'>
                                <div className="mt-2 mx-2 md:col-start-4 col-span-4 md:col-span-1">

                                    <Button className='btn btn-sm bg-green-400 text-white rounded-lg   hover:scale-90 shadow-sm  mx-auto' onClick={() => {

                                        let reinitialize_children = [...children].map((object: child, index: number) => {
                                            object.number = index + 1;
                                            return object;
                                        });

                                        reinitialize_children.push({
                                            number: reinitialize_children.length + 1,
                                            name: '',
                                            birthday: ''
                                        });

                                        push({
                                            number: context.initialValues.children.length + 1,
                                            name: '',
                                            birthday: ''
                                        });

                                        setChildren(reinitialize_children);

                                    }}>
                                        <Tooltip content="Add Child">
                                            <HiUserAdd className='' />
                                        </Tooltip>
                                    </Button>
                                </div>
                            </div>
                        </>
                    )}
                </FieldArray>


            </div>

            <div className='grid md:grid-cols-4 grid-col'>
                <div className='col-span-4 mt-4'>
                    <span className=' text-cyan-600 font-medium '> Father's Name</span>
                    {/* <hr className='text-cyan-600' /> */}
                </div>
                <FormElement
                    name="father_first_name"
                    label="First Name *"
                    errors={context.errors}
                    touched={context.touched}
                    className='col-span-4 md:col-span-1'
                >
                    <Field
                        id="father_first_name"
                        name="father_first_name"
                        placeholder="First Name"
                        className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                        autoComplete="on"
                    />
                </FormElement>


                <FormElement
                    name="father_middle_name"
                    label="Middle Name"
                    errors={context.errors}
                    touched={context.touched}
                    className='col-span-4 md:col-span-1'
                >
                    <Field
                        id="father_middle_name"
                        name="father_middle_name"
                        placeholder="Middle Name"
                        className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                    />
                </FormElement>

                <FormElement
                    name="father_last_name"
                    label="Last Name *"
                    errors={context.errors}
                    touched={context.touched}
                    className='col-span-4 md:col-span-1'
                >
                    <Field
                        id="father_last_name"
                        name="father_last_name"
                        placeholder="Last Name"
                        className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                    />
                </FormElement>


                <FormElement
                    name="father_suffix"
                    label="Suffix"
                    errors={context.errors}
                    touched={context.touched}
                    className='col-span-4 md:col-span-1'
                >
                    <Field
                        id="father_suffix"
                        name="father_suffix"
                        placeholder="Suffix"
                        className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                    />
                </FormElement>


                <div className='col-span-4 mt-4'>
                    <span className=' text-cyan-600 font-medium '> Mother's Maiden Name</span>
                    {/* <hr className='text-cyan-600' /> */}
                </div>
                <FormElement
                    name="mother_first_name"
                    label="First Name *"
                    errors={context.errors}
                    touched={context.touched}
                    className='col-span-4 md:col-span-1'
                >
                    <Field
                        id="mother_first_name"
                        name="mother_first_name"
                        placeholder="First Name"
                        className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                        autoComplete="on"
                    />
                </FormElement>


                <FormElement
                    name="mother_middle_name"
                    label="Middle Name"
                    errors={context.errors}
                    touched={context.touched}
                    className='col-span-4 md:col-span-1'
                >
                    <Field
                        id="mother_middle_name"
                        name="mother_middle_name"
                        placeholder="Middle Name"
                        className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                    />
                </FormElement>

                <FormElement
                    name="mother_last_name"
                    label="Last Name *"
                    errors={context.errors}
                    touched={context.touched}
                    className='col-span-4 md:col-span-1'
                >
                    <Field
                        id="mother_last_name"
                        name="mother_last_name"
                        placeholder="Last Name"
                        className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                    />
                </FormElement>


                <FormElement
                    name="mother_suffix"
                    label="Suffix"
                    errors={context.errors}
                    touched={context.touched}
                    className='col-span-4 md:col-span-1'
                >
                    <Field
                        id="mother_suffix"
                        name="mother_suffix"
                        placeholder="Suffix"
                        className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                    />
                </FormElement>
            </div>
        </>
    )
}

export default Family