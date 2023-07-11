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
import { object, string } from 'yup';

type datalist = {
    id: string,
    attributes: any
}

interface IValues {
    date_submitted: string;
    lgu_position_id: number;
    lgu_position: string;
}


interface update {
    attribute: string,
    value: any
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


function debounce(fn: Function, delay: number) {
    let timer;
    return (() => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(), delay);
    })();

};


function updateData(data: any, update: any) {
    const newObject: any = {};
    for (const property in data) {
        newObject[property] = data[property];
        // console.log(`${property}: ${data[property]}`);
    }

    update.forEach((item: update, index: number) => {
        newObject[item.attribute] = item.value;
    });

    // update.forEach(element:update => {

    // });
    console.log(newObject);
}


function index(parameter: Props) {

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
                // onClick={() => {
                //     console.log(parameter.initialValues);
                // }}
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
                    onClick={() => {
                        // updateData(parameter.initialValues,]);
                        // let testsss = { date_submitted: '', lgu_position_id: 2, lgu_position: '' };
                        // parameter.setKeyword("");
                        // const ff = parameter.initialValues;
                        // console.log(ff);
                        // parameter.setValues(testsss);
                        // console.log(parameter.initialValues, testsss);
                    }}
                    // onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    //     //     //     parameter.setKeyword(e.target.value);
                    //     //     //     if (parameter.data.length === 0) {
                    //     //     //         console.log("clear");
                    //     //     //         let value = parameter.initialValues;
                    //     //     //         value[parameter.name] = "";
                    //     //     //         parameter.setValues(value);
                    //     //     //     }
                    // }}
                    onKeyUp={(e: React.ChangeEvent<HTMLInputElement>) => {
                        debounce(function () {
                            parameter.setKeyword(e.target.value);
                            // console.log(parameter.data.length);
                            // if (parameter.data.length === 0) {
                            //     let value = parameter.initialValues;
                            //     value[parameter.name] = "";
                            //     console.log(value);
                            //     parameter.setValues(
                            //         { date_submitted: '', lgu_position_id: 3, lgu_position: e.target.value }
                            //     );
                            // }
                            // else {

                            // }
                        }, 1500);
                    }}
                />

                <datalist id="lists">
                    <option value="" >No Data</option>
                    {parameter.data.map((row: datalist) => {
                        return (
                            <option key={row.id}
                                value={row.attributes.label}
                                onClick={() => {
                                    console.log("duriel");
                                }}
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