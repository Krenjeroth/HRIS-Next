"use client";

import React, { useEffect, useCallback, useContext } from 'react';
import { useState, useMemo } from 'react';
import { Field, Form, Formik, FormikHelpers, useField, useFormikContext } from 'formik';
import debounce from 'lodash/debounce';
import { FormElement } from '@/app/components/commons/FormElement';
import Autosuggest from 'react-autosuggest';
type datalist = {
    id: string,
    label: string,
    data?: any
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
    readonly?: boolean,
    errors: any,
    touched: any,
    setKeyword: Function,
    label: string,
    title: string,
    data: datalist[],
    name: string,
    initialValues: any,
    setValues: Function,
    id: string,
    className: string,
    required?: boolean,
    fillValues?: string[]
}


function index(parameter: Props) {
    const { setFieldValue } = useFormikContext();

    const [field] = useField(parameter);
    const [value, setValue] = useState<string>("");


    // call once after render
    const loadSuggestions = useCallback(({ value }: any) => {
        parameter.setKeyword(value);
    }, []);

    const debouncedLoadSuggestions = useMemo(() => {
        return debounce(loadSuggestions, 500);
    }, [loadSuggestions]);

    useEffect(() => {
        if (parameter.data.length === 0) {
            parameter.setKeyword("");
            setValue("");
            setFieldValue(parameter.id, '');
            setFieldValue(parameter.name, '');
            setFieldValue(`${parameter.name}_autosuggest`, '');
        }
    }, [parameter.data])

    useEffect(() => {
        setValue(parameter.initialValues[parameter.name]);
    }, [parameter.initialValues])

    return (

        <>
            <FormElement
                name={`${parameter.name}_autosuggest`}
                label={parameter.label}
                errors={parameter.errors}
                touched={parameter.touched}
                className={`${parameter.readonly === true ? "hidden" : ""} ${parameter.className}`}
                required={parameter.required}
            >
                <Autosuggest
                    suggestions={parameter.data}
                    onSuggestionsFetchRequested={debouncedLoadSuggestions}
                    onSuggestionsClearRequested={() => {
                        if (value == "") {
                            setFieldValue(parameter.id, '');
                            setFieldValue(parameter.name, '');
                            setFieldValue(`${parameter.name}_autosuggest`, '');
                            if (parameter.fillValues?.length) {
                                parameter.fillValues.forEach((item: string, index: number) => {
                                    setFieldValue(item, "");
                                })
                            }
                        }

                    }}
                    getSuggestionValue={(suggestion: datalist) =>
                        suggestion.label
                    }
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
                        setFieldValue(`${parameter.name}_autosuggest`, suggestion.label)

                        if (parameter.fillValues?.length) {
                            parameter.fillValues.forEach((item: string, index: number) => {
                                setFieldValue(item, suggestion.data[item]);
                            })
                        }
                    }}
                    inputProps={{
                        placeholder: `Enter ${parameter.title}`,
                        value: value,
                        id: `${parameter.name}_autosuggest`,
                        name: `${parameter.name}_autosuggest`,
                        className: "w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500",
                        type: "text",
                        onChange: (_event, { newValue }) => {
                            setValue(newValue);
                        }
                    }}
                />

            </FormElement>
        </>
    )
}

export default index