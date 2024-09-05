"use client";
import { Button, Tabs, TabsRef } from 'flowbite-react';
import React, { ReactNode, useEffect, useRef } from 'react';
import { useState } from 'react';
import Table from "../components/Table";
import HttpService from '../../../lib/http.services';
import Drawer from '../components/Drawer';
import { Form, Formik, FormikHelpers } from 'formik';
import { setFormikErrors } from '../../../lib/utils.service';
import { Alert } from 'flowbite-react';
import dayjs from 'dayjs';
import { ArrowLeftEndOnRectangleIcon, ArrowRightIcon, ClipboardIcon, EyeIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
import { useRouter } from "next/navigation";
import { InterviewIvalues, formContextType, email, filter, alert, button, row, header, Appointment } from '../types/pds';
import AppointmentContextProvider from '../contexts/AppointmentContext';
import { HiArchive, HiDownload, HiMail } from 'react-icons/hi';
import { MeetingForm } from '../components/Forms/MeetingForm';
import type { CustomFlowbiteTheme } from "flowbite-react";
import { AppointmentForm } from '../components/Forms/AppointmentForm';








//main function

function AllRequestsTabs() {

    const customTheme: CustomFlowbiteTheme["button"] = {
        color: {
            primary: "bg-red-500 hover:bg-red-600",
        },
    };



    // variables
    const router = useRouter();
    const formikRef = useRef(null);
    const [formikData, setFormikData] = useState<any>();
    const [formActiveTab, setFormActiveTab] = useState<number>(0);
    const [activeTab, setActiveTab] = useState<number>(0);
    const tabsRef = useRef<TabsRef>(null);
    const props = { setActiveTab, tabsRef };
    const [activePage, setActivePage] = useState<number>(1);
    const [filters, setFilters] = useState<filter[]>([]);
    const [orderBy, setOrderBy] = useState<string>('');
    const [alerts, setAlerts] = useState<alert[]>([]);
    const [buttons, setButtons] = useState<button[]>([
        { "icon": <PencilIcon className=' w-5 h-5' />, "title": "Edit", "process": "Edit", "class": "text-blue-600" },
        { "icon": <HiDownload className=' w-5 h-5' />, "title": "Download Notice of Meeting", "process": "Download", "class": "text-slate-600" },
        { "icon": <HiArchive className=' w-5 h-5' />, "title": "Download Initial Comparative Assessment Form", "process": "CAF", "class": "text-green-500" },
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
        { "column": "meeting_date", "display": "Meeting Date" },
        { "column": "name", "display": "Venue" }
    ]);

    const [readOnly, setReadOnly] = useState<boolean>(false);
    const [pages, setPages] = useState<number>(0);
    const [data, setData] = useState<row[]>([]);
    const [title, setTitle] = useState<string>("Appointment");
    const [id, setId] = useState<number>(0);
    const [reload, setReload] = useState<boolean>(true);
    const [showDrawer, setShowDrawer] = useState<boolean>(false);
    const [defaultData, setDefaultData] = useState<Appointment>({
        division_id: "",
        division: "",
        division_autosuggest: "",
        lgu_position_id: "",
        lgu_position: "",
        lgu_position_autosuggest: "",
        employment_status: "",
        employee_id: "",
        employee: "",
        employee_autosuggest: "",
        application_id: "",
        application: "",
        application_autosuggest: "",
        nature_of_appointment: "",
        vice: "",
        vacancy_reason: "",
        date_of_signing: "",
        page_no: "",
        date_received: "",
    });
    var [initialValues, setValues] = useState<Appointment>(
        defaultData
    );



    useEffect(() => {
        setFormikData(formikRef);
    }, [formikRef]);


    // Use Effect Hook
    useEffect(() => {
        // query
        async function getData() {
            const postData = {
                activePage: activePage,
                filters: [...filters],
                orderBy: orderBy,
                orderAscending: orderAscending,
            };
            const resp = await HttpService.post("search-interviews", postData);
            if (resp != null) {
                setData(resp.data.data);
                setPages(resp.data.pages);
            }
        }
        getData();
    }, [refresh, filters, orderBy, orderAscending, pagination, activePage, year]);


    const downloadNoticeOfMeeting = async (id: number) => {
        try {
            if (process === "Download") {
                const resp = await HttpService.get("download-notice-of-meeting/" + id);
                if (resp.status === 200) {
                    let status = resp.data.status;
                    if (status === "Request was Successful") {
                        let base64String = resp.data.data.base64;
                        let filename = resp.data.data.filename;
                        var binaryString = atob(base64String);

                        // Convert binary to ArrayBuffer
                        var binaryData = new ArrayBuffer(binaryString.length);
                        var byteArray = new Uint8Array(binaryData);
                        for (var i = 0; i < binaryString.length; i++) {
                            byteArray[i] = binaryString.charCodeAt(i);
                        }

                        // Create Blob object
                        var blob = new Blob([byteArray], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });

                        // Create object URL
                        var url = URL.createObjectURL(blob);

                        // Create a link element, set its href attribute, and trigger download
                        var a = document.createElement('a');
                        a.href = url;
                        a.download = filename + '.docx'; // Specify desired file name with .docx extension
                        document.body.appendChild(a); // Append anchor to body
                        a.click(); // Programmatically click the anchor element to trigger the download
                        document.body.removeChild(a); // Clean up anchor element afterwards
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

            }
        }
    };



    const downloadInitialCAF = async (id: number) => {
        try {
            if (process === "CAF") {
                const resp = await HttpService.get("generate-initial-caf-per-meeting/" + id);
                if (resp.status === 200) {
                    let status = resp.data.status;
                    if (status === "Request was Successful") {
                        let base64String = resp.data.data.base64;
                        let filename = resp.data.data.filename;
                        var binaryString = atob(base64String);

                        // Convert binary to ArrayBuffer
                        var binaryData = new ArrayBuffer(binaryString.length);
                        var byteArray = new Uint8Array(binaryData);
                        for (var i = 0; i < binaryString.length; i++) {
                            byteArray[i] = binaryString.charCodeAt(i);
                        }

                        // Create Blob object
                        var blob = new Blob([byteArray], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });

                        // Create object URL
                        var url = URL.createObjectURL(blob);

                        // Create a link element, set its href attribute, and trigger download
                        var a = document.createElement('a');
                        a.href = url;
                        a.download = filename; // Specify desired file name with .zip extension
                        document.body.appendChild(a); // Append anchor to body
                        a.click(); // Programmatically click the anchor element to trigger the download
                        document.body.removeChild(a); // Clean up anchor element afterwards
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

            }
        }
    };


    useEffect(() => {
        setAlerts([]);
        if (id == 0) {
            setValues(defaultData);
        }
        else {

            if (process == "View") {
                setShowDrawer(false);
            }
            else if (process == "Download") {
                downloadNoticeOfMeeting(id);
            }
            else if (process == "CAF") {
                downloadInitialCAF(id);
            }

            else if (process === "Delete") {
                setAlerts([{ "type": "failure", "message": "Are you sure to delete this data?" }]);
                // setValues(defaultData);
                getDataById(id);
                setShowDrawer(true);
            }

            else {
                setValues(defaultData);
                getDataById(id);
                setShowDrawer(true);
            }
        }
    }, [id, reload]);




    // useEffect(() => {
    //     if (process === "Revert") {
    //         setAlerts([{ "type": "failure", "message": "Are you sure to revert this application?" }]);
    //         setReadOnly(true);
    //     }
    //     else {
    //         setAlerts([]);
    //         setReadOnly(false);
    //     }
    // }, [process]);




    //    get data by id
    const getDataById = async (id: number) => {

        try {
            const resp = await HttpService.get("interview/" + id);
            if (resp.status === 200) {
                let data = resp.data;
                setValues(defaultData);
                // setValues({
                //     date_created: data.interview.date_created,
                //     meeting_date: data.interview.meeting_date,
                //     venue: data.interview.venue_id,
                //     positions: data.positions.map((item: any) => {
                //         return item.vacancy_id.toString();
                //     }),
                // });
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
        { setSubmitting, resetForm, setFieldError }: FormikHelpers<Appointment>
    ) => {


        alerts.forEach(element => {
            alerts.pop();
        });



        try {
            if (process === "Add") {
                const resp = await HttpService.post("interview", values)
                if (resp.status === 200) {
                    let status = resp.data.status;
                    if (status === "Request was Successful") {
                        alerts.push({ "type": "success", "message": "Data has been successfully saved!" });
                        // setValues(defaultData);
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

            else if (process === "Edit") {
                const resp = await HttpService.patch("interview/" + id, values)
                if (resp.status === 200) {
                    let status = resp.data.status;
                    if (status === "Request was Successful") {
                        alerts.push({ "type": "success", "message": "Data has been successfully saved!" });
                        // setValues(defaultData);
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

            else if (process === "Delete") {
                const resp = await HttpService.delete("interview/" + id);
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


            else if (process === "Email") {
                const resp = await HttpService.post("send-disqualification-email/" + id, values)
                if (resp.status === 200) {
                    let status = resp.data.status;
                    if (status === "Request was Successful") {
                        alerts.push({ "type": "success", "message": resp.data.message });
                    }
                    else {
                        if (typeof resp.data != "undefined") {
                            alerts.push({ "type": "failure", "message": resp.data.message });
                        }
                    }
                }
            }
            else {

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

            <Drawer width='w-3/4' setShowDrawer={setShowDrawer} setProcess={setProcess} showDrawer={showDrawer} setId={setId} title={`${process} ${title}`}>
                {/* formik */}
                <Formik innerRef={formikRef} initialValues={initialValues} onSubmit={onFormSubmit} enableReinitialize={true} validateOnBlur={false} validateOnChange={false}
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

                            <AppointmentContextProvider
                                formikData={formikData}
                                isLoading={isLoading}
                                errors={errors}
                                touched={touched}
                                initialValues={initialValues}
                                setValues={setValues}
                                process={process}
                                id={id}>
                                <AppointmentForm />
                            </AppointmentContextProvider>
                        </Form>
                    )}
                </Formik>
            </Drawer>
            <div className={`${showDrawer ? "blur-[1px]" : ""}`}>


                {/*  Tabs */}
                <Tabs.Group
                    aria-label="Tabs with underline"
                    style="underline"
                    theme={customTheme}
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

                    <Tabs.Item title={title + "s"} className='text-blue-500' active>
                        <Button className='btn btn-sm text-white rounded-lg bg-blue-500  hover:scale-90 hover:bg-blue-400 shadow-sm text' onClick={() => {
                            setValues(defaultData);
                            setShowDrawer(true);
                            setId(0);
                            setProcess("Add");
                        }} onDoubleClick={() => { setShowDrawer(false); }}>Add {title}
                        </Button>

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