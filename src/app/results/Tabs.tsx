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
import { HiDocumentAdd, HiOutlineDocumentRemove } from 'react-icons/hi';



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
    awards: string
}

// interfaces

interface IValues {
    office: string,
    division: string,
    position: string,
    item_number: string,
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
        { "icon": <EyeIcon className=' w-5 h-5' />, "title": "View", "process": "View", "class": "text-green-500", "link": "/psb-result" }
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
            applications: []
        }
    );
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
                applications: []
            });
        }
        else {
            getDataById(id);
        }
    }, [id, reload]);

    useEffect(() => {
        if (!showDrawer) {
            setId(0);
        }
    }, [showDrawer]);


    useEffect(() => {
        console.log(initialValues.applications);
        setApplications(initialValues.applications);
    }, [initialValues.applications]);


    useEffect(() => {
        if (process === "Edit") {
            // setAlerts([{ "type": "info", "message": "Edit Approved Request?" }])
        }
        else if (process === "Reactivate") {
            // setAlerts([{ "type": "warning", "message": "Reactivate Request?" }])
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
                setValues({
                    office: data.office.office_name,
                    division: data.division.division_name,
                    position: data.position.title,
                    item_number: data.lguPosition.item_number,
                    applications: data.applications.map((item: any) => {

                        let name = item.first_name + " " + item.last_name;
                        if (item.middle_name) {
                            name = item.first_name + " " + item.middle_name[0] + ". " + item.last_name;
                        }
                        return {
                            'id': item.id ? item.id : "",
                            'name': name,
                            'psychosocial_attributes': item.psychosocial_attributes ? item.psychosocial_attributes : "",
                            'potential': item.potential ? item.potential : "",
                            'administrative': item.administrative ? item.administrative : "",
                            'technical': item.technical ? item.technical : "",
                            'leadership': item.leadership ? item.leadership : "",
                            'awards': item.awards ? item.awards : "",
                        };
                    })
                });

                setShowDrawer(true);
            }
        }
        catch (error: any) {
            // console.log(error);
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
                const resp = await HttpService.patch("psb-result" + id, postData)
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
            <Drawer width='w-3/4' setShowDrawer={setShowDrawer} setProcess={setProcess} showDrawer={showDrawer} setId={setId} title={`${process} ${title}`}>
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
                                    placeholder="Office"
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
                                    placeholder="Division/Section/Office"
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
                                    placeholder="Position"
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
                                    placeholder="Item Number"
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
                                                    <Field
                                                        id={`applications.${index}.id`}
                                                        name={`applications.${index}.id`}
                                                        placeholder="ID"
                                                        className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                                                        autoComplete="on"
                                                    />
                                                    <FormFieldError name={`applications.${index}.id`} errors={errors} touched={touched} />
                                                </div>

                                                <div className="col-span-2 md:col-span-2 mx-1 mt-1">
                                                    <Field
                                                        id={`applications.${index}.name`}
                                                        name={`applications.${index}.name`}
                                                        placeholder="Name"
                                                        className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                                                        autoComplete="on"
                                                    />
                                                    <FormFieldError name={`applications.${index}.name`} errors={errors} touched={touched} />
                                                </div>

                                                <div className="col-span-2 md:col-span-2 mx-1 mt-1">
                                                    <Field
                                                        id={`applications.${index}.psychological_attributes`}
                                                        name={`applications.${index}.psychological_attributes`}
                                                        placeholder="Psychological Attributes"
                                                        className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                                                        autoComplete="on"
                                                    />
                                                    <FormFieldError name={`applications.${index}.psychological_attributes`} errors={errors} touched={touched} />
                                                </div>

                                                <div className="col-span-1 md:col-span-1 mx-1 mt-1">
                                                    <Field
                                                        id={`applications.${index}.potential`}
                                                        name={`applications.${index}.potential`}
                                                        placeholder="Potential"
                                                        className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                                                        autoComplete="on"
                                                    />
                                                    <FormFieldError name={`applications.${index}.potential`} errors={errors} touched={touched} />
                                                </div>

                                                <div className="col-span-1 md:col-span-1 mx-1 mt-1">
                                                    <Field
                                                        id={`applications.${index}.technical`}
                                                        name={`applications.${index}.technical`}
                                                        placeholder="Technical"
                                                        className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                                                        autoComplete="on"
                                                    />
                                                    <FormFieldError name={`applications.${index}.technical`} errors={errors} touched={touched} />
                                                </div>


                                                <div className="col-span-1 md:col-span-1 mx-1 mt-1">
                                                    <Field
                                                        id={`applications.${index}.leadership`}
                                                        name={`applications.${index}.leadership`}
                                                        placeholder="Leadership"
                                                        className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                                                        autoComplete="on"
                                                    />
                                                    <FormFieldError name={`applications.${index}.leadership`} errors={errors} touched={touched} />
                                                </div>


                                                <div className="col-span-1 md:col-span-41 mx-1 mt-1">
                                                    <Field
                                                        id={`applications.${index}.awards`}
                                                        name={`applications.${index}.awards`}
                                                        placeholder="awards"
                                                        className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                                                        autoComplete="on"
                                                    />
                                                    <FormFieldError name={`applications.${index}.awards`} errors={errors} touched={touched} />
                                                </div>

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