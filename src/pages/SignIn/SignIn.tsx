import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch } from "../../store/handleHooks";
import { login } from "../../store/slices/user";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type Data = {
  username?: string;
  email: string;
  password: string;
  image?: string;
};

const SignIn: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  // eslint-disable-next-line no-useless-escape
  const emailpattern =
    /^(?:(?:[^<>()[\]\\.,;:\s@\"]+(?:\.[^<>()[\]\\.,;:\s@\"]+)*)|\".+?\")@(?:(?:(?!-)[a-z0-9\-]{1,63}(?<!-)\.)+[a-z]{2,})$/i;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const res = await dispatch(login(data as Data));
    const { payload } = res;
    payload ? navigate("/") : setError("somthinh went wrong");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Sign in</h1>

      <label>Email</label>
      <input
        {...register("email", { required: true, pattern: emailpattern })}
      />
      {errors.email && errors.email.type === "required" && (
        <p>This field is required.</p>
      )}
      {errors.email && errors.email.type === "pattern" && (
        <p>Invalid email address.</p>
      )}

      <label>Password</label>
      <input {...register("password", { required: true })} />
      {error && <p>{error}</p>}

      <button type="submit">Submit</button>
    </form>
  );
};

export default SignIn;
