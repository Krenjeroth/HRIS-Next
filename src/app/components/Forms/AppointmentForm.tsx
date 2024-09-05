"use client";
import { Field, Form, Formik, FormikHelpers, useFormikContext } from "formik";
import { FormElement } from "../commons/FormElement";
import DatePicker from "../DatePicker";
import { useAppointmentContext } from "@/app/contexts/AppointmentContext";
import { Button } from "flowbite-react";
import React, { ReactNode, useEffect, useRef, useState } from 'react';
import Table from "../Table";
import { Appointment, InterviewIvalues, button, datalist, filter, header, row } from "@/app/types/pds";
import { ClipboardIcon, PencilIcon } from "@heroicons/react/24/solid";
import dayjs from "dayjs";
import HttpService from "../../../../lib/http.services";
import DataList from '../../components/DataList';


// Main function
export const AppointmentForm = () => {


    // variables
    const context = useAppointmentContext();
    const { setFieldValue, submitForm } = useFormikContext();
    const [divisionKeyword, setDivisionKeyword] = useState<string>('');
    const [divisions, setDivisions] = useState<datalist[]>([]);
    const [division_id, setDivisionId] = useState<string>('');
    const [positionKeyword, setPositionKeyword] = useState<string>("");
    const [positionData, setPositionData] = useState<datalist[]>([]);
    const [employeeKeyword, setEmployeeKeyword] = useState<string>("");
    const [applicationKeyword, setApplicationKeyword] = useState<string>("");
    const [employeeData, setEmployeeData] = useState<datalist[]>([]);
    const [applicationsData, setApplicationsData] = useState<datalist[]>([]);
    const [position_status, setPositionStatus] = useState<string>('');
    const [id, setId] = useState<number>(0);
    const [reload, setReload] = useState<boolean>(true);
    const [showDrawer, setShowDrawer] = useState<boolean>(false);
    const [showAttachmentDrawer, setShowAttachmentDrawer] = useState<boolean>(false);
    const [defaultData, setDefaultData] = useState<Appointment>({
        division_id: "",
        division: "",
        division_autosuggest: "",
        lgu_position_id: "",
        lgu_position: "",
        lgu_position_autosuggest: "",
        employee_id: "",
        employee: "",
        employee_autosuggest: "",
        application_id: "",
        application: "",
        application_autosuggest: "",
        employment_status: "",
        nature_of_appointment: "",
        vice: "",
        vacancy_reason: "",
        date_of_signing: "",
        page_no: "",
        date_received: "",
    });


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

    // reset positions
    useEffect(() => {
        setPositionData([]);
    }, [division_id]);


    useEffect(() => {
        setPositionData([]);
    }, [position_status]);


    // Get LGU Positions
    useEffect(() => {
        async function getPositions() {
            var keyword = positionKeyword.split("-");
            var filters = [];
            if (keyword.length === 2) {
                filters = [{ column: 'lgu_positions.division_id', value: division_id }, { 'column': 'lgu_positions.status', 'value': 'Active' }, { column: 'title', value: keyword[0] }, { column: 'item_number', value: keyword[1] }];
            }
            else {
                filters = [{ column: 'lgu_positions.division_id', value: division_id }, { 'column': 'lgu_positions.status', 'value': 'Active' }, { column: 'title', value: positionKeyword }];
            }

            const postData = {
                activePage: 1,
                filters: filters,
                orderBy: 'title',
                year: '',
                orderAscending: "asc",
                positionStatus: [position_status]
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
        getPositions();
    }, [positionKeyword]);



    useEffect(() => {
        async function getEmployees() {
            var keyword = positionKeyword.split("-");
            var filters = [];
            if (keyword.length === 2) {
                filters = [{ column: 'lgu_positions.division_id', value: division_id }, { 'column': 'lgu_positions.status', 'value': 'Active' }, { column: 'title', value: keyword[0] }, { column: 'item_number', value: keyword[1] }];
            }
            else {
                filters = [{ column: 'lgu_positions.division_id', value: division_id }, { 'column': 'lgu_positions.status', 'value': 'Active' }, { column: 'title', value: positionKeyword }];
            }

            const postData = {
                activePage: 1,
                filters: filters,
                orderBy: 'title',
                year: '',
                orderAscending: "asc",
                positionStatus: [position_status]
            };


            const resp = await HttpService.post("search-employees", postData);
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
        getEmployees();
    }, [employeeKeyword]);



    useEffect(() => {
        if (id == 0) {
            context.setValues(defaultData);
        }
        else {

            if (context.process == "View") {
                setShowDrawer(false);
                setShowAttachmentDrawer(true);
            }
            else if (context.process == "Download") {
            }

            else {
                context.setValues(defaultData);
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



    return (
        <div className='grid lg:grid-cols-4 grid-col mt-4'>
            <div className='col-span-4'>
                <span className=' text-blue-600 font-medium text-lg '>Appointment Details</span>
                <hr className='text-blue-600 mt-6' />
            </div>



            {/*Division*/}
            <div className='col-span-4 md:col-span-2'>
                <DataList errors={context.errors} touched={context.touched}
                    id="division_id"
                    setKeyword={setDivisionKeyword}
                    label="Division/Section/Unit"
                    title="Division/Section/Unit"
                    name="division"
                    className='col-span-4 md:col-span-2'
                    required={true}
                    initialValues={context.initialValues}
                    setValues={context.setValues}
                    updateId={setDivisionId}
                    data={divisions} />
            </div>


            <FormElement
                name="employment_status"
                label="Employment Status"
                className='col-span-4 md:col-span-2'
                errors={context.errors}
                touched={context.touched}
                required={true}
            >
                <Field as="select"
                    id="employment_status"
                    name="employment_status"
                    placeholder="Employee Type"
                    className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                        const value = e.target.value;
                        setFieldValue('employment_status', value);
                        setPositionStatus(value);
                    }}
                >
                    <option value="">Select Type </option>
                    <option value="permanent">Permanent</option>
                    <option value="casual">Casual</option>
                    <option value="elective">Elective </option>
                    <option value="coterminous">Coterminous</option>
                    <option value="contractual">Contractual</option>

                </Field>
            </FormElement>

            <FormElement
                name="nature_of_appointment"
                label="Nature of Appointment"
                className='col-span-4 md:col-span-2'
                errors={context.errors}
                touched={context.touched}
                required={true}
            >
                <Field as="select"
                    id="nature_of_appointment"
                    name="nature_of_appointment"
                    placeholder="Employee Type"
                    className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                >
                    <option value="">Select Nature of Appointment </option>
                    <option value="Original">Original</option>
                    <option value="Promotion">Promotion</option>
                    <option value="Transfer">Transfer </option>
                    <option value="Reemployment">Reemployment</option>
                    <option value="Reappointment">Reappointment</option>
                    <option value="Reinstatement">Reinstatement </option>
                    <option value="Coterminous">Coterminous</option>
                    <option value="Demotion">Demotion</option>

                </Field>
            </FormElement>


            <div className='col-span-4 md:col-span-2'>
                <DataList errors={context.errors} touched={context.touched}
                    id="lgu_position_id"
                    setKeyword={setPositionKeyword}
                    label="Position - Plantilla"
                    title="Position"
                    name="lgu_position"
                    className="col-span-4 md:col-span-1"
                    required={true}
                    initialValues={context.initialValues}
                    setValues={context.setValues}
                    data={positionData} />
            </div>


            <div className={`col-span-4 md:col-span-2 ${(position_status == "permanent") ? "" : "hidden"}`}>
                <DataList errors={context.errors} touched={context.touched}
                    id="employee_id"
                    setKeyword={setEmployeeKeyword}
                    label="Employee"
                    title="Employee"
                    name="employee"
                    className="col-span-4 md:col-span-1"
                    required={true}
                    initialValues={context.initialValues}
                    setValues={context.setValues}
                    data={employeeData} />
            </div>


            <div className={`col-span-4 md:col-span-2 hidden${(position_status != "permanent") ? "hidden" : ""}`}>
                <DataList errors={context.errors} touched={context.touched}
                    id="application_id"
                    setKeyword={setApplicationKeyword}
                    label="Applicant"
                    title="Applicant"
                    name="application"
                    className="col-span-4 md:col-span-1"
                    required={true}
                    initialValues={context.initialValues}
                    setValues={context.setValues}
                    data={applicationsData} />
            </div>


            <FormElement
                name="vice"
                label="Vice"
                errors={context.errors}
                touched={context.touched}
                className='col-span-4 md:col-span-2'
                required={true}
            >
                <Field
                    id="vice"
                    name="vice"
                    placeholder="Vice"
                    className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                    // readOnly={true}
                    autoComplete="on"
                />
            </FormElement>


            <FormElement
                name="vacancy_reason"
                label="Reason"
                errors={context.errors}
                touched={context.touched}
                className='col-span-4 md:col-span-2'
                required={true}
            >
                <Field
                    id="vacancy_reason"
                    name="vacancy_reason"
                    placeholder="Reason"
                    className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                    // readOnly={true}
                    autoComplete="on"
                />
            </FormElement>


            <FormElement
                name="page_no"
                label="Page Number"
                errors={context.errors}
                touched={context.touched}
                className='col-span-4 md:col-span-2'
                required={true}
            >
                <Field
                    type="number"
                    id="page_no"
                    name="page_no"
                    placeholder="Page Number"
                    className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                    // readOnly={true}
                    autoComplete="on"
                />
            </FormElement>


            <FormElement
                name="date_of_signing"
                label="Date of Signing"
                errors={context.errors}
                touched={context.touched}
                className='col-span-4 md:col-span-2'
                required={true}
            >

                <DatePicker
                    initialValues={context.initialValues}
                    id="date_of_signing"
                    name="date_of_signing"
                    placeholderText="Enter Date"
                    className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                />
            </FormElement>


            <FormElement
                name="date_received"
                label="Date Received"
                errors={context.errors}
                touched={context.touched}
                className='col-span-4 md:col-span-2'
                required={true}
            >

                <DatePicker
                    initialValues={context.initialValues}
                    id="date_received"
                    name="date_received"
                    placeholderText="Enter Date"
                    className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                />
            </FormElement>


            <div className="col-span-4 mt-5">
                <Button className={`btn btn-sm text-white rounded-lg ${(context.process === "Delete") ? "bg-red-500" : "bg-blue-500"}  hover:scale-90 shadow-sm text mx-auto`} type="button" onClick={() => {
                    submitForm();
                    const element = document.getElementById('drawer_title');
                    if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                    }
                }}>
                    {(context.process === "Delete" ? "Delete" : "Submit")}
                </Button>

            </div>




        </div>
    );
};
