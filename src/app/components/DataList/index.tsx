"use client";

import React, { useEffect, useCallback } from 'react';
import { useState } from 'react';
import { Field, Form, Formik, FormikHelpers, useField, useFormikContext } from 'formik';
import _debounce from 'lodash/debounce';
import { FormElement } from '@/app/components/commons/FormElement';
import Autosuggest from 'react-autosuggest';
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



function index(parameter: Props) {
    const { setFieldValue } = useFormikContext();
    const [field] = useField(parameter);
    const [value, setValue] = useState<string>("");
    const debouncedLoadSuggestions = _debounce(loadSuggestions,1000);
    function loadSuggestions(value: string) {
        if (parameter.data.length === 0 && value != "") {
            setFieldValue(parameter.id, '');
            setFieldValue(parameter.name, '');
            setValue("");
        } else {
            parameter.setKeyword(value);
        }
    }

    return (
        <>
            <div className='hidden'>
                <FormElement
                    name={parameter.id}
                    label={`${parameter.title} ID`}
                    errors={parameter.errors}
                    touched={parameter.touched}
                >
                    <Field
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


                    <Field
                        id={parameter.name}
                        name={parameter.name}
                        placeholder={`${parameter.title}`}
                        className="w-full p-4 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                    />

                </FormElement>

            </div>

            <FormElement
                name={`${parameter.name}_autosuggest`}
                label={parameter.title}
                errors={parameter.errors}
                touched={parameter.touched}
            >

                <Autosuggest
                    suggestions={parameter.data}
                    onSuggestionsFetchRequested={({ value }) => {
                        debouncedLoadSuggestions(value);
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
                        setFieldValue(parameter.id, suggestion.id);
                        setFieldValue(parameter.name, suggestion.label);
                    }}
                    inputProps={{
                        placeholder: `Enter ${parameter.title}`,
                        value: value,
                        id: `${parameter.name}_autosuggest`,
                        name: `${parameter.name}_autosuggest`,
                        className: "w-full p-4 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500",
                        type: "text",
                        onChange: (_event, { newValue }) => {
                            if (parameter.data.length === 0 && newValue != "") {
                                parameter.setKeyword("");
                                setValue("");
                                setFieldValue(parameter.id, '');
                                setFieldValue(parameter.name, '');
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