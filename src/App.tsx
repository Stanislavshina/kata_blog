import { Route, Routes } from "react-router-dom";
import "./App.scss";
import PostList from "./components/PostList/PostList";
import Post from "./pages/Post/Post";
import { login } from "./store/slices/user";
import { useEffect } from "react";
import { useAppDispatch } from "./store/handleHooks";
import Layout from "./components/Layout/Layout";
import SignIn from "./pages/SignIn/SignIn";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(login({ email: "ass22@mail.gg", password: "12345678" }));
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<PostList />} />
        <Route path="articles/:id" element={<Post />} />
        <Route path="/sign-in" element={<SignIn />} />
      </Route>
    </Routes>
  );
}

export default App;
