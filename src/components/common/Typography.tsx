import type { TypographyProps } from "../../types/components";

const variantStyles: Record<TypographyProps["variant"], string> = {
  title1: "text-[24px] leading-[24px] font-bold",
  title2: "text-[22px] leading-[24px] font-bold",
  title3: "text-[18px] leading-[18px] font-bold",
  "h3-bold": "text-[18px] leading-[26px] font-bold",
  body1: "text-[20px] leading-[20px] font-medium",
  body2: "text-[14px] leading-[14px] font-medium",
  "body2-bold": "text-[14px] leading-[14px] font-bold",
  caption: "text-[16px] leading-[16px] font-medium",
  small: "text-[10px] leading-[10px] font-medium",
  "search-result": "text-[16px] leading-[24px] font-medium",
  "book-detail-title": "text-[14px] leading-[26px] font-bold",
  "book-detail-contents": "text-[10px] leading-[16px] font-medium",
  "book-detail-price-title":
    "text-[10px] leading-[22px] font-medium text-right",
  "book-detail-strike-price":
    "text-[18px] leading-[26px] font-[350] line-through",
};

const Typography = ({
  variant,
  children,
  className = "",
  as: Component = "span",
}: TypographyProps) => {
  return (
    <Component className={`${variantStyles[variant]} ${className}`}>
      {children}
    </Component>
  );
};

export default Typography;
