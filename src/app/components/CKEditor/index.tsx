"use client";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import React, { useEffect, useRef, useState } from "react";
import { Field, Form, Formik, FormikHelpers, useFormikContext } from "formik";
import { useDisqualifiedContext } from '@/app/contexts/DisqualifiedContext';
import 'ckeditor5/ckeditor5.css';

import {
  ClassicEditor,
  AccessibilityHelp,
  AutoLink,
  Autosave,
  Bold,
  Code,
  Essentials,
  FontBackgroundColor,
  FontColor,
  FontFamily,
  FontSize,
  GeneralHtmlSupport,
  Heading,
  Highlight,
  Italic,
  Link,
  List,
  ListProperties,
  Paragraph,
  SelectAll,
  ShowBlocks,
  SourceEditing,
  Table,
  TableToolbar,
  TodoList,
  Undo
} from 'ckeditor5';

interface CKEditorComponentProps {
  label: string,
  name: string,
  className: string,
  onChange: (data: string) => void;
}

const Editor: React.FC<CKEditorComponentProps> = ({
  label,
  name,
  className,
  onChange,
}) => {



  const [editorData, setEditorData] = useState<string>('');
  const editorRef = useRef<any>(null);
  const { setFieldValue } = useFormikContext();
  const context = useDisqualifiedContext();

  // useEffect(() => {
  //   // setFieldValue(name, editorData);
  //   // console.log(editorData);

  // }, [editorData]);

  return (
    <div className={className}>
      <h2 className='text-sm font-medium my-1'>{label}</h2>
      {/* <CKEditor
        editor={ClassicEditor}
        config={{
          toolbar: {
            items: [
              'undo',
              'redo',
              '|',
              'sourceEditing',
              'showBlocks',
              'selectAll',
              '|',
              'heading',
              '|',
              'fontSize',
              'fontFamily',
              'fontColor',
              'fontBackgroundColor',
              '|',
              'bold',
              'italic',
              'code',
              '|',
              'link',
              'insertTable',
              'highlight',
              '|',
              'bulletedList',
              'numberedList',
              'todoList',
              '|',
              'accessibilityHelp'
            ],
            shouldNotGroupWhenFull: false
          },
          plugins: [
            AccessibilityHelp,
            AutoLink,
            Autosave,
            Bold,
            Code,
            Essentials,
            FontBackgroundColor,
            FontColor,
            FontFamily,
            FontSize,
            GeneralHtmlSupport,
            Heading,
            Highlight,
            Italic,
            Link,
            List,
            ListProperties,
            Paragraph,
            SelectAll,
            ShowBlocks,
            SourceEditing,
            Table,
            TableToolbar,
            TodoList,
            Undo
          ],
          fontFamily: {
            supportAllValues: true
          },
          fontSize: {
            options: [10, 12, 14, 'default', 18, 20, 22],
            supportAllValues: true
          },
          heading: {
            options: [
              {
                model: 'paragraph',
                title: 'Paragraph',
                class: 'ck-heading_paragraph'
              },
              {
                model: 'heading1',
                view: 'h1',
                title: 'Heading 1',
                class: 'ck-heading_heading1'
              },
              {
                model: 'heading2',
                view: 'h2',
                title: 'Heading 2',
                class: 'ck-heading_heading2'
              },
              {
                model: 'heading3',
                view: 'h3',
                title: 'Heading 3',
                class: 'ck-heading_heading3'
              },
              {
                model: 'heading4',
                view: 'h4',
                title: 'Heading 4',
                class: 'ck-heading_heading4'
              },
              {
                model: 'heading5',
                view: 'h5',
                title: 'Heading 5',
                class: 'ck-heading_heading5'
              },
              {
                model: 'heading6',
                view: 'h6',
                title: 'Heading 6',
                class: 'ck-heading_heading6'
              }
            ]
          },
          htmlSupport: {
            allow: [
              {
                name: /^.*$/,
                styles: true,
                attributes: true,
                classes: true
              }
            ]
          },
        }}
        onReady={editor => {
          editorRef.current = editor;
          // setEditorData("");

        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          // setEditorData(data);
        }}
      /> */}
      <CKEditor
        editor={ClassicEditor}
      />
    </div>
  );
};

export default Editor;