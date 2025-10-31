"use client";

import { useState } from "react";
import { LoginFormData, LoginFormProps } from "@/lib/types";

export default function LoginForm({ onSubmit, loading, error }: LoginFormProps) {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [fieldErrors, setFieldErrors] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  const handleInputChange = (field: keyof LoginFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (fieldErrors[field]) {
      setFieldErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
      <div>
        <input
          type="text"
          value={formData.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
          className="w-full px-3 py-2.5 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm sm:text-base text-gray-900 placeholder-gray-500 hover:border-gray-400"
          placeholder="Username or Email"
          required
          disabled={loading}
        />
        {fieldErrors.email && (
          <p className="text-red-600 text-xs sm:text-sm mt-1">{fieldErrors.email}</p>
        )}
      </div>

      <div>
        <input
          type="password"
          value={formData.password}
          onChange={(e) => handleInputChange("password", e.target.value)}
          className="w-full px-3 py-2.5 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm sm:text-base text-gray-900 placeholder-gray-500 hover:border-gray-400"
          placeholder="Password"
          required
          disabled={loading}
        />
        {fieldErrors.password && (
          <p className="text-red-600 text-xs sm:text-sm mt-1">{fieldErrors.password}</p>
        )}
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <p className="text-red-600 text-xs sm:text-sm">{error}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2.5 sm:py-3 px-4 rounded-lg font-medium text-sm sm:text-base hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
      >
        {loading && (
          <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        )}
        {loading ? "Loading..." : "Continue"}
      </button>
    </form>
  );
}