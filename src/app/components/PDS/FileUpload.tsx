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
import { child, eligibility, file } from '@/app/types/pds';
import { initial } from 'lodash';


function FileUpload() {
    const { setFieldValue } = useFormikContext();
    const context = usePDSContext();
    const [attachments, setAttachments] = useState<string[]>([]);

    useEffect(() => {

        if (context.initialValues.attachments) {
            setAttachments([...context.initialValues.attachments]);
        }
    }, [context.initialValues])

    return (
        <>


            <div
                className='col-span-4 md:col-span-4 ml-2 mt-2'
            >
                <label className='text-sm font-medium'>Attachments<span className=' text-red-600'> *</span></label>
                <FieldArray name="attachments">
                    {({ insert, remove, push }) => (
                        <>
                            {attachments.map((object, index: number) => {
                                return <div className='col-span-4 md:col-span-4 grid md:grid-cols-10 grid-col' key={index}>
                                    <div className="mt-1 mx-2 col-span-10 md:col-span-9">
                                        <Field
                                            type="file"
                                            id={`attachments.${index}`}
                                            name={`attachments.${index}`}
                                            placeholder="Attachment"
                                            className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                                            accept="application/pdf"
                                        // autoComplete="on"
                                        />
                                        <FormFieldError name={`attachments.${index}`} errors={context.errors} touched={context.touched} />
                                    </div>
                                    <div className="mt-1 col-span-10 md:col-span-1 mx-auto ">
                                        <Button className='mt-2 btn btn-sm text-white rounded-lg  bg-red-500 hover:bg-red-500 hover:scale-90 shadow-sm float-left align-middle ' onClick={() => {
                                            remove(index);
                                            let reinitialize_attachments = [...attachments].filter((object, filterIndedx: number) => {
                                                return index != filterIndedx;
                                            });

                                            setAttachments(reinitialize_attachments);
                                        }
                                        }>
                                            <Tooltip content="Remove Data">
                                                <HiDocumentRemove />
                                            </Tooltip>
                                        </Button>
                                    </div>
                                    <hr className='text-cyan-600 mt-2
                                     col-span-10' />
                                </div>
                            })}
                            <div className='col-span-4 md:col-span-4 grid md:grid-cols-10 grid-col'>
                                <div className="mt-2 mx-2 md:col-start-9 col-span-10 md:col-span-1">

                                    <Button className='btn btn-sm bg-green-400 text-white rounded-lg   hover:scale-90 shadow-sm  mx-auto' onClick={() => {

                                        let reinitialize_attachments = [...attachments].map((object: string, index: number) => {
                                            return object;
                                        });

                                        reinitialize_attachments.push('')

                                        push('');

                                        setAttachments(reinitialize_attachments);

                                    }}>
                                        <Tooltip content="Add Attachment">
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

export default FileUpload