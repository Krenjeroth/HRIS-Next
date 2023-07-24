"use client";
import { FormFieldError } from "../FormFieldError";

interface Props {
  label: string;
  name: string;
  children?: any;
  errors: any;
  touched: any;
}

export const FormElement: React.FC<Props> = ({
  label,
  name,
  children,
  errors,
  touched,
}) => {
  return (
    <div className="mt-4 mx-2">
      <label htmlFor={name} className="text-sm font-medium">
        {label}
      </label>
      <div className="relative mt-1">{children}</div>
      {name.indexOf('_autosuggest') > 0 ?
        <FormFieldError name={name.replace('_autosuggest', '')} errors={errors} touched={touched} />
        :
        <FormFieldError name={name} errors={errors} touched={touched} />
      }

    </div>
  );
};
