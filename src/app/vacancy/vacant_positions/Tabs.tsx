"use client";
import { Button, Tabs } from 'flowbite-react';
import React, { ReactNode, useEffect } from 'react';
import { useState } from 'react';
import Table from "../../components/Table";
import HttpService from '../../../../lib/http.services';
import Drawer from '../../components/Drawer';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import { FormElement } from '@/app/components/commons/FormElement';
import { setFormikErrors } from '../../../../lib/utils.service';
import { Alert } from 'flowbite-react';
import YearPicker from '../../components/YearPicker';
import dayjs from 'dayjs';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
import DataList from '../../components/DataList';

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

type filter = {
    column: string;
    value: string;
}


// interfaces

interface IValues {
    item_number: string;
    division_id: string;
    division: string;
    division_autosuggest: string;
    position_id: string;
    position: string;
    position_autosuggest: string;
    year: number;
    description: string;
    place_of_assignment: string;
    status: string;
    position_status: string;
}

type division = {
    id: number;
    attributes: {
        division_code: string
        division_name: string
        office: string
    }
}

type position = {
    id: number;
    attributes: {
        amount: number,
        competency: string,
        education: string,
        eligibility: string,
        experience: string,
        training: string,
        number: number,
        title: string,
    }
}

type button = {
    icon: ReactNode,
    title: string,
    process: string,
    class: string,

}

type datalist = {
    id: string,
    label: any
}





//main function

function SalaryGradeTabs() {



    // variables
    const [activeTab, setActiveTab] = useState<number>(0);
    const [activePage, setActivePage] = useState<number>(1);
    var [filters, setFilters] = useState<filter[]>([]);
    const [orderBy, setOrderBy] = useState<string>('');
    const [alerts, setAlerts] = useState<alert[]>([]);
    const [refresh, setRefresh] = useState<boolean>(false);
    const [orderAscending, setOrderAscending] = useState<boolean>(false);
    const [pagination, setpagination] = useState<number>(1);
    const [process, setProcess] = useState<string>("Add");
    const [divisions, setDivisions] = useState<datalist[]>([]);
    const [positions, setPositions] = useState<datalist[]>([]);
    const [positionKeyword, setPositionKeyword] = useState<string>('');
    const [divisionKeyword, setDivisionKeyword] = useState<string>('');
    const [headers, setHeaders] = useState<header[]>([
        { "column": "id", "display": "id" },
        { "column": "position_status", "display": "Status" },
        { "column": "item_number", "display": "Plantilla" },
        { "column": "title", "display": "Position" },
        { "column": "description", "display": "Description" },
        { "column": "office_name", "display": "Office" },
        { "column": "division_name", "display": "Division/Section/Unit" },
        { "column": "year", "display": "Year" },
        { "column": "number", "display": "Salary Grade" },
        { "column": "amount", "display": "Monthly Salary" },
        { "column": "education", "display": "education" },
        { "column": "training", "display": "training" },
        { "column": "experience", "display": "experience" },
        { "column": "eligibility", "display": "eligibility" },
        { "column": "competency", "display": "competency" },
    ]);
    const [pages, setPages] = useState<number>(0);
    const [data, setData] = useState<row[]>([]);
    const [title, setTitle] = useState<string>("Vacant Position");
    const [positionStatus, setPositionStatus] = useState<string[]>(['Permanent']);
    const [id, setId] = useState<number>(0);
    const [reload, setReload] = useState<boolean>(true);
    const [showDrawer, setShowDrawer] = useState<boolean>(false);
    const [year, setYear] = useState<number>(parseInt(dayjs().format('YYYY')));
    var [initialValues, setValues] = useState<IValues>(
        {
            item_number: "",
            division_id: "",
            division: "",
            division_autosuggest: "",
            position_id: "",
            position: "",
            position_autosuggest: "",
            year: parseInt(dayjs().format('YYYY')),
            description: "",
            place_of_assignment: "",
            status: "",
            position_status: "Permanent",
        }
    );

    const [buttons, setButtons] = useState<button[]>([]);

    // Use Effect Hook
    useEffect(() => {
        // query
        let newArrayFilter = [...filters];

        async function getData() {
            const postData = {
                positionStatus: ['Permanent', 'Casual', 'Contractual'],
                vacant: 1,
                activePage: activePage,
                filters: newArrayFilter,
                orderBy: orderBy,
                viewAll: true,
                orderAscending: orderAscending
            };
            const resp = await HttpService.post("search-lgu-position", postData);
            if (resp != null) {
                setData(resp.data.data);
                setPages(resp.data.pages);
            }
        }
        getData();

    }, [refresh, filters, orderBy, orderAscending, pagination, activePage, year]);


    // get positions
    useEffect(() => {
        async function getPositions() {
            const postData = {
                activePage: 1,
                filters: [{ column: 'title', value: positionKeyword }],
                orderAscending: 'asc'
            };
            const resp = await HttpService.post("search-position", postData);
            if (resp != null) {
                setPositions(resp.data.data);
            }
        }

        getPositions();
    }, [positionKeyword]);


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



    // Submit form
    const onFormSubmit = async (
        values: IValues,
        { setSubmitting, resetForm, setFieldError }: FormikHelpers<IValues>
    ) => {


    };


    // tsx
    return (
        <>
            <div className={`${showDrawer ? "blur-[1px]" : ""}`}>

                {/*  Tabs */}
                <Tabs.Group
                    aria-label="Tabs with underline"
                    style="underline"
                >
                    <Tabs.Item className=' overflow-x-auto' title={title + "s"}>


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
                        />
                    </Tabs.Item>
                </Tabs.Group >
            </div>
        </>
    );
}

export default SalaryGradeTabs