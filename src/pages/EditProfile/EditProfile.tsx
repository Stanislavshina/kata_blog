import { useNavigate } from "react-router-dom";
import Form from "../../components/Form/Form";
import { useAppDispatch, useAppSelector } from "../../store/handleHooks";
import cl from "./EditProfile.module.scss";
import { SubmitHandler, useForm } from "react-hook-form";
import { User } from "../../types/User";
import { updateUser } from "../../store/slices/user";

const EditProfile: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { username, email, token } = useAppSelector((state) => state.user);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: username,
      email: email,
      password: "",
      avatar: "",
    },
    mode: "onChange",
  });

  const handleClick: SubmitHandler<User> = (data) => {
    dispatch(updateUser({ data, token }));
    navigate("/");
  };
  return (
    <Form
      onSubmit={handleSubmit(handleClick)}
      title={"Edit Profile"}
      buttonText={"Save"}
    >
      <label className={cl["label"]}>
        Username
        <input
          className={`${cl.input} ${errors.email ? cl.error : ""}`}
          type="text"
          {...register("username", { required: true })}
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
        {errors.email && <span>Please enter a valid email address</span>}
      </label>

      <label className={cl["label"]}>
        Password
        <input
          className={`${cl.input} ${errors.email ? cl.error : ""}`}
          type="password"
          {...register("password", {
            minLength: 6,
            maxLength: 40,
          })}
        />
        {errors.password && (
          <span>Password must be between 6 and 40 characters</span>
        )}
      </label>
      <label className={cl["label"]}>
        Avatar Image
        <input
          className={`${cl.input} ${errors.email ? cl.error : ""}`}
          type="url"
          {...register("avatar", {
            pattern: /^https?:\/\/.+/,
          })}
        />
        {errors.avatar && <span>Please enter a valid URL</span>}
      </label>
    </Form>
  );
};

export default EditProfile;
