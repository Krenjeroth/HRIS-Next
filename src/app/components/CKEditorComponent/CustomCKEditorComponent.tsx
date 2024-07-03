"use client";
import React, { useState, useRef, useEffect } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CustomClassicEditor from './ckeditor-custom-build';
import { Field, Form, Formik, FormikHelpers, useFormikContext } from "formik";
import { useDisqualifiedContext } from '@/app/contexts/DisqualifiedContext';

type Props = {
    label: string,
    name: string,
    className: string
}



function index(parameter: Props) {
    const [editorData, setEditorData] = useState<string>('');
    const editorRef = useRef<any>(null);
    const { setFieldValue } = useFormikContext();
    const context = useDisqualifiedContext();

    useEffect(() => {
        setFieldValue(parameter.name, editorData);
        console.log(editorData);

    }, [editorData]);

    useEffect(() => {
        setEditorData(context.initialValues.body);
    }, []);

    return (
        <div>
            <h2>CKEditor 5 with Font Size and Color in React</h2>
            <CKEditor
                editor={CustomClassicEditor}
                data="<p>Start writing...</p>"
                config={{
                    // toolbar: ['bold', 'italic', 'fontColor', 'fontSize', 'undo', 'redo'],
                    // fontColor: {
                    //     colors: [
                    //         {
                    //             color: 'hsl(0, 0%, 0%)',
                    //             label: 'Black'
                    //         },
                    //         {
                    //             color: 'hsl(0, 0%, 30%)',
                    //             label: 'Dim grey'
                    //         },
                    //         {
                    //             color: 'hsl(0, 0%, 60%)',
                    //             label: 'Grey'
                    //         },
                    //         {
                    //             color: 'hsl(0, 0%, 90%)',
                    //             label: 'Light grey'
                    //         },
                    //         {
                    //             color: 'hsl(0, 0%, 100%)',
                    //             label: 'White',
                    //             hasBorder: true
                    //         },
                    //         {
                    //             color: 'hsl(0, 75%, 60%)',
                    //             label: 'Red'
                    //         },
                    //         {
                    //             color: 'hsl(30, 75%, 60%)',
                    //             label: 'Orange'
                    //         },
                    //         {
                    //             color: 'hsl(60, 75%, 60%)',
                    //             label: 'Yellow'
                    //         },
                    //         {
                    //             color: 'hsl(90, 75%, 60%)',
                    //             label: 'Light green'
                    //         },
                    //         {
                    //             color: 'hsl(120, 75%, 60%)',
                    //             label: 'Green'
                    //         },
                    //         {
                    //             color: 'hsl(150, 75%, 60%)',
                    //             label: 'Aquamarine'
                    //         },
                    //         {
                    //             color: 'hsl(180, 75%, 60%)',
                    //             label: 'Turquoise'
                    //         },
                    //         {
                    //             color: 'hsl(210, 75%, 60%)',
                    //             label: 'Light blue'
                    //         },
                    //         {
                    //             color: 'hsl(240, 75%, 60%)',
                    //             label: 'Blue'
                    //         },
                    //         {
                    //             color: 'hsl(270, 75%, 60%)',
                    //             label: 'Purple'
                    //         }
                    //     ]
                    // },
                    // fontSize: {
                    //     options: [
                    //         'tiny',
                    //         'small',
                    //         'default',
                    //         'big',
                    //         'huge'
                    //     ]
                    // }
                }}
                onReady={(editor) => {
                    console.log('Editor is ready!', editor);
                }}
                onChange={(event, editor) => {
                    const data = editor.getData();
                    setEditorData(data);
                    console.log({ event, editor, data });
                }}
                onBlur={(event, editor) => {
                    console.log('Blur.', editor);
                }}
                onFocus={(event, editor) => {
                    console.log('Focus.', editor);
                }}
            />
            <div>
                <h3>Content:</h3>
                <div>{editorData}</div>
            </div>
        </div>
    );
}
export default index;