import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { Button, Avatar } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { converTime } from "../../utils/convertTime";
import { nanoid } from "nanoid";
import cl from "./PostHeader.module.scss";
import { deleteFavorited, setFavorited } from "../../api/favorite";
import { useAppSelector } from "../../store/handleHooks";

interface PostHeaderProps {
  slug: string;
  updatedAt: string;
  title: string;
  favoritesCount: number;
  tagList: string[];
  username: string;
  image: string;
  link: boolean;
}

const PostHeader: React.FC<PostHeaderProps> = ({
  slug,
  updatedAt,
  title,
  favoritesCount,
  tagList,
  username,
  image,
  link,
}) => {
  const { isAuth, token } = useAppSelector((state) => state.user);
  const [favorite, setFavorite] = useState(
    () => isAuth && Boolean(localStorage.getItem(slug))
  );
  const [count, setCount] = useState(favoritesCount);
  const handleClick = () => {
    if (!favorite) {
      setFavorited(slug, token).then((d) =>
        localStorage.setItem(d.data.article.slug, d.data.article.slug)
      );
      setFavorite(true);
      setCount((count) => (count += 1));
    } else {
      deleteFavorited(slug, token).then((d) =>
        localStorage.removeItem(d.data.article.slug)
      );
      setFavorite(false);
      setCount((count) => (count -= 1));
    }
  };

  useEffect(() => {
    setTimeout(() => {
      if (!isAuth) return setFavorite(false);
    }, 100);
  }, [isAuth]);

  const titleLink = link ? (
    <Link to={`articles/${slug}`} className={cl["header__title"]}>
      {title}
    </Link>
  ) : (
    <h4 className={cl["header__title"]}>{title}</h4>
  );
  const date = converTime(updatedAt);
  const tags = tagList.length ? (
    <ul className={cl["header__tag-list"]}>
      {tagList.map((el: string) => (
        <li key={nanoid()} className={cl["header__tag"]}>
          {el}
        </li>
      ))}
    </ul>
  ) : null;
  const postButton = (
    <Button
      onClick={handleClick}
      style={{ border: "none", width: "13px" }}
      disabled={!isAuth}
      icon={
        favorite ? (
          <HeartFilled style={{ color: "#FF0707" }} />
        ) : (
          <HeartOutlined />
        )
      }
    />
  );
  return (
    <header className={cl["header"]}>
      <div className={cl["header__left-col"]}>
        <div className={cl["header__title-block"]}>
          {titleLink}
          <div className={cl["header__favorited"]}>
            {postButton}
            <span className={cl["header__favorited-span"]}>{count}</span>
          </div>
        </div>
        {tags}
      </div>
      <div className={cl["header__right-col"]}>
        <div className="header__author-bio">
          <p className={cl["header__author-name"]}>{username}</p>
          <span className={cl["header__time"]}>{date}</span>
        </div>
        <Avatar src={image} style={{ width: "46px", height: "46px" }} />
      </div>
    </header>
  );
};

export default PostHeader;
