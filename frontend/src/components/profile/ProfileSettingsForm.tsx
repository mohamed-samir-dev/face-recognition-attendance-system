"use client";

import { useRef } from "react";
import Button from "@/components/common/Button";
import { useProfileForm } from "./hooks/useProfileForm";
import { usePasswordModal } from "./hooks/usePasswordModal";
import ProfilePicture, { ProfilePictureRef } from "./ProfilePicture";
import PersonalInfoForm from "./PersonalInfoForm";
import NotificationSettings from "./NotificationSettings";
import PasswordModal from "./PasswordModal";
import ProfileSidebar from "./ProfileSidebar";
import SuccessNotifications from "./SuccessNotifications";
import { User } from "@/lib/types";

interface ProfileSettingsFormProps {
  user: User;
}

export default function ProfileSettingsForm({
  user,
}: ProfileSettingsFormProps) {
  const profilePictureRef = useRef<ProfilePictureRef>(null);
  
  const {
    formData,
    selectedImage,
    showSuccess,
    handleInputChange,
    handleImageChange,
    handleSave,
  } = useProfileForm(user);

  const {
    showPasswordModal,
    setShowPasswordModal,
    passwordData,
    showPasswordSuccess,
    showCurrentPassword,
    setShowCurrentPassword,
    showNewPassword,
    setShowNewPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    passwordError,
    handlePasswordChange,
    handlePasswordUpdate,
  } = usePasswordModal(user);

  const handleCancel = () => {
    console.log("Cancelling changes");
  };

  return (
    <>
      <SuccessNotifications 
        showSuccess={showSuccess} 
        showPasswordSuccess={showPasswordSuccess} 
      />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        <div className="xl:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-4 sm:p-6 border-b border-gray-200">
              <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
                Profile Settings
              </h1>
              <p className="text-gray-600 mt-1 text-sm sm:text-base">
                Manage your personal information and preferences
              </p>
            </div>

            <div className="p-4 sm:p-6 space-y-6 sm:space-y-8">
              <div>
                <ProfilePicture
                  ref={profilePictureRef}
                  selectedImage={selectedImage}
                  userImage={user.image}
                  userName={user.name}
                  onImageChange={handleImageChange}
                />

                <PersonalInfoForm
                  formData={formData}
                  userPassword={user.password || ""}
                  userNumericId={user.numericId?.toString() || ""}
                  onInputChange={handleInputChange}
                  onPasswordModalOpen={() => setShowPasswordModal(true)}
                />
              </div>

              <NotificationSettings
                formData={formData}
                onInputChange={handleInputChange}
              />

              <div>
                <h2 className="text-base sm:text-lg font-medium text-gray-900 mb-4">
                  Privacy Settings
                </h2>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                    Attendance History Visibility
                  </label>
                  <p className="text-xs sm:text-sm text-gray-500 mb-3">
                    Control who can see your attendance history.
                  </p>
                  <select
                    value={formData.attendanceHistoryVisibility}
                    onChange={(e) =>
                      handleInputChange(
                        "attendanceHistoryVisibility",
                        e.target.value
                      )
                    }
                    className="w-full sm:max-w-xs px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-gray-50 text-sm sm:text-base"
                    disabled
                  >
                    <option value="team">Team members</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="px-4 sm:px-6 py-4 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3">
              <Button
                variant="secondary"
                onClick={handleCancel}
                className="px-4 sm:px-6 py-2 w-full sm:w-auto text-sm sm:text-base"
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleSave}
                className="px-4 sm:px-6 py-2 w-full sm:w-auto text-sm sm:text-base"
              >
                Save Changes
              </Button>
            </div>
          </div>
        </div>

        <ProfileSidebar
          user={user}
          onUpdatePicture={() => profilePictureRef.current?.triggerFileInput()}
          onChangePassword={() => setShowPasswordModal(true)}
        />
      </div>

      <PasswordModal
        showPasswordModal={showPasswordModal}
        passwordData={passwordData}
        showCurrentPassword={showCurrentPassword}
        showNewPassword={showNewPassword}
        showConfirmPassword={showConfirmPassword}
        passwordError={passwordError}
        onClose={() => setShowPasswordModal(false)}
        onPasswordChange={handlePasswordChange}
        onPasswordUpdate={handlePasswordUpdate}
        onToggleCurrentPassword={() => setShowCurrentPassword(!showCurrentPassword)}
        onToggleNewPassword={() => setShowNewPassword(!showNewPassword)}
        onToggleConfirmPassword={() => setShowConfirmPassword(!showConfirmPassword)}
      />
    </>
  );
}
