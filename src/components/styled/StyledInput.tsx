"use client";

import { extendVariants } from "@heroui/system";
import { Input } from "@heroui/input";

const StyledInput = extendVariants(Input, {
  variants: {
    color: {
      white: {
        mainWrapper: "max-w-[150px] sm:max-w-full",
        inputWrapper: [
          "bg-white",
          "dark:bg-black",
          "data-[hover=true]:border",
          "data-[hover=true]:bg-zinc-100",
        ],
        input: [
          "text-zinc-800",
          "placeholder:text-zinc-600",
          "dark:text-zinc-400",
          "dark:placeholder:text-zinc-600",
        ],
      },
    },
    size: {
      md: {
        inputWrapper: "py-[12px]",
      },
      lg: {
        inputWrapper: "py-[16px]",
      },
    },
    radius: {
      sm: {
        inputWrapper: "border",
      },
      md: {
        inputWrapper: "border-md",
      },
      lg: {
        inputWrapper: "border-lg",
      },
    },
  },
  defaultVariants: {
    color: "white",
    size: "md",
    radius: "sm",
  },
});

export default StyledInput;
