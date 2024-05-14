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
import YearPicker from '../../components/YearPicker';
import dayjs from 'dayjs';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
import DataList from '../../components/DataList';

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

type filter = {
    column: string;
    value: string;
}


// interfaces

interface IValues {
    item_number: string;
    division_id: string;
    division: string;
    division_autosuggest: string;
    position_id: string;
    position: string;
    position_autosuggest: string;
    year: number;
    description: string;
    place_of_assignment: string;
    status: string;
    position_status: string;
}

type division = {
    id: number;
    attributes: {
        division_code: string
        division_name: string
        office: string
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

type button = {
    icon: ReactNode,
    title: string,
    process: string,
    class: string,

}

type datalist = {
    id: string,
    label: any
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
    const [divisions, setDivisions] = useState<datalist[]>([]);
    const [positions, setPositions] = useState<datalist[]>([]);
    const [positionKeyword, setPositionKeyword] = useState<string>('');
    const [divisionKeyword, setDivisionKeyword] = useState<string>('');
    const [headers, setHeaders] = useState<header[]>([
        { "column": "id", "display": "id" },
        { "column": "item_number", "display": "Plantilla" },
        { "column": "title", "display": "Position" },
        { "column": "description", "display": "Description" },
        { "column": "office_name", "display": "Office" },
        { "column": "division_name", "display": "Division/Section/Unit" },
        { "column": "status", "display": "Status" },
        { "column": "year", "display": "Year" },
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
    const [title, setTitle] = useState<string>("Plantilla");
    const [positionStatus, setPositionStatus] = useState<string[]>(['Permanent']);
    const [id, setId] = useState<number>(0);
    const [reload, setReload] = useState<boolean>(true);
    const [showDrawer, setShowDrawer] = useState<boolean>(false);
    const [year, setYear] = useState<number>(parseInt(dayjs().format('YYYY')));
    var [initialValues, setValues] = useState<IValues>(
        {
            item_number: "",
            division_id: "",
            division: "",
            division_autosuggest: "",
            position_id: "",
            position: "",
            position_autosuggest: "",
            year: parseInt(dayjs().format('YYYY')),
            description: "",
            place_of_assignment: "",
            status: "",
            position_status: "Permanent",
        }
    );

    const [buttons, setButtons] = useState<button[]>([
        { "icon": <PencilIcon className=' w-5 h-5' />, "title": "Edit", "process": "Edit", "class": "text-blue-600" },
        { "icon": <TrashIcon className=' w-5 h-5' />, "title": "Delete", "process": "Delete", "class": "text-red-600" }
    ]);

    // Use Effect Hook
    useEffect(() => {
        // query
        let newArrayFilter = [...filters];

        // add year to filter
        // newArrayFilter.push({
        //     column: "year",
        //     value: String(year)
        // });


        async function getData() {
            const postData = {
                positionStatus: ['Permanent'],
                activePage: activePage,
                filters: newArrayFilter,
                orderBy: orderBy,
                viewAll:true,
                orderAscending: orderAscending
            };
            const resp = await HttpService.post("search-lgu-position", postData);
            if (resp != null) {
                setData(resp.data.data);
                setPages(resp.data.pages);
            }
        }
        getData();

    }, [refresh, filters, orderBy, orderAscending, pagination, activePage, year]);


    // get positions
    useEffect(() => {
        async function getPositions() {
            const postData = {
                activePage: 1,
                filters: [{ column: 'title', value: positionKeyword }],
                orderAscending: 'asc'
            };
            const resp = await HttpService.post("search-position", postData);
            if (resp != null) {
                setPositions(resp.data.data);
            }
        }

        getPositions();
    }, [positionKeyword]);


    // get divisions
    useEffect(() => {

        async function getDivisions() {
            const postData = {
                multiFilter: true,
                activePage: 1,
                filters: [{ column: 'division_name', value: divisionKeyword }],
                orderAscending: 'asc',
            };
            const resp = await HttpService.post("search-division", postData);
            if (resp != null) {
                setDivisions(resp.data.data);
            }
        }

        getDivisions();
    }, [divisionKeyword]);

    useEffect(() => {
        if (id == 0) {
            setValues({
                item_number: "",
                division_id: "",
                division: "",
                division_autosuggest: "",
                position_id: "",
                position: "",
                position_autosuggest: "",
                year: parseInt(dayjs().format('YYYY')),
                description: "",
                place_of_assignment: "",
                status: "",
                position_status: "Permanent",
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
            setAlerts([]);
            const resp = await HttpService.get("lgu-position/" + id);
            const data = resp.data.data.attributes;
            if (resp.status === 200) {
                setValues({
                    item_number: data.item_number,
                    division_id: data.division_id,
                    division: data.division_name,
                    division_autosuggest: data.division_name,
                    position_id: data.position_id,
                    position: data.position,
                    position_autosuggest: data.position,
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



    function resetFormik() {
        setValues({
            item_number: "",
            division_id: "",
            division: "",
            division_autosuggest: "",
            position_id: "",
            position: "",
            position_autosuggest: "",
            year: parseInt(dayjs().format('YYYY')),
            description: "",
            place_of_assignment: "",
            status: "",
            position_status: "Permanent",
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
            item_number: values.item_number,
            division_id: values.division_id,
            position_id: values.position_id,
            year: values.year,
            description: values.description,
            place_of_assignment: values.place_of_assignment,
            status: values.status,
            position_status: "Permanent",
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
                const resp = await HttpService.patch("lgu-position/" + id, postData)
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
                const resp = await HttpService.delete("lgu-position/" + id);
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
            <Drawer width='w-4/12' setShowDrawer={setShowDrawer} setProcess={setProcess} showDrawer={showDrawer} setId={setId} title={`${process} ${title}`}>

                {/* formik */}
                <Formik initialValues={initialValues} onSubmit={onFormSubmit} enableReinitialize={true} validateOnBlur={false}  validateOnChange={false}
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
                            <div className=' grid grid-cols-2'>

                                {/* Item Number */}
                                <FormElement
                                    name="item_number"
                                    label="Item Number"
                                    errors={errors}
                                    touched={touched}
                                >
                                    <Field
                                        readOnly={(process === "Delete") ? true : false}
                                        id="item_number"
                                        name="item_number"
                                        placeholder="Enter Item Number"
                                        className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
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
                                        readOnly={(process === "Delete") ? true : false}
                                        initialValues={initialValues}
                                        setValues={setValues}
                                        id="year"
                                        name="year"
                                        placeholderText="Enter Date"
                                        className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                                    />


                                </FormElement>
                            </div>

                            {/*Division*/}

                            <DataList errors={errors} touched={touched}
                                readonly={process === "Delete" ? true : false}
                                id="division_id"
                                setKeyword={setDivisionKeyword}
                                label="Division/Section/Unit *"
                                title="Division/Section/Unit"
                                name="division"
                                initialValues={initialValues}
                                setValues={setValues}
                                data={divisions}
                                className=""
                            />

                            {/* positions */}
                            <DataList errors={errors} touched={touched}
                                readonly={process === "Delete" ? true : false}
                                id="position_id"
                                setKeyword={setPositionKeyword}
                                label="Position *"
                                title="Position"
                                name="position"
                                initialValues={initialValues}
                                setValues={setValues}
                                data={positions}
                                className=""
                            />



                            {/* Position Description */}
                            <FormElement
                                name="description"
                                label="Description"
                                errors={errors}
                                touched={touched}
                            >

                                <Field
                                    readOnly={(process === "Delete") ? true : false}
                                    as="textarea"
                                    id="description"
                                    name="description"
                                    placeholder="Enter Description "
                                    className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
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
                                    readOnly={(process === "Delete") ? true : false}
                                    as="textarea"
                                    id="place_of_assignment"
                                    name="place_of_assignment"
                                    placeholder="Enter Place of Assignment"
                                    className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
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
                                    disabled={(process === "Delete") ? true : false}
                                    as="select"
                                    id="status"
                                    name="status"
                                    placeholder=""
                                    className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500">
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
                            // year={year}
                            // setYear={setYear}
                        />
                    </Tabs.Item>
                </Tabs.Group >
            </div>
        </>
    );
}

export default SalaryGradeTabs