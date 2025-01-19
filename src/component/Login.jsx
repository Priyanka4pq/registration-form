import { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";

export default function Login(props) {
  const loginUser = async (data) => {
    try {
      let response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "content-type": "application/json",
        },
      });

      if (!response.ok) {
        response = await response.json();
        console.log("error: ", response);
        throw new Error(response.msg);
      }

      response = await response.json();
      props.SetLoggedin(true);
      props.setUserData(response.user);
    } catch (error) {
      console.log(error);
    }
  };

  const submitHandler = (data) => {
    loginUser(data);
  };

  const userSchema = yup.object().shape({
    email: yup
      .string()
      .required("email is required to login")
      .email("Invalid Email Address"),
    password: yup
      .string()
      .required("password must be 8 characters long")
      .min(8, "Password must be atleast 8 character"),
  });

  const {
    values,
    handleChange,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleSubmit,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: userSchema,
    onSubmit: submitHandler,
  });

  const ClickHandler = () => {
    props.showSignupForm((currval) => {
      if (currval === true) return false;
      else return true;
    });
  };
  return (
    <div className="flex flex-col justify-center items-center bg-blue-100 h-screen">
      <h1 className="text-4xl font-bold">Login</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6  w-96 bg-white p-8 mt-3"
      >
        <input
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          type="text"
          className="border-b-2 border-b-black focus:border-b-blue-500 focus:outline-none"
          name="email"
          id=""
          placeholder="Enter your email"
        />
        <span className="text-sm text-red-500">
          {touched.email && errors.email}
        </span>
        <input
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          type="text"
          className="border-b-2 border-b-black p-2 focus:border-b-blue-500 focus:outline-none"
          name="password"
          id=""
          placeholder="Enter your password"
        />
        <span className="text-sm text-red-500">
          {touched.password && errors.password}
        </span>

        <button
          type="submit"
          className="text-white bg-blue-500 p-2 mt-4 w-32 mx-auto"
        >
          Submit
        </button>
      </form>
      <h1>
        Don't have an account, Click to{" "}
        <a href="" onClick={ClickHandler} className="text-red-500 font-bold">
          <u>Signup</u>
        </a>
      </h1>
    </div>
  );
}
