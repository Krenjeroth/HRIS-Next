import React, { createContext, useContext, useState } from 'react';
import { IValues, formContextType } from '../types/pds';
export const PDSContext = createContext<formContextType | null>(null);


type Props = {
    readonly?: boolean,
    errors: any,
    touched: any,
    isEmployee?: boolean,
    initialValues: any
    setValues: Function
    children?: React.ReactNode,
}


export default function index(parameter: Props) {
    const [b, setB] = useState<formContextType>({
        readonly: parameter.readonly,
        errors: parameter.errors,
        touched: parameter.touched,
        isEmployee: parameter.isEmployee,
        initialValues: parameter.initialValues,
        setValues: parameter.setValues
    })
    return <PDSContext.Provider value={b}>
        {parameter.children}
    </PDSContext.Provider>;
};

export function usePDSContext() {
    const context = useContext(PDSContext);
    if (!context) {
        throw new Error(
            "PDS Context error"
        );
        return context;
    }
}