import { Field, Form, Formik, FormikHelpers } from "formik";
import AuthService from "../../../../lib/auth.service";
import HttpService from "../../../../lib/http.services";
import { setFormikErrors } from "../../../../lib/utils.service";
import { FormElement } from "../commons/FormElement";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setToken, setName, setEmail } from "@/app/redux/reducers/userReducer";
import { usePDSContext } from "@/app/contexts/PDSContext";



// Typescript Interface
interface IValues {
    email: string;
    password: string;
}


// Main function
export const DisqualifyForm = () => {

    const context = usePDSContext();

    return (
        <div className='grid lg:grid-cols-4 grid-col mt-4'>
            <div className='col-span-4'>
                <span className=' text-cyan-600 font-medium text-lg '>Personal Details</span>
                <hr className='text-cyan-600 mt-6' />
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
                <span className=' text-cyan-600 font-medium text-lg '>Application Details</span>
                <hr className='text-cyan-600 mt-6' />
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
                name="reason"
                label="Reason/Remarks"
                errors={context.errors}
                touched={context.touched}
                className='col-span-4 md:col-span-4'
                required={true}
            >
                <Field
                    as="textarea"
                    id="reason"
                    name="reason"
                    placeholder="Reason/Remarks"
                    className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                    autoComplete="on"
                />
            </FormElement>




        </div>
    );
};
