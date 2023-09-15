"use client";

export type formContextType = {
    readonly?: boolean,
    updateAddress: Function,
    errors: any,
    touched: any,
    isEmployee?: boolean,
    initialValues: IValues,
    setValues: Function,
    setChildren: Function,
    isLoading: boolean
};

export type country = {
    value: string,
    label: string,
};

export type child = {
    number: number,
    name: string,
    birthday: string,
}

export type school = {
    level: string,
    name: string,
    degree: string,
    period_from: string,
    period_to: string,
    highest_unit_earned: string,
    year_graduated: string,
    scholarship_academic_awards: string
}


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
    spouse_first_name: string,
    spouse_middle_name: string,
    spouse_last_name: string,
    spouse_suffix: string,
    spouse_occupation: string,
    spouse_employer: string,
    spouse_employer_address: string,
    spouse_employer_telephone: string,
    children: child[],
    father_first_name: string,
    father_middle_name: string,
    father_last_name: string,
    father_suffix: string,
    mother_first_name: string,
    mother_middle_name: string,
    mother_last_name: string,
    mother_suffix: string,
    schools: school[],
}