import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import "./App.css";

const FormSchema = yup.object().shape({
  name: yup.string()
       .required( "Name is required")
       .matches("^[A-Za-z]+$", "Enter a valid name")
       .min(4).max(20),
  phone: yup.string()
        .required("Phone Number is Required")
        .matches(
        "^[0-9]{10}$",
        "Phone number is not valid"
      ),
  age: yup.number("Invalid Age")
      .required( "Age is required")
      .min(0).max(100),
  email: yup.string().email("Invalid email format").required("Email is required")
});

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(FormSchema)
  });
  const onSubmit = (data) => {

    alert(JSON.stringify(data));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h4>Form</h4>
      <div>
        <label> Name</label>
        <input {...register("name")} />
        {errors.name && <p>{errors.name.message}</p>}
      </div>
      <div>
        <label>Phone Number</label>
        <input type='number' {...register("phone")} />
        {errors.phone && <p>{errors.phone.message}</p>}
      </div>
      <div>
        <label>Age</label>
        <input type='number' {...register("age",{ valueAsNumber: true })} />
        {errors.age && <p>{errors.age.message}</p>}
      </div>
      <div>
        <label>E-mail</label>
        <input {...register("email")} />
        {errors.email && <p>{errors.email.message}</p>}
      </div>
      <input type="submit" />
    </form>
  );
}

export default App;

