import { nanoid } from "nanoid";
import React, { useCallback, useEffect } from "react";
import PostPreview from "../Post-preview/PostPreview";
import { useAppDispatch, useAppSelector } from "../../store/handleHooks";
import { fetchArticles, setNextPage } from "../../store/slices/article";
import { Pagination } from "antd";
import cl from "./PostList.module.scss";

const PostList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { articles, page, totalArticlesCount } = useAppSelector(
    (state) => state.artickles
  );

  const getData = useCallback(() => {
    dispatch(fetchArticles((page - 1) * 5));
  }, [page, dispatch]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <main className={cl["main"]}>
      <ul className={cl["posts-list"]}>
        {articles.map((art) => (
          <PostPreview key={nanoid()} post={art} />
        ))}
      </ul>
      <Pagination
        onChange={(page) => dispatch(setNextPage(page))}
        defaultCurrent={1}
        current={page}
        total={totalArticlesCount}
        showSizeChanger={false}
      />
    </main>
  );
};

export default PostList;
