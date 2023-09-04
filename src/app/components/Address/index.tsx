"use client";
import React, { useState } from 'react';
import { usePDSContext } from "@/app/contexts/PDSContext"
import { FormElement } from '../commons/FormElement';
import { Field } from 'formik';
// These plugin has no typescript types
// @ts-expect-error
import { sort, provinces, getCityMunByProvince, getBarangayByMun } from 'phil-reg-prov-mun-brgy';

type props = {
    name: string
}

type province = {
    name: string
    prov_code: string,
    reg_code: string
}

type municipality = {
    name: string
    mun_code: string,
    prov_code: string
}

type barangay = {
    name: string
    mun_code: string
}




function index(paramater: props) {
    const [municipality, setMunicipality] = useState<string>('');
    const [provinces_list, setProvinces] = useState<province[]>(sort(provinces, 'A'));
    const [municipalities, setMunicipalities] = useState<municipality[]>([]);
    const [barangays, setBarangays] = useState<barangay[]>([]);
    const context = usePDSContext();

    const provinceOnchange = (e: React.FormEvent<HTMLInputElement>) => {
        const filtered = provinces_list.filter(((object: province) => {
            return object.name == e.currentTarget.value
        }))
        setMunicipality('');
        if (filtered.length === 0) {
            setMunicipalities([]);
            setBarangays([]);
        }
        else {
            const municipalities = getCityMunByProvince(filtered[0].prov_code);
            setMunicipalities(municipalities);
            setBarangays([]);
        }
    }

    const municipalityOnchange = (e: React.FormEvent<HTMLInputElement>) => {
        const filtered = municipalities.filter(((object: municipality) => {
            return object.name == e.currentTarget.value
        }));
        if (filtered.length === 0) {
            setMunicipality('');
            setBarangays([]);
        }
        else {
            setMunicipality(filtered[0].name);
            const barangays = getBarangayByMun(filtered[0].mun_code);
            setBarangays(barangays);
        }
    }


    return (
        <>
            <FormElement
                name={`${paramater.name}_province`}
                label="Province *"
                errors={context.errors}
                touched={context.touched}
                className='col-span-4 md:col-span-1'
            >
                <Field as="select"
                    onChange={(e: React.FormEvent<HTMLInputElement>) => {
                        provinceOnchange(e);
                    }}
                    id={`${paramater.name}_province`}
                    name={`${paramater.name}_province`}
                    placeholder="Province"
                    className="w-full p-4 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                >
                    <option value="">Select Province </option>
                    {provinces_list.map((object: province, index: number) => {
                        return <option key={index} value={object.name}>{object.name}</option>
                    })}
                </Field>
            </FormElement>

            <FormElement
                name={`${paramater.name}_municipality`}
                label="Municipality/City *"
                errors={context.errors}
                touched={context.touched}
                className='col-span-4 md:col-span-1'
            >
                <Field
                    onChange={(e: React.FormEvent<HTMLInputElement>) => {
                        municipalityOnchange(e);
                    }}
                    value={municipality}
                    as="select"
                    id={`${paramater.name}_municipality`}
                    name={`${paramater.name}_municipality`}
                    placeholder="Municipality"
                    className="w-full p-4 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                >
                    <option value="">Select Municipality/City</option>
                    {municipalities.map((object: municipality, index: number) => {
                        return <option key={index} value={object.name}>{object.name}</option>
                    })}

                </Field>
            </FormElement>

            <FormElement
                name={`${paramater.name}_barangay`}
                label="Barangay"
                errors={context.errors}
                touched={context.touched}
                className='col-span-4 md:col-span-1'
            >
                <Field

                    as="select"
                    id={`${paramater.name}_barangay`}
                    name={`${paramater.name}_barangay`}
                    placeholder="Barangay *"
                    className="w-full p-4 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                >
                    <option value="">Select Barangay</option>
                    {barangays.map((object: barangay, index: number) => {
                        return <option key={index} value={object.name}>{object.name}</option>
                    })}

                </Field>
            </FormElement >



            <FormElement
                name={`${paramater.name}_house`}
                label="House/Block/Lot No. *"
                errors={context.errors}
                touched={context.touched}
                className='col-span-4 md:col-span-1'
            >
                <Field
                    id={`${paramater.name}_house`}
                    name={`${paramater.name}_house`}
                    placeholder="House/Block/Lot No."
                    className="w-full p-4 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                />
            </FormElement >

            <FormElement
                name={`${paramater.name}_subdivision`}
                label="Subdivision/Village"
                errors={context.errors}
                touched={context.touched}
                className='col-span-4 md:col-span-1'
            >
                <Field
                    id={`${paramater.name}_subdivision`}
                    name={`${paramater.name}_subdivision`}
                    placeholder="Subdivision/Village"
                    className="w-full p-4 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                />
            </FormElement >


            <FormElement
                name={`${paramater.name}_street`}
                label="Street"
                errors={context.errors}
                touched={context.touched}
                className='col-span-4 md:col-span-1'
            >
                <Field
                    id={`${paramater.name}_street`}
                    name={`${paramater.name}_street`}
                    placeholder="Street"
                    className="w-full p-4 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                />
            </FormElement >

            <FormElement
                name={`${paramater.name}_zipcode`}
                label="Zipcode *"
                errors={context.errors}
                touched={context.touched}
                className='col-span-4 md:col-span-1'
            >
                <Field
                    id={`${paramater.name}_zipcode`}
                    name={`${paramater.name}_zipcode`}
                    placeholder="Zipcode"
                    className="w-full p-4 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                />
            </FormElement >
        </>
    )
}

export default index