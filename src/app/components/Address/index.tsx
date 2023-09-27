"use client";
import React, { useEffect, useState } from 'react';
import { usePDSContext } from "@/app/contexts/PDSContext"
import { FormElement } from '../commons/FormElement';
import { Field, useFormikContext } from 'formik';
// These plugin has no typescript types
// @ts-expect-error
import { sort, provinces, getCityMunByProvince, getBarangayByMun } from 'phil-reg-prov-mun-brgy';
import { ToggleSwitch } from 'flowbite-react';

type props = {
    name: string,
    sameAddress?: boolean,
    setSameAddress: Function
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




function index(parameter: props) {
    const [province, setProvince] = useState<string>('');
    const [municipality, setMunicipality] = useState<string>('');
    const [provinces_list, setProvinces] = useState<province[]>(sort(provinces, 'A'));
    const [municipalities, setMunicipalities] = useState<municipality[]>([]);
    const [barangays, setBarangays] = useState<barangay[]>([]);
    const context = usePDSContext();
    const { setFieldValue } = useFormikContext();


    const provinceOnchange = (e: React.FormEvent<HTMLInputElement>) => {
        const filtered = provinces_list.filter(((object: province) => {
            return object.name == e.currentTarget.value
        }))
        setMunicipality('');
        if (filtered.length === 0) {
            setFieldValue(`${parameter.name}_province`, '');
            setFieldValue(`${parameter.name}_municipality`, '');
            setFieldValue(`${parameter.name}_barangay`, '');
            setProvince('');
            setMunicipalities([]);
            setBarangays([]);
        }
        else {
            setProvince(filtered[0].name);
            setFieldValue(`${parameter.name}_province`, filtered[0].name);
            const municipalities = getCityMunByProvince(filtered[0].prov_code);
            setMunicipalities(municipalities);
            setFieldValue(`${parameter.name}_municipality`, '');
            setFieldValue(`${parameter.name}_barangay`, '');
            setBarangays([]);
        }
    }

    const municipalityOnchange = (e: React.FormEvent<HTMLInputElement>) => {
        const filtered = municipalities.filter(((object: municipality) => {
            return object.name == e.currentTarget.value
        }));
        if (filtered.length === 0) {
            setMunicipality('');
            setFieldValue(`${parameter.name}_municipality`, '');
            setFieldValue(`${parameter.name}_barangay`, '');
            setBarangays([]);
        }
        else {
            setMunicipality(filtered[0].name);
            const barangays = getBarangayByMun(filtered[0].mun_code);
            setFieldValue(`${parameter.name}_municipality`, filtered[0].name);
            setFieldValue(`${parameter.name}_barangay`, '');
            setBarangays(barangays);
        }
    }

    useEffect(() => {
        if (parameter.sameAddress === true) {
            setProvince('');
            setMunicipality('');
            setFieldValue(`${parameter.name}_barangay`, '');
            setFieldValue(`${parameter.name}_house`, '');
            setFieldValue(`${parameter.name}_subdivision`, '');
            setFieldValue(`${parameter.name}_street`, '');
            setFieldValue(`${parameter.name}_zipcode`, '');
        }
    }, [parameter.sameAddress])


    return (
        <>

            {typeof parameter.sameAddress == 'undefined' ?
                '' :
                <div
                    className={`col-span-4 mt-4 `}
                    id="toggle"
                >
                    <ToggleSwitch
                        checked={!parameter.sameAddress ? false : true}
                        label="The same as Residential Address"
                        onChange={function () {
                            parameter.setSameAddress(typeof parameter.sameAddress == 'undefined' ? false : !parameter.sameAddress);
                        }}
                    />
                </div>
            }


            <FormElement
                name={`${parameter.name}_province`}
                label="Province *"
                errors={context.errors}
                touched={context.touched}
                className={`col-span-4 md:col-span-1 ${parameter.sameAddress === true ? 'hidden	' : ''}`}
            >
                <Field as="select"
                    value={province}
                    onChange={(e: React.FormEvent<HTMLInputElement>) => {
                        provinceOnchange(e);
                    }}
                    id={`${parameter.name}_province`}
                    name={`${parameter.name}_province`}
                    placeholder="Province"
                    className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                >
                    <option value="">Select Province </option>
                    {provinces_list.map((object: province, index: number) => {
                        return <option key={index} value={object.name}>{object.name}</option>
                    })}
                </Field>
            </FormElement>

            <FormElement
                name={`${parameter.name}_municipality`}
                label="Municipality/City *"
                errors={context.errors}
                touched={context.touched}
                className={`col-span-4 md:col-span-1 ${parameter.sameAddress === true ? 'hidden	' : ''}`}
            >
                <Field
                    onChange={(e: React.FormEvent<HTMLInputElement>) => {
                        municipalityOnchange(e);
                    }}
                    value={municipality}
                    as="select"
                    id={`${parameter.name}_municipality`}
                    name={`${parameter.name}_municipality`}
                    placeholder="Municipality"
                    className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                >
                    <option value="">Select Municipality/City</option>
                    {municipalities.map((object: municipality, index: number) => {
                        return <option key={index} value={object.name}>{object.name}</option>
                    })}

                </Field>
            </FormElement>

            <FormElement
                name={`${parameter.name}_barangay`}
                label="Barangay"
                errors={context.errors}
                touched={context.touched}
                className={`col-span-4 md:col-span-1 ${parameter.sameAddress === true ? 'hidden	' : ''}`}
            >
                <Field

                    as="select"
                    id={`${parameter.name}_barangay`}
                    name={`${parameter.name}_barangay`}
                    placeholder="Barangay *"
                    className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                >
                    <option value="">Select Barangay</option>
                    {barangays.map((object: barangay, index: number) => {
                        return <option key={index} value={object.name}>{object.name}</option>
                    })}

                </Field>
            </FormElement >



            <FormElement
                name={`${parameter.name}_house`}
                label="House/Block/Lot No. *"
                errors={context.errors}
                touched={context.touched}
                className={`col-span-4 md:col-span-1 ${parameter.sameAddress === true ? 'hidden	' : ''}`}
            >
                <Field
                    id={`${parameter.name}_house`}
                    name={`${parameter.name}_house`}
                    placeholder="House/Block/Lot No."
                    className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                />
            </FormElement >

            <FormElement
                name={`${parameter.name}_subdivision`}
                label="Subdivision/Village"
                errors={context.errors}
                touched={context.touched}
                className={`col-span-4 md:col-span-1 ${parameter.sameAddress === true ? 'hidden	' : ''}`}
            >
                <Field
                    id={`${parameter.name}_subdivision`}
                    name={`${parameter.name}_subdivision`}
                    placeholder="Subdivision/Village"
                    className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                />
            </FormElement >


            <FormElement
                name={`${parameter.name}_street`}
                label="Street"
                errors={context.errors}
                touched={context.touched}
                className={`col-span-4 md:col-span-1 ${parameter.sameAddress === true ? 'hidden	' : ''}`}
            >
                <Field
                    id={`${parameter.name}_street`}
                    name={`${parameter.name}_street`}
                    placeholder="Street"
                    className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                />
            </FormElement >

            <FormElement
                name={`${parameter.name}_zipcode`}
                label="Zipcode *"
                errors={context.errors}
                touched={context.touched}
                className={`col-span-4 md:col-span-1 ${parameter.sameAddress === true ? 'hidden	' : ''}`}
            >
                <Field
                    id={`${parameter.name}_zipcode`}
                    name={`${parameter.name}_zipcode`}
                    placeholder="Zipcode"
                    className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500"
                />
            </FormElement >
        </>
    )
}

export default index