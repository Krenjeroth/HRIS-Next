"use client";
import { Button, Tabs, TabsRef } from 'flowbite-react';
import React, { ReactNode, useEffect, useRef, createContext, useContext } from 'react';
import { useState } from 'react';
import Table from "../components/Table";
import HttpService from '../../../lib/http.services';
import Drawer from '../components/Drawer';
import { Form, Formik, FormikContext, FormikHelpers, useFormikContext } from 'formik';
import { FormElement } from '@/app/components/commons/FormElement';
import { setFormikErrors } from '../../../lib/utils.service';
import { Alert } from 'flowbite-react';
import dayjs from 'dayjs';
import DatePicker from '../components/DatePicker'
import DataList from '@/app/components/DataList';
import { ArrowRightIcon, HandThumbUpIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
import { useRouter } from "next/navigation";
import PDS from '../components/PDS';
import { IValues, formContextType, child, school } from '../types/pds';
import PDSContextProvider from '../contexts/PDSContext';
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
}

type filter = {
    column: string;
    value: string;
}










//main function

function AllRequestsTabs() {


    // variables
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<number>(1);
    const tabsRef = useRef<TabsRef>(null);
    const props = { setActiveTab, tabsRef };
    const [children, setChildren] = useState<child[]>([]);
    const [schools, setSchools] = useState<school[]>([{
        level: '',
        name: '',
        degree: '',
        period_from: '',
        period_to: '',
        highest_unit_earned: '',
        year_graduated: '',
        scholarship_academic_awards: ''
    },
    {
        level: '',
        name: '',
        degree: '',
        period_from: '',
        period_to: '',
        highest_unit_earned: '',
        year_graduated: '',
        scholarship_academic_awards: ''
    },
    {
        level: '',
        name: '',
        degree: '',
        period_from: '',
        period_to: '',
        highest_unit_earned: '',
        year_graduated: '',
        scholarship_academic_awards: ''
    }]);
    // props.setActiveTab(1);
    const [activePage, setActivePage] = useState<number>(1);
    const [filters, setFilters] = useState<filter[]>([]);
    const [orderBy, setOrderBy] = useState<string>('');
    const [alerts, setAlerts] = useState<alert[]>([]);
    const [buttons, setButtons] = useState<button[]>([
        { "icon": <PencilIcon className=' w-5 h-5' />, "title": "Edit", "process": "Edit", "class": "text-blue-600" },
        { "icon": <HandThumbUpIcon className=' w-5 h-5' />, "title": "Approve", "process": "Approve", "class": "text-green-500" },
        { "icon": <ArrowRightIcon className=' w-5 h-5' />, "title": "Queue", "process": "Queue", "class": "text-slate-500" },
        { "icon": <TrashIcon className=' w-5 h-5' />, "title": "Delete", "process": "Delete", "class": "text-red-600" }
    ]);
    const [refresh, setRefresh] = useState<boolean>(false);
    const [orderAscending, setOrderAscending] = useState<boolean>(false);
    const [isLoading, setLoading] = useState<boolean>(false);
    const [pagination, setpagination] = useState<number>(1);
    const [process, setProcess] = useState<string>("Add");
    const [year, setYear] = useState<number>(parseInt(dayjs().format('YYYY')));
    const [headers, setHeaders] = useState<header[]>([
        { "column": "id", "display": "id" },
        { "column": "employee_id", "display": "Employee ID" },
        { "column": "first_name", "display": "First Name" },
        { "column": "middle_name", "display": "Middle Name" },
        { "column": "last_name", "display": "Last Name" },
        { "column": "suffix_name", "display": "Suffix" },
        { "column": "title", "display": "Position" },
        { "column": "item_number", "display": "Plantilla" },
        { "column": "contact_number", "display": "Contact Number" },
        { "column": "email_address", "display": "Email" },
        { "column": "employee_status", "display": "Employee Status" }
    ]);


    const [readOnly, setReadOnly] = useState<boolean>(false);
    const [pages, setPages] = useState<number>(0);
    const [data, setData] = useState<row[]>([]);
    const [title, setTitle] = useState<string>("Employee");
    const [positionKeyword, setPositionKeyword] = useState<string>("");
    const [positionData, setPositionData] = useState<datalist[]>([]);
    const [id, setId] = useState<number>(0);
    const [reload, setReload] = useState<boolean>(true);
    const [showDrawer, setShowDrawer] = useState<boolean>(false);
    const [defaultData, setDefaultData] = useState<IValues>({

        // personal information
        employee_id: '',
        employee_type: '',
        first_name: '',
        middle_name: '',
        last_name: '',
        suffix: '',
        birth_place: '',
        birth_date: '',
        age: 0,
        sex: '',
        height: 0,
        weight: 0,
        citizenship: '',
        citizenship_type: '',
        country: '',
        blood_type: '',
        civil_status: '',
        tin: '',
        gsis: '',
        pagibig: '',
        philhealth: '',
        sss: '',
        residential_province: '',
        residential_municipality: '',
        residential_barangay: '',
        residential_house: '',
        residential_subdivision: '',
        residential_street: '',
        residential_zipcode: '',
        permanent_province: '',
        permanent_municipality: '',
        permanent_barangay: '',
        permanent_house: '',
        permanent_subdivision: '',
        permanent_street: '',
        permanent_zipcode: '',
        telephone: '',
        mobile: '',
        email: '',
        spouse_first_name: '',
        spouse_middle_name: '',
        spouse_last_name: '',
        spouse_suffix: '',
        spouse_occupation: '',
        spouse_employer: '',
        spouse_employer_address: '',
        spouse_employer_telephone: '',
        children: children,
        father_first_name: '',
        father_middle_name: '',
        father_last_name: '',
        father_suffix: '',
        mother_first_name: '',
        mother_middle_name: '',
        mother_last_name: '',
        mother_suffix: '',
        schools: schools
        // family

    });
    var [initialValues, setValues] = useState<IValues>(
        defaultData
    );

    function resetFormik() {
        setValues(defaultData);
    }


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
            const resp = await HttpService.post("search-employee", postData);
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
                positionStatus: ['Permanent', 'Coterminous', 'Elective', 'Casual']
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
        if (id == 0) {
            setValues(defaultData);
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
        if (process === "Delete") {
            setAlerts([{ "type": "failure", "message": "Are you sure to delete this data?" }]);
            setReadOnly(true);
        }
        else if (process === "Approve") {
            setAlerts([{ "type": "info", "message": "Approve Request?" }])
            setReadOnly(true);
        }
        else if (process === "Queue") {
            setAlerts([{ "type": "warning", "message": "Queue Request?" }])
            setReadOnly(true);
        }
        else {
            setAlerts([]);
            setReadOnly(false);
        }
    }, [process]);


    //    get data by id
    const getDataById = async (id: number) => {

        try {
            const resp = await HttpService.get("vacancy/" + id);
            if (resp.status === 200) {
                let data = resp.data;
                setValues(defaultData);
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
        console.log(values);
        const postData = {
            employee_id: values.employee_id,
            date_approved: values.date_approved,
            date_queued: values.date_queued,
            posting_date: values.posting_date,
            closing_date: values.closing_date,
            birth_date: values.birth_date,
            position: values.position,
            device_name: "web",
            process: process,
            status: "Active"
        };


        alerts.forEach(element => {
            alerts.pop();
        });


        try {
            // add
            if (process === "Add") {
                const resp = await HttpService.post("vacancy", postData);
                if (resp.status === 200) {
                    let status = resp.data.status;
                    if (status === "Request was Successful") {
                        alerts.push({ "type": "success", "message": "Data has been successfully saved!" });
                        resetForm({});
                        resetFormik();
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
            // update
            else if (process === "Edit") {

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

            // approve and queue
            else if (process === "Approve" || process === "Queue") {
                if (id != 0) {
                    if (process === "Approve") {
                        postData.status = "Approved";
                    }
                    if (process == "Queue") {
                        postData.status = "Queued";
                    }
                    const resp = await HttpService.patch("vacancy/" + id, postData)
                    if (resp.status === 200) {
                        let status = resp.data.status;
                        if (resp.data.data != "" && typeof resp.data.data != "undefined") {
                            alerts.push({ "type": "success", "message": `Data has been  successfully ${postData.status} !` });
                            resetForm({});
                            resetFormik();
                            setActivePage(1);
                            setFilters([]);
                            setRefresh(!refresh);
                            setId(0);
                        }
                        else {
                            if (typeof resp.data != "undefined") {
                                alerts.push({ "type": "failure", "message": resp.data.message });
                            }
                        }
                    }
                }
                else {
                    setProcess("Add");
                }
            }

            // delete
            else {
                if (id != 0) {
                    const resp = await HttpService.delete("vacancy/" + id);
                    if (resp.status === 200) {
                        let status = resp.data.status;
                        if (status === "Request was Successful") {
                            alerts.push({ "type": "success", "message": resp.data.message });
                            setActivePage(1);
                            setFilters([]);
                            setRefresh(!refresh);
                            setId(0);

                        }
                        else {
                            if (typeof resp.data != "undefined") {
                                alerts.push({ "type": "failure", "message": resp.data.message });
                            }
                        }
                    }
                }
                else {
                    setProcess("Add");
                    // setShowDrawer(false);
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

    const updateAddress = () => {

        // console.log("testing");
    };


    // tsx
    return (
        <>
            {/* drawer */}
            <Drawer width='w-3/4' setShowDrawer={setShowDrawer} setProcess={setProcess} showDrawer={showDrawer} setId={setId} title={`${process} ${title}`}>
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
                            <PDSContextProvider
                                isLoading={isLoading}
                                setChildren={setChildren}
                                updateAddress={updateAddress}
                                errors={errors}
                                touched={touched}
                                initialValues={initialValues}
                                setValues={setValues}>
                                <PDS />
                            </PDSContextProvider>

                            {/* submit button */}

                            {/* <div className="grid grid-flow-row auto-rows-max mt-5">
                                <button type={(isLoading ? "button" : "submit")} className={`py-2 px-4   ${(process == "Delete" ? "bg-red-500" : "bg-cyan-500")}  text-white font-semibold rounded-lg focus:scale-90 shadow-sm mx-auto`} >
                                    {(process == "Delete" ? "Delete" : "Submit")}
                                </button>
                            </div> */}
                        </Form>
                    )}
                </Formik>
            </Drawer>
            <div className={`${showDrawer ? "blur-[1px]" : ""}`}>


                {/*  Tabs */}
                <Tabs.Group
                    aria-label="Tabs with underline"
                    style="underline"
                    ref={props.tabsRef}
                // onActiveTabChange={(tab) => {
                //     // if (tab == 1) {
                //     //     router.push('/vacancy/approved');
                //     // }
                //     // else if (2) {
                //     //     router.push('/vacancy/queued');
                //     // }

                // }}

                >

                    <Tabs.Item title={title + "s"} active>

                        <Button className='btn btn-sm text-white rounded-lg bg-cyan-500  hover:scale-90 hover:bg-cyan-400 shadow-sm text' onClick={() => {
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
                            setYear={setYear}
                        >
                        </Table>

                    </Tabs.Item>

                </Tabs.Group >

            </div >
        </>
    );
}

export default AllRequestsTabs