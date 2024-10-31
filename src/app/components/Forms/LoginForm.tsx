"use client";
import { Field, Form, Formik, FormikHelpers } from "formik";
import AuthService from "../../../../lib/auth.service";
import HttpService from "../../../../lib/http.services";
import { setFormikErrors } from "../../../../lib/utils.service";
import { FormElement } from "../commons/FormElement";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setToken, setName, setEmail } from "@/app/redux/reducers/userReducer";



// Typescript Interface
interface IValues {
  email: string;
  password: string;
}

// Main function
export const LoginForm = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const initialValues: IValues = {
    email: "",
    password: "",
  };

  // Submit
  const onFormSubmit = async (
    values: IValues,
    { setSubmitting, resetForm, setFieldError }: FormikHelpers<IValues>
  ) => {
    const postData = {
      email: values.email,
      password: values.password,
      device_name: "web",
    };

    try {
      const resp = await HttpService.post("login", postData);
      if (resp.status === 200) {
        let data = resp.data.data;
        if (typeof data.token != 'undefined') {
          router.push("/");
          AuthService.saveAuthToken(data.token, data.user.name, data.user.email);
          dispatch(setName(data.user.name));
          dispatch(setToken(data.token));
          dispatch(setEmail(data.user.email));
        }
        else {
          let error = { email: ["Username and Password do not match"] };
          setFormikErrors(error, setFieldError);
        }
      }
    }
    catch (error: any) {
      if (error.response.status === 422) {
        setFormikErrors(error.response.data.errors, setFieldError);
      }
    }
  };

  return (
    <>
      <Formik initialValues={initialValues} onSubmit={onFormSubmit}>
        {({ errors, touched }) => (
          <Form>
            <div className="grid grid-flow-row auto-rows-max -mt-3">
              <h2 className="mx-auto text-3xl mb-2"> Log in</h2>
            </div>
            <FormElement
              name="email"
              label="Email Address"
              errors={errors}
              touched={touched}
            >
              <Field
                id="email"
                name="email"
                placeholder="Enter the email"
                className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
              />
            </FormElement>

            <FormElement 
              name="password"
              label="Password"
              errors={errors}
              touched={touched}
            >
              <Field
                id="password"
                name="password"
                placeholder="Enter the password"
                className="w-full p-3 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
                type="password"
              />
            </FormElement>
            <div className="grid grid-flow-row auto-rows-max mt-5">
              <button type="submit" className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg focus:scale-90 shadow-sm mx-auto" >
                Log in
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};
