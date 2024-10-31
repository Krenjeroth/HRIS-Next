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
import { child, recognition } from '@/app/types/pds';
import { initial } from 'lodash';


function Recognition() {
    const { setFieldValue } = useFormikContext();
    const context = usePDSContext();
    const [recognitions, setrecognitions] = useState<recognition[]>([]);

    useEffect(() => {
        setrecognitions([...context.initialValues.recognitions]);
    }, [context.initialValues])


    return (
        <>
            <div className='cols-span-2 grid  md:grid-cols-2 grid-col content-start' >

                <div className='col-span-2 md:col-span-2'>
                    <span className=' text-blue-600 font-medium text-lg '>Non-academic Distinctions / Recognitions </span>
                    {/* <hr className='text-blue-600 mt-6' /> */}
                </div>

                {/* <div className='col-span-2 md:col-span-2'> */}
                <FieldArray name="recognitions">
                    {({ insert, remove, push }) => (
                        <>
                            {recognitions.map((object, index: number) => {
                                return <div className='col-span-2 md:col-span-2 grid md:grid-cols-3 grid-col' key={index}>

                                    <div className="mt-2 mx-2 col-span-3 md:col-span-2">
                                        <Field
                                            id={`recognitions.${index}.recognition_title`}
                                            name={`recognitions.${index}.recognition_title`}
                                            placeholder=" Recognition *"
                                            className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                                            autoComplete="on"
                                        />
                                        <FormFieldError name={`recognitions.${index}.recognition_title`} errors={context.errors} touched={context.touched} />
                                    </div>

                                    <div className="mt-1 col-span-3 md:col-span-1 mx-auto ">
                                        <Button className='mt-3 btn btn-sm text-white rounded-lg  bg-red-500 hover:bg-red-500 hover:scale-90 shadow-sm float-left align-middle ' onClick={() => {
                                            remove(index);
                                            let reinitialize_recognitions = [...recognitions].filter((object, filterIndedx: number) => {
                                                return index != filterIndedx;
                                            });

                                            setrecognitions(reinitialize_recognitions);
                                        }
                                        }>
                                            <Tooltip content="Remove Data">
                                                <HiDocumentRemove />
                                            </Tooltip>
                                        </Button>
                                    </div>
                                </div>
                            })}
                            <div className='col-span-2 md:col-span-2 grid md:grid-cols-3 grid-col'>
                                <div className="mt-2 mx-2 md:col-start-3 col-span-1 md:col-span-1">

                                    <Button className='btn btn-sm bg-green-400 text-white rounded-lg   hover:scale-90 shadow-sm  mx-auto' onClick={() => {

                                        let reinitialize_recognitions = [...recognitions].map((object: recognition, index: number) => {
                                            return object;
                                        });

                                        reinitialize_recognitions.push({
                                            recognition_title: '',
                                        })

                                        push({
                                            recognition_title: '',
                                        });

                                        setrecognitions(reinitialize_recognitions);

                                    }}>
                                        <Tooltip content="Add Recognition">
                                            <HiDocumentAdd className='' />
                                        </Tooltip>
                                    </Button>
                                </div>
                            </div>
                        </>
                    )}
                </FieldArray>
                {/* </div> */}
            </div>
        </>
    )
}

export default Recognition