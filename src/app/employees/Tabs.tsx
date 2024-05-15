"use client";
import { Button, Tabs, TabsRef } from 'flowbite-react';
import React, { ReactNode, useEffect, useRef, createContext, useContext } from 'react';
import { useState } from 'react';
import Table from "../components/Table";
import HttpService from '../../../lib/http.services';
import Drawer from '../components/Drawer';
import { Form, Formik, FormikContext, FormikHelpers, useFormikContext } from 'formik';
import { FormElement } from '@/app/components/commons/FormElement';
import { setFormikErrors } from '../../../lib/utils.service';
import { Alert } from 'flowbite-react';
import dayjs from 'dayjs';
import DatePicker from '../components/DatePicker'
import DataList from '@/app/components/DataList';
import { ArrowRightIcon, EyeIcon, HandThumbUpIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
import { useRouter } from "next/navigation";
import PDS from '../components/PDS';
import { IValues, formContextType, child, school, workExperience, eligibility, voluntaryWork, training, skill, recognition, membership, answer, characterReference, question } from '../types/pds';
import PDSContextProvider from '../contexts/PDSContext';
// types

type row = {
    id: string,
    attributes: object[]
}

type alert = {
    type: string,
    message: string
}

type header = {
    column: string,
    display: string
}

type datalist = {
    id: string,
    label: any
}

type button = {
    icon: ReactNode,
    title: string,
    process: string,
    class: string
}

type filter = {
    column: string;
    value: string;
}





//main function

function AllRequestsTabs() {


    // variables
    const router = useRouter();
    const formikRef = useRef(null);
    const [formikData, setFormikData] = useState<any>();
    const [formActiveTab, setFormActiveTab] = useState<number>(0);
    const [activeTab, setActiveTab] = useState<number>(0);
    const tabsRef = useRef<TabsRef>(null);
    const props = { setActiveTab, tabsRef };
    const [children, setChildren] = useState<child[]>([]);
    const [schools, setSchools] = useState<school[]>([{
        level: '',
        school_name: '',
        degree: '',
        period_from: '',
        period_to: '',
        highest_unit_earned: '',
        year_graduated: '',
        scholarship_academic_awards: ''
    },
    {
        level: '',
        school_name: '',
        degree: '',
        period_from: '',
        period_to: '',
        highest_unit_earned: '',
        year_graduated: '',
        scholarship_academic_awards: ''
    },
    {
        level: '',
        school_name: '',
        degree: '',
        period_from: '',
        period_to: '',
        highest_unit_earned: '',
        year_graduated: '',
        scholarship_academic_awards: ''
    }]);
    const [eligibilities, setEligibilities] = useState<eligibility[]>([
        {
            eligibility_title: '',
            rating: 0,
            date_of_examination_conferment: '',
            place_of_examination_conferment: '',
            license_number: '',
            license_date_validity: ''
        }
    ]);
    const [workExperiences, setWorkExperiences] = useState<workExperience[]>([{
        date_from: '',
        date_to: '',
        position_title: '',
        office_company: '',
        monthly_salary: 0,
        salary_grade: '',
        status_of_appointment: '',
        government_service: false,
    }]);
    const [voluntaryWorks, setVoluntaryWorks] = useState<voluntaryWork[]>([]);
    const [trainings, setTrainings] = useState<training[]>([
        {
            training_title: '',
            attendance_from: '',
            attendance_to: '',
            number_of_hours: 0,
            training_type: '',
            conducted_sponsored_by: '',
        }
    ]);
    const [skills, setSkills] = useState<skill[]>([{
        special_skill: ""
    }]);

    const [recognitions, setRecognitions] = useState<recognition[]>([{
        recognition_title: ""
    }]);
    const [memberships, setMemberships] = useState<membership[]>([{
        organization: ""
    }]);

    const [answers, setAnswers] = useState<answer[]>([
    ]);

    const [characterReferences, setCharacterReferences] = useState<characterReference[]>([
        {
            name: '',
            address: '',
            number: '',
        },
        {
            name: '',
            address: '',
            number: '',
        },
        {
            name: '',
            address: '',
            number: '',
        }
    ]);


    const [activePage, setActivePage] = useState<number>(1);
    const [filters, setFilters] = useState<filter[]>([]);
    const [orderBy, setOrderBy] = useState<string>('');
    const [alerts, setAlerts] = useState<alert[]>([]);
    const [buttons, setButtons] = useState<button[]>([
        { "icon": <EyeIcon className=' w-5 h-5' />, "title": "View", "process": "View", "class": "text-green-500" },
        { "icon": <PencilIcon className=' w-5 h-5' />, "title": "Edit", "process": "Edit", "class": "text-blue-600" },
        { "icon": <TrashIcon className=' w-5 h-5' />, "title": "Delete", "process": "Delete", "class": "text-red-600" }
    ]);
    const [refresh, setRefresh] = useState<boolean>(false);
    const [orderAscending, setOrderAscending] = useState<boolean>(false);
    const [isLoading, setLoading] = useState<boolean>(false);
    const [pagination, setpagination] = useState<number>(1);
    const [process, setProcess] = useState<string>("Add");
    const [year, setYear] = useState<number>(parseInt(dayjs().format('YYYY')));
    const [headers, setHeaders] = useState<header[]>([
        { "column": "id", "display": "id" },
        { "column": "employee_id", "display": "Employee ID" },
        { "column": "first_name", "display": "First Name" },
        { "column": "middle_name", "display": "Middle Name" },
        { "column": "last_name", "display": "Last Name" },
        { "column": "suffix", "display": "Suffix" },
        { "column": "title", "display": "Position" },
        { "column": "item_number", "display": "Plantilla" },
        { "column": "mobile_number", "display": "Mobile Number" },
        { "column": "email_address", "display": "Email" },
        { "column": "employee_status", "display": "Employee Status" }
    ]);




    const [readOnly, setReadOnly] = useState<boolean>(false);
    const [pages, setPages] = useState<number>(0);
    const [data, setData] = useState<row[]>([]);
    const [title, setTitle] = useState<string>("Employee");
    // const [positionKeyword, setPositionKeyword] = useState<string>("");
    // const [positionData, setPositionData] = useState<datalist[]>([]);
    const [id, setId] = useState<number>(0);
    const [reload, setReload] = useState<boolean>(true);
    const [showDrawer, setShowDrawer] = useState<boolean>(false);
    const [defaultData, setDefaultData] = useState<IValues>({
        employee_id: '',
        employment_status: '',
        division_id: '',
        division: '',
        division_autosuggest: '',
        lgu_position_id: '',
        lgu_position: '',
        lgu_position_autosuggest: '',
        employee_status: '',
        first_name: '',
        middle_name: '',
        last_name: '',
        suffix: '',
        birth_place: '',
        birth_date: '',
        age: 0,
        sex: '',
        height: 0,
        weight: 0,
        citizenship: '',
        citizenship_type: '',
        country: 'Philippines',
        blood_type: '',
        civil_status: '',
        tin: '',
        gsis: '',
        pagibig: '',
        philhealth: '',
        sss: '',
        residential_province: '',
        residential_municipality: '',
        residential_barangay: '',
        residential_house: '',
        residential_subdivision: '',
        residential_street: '',
        residential_zipcode: '',
        isSameAddress: false,
        permanent_province: '',
        permanent_municipality: '',
        permanent_barangay: '',
        permanent_house: '',
        permanent_subdivision: '',
        permanent_street: '',
        permanent_zipcode: '',
        telephone: '',
        mobile_number: '',
        email_address: '',
        spouse_first_name: '',
        spouse_middle_name: '',
        spouse_last_name: '',
        spouse_suffix: '',
        spouse_occupation: '',
        spouse_employer: '',
        spouse_employer_address: '',
        spouse_employer_telephone: '',
        children: children,
        father_first_name: '',
        father_middle_name: '',
        father_last_name: '',
        father_suffix: '',
        mother_first_name: '',
        mother_middle_name: '',
        mother_last_name: '',
        mother_suffix: '',
        schools: schools,
        eligibilities: eligibilities,
        workExperiences: workExperiences,
        voluntaryWorks: voluntaryWorks,
        trainings: trainings,
        skills: skills,
        recognitions: recognitions,
        memberships: memberships,
        answers: answers,
        characterReferences: characterReferences,

    });
    var [initialValues, setValues] = useState<IValues>(
        defaultData
    );

    function resetFormik() {
        setValues(defaultData);
    }


    useEffect(() => {
        setFormikData(formikRef);
    }, [formikRef]);


    // Use Effect Hook
    useEffect(() => {
        // query
        async function getData() {
            const postData = {
                activePage: activePage,
                filters: filters,
                orderBy: orderBy,
                orderAscending: orderAscending,
            };
            const resp = await HttpService.post("search-employee", postData);
            if (resp != null) {
                setData(resp.data.data);
                setPages(resp.data.pages);
            }
        }
        getData();
    }, [refresh, filters, orderBy, orderAscending, pagination, activePage, year]);




    useEffect(() => {
        if (id == 0) {
            setValues(defaultData);
        }
        else {
            resetFormik();
            getDataById(id);
        }
    }, [id, reload]);


    useEffect(() => {
        if (!showDrawer) {
            setId(0);
        }
    }, [showDrawer]);

    useEffect(() => {
        if (process === "Delete") {
            setAlerts([{ "type": "failure", "message": "Are you sure to delete this data?" }]);
            setReadOnly(true);
        }
        else {
            // setAlerts([]);
            setReadOnly(false);
        }
    }, [process]);



    //    get data by id
    const getDataById = async (id: number) => {

        try {
            const resp = await HttpService.get("employee/" + id);
            if (resp.status === 200) {
                let data = resp.data;

                resetFormik();

                setChildren(data.children.map((item: child) => {
                    return {
                        'number': (item.number) ? item.number : "",
                        'name': (item.name) ? item.name : "",
                        'birthday': (item.birthday) ? item.birthday : ""
                    };
                }));

                let isSame = false;

                if (data.personalInformation.residential_province == data.personalInformation.permanent_province &&
                    data.personalInformation.residential_municipality == data.personalInformation.permanent_municipality &&
                    data.personalInformation.residential_barangay == data.personalInformation.permanent_barangay &&
                    data.personalInformation.residential_house == data.personalInformation.permanent_house &&
                    data.personalInformation.residential_subdivision == data.personalInformation.permanent_subdivision &&
                    data.personalInformation.residential_street == data.personalInformation.permanent_street &&
                    data.personalInformation.residential_zipcode == data.personalInformation.permanent_zipcode) {

                    isSame = true;

                }

                setValues({
                    employee_id: data.employee.employee_id,
                    employment_status: data.employee.employment_status,
                    division_id: data.division.id,
                    division: data.division.division_code,
                    division_autosuggest: data.division.division_code,
                    lgu_position_id: data.employee.lgu_position_id,
                    lgu_position: data.lguPosition,
                    lgu_position_autosuggest: data.lguPosition,
                    employee_status: data.employee.employee_status,
                    first_name: data.employee.first_name,
                    middle_name: data.employee.middle_name,
                    last_name: data.employee.last_name,
                    suffix: (data.employee.suffix) ? data.employee.suffix : "",
                    birth_place: data.personalInformation.birth_place,
                    birth_date: data.personalInformation.birth_date,
                    age: data.personalInformation.age,
                    sex: data.personalInformation.sex,
                    height: data.personalInformation.height,
                    weight: data.personalInformation.weight,
                    citizenship: data.personalInformation.citizenship,
                    citizenship_type: (data.personalInformation.citizenship_type) ? data.personalInformation.citizenship_type : "",
                    country: (data.personalInformation.country) ? data.personalInformation.country : "Philippines",
                    blood_type: data.personalInformation.blood_type,
                    civil_status: data.personalInformation.civil_status,
                    tin: (data.personalInformation.tin) ? data.personalInformation.tin : "",
                    gsis: (data.personalInformation.gsis) ? data.personalInformation.gsis : "",
                    pagibig: (data.personalInformation.pagibig) ? data.personalInformation.pagibig : "",
                    philhealth: (data.personalInformation.philhealth) ? data.personalInformation.philhealth : "",
                    sss: (data.personalInformation.sss) ? data.personalInformation.sss : "",
                    residential_province: data.personalInformation.residential_province,
                    residential_municipality: data.personalInformation.residential_municipality,
                    residential_barangay: data.personalInformation.residential_barangay,
                    residential_house: data.personalInformation.residential_house,
                    residential_subdivision: (data.personalInformation.residential_subdivision) ? data.personalInformation.residential_subdivision : "",
                    residential_street: data.personalInformation.residential_street,
                    residential_zipcode: data.personalInformation.residential_zipcode,
                    isSameAddress: isSame,
                    permanent_province: data.personalInformation.permanent_province,
                    permanent_municipality: data.personalInformation.permanent_municipality,
                    permanent_barangay: data.personalInformation.permanent_barangay,
                    permanent_house: data.personalInformation.permanent_house,
                    permanent_subdivision: (data.personalInformation.permanent_subdivision) ? data.personalInformation.permanent_subdivision : "",
                    permanent_street: data.personalInformation.permanent_street,
                    permanent_zipcode: data.personalInformation.permanent_zipcode,
                    telephone: (data.personalInformation.telephone) ? data.personalInformation.telephone : "",
                    mobile_number: data.personalInformation.mobile_number,
                    email_address: (data.personalInformation.email_address) ? data.personalInformation.email_address : "",
                    spouse_first_name: (data.familyBackground.spouse_first_name) ? data.familyBackground.spouse_first_name : "",
                    spouse_middle_name: (data.familyBackground.spouse_middle_name) ? data.familyBackground.spouse_middle_name : "",
                    spouse_last_name: (data.familyBackground.spouse_last_name) ? data.familyBackground.spouse_last_name : "",
                    spouse_suffix: (data.familyBackground.spouse_suffix) ? data.familyBackground.spouse_suffix : "",
                    spouse_occupation: (data.familyBackground.spouse_occupation) ? data.familyBackground.spouse_occupation : "",
                    spouse_employer: (data.familyBackground.spouse_employer) ? data.familyBackground.spouse_employer : "",
                    spouse_employer_address: (data.familyBackground.spouse_employer_address) ? data.familyBackground.spouse_employer_address : "",
                    spouse_employer_telephone: (data.familyBackground.spouse_employer_telephone) ? data.familyBackground.spouse_employer_telephone : "",
                    // children: children,
                    children: data.children.map((item: child) => {
                        return {
                            'number': (item.number) ? item.number : "",
                            'name': (item.name) ? item.name : "",
                            'birthday': (item.birthday) ? item.birthday : ""
                        };
                    }),
                    father_first_name: (data.familyBackground.father_first_name) ? data.familyBackground.father_first_name : "",
                    father_middle_name: (data.familyBackground.father_middle_name) ? data.familyBackground.father_middle_name : "",
                    father_last_name: (data.familyBackground.father_last_name) ? data.familyBackground.father_last_name : "",
                    father_suffix: (data.familyBackground.father_suffix) ? data.familyBackground.father_suffix : "",
                    mother_first_name: (data.familyBackground.mother_first_name) ? data.familyBackground.mother_first_name : "",
                    mother_middle_name: (data.familyBackground.mother_middle_name) ? data.familyBackground.mother_middle_name : "",
                    mother_last_name: (data.familyBackground.mother_last_name) ? data.familyBackground.mother_last_name : "",
                    mother_suffix: (data.familyBackground.mother_suffix) ? data.familyBackground.mother_suffix : "",
                    schools: data.schools.map((item: school) => {
                        return {
                            'level': (item.level) ? item.level : "",
                            'school_name': (item.school_name) ? item.school_name : "",
                            'degree': (item.degree) ? item.degree : "",
                            'period_from': (item.period_from) ? item.period_from : "",
                            'period_to': (item.period_to) ? item.period_to : "",
                            'highest_unit_earned': (item.highest_unit_earned) ? item.highest_unit_earned : "",
                            'year_graduated': (item.year_graduated) ? item.year_graduated : "",
                            'scholarship_academic_awards': (item.scholarship_academic_awards) ? item.scholarship_academic_awards : "",
                        };
                    }),
                    eligibilities: data.eligibilities.map((item: eligibility) => {
                        return {
                            eligibility_title: item.eligibility_title,
                            rating: item.rating,
                            date_of_examination_conferment: item.date_of_examination_conferment,
                            place_of_examination_conferment: item.place_of_examination_conferment,
                            license_number: (item.license_number) ? item.license_number : "",
                            license_date_validity: (item.license_date_validity) ? item.license_date_validity : ""
                        }
                    }),
                    workExperiences: data.workExperiences.map((item: workExperience) => {
                        return {
                            date_from: item.date_from,
                            date_to: item.date_to,
                            position_title: item.position_title,
                            office_company: item.office_company,
                            monthly_salary: item.monthly_salary,
                            salary_grade: (item.salary_grade) ? item.salary_grade : "",
                            status_of_appointment: item.status_of_appointment,
                            government_service: item.government_service
                        }
                    }),
                    voluntaryWorks: data.voluntaryWorks.map((item: voluntaryWork) => {
                        return {
                            organization_name: (item.organization_name) ? item.organization_name : "",
                            organization_address: (item.organization_address) ? item.organization_address : "",
                            date_from: (item.date_from) ? item.date_from : "",
                            date_to: (item.date_to) ? item.date_to : "",
                            number_of_hours: (item.number_of_hours) ? item.number_of_hours : "",
                            position_nature_of_work: (item.position_nature_of_work) ? item.position_nature_of_work : ""
                        }
                    }),
                    trainings: data.trainings.map((item: training) => {

                        return {
                            training_title: item.training_title,
                            attendance_from: item.attendance_from,
                            attendance_to: item.attendance_to,
                            number_of_hours: item.number_of_hours,
                            training_type: item.training_type,
                            conducted_sponsored_by: item.conducted_sponsored_by
                        }
                    }),
                    skills: data.skills.map((item: skill) => {

                        return { special_skill: item.special_skill }

                    }),
                    recognitions: data.recognitions.map((item: recognition) => {
                        return { recognition_title: item.recognition_title }

                    }),
                    memberships: data.memberships.map((item: membership) => {
                        return { organization: item.organization }
                    }),
                    answers: data.answers.map((item: answer) => {
                        return {
                            question_id: item.question_id,
                            answer: item.answer,
                            details: (item.details) ? item.details : ""
                        }
                    }),
                    characterReferences: data.characterReferences.map((item: characterReference) => {
                        return {
                            name: item.name,
                            address: item.address,
                            number: item.number
                        }
                    }),
                });


                setShowDrawer(true);
            }
        }
        catch (error: any) {
        }

    };


    // clear alert
    function clearAlert(key: number) {
        const temp_alerts = [...alerts];
        temp_alerts.splice(key, 1);
        setAlerts(temp_alerts);
    }

    // Submit form
    const onFormSubmit = async (
        values: any,
        { setSubmitting, resetForm, setFieldError }: FormikHelpers<IValues>
    ) => {
        setLoading(true);
        if (values.isSameAddress) {
            values.permanent_barangay = values.residential_barangay;
            values.permanent_house = values.residential_house;
            values.permanent_municipality = values.residential_municipality;
            values.permanent_province = values.residential_province;
            values.permanent_street = values.residential_street;
            values.permanent_subdivision = values.residential_subdivision;
            values.permanent_zipcode = values.residential_zipcode;
        }
        if (values.citizenship == "Filipino") {
            values.citizenship_type = "";
            values.country = "";
        }

        alerts.forEach(element => {
            alerts.pop();
        });


        try {

            // add

            if (process === "Add") {
                const resp = await HttpService.post("employee", values);
                if (resp.status === 200) {
                    let status = resp.data.status;
                    if (status === "Request was Successful") {
                        alerts.push({ "type": "success", "message": "Data has been successfully saved!" });
                        resetForm({});
                        resetFormik();
                        setActivePage(1);
                        setFilters([]);
                        setRefresh(!refresh);
                        setId(0);
                        setProcess("Add");
                    }
                    else {
                        if (typeof resp.data != "undefined") {
                            alerts.push({ "type": "failure", "message": resp.data.message });
                        }
                    }
                }

            }
            // update
            else if (process === "Edit") {

                const resp = await HttpService.patch("employee/" + id, values)
                if (resp.status === 200) {
                    let status = resp.data.status;
                    if (status === "Request was Successful") {
                        alerts.push({ "type": "success", "message": "Data has been successfully saved!" });
                        setActivePage(1);
                        setFilters([]);
                        setRefresh(!refresh);
                    }
                    else {
                        if (typeof resp.data != "undefined") {
                            alerts.push({ "type": "failure", "message": resp.data.message });
                        }
                    }
                }
            }

            // delete
            else {
                if (id != 0) {
                    const resp = await HttpService.delete("employee/" + id);
                    if (resp.status === 200) {
                        let status = resp.data.status;
                        if (status === "Request was Successful") {
                            alerts.push({ "type": "success", "message": resp.data.message });
                            setActivePage(1);
                            setFilters([]);
                            setRefresh(!refresh);
                            setId(0);
                            setProcess("Add");

                        }
                        else {
                            if (typeof resp.data != "undefined") {
                                alerts.push({ "type": "failure", "message": resp.data.message });
                            }
                        }
                    }
                }
                else {
                    setProcess("Add");
                }
            }

        }
        catch (error: any) {
            if (error.response.status === 422) {
                setFormikErrors(error.response.data.errors, setFieldError);
            }
        }
        setLoading(false);
    };

    // tsx
    return (
        <>
            {/* drawer */}
            <Drawer width='w-3/4' setShowDrawer={setShowDrawer} setProcess={setProcess} showDrawer={showDrawer} setId={setId} title={`${process} ${title}`}>
                {/* formik */}
                <Formik innerRef={formikRef} initialValues={initialValues} onSubmit={onFormSubmit} enableReinitialize={true} validateOnBlur={false} validateOnChange={false}
                >
                    {({ errors, touched }) => (

                        // forms
                        <Form className='p-2' id="formik">
                            <div className='alert-container' id="alert-container">
                                {alerts.map((item, index) => {
                                    return (
                                        <Alert className='my-1' color={item.type} key={index} onDismiss={() => { clearAlert(index) }} > <span> <p><span className="font-medium">{item.message}</span></p></span></Alert>
                                    );
                                })}
                            </div>
                            <PDSContextProvider
                                formikData={formikData}
                                isLoading={isLoading}
                                errors={errors}
                                touched={touched}
                                initialValues={initialValues}
                                setValues={setValues}
                                process={process}
                                id={id}>
                                <PDS
                                    formActiveTab={formActiveTab}
                                    setFormActiveTab={setFormActiveTab}
                                />
                            </PDSContextProvider>
                        </Form>
                    )}
                </Formik>
            </Drawer>
            <div className={`${showDrawer ? "blur-[1px]" : ""}`}>


                {/*  Tabs */}
                <Tabs.Group
                    aria-label="Tabs with underline"
                    style="underline"
                    ref={props.tabsRef}

                >

                    <Tabs.Item title={title + "s"} active>

                        <Button className='btn btn-sm text-white rounded-lg bg-cyan-500  hover:scale-90 hover:bg-cyan-400 shadow-sm text' onClick={() => {
                            setValues(defaultData);
                            setShowDrawer(true);
                            setId(0);
                            setProcess("Add");
                        }} onDoubleClick={() => { setShowDrawer(false); }}>Add {title}
                        </Button>

                        {/*Table*/}
                        <Table
                            buttons={buttons}
                            filters={filters}
                            setFilters={setFilters}
                            orderBy={orderBy}
                            setOrderBy={setOrderBy}
                            orderAscending={orderAscending}
                            setOrderAscending={setOrderAscending}
                            pagination={pagination}
                            setpagination={setpagination}
                            data={data}
                            pages={pages}
                            activePage={activePage}
                            setActivePage={setActivePage}
                            headers={headers}
                            setId={setId}
                            reload={reload}
                            setReload={setReload}
                            setProcess={setProcess}
                            setYear={setYear}
                        >
                        </Table>
                    </Tabs.Item>
                </Tabs.Group >

            </div >
        </>
    );
}

export default AllRequestsTabs