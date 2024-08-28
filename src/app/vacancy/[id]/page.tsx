import React from 'react'
import Tabs from '../[id]/Tabs';
import { useRouter } from 'next/router';
export const metadata = {
  title: 'HRIS - View Vacancy Details',
  icons: {
    icon: {
      url: "/benguet.png",
      type: "image/png",
    },
    shortcut: { url: "/benguet.png", type: "image/png" },
  },
};

type params = {
  id: string
}


function page(context: any) {
  const { id } = context.params;
  return (
    <div>
      <Tabs id={id} />
    </div>
  )
}

export default page