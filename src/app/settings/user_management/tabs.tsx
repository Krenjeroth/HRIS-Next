"use client";
import { Button, Tabs } from 'flowbite-react';
import React, { ReactNode, useEffect } from 'react';
import { useState } from 'react';
import Table from "../../components/Table";
import HttpService from '../../../../lib/http.services';
import Drawer from '../../components/Drawer';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import { FormElement } from '@/app/components/commons/FormElement';
import { setFormikErrors } from '../../../../lib/utils.service';
import { Alert } from 'flowbite-react';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid';

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

type button = {
    icon: ReactNode,
    title: string,
    process: string,
    class: string,

}

type filter = {
    column: string;
    value: string;
}


// interfaces

interface IValues {
    name?: string;
    email?: string;
    password?: string;
    password_confirmation?: string;
}


//main function

function SalaryGradeTabs() {


    // variables
    const [activeTab, setActiveTab] = useState<number>(0);
    const [activePage, setActivePage] = useState<number>(1);
    var [filters, setFilters] = useState<filter[]>([]);
    const [orderBy, setOrderBy] = useState<string>('');
    const [alerts, setAlerts] = useState<alert[]>([]);
    const [refresh, setRefresh] = useState<boolean>(false);
    const [orderAscending, setOrderAscending] = useState<boolean>(false);
    const [pagination, setpagination] = useState<number>(1);
    const [process, setProcess] = useState<string>("Add");

    const [headers, setHeaders] = useState<header[]>([
        { "column": "id", "display": "id" },
        { "column": "name", "display": "Name" },
        { "column": "email", "display": "Email" }
    ]);

    const [pages, setPages] = useState<number>(0);
    const [data, setData] = useState<row[]>([]);
    const [title, setTitle] = useState<string>("User");
    const [id, setId] = useState<number>(0);
    const [reload, setReload] = useState<boolean>(true);
    const [showDrawer, setShowDrawer] = useState<boolean>(false);
    var [initialValues, setValues] = useState<IValues>(
        {
            name: "",
            email: "",
            password: "",
            password_confirmation: ""
        }
    );

    const [buttons, setButtons] = useState<button[]>([
        { "icon": <PencilIcon className=' w-5 h-5' />, "title": "Edit", "process": "Edit", "class": "text-blue-600" },
        { "icon": <TrashIcon className=' w-5 h-5' />, "title": "Delete", "process": "Delete", "class": "text-red-600" }
    ]);

    // Use Effect Hook

    useEffect(() => {
        // query
        async function getData() {
            const postData = {
                activePage: activePage,
                filters: filters,
                orderBy: orderBy,
                orderAscending: orderAscending
            };
            const resp = await HttpService.post("search-users", postData);
            if (resp != null) {
                setData(resp.data.data);
                setPages(resp.data.pages);
            }
        }


        getData();
    }, [refresh, filters, orderBy, orderAscending, pagination, activePage]);

    useEffect(() => {
        setAlerts([]);
        if (id == 0) {
            setValues({
                name: '',
                email: '',
                password: '',
                password_confirmation: ''
            });
        }
        else {
            resetFormik();
            getDataById(id);
        }

    }, [id, reload]);

    useEffect(() => {
        if (process === "Delete") {
            setAlerts([{ "type": "failure", "message": "Are you sure to delete this data?" }])
        }
        else {
            // setAlerts([]);
        }
    }, [process]);



    //    get data by id
    const getDataById = async (id: number) => {

        try {
            const resp = await HttpService.get("users/" + id);
            const data = resp.data.data.attributes;
            if (resp.status === 200) {
                setValues({
                    name: data.name,
                    email: data.email,
                    password: "",
                    password_confirmation: ""
                })
                setShowDrawer(true);

            }
        }
        catch (error: any) {
        }

    };

    function resetFormik() {
        setValues({
            name: "",
            email: "",
            password: "",
            password_confirmation: ""
        });
    }


    // clear alert
    function clearAlert(key: number) {
        const temp_alerts = [...alerts];
        temp_alerts.splice(key, 1);
        setAlerts(temp_alerts);
    }


    // Submit form
    const onFormSubmit = async (
        values: IValues,
        { setSubmitting, resetForm, setFieldError }: FormikHelpers<IValues>
    ) => {
        const postData = {
            name: values.name,
            email: values.email,
            password: values.password,
            password_confirmation: values.password_confirmation,
            device_name: "web",
        };



        alerts.forEach(element => {
            alerts.pop();
        });

        try {
            // add
            if (process == "Add") {

                const resp = await HttpService.post("users", postData);
                if (resp.status === 200) {
                    let status = resp.data.status;
                    if (status === "Request was Successful") {
                        alerts.push({ "type": "success", "message": "Data has been successfully saved!" });
                        setActivePage(1);
                        setFilters([]);
                        setRefresh(!refresh);
                    }
                    else {
                        if (typeof resp.data != "undefined") {
                            alerts.push({ "type": "failure", "message": resp.data.message });
                        }
                    }
                }
            }
            // update
            else if (process == "Edit") {
                const resp = await HttpService.patch("users/" + id, postData)
                if (resp.status === 200) {
                    let status = resp.data.status;
                    if (resp.data.data != "" && typeof resp.data.data != "undefined") {
                        alerts.push({ "type": "success", "message": "Data has been successfully saved!" });
                        setActivePage(1);
                        setFilters([]);
                        setRefresh(!refresh);
                    }
                    else {
                        if (typeof resp.data != "undefined") {
                            alerts.push({ "type": "failure", "message": resp.data.message });
                        }
                    }
                }
            }
            // delete
            else {
                const resp = await HttpService.delete("users/" + id);
                if (resp.status === 200) {
                    let status = resp.data.status;
                    if (status === "Request was Successful") {
                        alerts.push({ "type": "success", "message": resp.data.message });
                        setActivePage(1);
                        setFilters([]);
                        setRefresh(!refresh);
                        setId(0);
                        setProcess("Add");
                    }
                    else {
                        if (typeof resp.data != "undefined") {
                            alerts.push({ "type": "failure", "message": resp.data.message });
                        }
                    }
                }
            }
        }
        catch (error: any) {
            if (error.response.status === 422) {
                setFormikErrors(error.response.data.errors, setFieldError);
            }
        }

    };



    // tsx
    return (
        <>
            {/* drawer */}
            <Drawer width='w-96' setShowDrawer={setShowDrawer} setProcess={setProcess} showDrawer={showDrawer} setId={setId} title={`${process} ${title}`}>

                {/* formik */}
                <Formik initialValues={initialValues} onSubmit={onFormSubmit} enableReinitialize={true} validateOnBlur={false} validateOnChange={false}
                >

                    {({ errors, touched }) => (

                        // forms
                        <Form className='p-2' id="formik">
                            <div className='alert-container mb-2' id="alert-container">
                                {alerts.map((item, index) => {
                                    return (
                                        <Alert className='my-1' color={item.type} key={index} onDismiss={() => { clearAlert(index) }} > <span> <p><span className="font-medium">{item.message}</span></p></span></Alert>
                                    );
                                })}
                            </div>


                            {/* name */}
                            <FormElement
                                name="name"
                                label="Name"
                                errors={errors}
                                touched={touched}
                            >
                                <Field
                                    readOnly={(process === "Delete") ? true : false}
                                    id="name"
                                    name="name"
                                    placeholder="Enter Name"
                                    className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                                    onClick={() => { setAlerts([]); }}
                                />
                            </FormElement>


                            {/* Email */}
                            <FormElement
                                name="email"
                                label="Email"
                                errors={errors}
                                touched={touched}
                            >

                                <Field
                                    readOnly={(process === "Delete") ? true : false}
                                    id="email"
                                    name="email"
                                    placeholder="Enter Email"
                                    className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                                />

                            </FormElement>


                            {/* Password */}
                            <FormElement
                                name="password"
                                label="Password"
                                errors={errors}
                                touched={touched}
                            >

                                <Field
                                    readOnly={(process === "Delete") ? true : false}
                                    id="password"
                                    name="password"
                                    placeholder="Enter Password"
                                    className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                                />

                            </FormElement>


                            {/* Password */}
                            <FormElement
                                name="password_confirmation"
                                label="Password Confirmation"
                                errors={errors}
                                touched={touched}
                            >

                                <Field
                                    readOnly={(process === "Delete") ? true : false}
                                    id="password_confirmation"
                                    name="password_confirmation"
                                    placeholder="Enter Password"
                                    className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                                />

                            </FormElement>


                            {/* submit button */}

                            <div className="grid grid-flow-row auto-rows-max mt-5">
                                <button type="submit" className={`py-2 px-4   ${(process == "Delete" ? "bg-red-500" : "bg-blue-500")}  text-white font-semibold rounded-lg focus:scale-90 shadow-sm mx-auto`} >
                                    {(process == "Delete" ? "Delete" : "Submit")}
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </Drawer>
            <div className={`${showDrawer ? "blur-[1px]" : ""}`}>

                {/*  Tabs */}
                <Tabs.Group
                    aria-label="Tabs with underline"
                    style="underline"
                >
                    <Tabs.Item className=' overflow-x-auto' title={title + "s"}>

                        <Button className='btn btn-sm text-white rounded-lg bg-blue-500  hover:scale-90 shadow-sm text' onClick={() => {
                            setValues({
                                name: "",
                                email: "",
                                password: "",
                                password_confirmation: ""
                            });
                            setShowDrawer(true);
                            setId(0);
                            setProcess("Add");
                        }} onDoubleClick={() => { setShowDrawer(false); }}>Add {title}
                        </Button>


                        {/*Table*/}
                        <Table
                            buttons={buttons}
                            filters={filters}
                            setFilters={setFilters}
                            orderBy={orderBy}
                            setOrderBy={setOrderBy}
                            orderAscending={orderAscending}
                            setOrderAscending={setOrderAscending}
                            pagination={pagination}
                            setpagination={setpagination}
                            data={data}
                            pages={pages}
                            activePage={activePage}
                            setActivePage={setActivePage}
                            headers={headers}
                            setId={setId}
                            reload={reload}
                            setReload={setReload}
                            setProcess={setProcess}
                        />
                    </Tabs.Item>
                </Tabs.Group >
            </div>
        </>
    );
}

export default SalaryGradeTabs