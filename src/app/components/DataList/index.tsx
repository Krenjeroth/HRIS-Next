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
    name: string
}

function index(parameter: Props) {
    return (
        <>
          
            <Field
                id="lgu_position"
                name="lgu_position"
                placeholder="Enter Position"
                className="w-full p-4 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                type="text"
                list="positions"
            />
{/* 
            <datalist id="positions">
                {parameter.data.map((designation) => {
                    return (
                        <option value={`${designation.id}`}
                        //     key={`${designation.id}`}>

                        </option>
                        //     value={`${designation.id}`}
                        //     key={`${designation.id}`}
                        // >
                        //     {`${designation.designation_title}`}
                        // </option>
                    );


                })}
            </datalist > */}
        </>
    )
}

export default index