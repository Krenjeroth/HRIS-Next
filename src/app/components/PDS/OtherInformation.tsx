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
import { child, question, voluntaryWork } from '@/app/types/pds';
import { initial } from 'lodash';
import Skill from './Skill';
import Recognition from './Recognition';
import Membership from './Membership';
import Question from './Question';



function OtherInformation() {
    const { setFieldValue } = useFormikContext();
    const context = usePDSContext();







    return (
        <>
            <div className='grid md:grid-cols-2 grid-col content-start' >

                <div className='col-span-2 md:col-span-2'>
                    <span className=' text-blue-600 font-medium text-lg '>VI. Other Information</span>
                    <hr className='text-blue-600 mt-6' />
                </div>

                <Skill />
                <Recognition />
                <hr className='text-blue-600 mt-6 col-span-2 md:col-span-2' />
                <Membership />
                <hr className='text-blue-600 mt-6 col-span-2 md:col-span-2' />
                <Question />
            </div>


        </>
    )
}

export default OtherInformation