
"use client";
import React, { createContext, useContext, useState } from 'react';
import { IValues, appointmentContextType, interviewContextType } from '../types/pds';
import { error } from 'console';
const AppointmentContext = createContext<appointmentContextType | null>(null);





export default function index(parameter: appointmentContextType) {



    return <AppointmentContext.Provider value={{
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


    </AppointmentContext.Provider>;
};


export function useAppointmentContext() {
    const context = useContext(AppointmentContext);
    if (!context) {
        throw new Error(
            " Context Error"
        );
    }
    return context;
}
