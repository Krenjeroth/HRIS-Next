import React from 'react'
import { Button, Tabs } from 'flowbite-react';
import { useState } from 'react';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import { FormElement } from '@/app/components/commons/FormElement';
import { Alert } from 'flowbite-react';
import { redirect } from 'next/navigation'
import dayjs from 'dayjs';

function index() {
    return (
    <FormElement
        name="lgu_position"
        label="Position"
        errors={errors}
        touched={touched}
    >
        <Field
            id="lgu_position"
            name="lgu_position"
            placeholder="Enter Position"
            className="w-full p-4 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
            type="text"
            list="positions"
        />

        <datalist id="positions">
            {/* {props.designations.map((designation) => {
                                    return (
                                        <option
                                            value={`${designation.id}`}
                                            key={`${designation.id}`}
                                        >
                                            {`${designation.designation_title}`}
                                        </option>
                                    );
                                })} */}
        </datalist>
    </FormElement>
    )
}

export default index