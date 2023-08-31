
"use client";
import React, { createContext, useContext, useState } from 'react';
import { IValues, formContextType } from '../types/pds';
import { error } from 'console';
const PDSContext = createContext<formContextType | null>(null);


type Props = {
    readonly?: boolean,
    errors: any,
    touched: any,
    isEmployee?: boolean,
    initialValues: IValues
    setValues: Function
    children?: React.ReactNode,
}


export default function index(parameter: Props) {
    return <PDSContext.Provider value={{
        readonly: parameter.readonly,
        errors: parameter.errors,
        touched: parameter.touched,
        isEmployee: parameter.isEmployee,
        initialValues: parameter.initialValues,
        setValues: parameter.setValues
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
