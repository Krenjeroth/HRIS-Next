"use client";

import { Button, Tabs } from 'flowbite-react';
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
    setKeyword: Function,
    title: string,
    data: datalist[],
    name: string,
    setId: Function
}

function index(parameter: Props) {

    // const [fieldValue, setFieldValue] = useState<string>('');

    return (
        <>
            <Field
                id="position"
                name="position"
                placeholder="Enter Position"
                className="w-full p-4 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                type="text"
                list="lists"
                onClick={(e: React.ChangeEvent<HTMLInputElement>) => {
                    e.target.value = "";
                }}
                onKeyUp={(e: React.ChangeEvent<HTMLInputElement>) => {
                    if (e.target.value != "") {
                        parameter.setKeyword(e.target.value);
                    }
                }}
            />

            <datalist id="lists">
                {parameter.data.map((row: datalist) => {
                    return (
                        <option key={row.id}
                            onClick={() => {
                                parameter.setId(row.attributes);
                            }}
                            value={row.attributes.label}>
                            {row.attributes.label}
                        </option>
                    )
                })}
            </datalist >
        </>
    )
}

export default index