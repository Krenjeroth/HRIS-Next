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
import { child, workExperience } from '@/app/types/pds';
import { initial } from 'lodash';


function WorkExperience() {
    const { setFieldValue } = useFormikContext();
    const context = usePDSContext();
    const [workExperiences, setExperience] = useState<workExperience[]>([]);

    useEffect(() => {
        setExperience([...context.initialValues.workExperiences]);
    }, [context.initialValues])



    return (
        <>
            <div className='grid lg:grid-cols-4 grid-col' >

                <div className='col-span-4 md:col-span-4'>
                    <span className=' text-blue-600 font-medium text-lg '>V. Work Experience</span>
                    <hr className='text-blue-600 mt-6' />
                </div>


                <FieldArray name="workExperiences">
                    {({ insert, remove, push }) => (
                        <>
                            {workExperiences.map((object, index: number) => {
                                return <div className='col-span-4 md:col-span-4 grid md:grid-cols-10 grid-col' key={index}>

                                    <div className="mt-2 mx-2 col-span-10 md:col-span-2">
                                        <DatePicker
                                            initialValues={context.initialValues}
                                            id={`workExperiences.${index}.date_from`}
                                            name={`workExperiences.${index}.date_from`}
                                            placeholderText="Inclusive Date From *"
                                            className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                                        />
                                        <FormFieldError name={`workExperiences.${index}.date_from`} errors={context.errors} touched={context.touched} />
                                    </div>

                                    <div className="mt-2 mx-2 col-span-10 md:col-span-2">
                                        <DatePicker
                                            initialValues={context.initialValues}
                                            id={`workExperiences.${index}.date_to`}
                                            name={`workExperiences.${index}.date_to`}
                                            placeholderText="Inclusive Date To *"
                                            className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                                        />
                                        <FormFieldError name={`workExperiences.${index}.date_to`} errors={context.errors} touched={context.touched} />
                                    </div>

                                    <div className="mt-2 mx-2 col-span-10 md:col-span-3">
                                        <Field
                                            id={`workExperiences.${index}.position_title`}
                                            name={`workExperiences.${index}.position_title`}
                                            placeholder="Position Title *"
                                            className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                                            autoComplete="on"
                                        />
                                        <FormFieldError name={`workExperiences.${index}.position_title`} errors={context.errors} touched={context.touched} />
                                    </div>
                                    <div className="mt-2 mx-2 col-span-10 md:col-span-3">
                                        <Field
                                            id={`workExperiences.${index}.office_company`}
                                            name={`workExperiences.${index}.office_company`}
                                            placeholder="Department/Agency/Office/Company *"
                                            className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                                            autoComplete="on"
                                        />
                                        <FormFieldError name={`workExperiences.${index}.office_company`} errors={context.errors} touched={context.touched} />
                                    </div>

                                    <div className="mt-2 mx-2 col-span-10 md:col-span-2">
                                        <Field type="number"
                                            id={`workExperiences.${index}.monthly_salary`}
                                            name={`workExperiences.${index}.monthly_salary`}
                                            placeholder="Monthly Salary *"
                                            className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                                            autoComplete="on"
                                        />
                                        <FormFieldError name={`workExperiences.${index}.monthly_salary`} errors={context.errors} touched={context.touched} />
                                    </div>

                                    <div className="mt-2 mx-2 col-span-10 md:col-span-2">
                                        <Field
                                            id={`workExperiences.${index}.salary_grade`}
                                            name={`workExperiences.${index}.salary_grade`}
                                            placeholder="Salary/Job/Pay Grade -  Step if Applicable*"
                                            className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                                            autoComplete="on"
                                        />
                                        <FormFieldError name={`workExperiences.${index}.salary_grade`} errors={context.errors} touched={context.touched} />
                                    </div>

                                    <div className="mt-2 mx-2 col-span-10 md:col-span-2">
                                        <Field
                                            as="select"
                                            id={`workExperiences.${index}.status_of_appointment`}
                                            name={`workExperiences.${index}.status_of_appointment`}
                                            placeholder="Status Of Appointment *"
                                            className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                                            autoComplete="on"
                                        >
                                            <option value="">Select Status of Appointment * </option>
                                            <option value="Permanent">Permanent</option>
                                            <option value="Regular">Regular</option>
                                            <option value="Casual">Casual</option>
                                            <option value="Elective">Elective </option>
                                            <option value="Coterminous">Coterminous</option>
                                            <option value="Contractual">Contractual</option>
                                            <option value="Contract of Service">Contract of Service</option>
                                        </Field>
                                        <FormFieldError name={`workExperiences.${index}.status_of_appointment`} errors={context.errors} touched={context.touched} />
                                    </div>

                                    <div className="mt-2 mx-2 col-span-10 md:col-span-2">
                                        <Field
                                            as="select"
                                            id={`workExperiences.${index}.government_service`}
                                            name={`workExperiences.${index}.government_service`}
                                            placeholder="Salary/Job/Pay Grade -  Step if Applicable*"
                                            className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                                            autoComplete="on"
                                        >
                                            <option value="">Government Service * </option>
                                            <option value="No">No</option>
                                            <option value="Yes">Yes</option>
                                        </Field>
                                        <FormFieldError name={`workExperiences.${index}.government_service`} errors={context.errors} touched={context.touched} />
                                    </div>




                                    <div className="mt-1 col-span-10 md:col-span-1 mx-auto ">
                                        <Button className='mt-3 btn btn-sm text-white rounded-lg  bg-red-500 hover:bg-red-500 hover:scale-90 shadow-sm float-left align-middle ' onClick={() => {
                                            remove(index);
                                            let reinitialize_workExperiences = [...workExperiences].filter((object, filterIndedx: number) => {
                                                return index != filterIndedx;
                                            });

                                            setExperience(reinitialize_workExperiences);
                                        }
                                        }>
                                            <Tooltip content="Remove Data">
                                                <HiDocumentRemove />
                                            </Tooltip>
                                        </Button>
                                    </div>
                                    <hr className='text-blue-600 mt-6 col-span-10' />
                                </div>
                            })}
                            <div className='col-span-4 md:col-span-4 grid md:grid-cols-10 grid-col'>
                                <div className="mt-2 mx-2 md:col-start-9 col-span-10 md:col-span-1">

                                    <Button className='btn btn-sm bg-green-400 text-white rounded-lg   hover:scale-90 shadow-sm  mx-auto' onClick={() => {

                                        let reinitialize_workExperiences = [...workExperiences].map((object: workExperience, index: number) => {
                                            return object;
                                        });

                                        reinitialize_workExperiences.push({
                                            date_from: '',
                                            date_to: '',
                                            position_title: '',
                                            office_company: '',
                                            monthly_salary: 0,
                                            salary_grade: '',
                                            status_of_appointment: '',
                                            government_service: false,
                                        })

                                        push({
                                            date_from: '',
                                            date_to: '',
                                            position_title: '',
                                            office_company: '',
                                            monthly_salary: '',
                                            salary_grade: '',
                                            status_of_appointment: '',
                                            government_service: '',
                                        });

                                        setExperience(reinitialize_workExperiences);

                                    }}>
                                        <Tooltip content="Add Work Experience">
                                            <HiDocumentAdd className='' />
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

export default WorkExperience