"use client";
import { FormFieldError } from "../FormFieldError";

interface Props {
  label: string;
  name: string;
  children?: any;
  errors: any;
  touched: any;
  col_span?: string
}

export const FormElement: React.FC<Props> = ({
  label,
  name,
  children,
  errors,
  touched,
  col_span
}) => {
  return (
    <>
      {/* <div className={`mt-4 mx-2 ${col_span}`}> */}
      <div className="relative">
        <input type="text" id="floating_outlined" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
        <label htmlFor="floating_outlined" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Floating outlined</label>
      </div>

      {/* <input type="text" id="search" title="search" className="block px-2.5 pb-2.5 pt-2 w-full text-sm text-gray-900 bg-white rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer fon-normal" placeholder=" " />

      <label htmlFor={`search`} className="absolute text-xs text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-65 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 font-normal mt-2" >Search</label> */}



      {/* <label htmlFor={name} className="text-sm font-medium">
        {label}
      </label>
      <div className="relative mt-1">{children}</div>
      {name.indexOf('_autosuggest') > 0 ?
        <FormFieldError name={name.replace('_autosuggest', '')} errors={errors} touched={touched} />
        :
        <FormFieldError name={name} errors={errors} touched={touched} />
      } */}

      {/* </div> */}
    </>
  );
};
