import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Article } from "../../types/Article";

type ArticleState = {
  articles: Article[];
  isLoading: boolean;
  totalArticlesCount: number;
  page: number;
  error: string | null;
};

export const fetchArticles = createAsyncThunk(
  "articles/fetchArticles",
  async (offset: number) => {
    try {
      const response = await axios.get(
        `https://blog.kata.academy/api/articles?limit=5&offset=${offset}`
      );
      return response.data;
    } catch (error) {
      throw new Error(`error ${error}`);
    }
  }
);

const articleSlice = createSlice({
  name: "articles",
  initialState: {
    articles: [],
    isLoading: false,
    totalArticlesCount: 0,
    page: 1,
    error: null,
  } as ArticleState,
  reducers: {
    setNextPage(state, action) {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.articles = action.payload.articles;
        state.totalArticlesCount = action.payload.articlesCount;
        state.isLoading = false;
      })
      .addCase(fetchArticles.rejected, (state) => {
        state.error = "cant fetch it";
      });
  },
});

export const { setNextPage } = articleSlice.actions;
export default articleSlice.reducer;
