"use client";
import React, { useEffect, useState } from "react";
import { useField, useFormikContext } from "formik";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';
type Props = {
    name: string,
    placeholder: string,
    className: string,
    initialValues: any,
    readOnly?: boolean,
    setValues: Function
}


function index(parameter: Props) {
    const { setFieldValue } = useFormikContext();
    const [field] = useField(parameter);

    useEffect(() => {
        setFieldValue(field.name,parameter.initialValues[parameter.name]);
    }, [parameter.initialValues]);
    return (
        <DatePicker
            {...field}
            id={parameter.name}
            name={parameter.name}
            className={parameter.className}
            selected={(field.value && new Date(field.value)) || null}
            onChange={val => {
                if (parameter.readOnly === true) {
                }
                else {
                    setFieldValue(field.name, dayjs(val).format('MM/DD/YYYY'));
                }
            }}
        />
    );
}

export default index