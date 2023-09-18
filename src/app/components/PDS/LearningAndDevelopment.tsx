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
import { child, training } from '@/app/types/pds';
import { initial } from 'lodash';


function LearningAndDevelopment() {
    const { setFieldValue } = useFormikContext();
    const context = usePDSContext();
    const [trainings, setTrainings] = useState<training[]>([...context.initialValues.trainings]);

    useEffect(() => {
        let reinitializeValues = context.initialValues;
        reinitializeValues.trainings = trainings;
    }, [trainings])



    return (
        <>
            <div className='grid lg:grid-cols-4 grid-col' >

                <div className='col-span-4 md:col-span-4'>
                    <span className=' text-cyan-600 font-medium text-lg '>VII.  Learning and DEvelopment (L&D) Interventions/Training Programs Attended</span>
                    <hr className='text-cyan-600 mt-6' />
                </div>


                <FieldArray name="trainings">
                    {({ insert, remove, push }) => (
                        <>
                            {trainings.map((object, index: number) => {
                                return <div className='col-span-4 md:col-span-4 grid md:grid-cols-10 grid-col mt-4' key={index}>
                                    <div className="mt-2 mx-2 col-span-10 md:col-span-4">
                                        <Field
                                            id={`trainings.${index}.training_title`}
                                            name={`trainings.${index}.training_title`}
                                            placeholder="Training Title *"
                                            className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                                            autoComplete="on"
                                        />
                                        <FormFieldError name={`trainings.${index}.training_title`} errors={context.errors} touched={context.touched} />
                                    </div>



                                    <div className="mt-2 mx-2 col-span-10 md:col-span-2">
                                        <DatePicker
                                            initialValues={context.initialValues}
                                            id={`trainings.${index}.attendance_from`}
                                            name={`trainings.${index}.attendance_from`}
                                            placeholderText="Inclusive Attendance From *"
                                            className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                                        />
                                        <FormFieldError name={`trainings.${index}.attendance_from`} errors={context.errors} touched={context.touched} />
                                    </div>

                                    <div className="mt-2 mx-2 col-span-10 md:col-span-2">
                                        <DatePicker
                                            initialValues={context.initialValues}
                                            id={`trainings.${index}.attendance_to`}
                                            name={`trainings.${index}.attendance_to`}
                                            placeholderText="Inclusive Attendance To *"
                                            className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                                        />
                                        <FormFieldError name={`trainings.${index}.attendance_to`} errors={context.errors} touched={context.touched} />
                                    </div>


                                    <div className="mt-2 mx-2 col-span-10 md:col-span-2">
                                        <Field
                                            type="number"
                                            id={`trainings.${index}.number_of_hours`}
                                            name={`trainings.${index}.number_of_hours`}
                                            placeholder="Number of Hours *"
                                            className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                                            autoComplete="on"
                                        />
                                        <FormFieldError name={`trainings.${index}.number_of_hours`} errors={context.errors} touched={context.touched} />
                                    </div>

                                    <div className="mt-2 mx-2 col-span-10 md:col-span-2">
                                        <Field
                                            id={`trainings.${index}.training_type`}
                                            name={`trainings.${index}.training_type`}
                                            placeholder="Type of LD *"
                                            className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                                            autoComplete="on"
                                        />
                                        <FormFieldError name={`trainings.${index}.training_type`} errors={context.errors} touched={context.touched} />
                                    </div>

                                    <div className="mt-2 mx-2 col-span-10 md:col-span-6">
                                        <Field
                                            id={`trainings.${index}.conducted_sponsored_by`}
                                            name={`trainings.${index}.conducted_sponsored_by`}
                                            placeholder="Conducted/Sponsored by*"
                                            className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                                            autoComplete="on"
                                        />
                                        <FormFieldError name={`trainings.${index}.conducted_sponsored_by`} errors={context.errors} touched={context.touched} />
                                    </div>



                                    <div className="mt-1 col-span-10 md:col-span-1 mx-auto ">
                                        <Button className='mt-3 btn btn-sm text-white rounded-lg  bg-red-500 hover:bg-red-500 hover:scale-90 shadow-sm float-left align-middle ' onClick={() => {
                                            remove(index);
                                            let reinitialize_trainings = [...trainings].filter((object, filterIndedx: number) => {
                                                return index != filterIndedx;
                                            });

                                            setTrainings(reinitialize_trainings);
                                        }
                                        }>
                                            <Tooltip content="Remove Data">
                                                <HiDocumentRemove />
                                            </Tooltip>
                                        </Button>
                                    </div>
                                    {/* <hr className='text-cyan-600 mt-6 col-span-10' /> */}
                                </div>
                            })}
                            <div className='col-span-4 md:col-span-4 grid md:grid-cols-10 grid-col'>
                                <div className="mt-2 mx-2 md:col-start-9 col-span-10 md:col-span-1">

                                    <Button className='btn btn-sm bg-green-400 text-white rounded-lg   hover:scale-90 shadow-sm  mx-auto' onClick={() => {

                                        let reinitialize_trainings = [...trainings].map((object: training, index: number) => {
                                            return object;
                                        });

                                        reinitialize_trainings.push({
                                            training_title: '',
                                            attendance_from: '',
                                            attendance_to: '',
                                            number_of_hours: 0,
                                            training_type: '',
                                            conducted_sponsored_by: ''
                                        });

                                        push({
                                            training_title: '',
                                            attendance_from: '',
                                            attendance_to: '',
                                            number_of_hours: '',
                                            training_type: '',
                                            conducted_sponsored_by: ''
                                        });

                                        setTrainings(reinitialize_trainings);

                                    }}>
                                        <Tooltip content="Add Voluntary Work">
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

export default LearningAndDevelopment