"use client";
import dynamic from 'next/dynamic';
import { Button, Tabs, TabsRef } from 'flowbite-react';
import React, { ReactNode, useEffect, useRef } from 'react';
import { useState } from 'react';
import Table from "../../components/Table";
import HttpService from '../../../../lib/http.services';
import Drawer from '../../components/Drawer';
import { Field, Form, Formik, FormikHelpers, useFormikContext } from 'formik';
import { FormElement } from '@/app/components/commons/FormElement';
import { setFormikErrors } from '../../../../lib/utils.service';
import { Alert } from 'flowbite-react';
import dayjs from 'dayjs';
import DatePicker from '../../components/DatePicker'
import DataList from '@/app/components/DataList';
import { ArrowRightIcon, HandThumbUpIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
import { useRouter } from "next/navigation";
import { createContext } from 'vm';
import moment from "moment";
import { header } from '@/app/types/pds';



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
}

type filter = {
    column: string;
    value: string;
}


// interfaces

interface IValues {
    date_submitted: string;
    date_approved: string,
    date_queued: string,
    position_id: string;
    position: string;
    position_autosuggest: string;
    status: string;
    posting_date: string,
    closing_date: string,
    office_name?: string,
    division_id?: string;
    division?: string;
    division_autosuggest?: string;
}

// Dynamically import the component
const LazyComponent = dynamic(() => import('../../components/LazyComponent'), {
    ssr: false, // This disables server-side rendering for this component
    loading: () => <p>Loading...</p>, // Optional: Show a loading state while the component is being loaded
});


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
        { "icon": <HandThumbUpIcon className=' w-5 h-5' />, "title": "Approve", "process": "Approve", "class": "text-green-500" },
        { "icon": <ArrowRightIcon className=' w-5 h-5' />, "title": "Queue", "process": "Queue", "class": "text-slate-500" },
        { "icon": <TrashIcon className=' w-5 h-5' />, "title": "Delete", "process": "Delete", "class": "text-red-600" }
    ]);

    const [refresh, setRefresh] = useState<boolean>(false);
    const [orderAscending, setOrderAscending] = useState<boolean>(false);
    const [isLoading, setLoading] = useState<boolean>(false);
    const [pagination, setpagination] = useState<number>(1);
    const [process, setProcess] = useState<string>("Add");
    const [posting_date, setPostingDate] = useState<string>("");
    const [closing_date, setClosingDate] = useState<string>("");
    const [year, setYear] = useState<number>(parseInt(dayjs().format('YYYY')));
    const [headers, setHeaders] = useState<header[]>([
        { "column": "id", "display": "id" },
        { "column": "date_submitted", "display": "Date Submitted", "format": "MM/DD/YYYY" },
        { "column": "item_number", "display": "Item Number" },
        { "column": "title", "display": "Position" },
        { "column": "number", "display": "Salary Grade" },
        { "column": "amount", "display": "Monthly Salary" },
        { "column": "office_name", "display": "Office" },
        { "column": "division_name", "display": "Division/Section/Unit" }
    ]);
    const [readOnly, setReadOnly] = useState<boolean>(false);
    const [pages, setPages] = useState<number>(0);
    const [data, setData] = useState<row[]>([]);
    const [title] = useState<string>("Request");
    const [divisionKeyword, setDivisionKeyword] = useState<string>('');
    const [divisions, setDivisions] = useState<datalist[]>([]);
    const [positionKeyword, setPositionKeyword] = useState<string>("");
    const [division_id, setDivisionId] = useState<string>("");
    const [positionData, setPositionData] = useState<datalist[]>([]);
    const [id, setId] = useState<number>(0);
    const [reload, setReload] = useState<boolean>(true);
    const [showDrawer, setShowDrawer] = useState<boolean>(false);
    var [initialValues, setValues] = useState<IValues>(
        {
            date_submitted: '',
            position_id: '',
            position: '',
            position_autosuggest: '',
            status: '',
            date_approved: '',
            date_queued: '',
            posting_date: '',
            closing_date: '',
            division_id: '',
            division: '',
            division_autosuggest: '',
        }
    );
    const initialValueContext = createContext();

    function resetFormik() {
        setValues({
            date_submitted: '',
            position_id: '',
            position: '',
            position_autosuggest: '',
            status: '',
            date_approved: '',
            date_queued: '',
            posting_date: '',
            closing_date: '',
            office_name: '',
            division_id: '',
            division: '',
            division_autosuggest: '',
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
            value: 'Active'
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


    // get divisions
    useEffect(() => {
        setPositionData([]);
    }, [division_id]);



    // Get LGU Positions
    useEffect(() => {
        // query
        async function getPositions() {
            var keyword = positionKeyword.split("-");
            var filters = [];
            if (keyword.length === 2) {
                filters = [{ column: 'lgu_positions.division_id', value: division_id }, { column: 'vacant', value: division_id }, { column: 'lgu_positions.division_id', value: division_id }, { column: 'lgu_positions.status', value: 'Active' }, { column: 'title', value: keyword[0] }, { column: 'item_number', value: keyword[1] }];
            }
            else {
                filters = [{ column: 'lgu_positions.division_id', value: division_id }, { column: 'lgu_positions.division_id', value: division_id }, { column: 'lgu_positions.division_id', value: division_id }, { column: 'lgu_positions.status', value: 'Active' }, { column: 'title', value: positionKeyword }];
            }

            const postData = {
                vacant: 1,
                activePage: 1,
                filters: filters,
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
                            "label": data.attributes.label,
                            "data": data.attributes
                        }
                    })
                );
            }
        }

        if (division_id == "") {
            setPositionData([]);
        }
        else {
            getPositions();
        }
    }, [positionKeyword]);


    useEffect(() => {
        // setAlerts([]);
        if (id == 0) {
            setValues({
                date_submitted: '',
                position_id: '',
                position: '',
                position_autosuggest: '',
                status: '',
                date_approved: '',
                date_queued: '',
                posting_date: '',
                closing_date: '',
                office_name: '',
                division_id: '',
                division: '',
                division_autosuggest: '',
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
                setValues({
                    date_submitted: moment(data.date_submitted).format("MM/DD/YYYY"),
                    position_id: data.lgu_position_id,
                    position: `${data.title} - ${data.item_number}`,
                    position_autosuggest: `${data.title} - ${data.item_number}`,
                    status: data.status,
                    date_approved: '',
                    date_queued: '',
                    posting_date: '',
                    closing_date: '',
                    office_name: data.office_name,
                    division_id: data.division_id,
                    division: data.division_name,
                    division_autosuggest: data.division_name,
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
            date_submitted: values.date_submitted,
            date_approved: values.date_approved,
            date_queued: values.date_queued,
            posting_date: values.posting_date,
            closing_date: values.closing_date,
            position_id: values.position_id,
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


                        return (<Form className='p-2' id="formik">
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
                                    name="date_submitted"
                                    label="Date Submitted"
                                    errors={errors}
                                    touched={touched}
                                    required={true}
                                >

                                    <DatePicker
                                        initialValues={initialValues}
                                        readOnly={process === "Add" || process === "Edit" ? false : true}
                                        id="date_submitted"
                                        name="date_submitted"
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
                                label="Division/Section/Unit"
                                title="Division/Section/Unit"
                                name="division"
                                initialValues={initialValues}
                                setValues={setValues}
                                updateId={setDivisionId}
                                data={divisions}
                                required={true}
                                className=""
                            />


                            {/*positions */}
                            <DataList errors={errors} touched={touched}
                                className=''
                                id="position_id"
                                setKeyword={setPositionKeyword}
                                label="Position - Plantilla"
                                title="Position"
                                name="position"
                                initialValues={initialValues}
                                setValues={setValues}
                                required={true}
                                data={positionData}
                                readonly={process === "Add" || process === "Edit" ? false : true}
                            />

                            {/* Date Approved */}
                            <div className={`${process === "Approve" ? "" : "hidden"}`}>

                                <FormElement
                                    required={true}
                                    name="date_approved"
                                    label="Date Approved"
                                    errors={errors}
                                    touched={touched}
                                >
                                    <DatePicker
                                        initialValues={initialValues}
                                        id="date_approved"
                                        name="date_approved"
                                        placeholderText="Enter Date"
                                        className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                                    />
                                </FormElement>

                                <FormElement
                                    name="posting_date"
                                    label="Posting Date"
                                    errors={errors}
                                    touched={touched}
                                    required={true}
                                >
                                    <DatePicker
                                        initialValues={initialValues}
                                        id="posting_date"
                                        name="posting_date"
                                        placeholderText="Enter Date"
                                        setLocalValue={setPostingDate}
                                        className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                                    />
                                </FormElement>

                                <FormElement
                                    name="closing_date"
                                    label="Closing Date"
                                    errors={errors}
                                    touched={touched}
                                    required={true}
                                >
                                    <DatePicker
                                        initialValues={initialValues}
                                        id="closing_date"
                                        name="closing_date"
                                        placeholderText="Enter Date"
                                        className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                                    />
                                </FormElement>
                            </div>


                            {/* Date Queued */}
                            <div className={`${process === "Queue" ? "" : "hidden"}`}>
                                <FormElement
                                    required={true}
                                    name="date_queued"
                                    label="Date Queued"
                                    errors={errors}
                                    touched={touched}
                                >
                                    <DatePicker
                                        initialValues={initialValues}
                                        id="date_queued"
                                        name="date_queued"
                                        placeholderText="Enter Date"
                                        className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                                    />
                                </FormElement>
                            </div>



                            {/* submit button */}

                            <div className="grid grid-flow-row auto-rows-max mt-5">
                                <button type={(isLoading ? "button" : "submit")} className={`py-2 px-4   ${(process == "Delete" ? "bg-red-500" : "bg-cyan-500")}  text-white font-semibold rounded-lg focus:scale-90 shadow-sm mx-auto`} >
                                    {(process == "Delete" ? "Delete" : "Submit")}
                                </button>
                            </div>
                        </Form>
                        );
                    }}
                </Formik>
            </Drawer>
            <div className={`${showDrawer ? "blur-[1px]" : ""}`}>
                {/*  Tabs */}
                <Tabs.Group
                    aria-label="Tabs with underline"
                    style="underline"
                    ref={props.tabsRef}
                    onActiveTabChange={(tab) => {
                        if (tab == 1) {
                            router.push('/vacancy/approved');
                        }
                        else if (tab == 2) {
                            router.push('/vacancy/queued');
                        }

                    }}

                >

                    <Tabs.Item title={title + "s"} active>

                        <Button className='btn btn-sm text-white rounded-lg bg-cyan-500  hover:scale-90 shadow-sm text' onClick={() => {
                            setValues({
                                date_submitted: '',
                                position_id: '',
                                position: '',
                                position_autosuggest: '',
                                status: '',
                                date_approved: '',
                                date_queued: '',
                                posting_date: '',
                                closing_date: '',
                                office_name: '',
                                division_id: '',
                                division: '',
                                division_autosuggest: ''
                            });
                            setShowDrawer(true);
                            setId(0);
                            setProcess("Add");
                        }} onDoubleClick={() => { setShowDrawer(false); }}>Add {title}
                        </Button>

                        {/*Table*/}
                        <Table
                            buttons={buttons}
                            setFilters={setFilters}
                            filters={filters}
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

                    <Tabs.Item title={"Approved Requests"}>
                    </Tabs.Item>

                    <Tabs.Item title={"Queued Requests"}>
                    </Tabs.Item>
                </Tabs.Group >
            </div >
        </>
    );
}

export default AllRequestsTabs