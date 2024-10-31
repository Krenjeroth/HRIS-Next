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
import { child, eligibility } from '@/app/types/pds';
import { initial } from 'lodash';


function AppropriateEligibility() {
    const { setFieldValue } = useFormikContext();
    const context = usePDSContext();
    const [eligibilities, setEligibilities] = useState<eligibility[]>([]);

    useEffect(() => {
        setEligibilities([...context.initialValues.eligibilities]);
    }, [context.initialValues])

    return (
        <>
            <div className='grid lg:grid-cols-4 grid-col' >

                <div className='col-span-4 md:col-span-4'>
                    <span className=' text-blue-600 font-medium text-lg '>Appropriate Civil Service Eligibility</span>
                    <hr className='text-blue-600 mt-6' />
                </div>


                <FieldArray name="eligibilities">
                    {({ insert, remove, push }) => (
                        <>
                            {eligibilities.map((object, index: number) => {
                                return <div className='col-span-4 md:col-span-4 grid md:grid-cols-10 grid-col' key={index}>


                                    <div className="mt-2 mx-2 col-span-10 md:col-span-9 ">
                                        <Field
                                            id={`eligibilities.${index}.eligibility_title`}
                                            name={`eligibilities.${index}.eligibility_title`}
                                            placeholder="Eligibility Title *"
                                            className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                                            autoComplete="on"
                                        />
                                        <FormFieldError name={`eligibilities.${index}.eligibility_title`} errors={context.errors} touched={context.touched} />
                                    </div>
                                    <div className="mt-1 col-span-10 md:col-span-1 mx-auto ">
                                        <Button className='mt-3 btn btn-sm text-white rounded-lg  bg-red-500 hover:bg-red-500 hover:scale-90 shadow-sm float-left align-middle ' onClick={() => {
                                            remove(index);
                                            let reinitialize_eligibilities = [...eligibilities].filter((object, filterIndedx: number) => {
                                                return index != filterIndedx;
                                            });

                                            setEligibilities(reinitialize_eligibilities);
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
                                <div className="mt-2 mx-2 md:col-start-10 col-span-10 md:col-span-1">

                                    <Button className='btn btn-sm bg-green-400 text-white rounded-lg   hover:scale-90 shadow-sm  mx-auto' onClick={() => {

                                        let reinitialize_eligibilities = [...eligibilities].map((object: eligibility, index: number) => {
                                            return object;
                                        });

                                        reinitialize_eligibilities.push({
                                            eligibility_title: '',
                                            rating: 0,
                                            date_of_examination_conferment: '',
                                            place_of_examination_conferment: '',
                                            license_number: '',
                                            license_date_validity: ''
                                        })

                                        push({
                                            eligibility_title: '',
                                            rating: '',
                                            date_of_examination_conferment: '',
                                            place_of_examination_conferment: '',
                                            license_number: '',
                                            license_date_validity: ''
                                        });

                                        setEligibilities(reinitialize_eligibilities);

                                    }}>
                                        <Tooltip content="Add Eligibility">
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

export default AppropriateEligibility