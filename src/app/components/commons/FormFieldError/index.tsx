"use client";
import { FormikErrors, FormikTouched, FormikValues } from "formik";
import React, { useState } from "react";
import { array } from "yup";

interface Props {
  name: string;
  errors: FormikErrors<FormikValues>;
  touched: FormikTouched<FormikValues>;
}



type customError = {
  name: string
}

export const FormFieldError: React.FC<Props> = ({ name, errors, touched }) => {

  const [errorDetails, setErrorDetails] = useState<customError>({
    name: ""
  });

  let namesplit = name.split('.');
  if (namesplit.length === 3 && typeof errors[namesplit[0]] != undefined && typeof errors != undefined && touched) {
    let error = errors[namesplit[0]];
    let objectIndex = parseInt(namesplit[1]);
    if (Array.isArray(error)) {
      error.forEach((object, index) => {
        if (objectIndex == index) {
          // if(object.)
          console.log(object);
        }
      });
      // console.log(error[0]);
    }


    //   if (Array.isArray(error)) {
    //     let data = error.filter((object, index: number) => {
    //       return index === objectIndex;
    //     });
    //     console.log(data[0]['name']);
    //   }
  }


  return (
    <>
      {errors[name] && touched && (
        <div className="text-red-500 text-sm">{errors[name]?.toString()}</div>
      )}
    </>
  );
};
