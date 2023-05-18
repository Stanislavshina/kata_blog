import axios from "axios";

export const setFavorited = async (slug: string, token: string | null) => {
  try {
    const res = await axios.post(
      `https://blog.kata.academy/api/articles/${slug}/favorite`,
      {},
      { headers: { Authorization: token && `Token ${token}` } }
    );
    return res;
  } catch (error) {
    throw new Error("error");
  }
};

export const deleteFavorited = async (slug: string, token: string | null) => {
  try {
    const res = await axios.delete(
      `https://blog.kata.academy/api/articles/${slug}/favorite`,
      { headers: { Authorization: token && `Token ${token}` } }
    );
    return res;
  } catch (error) {
    throw new Error("error");
  }
};
