import React, { useRef, useEffect } from "react";
import styles from "./login.module.css";
import { useForm, Controller } from "react-hook-form";
import { Input } from "@mui/material";
import { useNavigate } from "react-router-dom";
import User from '../../service/user';

const Login = props => {
  const user = new User()
  const formRef = useRef();
  const navigate = useNavigate();

  const loginUserChecked = localStorage.getItem("loginUser") ? true : false;
  let loginUser = loginUserChecked

  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: ""
    }
  });

  useEffect(() => {
    if(props.userData?.isAuth === true) {
      navigate('/')
    }
  }, [navigate, props.userData])

  const onSubmit = data => {
    user.login(data)
    if(loginUser === true) {
      window.localStorage.setItem("loginUser", data.id);
    } else {
      localStorage.removeItem("loginUser");
    }
    formRef.current.reset()
    navigate('/', { state: data})
  };

  return (<>
  <section className={styles.loginPage}>
      <form
        ref={formRef}
        onSubmit={handleSubmit(onSubmit)}
        className={styles.loginform}
      >
        <label>Email </label>
        <Controller
          render={({ field }) => <Input {...field} />}
          name="email"
          control={control}
          defaultValue=""
        />
        <label>Password </label>
        <Controller
          render={({ field }) => <Input {...field} type="password" />}
          name="password"
          control={control}
          defaultValue=""
        />
        <button className={styles.button} onSubmit={handleSubmit(onSubmit)}>
        <img alt="signin" className={styles.submitBtn} src="/images/signin.gif"/>
        </button>
      </form>
    </section>
    </>);
};

export default Login;
