
"use client";
import React, { createContext, useContext, useState } from 'react';
import { IValues, formContextType } from '../types/pds';
import { error } from 'console';
const PDSContext = createContext<formContextType | null>(null);





export default function index(parameter: formContextType) {



    return <PDSContext.Provider value={{
        formikData: parameter.formikData,
        readonly: parameter.readonly,
        errors: parameter.errors,
        touched: parameter.touched,
        isEmployee: parameter.isEmployee,
        initialValues: parameter.initialValues,
        setValues: parameter.setValues,
        isLoading: parameter.isLoading,
        process: parameter.process,
        submitSearchPerson: parameter.submitSearchPerson,
        code: parameter.code,
    }}>
        {parameter.children}


    </PDSContext.Provider>;
};


export function usePDSContext() {
    const context = useContext(PDSContext);
    if (!context) {
        throw new Error(
            "PDS Context Error"
        );
    }
    return context;
}
