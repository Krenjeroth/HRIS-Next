"use client";

import { Tooltip, Button, Table, Label } from "flowbite-react";
import Pagination from "../Pagination";
import { useRef, useState, ReactNode, useMemo, useCallback, useEffect } from "react";
import { Bars4Icon, BarsArrowDownIcon, BarsArrowUpIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import DatePicker from "react-datepicker";
import dayjs from 'dayjs';
import CustomRow from "./CustomRow";
import debounce from 'lodash/debounce';


type row = {
    id: string,
    attributes: any
}

type header = {
    column: string,
    display: string
}

type button = {
    icon: ReactNode,
    title: string,
    process: string,
    class: string
}

type filter = {
    column: string,
    value: string,
}


type Props = {
    buttons?: button[],
    year?: number,
    setYear?: Function,
    filters: filter[],
    setFilters: Function,
    orderBy: string,
    setOrderBy: Function,
    orderAscending: boolean,
    setOrderAscending: Function,
    pagination: number,
    setpagination: Function,
    data: row[],
    pages: number,
    activePage: number,
    setActivePage: Function,
    headers: header[]
    setId: Function,
    setReload: Function,
    reload: boolean,
    setProcess: Function,
    children?: ReactNode,
}





function index(parameter: Props) {




    const [startDate, setStartDate] = useState(new Date());
    const [selected, setSelected] = useState<string[]>([]);
    const [numberFormats] = useState<string[]>(['amount']);
    const [filters, setFilters] = useState<filter[]>(parameter.filters);
    const options = {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }

    useEffect(() => {
        parameter.setActivePage(1);
        parameter.setFilters(filters);
    }, [filters])


    const search = (e: React.ChangeEvent<HTMLInputElement>) => {
        let column = e.target.id.replaceAll("_search", "");
        let value = e.target.value;
        let newArray = [...filters];
        let filtered = newArray.filter((value) => {
            return value.column != column;
        });

        filtered.push({
            column: column,
            value: value
        });
        setFilters(filtered);
    }

    const debouncedSearch = useMemo(() => {
        return debounce(search, 300);
    }, [search]);

    return (
        <div className="relative overflow-x-auto">
            <div className="flex flex-row my-3  justify-between">
                <div className="">
                    {(parameter.year === undefined) ?
                        "" :
                        <>
                            <div className="relative">
                                <DatePicker name="year" id="year" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    selected={startDate}
                                    onChange={(date: Date) => {
                                        if (parameter.setYear != undefined) {
                                            parameter.setYear(dayjs(date).format('YYYY'));
                                            setStartDate(date);
                                            parameter.setActivePage(1);
                                        }
                                    }}
                                    showYearPicker
                                    dateFormat="yyyy"
                                />
                                <label htmlFor="year" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">Year</label>
                            </div>

                        </>

                    }
                </div>
                <div className="flex items-center justify-center text-center my-2">
                    <div className=" font-medium">Total Records:{parameter.pages}</div>
                </div>
                <div className="">


                </div>
            </div>
            <Table className="shadow-md rounded-md w-full text-sm min-h-min">
                <Table.Head>
                    <Table.HeadCell>
                        <span className="sr-only  mb-0 pb-0 ">

                        </span>
                    </Table.HeadCell>
                    {parameter.headers.map((item: header, index) => {
                        return (
                            <Table.HeadCell key={item.column} >

                                <div className="mb-0 pb-0 " onClick={() => { parameter.setOrderAscending(!parameter.orderAscending); parameter.setOrderBy(item.column) }}>
                                    <span>{item.display.replaceAll("_", " ")}
                                    </span>
                                    {(item.column == parameter.orderBy) ?
                                        ((parameter.orderAscending) ?
                                            <BarsArrowUpIcon className="h-4 float-right" />
                                            :
                                            <BarsArrowDownIcon className="h-4 float-right" />
                                        )
                                        :
                                        <Bars4Icon className="h-4 float-right" />
                                    }
                                </div>


                            </Table.HeadCell>
                        );
                    })}
                </Table.Head>
                <Table.Head>
                    <Table.HeadCell className="pt-0">
                        <span className="sr-only">

                        </span>
                    </Table.HeadCell>
                    {parameter.headers.map((item: header, index) => {
                        let strlen = item.column.length;
                        let hiddenLabel = item.column + "here";
                        if (strlen < 7) {
                            hiddenLabel = "Searchhere"
                        }

                        return (
                            <Table.HeadCell key={item.column} className="pt-0">
                                <div className="relative mt-0 pt-0">
                                    <span className="invisible">
                                        {hiddenLabel}
                                    </span>
                                    <input type="text" id={`${item.column}_search`} name={`${item.column}_search`} className="block px-2.5 pb-2.5 pt-2 w-full text-sm text-gray-900 bg-white rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer fon-normal" placeholder=" " onChange={debouncedSearch} />

                                    <label htmlFor={`${item.column}_search`} className="absolute text-xs text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-65 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 font-normal mt-2" >Search</label>
                                </div>

                            </Table.HeadCell>
                        );
                    })}
                </Table.Head>
                <Table.Body className="divide-y">
                    {parameter.data.length > 0 ?
                        parameter.data.map((item: row, index: number) => {
                            return (
                                <Table.Row key={item.id} className={(selected.includes(item.id) ? 'bg-cyan-50' : 'bg-white')} >
                                    <Table.Cell className="whitespace-nowrap font-medium min-w-0 flex flex-row">
                                        {parameter.buttons != undefined ?
                                            parameter.buttons.map((button: button, i: number) => {
                                                return (
                                                    <Tooltip content={button.title} key={i}>
                                                        <button title="Edit"
                                                            className={`font-medium ${button.class} hover:scale-90 p-1 border rounded-md  m-1 shadow-sm`} onClick={() => {
                                                                parameter.setReload(!parameter.reload);
                                                                parameter.setId(item.id);
                                                                parameter.setProcess(button.process);
                                                            }}
                                                        >
                                                            {button.icon} </button>
                                                    </Tooltip>
                                                );
                                            })
                                            : ""
                                        }
                                    </Table.Cell>
                                    {parameter.headers.map((td, td_index) => {
                                        let value = "";

                                        if (td.column == "id") {
                                            value = item.id;
                                        }
                                        else {
                                            value = item.attributes[td.column];
                                            if (numberFormats.indexOf(td.column) != -1) {
                                                value = Intl.NumberFormat(undefined, options).format(parseFloat(value));
                                            }
                                        }
                                        return (
                                            <Table.Cell className="" key={td_index} onClick={(e) => {
                                                let newArray = [...selected];
                                                if (newArray.includes(item.id)) {
                                                    newArray = newArray.filter((str: string) => {
                                                        return str !== item.id
                                                    })
                                                }
                                                else {
                                                    newArray.push(item.id);
                                                }
                                                setSelected(newArray);
                                            }}>
                                                {value}
                                            </Table.Cell>
                                        );
                                    })}

                                </Table.Row>
                            );
                        })
                        :
                        <Table.Row className="bg-white  h-24" >
                            <Table.Cell className=" justify-center text-center" colSpan={(parameter.headers.length + 1)}>
                                <span className="font-medium">
                                    No Data Found
                                </span>
                            </Table.Cell>
                        </Table.Row>
                    }
                </Table.Body>
            </Table >

            <div className="flex items-center justify-center text-center">
                <Pagination
                    currentPage={parameter.activePage}
                    setActivePage={parameter.setActivePage}
                    totalPages={parameter.pages}
                />
            </div>
        </div >
    );
}

export default index