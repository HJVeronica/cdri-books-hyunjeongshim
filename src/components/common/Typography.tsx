import type { ReactNode } from "react";

type TypographyVariant =
  | "title1"
  | "title2"
  | "title3"
  | "body1"
  | "body2"
  | "body2-bold"
  | "caption"
  | "small"
  | "search-result";

interface TypographyProps {
  variant: TypographyVariant;
  children: ReactNode;
  className?: string;
}

const variantStyles: Record<TypographyVariant, string> = {
  title1: "text-[24px] leading-[24px] font-bold",
  title2: "text-[22px] leading-[24px] font-bold",
  title3: "text-[18px] leading-[18px] font-bold",
  body1: "text-[20px] leading-[20px] font-medium",
  body2: "text-[14px] leading-[14px] font-medium",
  "body2-bold": "text-[14px] leading-[14px] font-bold",
  caption: "text-[16px] leading-[16px] font-medium",
  small: "text-[10px] leading-[10px] font-medium",
  "search-result": "text-[16px] leading-[24px] font-medium",
};

const Typography = ({ variant, children, className = "" }: TypographyProps) => {
  return (
    <span className={`${variantStyles[variant]} ${className}`}>{children}</span>
  );
};

export default Typography;
