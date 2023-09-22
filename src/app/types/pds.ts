"use client";

export type formContextType = {
    readonly?: boolean,
    updateAddress: Function,
    errors: any,
    touched: any,
    isEmployee?: boolean,
    initialValues: IValues,
    setValues: Function,
    setAnswers: Function,
    isLoading: boolean,
    process: string,
    children?: React.ReactNode,

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


export type characterReference = {
    name: string,
    address: string,
    number: string,
}

export type answer = {
    number: string,
    answer: string,
    details: string,
    question: string
}


export type eligibility = {
    eligibility_title: string,
    rating: number,
    date_of_examination_conferment: string,
    place_of_examination_conferment: string,
    license_number: string,
    license_date_validity: string,
}

export type workExperience = {
    date_from: string,
    date_to: string,
    position_title: string,
    office_company: string,
    monthly_salary: number,
    salary_grade: string,
    status_of_appointment: string,
    government_service: boolean,
}

export type voluntaryWork = {
    organization_name: string,
    organization_address: string,
    period_from: string,
    period_to: string,
    number_of_hours: number,
    position_nature_of_work: string
}


export type training = {
    training_title: string,
    attendance_from: string,
    attendance_to: string,
    number_of_hours: number,
    training_type: string,
    conducted_sponsored_by: string
}

export type question = {
    id: string,
    number: string,
    question: string
}

export type skill = {
    name: string
}

export type recognition = {
    title: string
}

export type membership = {
    title: string
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
    eligibilities: eligibility[],
    workExperiences: workExperience[],
    voluntaryWorks: voluntaryWork[],
    trainings: training[],
    skills: skill[],
    recognitions: recognition[]
    memberships: membership[]
    answers: answer[],
    characterReferences: characterReference[]
}