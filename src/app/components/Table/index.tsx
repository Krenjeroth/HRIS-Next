"use client"

import { Tooltip, Button, Table, Label } from "flowbite-react";
import Pagination from "../Pagination";
import { useRef, useState, ReactNode, useMemo, useCallback } from "react";
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
    class: string,
}


type Props = {
    buttons?: button[],
    year?: number,
    setYear?: Function,
    searchKeyword: string,
    setSearchKeyword: Function,
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
  
    const search = useCallback(({ value }: any) => {
        let search_input = document.getElementById("table_search") as HTMLElement;
        if (search_input != null) {
            parameter.setActivePage(1);
            parameter.setSearchKeyword((document.getElementById("table_search") as HTMLInputElement).value);
        }
    }, []);

    const debouncedSearch = useMemo(() => {
        return debounce(search, 500);
    }, [search]);

    return (
        <div className="relative overflow-x-auto">
            <div className="flex flex-row my-3  justify-between">
                <div className="">
                    {(parameter.year === undefined) ?
                        "" :
                        <>
                            <div className="relative">
                                <DatePicker id="year" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
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
                    <label className=" font-medium">Total Records:{parameter.pages}</label>
                </div>
                <div className="">
                  
                    <div className="relative">
                        <input type="text" id="table_search" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " onChange={debouncedSearch} />

                        <label htmlFor="table_search" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1" >Search Here</label>
                    </div>
                </div>
            </div>
            <Table className="shadow-md rounded-md w-full text-sm min-h-min">
                <Table.Head>
                    <Table.HeadCell>
                        <span className="sr-only">
                            Edit
                        </span>
                    </Table.HeadCell>
                    {parameter.headers.map((item: header, index) => {
                        return (
                            <Table.HeadCell key={item.column} onClick={() => { parameter.setOrderAscending(!parameter.orderAscending); parameter.setOrderBy(item.column) }}>
                                {item.display.replaceAll("_", " ")}
                                {(item.column == parameter.orderBy) ?
                                    ((parameter.orderAscending) ?
                                        <BarsArrowUpIcon className="h-4 float-right" />
                                        :
                                        <BarsArrowDownIcon className="h-4 float-right" />
                                    )
                                    :
                                    <Bars4Icon className="h-4 float-right" />
                                }
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
                                        return (
                                            <Table.Cell key={td_index} onClick={(e) => {
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
                                                {td.column == "id" ? <>{item.id}</> : <>{item.attributes[td.column]}</>}
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