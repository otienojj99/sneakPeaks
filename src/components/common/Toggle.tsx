import React from "react";

interface ToggleProps {
  enabled: boolean;
  onChange: (value: boolean) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
  size?: "sm" | "md";
}

const Toggle: React.FC<ToggleProps> = ({
  enabled,
  onChange,
  label,
  description,
  disabled = false,
  size = "md",
}) => {
  const trackSize = size === "sm" ? "h-5 w-9" : "h-6 w-11";
  const knobSize = size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4";
  const translateOn = size === "sm" ? "translate-x-4" : "translate-x-5";

  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        role="switch"
        aria-checked={enabled}
        disabled={disabled}
        onClick={() => !disabled && onChange(!enabled)}
        className={[
          "relative inline-flex flex-shrink-0 rounded-full transition-colors duration-200 ease-in-out cursor-pointer",
          "focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",
          trackSize,
          enabled ? "bg-indigo-600" : "bg-gray-200",
          disabled ? "opacity-50 cursor-not-allowed" : "",
        ].join(" ")}
      >
        <span
          className={[
            "pointer-events-none inline-block rounded-full bg-white shadow transform transition duration-200 ease-in-out",
            knobSize,
            "mt-[3px] ml-[3px]",
            enabled ? translateOn : "translate-x-0",
          ].join(" ")}
        />
      </button>
      {(label || description) && (
        <div>
          {label && (
            <span className="text-sm font-medium text-gray-900">{label}</span>
          )}
          {description && (
            <p className="text-xs text-gray-500">{description}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Toggle;
