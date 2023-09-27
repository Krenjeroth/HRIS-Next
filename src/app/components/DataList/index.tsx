"use client";

import React, { useEffect, useCallback, useContext } from 'react';
import { useState, useMemo } from 'react';
import { Field, Form, Formik, FormikHelpers, useField, useFormikContext } from 'formik';
import debounce from 'lodash/debounce';
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
    className: string
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

    return (
        <>
            <FormElement
                name={`${parameter.name}_autosuggest`}
                label={parameter.label}
                errors={parameter.errors}
                touched={parameter.touched}
                className={`${parameter.readonly === true ? "hidden" : ""} ${parameter.className}`}
            >
                <Autosuggest
                    suggestions={parameter.data}
                    onSuggestionsFetchRequested={debouncedLoadSuggestions}
                    onSuggestionsClearRequested={() => {
                        if (value == "") {
                            setFieldValue(parameter.id, '');
                            setFieldValue(parameter.name, '');
                            setFieldValue(`${parameter.name}_autosuggest`, '');
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
                        setFieldValue(`${parameter.name}_autosuggest`, suggestion.label);
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