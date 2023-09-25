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
import { characterReference, child } from '@/app/types/pds';
import { initial } from 'lodash';


function CharacterReference() {
    const { setFieldValue } = useFormikContext();
    const context = usePDSContext();
    const [characterReferences, setCharacterReferences] = useState<characterReference[]>([...context.initialValues.characterReferences]);

    useEffect(() => {
        let reinitializeValues = context.initialValues;
        reinitializeValues.characterReferences = characterReferences;
    }, [characterReferences])



    return (
        <>
            <div className='grid lg:grid-cols-4 grid-col mt-4' >

                <div className='col-span-4 md:col-span-4'>
                    <span className=' text-cyan-600 font-medium text-lg '>Character References</span>
                    <hr className='text-cyan-600 mt-6' />
                </div>


                <FieldArray name="characterReferences">
                    {({ insert, remove, push }) => (
                        <>
                            {characterReferences.map((object, index: number) => {
                                return <div className='col-span-4 md:col-span-4 grid md:grid-cols-10 grid-col' key={index}>


                                    <div className="mt-2 mx-2 col-span-10 md:col-span-4">
                                        <Field
                                            id={`characterReferences.${index}.name`}
                                            name={`characterReferences.${index}.name`}
                                            placeholder="Name*"
                                            className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                                            autoComplete="on"
                                        />
                                        <FormFieldError name={`characterReferences.${index}.name`} errors={context.errors} touched={context.touched} />
                                    </div>

                                    <div className="mt-2 mx-2 col-span-10 md:col-span-3">
                                        <Field
                                            id={`characterReferences.${index}.address`}
                                            name={`characterReferences.${index}.address`}
                                            placeholder="Address *"
                                            className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                                            autoComplete="on"
                                        />
                                        <FormFieldError name={`characterReferences.${index}.address`} errors={context.errors} touched={context.touched} />
                                    </div>

                                    <div className="mt-2 mx-2 col-span-10 md:col-span-3">
                                        <Field
                                            id={`characterReferences.${index}.number`}
                                            name={`characterReferences.${index}.number`}
                                            placeholder="Telephone Number / Mobile Number *"
                                            className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                                            autoComplete="on"
                                        />
                                        <FormFieldError name={`characterReferences.${index}.number`} errors={context.errors} touched={context.touched} />
                                    </div>

                                </div>
                            })}
                        </>
                    )}
                </FieldArray>


            </div>
        </>
    )
}

export default CharacterReference