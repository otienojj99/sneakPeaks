import { useState, useRef } from "react";
import { FiUploadCloud, FiImage, FiTrash2, FiStar } from "react-icons/fi";

interface ImageUploaderProps {
  images: string[] | null;
  onUpload: (file: File, isPrimary: boolean) => void;
  isUpdating: boolean;
}

export const ImageUploader = ({
  images,
  onUpload,
  isUpdating,
}: ImageUploaderProps) => {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert("Image must be less than 5MB");
      return;
    }

    setUploading(true);
    await onUpload(file, images?.length === 0);
    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="border rounded-xl p-4">
      <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
        <FiImage size={18} /> Images
      </h3>

      <div className="flex gap-3 overflow-x-auto pb-2">
        {images?.map((img, idx) => (
          <div
            key={idx}
            className="relative w-20 h-20 rounded-xl bg-gray-100 flex-shrink-0"
          >
            <img
              src={img}
              alt="Product"
              className="w-full h-full object-cover rounded-xl"
            />
            {idx === 0 && (
              <span className="absolute top-1 right-1 bg-emerald-500 rounded-full p-0.5">
                <FiStar size={10} className="text-white" />
              </span>
            )}
          </div>
        ))}

        <div
          onClick={() =>
            !isUpdating && !uploading && fileInputRef.current?.click()
          }
          className={`w-20 h-20 rounded-xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all ${
            uploading
              ? "opacity-50"
              : "hover:border-emerald-300 hover:bg-emerald-50"
          }`}
        >
          {uploading ? (
            <div className="w-5 h-5 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <FiUploadCloud className="text-gray-400" size={20} />
              <span className="text-[10px] text-gray-400 mt-1">Upload</span>
            </>
          )}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
      <p className="text-xs text-gray-400 mt-2">
        First image is primary (main display)
      </p>
    </div>
  );
};
