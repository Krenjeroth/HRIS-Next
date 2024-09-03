
"use client";
import React, { createContext, useContext, useState } from 'react';
import { IValues, interviewContextType } from '../types/pds';
import { error } from 'console';
const InterviewContext = createContext<interviewContextType | null>(null);





export default function index(parameter: interviewContextType) {



    return <InterviewContext.Provider value={{
        formikData: parameter.formikData,
        readonly: parameter.readonly,
        errors: parameter.errors,
        touched: parameter.touched,
        initialValues: parameter.initialValues,
        setValues: parameter.setValues,
        isLoading: parameter.isLoading,
        id: parameter.id,
        process: parameter.process,
        submitSearchPerson: parameter.submitSearchPerson,
    }}>
        {parameter.children}


    </InterviewContext.Provider>;
};


export function useInterviewContext() {
    const context = useContext(InterviewContext);
    if (!context) {
        throw new Error(
            " Context Error"
        );
    }
    return context;
}
