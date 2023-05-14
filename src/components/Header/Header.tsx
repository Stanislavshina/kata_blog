import React from "react";
import { useAppDispatch, useAppSelector } from "../../store/handleHooks";
import { NavLink } from "react-router-dom";
import { Avatar, Button } from "antd";
import cl from "./Header.module.scss";
import { logOut } from "../../store/slices/user";

const Header: React.FC = () => {
  const { isAuth, username, image } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  console.log(username);

  const authPanel = (
    <div className={cl["header__right-col"]}>
      <NavLink
        children="Create Article"
        to={""}
        className={cl["header__link-create"]}
      />
      <div className={cl["header__name-block"]}>
        <NavLink
          children={username}
          to={""}
          className={cl["header__link-name"]}
        />
        <Avatar src={image} style={{ width: "46px", height: "46px" }} />
      </div>
      <Button
        children="Log Out"
        className={cl["button__log-out"]}
        onClick={() => dispatch(logOut())}
      />
    </div>
  );

  const buttons = (
    <div className={cl["header__right-col"]}>
      <NavLink
        children="Sign In"
        to={""}
        className={cl["header__link-sig-in"]}
      />
      <NavLink to={""} children="Sign Up" className={cl["header__link-reg"]} />
    </div>
  );

  const rightCol = isAuth ? authPanel : buttons;

  return (
    <header className={cl["header"]}>
      <NavLink
        to={"/"}
        children="Realworld Blog"
        className={cl["header__title"]}
      />
      {rightCol}
    </header>
  );
};

export default Header;
