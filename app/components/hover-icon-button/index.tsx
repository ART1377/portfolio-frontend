import { useState } from "react";
import { Button } from "../ui/button";

type HoverIconProps = {
  outlineIcon: React.ReactNode;
  filledIcon: React.ReactNode;
  children: React.ReactNode;
} & React.ComponentProps<typeof Button>;

export function HoverIconButton({ outlineIcon, filledIcon, children, ...props }: HoverIconProps) {
  const [hover, setHover] = useState(false);

  return (
    <Button
      {...props}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={`${props.className ?? ""}`}
    >
      {hover ? filledIcon : outlineIcon}
      {children}
    </Button>
  );
}
