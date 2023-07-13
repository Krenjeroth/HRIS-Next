"use client";
import React, { useState } from "react";
import { useField, useFormikContext } from "formik";
import DatePicker from "react-datepicker";


import "react-datepicker/dist/react-datepicker.css";

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';
type Props = {
    name: string,
    placeholder: string,
    className: string,
    initialValues: any,
    setValues: Function
}


function index(parameter: Props) {
    const { setFieldValue } = useFormikContext();
    const [field] = useField(parameter);
    return (
        <DatePicker
            {...field}
            id={parameter.name}
            name={parameter.name}
            className={parameter.className}
            selected={(field.value && new Date(field.value)) || null}
            onChange={val => {
                setFieldValue(field.name, val);
            }}
        />
    );
}

export default index