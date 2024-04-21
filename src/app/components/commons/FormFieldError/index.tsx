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



export const FormFieldError: React.FC<Props> = ({ name, errors, touched }) => {

  // console.log(touched);

  // attribute . index .data
  let index = name.split('.');
  let detail = "";
  let error_array = errors[index[0]];
  if (index.length === 3 && error_array && Array.isArray(error_array) && touched) {
    let data = error_array[parseInt(index[1])] as any;

    if (data?.[index[2]] !== undefined) {
      detail = data[index[2]].toString().replace(name, index[2].replaceAll('_',' '));
    }


  } else {
    if (errors[name] != undefined) {
      detail = errors[name]?.toString() as string;
    }
  }
  return (
    <>
      <div className="text-red-500 text-sm">{detail}</div>
    </>
  );
};
