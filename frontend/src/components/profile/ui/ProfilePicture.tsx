import { useRef, forwardRef, useImperativeHandle } from "react";
import { Camera, Upload } from "lucide-react";
import Image from "next/image";
import { ProfilePictureProps } from "@/lib/types";

export interface ProfilePictureRef {
  triggerFileInput: () => void;
}

const ProfilePicture = forwardRef<ProfilePictureRef, ProfilePictureProps>(function ProfilePicture({
  selectedImage,
  userImage,
  userName,
  onImageChange,
}, ref) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    triggerFileInput: () => fileInputRef.current?.click(),
  }));

  return (
    <div className="mb-6 sm:mb-8">
      <div className="rounded-xl">
        <h3 className="text-black text-base sm:text-lg font-semibold mb-4 sm:mb-6">
          Profile Picture
        </h3>
        <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6 lg:space-x-8">
          <div className="relative flex-shrink-0">
            <Image
              src={selectedImage || userImage}
              alt={userName}
              width={120}
              height={120}
              className="w-24 h-24 sm:w-28 sm:h-28 lg:w-30 lg:h-30 rounded-full object-cover border-4 border-white shadow-lg"
              unoptimized
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 bg-white text-blue-600 p-1.5 sm:p-2 rounded-full hover:bg-gray-50 transition-colors shadow-md"
            >
              <Camera className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>
          </div>
          <div className="text-center sm:text-left">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 transition-all flex items-center space-x-2 mb-3 cursor-pointer text-sm sm:text-base"
            >
              <Upload className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>Change Picture</span>
            </button>
            <p className="text-black text-xs sm:text-sm">
              JPG, GIF or PNG. 5MB max.
            </p>
            <p className="text-black text-xs sm:text-sm mt-1">
              Recommended: 400x400 pixels
            </p>
          </div>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/gif"
          onChange={onImageChange}
          className="hidden"
        />
      </div>
    </div>
  );
});

export default ProfilePicture;