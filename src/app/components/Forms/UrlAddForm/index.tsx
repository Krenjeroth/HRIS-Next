import * as Yup from "yup";
import { Field, Form, Formik, FormikHelpers } from "formik";
import React from "react";
import { FormElement } from "../../commons/FormElement";
import HttpService from "../../../services/http.services";

interface IValues {
  url: string;
}

interface Props {
  onSuccess: () => void;
  collectionId: string;
}

export const UrlAddForm: React.FC<Props> = ({ onSuccess, collectionId }) => {
  const initialValues: IValues = {
    url: "",
  };
  const onFormSubmit = async (
    values: IValues,
    { setSubmitting, resetForm }: FormikHelpers<IValues>
  ) => {
    const resp = await HttpService.post("url", {
      url: values.url,
      collection_id: collectionId,
    });
    resp.status === 201 && resetForm();
    onSuccess();
  };
  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={onFormSubmit}
        validationSchema={UrlFormValidation}
      >
        {({ errors, touched }) => (
          <Form>
            <FormElement
              name="url"
              label="Enter the URL"
              errors={errors}
              touched={touched}
            >
              <Field
                id="url"
                name="url"
                placeholder="Enter the URL to add"
                className="w-full p-3 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
              />
            </FormElement>
            <div className="mt-4">
              <button className="btn btn-primary" type="submit">
                Save
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

// Code snippet: https://stackoverflow.com/a/68002755
const re =
  /^((http|https):\/\/)?(www.)?(?!.*(http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm;

export const UrlFormValidation = Yup.object().shape({
  url: Yup.string().matches(re, "It needs to be a valid URL"),
});
