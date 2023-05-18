import { Route, Routes } from "react-router-dom";
import "./App.scss";
import PostList from "./components/PostList/PostList";
import Post from "./pages/Post/Post";
import Layout from "./components/Layout/Layout";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import EditProfile from "./pages/EditProfile/EditProfile";
import NewArticle from "./pages/NewArticle/NewArticle";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<PostList />} />
        <Route path="articles/:id" element={<Post />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/articles/:id/edit" element={"nothing"} />
        <Route path="/new-article" element={<NewArticle />} />
      </Route>
    </Routes>
  );
}

export default App;
