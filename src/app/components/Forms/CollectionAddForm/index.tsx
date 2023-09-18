import { Field, Form, Formik, FormikHelpers } from "formik";
import React from "react";
import HttpService from "../../../services/http.services";
import { FormElement } from "../../commons/FormElement";
import { CollectionAddSchema } from "./collection-add.schema";

interface Props {
  onSuccess: () => void;
}

interface IValues {
  name: string;
}

export const CollectionAddForm: React.FC<Props> = ({ onSuccess }) => {
  const initialValues: IValues = {
    name: "",
  };
  const onFormSubmit = async (
    values: IValues,
    { setSubmitting, resetForm }: FormikHelpers<IValues>
  ) => {
    const resp = await HttpService.post("collection", {
      name: values.name,
    });
    resp.status === 201 && resetForm();
    onSuccess();
  };
  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={onFormSubmit}
        validationSchema={CollectionAddSchema}
      >
        {({ errors, touched }) => (
          <Form>
            <FormElement
              name="name"
              label="Enter the collection name"
              errors={errors}
              touched={touched}
            >
              <Field
                id="name"
                name="name"
                placeholder="Enter the collection name"
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
