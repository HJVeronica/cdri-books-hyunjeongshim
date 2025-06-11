import EmptyIcon from "../../assets/images/empty.svg";
import Typography from "./Typography";

interface EmptyResultProps {
  message?: string;
}

const EmptyResult = ({
  message = "검색된 결과가 없습니다.",
}: EmptyResultProps) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <img
        src={EmptyIcon}
        alt="결과 없음"
        className="w-[80px] h-[80px] mb-[24px]"
      />
      <Typography variant="caption" className="text-t-secondary">
        {message}
      </Typography>
    </div>
  );
};

export default EmptyResult;
