import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch } from "../../store/handleHooks";
import { login } from "../../store/slices/user";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import cl from "./SignIn.module.scss";
import Form from "../../components/Form/Form";
import { User } from "../../types/User";

const SignIn: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const emailpattern =
    // eslint-disable-next-line no-useless-escape
    /^(?:(?:[^<>()[\]\\.,;:\s@\"]+(?:\.[^<>()[\]\\.,;:\s@\"]+)*)|\".+?\")@(?:(?:(?!-)[a-z0-9\-]{1,63}(?<!-)\.)+[a-z]{2,})$/i;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const res = await dispatch(login(data as User));
    const { payload } = res;
    payload ? navigate("/") : setError("Пароль или почта указаны не верно");
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      title="Sign In"
      buttonText="Login"
      link="Sign Up."
    >
      <label className={cl["label"]}>
        Email
        <input
          type="email"
          placeholder="Email adress"
          {...register("email", { required: true, pattern: emailpattern })}
          className={`${cl.input} ${errors.email ? cl.error : ""}`}
        />
        {errors.email && errors.email.type === "required" && (
          <p>Укажите верный адресс почты</p>
        )}
        {errors.email && errors.email.type === "pattern" && (
          <p className={cl["error"]}>Укажите верный адресс почты</p>
        )}
      </label>
      <label>
        Password
        <input
          placeholder="password"
          className={cl["input"]}
          {...register("password", { required: true })}
        />
        {error && (
          <p className={cl["error"]} style={{ textAlign: "center" }}>
            {error}
          </p>
        )}
      </label>
    </Form>
  );
};

export default SignIn;
