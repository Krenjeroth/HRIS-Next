import React from 'react'
import Tabs from './tabs';
export const metadata = {
  title: 'HRIS - Users',
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