"use client";
import dynamic from "next/dynamic";
import { Field, Form, Formik, FormikHelpers, useFormikContext } from "formik";
import { FormElement } from "../commons/FormElement";
import { Button } from "flowbite-react";
import { useDisqualifiedContext } from "@/app/contexts/DisqualifiedContext";

// Main function
export const EmailForm = () => {

    const Editor = dynamic(() => import("../CKEditor2"), { ssr: true });
    const context = useDisqualifiedContext();
    const { setFieldValue, submitForm } = useFormikContext();

    return (
        <div className='grid lg:grid-cols-4 grid-col mt-4'>
            <FormElement
                name="recipient"
                label="Recipient"
                errors={context.errors}
                touched={context.touched}
                className='col-span-4 md:col-span-4'
                required={true}
            >
                <Field
                    id="recipient"
                    name="recipient"
                    placeholder="Recipient"
                    className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                    // readOnly={true}
                    autoComplete="on"
                />
            </FormElement>


            <FormElement
                name="subject"
                label="Subject"
                errors={context.errors}
                touched={context.touched}
                className='col-span-4 md:col-span-4'
                required={true}
            >
                <Field
                    id="subject"
                    name="subject"
                    placeholder="subject"
                    className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                    required={true}
                    autoComplete="on"
                />
            </FormElement>

            {/* <FormElement
                name="body"
                label="Email Body"
                errors={context.errors}
                touched={context.touched}
                className='col-span-4 md:col-span-4'
                required={true}
            >
                <Field
                    as="textarea"
                    id="body"
                    name="body"
                    placeholder="body"
                    className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                    required={true}
                />
            </FormElement> */}

            <Editor
                name="body" label="Email Body" className='col-span-4 md:col-span-4 mx-2 my-2'
                onChange={(v) => { }}
            />

            <div className="col-span-4 mt-5">
                <Button className={`btn btn-sm text-white rounded-lg bg-blue-500 hover:scale-90 shadow-sm text mx-auto`} onClick={() => {
                    submitForm();
                    const element = document.getElementById('drawer_title');
                    if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                    }
                }}>
                    Send Email
                </Button>
            </div>






        </div>
    );
};
