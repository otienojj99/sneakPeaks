import React, { forwardRef } from "react";

// ─── Types ───────────────────────────────────────────────────────

type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "danger"
  | "ghost"
  | "icon";
type ButtonSize = "xs" | "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: React.ReactNode;
  /** If true, renders a square icon-only button */
  iconOnly?: boolean;
  fullWidth?: boolean;
}

// ─── Style maps ──────────────────────────────────────────────────

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500 shadow-sm",
  secondary:
    "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-indigo-500 shadow-sm",
  outline:
    "bg-transparent text-indigo-600 border border-indigo-300 hover:bg-indigo-50 focus:ring-indigo-500",
  danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-sm",
  ghost:
    "bg-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:ring-gray-500",
  icon: "bg-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:ring-gray-500 rounded-full",
};

const sizeStyles: Record<ButtonSize, string> = {
  xs: "px-2.5 py-1.5 text-xs",
  sm: "px-3 py-2 text-sm",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-3 text-base",
};

const iconOnlySizes: Record<ButtonSize, string> = {
  xs: "p-1 text-xs",
  sm: "p-1.5 text-sm",
  md: "p-2 text-sm",
  lg: "p-3 text-base",
};

// ─── Component ───────────────────────────────────────────────────

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading = false,
      icon,
      iconOnly = false,
      fullWidth = false,
      disabled,
      className = "",
      children,
      ...rest
    },
    ref,
  ) => {
    const isDisabled = disabled || loading;

    const classes = [
      "inline-flex items-center justify-center font-medium rounded-lg",
      "transition-colors duration-150 ease-in-out",
      "focus:outline-none focus:ring-2 focus:ring-offset-2",
      variantStyles[variant],
      iconOnly ? iconOnlySizes[size] : sizeStyles[size],
      fullWidth ? "w-full" : "",
      isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <button ref={ref} className={classes} disabled={isDisabled} {...rest}>
        {loading ? (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
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
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        ) : icon ? (
          <span className={children ? "mr-2" : ""}>{icon}</span>
        ) : null}
        {!iconOnly && children}
      </button>
    );
  },
);

Button.displayName = "Button";
export default Button;
