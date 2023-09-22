
"use client";
import { Field, FieldArray, useFormikContext } from 'formik';
import React, { useState } from 'react'

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