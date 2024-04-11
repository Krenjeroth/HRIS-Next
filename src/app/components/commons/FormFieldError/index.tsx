"use client";
import { FormikErrors, FormikTouched, FormikValues } from "formik";
import { Underdog } from "next/font/google";
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

  const [errorDetails, setErrorDetails] = useState<String>("");
  let namesplit = name.split('.');
  let error;
  // if (namesplit.length === 3 && typeof errors[namesplit[0]] != undefined && typeof errors != undefined && touched) {
  //   let error_name = errors[namesplit[0]];
  //   let objectIndex = parseInt(namesplit[1]);
  //   if (Array.isArray(error_name) && objectIndex < error_name.length) {
  //      error = error_name[objectIndex] as customError;
  //     // setErrorDetails(error.name);
  //   }
  // }
  // // else {
  // //   if (typeof errors != undefined && touched && errors[name] != undefined) {
  // //     if (errors[name] != undefined) {
  // //       setErrorDetails("");
  // //     }
  // //   }
  // // }
  return (
    <>
      {namesplit.length === 3 && errors[namesplit[0]] as customError && touched && (
        <div className="text-red-500 text-sm">{errors[namesplit[0]]?.toString()}</div>
      )}

      {errors[name] && touched && (
        <div className="text-red-500 text-sm">{errors[name]?.toString()}</div>
      )}
    </>
  );
};
