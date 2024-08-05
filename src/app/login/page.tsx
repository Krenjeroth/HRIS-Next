import React from 'react'
import bg from '../../../public/resources/img/bg.jpg';
import Image from "next/image";
import LoginCard from './LoginCard';
export const metadata = {
  title: 'HRIS - Offices',
};


function page() {
  return (
    <main className='h-screen'>
      {/* <section className="h-full bg-gray-50 "> */}
      <section id="get-started-today" className="relative h-full  overflow-hidden bg-blue-600 py-32">
        <Image className="absolute left-1/2 top-1/2 max-w-none -translate-x-1/2 -translate-y-1/2"
          src={bg}
          alt=""
          decoding="async"
          data-nimg="1"
          priority={true}
          width="0"
          height="0"
          sizes="100vw"
          style={{ width: '2347px', height: '1244px' }}
        />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">

          <div className=" mx-auto  w-6/6 sm:w-1/2 md:w-1/2 lg:w-1/3 mt-0">
            <LoginCard />
          </div>
        </div>
      </section>
    </main>
  )
}

export default page
