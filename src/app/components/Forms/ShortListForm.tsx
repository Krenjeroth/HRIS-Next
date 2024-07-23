"use client";

import { Field, Form, Formik, FormikHelpers, useFormikContext } from "formik";
import { FormElement } from "../commons/FormElement";
import { usePDSContext } from "@/app/contexts/PDSContext";
import { Button } from "flowbite-react";
import AppropriateEligibility from "../PDS/AppropriateEligibility";
import Trainings from "../PDS/Trainings";


// Main function
export const ShortListForm = () => {

    const context = usePDSContext();
    const { setFieldValue, submitForm } = useFormikContext();

    return (
        <div className='grid lg:grid-cols-4 grid-col mt-4'>
            <div className='col-span-4'>
                <span className=' text-blue-600 font-medium text-lg '>Personal Details</span>
                <hr className='text-blue-600 mt-6' />
            </div>
            <FormElement
                name="first_name"
                label="First Name"
                errors={context.errors}
                touched={context.touched}
                className='col-span-4 md:col-span-1'
                required={true}
            >
                <Field
                    id="first_name"
                    name="first_name"
                    placeholder="First Name"
                    className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                    readOnly={true}
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
                    readOnly={true}
                />
            </FormElement>

            <FormElement
                name="last_name"
                label="Last Name"
                errors={context.errors}
                touched={context.touched}
                className='col-span-4 md:col-span-1'
                required={true}
            >
                <Field
                    id="last_name"
                    name="last_name"
                    placeholder="Last Name"
                    className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                    readOnly={true}
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
                    readOnly={true}
                />
            </FormElement>

            <div className='col-span-4 mt-3'>
                <span className=' text-blue-600 font-medium text-lg '>Application Details</span>
                <hr className='text-blue-600 mt-6' />
            </div>

            <FormElement
                name="date_submitted"
                label="Date Submitted"
                errors={context.errors}
                touched={context.touched}
                className='col-span-4 md:col-span-1'
            >
                <Field
                    id="date_submitted"
                    name="date_submitted"
                    placeholder="date_submitted"
                    className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                    readOnly={true}
                />
            </FormElement>


            <FormElement
                name="vacancy"
                label="Position Applied"
                errors={context.errors}
                touched={context.touched}
                className='col-span-4 md:col-span-3'
            >
                <Field
                    id="vacancy"
                    name="vacancy"
                    placeholder="vacancy"
                    className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                    readOnly={true}
                />
            </FormElement>


            <div className="col-span-4 mt-5"><AppropriateEligibility /></div>

            <FormElement
                name="shortlist_trainings"
                label="Trainings"
                errors={context.errors}
                touched={context.touched}
                className='col-span-1 md:col-span-1'
                required={true}
            >
                <Field
                    id="shortlist_trainings"
                    name="shortlist_trainings"
                    placeholder="Details"
                    className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                    autoComplete="on"
                />
            </FormElement>

            <FormElement
                name="performance"
                label="Performance(20)"
                errors={context.errors}
                touched={context.touched}
                className='col-span-1 md:col-span-1'
                required={true}
            >
                <Field
                    id="performance"
                    name="performance"
                    placeholder="Up to 20 points"
                    className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                    autoComplete="on"
                    type="number"
                />
            </FormElement>

            <FormElement
                name="education"
                label="Education(20)"
                errors={context.errors}
                touched={context.touched}
                className='col-span-1 md:col-span-1'
                required={true}
            >
                <Field
                    id="education"
                    name="education"
                    placeholder="Up to 20 points"
                    className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                    autoComplete="on"
                    type="number"
                />
            </FormElement>
            <FormElement
                name="experience"
                label="Experience(25)"
                errors={context.errors}
                touched={context.touched}
                className='col-span-1 md:col-span-1'
                required={true}
            >
                <Field
                    id="experience"
                    name="experience"
                    placeholder="Up to 25 points"
                    className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                    autoComplete="on"
                    type="number"
                />
            </FormElement>


            <div className="col-span-4 mt-5">
                <Button className={`btn btn-sm text-white rounded-lg bg-blue-500 hover:scale-90 shadow-sm text mx-auto`} onClick={() => {
                    submitForm();
                    const element = document.getElementById('drawer_title');
                    if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                    }
                }}>
                    Submit
                </Button>
            </div>




        </div>
    );
};
