"use client";
import { Button, Tabs, TabsRef, Tooltip } from 'flowbite-react';
import React, { ReactNode, useEffect, useRef } from 'react';
import { useState } from 'react';
import Table from "../components/Table";
import HttpService from '../../../lib/http.services';
import Drawer from '../components/Drawer';
import { Field, FieldArray, Form, Formik, FormikHelpers } from 'formik';
import { FormElement } from '@/app/components/commons/FormElement';
import { setFormikErrors } from '../../../lib/utils.service';
import { Alert } from 'flowbite-react';
import dayjs from 'dayjs';
import DatePicker from '../components/DatePicker'
import DataList from '@/app/components/DataList';
import { ArrowRightIcon, ArrowUturnLeftIcon, BackspaceIcon, EyeIcon, HandThumbUpIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
import { useRouter } from "next/navigation";
import { createContext } from 'vm';
import { FormFieldError } from '../components/commons/FormFieldError';
import { HiDocumentAdd, HiDownload, HiOutlineDocumentRemove } from 'react-icons/hi';



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
    link?: string
}
type filter = {
    column: string;
    value: string;
}


interface application {
    id: string,
    name: string,
    psychosocial_attributes: string,
    potential: string,
    administrative: string,
    technical: string,
    leadership: string,
    awards: string,
    additional_information: string,
    remarks: string
}

// interfaces

interface IValues {
    office: string,
    division: string,
    position: string,
    item_number: string,
    vacancy_id: string,
    applications: application[]
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
        { "icon": <HiDownload className=' w-5 h-5' />, "title": "Download", "process": "Download", "class": "text-slate-600" },
    ]);
    const [refresh, setRefresh] = useState<boolean>(false);
    const [orderAscending, setOrderAscending] = useState<boolean>(false);
    const [isLoading, setLoading] = useState<boolean>(false);
    const [pagination, setpagination] = useState<number>(1);
    const [process, setProcess] = useState<string>("Edit");
    const [year, setYear] = useState<number>(parseInt(dayjs().format('YYYY')));
    const [headers, setHeaders] = useState<header[]>([
        { "column": "id", "display": "id" },
        { "column": "date_submitted", "display": "Date Submitted" },
        { "column": "item_number", "display": "Item Number" },
        { "column": "title", "display": "Position" },
        { "column": "number", "display": "Salary Grade" },
        { "column": "amount", "display": "Monthly Salary" },
        { "column": "office_name", "display": "Office" },
        { "column": "division_name", "display": "Division/Section/Unit" },
        { "column": "date_approved", "display": "Date Approved" },
        { "column": "posting_date", "display": "Posting Date" },
        { "column": "closing_date", "display": "Closing Date" },
        { "column": "publication_status", "display": "Publication Status" },
    ]);

    const [pages, setPages] = useState<number>(0);
    const [data, setData] = useState<row[]>([]);
    const [applications, setApplications] = useState<application[]>([]);
    const [title, setTitle] = useState<string>("PSB Result");
    const [id, setId] = useState<number>(0);
    const [reload, setReload] = useState<boolean>(true);
    const [showDrawer, setShowDrawer] = useState<boolean>(false);
    var [initialValues, setValues] = useState<IValues>(
        {
            office: '',
            division: '',
            position: '',
            item_number: '',
            vacancy_id: '',
            applications: []
        }
    );
    const [code, setCode] = useState<string>("Non-Department Head");
    const initialValueContext = createContext();


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





    useEffect(() => {
        setAlerts([]);
        if (id == 0) {
            setValues({
                office: '',
                division: '',
                position: '',
                item_number: '',
                vacancy_id: '',
                applications: []
            });
        }
        else {

            if (process === "Download") {
                downloadCAF(id);
            }
            else {

                getDataById(id);
            }
        }
    }, [id, reload]);

    useEffect(() => {
        if (!showDrawer) {
            setId(0);
        }
    }, [showDrawer]);


    useEffect(() => {
        setApplications(initialValues.applications);
    }, [initialValues.applications]);


    const downloadCAF = async (id: number) => {
        try {
            if (process === "Download") {
                const resp = await HttpService.get("download-final-caf/" + id);
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
                        var blob = new Blob([byteArray], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

                        // Create object URL
                        var url = URL.createObjectURL(blob);

                        // Create a link element, set its href attribute, and trigger download
                        var a = document.createElement('a');
                        a.href = url;
                        a.download = filename + '.xlsx'; // Specify desired file name with .docx extension
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
        if (process === "Edit") {
            setAlerts([{ "type": "info", "message": "Edit PSB Results?" }])
        }
        else {
            setAlerts([]);
        }
    }, [process]);


    //    get data by id
    const getDataById = async (id: number) => {

        try {
            const resp = await HttpService.get("psb-result/" + id);
            if (resp.status === 200) {
                let data = resp.data;

                if (data.position.code.includes("PGDH-")) {
                    setCode("Department Head");
                }
                else {
                    setCode("Non-Department Head");
                }

                setValues({
                    office: data.office.office_name,
                    division: data.division.division_name,
                    position: data.position.title,
                    item_number: data.lguPosition.item_number,
                    vacancy_id: data.vacancy.id,
                    applications: data.applications.map((item: any) => {

                        let name = item.first_name + " " + item.last_name;
                        if (item.middle_name) {
                            name = item.first_name + " " + item.middle_name[0] + ". " + item.last_name;
                        }
                        return {
                            'id': item.application_id ? item.application_id : "",
                            'name': name,
                            'psychosocial_attributes': item.psychosocial_attributes ? item.psychosocial_attributes : "",
                            'potential': item.potential ? item.potential : "",
                            'administrative': item.administrative ? item.administrative : "",
                            'technical': item.technical ? item.technical : "",
                            'leadership': item.leadership ? item.leadership : "",
                            'awards': item.awards ? item.awards : "",
                            'additional_information': item.awards ? item.additional_information : "",
                            'remarks': item.remarks ? item.remarks : ""
                        };
                    })
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
        values: any,
        { setSubmitting, resetForm, setFieldError }: FormikHelpers<IValues>
    ) => {
        setLoading(true);







        const postData = {
            applications: values.applications.map((item: any) => {
                let data = Object.entries(item).map((value: any, index: any) => {
                    if (code == "Non-Department Head") {
                        if (value[0] == 'administrative' || value[0] == 'technical' || value[0] == 'leadership') {
                            return [value[0], 0];
                        }
                    }
                    else {
                        if (value[0] == 'psychosocial_attributes' || value[0] == 'potential') {
                            return [value[0], 0];
                        }
                    }

                    return value;
                });

                return Object.fromEntries(data);
            }),
            division: values.division,
            item_number: values.item_number,
            office: values.office,
            vacancy_id: values.vacancy_id,
            position: code
        };


        alerts.forEach(element => {
            alerts.pop();
        });


        try {
            if (process === "Edit") {
                const resp = await HttpService.patch("psb-result/" + id, postData)
                if (resp.status === 200) {
                    let status = resp.data.status;

                    if (typeof resp.data != "undefined") {
                        alerts.push({ "type": "success", "message": resp.data.message });
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
            <Drawer width='w-5/6' setShowDrawer={setShowDrawer} setProcess={setProcess} showDrawer={showDrawer} setId={setId} title={`${process} ${title}`}>
                {/* formik */}
                <Formik initialValues={initialValues} onSubmit={onFormSubmit} enableReinitialize={true} validateOnBlur={false} validateOnChange={false}
                >
                    {({ errors, touched }) => (

                        // forms
                        <Form className='p-2 grid lg:grid-cols-8' id="formik">
                            <div className='alert-container mb-2 col-span-8' id="alert-container">
                                {alerts.map((item, index) => {
                                    return (
                                        <Alert className='my-1' color={item.type} key={index} onDismiss={() => { clearAlert(index) }} > <span> <p><span className="font-medium">{item.message}</span></p></span></Alert>
                                    );
                                })}
                            </div>


                            <FormElement
                                name="office"
                                label="Office"
                                errors={errors}
                                touched={touched}
                                className='col-span-4 md:col-span-4'
                                required={true}
                            >

                                <Field
                                    readOnly={true}
                                    id="office"
                                    name="office"
                                    placeholder="Office *"
                                    className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                                    onClick={() => { setAlerts([]); }}
                                />
                            </FormElement>
                            <FormElement
                                name="division"
                                label="Division/Office/unit"
                                errors={errors}
                                touched={touched}
                                className='col-span-4 md:col-span-4'
                                required={true}
                            >

                                <Field
                                    readOnly={true}
                                    id="division"
                                    name="division"
                                    placeholder="Division/Section/Office *"
                                    className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                                    onClick={() => { setAlerts([]); }}
                                />

                            </FormElement>



                            <FormElement
                                name="position"
                                label="Position"
                                errors={errors}
                                touched={touched}
                                className='col-span-4 md:col-span-4'
                                required={true}
                            >

                                <Field
                                    readOnly={true}
                                    id="position"
                                    name="position"
                                    placeholder="Position *"
                                    className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                                    onClick={() => { setAlerts([]); }}
                                />
                            </FormElement>

                            <FormElement
                                name="item_number"
                                label="Item Number"
                                errors={errors}
                                touched={touched}
                                className='col-span-4 md:col-span-4'
                                required={true}
                            >

                                <Field
                                    readOnly={true}
                                    id="item_number"
                                    name="item_number"
                                    placeholder="Item Number *"
                                    className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                                    onClick={() => { setAlerts([]); }}
                                />
                            </FormElement>

                            <div className='col-span-4 md:col-span-4 grid grid-cols-4 my-3 '>
                                <span className='  font-medium text-lg '>Applicants</span>
                            </div>


                            <FieldArray name="applications">
                                {({ insert, remove, push }) => (
                                    <>
                                        {applications.map((object, index: number) => {
                                            return <div className='col-span-8 md:col-span-8 grid md:grid-cols-8 grid-col ' key={index}>

                                                <div className="col-span-1 md:col-span-1 mx-1 mt-1 hidden">
                                                    <label htmlFor={`applications.${index}.id`} className="text-sm font-medium">
                                                        ID <span className=' text-red-700 text-lg'></span>
                                                    </label>
                                                    <Field
                                                        id={`applications.${index}.id`}
                                                        name={`applications.${index}.id`}
                                                        placeholder="ID *"
                                                        className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                                                        autoComplete="on"
                                                    />
                                                    <FormFieldError name={`applications.${index}.id`} errors={errors} touched={touched} />
                                                </div>

                                                <div className="col-span-4 md:col-span-2 mx-1 mt-1">
                                                    <label htmlFor={`applications.${index}.name`} className="text-sm font-medium">
                                                        Name <span className=' text-red-700 text-lg'>*</span>
                                                    </label>
                                                    <Field
                                                        id={`applications.${index}.name`}
                                                        name={`applications.${index}.name`}
                                                        placeholder="Name *"
                                                        className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                                                        autoComplete="on"
                                                        readOnly={true}
                                                    />
                                                    <FormFieldError name={`applications.${index}.name`} errors={errors} touched={touched} />
                                                </div>

                                                <div className={`col-span-4 md:col-span-2 mx-1 mt-1  ${(code == "Non-Department Head") ? "" : "hidden"}`}>
                                                    <label htmlFor={`applications.${index}.psychosocial_attributes`} className="text-sm font-medium">
                                                        Psychosocial Attributes (15) <span className=' text-red-700 text-lg'>*</span>
                                                    </label>
                                                    <Field
                                                        type="number"
                                                        id={`applications.${index}.psychosocial_attributes`}
                                                        name={`applications.${index}.psychosocial_attributes`}
                                                        placeholder="Psychosocial Attributes (15)*"
                                                        className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                                                        autoComplete="on"
                                                    />
                                                    <FormFieldError name={`applications.${index}.psychosocial_attributes`} errors={errors} touched={touched} />
                                                </div>



                                                <div className={`col-span-4 md:col-span-2 mx-1 mt-1  ${(code == "Non-Department Head") ? "" : "hidden"}`}>
                                                    <label htmlFor={`applications.${index}.potential`} className="text-sm font-medium">
                                                        Potential (15) <span className=' text-red-700 text-lg'>*</span>
                                                    </label>
                                                    <Field
                                                        type="number"
                                                        id={`applications.${index}.potential`}
                                                        name={`applications.${index}.potential`}
                                                        placeholder="Potential (15)*"
                                                        className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                                                        autoComplete="on"
                                                    />
                                                    <FormFieldError name={`applications.${index}.potential`} errors={errors} touched={touched} />
                                                </div>

                                                <div className={`col-span-4 md:col-span-2 mx-1 mt-1  ${(code == "Department Head") ? "" : "hidden"}`}>
                                                    <label htmlFor={`applications.${index}.administrative`} className="text-sm font-medium">
                                                        Administrative (10) <span className=' text-red-700 text-lg'>*</span>
                                                    </label>
                                                    <Field
                                                        type="number"
                                                        id={`applications.${index}.administrative`}
                                                        name={`applications.${index}.administrative`}
                                                        placeholder="Administrative (10)*"
                                                        className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                                                        autoComplete="on"
                                                    />
                                                    <FormFieldError name={`applications.${index}.administrative`} errors={errors} touched={touched} />
                                                </div>

                                                <div className={`col-span-4 md:col-span-1 mx-1 mt-1  ${(code == "Department Head") ? "" : "hidden"}`}>
                                                    <label htmlFor={`applications.${index}.technical`} className="text-sm font-medium">
                                                        Technical (10) <span className=' text-red-700 text-lg'>*</span>
                                                    </label>
                                                    <Field
                                                        type="number"
                                                        id={`applications.${index}.technical`}
                                                        name={`applications.${index}.technical`}
                                                        placeholder="Technical (10)*"
                                                        className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                                                        autoComplete="on"
                                                    />
                                                    <FormFieldError name={`applications.${index}.technical`} errors={errors} touched={touched} />
                                                </div>


                                                <div className={`col-span-4 md:col-span-1 mx-1 mt-1  ${(code == "Department Head") ? "" : "hidden"}`}>
                                                    <label htmlFor={`applications.${index}.leadership`} className="text-sm font-medium">
                                                        Leadership (10) <span className=' text-red-700 text-lg'>*</span>
                                                    </label>
                                                    <Field
                                                        type="number"
                                                        id={`applications.${index}.leadership`}
                                                        name={`applications.${index}.leadership`}
                                                        placeholder="Leadership (10)*"
                                                        className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                                                        autoComplete="on"
                                                    />
                                                    <FormFieldError name={`applications.${index}.leadership`} errors={errors} touched={touched} />
                                                </div>


                                                <div className="col-span-4 md:col-span-2 mx-1 mt-1">
                                                    <label htmlFor={`applications.${index}.awards`} className="text-sm font-medium">
                                                        Awards (5) <span className=' text-red-700 text-lg'>*</span>
                                                    </label>
                                                    <Field
                                                        type="number"
                                                        id={`applications.${index}.awards`}
                                                        name={`applications.${index}.awards`}
                                                        placeholder="Awards (5)*"
                                                        className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                                                        autoComplete="on"
                                                    />
                                                    <FormFieldError name={`applications.${index}.awards`} errors={errors} touched={touched} />
                                                </div>

                                                <div className="col-span-3 md:col-span-4 mx-1 mt-1">
                                                    <Field
                                                        id={`applications.${index}.additional_information`}
                                                        name={`applications.${index}.additional_information`}
                                                        placeholder="Additional Information "
                                                        className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                                                        autoComplete="on"
                                                    />
                                                    <FormFieldError name={`applications.${index}.additional_information`} errors={errors} touched={touched} />
                                                </div>

                                                <div className="col-span-3 md:col-span-4 mx-1 mt-1">
                                                    <Field
                                                        id={`applications.${index}.remarks`}
                                                        name={`applications.${index}.remarks`}
                                                        placeholder="Remarks "
                                                        className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                                                        autoComplete="on"
                                                    />
                                                    <FormFieldError name={`applications.${index}.remarks`} errors={errors} touched={touched} />
                                                </div>

                                                {/* <div className="col-span-4 md:col-span-2 mx-1 mt-1">
                                                    <Field
                                                        type="number"
                                                        id={`applications.${index}.total`}
                                                        name={`applications.${index}.total`}
                                                        placeholder="Total *"
                                                        className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                                                        autoComplete="on"
                                                    />
                                                    <FormFieldError name={`applications.${index}.total`} errors={errors} touched={touched} />
                                                </div> */}
                                                <hr className='col-span-8 md:col-span-8 mx-1 mt-2' />
                                            </div>
                                        })}

                                    </>
                                )}
                            </FieldArray>

                            {/* submit button */}

                            <div className="grid grid-flow-row auto-rows-max mt-5 col-span-8">
                                <button type={(isLoading ? "button" : "submit")} className="py-2 px-4   bg-blue-500 text-white font-semibold rounded-lg focus:scale-90 shadow-sm mx-auto" >
                                    Submit
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
                    ref={props.tabsRef}
                    onActiveTabChange={(tab) => {


                    }}

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
                            year={year}
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