"use client";

import NextImage from "next/image";
import { Camera, Plus } from "lucide-react";
import { FormData } from "@/lib/types/addemployee";

interface PhotoUploadSectionProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  imageOption: string;
  setImageOption: React.Dispatch<React.SetStateAction<string>>;
  photoError: string;
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function PhotoUploadSection({
  formData,
  setFormData,
  imageOption,
  setImageOption,
  photoError,
  onFileUpload,
}: PhotoUploadSectionProps) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        Facial Recognition Data
      </h3>
      <p className="text-sm text-gray-600 mb-4">
        Upload a clear, forward-facing photo of the employee for accurate
        attendance tracking.
      </p>

      <div className="flex space-x-2 mb-4">
        <button
          type="button"
          onClick={() => setImageOption("upload")}
          className={`px-3 py-2 text-sm rounded ${
            imageOption === "upload"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          Upload
        </button>
        <button
          type="button"
          onClick={() => setImageOption("url")}
          className={`px-3 py-2 text-sm rounded ${
            imageOption === "url"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          URL
        </button>
      </div>

      {imageOption === "upload" && (
        <div className="relative bg-white border-2 border-dashed border-gray-300 rounded-lg p-6 lg:p-8 text-center">
          <div className="w-12 h-12 lg:w-16 lg:h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 relative">
            <Camera className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
            <div className="absolute -top-1 -right-1 w-5 h-5 lg:w-6 lg:h-6 bg-blue-600 rounded-full flex items-center justify-center">
              <Plus className="w-2.5 h-2.5 lg:w-3 lg:h-3 text-white" />
            </div>
          </div>
          <p className="text-blue-600 font-medium mb-2 text-sm lg:text-base">
            Click to upload or drag and drop
          </p>
          <p className="text-gray-500 text-xs lg:text-sm mb-4">
            PNG, JPG, or GIF (max. 5MB)
          </p>
          <input
            type="file"
            accept="image/*"
            onChange={onFileUpload}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
        </div>
      )}

      {imageOption === "url" && (
        <input
          type="url"
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black mb-4"
          placeholder="https://example.com/photo.jpg"
        />
      )}

      {formData.image && (
        <div className="mt-4">
          <NextImage
            src={formData.image}
            alt="Preview"
            width={80}
            height={80}
            className="w-20 h-20 rounded-full object-cover border-2 border-gray-300"
          />
        </div>
      )}

      {photoError && <p className="text-red-600 text-sm mt-2">{photoError}</p>}
    </div>
  );
}
