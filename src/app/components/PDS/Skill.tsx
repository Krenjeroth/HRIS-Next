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
import { child, skill } from '@/app/types/pds';
import { initial } from 'lodash';


function Skill() {
    const { setFieldValue } = useFormikContext();
    const context = usePDSContext();
    const [skills, setskills] = useState<skill[]>([...context.initialValues.skills]);

    useEffect(() => {
        let reinitializeValues = context.initialValues;
        reinitializeValues.skills = skills;
    }, [skills])



    return (
        <>
            <div className='cols-span-2 grid  md:grid-cols-2 grid-col content-start' >

                <div className='col-span-2 md:col-span-2'>
                    <span className=' text-cyan-600 font-medium text-lg '>Skills/Hobbies</span>
                    {/* <hr className='text-cyan-600 mt-6' /> */}
                </div>

                {/* <div className='col-span-2 md:col-span-2'> */}
                <FieldArray name="skills">
                    {({ insert, remove, push }) => (
                        <>
                            {skills.map((object, index: number) => {
                                return <div className='col-span-2 md:col-span-2 grid md:grid-cols-3 grid-col' key={index}>

                                    <div className="mt-2 mx-2 col-span-3 md:col-span-2">
                                        <Field
                                            id={`skills.${index}.name`}
                                            name={`skills.${index}.name`}
                                            placeholder=" Skill/Hobby *"
                                            className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                                            autoComplete="on"
                                        />
                                        <FormFieldError name={`skills.${index}.name`} errors={context.errors} touched={context.touched} />
                                    </div>



                                    <div className="mt-1 col-span-3 md:col-span-1 mx-auto ">
                                        <Button className='mt-3 btn btn-sm text-white rounded-lg  bg-red-500 hover:bg-red-500 hover:scale-90 shadow-sm float-left align-middle ' onClick={() => {
                                            remove(index);
                                            let reinitialize_skills = [...skills].filter((object, filterIndedx: number) => {
                                                return index != filterIndedx;
                                            });

                                            setskills(reinitialize_skills);
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

                                        let reinitialize_skills = [...skills].map((object: skill, index: number) => {
                                            return object;
                                        });

                                        reinitialize_skills.push({
                                            name: '',
                                        })

                                        push({
                                            name: '',
                                        });

                                        setskills(reinitialize_skills);

                                    }}>
                                        <Tooltip content="Add Skill/Hobby">
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

export default Skill