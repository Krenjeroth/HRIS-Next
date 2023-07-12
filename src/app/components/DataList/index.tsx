"use client";

import { Button, Label, Tabs } from 'flowbite-react';
import React, { useEffect } from 'react';
import { useState } from 'react';
import Table from "@/app/components/Table";
import HttpService from '../../../../lib/http.services';
import Drawer from '@/app/components/Drawer';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import { FormElement } from '@/app/components/commons/FormElement';
import { setFormikErrors } from '../../../../lib/utils.service';
import { Alert } from 'flowbite-react';
import { redirect } from 'next/navigation'
import dayjs from 'dayjs';
import DatePicker from '@/app/components/DatePicker'
import { object, string } from 'yup';
import Autosuggest from 'react-autosuggest';
import useTimer from '../Timer/timer';
type datalist = {
    id: string,
    label: string
}

interface IValues {
    date_submitted: string;
    lgu_position_id: number;
    lgu_position: string;
}


interface update {
    attribute: string,
    value: any
}

type Props = {
    errors: any,
    touched: any,
    setKeyword: Function,
    title: string,
    data: datalist[],
    name: string,
    initialValues: any,
    setValues: Function,
    id: string
}


function debounce(fn: Function, delay: number) {
    let timer;
    return (() => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(), delay);
    })();
};




function index(parameter: Props) {
    const time = new Date();
    time.setSeconds(time.getSeconds() + 600);
    const [value, setValue] = useState<string>("");
    const [id, setID] = useState<string>("");
    const { count, startTimer, endTimer } = useTimer();

    useEffect(() => {
        if (parameter.data.length === 0) {
            setValue("");
            setID("");
        }
    }, [parameter.data]);


    useEffect(() => {
        console.log(count);
        // if (count === 2) {
        //     parameter.setKeyword(value);
        //     endTimer();
        // }
    }, [count]);

    return (
        <>

            <FormElement
                name={parameter.id}
                label={`${parameter.title} ID`}
                errors={parameter.errors}
                touched={parameter.touched}
            >

                <Field
                    value={id}
                    id={parameter.id}
                    name={parameter.id}
                    placeholder={`${parameter.title} ID`}
                    className="w-full p-4 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                />

            </FormElement>

            <FormElement
                name={parameter.name}
                label={parameter.title}
                errors={parameter.errors}
                touched={parameter.touched}
            >
                <Autosuggest
                    suggestions={parameter.data}
                    onSuggestionsFetchRequested={({ value }) => {
                        // if (count === 0) {
                        // endTimer();
                        startTimer();
                        // }
                        // else {
                        //     if (count === 2) {
                        //         endTimer();
                        //         endTimer();
                        //     }
                        //     else {

                        //     }
                        // }
                        // if (value.length > 3) {
                        // debounce(function () {
                        //     // parameter.setKeyword(value);
                        // }, 1000);
                        // }
                    }}
                    onSuggestionsClearRequested={() => {

                    }}
                    getSuggestionValue={(suggestion: datalist) => suggestion.label}
                    renderSuggestion={suggestion => (
                        <option>
                            {suggestion.label}
                        </option>
                    )}
                    onSuggestionSelected={(event, { suggestion, method }) => {

                        if (method === "enter") {
                            event.preventDefault();
                        }
                        setValue(suggestion.label);
                        setID(suggestion.id);
                    }}
                    inputProps={{
                        placeholder: `Enter ${parameter.title}`,
                        value: value,
                        id: parameter.name,
                        name: parameter.name,
                        className: "w-full p-4 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500",
                        type: "text",
                        onChange: (_event, { newValue }) => {
                            if (parameter.data.length === 0) {
                                parameter.setKeyword("");
                                setValue("");
                                setID("");
                            }
                            else {
                                setValue(newValue);
                            }
                        }
                    }}
                />
            </FormElement>


        </>
    )
}

export default index