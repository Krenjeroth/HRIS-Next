"use client";

export type formContextType = {
    readonly?: boolean,
    updateAddress: Function,
    errors: any,
    touched: any,
    isEmployee?: boolean,
    initialValues: IValues,
    setValues: Function,
};

export type country = {
    value: string,
    label: string,
};


// interfaces

export interface IValues {
    // personal information
    employee_id: string,
    employee_type: string,
    first_name: string,
    middle_name: string,
    last_name: string,
    suffix: string,
    birth_place: string,
    birth_date: string,
    age?: number,
    sex: string,
    height?: number,
    weight?: number,
    citizenship: string,
    citizenship_type: string,
    country: string,
    blood_type: string,
    civil_status: string,
    tin: string,
    gsis: string,
    pagibig: string,
    philhealth: string,
    sss: string,
    residential_province: string,
    residential_municipality: string,
    residential_barangay: string,
    residential_house: string,
    residential_subdivision: string,
    residential_street: string,
    residential_zipcode: string,
    permanent_province: string,
    permanent_municipality: string,
    permanent_barangay: string,
    permanent_house: string,
    permanent_subdivision: string,
    permanent_street: string,
    permanent_zipcode: string,
    telephone: string,
    mobile: string,
    email: string,
}