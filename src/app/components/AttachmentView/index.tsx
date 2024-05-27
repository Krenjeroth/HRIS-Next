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
        getData();

    }, []);

    return (
        <div className=''>
            {/*  Tabs */}
            <Tabs.Group
                aria-label="Tabs with underline"
                style="underline"
            >
                <Tabs.Item className=' overflow-x-auto' title={"Atttachments"}>

                    <Button className='btn btn-sm text-white rounded-lg bg-cyan-500  hover:scale-90 shadow-sm text mb-5' onClick={() => {
                        router.back();
                    }} >Return to previous page
                    </Button>
                    <div className=''>
                        {(base64) ?
                            <iframe src={`data:application/pdf;headers=application_attachment_${props.id};base64,${base64}`} className='w-full h-[300px] sm:h-[450px] md:h-[600px] lg:h-[450px] xl:h-[600px]' height="100%" width="100%"></iframe>
                            : ""}
                    </div>
                  
                </Tabs.Item>
            </Tabs.Group >
        </div >
    )

}

export default index