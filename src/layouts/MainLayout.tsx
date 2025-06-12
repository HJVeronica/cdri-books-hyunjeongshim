import { Outlet } from "react-router";
import NavigationBar from "../components/common/NavigationBar";

const MainLayout = () => {
  return (
    <div className="w-full min-h-screen bg-white pb-20 px-15">
      <NavigationBar />
      <main className="w-full h-full pt-[80px]">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
