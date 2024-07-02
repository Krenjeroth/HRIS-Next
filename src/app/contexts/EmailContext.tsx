
"use client";
import React, { createContext, useContext, useState } from 'react';
import { IValues, emailContextType } from '../types/pds';
import { error } from 'console';
const EmailContext = createContext<emailContextType | null>(null);





export default function index(parameter: emailContextType) {



    return <EmailContext.Provider value={{
        formikData: parameter.formikData,
        readonly: parameter.readonly,
        errors: parameter.errors,
        touched: parameter.touched,
        isEmployee: parameter.isEmployee,
        initialValues: parameter.initialValues,
        setValues: parameter.setValues,
        isLoading: parameter.isLoading,
        process: parameter.process,
    }}>
        {parameter.children}

    </EmailContext.Provider>;
};


export function useEmailContext() {
    const context = useContext(EmailContext);
    if (!context) {
        throw new Error(
            "PDS Context Error"
        );
    }
    return context;
}
