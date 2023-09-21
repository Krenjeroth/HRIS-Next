"use client";
import React, { useContext, useState, useMemo, useRef, useEffect } from 'react'
import { FormElement } from '../commons/FormElement';
import { Field, FieldArray, useFormikContext } from 'formik';
import DatePicker from "../DatePicker";
import { usePDSContext } from "@/app/contexts/PDSContext"
import { Button, Table, Tooltip } from 'flowbite-react';
import { HiDocumentAdd, HiDocumentRemove, HiUserAdd, HiUserRemove } from 'react-icons/hi';
import { date } from 'yup';
import { FormFieldError } from '../commons/FormFieldError';
import { answer, child, eligibility, question } from '@/app/types/pds';
import { initial } from 'lodash';
import HttpService from '../../../../lib/http.services';
import TableInput from './TableInput';


function Question() {
    const { setFieldValue } = useFormikContext();
    const context = usePDSContext();
    const [questions, setQuestions] = useState<question[]>([]);
    const [answers, setAnswers] = useState<answer[]>([]);

    useEffect(() => {
        // console.log(answers);
        // if (answers.length > 0) {
        //     answers.forEach((object, index) => {
        //         // setFieldValue("first_name","duriel");
        //         setFieldValue(`answers.${index}.number`, "hi");
        //         // setFieldValue(`answers.${index}.question`, object.question);
        //         setFieldValue(`answers.${index}.answer`, object.answer);
        //     });

        // }
    }, [answers])


    // Get Questions
    useEffect(() => {
        async function getQuestions() {
            const resp = await HttpService.get("question");
            if (resp != null) {
                setAnswers(resp.data.data.map((object: question) => {
                    return {
                        number: object.number,
                        question: object.question,
                        answer: 'no',
                        details: ''
                    }
                }));
            }
        }
        getQuestions();
    }, []);

    return (
        <>
            <div className='col-span-2 md:col-span-2 '>
                <span className=' text-cyan-600 font-medium text-lg '>Questions</span>
                <hr className='text-cyan-600 mt-6' />
            </div>
            <div className='col-span-2 md:col-span-2 md:grid-cols-3 grid-col content-start'>
                {/* <Table>
                    <Table.Head>
                        <Table.HeadCell>
                            Number
                        </Table.HeadCell>
                        <Table.HeadCell>
                            Question
                        </Table.HeadCell>
                        <Table.HeadCell>
                            No
                        </Table.HeadCell>
                        <Table.HeadCell>
                            Yes
                        </Table.HeadCell>
                        <Table.HeadCell>
                            Give Details/Specify
                        </Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        <FieldArray name="answers">
                            {({ insert, remove, push }) => (
                                <>
                                    {answers.map((object, index: number) => {
                                        return <Table.Row className="bg-white  dark:bg-gray-800 p-0" key={index}>
                                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                                <Field
                                                    readOnly={true}
                                                    value={object.number}
                                                    id={`answers.${index}.number`}
                                                    name={`answers.${index}.number`}
                                                    placeholder=" Number *"
                                                    className="w-full p-3  text-sm   rounded-lg "
                                                    autoComplete="on"
                                                />
                                                <FormFieldError name={`answers.${index}.number`} errors={context.errors} touched={context.touched} />
                                            </Table.Cell>
                                            <Table.Cell>
                                                {object.question}
                                            </Table.Cell>
                                            <Table.Cell>
                                                <Field type="radio" name={`answers.${index}.answer`} value="No" />
                                            </Table.Cell>
                                            <Table.Cell>
                                                <Field type="radio" name={`answers.${index}.answer`} value="Yes" />
                                            </Table.Cell>
                                            <Table.Cell>
                                                <TableInput
                                                    value={object.details}
                                                    id={`answers.${index}.details`}
                                                    name={`answers.${index}.details`}
                                                    placeholder=" Number *"
                                                    className="w-full p-3  text-sm   rounded-lg "
                                                />
                                                <FormFieldError name={`answers.${index}.details`} errors={context.errors} touched={context.touched} />
                                            </Table.Cell>
                                        </Table.Row>
                                    })}
                                </>
                            )}
                        </FieldArray>
                    </Table.Body>
                </Table>  */}
                {/* 
                <FieldArray
                    name="answers"
                    render={({ move, swap, push, insert, unshift, pop }) => (
                        <>
                            {answers.map((object, index: number) => {
                                <Field
                                    value={object.number}
                                    id={`answers.${index}.number`}
                                    name={`answers.${index}.number`}
                                    placeholder=" Number *"
                                    className="w-full p-3  text-sm border   rounded-lg "
                                    autoComplete="on"
                                />
                            })}
                        </>
                    )}
                /> */}

                <FieldArray name="answers">
                    {({ insert, remove, push }) => (
                        <>
                            {answers.map((object, index: number) => {
                                return <div key={index}>
                                    <Field
                                        // readOnly={true}
                                        // value={object.number}
                                        id={`answers.${index}.number`}
                                        name={`answers.${index}.number`}
                                        placeholder=" Number *"
                                        className="w-full p-3  text-sm   rounded-lg "
                                        autoComplete="on"

                                        onClick={() => {
                                            push({
                                                number: object.number
                                            })
                                        }}
                                    />
                                    <FormFieldError name={`answers.${index}.number`} errors={context.errors} touched={context.touched} />
                                </div >
                            })}
                        </>
                    )}
                </FieldArray>


            </div>

        </>
    )
}

export default Question