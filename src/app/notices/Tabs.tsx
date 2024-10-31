"use client";
import { Tabs, TabsRef } from 'flowbite-react';
import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import Table from "../components/Table";
import HttpService from '../../../lib/http.services';
import { Form, Formik, FormikHelpers } from 'formik';
import { setFormikErrors } from '../../../lib/utils.service';
import dayjs from 'dayjs';
import { ArrowLeftEndOnRectangleIcon, ClipboardIcon, PencilIcon } from '@heroicons/react/24/solid';
import { useRouter } from "next/navigation";
import { DisqualifiedIValues, filter, alert, button, header, row } from '../types/pds';
import { HiDownload, HiFolderDownload, HiMail } from 'react-icons/hi';

//main function

function AllRequestsTabs() {

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
        { "icon": <HiDownload className=' w-5 h-5' />, "title": "Download - Notice", "process": "Download", "class": "text-slate-600" },
        { "icon": <HiFolderDownload className=' w-5 h-5' />, "title": "Download - Individual Notice", "process": "DownloadIndivicualNotice", "class": "text-blue-600" }
    ]);
    const [refresh, setRefresh] = useState<boolean>(false);
    const [orderAscending, setOrderAscending] = useState<boolean>(false);
    const [isLoading, setLoading] = useState<boolean>(false);
    const [pagination, setpagination] = useState<number>(1);
    const [process, setProcess] = useState<string>("Add");
    const [year, setYear] = useState<number>(parseInt(dayjs().format('YYYY')));
    const [headers, setHeaders] = useState<header[]>([
        { "column": "id", "display": "id" },
        { "column": "posting_date", "display": "Opening Date" },
        { "column": "closing_date", "display": "Closing Date" },
        { "column": "item_number", "display": "Item Number" },
        { "column": "title", "display": "Position" },
        { "column": "applicants", "display": "No. of Applicants" },
        { "column": "number", "display": "Salary Grade" },
        { "column": "amount", "display": "Monthly Salary" },
        { "column": "office_name", "display": "Office" },
        { "column": "division_name", "display": "Division/Section/Unit" }
    ]);


    const [readOnly, setReadOnly] = useState<boolean>(false);
    const [pages, setPages] = useState<number>(0);
    const [data, setData] = useState<row[]>([]);
    const [title, setTitle] = useState<string>("Notice");
    const [id, setId] = useState<number>(0);
    const [reload, setReload] = useState<boolean>(true);
    const [showDrawer, setShowDrawer] = useState<boolean>(false);
    const [showAttachmentDrawer, setShowAttachmentDrawer] = useState<boolean>(false);
    const [defaultData, setDefaultData] = useState<DisqualifiedIValues>({
        first_name: '',
        middle_name: '',
        last_name: '',
        suffix: '',
        date_submitted: '',
        vacancy_id: '',
        vacancy: '',
        vacancy_autosuggest: '',
        reason: '',
        remarks: '',
        recipient: '',
        subject: '',
        body: ''
    });
    var [initialValues, setValues] = useState<DisqualifiedIValues>(
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
                filters: [...filters, { column: "vacancies.date_approved", value: String(year) }],
                orderBy: orderBy,
                orderAscending: orderAscending,
            };
            const resp = await HttpService.post("search-notices", postData);
            if (resp != null) {
                setData(resp.data.data);
                setPages(resp.data.pages);
            }
        }
        getData();
    }, [refresh, filters, orderBy, orderAscending, pagination, activePage, year]);


    const downloadLetter = async (id: number) => {
        try {
            if (process === "Download") {
                const resp = await HttpService.get("download-notice-to-applicants/" + id);
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
            if (process === "DownloadIndivicualNotice") {
                const resp = await HttpService.get("download-notice-individual/" + id);
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


    useEffect(() => {
        setAlerts([]);
        if (id == 0) {
            setValues(defaultData);
        }
        else {

          if (process == "Download" || process == "DownloadIndivicualNotice") {
                downloadLetter(id);
            }

            else {
                setValues(defaultData);
                getDataById(id);
                setShowDrawer(true);
                setShowAttachmentDrawer(false);
            }
        }
    }, [id, reload]);


    useEffect(() => {
        if (!showDrawer) {
            if (!showAttachmentDrawer) {
                setId(0);
            }
        }
        else {
            setShowAttachmentDrawer(false);
        }
    }, [showDrawer]);

    useEffect(() => {
        if (process === "Revert") {
            setAlerts([{ "type": "failure", "message": "Are you sure to revert this application?" }]);
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
            const resp = await HttpService.get("application/" + id);

            if (resp.status === 200) {
                let data = resp.data;
                var body = `<p style="padding:0px">
                                <span style="font-family:Verdana, Geneva, sans-serif;font-size:14px;">Dear <strong>Applicant</strong>:&nbsp;</span>
                            </p>
                            <p style="padding:0px">
                                &nbsp;
                            </p>
                            <p style="padding:0px">
                                <span style="font-family:Verdana, Geneva, sans-serif;font-size:14px;">This refers to your application for the position of <strong>${data.vacancy}</strong> at the <strong>${data.vacancyOffice.office_name}</strong>, Capitol, Poblacion, La Trinidad, Benguet.</span>
                            </p>
                           
                            <p style="padding:0px">
                                <span style="font-family:Verdana, Geneva, sans-serif;font-size:14px;">We regret to inform that based on the evaluation of your qualifications as submitted, vis - a’-vis the qualification standards(QS) of the position, ${data.disqualification.reason} .&nbsp;</span>
                            </p>
                           
                            <p style="padding:0px">
                                <span style="font-family:Verdana, Geneva, sans-serif;font-size:14px;">Nonetheless, we thank you for your interest to join the Provincial Government of Benguet.</span>
                            </p>
                            <p style="padding:0px">
                                &nbsp;
                            </p>
                           
                            <p style="padding:0px">
                                <span style="font-family:Verdana, Geneva, sans-serif;font-size:14px;">Very truly yours,</span>
                            </p>
                            <p style="padding:0px">
                                &nbsp;
                            </p>
                            <p style="padding:0px" class="MsoNormal">
                                <span style="font-family:Arial, Helvetica, sans-serif;font-size:14px;"><strong>PROVINCIAL HUMAN RESOURCE MANAGEMENT AND DEVELOPMENT OFFICE</strong></span><span style="font-family:Verdana, Geneva, sans-serif;font-size:14px;"><o:p></o:p></span>
                            </p>
                            <p style="padding:0px">
                                <span style="font-family:'Lucida Sans Unicode', 'Lucida Grande', sans-serif;font-size:14px;">PROVINCE OF BENGUET</span>
                            </p>
                            <p style="padding:0px">
                                <span style="font-family:Verdana, Geneva, sans-serif;font-size:14px;">Poblacion, La Trinidad, Benguet 2601</span>
                            </p>
                            <p style="padding:0px">
                                <span style="color:hsl(240,75%,60%);font-family:Verdana, Geneva, sans-serif;font-size:14px;"><i>(074) 422-6475</i></span><span style="font-family:Verdana, Geneva, sans-serif;font-size:14px;"><i> | </i></span><span style="color:hsl(240,75%,60%);font-family:Verdana, Geneva, sans-serif;font-size:14px;"><i>http://www.benguet.gov.ph&nbsp;</i></span>
                            </p>
                            <p style="padding:0px">
                                <span style="font-family:Verdana, Geneva, sans-serif;font-size:14px;"><i><strong>EMAIL ADDRESS</strong>: phrmdo@benguet.gov.ph / benguethrmdo@yahoo.com</i></span>
                            </p>`;

                setValues(defaultData);
                setValues({
                    first_name: data.details.first_name,
                    middle_name: (data.details.middle_name) ? data.details.middle_name : "",
                    last_name: data.details.last_name,
                    suffix: (data.details.suffix) ? data.details.suffix : "",
                    date_submitted: data.application.date_submitted,
                    vacancy_id: data.application.vacancy_id,
                    vacancy: data.vacancy,
                    vacancy_autosuggest: data.vacancy,
                    reason: (data.disqualification) ? data.disqualification.reason : '',
                    remarks: '',
                    recipient: data.details.email_address,
                    subject: "Notice of Disqualification",
                    body: body
                });
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
        { setSubmitting, resetForm, setFieldError }: FormikHelpers<DisqualifiedIValues>
    ) => {
        alerts.forEach(element => {
            alerts.pop();
        });


        try {
            if (process === "Edit") {
                const resp = await HttpService.post("disqualify-application/" + id, values)
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

            if (process === "Email") {
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


            if (process === "Revert") {
                const resp = await HttpService.post("revert-application/" + id, values)
                if (resp.status === 200) {
                    let status = resp.data.status;
                    if (status === "Request was Successful") {
                        alerts.push({ "type": "success", "message": "Data has been successfully reverted!" });
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

            <div className={`${(showDrawer || showAttachmentDrawer) ? "blur-[1px]" : ""}`}>


                {/*  Tabs */}
                <Tabs.Group
                    aria-label="Tabs with underline"
                    style="underline"
                    ref={props.tabsRef}
                >

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
                            setYear={setYear}
                            year={year}
                        >
                        </Table>
                    </Tabs.Item>
                </Tabs.Group >

            </div >
        </>
    );
}

export default AllRequestsTabs