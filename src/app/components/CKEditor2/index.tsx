// // components/CKEditorField.tsx
// import dynamic from 'next/dynamic';
// import { useEffect, useState } from 'react';
// import { FieldProps, Form, useFormikContext } from 'formik';
// import { FormElement } from '../commons/FormElement';

// // Dynamically import CKEditor and ClassicEditor to ensure they only load on the client side
// const CKEditor = dynamic(() => import('@ckeditor/ckeditor5-react').then(mod => mod.CKEditor), { ssr: false });
// const ClassicEditor = dynamic(() => import('@ckeditor/ckeditor5-build-classic'), { ssr: false });

// interface CKEditorFieldProps extends FieldProps {
//   data: string,
//   label: string,
//   name: string,
//   className: string,
// }

// const CKEditorField: React.FC<CKEditorFieldProps> = ({ data, label, name, className, }) => {

//   const [editorLoaded, setEditorLoaded] = useState(false);
//   const { setFieldValue } = useFormikContext();

//   useEffect(() => {
//     setEditorLoaded(true);
//   }, []);

//   const handleChange = (event: any, editor: any) => {
//     const data = editor.getData();
//     setFieldValue(name, data);
//   };

//   return (
//     <div>
//       {label && <label>{label}</label>}
//       {editorLoaded ? (
//         <CKEditor
//           editor={ClassicEditor}
//           data={data}
//           onChange={handleChange}
//         />
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   );
// };

// export default CKEditorField;

// components/CKEditorField.tsx

"use client";
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { FieldProps } from 'formik';

// Dynamically import CKEditor and ClassicEditor to ensure they only load on the client side
const CKEditor = dynamic(() => import('@ckeditor/ckeditor5-react').then(mod => mod.CKEditor), { ssr: false });
const ClassicEditor = dynamic(() => import('@ckeditor/ckeditor5-build-classic'), { ssr: false });

interface CKEditorFieldProps extends FieldProps {
  label?: string;
}

const CKEditorField: React.FC<CKEditorFieldProps> = ({ field, form, label }) => {
  const [editorLoaded, setEditorLoaded] = useState(false);

  useEffect(() => {
    setEditorLoaded(true);
  }, []);

  const handleChange = (event: any, editor: any) => {
    const data = editor.getData();
    form.setFieldValue(field.name, data);
  };

  return (
    <div>
      {label && <label>{label}</label>}
      {editorLoaded ? (
        <CKEditor
          editor={ClassicEditor}
          data={field.value}
          onChange={handleChange}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default CKEditorField;

