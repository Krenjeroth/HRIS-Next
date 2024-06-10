"use client";
import { Button, Tabs, TabsRef } from 'flowbite-react';
import React, { ReactNode, useEffect, useRef } from 'react';
import { useState } from 'react';
import Table from "../../components/Table";
import HttpService from '../../../../lib/http.services';
import Drawer from '../../components/Drawer';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import { FormElement } from '@/app/components/commons/FormElement';
import { setFormikErrors } from '../../../../lib/utils.service';
import { Alert } from 'flowbite-react';
import dayjs from 'dayjs';
import DatePicker from '../../components/DatePicker'
import DataList from '@/app/components/DataList';
import { ArrowRightIcon, ArrowUturnLeftIcon, BackspaceIcon, EyeIcon, HandThumbUpIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
import { useRouter } from "next/navigation";
import { createContext } from 'vm';



// types

type row = {
    id: string,
    attributes: object[]
}

type alert = {
    type: string,
    message: string
}

type header = {
    column: string,
    display: string
}

type datalist = {
    id: string,
    label: any
}

type button = {
    icon: ReactNode,
    title: string,
    process: string,
    class: string
    link?: string
}
type filter = {
    column: string;
    value: string;
}


// interfaces

interface IValues {
    date_submitted: string;
    date_approved: string,
    position_id: string;
    position: string;
    position_autosuggest: string;
    status: string;
    posting_date: string,
    closing_date: string,
    publication_status: string,
}


//main function

function Details(props: any) {


    // variables
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<number>(1);
    const tabsRef = useRef<TabsRef>(null);
    const [title, setTitle] = useState<string>("Vacancy/Opening Detail");

    //    get details
    const getDetails = async (id: number) => {

        try {
            const resp = await HttpService.get("vacancy/" + id);
            if (resp.status === 200) {
                let data = resp.data;
                console.log(data);
            }
        }
        catch (error: any) {
        }

    };



    useEffect(() => {
        getDetails(props.id);
    }, []);


    // tsx
    return (
        <>

            {/*  Tabs */}
            <Tabs.Group
                aria-label="Tabs with underline"
                style="underline"
                ref={props.tabsRef}

            >

                <Tabs.Item title={title + "s"} active>


                </Tabs.Item>

            </Tabs.Group >
        </>
    );
}

export default Details