"use client";
import React, { useEffect, useState } from "react";
import { Field, useField, useFormikContext } from "formik";
import { FormElement } from "../commons/FormElement";
import DatePicker from "react-datepicker";
import dayjs from "dayjs";
import moment from "moment";

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

type Props = {
    id: string,
    name: string,
    placeholderText: string,
    className: string,
    initialValues: any,
    setLocalValue?: any,
    readOnly?: boolean,
}


function index(parameter: Props) {
    const dateFormat = 'yyyy-MM-dd';
    const { setFieldValue } = useFormikContext();
    const [field] = useField(parameter);
    const [startDate, setStartDate] = useState(new Date());



    return (


        <DatePicker
            {...field}
            {...parameter}
            selected={(field.value && new Date(field.value)) || null}
            showMonthDropdown
            showYearDropdown
            dateFormat={dateFormat}
            yearDropdownItemNumber={50}
            scrollableYearDropdown
            onChange={val => {
                if (val === null) {
                    setFieldValue(field.name, "");
                    if (parameter.setLocalValue) {
                        parameter.setLocalValue("");
                    }
                }
                else {
                    setFieldValue(field.name, moment(val).format("MM/DD/YYYY"));
                    if (parameter.setLocalValue) {
                        parameter.setLocalValue(moment(val).format("MM/DD/YYYY"));
                    }
                }
            }}
        />

    );
}

export default index