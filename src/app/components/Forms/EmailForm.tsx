import { Field, Form, Formik, FormikHelpers, useFormikContext } from "formik";
import { FormElement } from "../commons/FormElement";
import { useEmailContext } from "@/app/contexts/EmailContext";
import { Button } from "flowbite-react";



// Typescript Interface
interface IValues {
    email: string;
    password: string;
}


// Main function
export const EmailForm = () => {

    const context = useEmailContext();
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
                    required={true}
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

            <FormElement
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
            </FormElement>

            <div className="col-span-4 mt-5">
                <Button className={`btn btn-sm text-white rounded-lg bg-cyan-500 hover:scale-90 shadow-sm text mx-auto`} onClick={() => {
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
