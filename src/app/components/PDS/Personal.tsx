"use client";
import React, { useContext, useState, useMemo, useRef, useEffect } from 'react'
import { FormElement } from '../commons/FormElement';
import { Field, useFormikContext } from 'formik';
import DatePicker from "../DatePicker";
import { usePDSContext } from "@/app/contexts/PDSContext"
import { formContextType } from '@/app/types/pds';
import { country } from '@/app/types/pds';
import countryList from 'react-select-country-list';
import { UserCircleIcon } from '@heroicons/react/24/solid';
import Address from '../Address';
import { Button } from 'flowbite-react';
import { type } from 'os';





function Personal() {
    const context = usePDSContext();
    const [country, setCountry] = useState('');
    const [dualCitizen, setDualCitizen] = useState(false);
    const [sameAddress, setSameAddress] = useState(false);
    const options = useMemo(() => countryList().getData(), []);
    const { setFieldValue } = useFormikContext();


    useEffect(() => {
        setFieldValue('isSameAddress', sameAddress);

        if (!sameAddress) {
            setFieldValue('permanent_barangay', '');
            setFieldValue('permanent_house', '');
            setFieldValue('permanent_municipality', '');
            setFieldValue('permanent_province', '');
            setFieldValue('permanent_street', '');
            setFieldValue('permanent_subdivision', '');
            setFieldValue('permanent_zipcode', '');
        }
        else {
            setFieldValue('permanent_barangay', context.formikData.current.values.residential_barangay);
            setFieldValue('permanent_house', context.formikData.current.values.residential_house);
            setFieldValue('permanent_municipality', context.formikData.current.values.residential_municipality);
            setFieldValue('permanent_province', context.formikData.current.values.residential_province);
            setFieldValue('permanent_street', context.formikData.current.values.residential_street);
            setFieldValue('permanent_subdivision', context.formikData.current.values.residential_subdivision);
            setFieldValue('permanent_zipcode', context.formikData.current.values.residential_zipcode);
        }
    }, [sameAddress]);

    return (
        <div className='grid lg:grid-cols-4 grid-col mt-4'>
            <div className='col-span-4'>
                <span className=' text-cyan-600 font-medium text-lg '>I. Personal Information</span>
                <hr className='text-cyan-600 mt-6' />
            </div>


            <FormElement
                name="first_name"
                label="First Name *"
                errors={context.errors}
                touched={context.touched}
                className='col-span-4 md:col-span-1'
            >
                <Field
                    id="first_name"
                    name="first_name"
                    placeholder="First Name"
                    className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                    autoComplete="on"
                />
            </FormElement>


            <FormElement
                name="middle_name"
                label="Middle Name"
                errors={context.errors}
                touched={context.touched}
                className='col-span-4 md:col-span-1'
            >
                <Field
                    id="middle_name"
                    name="middle_name"
                    placeholder="Middle Name"
                    className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                />
            </FormElement>

            <FormElement
                name="last_name"
                label="Last Name *"
                errors={context.errors}
                touched={context.touched}
                className='col-span-4 md:col-span-1'
            >
                <Field
                    id="last_name"
                    name="last_name"
                    placeholder="Last Name"
                    className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                />
            </FormElement>

            <FormElement
                name="suffix"
                label="Suffix"
                errors={context.errors}
                touched={context.touched}
                className='col-span-4 md:col-span-1'
            >
                <Field
                    id="suffix"
                    name="suffix"
                    placeholder="Suffix"
                    className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                />
            </FormElement>


            <FormElement
                name="birth_place"
                label="Birth Place *"
                errors={context.errors}
                touched={context.touched}
                className='col-span-4 md:col-span-2'
            >
                <Field
                    name="birth_place"
                    id="birth_place"
                    placeholder="Birth Place"
                    className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                />
            </FormElement>

            <FormElement
                name="birth_date"
                label="Birthdate *"
                errors={context.errors}
                touched={context.touched}
                className='col-span-4 md:col-span-1'
            >
                <DatePicker
                    initialValues={context.initialValues}

                    id="birth_date"
                    name="birth_date"
                    placeholderText="Enter Date"
                    className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                />
            </FormElement>

            <FormElement
                name="age"
                label="Age *"
                errors={context.errors}
                touched={context.touched}
                className='col-span-4 md:col-span-1'
            >
                <Field
                    type="number"
                    id="age"
                    name="age"
                    placeholder="Age"
                    className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                />
            </FormElement>

            <FormElement
                name="sex"
                label="Sex *"
                errors={context.errors}
                touched={context.touched}
                className='col-span-4 md:col-span-2'
            >
                <Field
                    as="select"
                    id="sex"
                    name="sex"
                    className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                >
                    <option value="">Select Type </option>
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                </Field>
            </FormElement>

            <FormElement
                name="height"
                label="Height *"
                errors={context.errors}
                touched={context.touched}
                className='col-span-4 md:col-span-1'
            >
                <Field
                    type="number"
                    id="height"
                    name="height"
                    placeholder="Height (Meters)"
                    className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                />
            </FormElement>

            <FormElement
                name="weight"
                label="Weight *"
                errors={context.errors}
                touched={context.touched}
                className='col-span-4 md:col-span-1'
            >
                <Field
                    type="number"
                    id="weight"
                    name="weight"
                    placeholder="Weight (Kilograms)"
                    className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                />
            </FormElement>

            <FormElement
                name="citizenship"
                label="Citizenship *"
                errors={context.errors}
                touched={context.touched}
                className='col-span-4 md:col-span-2'
            >
                <div className='w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500' >
                    <label className='p-1 mt-2' htmlFor='citizenship'>
                        <Field type="radio" id="citizenship" name="citizenship" value="Filipino" onClick={() => {
                            setDualCitizen(false);
                        }} />
                        <span className='ml-2'>Filipino</span>
                    </label>
                    <label className='p-1 mt-2' htmlFor='citizenship2'>
                        <Field type="radio" id="citizenship2" name="citizenship" value="Dual Citizenship" onClick={() => {
                            setDualCitizen(true);
                        }} />
                        <span className='ml-2'>Dual Citizenship</span>
                    </label>
                </div>
            </FormElement>

            <FormElement
                name="citizenship_type"
                label="Citizenship Type *"
                errors={context.errors}
                touched={context.touched}
                className={`col-span-4 md:col-span-2 ${dualCitizen ? '' : 'invisible'} `}
            >
                <div className='w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500' >
                    <label className='p-1 mt-2' htmlFor='citizenship_type'>
                        <Field type="radio" id="citizenship_type" name="citizenship_type" value="By Birth" />
                        <span className='ml-2'>By Birth</span>
                    </label>
                    <label className='p-1 mt-2' htmlFor='citizenship_type2'>
                        <Field type="radio" id="citizenship_type2" name="citizenship_type" value="By Naturalization" />
                        <span className='ml-2'>By Naturalization</span>
                    </label>
                </div>
            </FormElement>

            <FormElement
                name="country"
                label="Country *"
                errors={context.errors}
                touched={context.touched}
                className={`col-span-4 md:col-span-1 ${dualCitizen ? '' : 'hidden'} `}
            >
                <Field
                    as="select"
                    id="country"
                    name="country"
                    className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                    autoComplete="on"
                >

                    {options.map((object: country) => {
                        return <option key={object.value} value={object.label}>{object.label}</option>
                    })}

                </Field>
            </FormElement>

            <FormElement
                name="blood_type"
                label="Blood Type *"
                errors={context.errors}
                touched={context.touched}
                className='col-span-4 md:col-span-1'
            >
                <Field
                    as="select"
                    id="blood_type"
                    name="blood_type"
                    className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                >
                    <option value="">Select Type </option>
                    <option value="A+"> A+ </option>
                    <option value="A-"> A- </option>
                    <option value="B+"> B+ </option>
                    <option value="B-"> B- </option>
                    <option value="O+"> O+ </option>
                    <option value="O-"> O- </option>
                    <option value="AB+"> AB+ </option>
                    <option value="AB-"> AB- </option>
                </Field>
            </FormElement>

            <FormElement
                name="civil_status"
                label="Civil Status *"
                errors={context.errors}
                touched={context.touched}
                className='col-span-4 md:col-span-1'
            >
                <Field
                    as="select"
                    id="civil_status"
                    name="civil_status"
                    className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                >
                    <option value="">Select Type </option>
                    <option value="Single">Single</option>
                    <option value="Married">Married</option>
                    <option value="Divorced">Divorced</option>
                    <option value="Widowed">Widowed</option>
                </Field>
            </FormElement>


            <FormElement
                name="tin"
                label="Tax Identification Number *"
                errors={context.errors}
                touched={context.touched}
                className='col-span-4 md:col-span-1'
            >
                <Field
                    id="tin"
                    name="tin"
                    placeholder="Tax Identification Number"
                    className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                />
            </FormElement>

            <FormElement
                name="gsis"
                label="GSIS Number *"
                errors={context.errors}
                touched={context.touched}
                className='col-span-4 md:col-span-1'
            >
                <Field
                    id="gsis"
                    name="gsis"
                    placeholder="GSIS Number"
                    className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                />
            </FormElement>

            <FormElement
                name="pagibig"
                label="PAGIBIG Number *"
                errors={context.errors}
                touched={context.touched}
                className='col-span-4 md:col-span-1'
            >
                <Field
                    id="pagibig"
                    name="pagibig"
                    placeholder="PAGIBIG Number"
                    className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                />
            </FormElement>

            <FormElement
                name="philhealth"
                label="Philhealth Number *"
                errors={context.errors}
                touched={context.touched}
                className='col-span-4 md:col-span-1'
            >
                <Field
                    id="philhealth"
                    name="philhealth"
                    placeholder="Philhealth Number"
                    className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                />
            </FormElement>

            <FormElement
                name="sss"
                label="SSS Number"
                errors={context.errors}
                touched={context.touched}
                className='col-span-4 md:col-span-1'
            >
                <Field
                    id="sss"
                    name="sss"
                    placeholder="SSS Number"
                    className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                />
            </FormElement>
            <div className='col-span-4 mt-4'>
                <span className=' text-cyan-600 font-medium '>Residential Address</span>
                <hr className='text-cyan-600' />
            </div>

            <Address name='residential' setSameAddress={setSameAddress} />

            <div className='col-span-4 mt-4'>
                <span className=' text-cyan-600 font-medium '>Permanent Address</span>
                <hr className='text-cyan-600' />
            </div>



            <Address name='permanent' sameAddress={sameAddress} setSameAddress={setSameAddress} />

            <div className='col-span-4 mt-4'>
                <span className=' text-cyan-600 font-medium '></span>
                <hr className='text-cyan-600' />
            </div>
            <FormElement
                name="telephone"
                label="Telephone Number"
                errors={context.errors}
                touched={context.touched}
                className='col-span-4 md:col-span-1'
            >
                <Field
                    id="telephone"
                    name="telephone"
                    placeholder="Telephone Number"
                    className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                    autoComplete="on"
                />
            </FormElement>

            <FormElement
                name="mobile"
                label="Mobile Number *"
                errors={context.errors}
                touched={context.touched}
                className='col-span-4 md:col-span-1'
            >
                <Field
                    id="mobile"
                    name="mobile"
                    placeholder="09XXXXXXXXX"
                    className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                    autoComplete="on"
                />
            </FormElement>


            <FormElement
                name="email"
                label="Email Address (if any)"
                errors={context.errors}
                touched={context.touched}
                className='col-span-4 md:col-span-1'
            >
                <Field
                    id="email"
                    name="email"
                    placeholder="juan@gmail.com"
                    className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                    autoComplete="on"
                />
            </FormElement>


        </div>
    )
}

export default Personal