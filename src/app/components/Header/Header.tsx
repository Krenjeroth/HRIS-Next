"use client";
import React, { useEffect } from 'react';
import Image from 'next/image';
import logo from 'public/logo.png';
import { Navbar } from 'flowbite-react';
import { Dropdown } from 'flowbite-react';
import { Avatar } from 'flowbite-react';
import Cookies from 'js-cookie';
import { Bars3CenterLeftIcon, XMarkIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { useState } from 'react';
import { RootState } from '@/app/redux/store';
import { useSelector, useDispatch, Provider } from 'react-redux';
import { setName, setToken, setEmail } from '@/app/redux/reducers/userReducer';
import AuthService from '../../../../lib/auth.service';
import { useRouter } from 'next/navigation';

type Props = {
    isMinimized: boolean,
    setMinimized: any,
    isAuthenticated: boolean,
    setAuthenticated: any,
};

export default function Header(parameter: Props) {

    const name = useSelector((state: RootState) => state.user.name);
    const token = useSelector((state: RootState) => state.user.token);
    const email = useSelector((state: RootState) => state.user.email);
    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
        if (Cookies.get('token') != null) {
            dispatch(setName(Cookies.get('name')))
            dispatch(setToken(Cookies.get('token')));
            dispatch(setEmail(Cookies.get('email')));
            parameter.setAuthenticated(true);
        }
        else {
            parameter.setAuthenticated(false);
        }
    }, [token]);


    const logOut = () => {
        AuthService.removeAuthToken();
        dispatch(setToken(''));
        dispatch(setToken(''));
        dispatch(setEmail(''));
        router.push("/login");
    }

    return (
        <header>
            <Navbar className='bg-white dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 shadow-md dark:border-gray-600'
                fluid={true}
                rounded={true}
            >
                <div className={`flex`}>
                    {parameter.isAuthenticated && (
                        <button data-drawer-target="default-sidebar" onClick={() => parameter.setMinimized(!parameter.isMinimized)} type="button" className="inline-flex p-2 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 float-left mx-3 ">
                            <span className="sr-only">Sidebar</span>
                            {parameter.isMinimized && (<Bars3CenterLeftIcon className="w-5 h-5" />)}
                            {!parameter.isMinimized && (<XMarkIcon className="w-5 h-5" />)}
                        </button>
                    )}

                    <Navbar.Brand href="/" >
                        <Image className="hover:scale-95"
                            src={logo}
                            alt="logo"
                            priority={true}
                            width="0"
                            height="0"
                            sizes="100vw"
                            style={{ width: '150px', height: 'auto' }}
                        />
                    </Navbar.Brand>
                </div>

                <div className="flex md:order-2">
                    {/* {DropdownHeader} */}
                    {token != "" ?
                        <Dropdown
                            arrowIcon={false}
                            inline={true}
                            label={<Avatar alt="User settings" img="" rounded={true} />}>
                            <Dropdown.Header>
                                <span className="block text-sm">
                                    {name}
                                </span>
                                <span className="block truncate text-sm font-medium">
                                    {email}
                                </span>
                            </Dropdown.Header>
                            {/* <Dropdown.Item>
                                Dashboard
                            </Dropdown.Item>
                            <Dropdown.Item>
                                Settings
                            </Dropdown.Item>
                            <Dropdown.Item>
                                Earnings
                            </Dropdown.Item>
                            <Dropdown.Divider /> */}
                            <Dropdown.Item onClick={logOut}>
                                Log out
                            </Dropdown.Item>
                        </Dropdown>
                        :
                        <Dropdown
                            arrowIcon={false}
                            inline={true}
                            label={<Avatar alt="User settings" img="" rounded={true} />}>
                            <Dropdown.Header className=' w-40'>
                                <span>Welcome to HRIS</span>
                            </Dropdown.Header>
                            <Dropdown.Item>
                                <Link href="./login">
                                    Log in
                                </Link>
                            </Dropdown.Item>
                        </Dropdown>
                    }
                    <Navbar.Toggle className='sm:hidden' />
                </div>

                <Navbar.Collapse>
                </Navbar.Collapse>
            </Navbar>
        </header>
    )
}
