import { Field, Form, Formik, FormikHelpers } from "formik";
import React, { useEffect, useState } from "react";

import HttpService from "../../../services/http.services";
import { FormElement } from "../../commons/FormElement";
import { Heading2 } from "../../commons/Headings/Heading2";

interface Props {
  collectionId: string;
  pollFreqValues: Array<string> | null;
  collectionFreq: string;
}

interface IValues {
  url_check_frequency: string;
}

export const PollFrequencySettingForm: React.FC<Props> = ({
  collectionId,
  pollFreqValues,
  collectionFreq,
}) => {
  const initialValues: IValues = {
    url_check_frequency: "",
  };
  const [pollFreq, setPollFreq] = useState(collectionFreq);

  const onFormSubmit = async (
    values: IValues,
    { setSubmitting, resetForm, setFieldError }: FormikHelpers<IValues>
  ) => {
    await HttpService.post("collection/settings", {
      collection_id: collectionId,
      name: "url_check_frequency",
      value: pollFreq,
    });
    resetForm();
  };

  useEffect(() => {
    setPollFreq(collectionFreq);
  }, [collectionFreq]);

  return (
    <Formik initialValues={initialValues} onSubmit={onFormSubmit}>
      {({ errors, touched }) => (
        <Form>
          <Heading2 text="URL poll frequency" />
          <FormElement
            name="url_check_frequency"
            label="Select the frequency (in minutes) at which you want the URLs to be polled."
            errors={errors}
            touched={touched}
          >
            {pollFreqValues != null && (
              <Field
                as="select"
                name="url_check_frequency"
                className="w-full p-3 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
                value={pollFreq}
                onChange={(event: any) => setPollFreq(event.target.value)}
              >
                {pollFreqValues?.map((freq) => {
                  return (
                    <option value={freq} key={freq}>
                      {freq}
                    </option>
                  );
                })}
              </Field>
            )}
          </FormElement>

          <div className="mt-4">
            <button className="btn btn-primary" type="submit">
              Save
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
