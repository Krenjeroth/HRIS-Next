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
import { child, voluntaryWork } from '@/app/types/pds';
import { initial } from 'lodash';


function VoluntaryWork() {
    const { setFieldValue } = useFormikContext();
    const context = usePDSContext();
    const [voluntaryWorks, setVoluntaryWorks] = useState<voluntaryWork[]>([...context.initialValues.voluntaryWorks]);

    useEffect(() => {
        let reinitializeValues = context.initialValues;
        reinitializeValues.voluntaryWorks = voluntaryWorks;
    }, [voluntaryWorks])



    return (
        <>
            <div className='grid lg:grid-cols-4 grid-col' >

                <div className='col-span-4 md:col-span-4'>
                    <span className=' text-cyan-600 font-medium text-lg '>VI. Voluntary Work or Involvement in Civic / Non-government / People / Voluntary Organization/s</span>
                    <hr className='text-cyan-600 mt-6' />
                </div>


                <FieldArray name="voluntaryWorks">
                    {({ insert, remove, push }) => (
                        <>
                            {voluntaryWorks.map((object, index: number) => {
                                return <div className='col-span-4 md:col-span-4 grid md:grid-cols-10 grid-col mt-4' key={index}>

                                    <div className="mt-2 mx-2 col-span-10 md:col-span-3">
                                        <Field
                                            id={`voluntaryWorks.${index}.organization_name`}
                                            name={`voluntaryWorks.${index}.organization_name`}
                                            placeholder="Organization Name *"
                                            className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                                            autoComplete="on"
                                        />
                                        <FormFieldError name={`voluntaryWorks.${index}.organization_name`} errors={context.errors} touched={context.touched} />
                                    </div>

                                    <div className="mt-2 mx-2 col-span-10 md:col-span-3">
                                        <Field
                                            id={`voluntaryWorks.${index}.organization_address`}
                                            name={`voluntaryWorks.${index}.organization_address`}
                                            placeholder="Organization Address *"
                                            className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                                            autoComplete="on"
                                        />
                                        <FormFieldError name={`voluntaryWorks.${index}.organization_address`} errors={context.errors} touched={context.touched} />
                                    </div>

                                    <div className="mt-2 mx-2 col-span-10 md:col-span-2">
                                        <DatePicker
                                            initialValues={context.initialValues}
                                            id={`voluntaryWorks.${index}.date_from`}
                                            name={`voluntaryWorks.${index}.date_from`}
                                            placeholderText="Inclusive Date From *"
                                            className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                                        />
                                        <FormFieldError name={`voluntaryWorks.${index}.date_from`} errors={context.errors} touched={context.touched} />
                                    </div>

                                    <div className="mt-2 mx-2 col-span-10 md:col-span-2">
                                        <DatePicker
                                            initialValues={context.initialValues}
                                            id={`voluntaryWorks.${index}.date_to`}
                                            name={`voluntaryWorks.${index}.date_to`}
                                            placeholderText="Inclusive Date To *"
                                            className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                                        />
                                        <FormFieldError name={`voluntaryWorks.${index}.date_to`} errors={context.errors} touched={context.touched} />
                                    </div>

                                    <div className="mt-2 mx-2 col-span-10 md:col-span-3">
                                        <Field
                                            type="number"
                                            id={`voluntaryWorks.${index}.number_of_hours`}
                                            name={`voluntaryWorks.${index}.number_of_hours`}
                                            placeholder="Number of Hours *"
                                            className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                                            autoComplete="on"
                                        />
                                        <FormFieldError name={`voluntaryWorks.${index}.number_of_hours`} errors={context.errors} touched={context.touched} />
                                    </div>
                                    <div className="mt-2 mx-2 col-span-10 md:col-span-5">
                                        <Field
                                            id={`voluntaryWorks.${index}.position_nature_of_work`}
                                            name={`voluntaryWorks.${index}.position_nature_of_work`}
                                            placeholder="Position/Nature of Work *"
                                            className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                                            autoComplete="on"
                                        />
                                        <FormFieldError name={`voluntaryWorks.${index}.position_nature_of_work`} errors={context.errors} touched={context.touched} />
                                    </div>



                                    <div className="mt-1 col-span-10 md:col-span-1 mx-auto ">
                                        <Button className='mt-3 btn btn-sm text-white rounded-lg  bg-red-500 hover:bg-red-500 hover:scale-90 shadow-sm float-left align-middle ' onClick={() => {
                                            remove(index);
                                            let reinitialize_voluntaryWorks = [...voluntaryWorks].filter((object, filterIndedx: number) => {
                                                return index != filterIndedx;
                                            });

                                            setVoluntaryWorks(reinitialize_voluntaryWorks);
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

                                        let reinitialize_voluntaryWorks = [...voluntaryWorks].map((object: voluntaryWork, index: number) => {
                                            return object;
                                        });

                                        reinitialize_voluntaryWorks.push({
                                            organization_name: '',
                                            organization_address: '',
                                            period_from: '',
                                            period_to: '',
                                            number_of_hours: 0,
                                            position_nature_of_work: ''
                                        })

                                        push({
                                            organization_name: '',
                                            organization_address: '',
                                            period_from: '',
                                            period_to: '',
                                            number_of_hours: '',
                                            position_nature_of_work: ''
                                        });

                                        setVoluntaryWorks(reinitialize_voluntaryWorks);

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

export default VoluntaryWork