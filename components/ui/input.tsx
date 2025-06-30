import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-[55px] w-full rounded-md border border-input border-black bg-transparent px-5 stransition-colors file:border-0 file:bg-transparent file:text-[18px] file:font-normal file:text-foreground placeholder:text-muted-foreground placeholder:text-[18px] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-black disabled:cursor-not-allowed disabled:opacity-50 md:text-[18px]",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
