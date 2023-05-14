import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import cl from "./Post.module.scss";
import PostHeader from "../../components/PostHeader/PostHeader";
import { Article } from "../../components/types/Article";
import { ExclamationCircleOutlined, LoadingOutlined } from "@ant-design/icons";
import { Button, Popconfirm } from "antd";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

const buttonStyle = {
  padding: "6px 17px",
  border: "1px solid #f5222d",
  color: "#f5222d",
  background: "#ffffff",
  display: "flex",
  alignItems: "center",
};

const deleteButtonStyle = {
  ...buttonStyle,
  border: "1px solid #f5222d",
  color: "#f5222d",
};

const editButtonStyle = {
  ...buttonStyle,
  border: "1px solid #52c41a",
  color: "#52c41a",
  padding: "6px 19px",
};

const Post: React.FC = () => {
  const [data, setData] = useState<Article | null>(null);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`https://blog.kata.academy/api/articles/${id}`)
      .then((d) => setData(d.data.article));
  }, [id]);
  console.log(data);
  const navigate = useNavigate();

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  if (!data) return <div>{antIcon}</div>;

  return (
    <article className={cl["article"]}>
      <PostHeader
        favorited={data.favorited}
        favoritesCount={data.favoritesCount}
        title={data.title}
        slug={data.slug}
        image={data.author.image}
        username={data.author.username}
        updatedAt={data.updatedAt}
        tagList={data.tagList}
        link={false}
      />
      <div className={cl["article__describe"]}>
        {data.description ? <p>{data.description}</p> : null}
        <div className={cl["article__buttons-block"]}>
          <Popconfirm
            placement="right"
            title="Are you sure to delete this article?"
            onConfirm={() => navigate("/")}
            onCancel={() => console.log("no")}
            okText="Yes"
            cancelText="No"
          >
            <Button style={deleteButtonStyle} type="link">
              Delete
            </Button>
          </Popconfirm>
          <Button style={editButtonStyle}>Edit</Button>
        </div>
      </div>
      <main>
        <ReactMarkdown children={data.body} className={cl["article__body"]} />
      </main>
    </article>
  );
};

export default Post;
