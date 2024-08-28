import React from 'react'
import Tabs from './Tabs';
export const metadata = {
  title: 'HRIS - Requests',
  icons: {
    icon: {
      url: "/benguet.png",
      type: "image/png",
    },
    shortcut: { url: "/benguet.png", type: "image/png" },
  },
};


function page() {
  return (
    <div className="">
      <Tabs />
    </div>
  )
}

export default page