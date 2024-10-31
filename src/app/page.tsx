import ApexCharts from "apexcharts";
import { useEffect } from "react";
import Dashboard from './components/Dashboard';

export const metadata = {
  title: 'HRIS',
  icons: {
    icon: {
      url: "/benguet.png",
      type: "image/png",
    },
    shortcut: { url: "/benguet.png", type: "image/png" },
  },
};


export default function Home({ }) {


  return (

    <div className="grid grid-cols-4">
      <Dashboard />
    </div>

    // <div className="p-4  rounded-lg dark:border-gray-700">

    //   <Linechart />

    //   <div className="grid grid-cols-3 gap-4 mb-4">
    //     <div className="flex items-center justify-center h-24 rounded bg-white dark:bg-gray-800">
    //       <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
    //     </div>
    //     <div className="flex items-center justify-center h-24 rounded bg-white dark:bg-gray-800">
    //       <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
    //     </div>
    //     <div className="flex items-center justify-center h-24 rounded bg-white dark:bg-gray-800">
    //       <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
    //     </div>
    //   </div>
    //   <div className="flex items-center justify-center h-48 mb-4 rounded bg-white dark:bg-gray-800">
    //     <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
    //   </div>
    //   <div className="grid grid-cols-2 gap-4 mb-4">
    //     <div className="flex items-center justify-center rounded bg-white h-28 dark:bg-gray-800">
    //       <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
    //     </div>
    //     <div className="flex items-center justify-center rounded bg-white h-28 dark:bg-gray-800">
    //       <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
    //     </div>
    //     <div className="flex items-center justify-center rounded bg-white h-28 dark:bg-gray-800">
    //       <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
    //     </div>
    //     <div className="flex items-center justify-center rounded bg-white h-28 dark:bg-gray-800">
    //       <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
    //     </div>
    //   </div>
    //   <div className="flex items-center justify-center h-48 mb-4 rounded bg-white dark:bg-gray-800">
    //     <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
    //   </div>
    //   <div className="grid grid-cols-2 gap-4">
    //     <div className="flex items-center justify-center rounded bg-white h-28 dark:bg-gray-800">
    //       <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
    //     </div>
    //     <div className="flex items-center justify-center rounded bg-white h-28 dark:bg-gray-800">
    //       <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
    //     </div>
    //     <div className="flex items-center justify-center rounded bg-white h-28 dark:bg-gray-800">
    //       <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
    //     </div>
    //     <div className="flex items-center justify-center rounded bg-white h-28 dark:bg-gray-800">
    //       <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
    //     </div>
    //   </div>
    // </div>
  )
}


