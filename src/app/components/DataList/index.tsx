"use client";

import { Button, Label, Tabs } from 'flowbite-react';
import React, { useEffect } from 'react';
import { useState } from 'react';
import Table from "@/app/components/Table";
import HttpService from '../../../../lib/http.services';
import Drawer from '@/app/components/Drawer';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import { FormElement } from '@/app/components/commons/FormElement';
import { setFormikErrors } from '../../../../lib/utils.service';
import { Alert } from 'flowbite-react';
import { redirect } from 'next/navigation'
import dayjs from 'dayjs';
import DatePicker from '@/app/components/DatePicker'

type datalist = {
    id: string,
    attributes: any
}

type Props = {
    errors: any,
    touched: any,
    setKeyword: Function,
    title: string,
    data: datalist[],
    name: string,
    initialValues: any,
    setValues: Function,
    id: string
}

function index(parameter: Props) {

    // const [fieldValue, setFieldValue] = useState<string>('');
    return (
        <>

            <FormElement
                name={parameter.id}
                label={`${parameter.title} ID`}
                errors={parameter.errors}
                touched={parameter.touched}
            >

                <Field
                    id={parameter.id}
                    name={parameter.id}
                    placeholder={`${parameter.title} ID`}
                    className="w-full p-4 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                />

            </FormElement>

            <FormElement
                name={parameter.name}
                label={parameter.title}
                errors={parameter.errors}
                touched={parameter.touched}
            >
                <Field
                    id={parameter.name}
                    name={parameter.name}
                    placeholder={`Enter ${parameter.title}`}
                    className="w-full p-4 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                    type="text"
                    list="lists"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        parameter.initialValues[parameter.name] = e.target.value;
                        // parameter.setValues({
                        //     lgu_position_id: 5,
                        //     lgu_position: e.target.value
                        // });
                        console.log(parameter.initialValues);
                    }}
                // onKeyUp={(e: React.ChangeEvent<HTMLInputElement>) => {
                //     if (e.target.value != "") {
                //         parameter.setKeyword(e.target.value);
                //     }
                // }}
                />

                <datalist id="lists">
                    {parameter.data.map((row: datalist) => {
                        return (
                            <option key={row.id}
                                onInput={() => {
                                }}
                            // onClick={() => {
                            //     // parameter.setId(row.attributes);
                            // }}
                            // value={row.attributes.label}
                            >
                                {row.attributes.label}
                            </option>
                        )
                    })}
                </datalist >
            </FormElement>

        </>
    )
}

export default index