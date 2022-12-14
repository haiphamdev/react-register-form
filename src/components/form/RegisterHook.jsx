import React from "react";
import { useForm } from "react-hook-form";
import CheckboxHook from "../checkbox/CheckboxHook";
import DropdownHook from "../dropdown/DropdownHook";
import InputHook from "../input/InputHook";
import RadioHook from "../radio/RadioHook";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
  .object({
    username: yup.string().required("Please enter your name"),
    email: yup
      .string()
      .email("Please enter valid email address")
      .required("Please enter your email address"),
    password: yup
      .string()
      .min(8, "Your password must be at least 8 characters or greater")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        {
          message:
            "Your password must have at least 1 uppercase, 1 lowercase, 1 special character",
        }
      )
      .required("Please enter your password"),
    gender: yup
      .string()
      .required("Please select your gender")
      .oneOf(["male", "female"], "You can only select male of female"),
    job: yup
      .string()
      .required("Please select your job")
      .oneOf(["teacher", "developer", "doctor"]),
    term: yup.boolean(true).required("Please accept the terms and conditions"),
  })
  .required();

const dropdownData = [
  {
    id: 1,
    value: "teacher",
    text: "Teacher",
  },
  {
    id: 2,
    value: "developer",
    text: "Developer",
  },
  {
    id: 3,
    value: "doctor",
    text: "Doctor",
  },
];

const RegisterHook = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid, isSubmitting, isSubmitSuccessful },
    control,
    reset,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      gender: "male",
    },
  });

  const onSubmitHandler = (values) => {
    if (!isValid) return;
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
        reset({
          username: "",
          email: "",
          password: "",
          gender: "male",
          job: "",
          term: false,
        });
      }, 5000);
    });
    // console.log(values);
  };

  const watchGender = watch("gender");
  console.log("watchGender ~ gender", watchGender);

  return (
    <form
      onSubmit={handleSubmit(onSubmitHandler)}
      className="mx-auto my-10 max-w-[300px]"
      autoComplete="off"
    >
      <div className="flex flex-col gap-3 mb-5">
        <label htmlFor="username" className="cursor-pointer">
          Username
        </label>
        <InputHook
          name="username"
          placeholder="Enter your username"
          id="username"
          control={control}
          type="text"
        />
        {errors.username && (
          <p className="text-red-500 text-sm">{errors.username?.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-3 mb-5">
        <label htmlFor="email" className="cursor-pointer">
          Email address
        </label>
        <InputHook
          name="email"
          placeholder="Enter your email"
          id="email"
          control={control}
          type="text"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email?.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-3 mb-5">
        <label htmlFor="password" className="cursor-pointer">
          Password
        </label>
        <InputHook
          name="password"
          placeholder="Enter your password"
          id="password"
          control={control}
          type="text"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password?.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-3 mb-5">
        <label className="cursor-pointer">Gender</label>
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-x-3">
            <RadioHook
              control={control}
              name="gender"
              value="male"
              checked={watchGender === "male"}
            />
            <span>Male</span>
          </div>
          <div className="flex items-center gap-x-3">
            <RadioHook
              control={control}
              name="gender"
              value="female"
              checked={watchGender === "female"}
            />
            <span>Female</span>
          </div>
        </div>
      </div>
      {errors.gender && (
        <p className="text-red-500 text-sm">{errors.gender?.message}</p>
      )}
      <div className="flex flex-col gap-3 mb-5">
        <span>Are you</span>
        <DropdownHook
          control={control}
          setValue={setValue}
          name="job"
          data={dropdownData}
          dropdownLabel="Select your job"
        />
        {errors.job && (
          <p className="text-red-500 text-sm">{errors.job?.message}</p>
        )}
      </div>
      <div className="">
        <CheckboxHook
          control={control}
          text="I accept the terms and conditions"
          name="term"
        />
        {errors.term && (
          <p className="text-red-500 text-sm">{errors.term?.message}</p>
        )}
      </div>
      <button
        className="w-full p-5 bg-blue-500 text-white rounded-lg mt-5 font-semibold"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <div className="w-5 h-5 mx-auto border-2 border-t-2 border-white rounded-full border-t-transparent animate-spin"></div>
        ) : (
          "Submit"
        )}
      </button>
    </form>
  );
};

export default RegisterHook;
