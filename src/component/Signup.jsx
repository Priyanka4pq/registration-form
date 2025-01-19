import { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";

export default function SignUp(props) {
  const signupUser = async (data) => {
    try {
      let response = await fetch("http://localhost:3000/api/auth/register", {
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
      console.log(response);
      props.SetLoggedin(true);
      props.setUserData(response.user);
    } catch (error) {
      console.log(error);
    }
  };

  const submitHandler = (data) => {
    signupUser(data);
  };

  const userSchema = yup.object().shape({
    name: yup
      .string()
      .required("User must have a name")
      .min(3, "user name must be atleast 3 characters in length."),
    email: yup
      .string()
      .required("Email field is required")
      .email("Invalid Email Address."),
    number: yup
      .string()
      .required("phone no. is required")
      .matches(/^[0-9]{10}$/, "phone number must be exactly 10 digits"),
    password: yup
      .string()
      .required("password must be 8 character long")
      .min(8, "atleast 8 length are required."),
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
      name: "",
      email: "",
      password: "",
      number: "",
    },
    validationSchema: userSchema,
    onSubmit: submitHandler,
  });

  const Handle = () => {
    SetSubmitClick((currentval) => {
      if (currentval === true) return false;
      else return true;
    });
  };

  const ClickHandler = () => {
    props.showSignupForm((currval) => {
      if (currval === true) return false;
      else return true;
    });
  };
  return (
    <div className="flex flex-col justify-center items-center  bg-blue-100 h-screen">
      <h1 className="text-4xl font-bold">Sign Up</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 w-96 bg-white p-8 mt-3"
      >
        <input
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          type="text"
          className="border-b-2 border-b-black p-2 focus:border-b-blue-500 focus:outline-none"
          name="name"
          id=""
          placeholder="User Name"
        />
        <span className="text-sm text-red-500">
          {touched.name && errors.name}
        </span>

        <input
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          type="text"
          className="border-b-2 border-b-black gap-6  p-2 focus:border-b-blue-500 focus:outline-none"
          name="email"
          id=""
          placeholder="Email"
        />
        <span className="text-sm text-red-500">
          {touched.email && errors.email}
        </span>

        <input
          value={values.number}
          onChange={handleChange}
          onBlur={handleBlur}
          type="text"
          className="border-b-2 border-b-black gap-6 p-2 focus:border-b-blue-500 focus:outline-none"
          name="number"
          id=""
          placeholder="Phone"
        />
        <span className="text-sm text-red-500">
          {touched.number && errors.number}
        </span>

        <input
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          type="password"
          className="border-b-2 border-b-black gap-6 p-2 focus:border-b-blue-500 focus:outline-none"
          name="password"
          id=""
          placeholder="password"
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
        Already have an Account. Click to{" "}
        <a href="#" className="text-red-500 font-bold" onClick={ClickHandler}>
          <u>Login</u>
        </a>
      </h1>
    </div>
  );
}
