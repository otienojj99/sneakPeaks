import React, { forwardRef, useId } from "react";

// ─── Types ───────────────────────────────────────────────────────

type InputType =
  | "text"
  | "number"
  | "email"
  | "password"
  | "url"
  | "tel"
  | "search";

interface InputBaseProps {
  label?: string;
  description?: string;
  error?: string;
  required?: boolean;
  fullWidth?: boolean;
  /** Show a character count (for text/textarea) */
  maxLength?: number;
}

interface TextInputProps
  extends
    InputBaseProps,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  type?: InputType;
  multiline?: false;
}

interface TextareaProps
  extends InputBaseProps, React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  multiline: true;
  rows?: number;
}

type InputProps = TextInputProps | TextareaProps;

// ─── Component ───────────────────────────────────────────────────

const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(
  (props, ref) => {
    const generatedId = useId();

    const {
      label,
      description,
      error,
      required,
      fullWidth = true,
      maxLength,
      className = "",
      id,
      ...rest
    } = props;

    const inputId = id ?? generatedId;
    const isMultiline = "multiline" in props && props.multiline;

    const baseInputClasses = [
      "block rounded-lg border shadow-sm sm:text-sm",
      "transition-colors duration-150",
      "focus:outline-none focus:ring-2 focus:ring-offset-0",
      error
        ? "border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500"
        : "border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500",
      fullWidth ? "w-full" : "",
      "disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed",
      className,
    ].join(" ");

    const currentLength =
      typeof (rest as { value?: unknown }).value === "string"
        ? ((rest as { value: string }).value?.length ?? 0)
        : 0;

    return (
      <div className={fullWidth ? "w-full" : ""}>
        {/* Label */}
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {label}
            {required && <span className="text-red-500 ml-0.5">*</span>}
          </label>
        )}

        {/* Description above */}
        {description && !error && (
          <p className="text-xs text-gray-500 mb-1">{description}</p>
        )}

        {/* The input or textarea */}
        {isMultiline ? (
          <textarea
            ref={ref as React.Ref<HTMLTextAreaElement>}
            id={inputId}
            rows={(props as TextareaProps).rows ?? 4}
            className={`${baseInputClasses} px-3 py-2`}
            aria-invalid={!!error}
            aria-describedby={error ? `${inputId}-error` : undefined}
            maxLength={maxLength}
            {...(rest as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : (
          <input
            ref={ref as React.Ref<HTMLInputElement>}
            id={inputId}
            type={(props as TextInputProps).type ?? "text"}
            className={`${baseInputClasses} px-3 py-2 h-10`}
            aria-invalid={!!error}
            aria-describedby={error ? `${inputId}-error` : undefined}
            maxLength={maxLength}
            {...(rest as React.InputHTMLAttributes<HTMLInputElement>)}
          />
        )}

        {/* Bottom row: error or char count */}
        <div className="flex justify-between mt-1">
          {error ? (
            <p
              id={`${inputId}-error`}
              className="text-xs text-red-600"
              role="alert"
            >
              {error}
            </p>
          ) : (
            <span />
          )}
          {maxLength != null && (
            <span
              className={`text-xs ${
                currentLength > maxLength ? "text-red-500" : "text-gray-400"
              }`}
            >
              {currentLength}/{maxLength}
            </span>
          )}
        </div>
      </div>
    );
  },
);

Input.displayName = "Input";
export default Input;
