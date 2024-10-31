"use client";
import React, { useContext, useState, useMemo, useRef, useEffect } from 'react'
import { FormElement } from '../commons/FormElement';
import { Field, FieldArray, useFormikContext } from 'formik';
import DatePicker from "../DatePicker";
import { usePDSContext } from "@/app/contexts/PDSContext"
import { Button, Tooltip } from 'flowbite-react';
import { HiDocumentAdd, HiDocumentRemove, HiUserAdd, HiUserRemove } from 'react-icons/hi';
import { FormFieldError } from '../commons/FormFieldError';
import DataList from '@/app/components/DataList';
import { vacancy } from '@/app/types/pds';
import { initial } from 'lodash';
import { datalist } from '@/app/types/pds';
import HttpService from '../../../../lib/http.services';
import FileUpload from './FileUpload';


function ApplicationDetails() {
    const { setFieldValue } = useFormikContext();
    const context = usePDSContext();
    const [vacancies, setVacancies] = useState<datalist[]>([]);
    const [keyword, setKeyword] = useState<string>("");
    const [divisionKeyword, setDivisionKeyword] = useState<string>('');
    const [divisions, setDivisions] = useState<datalist[]>([]);
    const [division_id, setDivisionId] = useState<string>("");


    // get divisions
    useEffect(() => {

        async function getDivisions() {
            const postData = {
                multiFilter: true,
                activePage: 1,
                filters: [{ column: 'division_name', value: divisionKeyword }],
                orderAscending: 'asc',
            };
            const resp = await HttpService.post("search-division", postData);
            if (resp != null) {
                setDivisions(resp.data.data);
            }
        }
        getDivisions();

    }, [divisionKeyword]);


    // get divisions
    useEffect(() => {
        setVacancies([]);
    }, [division_id]);



    // Get LGU Positions
    useEffect(() => {
        // query
        async function getVacancies() {
            var keywords = keyword.split("-");
            var filters = [];
            if (keywords.length === 2) {
                filters = [{ column: 'lgu_positions.division_id', value: division_id }, { 'column': 'lgu_positions.status', 'value': 'Active' }, { column: 'positions.title', value: keywords[0] }, { column: 'item_number', value: keywords[1] }];
            }
            else {
                filters = [{ column: 'lgu_positions.division_id', value: division_id }, { 'column': 'lgu_positions.status', 'value': 'Active' }, { column: 'positions.title', value: keyword }];
            }

            const postData = {
                vacant: 1,
                activePage: 1,
                filters: filters,
                orderBy: 'title',
                year: '',
                orderAscending: "asc",
                positionStatus: ['permanent']
            };

            const resp = await HttpService.post("search-vacancy", postData);
            if (resp != null) {
                setVacancies(
                    resp.data.data.map((data: any) => {
                        return {
                            "id": data.id,
                            "label": data.attributes.label,
                            "data": data.attributes
                        }
                    })
                );
            }
        }

        if (division_id == "") {
            setVacancies([]);
        }
        else {
            getVacancies();
        }

    }, [keyword]);




    return (
        <div className='grid lg:grid-cols-4 grid-col mt-4'>
            <div className='col-span-4 md:col-span-4'>
                <span className=' text-blue-600 font-medium text-lg '>Application Details</span>
                <hr className='text-blue-600 mt-6' />
            </div>



            <div className='col-span-2 md:col-span-2' >
                <FormElement
                    name="date_submitted"
                    label="Date submitted"
                    errors={context.errors}
                    touched={context.touched}
                    className='col-span-4 md:col-span-1'
                    required={true}
                >
                    <DatePicker
                        initialValues={context.initialValues}

                        id="date_submitted"
                        name="date_submitted"
                        placeholderText="Enter Date"
                        className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                    />
                </FormElement>
            </div>

            {/*Division*/}
            <div className='col-span-4 md:col-span-2'>
                <DataList errors={context.errors} touched={context.touched}
                    id="application_division_id"
                    setKeyword={setDivisionKeyword}
                    label="Division/Section/Unit"
                    title="Division/Section/Unit"
                    name="application_division"
                    className='col-span-4 md:col-span-2'
                    required={true}
                    initialValues={context.initialValues}
                    setValues={context.setValues}
                    updateId={setDivisionId}
                    data={divisions} />
            </div>

            <div className='col-span-2 md:col-span-2' >
                <DataList errors={context.errors} touched={context.touched}
                    required={true}
                    className=''
                    id="vacancy_id"
                    label="Position - Plantilla"
                    title="Position"
                    name="vacancy"
                    initialValues={context.initialValues}
                    setValues={context.setValues}
                    setKeyword={setKeyword}
                    data={vacancies}
                    fillValues={['office_name', 'division_name']}
                />
            </div>







            <FileUpload />
        </div >
    )
}

export default ApplicationDetails