"use client";
import React, { useContext, useState, useMemo, useRef, useEffect } from 'react'
import { FormElement } from '../commons/FormElement';
import { Field, FieldArray, useFormikContext } from 'formik';
import DatePicker from "../DatePicker";
import { usePDSContext } from "@/app/contexts/PDSContext"
import { Button, Tooltip } from 'flowbite-react';
import { HiDocumentAdd, HiDocumentRemove, HiUserAdd, HiUserRemove } from 'react-icons/hi';
import { FormFieldError } from '../commons/FormFieldError';
import { vacancy } from '@/app/types/pds';
import { initial } from 'lodash';


function Position() {
    const { setFieldValue } = useFormikContext();
    const context = usePDSContext();
    const [positions, setpositions] = useState<vacancy[]>([]);

    // useEffect(() => {
    //     setpositions([...context.initialValues.positions]);
    // }, [context.initialValues])



    return (
        <>
            <div className='cols-span-2 grid  md:grid-cols-2 grid-col content-start' >

                <div className='col-span-2 md:col-span-2'>
                    <span className=' text-cyan-600 font-medium text-lg '>Item</span>
                    {/* <hr className='text-cyan-600 mt-6' /> */}
                </div>

                {/* <div className='col-span-2 md:col-span-2'> */}
                <FieldArray name="positions">
                    {({ insert, remove, push }) => (
                        <>
                            {positions.map((object, index: number) => {
                                return <div className='col-span-2 md:col-span-2 grid md:grid-cols-3 grid-col' key={index}>

                                    <div className="mt-2 mx-2 col-span-3 md:col-span-2">
                                        <Field
                                            id={`positions.${index}.special_position`}
                                            name={`positions.${index}.special_position`}
                                            placeholder=" Position/Hobby *"
                                            className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                                            autoComplete="on"
                                        />
                                        <FormFieldError name={`positions.${index}.special_position`} errors={context.errors} touched={context.touched} />
                                    </div>



                                    <div className="mt-1 col-span-3 md:col-span-1 mx-auto ">
                                        <Button className='mt-3 btn btn-sm text-white rounded-lg  bg-red-500 hover:bg-red-500 hover:scale-90 shadow-sm float-left align-middle ' onClick={() => {
                                            remove(index);
                                            let reinitialize_positions = [...positions].filter((object, filterIndedx: number) => {
                                                return index != filterIndedx;
                                            });

                                            setpositions(reinitialize_positions);
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

                                        let reinitialize_positions = [...positions].map((object: vacancy, index: number) => {
                                            return object;
                                        });

                                        // reinitialize_positions.push({
                                        //     special_position: '',
                                        // })

                                        // push({
                                        //     special_position: '',
                                        // });

                                        // setpositions(reinitialize_positions);

                                    }}>
                                        <Tooltip content="Add Position/Hobby">
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

export default Position