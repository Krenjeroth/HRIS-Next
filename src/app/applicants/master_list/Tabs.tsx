"use client";
import { Button, Tabs } from 'flowbite-react';
import React, { useEffect } from 'react';
import { useState } from 'react';
import Table from "../../components/Table";
import HttpService from '../../../../lib/http.services';
import Drawer from '../../components/Drawer';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import { FormElement } from '@/app/components/commons/FormElement';
import { setFormikErrors } from '../../../../lib/utils.service';
import { Alert } from 'flowbite-react';

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
// interfaces

interface IValues {
    submission_date?: string;
    employee_id?: string;
    status?: string;
    applicant_id?: string;
    first_name?: string;
    middle_name?: string;
    last_name?: string;
    suffix_name?: string;
    contact_number?: string;
    email_address?: string;
    application_type?: string;
    position_title?: string;
}

type position = {
    id: string;
    attributes: {
        title: string;
    }
}


//main function

function SalaryGradeTabs() {


    // variables
    const [activeTab, setActiveTab] = useState<number>(0);
    const [activePage, setActivePage] = useState<number>(1);
    var [searchKeyword, setSearchKeyword] = useState<string>('');
    const [orderBy, setOrderBy] = useState<string>('');
    const [alerts, setAlerts] = useState<alert[]>([]);
    const [refresh, setRefresh] = useState<boolean>(false);
    const [orderAscending, setOrderAscending] = useState<boolean>(false);
    const [pagination, setpagination] = useState<number>(1);
    const [process, setProcess] = useState<string>("Add");
    const [positions, setpositions] = useState<position[]>([]);
    const [headers, setHeaders] = useState<header[]>([
        { "column": "submission_date", "display": "year" },
        { "column": "status", "display": "status" },
        { "column": "applicant_id", "display": "applicant no." },
        { "column": "first_name", "display": "first_name" },
        { "column": "middle_name", "display": "middle_name" },
        { "column": "last_name", "display": "last_name" },
        { "column": "suffix_name", "display": "suffix_name" },
        { "column": "title", "display": "job title" },
        { "column": "application_type", "display": "application through" },
        { "column": "applicant_type", "display": "capitol employee" },
        { "column": "contact_number", "display": "contact_number" },
        { "column": "email_address", "display": "email_address" },

        // "submission_date",
        // "status",
        // "applicant_id",
        // "first_name",
        // "middle_name",
        // "last_name",
        // "suffix_name",
        // "application_type",
        // "contact_number",
        // "email_address",
        // "publication_id",
        // "employee_id"
    ]);
    const [pages, setPages] = useState<number>(1);
    const [data, setData] = useState<row[]>([]);
    const [title, setTitle] = useState<string>("Master List");
    const [id, setId] = useState<number>(0);
    const [showDrawer, setShowDrawer] = useState<boolean>(false);
    var [initialValues, setInitialValues] = useState<IValues>(
        {
            submission_date: "",
            status: "",
            applicant_id: "",
            first_name: "",
            middle_name: "",
            last_name: "",
            suffix_name: "",
            application_type: "",
            contact_number: "",
            email_address: "",
            employee_id: "",
            position_title: "",


        }
    );

    // Use Effect Hook

    useEffect(() => {
        // query
        async function getData() {
            const postData = {
                activePage: activePage,
                searchKeyword: searchKeyword,
                orderBy: orderBy,
                orderAscending: orderAscending
            };
            const resp = await HttpService.post("search-applicant", postData);
            if (resp != null) {
                setData(resp.data.data);
                setPages(resp.data.pages);
            }
        }


        getData();
    }, [refresh, searchKeyword, orderBy, orderAscending, pagination, activePage]);

    useEffect(() => {
        if (id == 0) {
            setInitialValues({
                submission_date: '',
                status: '',
                applicant_id: '',
                first_name: '',
                middle_name: '',
                last_name: '',
                suffix_name: '',
                application_type: '',
                contact_number: '',
                email_address: '',
                employee_id: '',
                position_title: ''

            });
        }

    }, [id]);

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
            const resp = await HttpService.get("applicant/" + id);
            // const data = resp.data.data.attributes;
            if (resp.status === 200) {
                setId(id);
                setInitialValues({
                    submission_date: resp.data.submission_date,
                    status: resp.data.status,
                    applicant_id: resp.data.applicant_id,
                    first_name: resp.data.first_name,
                    middle_name: resp.data.middle_name,
                    last_name: resp.data.last_name,
                    suffix_name: resp.data.suffix_name,
                    contact_number: resp.data.contact_number,
                    email_address: resp.data.email_address,
                    application_type: resp.data.application_type,
                    employee_id: resp.data.employee_id,
                    position_title: resp.data.position_title
                })
                setShowDrawer(true);

            }
        }
        catch (error: any) {
        }

    };


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
            submission_date: values.submission_date,
            applicant_id: values.applicant_id,
            status: values.status,
            first_name: values.first_name,
            middle_name: values.middle_name,
            last_name: values.last_name,
            suffix_name: values.suffix_name,
            contact_number: values.contact_number,
            email_address: values.email_address,
            application_type: values.application_type,
            employee_id: values.employee_id,
            posistion_title: values.position_title,
            device_name: "web",
        };

        alerts.forEach(element => {
            alerts.pop();
        });

        try {
            // add
            if (process == "Add") {

                const resp = await HttpService.post("applicant", postData);
                if (resp.status === 200) {
                    let status = resp.data.status;
                    if (status === "Request was Successful") {
                        alerts.push({ "type": "success", "message": "Data has been successfully saved!" });
                        setActivePage(1);
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
                const resp = await HttpService.patch("applicant/" + id, postData)
                if (resp.status === 200) {
                    let status = resp.data.status;
                    if (resp.data.data != "" && typeof resp.data.data != "undefined") {
                        alerts.push({ "type": "success", "message": "Data has been successfully saved!" });
                        setActivePage(1);
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
                const resp = await HttpService.delete("applicant/" + id);
                if (resp.status === 200) {
                    let status = resp.data.status;
                    if (status === "Request was Successful") {
                        alerts.push({ "type": "success", "message": resp.data.message });
                        setActivePage(1);
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
                <Formik initialValues={initialValues} onSubmit={onFormSubmit} enableReinitialize={true}
                >

                    {({ errors, touched }) => (

                        // forms
                        <Form className='p-2' id="formik">
                            <div className='alert-container' id="alert-container">
                                {alerts.map((item, index) => {
                                    return (
                                        <Alert className='my-1' color={item.type} key={index} onDismiss={() => { clearAlert(index) }} > <span> <p><span className="font-medium">{item.message}</span></p></span></Alert>
                                    );
                                })}
                            </div>

                            {/*Submmion date*/}
                            <FormElement
                                name="submission_date"
                                label="Submission Date"
                                errors={errors}
                                touched={touched}
                            >

                                <Field
                                    id="submission_date"
                                    name="submission_date"
                                    placeholder="Enter Date"
                                    className="w-full p-4 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                                />

                            </FormElement>


                            {/* status */}
                            <FormElement
                                name="status"
                                label="Status"
                                errors={errors}
                                touched={touched}
                            >
                                <Field
                                    id="status"
                                    name="status"
                                    placeholder="Enter status"
                                    className="w-full p-4 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                                    onClick={() => { setAlerts([]); }}
                                />
                            </FormElement>


                            {/* applicant id */}
                            <FormElement
                                name="applicant_id"
                                label="Applicant ID"
                                errors={errors}
                                touched={touched}
                            >
                                <Field
                                    id="applicant_id"
                                    name="applicant_id"
                                    placeholder="Enter applicant ID"
                                    className="w-full p-4 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                                    onClick={() => { setAlerts([]); }}
                                />
                            </FormElement>

                            {/* first name */}
                            <FormElement
                                name="first_name"
                                label="First Name"
                                errors={errors}
                                touched={touched}
                            >
                                <Field
                                    id="first_name"
                                    name="first_name"
                                    placeholder="Enter first name"
                                    className="w-full p-4 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                                    onClick={() => { setAlerts([]); }}
                                />
                            </FormElement>

                            {/* middle name */}
                            <FormElement
                                name="middle_name"
                                label="Middle Name"
                                errors={errors}
                                touched={touched}
                            >
                                <Field
                                    id="middle_name"
                                    name="middle_name"
                                    placeholder="Enter middle name"
                                    className="w-full p-4 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                                    onClick={() => { setAlerts([]); }}
                                />
                            </FormElement>

                            {/* last name */}
                            <FormElement
                                name="last_name"
                                label="Last Name"
                                errors={errors}
                                touched={touched}
                            >
                                <Field
                                    id="last_name"
                                    name="last_name"
                                    placeholder="Enter last name"
                                    className="w-full p-4 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                                    onClick={() => { setAlerts([]); }}
                                />
                            </FormElement>

                            {/* suffix name */}
                            <FormElement
                                name="suffix_name"
                                label="Suffix Name"
                                errors={errors}
                                touched={touched}
                            >
                                <Field
                                    id="suffix_name"
                                    name="suffix_name"
                                    placeholder="Enter suffix name"
                                    className="w-full p-4 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                                    onClick={() => { setAlerts([]); }}
                                />
                            </FormElement>

                            {/* application type */}
                            <FormElement
                                name="application_type"
                                label="Application Type"
                                errors={errors}
                                touched={touched}
                            >
                                <Field
                                    id="application_type"
                                    name="application_type"
                                    placeholder="Enter application type"
                                    className="w-full p-4 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                                    onClick={() => { setAlerts([]); }}
                                />
                            </FormElement>

                            {/* contact number */}
                            <FormElement
                                name="contact_number"
                                label="Contact Number"
                                errors={errors}
                                touched={touched}
                            >
                                <Field
                                    id="contact_number"
                                    name="contact_number"
                                    placeholder="Enter contact number"
                                    className="w-full p-4 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                                    onClick={() => { setAlerts([]); }}
                                />
                            </FormElement>

                            {/* email address */}
                            <FormElement
                                name="email_address"
                                label="Email Address"
                                errors={errors}
                                touched={touched}
                            >
                                <Field
                                    id="email_address"
                                    name="email_address"
                                    placeholder="Enter email address"
                                    className="w-full p-4 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                                    onClick={() => { setAlerts([]); }}
                                />

                            </FormElement>

                            {/* job title */}
                            <FormElement
                                name="position_title"
                                label="Job Title"
                                errors={errors}
                                touched={touched}
                            >
                                <Field
                                    as="select"
                                    id="position_title"
                                    name="position_title"
                                    placeholder="Enter job Title"
                                    className="w-full p-4 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                                    onClick={() => { setAlerts([]); }}
                                >

                                    <option value=""></option>
                                    {positions.map((item: position, index) => {
                                        return (
                                            <option key={index} value={item.id}>{item.attributes.title}</option>
                                        );
                                    })}
                                    <option value=""></option>
                                    {positions.map((item: position, index) => {
                                        return (
                                            <option key={index} value={item.id}>{item.attributes.title}</option>
                                        );
                                    })}

                                </Field>
                            </FormElement>

                            {/* employee ID */}
                            <FormElement
                                name="employee_id"
                                label="Capitol Employee"
                                errors={errors}
                                touched={touched}
                            >
                                <Field
                                    id="employee_id"
                                    name="employee_id"
                                    placeholder="Enter if capitol employee"
                                    className="w-full p-4 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                                    onClick={() => { setAlerts([]); }}
                                />
                            </FormElement>

                            {/* submit button */}

                            <div className="grid grid-flow-row auto-rows-max mt-5">
                                <button type="submit" className={`py-2 px-4   ${(process == "Delete" ? "bg-red-500" : "bg-cyan-500")}  text-white font-semibold rounded-lg focus:scale-90 shadow-sm mx-auto`} >
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

                        <Button className='btn btn-sm text-white rounded-lg bg-cyan-500  hover:scale-90 shadow-sm text' onClick={() => {
                            setShowDrawer(true);
                            setId(0);
                            setProcess("Add");
                        }} onDoubleClick={() => { setShowDrawer(false); }}>Add {title}
                        </Button>


                        {/*Table*/}
                        <Table
                            searchKeyword={searchKeyword}
                            setSearchKeyword={setSearchKeyword}
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
                            getDataById={getDataById}
                            setProcess={setProcess}


                        //   searchKeyword?: string,
                        // setSearchKeyword: Function,
                        // getDataById?: Function,
                        // buttons?: button[],
                        // year?: number,
                        // setYear?: Function,
                        // filters: filter[],
                        // setFilters: Function,
                        // orderBy: string,
                        // setOrderBy: Function,
                        // orderAscending: boolean,
                        // setOrderAscending: Function,
                        // pagination: number,
                        // setpagination: Function,
                        // data: row[],
                        // pages: number,
                        // activePage: number,
                        // setActivePage: Function,
                        // headers: header[]
                        // setId: Function,
                        // setReload: Function,
                        // reload: boolean,
                        // setProcess?: Function,
                        // children?: ReactNode,
                        // checkbox?: boolean,
                        // hideTotal?: boolean,
                        // setSelected?: Function,
                        // selected?: string[],
                        />
                    </Tabs.Item>
                </Tabs.Group >
            </div>
        </>
    );
}

export default SalaryGradeTabs