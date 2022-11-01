import React, { useState } from "react";
import { useWatch } from "react-hook-form";
import useClickOutSide from "../../hooks/useClickOutSide";

const DropdownHook = ({ control, setValue, name }) => {
  const { show, setShow, nodeRef } = useClickOutSide();
  useWatch({
    control,
    name: "job",
    defaultValue: "",
  });
  const handleClickDropdownItem = (e) => {
    setValue(name, e.target.dataset.value);
    setShow(false);
    setLabel(e.target.textContent);
  };

  const [label, setLabel] = useState("Select your job");

  return (
    <div className="relative" ref={nodeRef}>
      <div
        className="p-5 rounded-lg border border-gray-100 bg-white flex items-center justify-between cursor-pointer"
        onClick={() => setShow(!show)}
      >
        <span>{label}</span>
      </div>
      <div
        className={`absolute top-full left-0 w-full rounded-lg bg-white ${
          show ? "" : "opacity-0 invisible"
        }`}
      >
        <div
          className="p-5 cursor-pointer hover:bg-slate-100"
          onClick={handleClickDropdownItem}
          data-value="teacher"
        >
          Teacher
        </div>
        <div
          className="p-5 cursor-pointer hover:bg-slate-100"
          onClick={handleClickDropdownItem}
          data-value="developer"
        >
          Developer
        </div>
        <div
          className="p-5 cursor-pointer hover:bg-slate-100"
          onClick={handleClickDropdownItem}
          data-value="doctor"
        >
          Doctor
        </div>
      </div>
    </div>
  );
};

export default DropdownHook;
