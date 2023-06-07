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

// interfaces

interface IValues {
    office_code?: string;
    office_name?: string;
    department_id?: string;
}

type department = {
    id: string;
    attributes: {
        department_name: string;
        department_code: string;
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
    const [departments, setDepartments] = useState<department[]>([]);
    const [headers, setHeaders] = useState<string[]>([
        "title",
        "salary_grade",
        "monthly_salary",
        "education",
        "training",
        "experience",
        "eligibility",
        "competency",

    ]);
    const [pages, setPages] = useState<number>(1);
    const [data, setData] = useState<row[]>([]);
    const [title, setTitle] = useState<string>("Position");
    const [id, setId] = useState<number>(0);
    const [showDrawer, setShowDrawer] = useState<boolean>(false);
    var [initialValues, setInitialValues] = useState<IValues>(
        {
            office_code: "",
            office_name: "",
            department_id: ""
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
            const resp = await HttpService.post("search-position", postData);
            if (resp != null) {
                console.log (resp);
                setData(resp.data.data);
                setPages(resp.data.pages);
            }
        }


        getData();
    }, [refresh, searchKeyword, orderBy, orderAscending, pagination, activePage]);

    useEffect(() => {
        // get departments
        async function getDepartments() {
            const resp = await HttpService.get("department");
            if (resp != null) {
                setDepartments(resp.data.data);
            }
        }


        getDepartments();
    }, []);

    useEffect(() => {
        if (id == 0) {
            setInitialValues({
                office_code: '',
                office_name: '',
                department_id: ''
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
            const resp = await HttpService.get("office/" + id);
            if (resp.status === 200) {
                setId(id);
                setInitialValues({
                    office_code: resp.data.office_code,
                    office_name: resp.data.office_name,
                    department_id: resp.data.department_id
                });
                setShowDrawer(true);
                console.log(resp.data);

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
            office_code: values.office_code,
            office_name: values.office_name,
            department_id: values.department_id,
            device_name: "web",
        };

        alerts.forEach(element => {
            alerts.pop();
        });

        try {
            // add
            if (process == "Add") {

                const resp = await HttpService.post("office", postData);
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
                const resp = await HttpService.patch("office/" + id, postData)
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
                const resp = await HttpService.delete("office/" + id);
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


                            {/* Code */}
                            <FormElement
                                name="title"
                                label="Position Title"
                                errors={errors}
                                touched={touched}
                            >
                                <Field
                                    id="title"
                                    name="title"
                                    placeholder="Enter Title"
                                    className="w-full p-4 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                                    onClick={() => { setAlerts([]); }}
                                />
                            </FormElement>


                            {/* Salary Grade*/}
                            <FormElement
                                name="salary_grade"
                                label="Salary Grade"
                                errors={errors}
                                touched={touched}
                            >

                                <Field as="select"
                                    id="salary_grade"
                                    name="salary_grade"
                                    placeholder="Enter salary"
                                    className="w-full p-4 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                                    title="Select Salary Grade"
                                >
                                    <option value=""></option>
                                    {departments.map((item: department, index) => {
                                        return (
                                            <option key={index} value={item.id}>{item.attributes.department_name}</option>
                                        );
                                    })}


                                </Field>

                            </FormElement>


                             {/* Education */}
                             <FormElement
                                name="education"
                                label="Education"
                                errors={errors}
                                touched={touched}
                            >

                                <Field
                                    id="education"
                                    name="education"
                                    placeholder="Enter Education"
                                    className="w-full p-4 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                                />

                            </FormElement>


                            {/* Training */}
                            <FormElement
                                name="training"
                                label="Training"
                                errors={errors}
                                touched={touched}
                            >

                                <Field
                                    id="training"
                                    name="training"
                                    placeholder="Enter Training"
                                    className="w-full p-4 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                                />

                            </FormElement>


                             {/* Experience*/}
                             <FormElement
                                name="experience"
                                label="Experience"
                                errors={errors}
                                touched={touched}
                            >

                                <Field
                                    id="experience"
                                    name="experience"
                                    placeholder="Enter Experience"
                                    className="w-full p-4 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                                />

                            </FormElement>


                             {/* Eligibility*/}
                             <FormElement
                                name="eligibility"
                                label="Eligibility"
                                errors={errors}
                                touched={touched}
                            >

                                <Field
                                    id="eligibility"
                                    name="eligibility"
                                    placeholder="Enter Eligibility"
                                    className="w-full p-4 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                                />

                            </FormElement>


                             {/*Competency*/}
                             <FormElement
                                name="competency"
                                label="Competency"
                                errors={errors}
                                touched={touched}
                            >

                                <Field
                                    id="competency"
                                    name="competency"
                                    placeholder="Enter Competency"
                                    className="w-full p-4 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
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
                        }} onDoubleClick={() => {setShowDrawer(false); }}>Add {title}
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
                        />
                    </Tabs.Item>
                </Tabs.Group >
            </div>
        </>
    );
}

export default SalaryGradeTabs