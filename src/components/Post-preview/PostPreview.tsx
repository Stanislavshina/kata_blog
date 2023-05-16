import React from "react";
import cl from "./PostItem.module.scss";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { Article } from "../../types/Article";
import PostHeader from "../PostHeader/PostHeader";
import { truncateText } from "../../utils/truncateText";

interface PostPreviewProps {
  post: Article;
}

const PostPreview: React.FC<PostPreviewProps> = ({ post }) => {
  const {
    author,
    body,
    favorited,
    favoritesCount,
    title,
    updatedAt,
    tagList,
    slug,
  } = post;
  const { image, username } = author;
  const bodyText = truncateText(body, 100);

  return (
    <li className={cl["preview"]}>
      <PostHeader
        favorited={favorited}
        favoritesCount={favoritesCount}
        title={title}
        slug={slug}
        image={image}
        username={username}
        updatedAt={updatedAt}
        tagList={tagList}
        link={true}
      />
      <main className={cl["preview__body"]}>
        <ReactMarkdown children={bodyText} />
      </main>
    </li>
  );
};

export default PostPreview;
