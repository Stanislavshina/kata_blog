import { Outlet } from "react-router-dom";
import Header from "../Header/Header";

const Layout: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <Outlet />
    </div>
  );
};

export default Layout;
