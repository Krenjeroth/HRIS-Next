"use client";
import React, { useContext, useState, useMemo, useRef, useEffect, useCallback } from 'react'
import { FormElement } from '../commons/FormElement';
import { Field, useFormikContext } from 'formik';
import { usePDSContext } from "@/app/contexts/PDSContext"
import HttpService from '../../../../lib/http.services';
import DataList from '../../components/DataList';
import { debounce } from 'lodash';

type datalist = {
    id: string,
    label: any
}


function EmployeeDetail() {
    const { setFieldValue } = useFormikContext();
    const context = usePDSContext();
    const [divisionKeyword, setDivisionKeyword] = useState<string>('');
    const [divisions, setDivisions] = useState<datalist[]>([]);
    const [division_id, setDivisionId] = useState<string>('');
    const [positionKeyword, setPositionKeyword] = useState<string>("");
    const [positionData, setPositionData] = useState<datalist[]>([]);
    const [position_status, setPositionStatus] = useState<string>('');

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

    // reset positions
    useEffect(() => {
        setPositionData([]);
    }, [division_id]);


    useEffect(() => {
        setPositionData([]);
    }, [position_status]);


    // Get LGU Positions
    useEffect(() => {
        async function getPositions() {
            var keyword = positionKeyword.split("-");
            var filters = [];
            if (keyword.length === 2) {
                filters = [{ column: 'lgu_positions.division_id', value: division_id }, { 'column': 'lgu_positions.status', 'value': 'Active' }, { column: 'title', value: keyword[0] }, { column: 'item_number', value: keyword[1] }];
            }
            else {
                filters = [{ column: 'lgu_positions.division_id', value: division_id }, { 'column': 'lgu_positions.status', 'value': 'Active' }, { column: 'title', value: positionKeyword }];
            }

            const postData = {
                activePage: 1,
                filters: filters,
                orderBy: 'title',
                year: '',
                orderAscending: "asc",
                positionStatus: [position_status]
            };


            const resp = await HttpService.post("search-lgu-position", postData);
            if (resp != null) {
                setPositionData(
                    resp.data.data.map((data: any) => {
                        return {
                            "id": data.id,
                            "label": data.attributes.label
                        }
                    })
                );
            }
        }
        getPositions();
    }, [positionKeyword]);

    return (
        <div className='grid lg:grid-cols-4 grid-col'>
            <div className='col-span-4'>
                <span className=' text-blue-600 font-medium text-lg '> Employee Details</span>
                <hr className='text-blue-600 mt-6' />
            </div>
            <FormElement
                name="employee_id"
                label="Employee ID"
                errors={context.errors}
                touched={context.touched}
                className='col-span-4 md:col-span-2'
                required={true}
            >
                <Field
                    id="employee_id"
                    name="employee_id"
                    placeholder="Employee ID"
                    className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                />
            </FormElement>


            {/*Division*/}
            <div className='col-span-4 md:col-span-2'>
                <DataList errors={context.errors} touched={context.touched}
                    id="division_id"
                    setKeyword={setDivisionKeyword}
                    label="Division/Section/Unit"
                    title="Division/Section/Unit"
                    name="division"
                    className='col-span-4 md:col-span-2'
                    required={true}
                    initialValues={context.initialValues}
                    setValues={context.setValues}
                    updateId={setDivisionId}
                    data={divisions} />
            </div>


            <FormElement
                name="employment_status"
                label="Employment Status"
                className='col-span-4 md:col-span-2'
                errors={context.errors}
                touched={context.touched}
                required={true}
            >
                <Field as="select"
                    id="employment_status"
                    name="employment_status"
                    placeholder="Employee Type"
                    className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                        const value = e.target.value;
                        setFieldValue('employment_status', value);
                        setPositionStatus(value);
                    }}
                >
                    <option value="">Select Type </option>
                    <option value="permanent">Permanent</option>
                    <option value="casual">Casual</option>
                    <option value="elective">Elective </option>
                    <option value="coterminous">Coterminous</option>
                    <option value="contractual">Contractual</option>

                </Field>
            </FormElement>



            {/* Current Position */}

            <div className='col-span-4 md:col-span-2'>

                <DataList errors={context.errors} touched={context.touched}
                    id="lgu_position_id"
                    setKeyword={setPositionKeyword}
                    label="Position - Plantilla"
                    title="Position"
                    name="lgu_position"
                    className="col-span-4 md:col-span-1"
                    required={true}
                    initialValues={context.initialValues}
                    setValues={context.setValues}
                    data={positionData} />
            </div>

            <FormElement
                name="employee_status"
                label="Status"
                errors={context.errors}
                touched={context.touched}
                className='col-span-4 md:col-span-2'
                required={true}
            >
                <Field
                    as="select"
                    id="employee_status"
                    name="employee_status"
                    className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                >
                    <option value="">Select Type </option>
                    <option value="Active">Active</option>
                    <option value="Retired">Retired</option>
                    <option value="Terminated">Terminated</option>
                </Field>
            </FormElement>


            {/* positions
            <DataList errors={context.errors} touched={context.touched}
                className="col-span-4 md:col-span-2"
                readonly={false}
                id="position_id"
                setKeyword={setPositionKeyword}
                label="Position - Plantilla*"
                title="Position"
                name="position"
                initialValues={context.initialValues}
                setValues={context.setValues}
                data={positionData} /> */}



        </div>
    )
}

export default EmployeeDetail