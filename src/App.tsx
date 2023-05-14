import { Route, Routes } from "react-router-dom";
import "./App.scss";
import PostList from "./components/PostList/PostList";
import Post from "./pages/Post/Post";
import { login } from "./store/slices/user";
import { useEffect } from "react";
import { useAppDispatch } from "./store/handleHooks";
import Layout from "./components/Layout/Layout";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(login({ email: "ass22@mail.gg", password: "12345678" }));
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<PostList />} />
        <Route path="articles/:id" element={<Post />} />
      </Route>
    </Routes>
  );
}

export default App;
