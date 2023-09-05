"use client";
import { Tabs, ToggleSwitch } from 'flowbite-react';
import React, { useContext, useState, useMemo } from 'react'
import { FormElement } from '../commons/FormElement';
import { Field } from 'formik';
import DatePicker from "../DatePicker";
import { usePDSContext } from "@/app/contexts/PDSContext"
import { formContextType } from '@/app/types/pds';
import { country } from '@/app/types/pds';
import countryList from 'react-select-country-list';
import { UserCircleIcon } from '@heroicons/react/24/solid';
import { HiUser, HiUserGroup, HiUserCircle, HiIdentification, HiCollection, HiBookmark } from 'react-icons/hi';
import Address from '../Address';







function index() {

    const context = usePDSContext();
    const [country, setCountry] = useState('');
    const [dualCitizen, setDualCitizen] = useState(false);
    const [sameAddress, setSameAddress] = useState(false);
    const options = useMemo(() => countryList().getData(), []);
    return (
        <Tabs.Group
            aria-label="Pills"
            style="pills"
        >
            <Tabs.Item
                active
                icon={HiUser}
                title="Personal"
            >
                <div className='grid lg:grid-cols-4 grid-col'>
                    <div className='col-span-4'>
                        <span className=' text-cyan-600 font-medium '>I. Personal Information</span>
                        <hr className='text-cyan-600' />
                    </div>
                    <FormElement
                        name="employee_id"
                        label="Employee ID *"
                        errors={context.errors}
                        touched={context.touched}
                        className='col-span-4 md:col-span-2'
                    >
                        <Field
                            id="employee_id"
                            name="employee_id"
                            placeholder="Employee ID"
                            className="w-full p-4 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                        />
                    </FormElement>

                    <FormElement
                        name="employee_type"
                        label="Employee Type *"
                        className='col-span-4 md:col-span-2'
                        errors={context.errors}
                        touched={context.touched}
                    >
                        <Field as="select"
                            id="employee_type"
                            name="employee_type"
                            placeholder="Employee Type"
                            className="w-full p-4 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                        >
                            <option value="">Select Type </option>
                            <option value="Permanent">Permanent</option>
                            <option value="Casual">Casual</option>
                            <option value="Elective">Elective </option>
                            <option value="Coterminous">Coterminous</option>
                            <option value="Contractual">Contractual</option>

                        </Field>
                    </FormElement>

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
                            className="w-full p-4 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
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
                            className="w-full p-4 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
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
                            className="w-full p-4 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
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
                            className="w-full p-4 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
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
                            className="w-full p-4 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
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
                            setValues={context.setValues}
                            id="birth_date"
                            name="birth_date"
                            placeholder="Enter Date"
                            className="w-full p-4 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
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
                            className="w-full p-4 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
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
                            className="w-full p-4 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
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
                            className="w-full p-4 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
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
                            className="w-full p-4 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                        />
                    </FormElement>

                    <FormElement
                        name=""
                        label="Citizenship *"
                        errors={context.errors}
                        touched={context.touched}
                        className='col-span-4 md:col-span-2'
                    >
                        <div className='w-full p-4 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500' >
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
                        name=""
                        label="Citizenship Type *"
                        errors={context.errors}
                        touched={context.touched}
                        className={`col-span-4 md:col-span-2 ${dualCitizen ? '' : 'invisible'} `}
                    >
                        <div className='w-full p-4 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500' >
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
                        className='col-span-4 md:col-span-1'
                    >
                        <Field
                            as="select"
                            id="country"
                            name="country"
                            className="w-full p-4 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
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
                            className="w-full p-4 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
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
                            className="w-full p-4 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
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
                            className="w-full p-4 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
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
                            className="w-full p-4 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
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
                            className="w-full p-4 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
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
                            className="w-full p-4 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
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
                            className="w-full p-4 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                        />
                    </FormElement>
                    <div className='col-span-4 mt-4'>
                        <span className=' text-cyan-600 font-medium '>Residential Address</span>
                        <hr className='text-cyan-600' />
                    </div>

                    <Address name='residential' />

                    <div className='col-span-4 mt-4'>
                        <span className=' text-cyan-600 font-medium '>Permanent Address</span>
                        <hr className='text-cyan-600' />
                    </div>

                    <div
                        className='col-span-4 mt-4'
                        id="toggle"
                    >
                        <ToggleSwitch
                            checked={sameAddress}
                            label="The same as Residential Address"
                            onChange={function () {
                                setSameAddress(!sameAddress);
                                context.updateAddress();
                            }}
                        />
                    </div>

                    <Address name='permanent' />

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
                            className="w-full p-4 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
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
                            className="w-full p-4 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
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
                            className="w-full p-4 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                            autoComplete="on"
                        />
                    </FormElement>
                </div>
            </Tabs.Item>
            <Tabs.Item
                icon={HiUserGroup}
                title="Family and Education"
            >
                <p>
                    This is
                    <span className="font-medium text-gray-800 dark:text-white">
                        Dashboard tab's associated content
                    </span>
                    .
                    Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to
                    control the content visibility and styling.
                </p>
            </Tabs.Item>
            <Tabs.Item
                icon={HiIdentification}
                title="Eligibility and Experience"
            >
                <p>
                    This is
                    <span className="font-medium text-gray-800 dark:text-white">
                        Settings tab's associated content
                    </span>
                    .
                    Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to
                    control the content visibility and styling.
                </p>
            </Tabs.Item>
            <Tabs.Item
                icon={HiCollection}
                title="Voluntary Work and Experience"
            >
                <p>
                    This is
                    <span className="font-medium text-gray-800 dark:text-white">
                        Contacts tab's associated content
                    </span>
                    .
                    Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to
                    control the content visibility and styling.
                </p>
            </Tabs.Item>
            <Tabs.Item
                icon={HiBookmark}
                title="Other Information"
            >
                <p>
                    Disabled content
                </p>
            </Tabs.Item>
        </Tabs.Group>
    )
}

export default index