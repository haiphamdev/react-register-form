import React from "react";
import { useController } from "react-hook-form";

const CheckboxHook = ({ control, text, ...props }) => {
  const { field } = useController({
    control,
    name: props.name,
    defaultValue: false,
  });
  console.log("CheckboxHook ~ field", field);

  return (
    <label className="w-5 h-5 cursor-pointer custome-checkbox">
      <input
        type="checkbox"
        {...field}
        {...props.value}
        className="hidden"
        id={props.name}
        checked={field.value}
      />
      <div className="flex items-center gap-3 mb-5">
        <div className="bg-white transition-all rounded-md w-full flex items-center justify-center h-full custom-checkbox-square">
          <svg
            width="16"
            height="17"
            viewBox="0 0 16 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.7453 4.89733L5.93178 12.7109L2.25482 9.03391L3.17132 8.11741L5.93178 10.8714L12.8288 3.98083L13.7453 4.89733Z"
              fill="white"
            />
          </svg>
        </div>
        <label htmlFor={props.name} className="text-sm cursor-pointer">
          {text}
        </label>
      </div>
    </label>
  );
};

export default CheckboxHook;
