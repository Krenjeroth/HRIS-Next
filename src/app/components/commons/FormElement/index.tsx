"use client";
import { ReactNode } from "react";
import { FormFieldError } from "../FormFieldError";

interface Props {
  label: any;
  name: string;
  children?: ReactNode;
  errors: any;
  touched: any;
  className?: string
  required?: boolean
}

export const FormElement: React.FC<Props> = ({
  label,
  name,
  children,
  errors,
  touched,
  className,
  required

}) => {

  if (required) {
    label = <>{label} <span className=' text-red-700 text-lg'>*</span></>;
  }
  else {
    label = <>{label} <span className=' text-red-700 text-lg'></span></>;
  }
  return (

    <div className={`mt-2 mx-2 ${className}`}>
      {/* <div className={`mt-2 mx-2 ${col_span}`}>

        <div className="text-sm font-medium">
          {label}
        </div>
        <div className="relative mt-1">{children}</div>
        <FormFieldError name="name" errors={errors} touched={touched} />

      </div> */}
      {!name
        ? <span className="text-sm font-medium">
          {label}
        </span>
        : <label htmlFor={name} className="text-sm font-medium">
          {label}
        </label>}

      <div className="relative mt-1">{children}</div>
      <FormFieldError name={name.replaceAll('_autosuggest', '')} errors={errors} touched={touched} />
    </div>

  );
};
