import React from 'react'
import Tabs from '../[id]/Tabs';
import { useRouter } from 'next/router';
export const metadata = {
  title: 'HRIS - View Vacancy Details',
};

type params = {
  id: string
}


function page(context: any) {
  const { id } = context.params;
  console.log(id);
  return (
    <div>
      <Tabs id={id} />
    </div>
  )
}

export default page