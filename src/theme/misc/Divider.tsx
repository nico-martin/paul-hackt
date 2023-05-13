import React from "react";
import cn from "@common/classnames";

const Divider: React.FC<{ className?: string }> = ({ className }) => (
  <div className={cn("w-full h-1 my-2 bg-teal rounded-md", className)} />
);

export default Divider;
