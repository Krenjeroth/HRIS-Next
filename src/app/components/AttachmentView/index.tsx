"use client";

import { Button, Tabs } from 'flowbite-react';
import React, { ReactNode, useEffect } from 'react';
import { useState } from 'react';
import Table from "../Table";
import HttpService from '../../../../lib/http.services';
import Drawer from '../Drawer';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import { FormElement } from '@/app/components/commons/FormElement';
import { setFormikErrors } from '../../../../lib/utils.service';
import { Alert } from 'flowbite-react';
import DatePicker from '../DatePicker';
import dayjs from 'dayjs';
import { ArrowDownLeftIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
import { file_attachment } from '@/app/types/pds';
import { useRouter } from "next/navigation"





function index(props: file_attachment) {


    const [base64, setBase64] = useState<string>('');
    const router = useRouter();

    useEffect(() => {
        async function getData() {
            const postData = {
                id: props.id
            }
            const resp = await HttpService.post(props.link, postData);
            if (resp != null) {
                setBase64(resp.data);
            }
        }
        if (props.id != null && props.id != 0) {
            getData();
        }

    }, [props.id]);

    return (

        <div className=''>
            {(base64) ?
                <iframe src={`data:application/pdf;headers=application_attachment_${props.id};base64,${base64}`} className='w-full h-[300px] sm:h-[450px] md:h-[600px] lg:h-[600px] xl:h-[800px]' height="100%" width="100%"></iframe>
                : ""}
        </div>
    )

}

export default index