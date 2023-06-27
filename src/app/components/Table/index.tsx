import { Button, Label, Table, Tabs, TabsRef, TextInput } from "flowbite-react";
import Pagination from "../Pagination";
import { useRef, useState } from "react";
import { Bars4Icon, BarsArrowDownIcon, BarsArrowUpIcon } from "@heroicons/react/24/solid";
import { TableCell } from "@nextui-org/react/types/table/base";
import DatePicker from "react-datepicker";


type row = {
    id: string,
    attributes: any
}

type header = {
    column: string,
    display: string
}




type Props = {
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
    getDataById: Function
    setProcess: Function,
}



function index(parameter: Props) {
    const [startDate, setStartDate] = useState(new Date());
    function search() {
        let search_input = document.getElementById("table_search") as HTMLElement;
        // const delayDebounceFn = setTimeout(() => {
        if (search_input != null) {
            parameter.setActivePage(1);
            parameter.setSearchKeyword((document.getElementById("table_search") as HTMLInputElement).value);
        }
        // }, 2000)
    }


    console.log(typeof (parameter.year));
    return (
        <div className="relative overflow-x-auto">
            <div className="flex flex-row my-3 justify-between">
                {typeof (parameter.year) != undefined ?
                    <div className="">
                        <DatePicker id="year" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            selected={startDate}
                            onChange={(date: Date) => {
                                setStartDate(date)
                            }}
                            showYearPicker
                            dateFormat="yyyy"
                        />
                    </div>
                    : ""}

                <div className=" ">
                    <input placeholder="Search here" type="text" id="table_search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onKeyUp={() => search()} />
                </div>
            </div>
            <Table className="shadow-md rounded-md w-64">
                <Table.Head>
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
                    <Table.HeadCell>
                        <span className="sr-only">
                            Edit
                        </span>
                    </Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {parameter.data.length > 0 ?

                        parameter.data.map((item: row, index: number) => {
                            return (
                                <Table.Row className="bg-white " key={item.id}>
                                    {parameter.headers.map((td, td_index) => {
                                        return (
                                            <Table.Cell key={td_index}>
                                                {td.column == "id" ? <>{item.id}</> : <>{item.attributes[td.column]}</>}
                                            </Table.Cell>
                                        );
                                    })}
                                    <Table.Cell className="">
                                        <button
                                            className="font-medium text-blue-600 hover:underline dark:text-blue-500 m-1" onClick={() => {
                                                parameter.getDataById(item.id);
                                                parameter.setProcess("Edit");
                                            }}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="font-medium text-red-600 hover:underline m-1" onClick={() => {
                                                parameter.getDataById(item.id);
                                                parameter.setProcess("Delete");
                                            }}
                                        >
                                            Delete
                                        </button>
                                    </Table.Cell>
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