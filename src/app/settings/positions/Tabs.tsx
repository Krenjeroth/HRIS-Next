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

type salaryGrade = {
    id: string;
    attributes: {
        number: string;
        amount: number;
    }
}

type filter = {
    column: string;
    value: string;
}


// interfaces

interface IValues {
    code: string;
    title: string;
    salary_grade_id: string;
    education: string;
    training: string;
    experience: string;
    eligibility: string;
    competency: string;
}





//main function

function positionTabs() {



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
    const [salaryGrades, setsalaryGrades] = useState<salaryGrade[]>([]);

    const [headers, setHeaders] = useState<header[]>([
        { "column": "code", "display": "Code" },
        { "column": "title", "display": "title" },
        { "column": "number", "display": "Salary Grade" },
        { "column": "amount", "display": "Monthly Salary" },
        { "column": "education", "display": "education" },
        { "column": "training", "display": "training" },
        { "column": "experience", "display": "experience" },
        { "column": "eligibility", "display": "eligibility" },
        { "column": "competency", "display": "competency" },
    ]);
    const [pages, setPages] = useState<number>(0);
    const [data, setData] = useState<row[]>([]);
    const [title, setTitle] = useState<string>("Position");
    const [id, setId] = useState<number>(0);
    const [reload, setReload] = useState<boolean>(true);
    const [showDrawer, setShowDrawer] = useState<boolean>(false);
    var [initialValues, setValues] = useState<IValues>(
        {
            code: "",
            title: "",
            salary_grade_id: "",
            education: "",
            training: "",
            experience: "",
            eligibility: "",
            competency: ""
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
                orderAscending: orderAscending,
            };
            const resp = await HttpService.post("search-position", postData);
            if (resp != null) {
                setData(resp.data.data);
                setPages(resp.data.pages);
            }
        }


        getData();
    }, [refresh, filters, orderBy, orderAscending, pagination, activePage]);

    useEffect(() => {
        // get salary grade
        async function getsalaryGrades() {
            const resp = await HttpService.get("salary-grade");
            if (resp != null) {
                setsalaryGrades(resp.data);
            }
        }


        getsalaryGrades();
    }, []);

    useEffect(() => {
        if (id == 0) {
            setValues({
                code: '',
                title: '',
                salary_grade_id: '',
                education: '',
                training: '',
                experience: '',
                eligibility: '',
                competency: ''
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
        else if (process === "Edit") {
            setAlerts([]);
        }
        else {
            // setAlerts([]);
        }
    }, [process]);



    //    get data by id
    const getDataById = async (id: number) => {

        try {
            const resp = await HttpService.get("position/" + id);
            if (resp.status === 200) {
                setValues({
                    code: resp.data.code,
                    title: resp.data.title,
                    salary_grade_id: resp.data.salary_grade_id,
                    education: resp.data.education,
                    training: resp.data.training,
                    experience: resp.data.experience,
                    eligibility: resp.data.eligibility,
                    competency: resp.data.competency
                });
                setShowDrawer(true);

            }
        }
        catch (error: any) {
        }

    };

    function resetFormik() {
        setValues({
            code: '',
            title: '',
            salary_grade_id: '',
            education: '',
            training: '',
            experience: '',
            eligibility: '',
            competency: ''
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
            code: values.code,
            title: values.title,
            salary_grade_id: values.salary_grade_id,
            education: values.education,
            training: values.training,
            experience: values.experience,
            eligibility: values.eligibility,
            competency: values.competency,
            device_name: "web",

        };

        alerts.forEach(element => {
            alerts.pop();
        });

        try {
            // add
            if (process == "Add") {

                const resp = await HttpService.post("position", postData);
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
                const resp = await HttpService.patch("position/" + id, postData)
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
                const resp = await HttpService.delete("position/" + id);
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
            <Drawer width='w-1/3' setShowDrawer={setShowDrawer} setProcess={setProcess} showDrawer={showDrawer} setId={setId} title={`${process} ${title}`}>

                {/* formik */}
                <Formik initialValues={initialValues} onSubmit={onFormSubmit} enableReinitialize={true} validateOnBlur={false}  validateOnChange={false}
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

                            <div className='grid grid-cols-2'>




                                {/* Salary Grade*/}
                                <FormElement
                                    name="salary_grade_id"
                                    label="Salary Grade *"
                                    errors={errors}
                                    touched={touched}
                                >

                                    <Field

                                        disabled={(process === "Delete") ? true : false}
                                        as="select"
                                        id="salary_grade_id"
                                        name="salary_grade_id"
                                        placeholder="Enter alary"
                                        className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                                        title="Select Salary Grade"
                                    >
                                        <option value=""></option>
                                        {salaryGrades.map((item: salaryGrade, index) => {
                                            return (
                                                <option key={index} value={item.id}>{item.attributes.number}</option>
                                            );
                                        })}


                                    </Field>

                                </FormElement>

                                {/* code */}
                                <FormElement
                                    name="code"
                                    label="Position Code *"
                                    errors={errors}
                                    touched={touched}
                                >
                                    <Field

                                        readOnly={(process === "Delete") ? true : false}
                                        id="code"
                                        name="code"
                                        placeholder="Enter code"
                                        className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                                        onClick={() => { setAlerts([]); }}
                                    />
                                </FormElement>
                            </div>

                            {/* title */}
                            <FormElement
                                name="title"
                                label="Position Title *"
                                errors={errors}
                                touched={touched}
                            >
                                <Field

                                    readOnly={(process === "Delete") ? true : false}
                                    id="title"
                                    name="title"
                                    placeholder="Enter Title"
                                    className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                                    onClick={() => { setAlerts([]); }}
                                />
                            </FormElement>


                            {/* Education */}
                            <FormElement
                                name="education"
                                label="Education *"
                                errors={errors}
                                touched={touched}
                            >

                                <Field

                                    readOnly={(process === "Delete") ? true : false}
                                    as="textarea"
                                    id="education"
                                    name="education"
                                    placeholder="Enter Education"
                                    className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                                />

                            </FormElement>


                            {/* Training */}
                            <FormElement
                                name="training"
                                label="Training *"
                                errors={errors}
                                touched={touched}
                            >

                                <Field

                                    readOnly={(process === "Delete") ? true : false}
                                    as="textarea"
                                    id="training"
                                    name="training"
                                    placeholder="Enter Training"
                                    className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                                />

                            </FormElement>


                            {/* Experience*/}
                            <FormElement
                                name="experience"
                                label="Experience *"
                                errors={errors}
                                touched={touched}
                            >

                                <Field

                                    readOnly={(process === "Delete") ? true : false}
                                    as="textarea"
                                    id="experience"
                                    name="experience"
                                    placeholder="Enter Experience"
                                    className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                                />

                            </FormElement>


                            {/* Eligibility*/}
                            <FormElement
                                name="eligibility"
                                label="Eligibility *"
                                errors={errors}
                                touched={touched}
                            >

                                <Field

                                    readOnly={(process === "Delete") ? true : false}
                                    as="textarea"
                                    id="eligibility"
                                    name="eligibility"
                                    placeholder="Enter Eligibility"
                                    className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                                />

                            </FormElement>


                            {/*Competency*/}
                            <FormElement
                                name="competency"
                                label="Competency *"
                                errors={errors}
                                touched={touched}
                            >
                                <Field

                                    readOnly={(process === "Delete") ? true : false}
                                    as="textarea"
                                    id="competency"
                                    name="competency"
                                    placeholder="Enter Competency"
                                    className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
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
                             setValues(defaultData);
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

export default positionTabs