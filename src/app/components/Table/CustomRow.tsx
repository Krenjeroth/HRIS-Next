
"use client";

import React, { ReactNode, useEffect, useState } from 'react'
import { Tooltip, Button, Table } from "flowbite-react";
type Props = {
    children?: ReactNode,
}

function CustomRow(parameter: Props) {
    const [className, setClassName] = useState<string>("bg-white");
    const [isSelected, setIsSelected] = useState<boolean>(false);

    useEffect(() => {

        if (!isSelected) {
            setClassName('bg-white');
        }
        else {
            setClassName('bg-cyan-50');
        }

    }, [isSelected]);

    return (
        <Table.Row className={className} onClick={(e) => {
            setIsSelected(!isSelected);
        }}>
            {parameter.children}
        </Table.Row>
    )
}

export default CustomRow