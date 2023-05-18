import { ReactNode } from "react";
import cl from "./Form.module.scss";
import { Link } from "react-router-dom";

interface FormProps {
  onSubmit: () => void;
  title: string;
  children: ReactNode;
  buttonText: string;
  link?: string;
}

const Form: React.FC<FormProps> = ({
  onSubmit,
  children,
  title,
  buttonText,
  link,
}) => {
  const footerLink =
    link === "Sign Up." ? (
      <p style={{ color: "#8C8C8C" }}>
        Don’t have an account?
        <Link
          style={{
            textDecoration: "none",
            color: "#1890FF",
            marginLeft: "2px",
          }}
          children={link}
          to={"/sign-up"}
        />
      </p>
    ) : (
      <p style={{ color: "#8C8C8C" }}>
        Already have an account?
        <Link
          style={{
            textDecoration: "none",
            color: "#1890FF",
            marginLeft: "2px",
          }}
          children={"Sign In."}
          to={"/sign-in"}
        />
      </p>
    );
  return (
    <form onSubmit={onSubmit} className={cl["form"]}>
      <h1 className={cl["form__title"]}>{title}</h1>
      <fieldset className={cl["form__field"]}>{children}</fieldset>
      <button
        type="submit"
        className={cl["form__submit"]}
        style={buttonText === "Send" ? { alignSelf: "flex-start" } : {}}
      >
        {buttonText}
      </button>
      {link && footerLink}
    </form>
  );
};

export default Form;
