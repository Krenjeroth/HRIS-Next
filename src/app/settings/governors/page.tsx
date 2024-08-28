import React from 'react'
import Tabs from './Tabs';
export const metadata = {
  title: 'HRIS - Governors',
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
    <div>
      <Tabs />
    </div>
  )
}

export default page