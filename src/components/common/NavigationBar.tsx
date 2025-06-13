import { Link, useLocation } from "react-router";
import Typography from "./Typography";

const NavigationBar = () => {
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 h-[80px] bg-white flex items-center px-20">
      {/* 서비스명 */}
      <Link to="/">
        <Typography variant="title1" className="text-t-primary">
          CERTICOS BOOKS
        </Typography>
      </Link>

      {/* 중앙 메뉴 버튼 */}
      <div className="flex-1 flex justify-center gap-10 pr-30">
        <Link to="/search" className="relative flex flex-col items-center">
          <Typography variant="body1" className="text-t-primary">
            도서 검색
          </Typography>
          {location.pathname === "/search" && (
            <div className="absolute -bottom-3 w-full border-[1px] border-primary" />
          )}
        </Link>
        <Link to="/favorite" className="relative flex flex-col items-center">
          <Typography variant="body1" className="text-t-primary">
            내가 찜한 책
          </Typography>
          {location.pathname === "/favorite" && (
            <div className="absolute -bottom-3 w-full border-[1px] border-primary" />
          )}
        </Link>
      </div>
    </nav>
  );
};

export default NavigationBar;
