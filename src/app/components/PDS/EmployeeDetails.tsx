"use client";
import React, { useContext, useState, useMemo, useRef, useEffect } from 'react'
import { FormElement } from '../commons/FormElement';
import { Field, useFormikContext } from 'formik';
import { usePDSContext } from "@/app/contexts/PDSContext"
import HttpService from '../../../../lib/http.services';
import DataList from '../../components/DataList';

type datalist = {
    id: string,
    label: any
}


function EmployeeDetail() {
    const { setFieldValue } = useFormikContext();
    const context = usePDSContext();
    const [divisionKeyword, setDivisionKeyword] = useState<string>('');
    const [divisions, setDivisions] = useState<datalist[]>([]);


    // get divisions
    useEffect(() => {

        async function getPositions() {
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

        getPositions();
    }, [divisionKeyword]);

    return (
        <div className='grid lg:grid-cols-4 grid-col'>
            <div className='col-span-4'>
                <span className=' text-cyan-600 font-medium text-lg '> Employee Details</span>
                <hr className='text-cyan-600 mt-6' />
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
                >
                    <option value="">Select Type </option>
                    <option value="Permanent">Permanent</option>
                    <option value="Casual">Casual</option>
                    <option value="Elective">Elective </option>
                    <option value="Coterminous">Coterminous</option>
                    <option value="Contractual">Contractual</option>

                </Field>
            </FormElement>

            {/*Division*/}

            <DataList errors={context.errors} touched={context.touched}
                readonly={context.process === "Delete" ? true : false}
                id="division_id"
                setKeyword={setDivisionKeyword}
                label="Division/Section/Unit"
                title="Division/Section/Unit"
                name="division"
                className="col-span-4 md:col-span-2"
                required={true}
                initialValues={context.initialValues}
                setValues={context.setValues}
                data={divisions} />
        </div>
    )
}

export default EmployeeDetail