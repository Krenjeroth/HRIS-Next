
"use client";
import { usePDSContext } from '@/app/contexts/PDSContext';
import { Field, FieldArray, useFormikContext } from 'formik';
import React, { useEffect, useState } from 'react'

type Props = {
    value: string,
    id: string,
    name: string,
    placeholder: string,
    className: string,
};



function TableInput(parameter: Props) {
    const [value, setValue] = useState<string>(parameter.value);
    const { setFieldValue } = useFormikContext();
    const context = usePDSContext();
    useEffect(() => {
        setValue(parameter.value);
    }, [parameter.value]);

    useEffect(() => {
        if (parameter.value != "") {
            setValue("");
        }
    }, [context.initialValues])

    return (
        <>
            <Field
                id={parameter.id}
                name={parameter.name}
                placeholder={parameter.placeholder}
                className={parameter.className}
                autoComplete="on"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setFieldValue(parameter.name, e.target.value);
                    setValue(e.target.value);
                }}
                value={value}
            />
        </>
    )
}

export default TableInput