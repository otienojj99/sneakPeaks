import React, { useCallback, useRef, useState } from "react";
import Button from "./Button";

// ─── Types ───────────────────────────────────────────────────────

interface FileWithPreview {
  file: File;
  preview: string;
  id: string; // For keying / removal before upload
}

interface ImageUploadProps {
  /** Already-uploaded image URLs for preview */
  existingImages?: { id: number; url: string; is_primary?: boolean }[];
  /** Called when new files are selected/dropped */
  onFilesSelected: (files: File[]) => void;
  /** Called when an existing image should be removed */
  onRemoveExisting?: (imageId: number) => void;
  /** Called when an existing image is set as primary */
  onSetPrimary?: (imageId: number) => void;
  /** Max number of files (total, including existing) */
  maxFiles?: number;
  /** Max size per file in bytes (default: 5MB) */
  maxSizeBytes?: number;
  /** Accepted MIME types */
  accept?: string;
  /** Single mode or multi */
  multiple?: boolean;
  error?: string;
  disabled?: boolean;
}

// ─── Helpers ─────────────────────────────────────────────────────

const formatBytes = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const generateId = () => Math.random().toString(36).slice(2, 10);

// ─── Component ───────────────────────────────────────────────────

const ImageUpload: React.FC<ImageUploadProps> = ({
  existingImages = [],
  onFilesSelected,
  onRemoveExisting,
  onSetPrimary,
  maxFiles = 10,
  maxSizeBytes = 5 * 1024 * 1024,
  accept = "image/jpeg,image/png,image/webp,image/gif",
  multiple = true,
  error: externalError,
  disabled = false,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [pendingFiles, setPendingFiles] = useState<FileWithPreview[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const totalCount = existingImages.length + pendingFiles.length;

  const validateAndAddFiles = useCallback(
    (incoming: FileList | File[]) => {
      const files = Array.from(incoming);
      const newErrors: string[] = [];
      const valid: FileWithPreview[] = [];

      for (const file of files) {
        if (totalCount + valid.length >= maxFiles) {
          newErrors.push(`Maximum ${maxFiles} images allowed`);
          break;
        }
        if (file.size > maxSizeBytes) {
          newErrors.push(`${file.name} exceeds ${formatBytes(maxSizeBytes)}`);
          continue;
        }
        if (!accept.split(",").some((t) => file.type === t.trim())) {
          newErrors.push(`${file.name} has an unsupported format`);
          continue;
        }
        valid.push({
          file,
          preview: URL.createObjectURL(file),
          id: generateId(),
        });
      }

      setErrors(newErrors);
      if (valid.length > 0) {
        setPendingFiles((prev) => [...prev, ...valid]);
        onFilesSelected(valid.map((v) => v.file));
      }
    },
    [totalCount, maxFiles, maxSizeBytes, accept, onFilesSelected],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragActive(false);
      if (!disabled) validateAndAddFiles(e.dataTransfer.files);
    },
    [disabled, validateAndAddFiles],
  );

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) validateAndAddFiles(e.target.files);
      e.target.value = ""; // Reset so re-selecting same file works
    },
    [validateAndAddFiles],
  );

  const removePending = useCallback((id: string) => {
    setPendingFiles((prev) => {
      const item = prev.find((p) => p.id === id);
      if (item) URL.revokeObjectURL(item.preview);
      return prev.filter((p) => p.id !== id);
    });
  }, []);

  const handlePrimaryChange = (imageId: number) => {
    if (onSetPrimary) {
      onSetPrimary(imageId);
    }
  };

  const featuredImage =
    existingImages.find((img) => img.is_primary) || existingImages[0] || null;

  const isPrimaryImage = (imgId: number) => {
    return featuredImage?.id === imgId;
  };

  return (
    <div className="space-y-4">
      {/* Drop zone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          if (!disabled) setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        onClick={() => !disabled && inputRef.current?.click()}
        className={[
          "relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 transition-colors cursor-pointer",
          dragActive
            ? "border-indigo-500 bg-indigo-50"
            : "border-gray-300 bg-gray-50 hover:bg-gray-100",
          disabled ? "opacity-50 cursor-not-allowed" : "",
        ].join(" ")}
      >
        <svg
          className="h-10 w-10 text-gray-400 mb-3"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.338-2.32 3.75 3.75 0 013.182 5.462A4.5 4.5 0 0118 19.5H6.75z"
          />
        </svg>
        <p className="text-sm text-gray-600">
          <span className="font-semibold text-indigo-600">Click to upload</span>{" "}
          or drag and drop
        </p>
        <p className="text-xs text-gray-500 mt-1">
          PNG, JPG, WebP up to {formatBytes(maxSizeBytes)} · Max {maxFiles}{" "}
          images
        </p>

        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileChange}
          className="hidden"
          disabled={disabled}
        />
      </div>

      {/* Errors */}
      {(errors.length > 0 || externalError) && (
        <div className="space-y-1">
          {externalError && (
            <p className="text-sm text-red-600">{externalError}</p>
          )}
          {errors.map((err, i) => (
            <p key={i} className="text-sm text-red-600">
              {err}
            </p>
          ))}
        </div>
      )}

      {/* Preview grid */}
      {(existingImages.length > 0 || pendingFiles.length > 0) && (
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
          {/* Existing uploaded images */}
          {existingImages.map((img) => (
            <div
              key={img.id}
              className="group relative aspect-square rounded-lg overflow-hidden border border-gray-200 bg-gray-100"
            >
              <img
                src={img.url}
                alt=""
                className="h-full w-full object-cover"
              />

              {/* Primary badge and checkbox */}
              <div className="absolute bottom-1 left-1 right-1 bg-black/60 rounded-md p-1 flex items-center justify-between gap-1">
                <label className="flex items-center gap-1 text-white text-xs">
                  <input
                    type="checkbox"
                    checked={isPrimaryImage(img.id)}
                    onChange={(e) => {
                      e.preventDefault();
                      e.stopPropagation();

                      handlePrimaryChange(img.id);
                    }}
                    disabled={disabled}
                    className="w-3 h-3"
                  />
                  {isPrimaryImage(img.id) && (
                    <div className="absolute top-1 left-1 bg-indigo-600 text-white text-[10px] px-2 py-0.5 rounded">
                      Featured
                    </div>
                  )}
                </label>
                {onRemoveExisting && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onRemoveExisting(img.id);
                    }}
                    className="text-white hover:text-red-300 text-xs font-bold"
                    disabled={disabled}
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Primary badge */}
              {img.is_primary && (
                <span className="absolute top-1 left-1 bg-yellow-400 text-yellow-900 text-xs font-bold px-1.5 py-0.5 rounded">
                  ★ Primary
                </span>
              )}

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                {onSetPrimary && !img.is_primary && (
                  <Button
                    type="button"
                    variant="secondary"
                    size="xs"
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      onSetPrimary(img.id);
                    }}
                  >
                    ★
                  </Button>
                )}
                {onRemoveExisting && (
                  <Button
                    type="button"
                    variant="danger"
                    size="xs"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onRemoveExisting(img.id);
                    }}
                    disabled={disabled}
                  >
                    ✕
                  </Button>
                )}
              </div>
            </div>
          ))}

          {/* Pending (not yet uploaded) */}
          {pendingFiles.map((pf) => (
            <div
              key={pf.id}
              className="group relative aspect-square rounded-lg overflow-hidden border border-dashed border-indigo-300 bg-indigo-50"
            >
              <img
                src={pf.preview}
                alt=""
                className="h-full w-full object-cover opacity-75"
              />
              <span className="absolute top-1 left-1 bg-indigo-600 text-white text-xs px-1.5 py-0.5 rounded">
                New
              </span>
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Button
                  type="button"
                  variant="danger"
                  size="xs"
                  onClick={() => removePending(pf.id)}
                >
                  ✕
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
