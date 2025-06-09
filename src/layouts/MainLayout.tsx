import { Outlet } from "react-router";
import NavigationBar from "../components/common/NavigationBar";

const MainLayout = () => {
  return (
    <div className="w-full min-h-screen bg-white">
      <NavigationBar />
      <main className="w-full h-full pt-[80px]">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
