import { Outlet } from "react-router";
import NavigationBar from "../components/common/NavigationBar";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-white">
      <NavigationBar />
      <main className="pt-[80px]">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
