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
import { header } from '@/app/types/pds';
import moment from 'moment';



// types

type row = {
    id: string,
    attributes: object[]
}

type alert = {
    type: string,
    message: string
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
    division: string;
    position_id: string;
    position: string;
    position_autosuggest: string;
    status: string;
    posting_date: string,
    closing_date: string,
    publication_status: string,
}


//main function

function AllRequestsTabs() {


    // variables
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<number>(1);
    const tabsRef = useRef<TabsRef>(null);
    const props = { setActiveTab, tabsRef };
    // props.setActiveTab(1);
    const [activePage, setActivePage] = useState<number>(1);
    var [filters, setFilters] = useState<filter[]>([]);
    const [orderBy, setOrderBy] = useState<string>('');
    const [alerts, setAlerts] = useState<alert[]>([]);
    const [buttons, setButtons] = useState<button[]>([
        { "icon": <PencilIcon className=' w-5 h-5' />, "title": "Edit", "process": "Edit", "class": "text-blue-600" },
        { "icon": <BackspaceIcon className=' w-5 h-5' />, "title": "Reactivate", "process": "Reactivate", "class": "text-indigo-600" },
        { "icon": <EyeIcon className=' w-5 h-5' />, "title": "View", "process": "View", "class": "text-green-500", "link": "/vacancy/" }
    ]);
    const [refresh, setRefresh] = useState<boolean>(false);
    const [orderAscending, setOrderAscending] = useState<boolean>(false);
    const [isLoading, setLoading] = useState<boolean>(false);
    const [pagination, setpagination] = useState<number>(1);
    const [process, setProcess] = useState<string>("Edit");
    const [year, setYear] = useState<number>(parseInt(dayjs().format('YYYY')));
    const [headers, setHeaders] = useState<header[]>([
        { "column": "id", "display": "id" },
        { "column": "date_submitted", "display": "Date Submitted", "format": "MM/DD/YYYY" },
        { "column": "item_number", "display": "Item Number" },
        { "column": "title", "display": "Position" },
        { "column": "number", "display": "Salary Grade" },
        { "column": "amount", "display": "Monthly Salary" },
        { "column": "office_name", "display": "Office" },
        { "column": "division_name", "display": "Division/Section/Unit" },
        { "column": "date_approved", "display": "Date Approved", "format": "MM/DD/YYYY" },
        { "column": "posting_date", "display": "Posting Date", "format": "MM/DD/YYYY" },
        { "column": "closing_date", "display": "Closing Date", "format": "MM/DD/YYYY" },
        { "column": "publication_status", "display": "Publication Status" },
    ]);

    const [pages, setPages] = useState<number>(0);
    const [data, setData] = useState<row[]>([]);
    const [title, setTitle] = useState<string>("Approved Request");
    const [positionKeyword, setPositionKeyword] = useState<string>("");
    const [positionData, setPositionData] = useState<datalist[]>([]);
    const [posting_date, setPostingDate] = useState<string>("");
    const [closing_date, setClosingDate] = useState<string>("");
    const [id, setId] = useState<number>(0);
    const [reload, setReload] = useState<boolean>(true);
    const [showDrawer, setShowDrawer] = useState<boolean>(false);
    var [initialValues, setValues] = useState<IValues>(
        {
            date_submitted: '',
            division: '',
            position_id: '',
            position: '',
            position_autosuggest: '',
            status: '',
            date_approved: '',
            posting_date: '',
            closing_date: '',
            publication_status: '',
        }
    );
    const initialValueContext = createContext();

    function resetFormik() {
        setValues({
            date_submitted: '',
            division: '',
            position_id: '',
            position: '',
            position_autosuggest: '',
            status: '',
            date_approved: '',
            posting_date: '',
            closing_date: '',
            publication_status: '',
        });
    }

    // Use Effect Hook


    useEffect(() => {
        // query
        let newArrayFilter = [...filters];

        // add year to filter
        newArrayFilter.push({
            column: "date_submitted",
            value: String(year)
        });

        newArrayFilter.push({
            column: "vacancies.status",
            value: 'Approved'
        });
        async function getData() {
            const postData = {
                activePage: activePage,
                filters: newArrayFilter,
                orderBy: orderBy,
                year: year,
                orderAscending: orderAscending
            };
            const resp = await HttpService.post("search-vacancy", postData);
            if (resp != null) {
                setData(resp.data.data);
                setPages(resp.data.pages);
            }
        }
        getData();
    }, [refresh, filters, orderBy, orderAscending, pagination, activePage, year]);


    // Get LGU Positions
    useEffect(() => {
        // query
        async function getLGUPositions() {
            const postData = {
                activePage: 1,
                filters: [{ 'column': 'lgu_positions.status', 'value': 'Active' }],
                orderBy: 'title',
                year: '',
                orderAscending: "asc",
                positionStatus: ['Permanent']
            };
            const resp = await HttpService.post("search-lgu-position", postData);
            if (resp != null) {
                setPositionData(
                    resp.data.data.map((data: any) => {
                        return {
                            "id": data.id,
                            "label": data.attributes.label
                        }
                    })
                );
            }
        }
        getLGUPositions();
    }, [positionKeyword]);


    useEffect(() => {
        setAlerts([]);
        if (id == 0) {
            setValues({
                date_submitted: '',
                division: '',
                position_id: '',
                position: '',
                position_autosuggest: '',
                status: '',
                date_approved: '',
                posting_date: '',
                closing_date: '',
                publication_status: '',
            });
        }
        else {
            resetFormik();
            getDataById(id);
        }
    }, [id, reload]);


    useEffect(() => {
        if (!showDrawer) {
            setId(0);
        }
    }, [showDrawer]);

    useEffect(() => {
        if (process === "Edit") {
            setAlerts([{ "type": "info", "message": "Edit Approved Request?" }])
        }
        else if (process === "Reactivate") {
            setAlerts([{ "type": "warning", "message": "Reactivate Request?" }])
        }
        else {
            setAlerts([]);
        }
    }, [process]);


    //    get data by id
    const getDataById = async (id: number) => {

        try {
            const resp = await HttpService.get("vacancy/" + id);
            if (resp.status === 200) {
                let data = resp.data;
                if (process === "Reactivate") {
                    setValues({
                        date_submitted: moment(data.date_submitted).format("MM/DD/YYYY"),
                        division: data.division_name,
                        position_id: data.lgu_position_id,
                        position: `${data.title} - ${data.item_number}`,
                        position_autosuggest: `${data.title} - ${data.item_number}`,
                        status: data.status,
                        date_approved: '',
                        posting_date: '',
                        closing_date: '',
                        publication_status: '',
                    });
                }
                else {
                    setValues({
                        date_submitted: moment(data.date_submitted).format("MM/DD/YYYY"),
                        division: data.division_name,
                        position_id: data.lgu_position_id,
                        position: `${data.title} - ${data.item_number}`,
                        position_autosuggest: `${data.title} - ${data.item_number}`,
                        status: data.status,
                        date_approved: moment(data.date_approved).format("MM/DD/YYYY"),
                        posting_date: moment(data.posting_date).format("MM/DD/YYYY"),
                        closing_date: moment(data.closing_date).format("MM/DD/YYYY"),
                        publication_status: data.publication_status,
                    });
                }
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
        values: any,
        { setSubmitting, resetForm, setFieldError }: FormikHelpers<IValues>
    ) => {
        setLoading(true);
        const postData = {
            date_submitted: values.date_submitted,
            date_approved: values.date_approved,
            posting_date: values.posting_date,
            closing_date: values.closing_date,
            publication_status: values.publication_status,
            position_id: values.position_id,
            position: values.position,
            device_name: "web",
            process: process,
            status: "Approved"
        };


        alerts.forEach(element => {
            alerts.pop();
        });


        try {
            if (process === "Edit") {
                const resp = await HttpService.patch("vacancy/" + id, postData)
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

            if (process === "Reactivate") {
                const resp = await HttpService.patch("vacancy/" + id, postData)
                if (resp.status === 200) {
                    let status = resp.data.status;
                    if (resp.data.data != "" && typeof resp.data.data != "undefined") {
                        resetFormik();
                        alerts.push({ "type": "success", "message": "Data has been successfully Reactivated!" });
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
        }
        catch (error: any) {
            if (error.response.status === 422) {
                setFormikErrors(error.response.data.errors, setFieldError);
            }
        }

        setLoading(false);

    };



    // tsx
    return (
        <>
            {/* drawer */}
            <Drawer width='w-1/3' setShowDrawer={setShowDrawer} setProcess={setProcess} showDrawer={showDrawer} setId={setId} title={`${process} ${title}`}>
                {/* formik */}
                <Formik initialValues={initialValues} onSubmit={onFormSubmit} enableReinitialize={true} validateOnBlur={false} validateOnChange={false}
                >
                    {({ setFieldValue, errors, touched, values }) => {

                        // get next working day
                        useEffect(() => {
                            async function getClosingData() {

                                const postData = {
                                    posting_date: posting_date,
                                };

                                const resp = await HttpService.post("get-closing-date", postData);
                                if (resp != null) {
                                    let data = resp.data.data;
                                    setFieldValue("closing_date", data);
                                }
                            }


                            if (posting_date != "") {
                                getClosingData();
                            }
                            else {
                            }

                        }, [posting_date]);

                        return (< Form className='p-2' id="formik" >
                            <div className='alert-container mb-2' id="alert-container">
                                {alerts.map((item, index) => {
                                    return (
                                        <Alert className='my-1' color={item.type} key={index} onDismiss={() => { clearAlert(index) }} > <span> <p><span className="font-medium">{item.message}</span></p></span></Alert>
                                    );
                                })}
                            </div>

                            {/* Date Submitted */}
                            <div className="">
                                <FormElement
                                    required={true}
                                    name="date_submitted"
                                    label="Date Submitted"
                                    errors={errors}
                                    touched={touched}
                                >

                                    <DatePicker
                                        id="date_submitted"
                                        readOnly={true}
                                        initialValues={initialValues}
                                        name="date_submitted"
                                        placeholderText="Enter Date"
                                        className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                                    />
                                </FormElement>

                                {/*Division*/}

                                <FormElement
                                    required={true}
                                    name="division"
                                    label="Division"
                                    errors={errors}
                                    touched={touched}
                                >
                                    <Field
                                        readOnly={true}
                                        id="division"
                                        name="division"
                                        placeholder="Division"
                                        className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                                        title="Select Salary Grade"
                                    />

                                </FormElement>


                                {/*Position*/}

                                <FormElement
                                    required={true}
                                    name="position"
                                    label="Position"
                                    errors={errors}
                                    touched={touched}
                                >
                                    <Field
                                        readOnly={true}
                                        id="position"
                                        name="position"
                                        placeholder="Position"
                                        className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                                        title="Select Salary Grade"
                                    />

                                </FormElement>
                            </div>


                            {/* Date Approved */}
                            <div className={process === "Reactivate" ? "hidden" : ""}>
                                <FormElement
                                    required={true}
                                    name="date_approved"
                                    label="Date Approved"
                                    errors={errors}
                                    touched={touched}
                                >
                                    <DatePicker
                                        id="date_approved"
                                        initialValues={initialValues}
                                        name="date_approved"
                                        placeholderText="Enter Date"
                                        className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                                    />
                                </FormElement>

                                <FormElement
                                    required={true}
                                    name="posting_date"
                                    label="Posting Date"
                                    errors={errors}
                                    touched={touched}
                                >
                                    <DatePicker
                                        id="posting_date"
                                        initialValues={initialValues}
                                        name="posting_date"
                                        placeholderText="Enter Date"
                                        setLocalValue={setPostingDate}
                                        className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                                    />
                                </FormElement>

                                <FormElement
                                    required={true}
                                    name="closing_date"
                                    label="Closing Date"
                                    errors={errors}
                                    touched={touched}
                                >
                                    <DatePicker
                                        id="closing_date"
                                        initialValues={initialValues}

                                        name="closing_date"
                                        placeholderText="Enter Date"
                                        className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                                    />
                                </FormElement>

                                {/*Publication Status*/}
                                <FormElement
                                    required={true}
                                    name="publication_status"
                                    label="Publication Status"
                                    errors={errors}
                                    touched={touched}
                                >

                                    <Field
                                        as="select"
                                        id="publication_status"
                                        name="publication_status"
                                        placeholder="Select Status"
                                        className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                                        title="Select Salary Grade"
                                    >
                                        <option value="Active">Active</option>
                                        <option value="Closed">Closed</option>
                                    </Field>

                                </FormElement>
                            </div>





                            {/* submit button */}

                            <div className="grid grid-flow-row auto-rows-max mt-5">
                                <button type={(isLoading ? "button" : "submit")} className="py-2 px-4   bg-blue-500 text-white font-semibold rounded-lg focus:scale-90 shadow-sm mx-auto" >
                                    Submit
                                </button>
                            </div>
                        </Form>
                        );
                    }
                    }
                </Formik>
            </Drawer >
            <div className={`${showDrawer ? "blur-[1px]" : ""}`}>


                {/*  Tabs */}
                <Tabs.Group
                    aria-label="Tabs with underline"
                    style="underline"
                    ref={props.tabsRef}
                    onActiveTabChange={(tab) => {
                        if (tab == 0) {
                            router.push('/vacancy/requests');
                        }
                        else if (tab == 2) {
                            router.push('/vacancy/queued');
                        }

                    }}

                >

                    <Tabs.Item title={"Requests"}>
                    </Tabs.Item>

                    <Tabs.Item title={title + "s"} active>

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
                            year={year}
                            setYear={setYear}
                        >
                        </Table>

                    </Tabs.Item>

                    <Tabs.Item title={"Queued Requests"}>
                    </Tabs.Item>
                </Tabs.Group >

            </div >
        </>
    );
}

export default AllRequestsTabs