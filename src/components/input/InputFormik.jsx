import React from "react";
import { useField } from "formik";

const InputFormik = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  // console.log(useField(props));

  return (
    <div className="flex flex-col gap-3 mb-5">
      <label htmlFor={props.id} className="cursor-pointer">
        {label}
      </label>
      <input
        className="p-4 border border-gray-100 rounded-lg bg-white outline-none focus:border-blue-500 transition-all"
        {...field}
        {...props}
      />
      {meta.touched && meta.error && (
        <p className="text-red-500 text-sm">{meta.error}</p>
      )}
    </div>
  );
};

export default InputFormik;
