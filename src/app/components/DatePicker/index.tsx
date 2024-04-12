"use client";
import React, { useEffect, useState } from "react";
import { Field, useField, useFormikContext } from "formik";
import { FormElement } from "../commons/FormElement";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

type Props = {
    id: string,
    name: string,
    placeholderText: string,
    className: string,
    initialValues: any,
    readOnly?: boolean,
}


function index(parameter: Props) {
    const { setFieldValue } = useFormikContext();
    const [field] = useField(parameter);
    const [startDate, setStartDate] = useState(new Date());



    return (



        <DatePicker
            {...field}
            {...parameter}
            // id={parameter.id}
            // name={parameter.name}
            // className={parameter.className}
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