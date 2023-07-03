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
import YearPicker from '../../components/YearPicker';
import dayjs from 'dayjs';

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
    item_number: string;
    office_id: string;
    position_id: string;
    year: number;
    description: string;
    place_of_assignment: string;
    status: string;
    position_status: string;
}

type office = {
    id: number;
    attributes: {
        office_code: string
        office_name: string
        department: string
    }
}

type position = {
    id: number;
    attributes: {
        amount: number,
        competency: string,
        education: string,
        eligibility: string,
        experience: string,
        training: string,
        number: number,
        title: string,
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
    const [offices, setOffices] = useState<office[]>([]);
    const [positions, setPositions] = useState<position[]>([]);
    const [headers, setHeaders] = useState<header[]>([
        { "column": "id", "display": "id" },
        { "column": "position_status", "display": "Position Status" },
        { "column": "title", "display": "Position" },
        { "column": "department_name", "display": "Department" },
        { "column": "office_name", "display": "Office" },
        { "column": "description", "display": "Description" },
        { "column": "item_number", "display": "Plantilla" },
        { "column": "status", "display": "Status" },
        { "column": "year", "display": "Year" },
        { "column": "number", "display": "Salary Grade" },
        { "column": "amount", "display": "Salary" },
        { "column": "education", "display": "education" },
        { "column": "training", "display": "training" },
        { "column": "experience", "display": "experience" },
        { "column": "eligibility", "display": "eligibility" },
        { "column": "competency", "display": "competency" },
    ]);
    const [pages, setPages] = useState<number>(1);
    const [data, setData] = useState<row[]>([]);
    const [title, setTitle] = useState<string>("Position");
    const [positionStatus, setPositionStatus] = useState<string[]>(['Casual', 'Elective', 'Coterminous', 'Contractual', 'Contract of Service', 'Job Order']);
    const [id, setId] = useState<number>(0);
    const [showDrawer, setShowDrawer] = useState<boolean>(false);
    var [initialValues, setInitialValues] = useState<IValues>(
        {
            item_number: "",
            office_id: "",
            position_id: "",
            year: parseInt(dayjs().format('YYYY')),
            description: "",
            place_of_assignment: "",
            status: "",
            position_status: "",
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
                orderAscending: orderAscending,
                positionStatus: positionStatus
            };
            const resp = await HttpService.post("search-lgu-position", postData);
            if (resp != null) {
                setData(resp.data.data);
                setPages(resp.data.pages);
            }
        }


        getData();
    }, [refresh, searchKeyword, orderBy, orderAscending, pagination, activePage]);

    useEffect(() => {
        async function getOffices() {
            const resp = await HttpService.get("office");
            if (resp != null) {
                setOffices(resp.data);
            }
        }

        getOffices();
    }, []);


    useEffect(() => {
        async function getPositions() {
            const resp = await HttpService.get("position");
            if (resp != null) {
                setPositions(resp.data);
            }
        }

        getPositions();
    }, []);

    useEffect(() => {
        if (id == 0) {
            setInitialValues({
                item_number: "",
                office_id: "",
                position_id: "",
                year: parseInt(dayjs().format('YYYY')),
                description: "",
                place_of_assignment: "",
                status: "",
                position_status: "",
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
            setAlerts([]);
            const resp = await HttpService.get("lgu-position/" + id);
            const data = resp.data.data.attributes;
            if (resp.status === 200) {
                setId(id);
                setInitialValues({
                    item_number: data.item_number,
                    office_id: data.office_id,
                    position_id: data.position_id,
                    year: parseInt(data.year),
                    description: data.description,
                    place_of_assignment: data.place_of_assignment,
                    status: data.status,
                    position_status: data.position_status,
                });
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
            item_number: values.item_number,
            office_id: values.office_id,
            position_id: values.position_id,
            year: values.year,
            description: values.description,
            place_of_assignment: values.place_of_assignment,
            status: values.status,
            position_status: values.position_status,
            device_name: "web",
        };

        alerts.forEach(element => {
            alerts.pop();
        });

        try {
            // add
            if (process == "Add") {
                const resp = await HttpService.post("lgu-position", postData);
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
                const resp = await HttpService.patch("lgu-position/" + id, postData)
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
                const resp = await HttpService.delete("lgu-position/" + id);
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
            <Drawer width='w-4/12' setShowDrawer={setShowDrawer} setProcess={setProcess} showDrawer={showDrawer} setId={setId} title={`${process} ${title}`}>

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

                            <div className='grid grid-cols-2 gap-2'>
                                {/* Item Number */}
                                <FormElement
                                    name="item_number"
                                    label="Item Number *"
                                    errors={errors}
                                    touched={touched}
                                >
                                    <Field
                                        id="item_number"
                                        name="item_number"
                                        placeholder="Enter Item Number"
                                        className="w-full p-4 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                                        onClick={() => { setAlerts([]); }}
                                    />
                                </FormElement>

                                {/* Year */}

                                <FormElement
                                    name="year"
                                    label="Year *"
                                    errors={errors}
                                    touched={touched}
                                >

                                    <YearPicker
                                        initialValues={initialValues}
                                        setInitialValues={setInitialValues}
                                        id="year"
                                        name="year"
                                        placeholder="Enter Date"
                                        className="w-full p-4 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                                    />


                                </FormElement>
                            </div>


                            {/* Position Status */}
                            <FormElement
                                name="position_status"
                                label="Position Status *"
                                errors={errors}
                                touched={touched}
                            >
                                <Field
                                    as="select"
                                    id="position_status"
                                    name="position_status"
                                    placeholder=""
                                    className="w-full p-4 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500">
                                    <option value="">Select Position Status</option>
                                    <option value='Casual'>Casual</option>
                                    <option value='Coterminous'>Coterminous</option>
                                    <option value='Contractual'>Contractual</option>
                                    <option value='Contract of Service'>Contract of Service</option>
                                    <option value='Elective'>Elective</option>
                                    <option value='Job Order'>Job Order</option>
                                </Field>
                            </FormElement>

                            {/*Office*/}
                            <FormElement
                                name="office_id"
                                label="Office *"
                                errors={errors}
                                touched={touched}
                            >

                                <Field
                                    as="select"
                                    id="office_id"
                                    name="office_id"
                                    placeholder=""
                                    className="w-full p-4 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                                    title="Select Salary Grade"
                                >
                                    <option value="">Select Office</option>
                                    {offices.map((item: office, index) => {
                                        return (
                                            <option key={index} value={item.id}>{item.attributes.department}-{item.attributes.office_name}</option>
                                        );
                                    })}


                                </Field>

                            </FormElement>


                            {/*Position*/}
                            <FormElement
                                name="position_id"
                                label={`Position *`}
                                errors={errors}
                                touched={touched}
                            >

                                <Field
                                    as="select"
                                    id="position_id"
                                    name="position_id"
                                    placeholder=""
                                    className="w-full p-4 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                                    title="Select Salary Grade"
                                >
                                    <option value="">Select Position</option>
                                    {positions.map((item: position, index) => {
                                        return (
                                            <option key={index} value={item.id}>{item.attributes.title}</option>
                                        );
                                    })}


                                </Field>

                            </FormElement>




                            {/* Position Description */}
                            <FormElement
                                name="description"
                                label="Description"
                                errors={errors}
                                touched={touched}
                            >

                                <Field
                                    as="textarea"
                                    id="description"
                                    name="description"
                                    placeholder="Enter Description "
                                    className="w-full p-4 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                                />

                            </FormElement>


                            {/* Place of Assignment */}
                            <FormElement
                                name="place_of_assignment"
                                label="Place of Assignment"
                                errors={errors}
                                touched={touched}
                            >

                                <Field
                                    as="textarea"
                                    id="place_of_assignment"
                                    name="place_of_assignment"
                                    placeholder="Enter Place of Assignment"
                                    className="w-full p-4 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                                />

                            </FormElement>


                            {/* Status */}
                            <FormElement
                                name="status"
                                label="Status *"
                                errors={errors}
                                touched={touched}
                            >

                                <Field
                                    as="select"
                                    id="status"
                                    name="status"
                                    placeholder=""
                                    className="w-full p-4 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500">
                                    <option value="">Select Status</option>
                                    <option value="Active">Active</option>
                                    <option value="Abolished">Abolished</option>
                                </Field>

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
                        />
                    </Tabs.Item>
                </Tabs.Group >
            </div>
        </>
    );
}

export default SalaryGradeTabs