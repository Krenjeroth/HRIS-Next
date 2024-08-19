"use client";

import { Field, Form, Formik, FormikHelpers, useFormikContext } from "formik";
import { FormElement } from "../commons/FormElement";
import { usePDSContext } from "@/app/contexts/PDSContext";
import { Button } from "flowbite-react";
import AppropriateEligibility from "../PDS/AppropriateEligibility";
import Trainings from "../PDS/Trainings";
import { useEffect, useState } from "react";
import { Code } from "ckeditor5";
interface parameters {
    code: string
}


// Main function
export const ShortListForm = (param: parameters) => {

    const context = usePDSContext();
    const { setFieldValue, submitForm } = useFormikContext();
    const [performanceLabel, setPerformanceLabel] = useState<string>("");
    const [experienceLabel, setExperienceLabel] = useState<string>("");

    useEffect(() => {
        console.log(param.code == "head");
        if (param.code == "head") {
            console.log("here");
            setPerformanceLabel("Performace (20)");
            setExperienceLabel("Experience (25)");
        }
        else {
            console.log("here2");
            setPerformanceLabel("Performace (25)");
            setExperienceLabel("Experience (20)");
        }

    }, [param.code]);

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

            <FormElement
                name="appropriate_eligibility"
                label="Appropriate Civil Service Eligibility"
                errors={context.errors}
                touched={context.touched}
                className='col-span-4 md:col-span-4'
                required={true}
            >
                <Field
                    as="select"
                    id="appropriate_eligibility"
                    name="appropriate_eligibility"
                    className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                >
                    <option value="">Select Eligibility </option>

                    {context.initialValues.eligibilities.map((object, index: number) => {
                        return <option value={`${object.eligibility_title}`}>{object.eligibility_title}</option>
                    })};
                </Field>
            </FormElement>


            <div className="col-span-4 mt-5">
                <div className='grid lg:grid-cols-4 grid-col' >

                    {/* <div className='col-span-4 md:col-span-4'>
                        <span className=' text-blue-600 font-medium text-lg '>Appropriate Civil Service Eligibility</span>
                        <hr className='text-blue-600 mt-6' />
                    </div> */}



                    {/* 
                <FieldArray name="eligibilities">
                    {({ insert, remove, push }) => (
                        <>
                            {eligibilities.map((object, index: number) => {
                                return <div className='col-span-4 md:col-span-4 grid md:grid-cols-10 grid-col' key={index}>


                                    <div className="mt-2 mx-2 col-span-10 md:col-span-9 ">
                                        <Field
                                            id={`eligibilities.${index}.eligibility_title`}
                                            name={`eligibilities.${index}.eligibility_title`}
                                            placeholder="Eligibility Title *"
                                            className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                                            autoComplete="on"
                                        />
                                        <FormFieldError name={`eligibilities.${index}.eligibility_title`} errors={context.errors} touched={context.touched} />
                                    </div>
                                    <div className="mt-1 col-span-10 md:col-span-1 mx-auto ">
                                        <Button className='mt-3 btn btn-sm text-white rounded-lg  bg-red-500 hover:bg-red-500 hover:scale-90 shadow-sm float-left align-middle ' onClick={() => {
                                            remove(index);
                                            let reinitialize_eligibilities = [...eligibilities].filter((object, filterIndedx: number) => {
                                                return index != filterIndedx;
                                            });

                                            setEligibilities(reinitialize_eligibilities);
                                        }
                                        }>
                                            <Tooltip content="Remove Data">
                                                <HiDocumentRemove />
                                            </Tooltip>
                                        </Button>
                                    </div>
                                    <hr className='text-blue-600 mt-6 col-span-10' />
                                </div>
                            })}
                            <div className='col-span-4 md:col-span-4 grid md:grid-cols-10 grid-col'>
                                <div className="mt-2 mx-2 md:col-start-10 col-span-10 md:col-span-1">

                                    <Button className='btn btn-sm bg-green-400 text-white rounded-lg   hover:scale-90 shadow-sm  mx-auto' onClick={() => {

                                        let reinitialize_eligibilities = [...eligibilities].map((object: eligibility, index: number) => {
                                            return object;
                                        });

                                        reinitialize_eligibilities.push({
                                            eligibility_title: '',
                                            rating: 0,
                                            date_of_examination_conferment: '',
                                            place_of_examination_conferment: '',
                                            license_number: '',
                                            license_date_validity: ''
                                        })

                                        push({
                                            eligibility_title: '',
                                            rating: '',
                                            date_of_examination_conferment: '',
                                            place_of_examination_conferment: '',
                                            license_number: '',
                                            license_date_validity: ''
                                        });

                                        setEligibilities(reinitialize_eligibilities);

                                    }}>
                                        <Tooltip content="Add Eligibility">
                                            <HiDocumentAdd className='' />
                                        </Tooltip>
                                    </Button>
                                </div>
                            </div>
                        </>
                    )}
                </FieldArray> */}


                </div>
            </div>

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
                label={performanceLabel}
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
                label={experienceLabel}
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
