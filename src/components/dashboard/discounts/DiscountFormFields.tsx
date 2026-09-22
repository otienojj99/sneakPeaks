// components/discounts/DiscountFormFields.tsx

import React, { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { X, ChevronDown, Upload } from "lucide-react";

// ─── Input Classes ──────────────────────────────────────────────

export const inputClass =
  "w-full rounded-lg border border-[#E4E0D8] bg-white px-3.5 py-2.5 text-sm text-[#14151A] placeholder:text-[#8B8681]/70 transition-colors focus:outline-none focus:border-[#14151A] focus:ring-2 focus:ring-[#CFFF04]/40 disabled:bg-[#F5F3EE] disabled:text-[#8B8681]";

export const selectClass = inputClass + " appearance-none pr-9";

// ─── Field Component ────────────────────────────────────────────

interface FieldProps {
  label: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}

export const Field: React.FC<FieldProps> = ({
  label,
  required,
  hint,
  children,
}) => {
  return (
    <div>
      <label className="flex items-baseline gap-1 text-sm font-medium text-[#14151A] mb-1.5">
        {label}
        {required && <span className="text-[#FF4526]">*</span>}
      </label>
      {children}
      {hint && <p className="text-xs text-[#8B8681] mt-1.5">{hint}</p>}
    </div>
  );
};

// ─── Toggle Switch ──────────────────────────────────────────────

interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  description?: string;
}

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  checked,
  onChange,
  label,
  description,
}) => {
  return (
    <label className="flex items-start justify-between gap-4 py-1 cursor-pointer select-none">
      <span>
        <span className="block text-sm font-medium text-[#14151A]">
          {label}
        </span>
        {description && (
          <span className="block text-xs text-[#8B8681] mt-0.5">
            {description}
          </span>
        )}
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className="relative shrink-0 w-10 h-6 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#14151A] focus-visible:ring-offset-2"
        style={{ background: checked ? "#CFFF04" : "#E4E0D8" }}
      >
        <motion.span
          className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm"
          animate={{ left: checked ? 18 : 2 }}
          transition={{ type: "spring", stiffness: 500, damping: 32 }}
        />
      </button>
    </label>
  );
};

// ─── Multi-Select Field ─────────────────────────────────────────

interface MultiSelectOption {
  id: string;
  label: string;
}

interface MultiSelectFieldProps {
  options: MultiSelectOption[];
  selected: string[];
  onChange: (ids: string[]) => void;
  placeholder?: string;
}

export const MultiSelectField: React.FC<MultiSelectFieldProps> = ({
  options,
  selected,
  onChange,
  placeholder = "Search…",
}) => {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputRect, setInputRect] = useState<DOMRect | null>(null);

  const selectedOptions = options.filter((o) => selected.includes(o.id));
  const available = useMemo(
    () =>
      options.filter(
        (o) =>
          !selected.includes(o.id) &&
          o.label.toLowerCase().includes(query.toLowerCase()),
      ),
    [options, selected, query],
  );

  const add = (id: string) => {
    onChange([...selected, id]);
    setQuery("");
    setOpen(false);
  };

  const remove = (id: string) => {
    onChange(selected.filter((s) => s !== id));
  };

  const handleFocus = () => {
    if (inputRef.current) {
      setInputRect(inputRef.current.getBoundingClientRect());
    }
    setOpen(true);
  };

  const handleBlur = (e: React.FocusEvent) => {
    // Check if focus is moving to the dropdown
    if (
      e.relatedTarget &&
      (e.relatedTarget as HTMLElement).closest("[data-dropdown]")
    ) {
      return;
    }
    setOpen(false);
  };

  return (
    <div className="relative">
      {selectedOptions.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-2">
          {selectedOptions.map((o) => (
            <span
              key={o.id}
              className="inline-flex items-center gap-1 rounded-full bg-[#14151A]/5 pl-3 pr-1.5 py-1 text-xs font-medium text-[#14151A]"
            >
              {o.label}
              <button
                type="button"
                onClick={() => remove(o.id)}
                className="w-4 h-4 rounded-full flex items-center justify-center hover:bg-[#14151A]/10"
              >
                <X size={10} />
              </button>
            </span>
          ))}
        </div>
      )}
      <div className="relative">
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          className="w-full rounded-lg border border-[#E4E0D8] bg-white pl-3.5 pr-9 py-2.5 text-sm text-[#14151A] placeholder:text-[#8B8681]/70 focus:outline-none focus:border-[#14151A] focus:ring-2 focus:ring-[#CFFF04]/40"
        />
        <ChevronDown
          size={15}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8B8681] pointer-events-none"
        />
      </div>

      {open &&
        available.length > 0 &&
        inputRect &&
        createPortal(
          <ul
            data-dropdown
            onMouseDown={(e) => e.preventDefault()}
            className="fixed z-50 max-h-56 overflow-y-auto rounded-lg border border-[#E4E0D8] bg-white shadow-[0_16px_36px_-16px_rgba(20,21,26,0.25)] py-1"
            style={{
              left: `${inputRect.left}px`,
              top: `${inputRect.bottom + 4}px`,
              width: `${inputRect.width}px`,
            }}
          >
            {available.map((o) => (
              <li key={o.id}>
                <button
                  type="button"
                  onClick={() => add(o.id)}
                  className="w-full text-left px-3.5 py-2 text-sm text-[#14151A] hover:bg-[#F5F3EE]"
                >
                  {o.label}
                </button>
              </li>
            ))}
          </ul>,
          document.body,
        )}
    </div>
  );
};

// ─── Banner Upload ──────────────────────────────────────────────

interface BannerUploadProps {
  value: string | null;
  onChange: (url: string | null, file?: File) => void;
}

export const BannerUpload: React.FC<BannerUploadProps> = ({
  value,
  onChange,
}) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    onChange(url, file);
  };

  const handleRemove = () => {
    onChange(null);
  };

  if (value) {
    return (
      <div className="relative w-full max-w-xs rounded-lg overflow-hidden border border-[#E4E0D8]">
        <img
          src={value}
          alt="Banner preview"
          className="w-full h-32 object-cover"
        />
        <button
          type="button"
          onClick={handleRemove}
          className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90 flex items-center justify-center hover:bg-white"
        >
          <X size={13} />
        </button>
      </div>
    );
  }

  return (
    <label className="flex items-center gap-2 w-full max-w-xs rounded-lg border border-dashed border-[#E4E0D8] px-4 py-6 text-sm text-[#8B8681] cursor-pointer hover:border-[#14151A] transition-colors justify-center">
      <Upload size={15} />
      Upload image
      <input
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
    </label>
  );
};
