"use client";
import React, { useContext, useState, useMemo, useRef, useEffect } from 'react'
import { FormElement } from '../commons/FormElement';
import { Field, FieldArray, useFormikContext } from 'formik';
import DatePicker from "../DatePicker";
import { usePDSContext } from "@/app/contexts/PDSContext"
import { Button, Tooltip } from 'flowbite-react';
import { HiDocumentAdd, HiDocumentRemove, HiUserAdd, HiUserRemove } from 'react-icons/hi';
import { date } from 'yup';
import { FormFieldError } from '../commons/FormFieldError';
import { child, school } from '@/app/types/pds';
import { initial } from 'lodash';


function Education() {
    const { setFieldValue } = useFormikContext();
    const context = usePDSContext();
    const [schools, setSchools] = useState<school[]>([...context.initialValues.schools]);

    useEffect(() => {
        let reinitializeValues = context.initialValues;
        reinitializeValues.schools = schools;
    }, [schools])



    return (
        <>
            <div className='grid lg:grid-cols-4 grid-col' >

                <div className='col-span-4 md:col-span-4'>
                    <span className=' text-cyan-600 font-medium text-lg '>III. Educational Background</span>
                    <hr className='text-cyan-600 mt-6' />
                </div>


                <FieldArray name="schools">
                    {({ insert, remove, push }) => (
                        <>
                            {schools.map((object, index: number) => {
                                return <div className='col-span-4 md:col-span-4 grid md:grid-cols-12 grid-col' key={index}>
                                    <div className="mt-4 mx-2 col-span-8 md:col-span-2">
                                        <Field
                                            as="select"
                                            id={`schools.${index}.level`}
                                            name={`schools.${index}.level`}
                                            placeholder="Level"
                                            className="w-full p-4 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                                            autoComplete="on"
                                        >
                                            <option value="">Select Level</option>
                                            <option value="Elementary">Elementary</option>
                                            <option value="Secondary">Secondary</option>
                                            <option value="Vocational/Trade Course">Vocational/Trade Course</option>
                                            <option value="College">College</option>
                                            <option value="Masters">Masters</option>
                                            <option value="Doctorate">Doctorate</option>

                                        </Field>
                                        <FormFieldError name={`schools.${index}.level`} errors={context.errors} touched={context.touched} />
                                    </div>

                                    <div className="mt-4 mx-2 col-span-8 md:col-span-3">
                                        <Field
                                            id={`schools.${index}.name`}
                                            name={`schools.${index}.name`}
                                            placeholder="School Name"
                                            className="w-full p-4 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                                            autoComplete="on"
                                        />
                                        <FormFieldError name={`schools.${index}.name`} errors={context.errors} touched={context.touched} />
                                    </div>

                                    <div className="mt-4 mx-2 col-span-8 md:col-span-3">
                                        <Field
                                            id={`schools.${index}.degree`}
                                            name={`schools.${index}.degree`}
                                            placeholder="Basic Education/Degree/Course"
                                            className="w-full p-4 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                                            autoComplete="on"
                                        />
                                        <FormFieldError name={`schools.${index}.degree`} errors={context.errors} touched={context.touched} />
                                    </div>
                                    <div className="mt-4 mx-2 col-span-8 md:col-span-2">
                                        <Field
                                            id={`schools.${index}.period_from`}
                                            name={`schools.${index}.period_from`}
                                            placeholder="From"
                                            className="w-full p-4 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                                            autoComplete="on"
                                        />
                                        <FormFieldError name={`schools.${index}.period_from`} errors={context.errors} touched={context.touched} />
                                    </div>

                                    <div className="mt-4 mx-2 col-span-8 md:col-span-2">
                                        <Field
                                            id={`schools.${index}.period_to`}
                                            name={`schools.${index}.period_to`}
                                            placeholder="To"
                                            className="w-full p-4 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                                            autoComplete="on"
                                        />
                                        <FormFieldError name={`schools.${index}.period_to`} errors={context.errors} touched={context.touched} />
                                    </div>

                                    <div className="mt-4 mx-2 col-span-8 md:col-span-2">
                                        <Field
                                            id={`schools.${index}.highest_unit_earned`}
                                            name={`schools.${index}.highest_unit_earned`}
                                            placeholder="Highest Units Earned"
                                            className="w-full p-4 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                                            autoComplete="on"
                                        />
                                        <FormFieldError name={`schools.${index}.highest_unit_earned`} errors={context.errors} touched={context.touched} />
                                    </div>

                                    <div className="mt-4 mx-2 col-span-8 md:col-span-3">
                                        <Field
                                            id={`schools.${index}.year_graduated`}
                                            name={`schools.${index}.year_graduated`}
                                            placeholder="Year Graduated"
                                            className="w-full p-4 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                                            autoComplete="on"
                                        />
                                        <FormFieldError name={`schools.${index}.year_graduated`} errors={context.errors} touched={context.touched} />
                                    </div>

                                    <div className="mt-4 mx-2 col-span-8 md:col-span-5">
                                        <Field
                                            id={`schools.${index}.scholarship_academic_awards`}
                                            name={`schools.${index}.scholarship_academic_awards`}
                                            placeholder="Scolarship / Academic Honors Received"
                                            className="w-full p-4 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                                            autoComplete="on"
                                        />
                                        <FormFieldError name={`schools.${index}.scholarship_academic_awards`} errors={context.errors} touched={context.touched} />
                                    </div>

                                    <div className="mt-4 col-span-4 md:col-span-1 mx-auto ">
                                        <Button className='mt-3 btn btn-sm text-white rounded-lg  bg-red-500 hover:bg-red-500 hover:scale-90 shadow-sm float-left align-middle ' onClick={() => {
                                            remove(index);
                                            let reinitialize_schools = [...schools].filter((object, filterIndedx: number) => {
                                                return index != filterIndedx;
                                            });

                                            setSchools(reinitialize_schools);
                                        }
                                        }>
                                            <Tooltip content="Remove Data">
                                                <HiDocumentRemove />
                                            </Tooltip>
                                        </Button>
                                    </div>
                                    <hr className='text-cyan-600 mt-6 col-span-12' />
                                </div>
                            })}
                            <div className='col-span-4 md:col-span-4 grid md:grid-cols-4 grid-col'>
                                <div className="mt-4 mx-2 md:col-start-4 col-span-4 md:col-span-1">

                                    <Button className='btn btn-sm bg-green-400 text-white rounded-lg   hover:scale-90 shadow-sm  mx-auto' onClick={() => {

                                        let reinitialize_schools = [...schools].map((object: school, index: number) => {
                                            return object;
                                        });

                                        reinitialize_schools.push({
                                            level: '',
                                            name: '',
                                            degree: '',
                                            period_from: '',
                                            period_to: '',
                                            highest_unit_earned: '',
                                            year_graduated: '',
                                            scholarship_academic_awards: ''
                                        })

                                        push({
                                            level: '',
                                            name: '',
                                            degree: '',
                                            period_from: '',
                                            period_to: '',
                                            highest_unit_earned: '',
                                            year_graduated: '',
                                            scholarship_academic_awards: ''
                                        });

                                        setSchools(reinitialize_schools);

                                    }}>
                                        <Tooltip content="Add School">
                                            <HiDocumentAdd className='text-lg' />
                                        </Tooltip>
                                    </Button>
                                </div>
                            </div>
                        </>
                    )}
                </FieldArray>


            </div>
        </>
    )
}

export default Education