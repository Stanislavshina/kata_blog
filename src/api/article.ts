import axios from "axios";
import { FormState } from "../types/FromArticle";

export const createArticle = async (data: FormState, token: string | null) => {
  const { title, description, body, tagList } = data;
  console.log(data);
  console.log(token);

  try {
    const res = await axios.post(
      `https://blog.kata.academy/api/articles`,
      {
        article: {
          title,
          description,
          body,
          tagList: tagList.map((tag) => tag.name),
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      }
    );
    console.log(res);
    return res;
  } catch (error) {
    throw new Error("error");
  }
};
