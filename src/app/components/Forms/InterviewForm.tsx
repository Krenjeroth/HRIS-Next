"use client";
import { Field, Form, Formik, FormikHelpers, useFormikContext } from "formik";
import { FormElement } from "../commons/FormElement";
import DatePicker from "../DatePicker";
import { useDisqualifiedContext } from "@/app/contexts/DisqualifiedContext";
import { Button } from "flowbite-react";
import React, { ReactNode, useEffect, useRef, useState } from 'react';
import Table from "../../components/Table";
import { DisqualifiedIValues, button, datalist, filter, header, row } from "@/app/types/pds";
import { ClipboardIcon, PencilIcon } from "@heroicons/react/24/solid";
import dayjs from "dayjs";
import HttpService from "../../../../lib/http.services";


// Main function
export const InterviewForm = () => {


    // variables
    const context = useDisqualifiedContext();
    const { setFieldValue, submitForm } = useFormikContext();
    const [activePage, setActivePage] = useState<number>(1);
    const [filters, setFilters] = useState<filter[]>([]);
    const [orderBy, setOrderBy] = useState<string>('');
    const [buttons, setButtons] = useState<button[]>([
    ]);
    const [refresh, setRefresh] = useState<boolean>(false);
    const [orderAscending, setOrderAscending] = useState<boolean>(false);
    const [isLoading, setLoading] = useState<boolean>(false);
    const [pagination, setpagination] = useState<number>(1);
    const [process, setProcess] = useState<string>("Add");
    const [year, setYear] = useState<number>(parseInt(dayjs().format('YYYY')));
    const [headers, setHeaders] = useState<header[]>([
        { "column": "id", "display": "id" },
        { "column": "item_number", "display": "Position" },
        { "column": "title", "display": "Position" },
        { "column": "number", "display": "Salary Grade" },
        { "column": "office_name", "display": "Office" },
        { "column": "division_name", "display": "Division/Section/Unit" },
        { "column": "posting_date", "display": "Posting Date" },
        { "column": "closing_date", "display": "Closing Date" }
    ]);
    const [selected, setSelected] = useState<string[]>([]);
    const [venues, setVenues] = useState<datalist[]>([]);
    const [readOnly, setReadOnly] = useState<boolean>(false);
    const [pages, setPages] = useState<number>(0);
    const [data, setData] = useState<row[]>([]);
    const [title, setTitle] = useState<string>("Interview Schedule");
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



    // use effect hooks

    useEffect(() => {

        async function getVenues() {
            const resp = await HttpService.get("venues");
            if (resp != null) {
                setVenues(resp.data.data.map((item: any) => {
                    return { "id": item.id, "label": item.attributes.name }
                }));
            }
        }
        getVenues();
    }, []);

    useEffect(() => {
        console.log(selected);
    }, [selected]);

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
        if (id == 0) {
            setValues(defaultData);
        }
        else {

            if (process == "View") {
                setShowDrawer(false);
                setShowAttachmentDrawer(true);
            }
            else if (process == "Download") {
            }

            else {
                setValues(defaultData);
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
                <span className=' text-cyan-600 font-medium text-lg '>Interview Details</span>
                <hr className='text-cyan-600 mt-6' />
            </div>
            <FormElement
                name="interview_date"
                label="Interview Date"
                errors={context.errors}
                touched={context.touched}
                className='col-span-4 md:col-span-1'
                required={true}
            >

                <DatePicker
                    initialValues={context.initialValues}
                    id="interview_date"
                    name="interview_date"
                    placeholderText="Enter Date"
                    className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                />
            </FormElement>



            <FormElement
                name="venue"
                label="Venue"
                errors={context.errors}
                touched={context.touched}
                className='col-span-4 md:col-span-3'
                required={true}
            >
                <Field
                    id="venue"
                    name="venue"
                    as="select"
                    placeholder="Venue"
                    className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                >

                    {venues.map((item: datalist) => {
                        return <option key={item.id} value={item.id}>{item.label}</option>
                    })}


                </Field>

            </FormElement>

            {/* <div>
                <label htmlFor="nonFormikInput">Non-Formik Input</label>
                <input id="nonFormikInput" placeholder="This is not in Formik's state" />
            </div> */}





            <div className='col-span-4 mt-3'>
                <span className=' text-cyan-600 font-medium text-lg '>Positions</span>
                <hr className='text-cyan-600 mt-6' />
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
                    checkbox={true}
                    hideTotal={true}
                    setSelected={setSelected}
                >
                </Table>
            </div>




            <div className="col-span-4 mt-5">
                <Button className={`btn btn-sm text-white rounded-lg ${(selected.length > 0) ? "bg-cyan-500" : "bg-slate-500"}  hover:scale-90 shadow-sm text mx-auto`} type="button" onClick={() => {
                    if (selected.length > 0) {
                        submitForm();
                        const element = document.getElementById('drawer_title');
                        if (element) {
                            element.scrollIntoView({ behavior: 'smooth' });
                        }
                    }
                }}>
                    Submit
                </Button>
            </div>




        </div>
    );
};
