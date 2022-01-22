import React, { useRef, useEffect } from "react";
import styles from "./register.module.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import User from "../../service/user";

const Register = props => {
  console.log("[register]props:", props);

  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const formRef = useRef();
  const password = useRef();
  password.current = watch("password");

  const navigate = useNavigate();
  const user = new User();

  useEffect(() => {
    if (props.userData.isAuth) {
      navigate("/");
    }
  }, []);

  const onSubmit = data => {
    console.log("data", data);

    let body = {
      name: data.name,
      email: data.email,
      password: data.password
    };

    user.register(body);
    console.log("after register");
    formRef.current.reset();
    navigate("/login");
  };

  return (
    <section className={styles.registerPage}>
      <form
        ref={formRef}
        onSubmit={handleSubmit(onSubmit)}
        className={styles.registerform}
      >
        <section className={styles.inputfield}>
          <label>Email</label>
          <input
            type="email"
            placeholder="email"
            {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
          />
          {errors.email && <p>This email field is required</p>}
        </section>

        <section className={styles.inputfield}>
          <label>Name</label>
          <input
            type="text"
            placeholder="name"
            {...register("name", { required: true, maxLength: 10 })}
          />
          {errors.name &&
            errors.name.type === "required" &&
            <p> This name field is required</p>}
          {errors.name &&
            errors.name.type === "maxLength" &&
            <p> Your input exceed maximum length</p>}
        </section>

        <section className={styles.inputfield}>
          <label>Password</label>
          <input
            type="password"
            placeholder="password"
            {...register("password", { required: true, minLength: 5 })}
          />
          {errors.password &&
            errors.password.type === "required" &&
            <p> This name field is required</p>}
          {errors.password &&
            errors.password.type === "minLength" &&
            <p> Password must have at least 5 characters</p>}
        </section>

        <section className={styles.inputfield}>
          <label>Password Confirm</label>
          <input
            type="password"
            placeholder="password confirm"
            {...register("password_confirm", {
              required: true,
              validate: value => value === password.current
            })}
          />
          {errors.password_confirm &&
            errors.password_confirm.type === "required" &&
            <p> This password confirm field is required</p>}
          {errors.password_confirm &&
            errors.password_confirm.type === "validate" &&
            <p>The passwords do not match</p>}
        </section>

        <div className={styles.submit}>
          <img
            alt="signup"
            className={styles.submitBtn}
            src="/images/signup.gif"
          />
        </div>
      </form>
    </section>
  );
};

export default Register;
