import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

// Define button variants with better organization and additional options
const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
  {
    variants: {
      variant: {
        default: "bg-[#333333] text-white hover:bg-[#444444] active:bg-[#555555]",
        destructive:
          "bg-red-600 text-white hover:bg-red-700 active:bg-red-800",
        outline:
          "border border-input bg-transparent hover:bg-[#333333] hover:text-white active:bg-[#444444]",
        secondary: "bg-[#222222] text-white hover:bg-[#333333] active:bg-[#444444]",
        ghost: "bg-transparent hover:bg-[#333333] hover:text-white active:bg-[#444444]",
        link: "bg-transparent underline-offset-4 hover:underline text-white",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3 py-2",
        lg: "h-11 px-8 py-3",
        icon: "h-10 w-10 p-2",
      },
      intent: {
        primary: "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800",
        success: "bg-green-600 text-white hover:bg-green-700 active:bg-green-800",
        warning: "bg-yellow-600 text-white hover:bg-yellow-700 active:bg-yellow-800",
      },
    },
    compoundVariants: [
      {
        variant: "outline",
        intent: "primary",
        className: "border-blue-600 text-blue-600 hover:text-white",
      },
      {
        variant: "outline",
        intent: "success",
        className: "border-green-600 text-green-600 hover:text-white",
      },
      {
        variant: "outline",
        intent: "warning",
        className: "border-yellow-600 text-yellow-600 hover:text-white",
      },
    ],
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

// Extend ButtonProps with the new intent variant and improve type safety
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean; // New prop for loading state
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, intent, asChild = false, isLoading = false, disabled, children, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    const isDisabled = disabled || isLoading; // Combine disabled and loading states

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, intent, className }))}
        ref={ref}
        disabled={isDisabled}
        aria-busy={isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <span className="sr-only">Loading...</span>
            <svg
              className="animate-spin h-5 w-5 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8h-8z"
              />
            </svg>
          </>
        ) : null}
        {children}
      </Comp>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };