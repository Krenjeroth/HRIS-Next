"use client";
import React, { useContext, useState, useMemo, useRef, useEffect } from 'react'
import { FormElement } from '../commons/FormElement';
import { Field, FieldArray, useFormikContext } from 'formik';
import DatePicker from "../DatePicker";
import { usePDSContext } from "@/app/contexts/PDSContext"
import { Button, Table, Tooltip } from 'flowbite-react';
import { HiDocumentAdd, HiDocumentRemove, HiUserAdd, HiUserRemove } from 'react-icons/hi';
import { date, number } from 'yup';
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


    // Get Questions
    useEffect(() => {
        async function getQuestions() {
            const resp = await HttpService.get("question");
            if (resp != null) {
                setQuestions(resp.data.data.map((object: question) => {
                    return {
                        id: object.id,
                        number: object.number,
                        question: object.question
                    }
                }));


            }
        }
        getQuestions();
    }, []);


    useEffect(() => {
        setAnswers(questions.map((object: any, index: number) => {
            return {
                question_id: parseInt(object.id),
                answer: 'false',
                details: ''
            }
        }));
    }, [questions]);



    useEffect(() => {
        if (context.initialValues.answers.length > 0) {
            setAnswers([...context.initialValues.answers]);
        }
        else {
            setAnswers(questions.map((object: any, index: number) => {
                return {
                    question_id: parseInt(object.id),
                    answer: 'false',
                    details: ''
                }
            }));
        }
    }, [context.initialValues]);

    useEffect(() => {
        answers.forEach((object: answer, index: number) => {
            setFieldValue(`answers.${index}.question_id`, object.question_id);
            setFieldValue(`answers.${index}.answer`, object.answer);
            setFieldValue(`answers.${index}.details`, object.details);
        });
    }, [answers]);



    return (
        <>
            <div className='col-span-2 md:col-span-2 '>
                <span className=' text-blue-600 font-medium text-lg '>Questions</span>
                <hr className='text-blue-600 mt-6' />
            </div>
            <div className='col-span-2 md:col-span-2 md:grid-cols-3 grid-col content-start'>
                <Table>
                    <Table.Head>
                        <Table.HeadCell>
                            Id
                        </Table.HeadCell>
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
                                    {
                                        answers.map((object: answer, index: number) => {

                                            // push({
                                            //     question_id: object.question_id,
                                            //     answer: 'false',
                                            //     details: ''
                                            // });

                                            return <Table.Row className="bg-white  dark:bg-gray-800 p-0" key={index}>
                                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                                    <Field
                                                        value={object.question_id}
                                                        id={`answers.${index}.question_id`}
                                                        name={`answers.${index}.question_id`}
                                                        placeholder="School Name"
                                                        className="w-full p-3 pr-12 text-s"
                                                        autoComplete="on"
                                                        readOnly={true}
                                                    />
                                                    <FormFieldError name={`answers.${index}.question_id`} errors={context.errors} touched={context.touched} />

                                                </Table.Cell>
                                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                                    {questions[index].number}
                                                </Table.Cell>
                                                <Table.Cell>
                                                    {questions[index].question}
                                                </Table.Cell>
                                                <Table.Cell>
                                                    <Field type="radio" name={`answers.${index}.answer`} value="false" />
                                                </Table.Cell>
                                                <Table.Cell>
                                                    <Field type="radio" name={`answers.${index}.answer`} value="true" />
                                                </Table.Cell>
                                                <Table.Cell>
                                                    <TableInput
                                                        value={(answers[index]) ? answers[index].details : ""}
                                                        id={`answers.${index}.details`}
                                                        name={`answers.${index}.details`}
                                                        placeholder="Details"
                                                        className="w-full p-3 pr-12 text-sm border border-gray-100 rounded-lg shadow-sm focus:border-sky-500 "
                                                    />
                                                    <FormFieldError name={`answers.${index}.details`} errors={context.errors} touched={context.touched} />
                                                </Table.Cell>
                                            </Table.Row>
                                        })
                                    }

                                </>

                            )}
                        </FieldArray>
                    </Table.Body>
                </Table>

            </div>

        </>
    )
}

export default Question