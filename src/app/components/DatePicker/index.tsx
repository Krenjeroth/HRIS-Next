"use client";
import React, { useEffect, useState } from "react";
import { useField, useFormikContext } from "formik";
import { FormElement } from "../commons/FormElement";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';
type Props = {
    id: string,
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
    const [startDate, setStartDate] = useState(new Date());

    useEffect(() => {
        setFieldValue(field.name, parameter.initialValues[parameter.name]);
    }, [parameter.initialValues]);
    return (

        <DatePicker
            {...field}
            {...parameter}
            selected={(field.value && new Date(field.value)) || null}
            showMonthDropdown
            showYearDropdown
            yearDropdownItemNumber={15}
            scrollableYearDropdown
            onChange={val => {
                setFieldValue(field.name, val);
            }}
        />

    );
}

export default index