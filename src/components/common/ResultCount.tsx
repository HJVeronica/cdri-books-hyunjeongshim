import Typography from "./Typography";

interface ResultCountProps {
  count: number;
}

const ResultCount = ({ count }: ResultCountProps) => (
  <Typography variant="search-result" className="text-t-primary">
    총 <span className="text-primary">{count}</span>건
  </Typography>
);

export default ResultCount;
