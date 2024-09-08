"use client";
import { Button, Tabs, Tooltip } from 'flowbite-react';
import React, { ReactNode, useEffect } from 'react';
import { useState } from 'react';
import Table from "../../components/Table";
import HttpService from '../../../../lib/http.services';
import Drawer from '../../components/Drawer';
import { Field, FieldArray, Form, Formik, FormikHelpers, useFormikContext } from 'formik';
import { FormElement } from '@/app/components/commons/FormElement';
import { setFormikErrors } from '../../../../lib/utils.service';
import { Alert } from 'flowbite-react';
import DatePicker from '../../components/DatePicker';
import dayjs from 'dayjs';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
import { FormFieldError } from '@/app/components/commons/FormFieldError';
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

type button = {
    icon: ReactNode,
    title: string,
    process: string,
    class: string,

}

type filter = {
    column: string;
    value: string;
}

interface member {
    prefix: string,
    name: string,
    position: string,
    office: string,
    role: string
}


// interfaces

interface IValues {
    date_of_effectivity: "",
    end_of_effectivity: "",
    chairman_prefix: "",
    chairman: "",
    chairman_position: "",
    chairman_office: "",
    vice_chairman_prefix: "",
    vice_chairman: "",
    vice_chairman_position: "",
    vice_chairman_office: "",
    members: member[],
    secretariats: member[]
}


//main function

function PSBTab() {


    // variables
    const [activeTab, setActiveTab] = useState<number>(0);
    // const { submitForm } = useFormikContext();
    const [activePage, setActivePage] = useState<number>(1);
    var [filters, setFilters] = useState<filter[]>([]);
    const [orderBy, setOrderBy] = useState<string>('');
    const [alerts, setAlerts] = useState<alert[]>([]);
    const [refresh, setRefresh] = useState<boolean>(false);
    const [orderAscending, setOrderAscending] = useState<boolean>(false);
    const [pagination, setpagination] = useState<number>(1);
    const [process, setProcess] = useState<string>("Add");
    const [headers, setHeaders] = useState<header[]>([
        { "column": "id", "display": "id" },
        { "column": "date_of_effectivity", "display": "Date of Effectivity" },
        { "column": "end_of_effectivity", "display": "End of Effectivity" },
        { "column": "chairman", "display": "Chairman" },
        { "column": "chairman_position", "display": "Position" },
        { "column": "vice_chairman", "display": "Vice Chairman" },
        { "column": "vice_chairman_position", "display": "Position" },
    ]);
    const [pages, setPages] = useState<number>(0);
    const [data, setData] = useState<row[]>([]);
    const [title, setTitle] = useState<string>("PSB Comittee");
    const [id, setId] = useState<number>(0);
    const [reload, setReload] = useState<boolean>(true);
    const [showDrawer, setShowDrawer] = useState<boolean>(false);
    const [year, setYear] = useState<number>(parseInt(dayjs().format('YYYY')));
    const [members, setMembers] = useState<member[]>([]);
    const [secretariats, setSecretariats] = useState<member[]>([]);
    const [defaultValue] = useState<IValues>(
        {
            date_of_effectivity: "",
            end_of_effectivity: "",
            chairman_prefix: "",
            chairman: "",
            chairman_position: "",
            chairman_office: "",
            vice_chairman_prefix: "",
            vice_chairman: "",
            vice_chairman_position: "",
            vice_chairman_office: "",
            members: [],
            secretariats: []
        }
    );
    const [initialValues, setValues] = useState<IValues>(
        defaultValue
    );

    const [buttons, setButtons] = useState<button[]>([
        { "icon": <PencilIcon className=' w-5 h-5' />, "title": "Edit", "process": "Edit", "class": "text-blue-600" },
        { "icon": <TrashIcon className=' w-5 h-5' />, "title": "Delete", "process": "Delete", "class": "text-red-600" }
    ]);

    // Use Effect Hook

    useEffect(() => {
        // query
        async function getData() {
            const postData = {
                activePage: activePage,
                filters: filters,
                orderBy: orderBy,
                orderAscending: orderAscending,
                year: year
            };
            const resp = await HttpService.post("search-psbs", postData);
            if (resp != null) {
                setData(resp.data.data);
                setPages(resp.data.pages);
            }
        }


        getData();
    }, [refresh, filters, orderBy, orderAscending, pagination, activePage, year]);


    useEffect(() => {

        setMembers(initialValues.members.map((item: member) => {
            return {
                'prefix': item.prefix ? item.prefix : "",
                'name': item.name ? item.name : "",
                'position': item.position ? item.position : "",
                'office': item.office ? item.office : "",
                'role': item.role ? item.role : "",
            };
        }));

        setSecretariats(initialValues.secretariats.map((item: member) => {
            return {
                'prefix': item.prefix ? item.prefix : "",
                'name': item.name ? item.name : "",
                'position': item.position ? item.position : "",
                'office': item.office ? item.office : "",
                'role': item.role ? item.role : "",
            };
        }));

    }, [initialValues.secretariats, initialValues.members]);

    useEffect(() => {
        setAlerts([]);
        if (id == 0) {
            setValues(defaultValue);
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
            const resp = await HttpService.get("personnel-selection-board/" + id);
            const data = resp.data;
            if (resp.status === 200) {
                let temp_members = data.personnels.filter((personnel: member) => {
                    return personnel.role == "member";
                });
                let temp_secretariats = data.personnels.filter((personnel: member) => {

                    return personnel.role == "secretariat";
                });



                setValues(defaultValue);
                setValues({
                    date_of_effectivity: data.personnelSelectionBoard.date_of_effectivity,
                    end_of_effectivity: data.personnelSelectionBoard.end_of_effectivity == null ? "" : data.personnelSelectionBoard.end_of_effectivity,
                    chairman: data.personnelSelectionBoard.chairman,
                    chairman_prefix: data.personnelSelectionBoard.chairman_prefix,
                    chairman_position: data.personnelSelectionBoard.chairman_position,
                    chairman_office: data.personnelSelectionBoard.chairman_office,
                    vice_chairman: data.personnelSelectionBoard.vice_chairman,
                    vice_chairman_prefix: data.personnelSelectionBoard.vice_chairman_prefix,
                    vice_chairman_position: data.personnelSelectionBoard.vice_chairman_position,
                    vice_chairman_office: data.personnelSelectionBoard.vice_chairman_office,
                    members: temp_members.map((item: member) => {
                        return {
                            'prefix': item.prefix ? item.prefix : "",
                            'name': item.name ? item.name : "",
                            'position': item.position ? item.position : "",
                            'office': item.office ? item.office : "",
                            'role': item.role ? item.role : "",
                        };
                    }),
                    secretariats: temp_secretariats.map((item: member) => {
                        return {
                            'prefix': item.prefix ? item.prefix : "",
                            'name': item.name ? item.name : "",
                            'position': item.position ? item.position : "",
                            'office': item.office ? item.office : "",
                            'role': item.role ? item.role : "",
                        };
                    })
                });






                setShowDrawer(true);
            }
        }
        catch (error: any) {
        }

    };

    function resetFormik() {
        setValues(defaultValue);
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

        alerts.forEach(element => {
            alerts.pop();
        });

        try {
            // add
            if (process == "Add") {

                const resp = await HttpService.post("personnel-selection-board", values);
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
                const resp = await HttpService.patch("personnel-selection-board/" + id, values)
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
                const resp = await HttpService.delete("personnel-selection-board/" + id);
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
            <Drawer width='w-1/2' setShowDrawer={setShowDrawer} setProcess={setProcess} showDrawer={showDrawer} setId={setId} title={`${process} ${title}`}>

                {/* formik */}
                <Formik initialValues={initialValues} onSubmit={onFormSubmit} enableReinitialize={true} validateOnBlur={false} validateOnChange={false}
                >

                    {({ errors, touched }) => (

                        // forms
                        <Form className='p-2 grid lg:grid-cols-4' id="formik">
                            <div className='alert-container mb-2 col-span-4' id="alert-container">
                                {alerts.map((item, index) => {
                                    return (
                                        <Alert className='my-1' color={item.type} key={index} onDismiss={() => { clearAlert(index) }} > <span> <p><span className="font-medium">{item.message}</span></p></span></Alert>
                                    );
                                })}
                            </div>

                            <FormElement
                                name="date_of_effectivity"
                                label="Date of Effectivity"
                                errors={errors}
                                touched={touched}
                                className='col-span-4 md:col-span-2'
                                required={true}
                            >

                                <DatePicker
                                    initialValues={initialValues.date_of_effectivity}
                                    id="date_of_effectivity"
                                    name="date_of_effectivity"
                                    placeholderText="Enter Date"
                                    className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                                />
                            </FormElement>

                            <FormElement
                                name="end_of_effectivity"
                                label="End of Effectivity"
                                errors={errors}
                                touched={touched}
                                className='col-span-4 md:col-span-2'
                            >

                                <DatePicker
                                    initialValues={initialValues.end_of_effectivity}
                                    id="end_of_effectivity"
                                    name="end_of_effectivity"
                                    placeholderText="Enter Date"
                                    className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                                />
                            </FormElement>

                            <hr className=' col-span-4 md:col-span-4 grid grid-cols-4 my-2' />

                            <div className='col-span-4 md:col-span-4 grid grid-cols-4 my-3 '>
                                <span className='  font-medium text-lg '>Chairman</span>
                            </div>

                            {/*  */}
                            <FormElement
                                name="chairman_prefix"
                                label="Prefix"
                                errors={errors}
                                touched={touched}
                                required={true}
                                className='col-span-4 md:col-span-1'
                            >
                                <Field
                                    readOnly={(process === "Delete") ? true : false}
                                    id="chairman_prefix"
                                    name="chairman_prefix"
                                    placeholder="Enter Prefix"
                                    className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                                    onClick={() => { setAlerts([]); }}
                                />
                            </FormElement>


                            {/*  */}
                            <FormElement
                                name="chairman"
                                label="Name"
                                errors={errors}
                                touched={touched}
                                required={true}
                                className='col-span-4 md:col-span-3'
                            >
                                <Field
                                    readOnly={(process === "Delete") ? true : false}
                                    id="chairman"
                                    name="chairman"
                                    placeholder="Enter Name"
                                    className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                                    onClick={() => { setAlerts([]); }}
                                />
                            </FormElement>

                            <FormElement
                                name="chairman_position"
                                label="Position"
                                errors={errors}
                                touched={touched}
                                required={true}
                                className='col-span-4 md:col-span-2'
                            >
                                <Field
                                    readOnly={(process === "Delete") ? true : false}
                                    id="chairman_position"
                                    name="chairman_position"
                                    placeholder="Enter Position"
                                    className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                                    onClick={() => { setAlerts([]); }}
                                />
                            </FormElement>

                            {/*  */}
                            <FormElement
                                name="chairman_office"
                                label="Office"
                                errors={errors}
                                touched={touched}
                                required={true}
                                className='col-span-4 md:col-span-2'
                            >
                                <Field
                                    readOnly={(process === "Delete") ? true : false}
                                    id="chairman_office"
                                    name="chairman_office"
                                    placeholder="Enter Chairman Office"
                                    className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                                    onClick={() => { setAlerts([]); }}
                                />
                            </FormElement>

                            <hr className=' col-span-4 md:col-span-4 grid grid-cols-4 my-2' />

                            <div className='col-span-4 md:col-span-4 grid grid-cols-4 my-3 '>
                                <span className='  font-medium text-lg '>Vice Chairman</span>
                            </div>

                            {/*  */}
                            <FormElement
                                name="vice_chairman_prefix"
                                label="Prefix"
                                errors={errors}
                                touched={touched}
                                required={true}
                                className='col-span-4 md:col-span-1'
                            >
                                <Field
                                    readOnly={(process === "Delete") ? true : false}
                                    id="vice_chairman_prefix"
                                    name="vice_chairman_prefix"
                                    placeholder="Enter Prefix"
                                    className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                                    onClick={() => { setAlerts([]); }}
                                />
                            </FormElement>


                            {/*  */}
                            <FormElement
                                name="vice_chairman"
                                label="Name"
                                errors={errors}
                                touched={touched}
                                required={true}
                                className='col-span-4 md:col-span-3'
                            >
                                <Field
                                    readOnly={(process === "Delete") ? true : false}
                                    id="vice_chairman"
                                    name="vice_chairman"
                                    placeholder="Enter Name"
                                    className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                                    onClick={() => { setAlerts([]); }}
                                />
                            </FormElement>

                            <FormElement
                                name="vice_chairman_position"
                                label="Position"
                                errors={errors}
                                touched={touched}
                                required={true}
                                className='col-span-4 md:col-span-2'
                            >
                                <Field
                                    readOnly={(process === "Delete") ? true : false}
                                    id="vice_chairman_position"
                                    name="vice_chairman_position"
                                    placeholder="Enter Position"
                                    className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                                    onClick={() => { setAlerts([]); }}
                                />
                            </FormElement>

                            {/*  */}
                            <FormElement
                                name="vice_chairman_office"
                                label="Office"
                                errors={errors}
                                touched={touched}
                                required={true}
                                className='col-span-4 md:col-span-2'
                            >
                                <Field
                                    readOnly={(process === "Delete") ? true : false}
                                    id="vice_chairman_office"
                                    name="vice_chairman_office"
                                    placeholder="Enter Office"
                                    className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                                    onClick={() => { setAlerts([]); }}
                                />
                            </FormElement>


                            <hr className=' col-span-4 md:col-span-4 grid grid-cols-4 my-2' />

                            <div className='col-span-4 md:col-span-4 grid grid-cols-4 my-3 '>
                                <span className='  font-medium text-lg '>Members</span>
                            </div>




                            <FieldArray name="members">
                                {({ insert, remove, push }) => (
                                    <>
                                        {members.map((object, index: number) => {
                                            return <div className='col-span-4 md:col-span-4 grid md:grid-cols-8 grid-col ' key={index}>

                                                <div className="col-span-8 md:col-span-3 mx-1 mt-1">
                                                    <Field
                                                        id={`members.${index}.prefix`}
                                                        name={`members.${index}.prefix`}
                                                        placeholder="Prefix"
                                                        className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                                                        autoComplete="on"
                                                    />
                                                    <FormFieldError name={`members.${index}.prefix`} errors={errors} touched={touched} />
                                                </div>



                                                <div className="col-span-8 md:col-span-4 mx-1 mt-1">
                                                    <Field
                                                        id={`members.${index}.name`}
                                                        name={`members.${index}.name`}
                                                        placeholder="Name"
                                                        className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                                                        autoComplete="on"
                                                    />
                                                    <FormFieldError name={`members.${index}.name`} errors={errors} touched={touched} />
                                                </div>


                                                <div className="col-span-8 md:col-span-3 mx-1 mt-1">
                                                    <Field
                                                        id={`members.${index}.position`}
                                                        name={`members.${index}.position`}
                                                        placeholder="Position"
                                                        className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                                                        autoComplete="on"
                                                    />
                                                    <FormFieldError name={`members.${index}.position`} errors={errors} touched={touched} />
                                                </div>

                                                <div className="col-span-8 md:col-span-4 mx-1 mt-1">
                                                    <Field
                                                        id={`members.${index}.office`}
                                                        name={`members.${index}.office`}
                                                        placeholder="Office"
                                                        className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                                                        autoComplete="on"
                                                    />
                                                    <FormFieldError name={`members.${index}.office`} errors={errors} touched={touched} />
                                                </div>


                                                <div className="col-span-8 md:col-span-1 mx-1 mt-1">
                                                    <Button className='mt-3 btn btn-sm text-white rounded-lg  bg-red-500 hover:bg-red-500 hover:scale-90 shadow-sm float-left align-middle ' onClick={() => {
                                                        remove(index);
                                                        let reinitialize_members = [...members].filter((object, filterIndedx: number) => {
                                                            return index != filterIndedx;
                                                        });

                                                        setMembers(reinitialize_members);
                                                    }
                                                    }>
                                                        <Tooltip content="Remove Data">
                                                            <HiOutlineDocumentRemove />
                                                        </Tooltip>
                                                    </Button>
                                                </div>

                                                <hr className='col-span-8 md:col-span-8 mx-1 mt-2' />
                                            </div>
                                        })}

                                        <div className='col-span-4 md:col-span-4 grid md:grid-cols-8 grid-col'>
                                            <div className="mt-2 mx-2 md:col-start-8 col-span-8 md:col-span-1">

                                                <Button className='mt-3 btn btn-sm text-white rounded-lg  bg-green-400 hover:bg-red-500 hover:scale-90 shadow-sm float-left align-middle' onClick={() => {

                                                    let reinitialize_members = [...members].map((object: member, index: number) => {
                                                        return object;
                                                    });

                                                    reinitialize_members.push({
                                                        prefix: '',
                                                        name: '',
                                                        position: '',
                                                        office: '',
                                                        role: 'member',
                                                    });

                                                    push({
                                                        prefix: '',
                                                        name: '',
                                                        position: '',
                                                        office: '',
                                                        role: 'member',
                                                    });

                                                    setMembers(reinitialize_members);

                                                }}>
                                                    <Tooltip content="Add Member">
                                                        <HiDocumentAdd className='text-lg' />
                                                    </Tooltip>
                                                    {/* <Tooltip content="Remove Data">
                                                        <HiOutlineDocumentRemove />
                                                    </Tooltip> */}
                                                </Button>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </FieldArray>


                            <hr className=' col-span-4 md:col-span-4 grid grid-cols-4 my-2' />
                            <div className='col-span-4 md:col-span-4 grid grid-cols-4 my-3 '>
                                <span className='  font-medium text-lg '>Secretariats</span>
                            </div>


                            <FieldArray name="secretariats">
                                {({ insert, remove, push }) => (
                                    <>
                                        {secretariats.map((object, index: number) => {
                                            return <div className='col-span-4 md:col-span-4 grid md:grid-cols-8 grid-col ' key={index}>

                                                <div className="col-span-8 md:col-span-3 mx-1 mt-1">
                                                    <Field
                                                        id={`secretariats.${index}.prefix`}
                                                        name={`secretariats.${index}.prefix`}
                                                        placeholder="Prefix"
                                                        className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                                                        autoComplete="on"
                                                    />
                                                    <FormFieldError name={`secretariats.${index}.prefix`} errors={errors} touched={touched} />
                                                </div>



                                                <div className="col-span-8 md:col-span-4 mx-1 mt-1">
                                                    <Field
                                                        id={`secretariats.${index}.name`}
                                                        name={`secretariats.${index}.name`}
                                                        placeholder="Name"
                                                        className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                                                        autoComplete="on"
                                                    />
                                                    <FormFieldError name={`secretariats.${index}.name`} errors={errors} touched={touched} />
                                                </div>


                                                <div className="col-span-8 md:col-span-3 mx-1 mt-1">
                                                    <Field
                                                        id={`secretariats.${index}.position`}
                                                        name={`secretariats.${index}.position`}
                                                        placeholder="Position"
                                                        className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                                                        autoComplete="on"
                                                    />
                                                    <FormFieldError name={`secretariats.${index}.position`} errors={errors} touched={touched} />
                                                </div>

                                                <div className="col-span-8 md:col-span-4 mx-1 mt-1">
                                                    <Field
                                                        id={`secretariats.${index}.office`}
                                                        name={`secretariats.${index}.office`}
                                                        placeholder="Office"
                                                        className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                                                        autoComplete="on"
                                                    />
                                                    <FormFieldError name={`secretariats.${index}.office`} errors={errors} touched={touched} />
                                                </div>


                                                <div className="col-span-8 md:col-span-1 mx-1 mt-1">
                                                    <Button className='mt-3 btn btn-sm text-white rounded-lg  bg-red-500 hover:bg-red-500 hover:scale-90 shadow-sm float-left align-middle ' onClick={() => {
                                                        remove(index);
                                                        let reinitialize_secretariats = [...secretariats].filter((object, filterIndedx: number) => {
                                                            return index != filterIndedx;
                                                        });

                                                        setSecretariats(reinitialize_secretariats);
                                                    }
                                                    }>
                                                        <Tooltip content="Remove Data">
                                                            <HiOutlineDocumentRemove />
                                                        </Tooltip>
                                                    </Button>
                                                </div>

                                                <hr className='col-span-8 md:col-span-8 mx-1 mt-2' />
                                            </div>
                                        })}

                                        <div className='col-span-4 md:col-span-4 grid md:grid-cols-8 grid-col'>
                                            <div className="mt-2 mx-2 md:col-start-8 col-span-8 md:col-span-1">
                                                <Button className='mt-3 btn btn-sm text-white rounded-lg  bg-green-400 hover:bg-red-500 hover:scale-90 shadow-sm float-left align-middle' onClick={() => {

                                                    let reinitialize_secretariats = [...secretariats].map((object: member, index: number) => {
                                                        return object;
                                                    });

                                                    reinitialize_secretariats.push({
                                                        prefix: '',
                                                        name: '',
                                                        position: '',
                                                        office: '',
                                                        role: 'secretariat',
                                                    });

                                                    push({
                                                        prefix: '',
                                                        name: '',
                                                        position: '',
                                                        office: '',
                                                        role: 'secretariat',
                                                    });

                                                    setSecretariats(reinitialize_secretariats);

                                                }}>
                                                    <Tooltip content="Add Member">
                                                        <HiDocumentAdd className='text-lg' />
                                                    </Tooltip>
                                                </Button>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </FieldArray>


                            {/* submit button */}

                            <div className=" col-span-4 mx-auto mt-5">
                                <button type="submit" className={`py-2 px-4   ${(process == "Delete" ? "bg-red-500" : "bg-blue-500")}  text-white font-semibold rounded-lg focus:scale-90 shadow-sm mx-auto`} onClick={() => {
                                    // submitForm();
                                    const element = document.getElementById('drawer_title');
                                    if (element) {
                                        element.scrollIntoView({ behavior: 'smooth' });
                                    }
                                }}>
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

                        <Button className='btn btn-sm text-white rounded-lg bg-blue-500  hover:scale-90 shadow-sm text' onClick={() => {
                            setValues(defaultValue);
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
                        />
                    </Tabs.Item>
                </Tabs.Group >
            </div>
        </>
    );
}

export default PSBTab