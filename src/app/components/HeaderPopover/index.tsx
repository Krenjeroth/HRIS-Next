'use client'
import React from 'react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { MagnifyingGlassIcon, HomeIcon, UserCircleIcon, Bars3Icon } from '@heroicons/react/24/solid'
import { Avatar } from 'flowbite-react'
import { Dropdown } from 'flowbite-react'
import Cookies from 'js-cookie'

function HeaderPopover() {
    let token = Cookies.get('token');
    let name = Cookies.get('name');

    if (typeof token != "undefined") {
        return (

            <Dropdown
                arrowIcon={false}
                inline={true}
                label={<Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded={true} />}
            >
                <Dropdown.Item>
                    {name}
                </Dropdown.Item>
            </Dropdown >
        )
    }
    else {
        return (
            <Dropdown
                arrowIcon={false}
                inline={true}
                label={<Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded={true} />}
            >
                <Dropdown.Item>
                    Log in
                </Dropdown.Item>
            </Dropdown >
        )
    }


}
export default HeaderPopover