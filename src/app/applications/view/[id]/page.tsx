import AttachmentView from '@/app/components/AttachmentView';
import { Button, Tabs } from 'flowbite-react';
import React from 'react'

export const metadata = {
    title: 'HRIS - Application Attachment',
};


function page({ params }: any) {

    // tsx
    return (
        <AttachmentView id={params.id} link={"/view-application-attachments"} />
    );
}

export default page