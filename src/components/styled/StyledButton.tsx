"use client";

import { extendVariants } from "@heroui/system";
import { Button } from "@heroui/button";

const StyledButton = extendVariants(Button, {
  variants: {
    color: {
      white: "bg-white px-[12px] text-black font-medium",
      black: "bg-[#25282B] text-white font-medium",
      skyblue: "bg-gradient-to-r from-[#00B4DB] to-[#0083B0] text-white font-medium",
    },
    hasBorder: {
      true: "border border-[#E6E6E6] shadow",
    },
    size: {
      sm: "px-[16px] py-[8px]",
      md: "px-4 py-3",
      lg: "px-8 py-6",
    },
    radius: {
      sm: "border",
      md: "border-md",
      lg: "border-lg",
    },
  },
  defaultVariants: {
    color: "white",
    size: "lg",
    radius: "sm",
  },
});

export default StyledButton;
