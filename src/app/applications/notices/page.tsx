import React, { useEffect } from 'react';
import Tabs from './Tabs';
export const metadata = {
  title: 'HRIS - Notices',
};


function page() {

  return (
    <div className="mb-4  rounded-2xl bg-white p-6 shadow-xl shadow-slate-900/10">
      <Tabs />
    </div>
  )
}

export default page