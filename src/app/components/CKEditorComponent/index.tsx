"use client";
import React, { useState, useRef, useEffect } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
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
        <div className={parameter.className}>
            <h2 className='text-sm font-medium my-1'>{parameter.label}</h2>
            <CKEditor
            
                editor={ClassicEditor}
                data={context.initialValues.body}
                onReady={editor => {
                    editorRef.current = editor;
                    // console.log('Editor is ready!', editor);
                }}
                onChange={(event, editor) => {
                    const data = editor.getData();
                    setEditorData(data);
                    // console.log({ event, editor, data });
                }}
                onBlur={(event, editor) => {
                    // console.log('Blur.', editor);
                }}
                onFocus={(event, editor) => {
                    // console.log('Focus.', editor);
                }}
            />
            {/* <div>
                <h3>Content:</h3>
                <div>{editorData}</div>
            </div> */}
        </div>
    );
}
export default index;