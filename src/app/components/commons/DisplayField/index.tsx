"use client";

import React, { useEffect, useCallback, useContext } from 'react';
import { useState, useMemo } from 'react';
import { Field, Form, Formik, FormikHelpers, useField, useFormikContext } from 'formik';
import debounce from 'lodash/debounce';
import { FormElement } from '@/app/components/commons/FormElement';
import Autosuggest from 'react-autosuggest';



type Props = {
    label: string,
    value: string,
    id: string,
    class?: string
}


function index(parameter: Props) {

    return <>
        <div className={`col-span-4 ${parameter.class} `}>
            <label htmlFor={parameter.id} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{parameter.label}</label>
            <input id={parameter.id} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={parameter.value} readOnly />
        </div>
    </>;

}

export default index