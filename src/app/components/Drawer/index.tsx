
"use client"
import { XMarkIcon } from "@heroicons/react/24/solid";
import { Button } from "flowbite-react"
import { ReactNode, useState } from "react"

type Props = {
    title: string,
    children: ReactNode,
    setId: any
    showDrawer: boolean,
    setShowDrawer: any
    setProcess: Function
    width:string
}


function index(parameter: Props) {


    return (
        <>
            <div id="drawer-right-example" className={`fixed top-0 right-0 z-40 h-screen p-4 overflow-y-auto transition-transform bg-white  dark:bg-gray-800 ${parameter.showDrawer ? parameter.width : 'translate-x-full'} shadow-xl`}>
                <div className="flex my-4">
                    <h5 className=" font-medium my-auto text-lg">{parameter.title}</h5>
                    <button title="Close Drawer" className={`text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white`} type="button" onClick={() => { parameter.setShowDrawer(false); }}>
                        <span>
                            <XMarkIcon className="h-5"></XMarkIcon>
                        </span>
                    </button>
                </div>
                <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700"></hr>
                <div>
                    {parameter.children}
                </div>
            </div>
        </>
    )
}

export default index