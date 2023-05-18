import React, { useState } from "react";
import Form from "../../components/Form/Form";
import { SubmitHandler, useForm } from "react-hook-form";
import { User } from "../../types/User";
import cl from "./SignUp.module.scss";
import { useAppDispatch } from "../../store/handleHooks";
import { createNewUser } from "../../store/slices/user";
import { useNavigate } from "react-router-dom";

const SignUp: React.FC = () => {
  const [error, setError] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      repeatpassword: "",
      agreeToTerms: false,
    },
    mode: "onChange",
  });

  const handleClick: SubmitHandler<User> = (data) => {
    dispatch(createNewUser(data)).then((d) =>
      d.payload
        ? navigate("/")
        : setError("что-то пошло не так, попробуй изменить данные")
    );
  };

  return (
    <Form
      title="Create new account"
      buttonText="Create"
      onSubmit={handleSubmit(handleClick)}
    >
      <label className={cl["label"]}>
        Username
        <input
          className={`${cl.input} ${errors.email ? cl.error : ""}`}
          type="text"
          {...register("username", {
            required: true,
            minLength: 3,
            maxLength: 20,
          })}
        />
        {errors.username && <span>This field is required</span>}
      </label>

      <label className={cl["label"]}>
        Email
        <input
          className={`${cl.input} ${errors.email ? cl.error : ""}`}
          type="email"
          {...register("email", {
            required: true,
            // eslint-disable-next-line no-useless-escape
            pattern:
              /^(?:(?:[^<>()[\]\\.,;:\s@\"]+(?:\.[^<>()[\]\\.,;:\s@\"]+)*)|\".+?\")@(?:(?:(?!-)[a-z0-9\-]{1,63}(?<!-)\.)+[a-z]{2,})$/i,
          })}
        />
        {errors.email && errors.email.type === "required" && (
          <span>This field is required</span>
        )}
        {errors.email && errors.email.type === "pattern" && (
          <span>Invalid email address</span>
        )}
      </label>

      <label className={cl["label"]}>
        Password
        <input
          className={`${cl.input} ${errors.email ? cl.error : ""}`}
          type="password"
          {...register("password", {
            required: true,
            minLength: 6,
            maxLength: 40,
          })}
        />
        {errors.password && <span>This field is required</span>}
      </label>

      <label className={cl["label"]}>
        Repeat password
        <input
          className={`${cl.input} ${errors.email ? cl.error : ""}`}
          type="password"
          {...register("repeatpassword", {
            required: true,
            validate: (value) =>
              value === watch("password") || "The passwords do not match",
          })}
        />
        {errors.repeatpassword && (
          <span className={cl["error"]}>{errors.repeatpassword.message}</span>
        )}
      </label>

      <label className={cl["label__check"]}>
        <input
          type="checkbox"
          {...register("agreeToTerms", { required: true })}
          className={cl["checkbox"]}
        />
        I agree to the processing of my personal information
      </label>
      {errors.agreeToTerms && (
        <span className={cl["error"]}>
          You must agree to the terms and conditions
        </span>
      )}
      {error && <span className={cl["error"]}>{error}</span>}
    </Form>
  );
};

export default SignUp;
