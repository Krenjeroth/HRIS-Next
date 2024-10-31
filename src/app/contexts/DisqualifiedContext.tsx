
"use client";
import React, { createContext, useContext, useState } from 'react';
import { IValues, disqualifiedContextType } from '../types/pds';
import { error } from 'console';
const DisqualifiedContext = createContext<disqualifiedContextType | null>(null);





export default function index(parameter: disqualifiedContextType) {



    return <DisqualifiedContext.Provider value={{
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
    }}>
        {parameter.children}


    </DisqualifiedContext.Provider>;
};


export function useDisqualifiedContext() {
    const context = useContext(DisqualifiedContext);
    if (!context) {
        throw new Error(
            " Context Error"
        );
    }
    return context;
}
