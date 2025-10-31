"use client";

import {
  BasicInfoFields,
  PhotoUploadSection,
  SuccessModal,
  useAddEmployee
} from './add-employee';

export default function AddEmployeeForm() {
  const {
    loading,
    showSuccess,
    photoError,
    formData,
    setFormData,
    imageOption,
    setImageOption,
    handleFileUpload,
    handleSubmit,
    router
  } = useAddEmployee();

  return (
    <div className="p-4 lg:p-6">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6 lg:mb-8">
          <h1 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2">Add New Employee</h1>
          <p className="text-sm lg:text-base text-gray-600">Fill in the details to add a new employee to the system.</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 lg:p-6 space-y-4 lg:space-y-6"
        >
          <BasicInfoFields 
            formData={formData}
            setFormData={setFormData}
          />

          <PhotoUploadSection
            formData={formData}
            setFormData={setFormData}
            imageOption={imageOption}
            setImageOption={setImageOption}
            photoError={photoError}
            onFileUpload={handleFileUpload}
          />

          <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4 pt-4 lg:pt-6">
            <button
              type="button"
              onClick={() => router.push("/admin")}
              className="w-full sm:w-auto px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors cursor-pointer"
            >
              {loading ? "Adding..." : "Add Employee"}
            </button>
          </div>
        </form>
      </div>

      <SuccessModal show={showSuccess} />
    </div>
  );
}
