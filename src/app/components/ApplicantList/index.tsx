"use client";
import React, { ReactNode, useEffect, useRef, createContext, useContext } from 'react';
import HttpService from '../../../../lib/http.services';
import { useState } from 'react';
import Table from "../../components/Table";
import AttachmentDrawer from "../../components/AttachmentDrawer";
import dayjs from 'dayjs';
import { ClipboardIcon, ExclamationCircleIcon, FlagIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
import AttachmentView from '../../components/AttachmentView';

// types

type row = {
    id: string,
    attributes: object[]
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
    link?: string,
    filter?: {
        column: string,
        value: string
    }
}

type filter = {
    column: string;
    value: string;
}

type props = {
    vacancy_id: string
}





//main function

function index(parameter: props) {


    // variables
    const [activePage, setActivePage] = useState<number>(1);
    const [filters, setFilters] = useState<filter[]>([{ column: 'vacancy_id', value: parameter.vacancy_id }]);
    const [orderBy, setOrderBy] = useState<string>('');
    const [buttons, setButtons] = useState<button[]>([
        { "icon": <ClipboardIcon className=' w-5 h-5' />, "title": "View Attachment", "process": "View", "class": "text-green-500" },
    ]);
    const [orderAscending, setOrderAscending] = useState<boolean>(false);
    const [pagination, setpagination] = useState<number>(1);
    const [year, setYear] = useState<number>(parseInt(dayjs().format('YYYY')));
    const [headers, setHeaders] = useState<header[]>([
        { "column": "id", "display": "id" },
        { "column": "date_submitted", "display": "Date Submitted" },
        { "column": "first_name", "display": "first_name" },
        { "column": "middle_name", "display": "middle_name" },
        { "column": "last_name", "display": "last_name" },
        { "column": "suffix", "display": "suffix" },
        { "column": "application_type", "display": "application_type" },
        { "column": "status", "display": "status" },
    ]);

    const [showAttachmentDrawer, setShowAttachmentDrawer] = useState<boolean>(false);
    const [pages, setPages] = useState<number>(0);
    const [data, setData] = useState<row[]>([]);
    const [reload, setReload] = useState<boolean>(true);
    const [id, setId] = useState<number>(0);
    const [process, setProcess] = useState<string>('');
    const [showDrawer, setShowDrawer] = useState<boolean>(false);
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
            const resp = await HttpService.post("search-applications", postData);
            if (resp != null) {
                setData(resp.data.data);
                setPages(resp.data.pages);
            }
        }
        getData();
    }, [filters, orderBy, orderAscending, pagination, activePage, year]);


    useEffect(() => {
        if (id != 0) {

            if (process == "View") {
                setShowAttachmentDrawer(true);
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

    // tsx
    return (
        <>
            <AttachmentDrawer width='w-3/4' setShowDrawer={setShowAttachmentDrawer} showDrawer={showAttachmentDrawer} title={`Attachment/s`}>
                <AttachmentView id={id} link={"/view-application-attachments"} />
            </AttachmentDrawer>

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
        </>
    );
}

export default index