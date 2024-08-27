"use client";
import { Button, Tabs, TabsRef } from 'flowbite-react';
import React, { ReactNode, useEffect, useRef } from 'react';
import { useState } from 'react';
import DisplayField from "../../components/commons/DisplayField";
import ApplicantList from "../../components/ApplicantList";
import HttpService from '../../../../lib/http.services';
import { useRouter } from "next/navigation";


// types
type params = {
    id: number
}

type details = {
    amount: string,
    closing_date: string,
    competency: string,
    date_approved: string,
    date_queued: string,
    date_submitted: string,
    description: string,
    division_id: string,
    division_name: string,
    education: string,
    eligibility: string,
    experience: string,
    id: string,
    item_number: string,
    lgu_position_id: string,
    number: string,
    office_name: string,
    place_of_assignment: string,
    position_id: string,
    position_status: string,
    posting_date: string,
    publication_status: string,
    status: string,
    title: string,
    training: string,
    year: string,
}


//main function

function Details(props: params) {


    // variables
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<number>(1);
    const tabsRef = useRef<TabsRef>(null);
    const [title, setTitle] = useState<string>("Vacancy/Opening Detail");
    const [details, setDetails] = useState<details>({
        amount: '',
        closing_date: '',
        competency: '',
        date_approved: '',
        date_queued: '',
        date_submitted: '',
        description: '',
        division_id: '',
        division_name: '',
        education: '',
        eligibility: '',
        experience: '',
        id: '',
        item_number: '',
        lgu_position_id: '',
        number: '',
        office_name: '',
        place_of_assignment: '',
        position_id: '',
        position_status: '',
        posting_date: '',
        publication_status: '',
        status: '',
        title: '',
        training: '',
        year: '',
    });

    //    get details
    const getDetails = async (id: number) => {

        try {
            const resp = await HttpService.get("vacancy/" + id);
            if (resp.status === 200) {
                let data = resp.data;
                setDetails({ ...data });
            }
        }
        catch (error: any) {
        }

    };



    useEffect(() => {
        getDetails(props.id);
    }, []);


    // tsx
    return (
        <>

            {/*  Tabs */}
            <Tabs.Group
                aria-label="Tabs with underline"
                style="underline"

            >

                <Tabs.Item title={title + "s"} active>
                    <div className='grid grid-cols-4 gap-4 mx-5'>

                        <DisplayField id='position_title' class='md:col-span-1' label='Position Title' value={`${details.title}`} />
                        <DisplayField id='item_number' class='md:col-span-1' label='Item Number' value={`${details.item_number}`} />
                        <DisplayField id='office_name' class='md:col-span-2' label='Office' value={`${details.office_name}`} />
                        <DisplayField id='division_name' class='md:col-span-2' label='Unit/Division/Section' value={`${details.division_name}`} />
                        <DisplayField id='position_status' class='md:col-span-1' label='Position Status' value={`${details.position_status}`} />
                        <DisplayField id='place_of_assignment' class='md:col-span-1' label='Place of Assignment' value={`${details.place_of_assignment}`} />
                        <DisplayField id='posting_date' class='md:col-span-1' label='Posting Date (Start)' value={`${details.posting_date}`} />
                        <DisplayField id='closing_date' class='md:col-span-1' label='Posting Date (End)' value={`${details.closing_date}`} />
                        <div className='col-span-4 md:col-span-4'>
                            <span className=' text-blue-600 font-medium text-lg '>Qualification Standards</span>
                            <hr className='text-blue-600 mt-6' />
                        </div>
                        <DisplayField id='education' class='md:col-span-2' label='Education' value={`${details.education}`} />
                        <DisplayField id='training' class='md:col-span-2' label='Training' value={`${details.training}`} />
                        <DisplayField id='experience' class='md:col-span-2' label='Experience' value={`${details.experience}`} />
                        <DisplayField id='eligibility' class='md:col-span-2' label='Eligibility' value={`${details.eligibility}`} />
                        <DisplayField id='competency' class='md:col-span-2' label='Competency' value={`${details.competency}`} />

                        <div className='col-span-4 md:col-span-4'>
                            <span className=' text-blue-600 font-medium text-lg '>Applicants</span>
                            <hr className='text-blue-600 mt-6' />
                        </div>
                        <div className='col-span-4 md:col-span-4'>
                            <ApplicantList vacancy_id={`${props.id}`} />
                        </div>










                        {/* Education *
                        Training *
                        Experience *
                        Eligibility *
                        Competency */}
                        {/* <DisplayField label='Position Title' value={`${details.title}`} /> */}


                    </div>


                </Tabs.Item>

            </Tabs.Group >
        </>
    );
}

export default Details