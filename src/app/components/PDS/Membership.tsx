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
import { child, membership } from '@/app/types/pds';
import { initial } from 'lodash';


function Membership() {
    const { setFieldValue } = useFormikContext();
    const context = usePDSContext();
    const [memberships, setmemberships] = useState<membership[]>([]);

    useEffect(() => {
        setmemberships([...context.initialValues.memberships]);
    }, [context.initialValues]);


    return (
        <>
            <div className='cols-span-2 grid  md:grid-cols-2 grid-col content-start' >

                <div className='col-span-2 md:col-span-2'>
                    <span className=' text-cyan-600 font-medium text-lg '>Membership in Association / Organization</span>
                    {/* <hr className='text-cyan-600 mt-6' /> */}
                </div>

                {/* <div className='col-span-2 md:col-span-2'> */}
                <FieldArray name="memberships">
                    {({ insert, remove, push }) => (
                        <>
                            {memberships.map((object, index: number) => {
                                return <div className='col-span-2 md:col-span-2 grid md:grid-cols-3 grid-col' key={index}>

                                    <div className="mt-2 mx-2 col-span-3 md:col-span-2">
                                        <Field
                                            id={`memberships.${index}.organization`}
                                            name={`memberships.${index}.organization`}
                                            placeholder=" Membership *"
                                            className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                                            autoComplete="on"
                                        />
                                        <FormFieldError name={`memberships.${index}.organization`} errors={context.errors} touched={context.touched} />
                                    </div>



                                    <div className="mt-1 col-span-3 md:col-span-1 mx-auto ">
                                        <Button className='mt-3 btn btn-sm text-white rounded-lg  bg-red-500 hover:bg-red-500 hover:scale-90 shadow-sm float-left align-middle ' onClick={() => {
                                            remove(index);
                                            let reinitialize_memberships = [...memberships].filter((object, filterIndedx: number) => {
                                                return index != filterIndedx;
                                            });

                                            setmemberships(reinitialize_memberships);
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

                                        let reinitialize_memberships = [...memberships].map((object: membership, index: number) => {
                                            return object;
                                        });

                                        reinitialize_memberships.push({
                                            organization: '',
                                        })

                                        push({
                                            organization: '',
                                        });

                                        setmemberships(reinitialize_memberships);

                                    }}>
                                        <Tooltip content="Add Membership">
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

export default Membership