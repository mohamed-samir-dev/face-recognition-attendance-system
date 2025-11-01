'use client';

import { RotateCcw } from 'lucide-react';

interface FacialDataSectionProps {
  updating: boolean;
  hasNewPhoto: boolean;
  photoMessage: { type: 'success' | 'error'; text: string } | null;
  onPhotoUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onResetClick: () => void;
}

export default function FacialDataSection({
  updating,
  hasNewPhoto,
  photoMessage,
  onPhotoUpload,
  onResetClick
}: FacialDataSectionProps) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        Facial Recognition Data
      </h3>
      <p className="text-sm text-gray-600 mb-4">
        Manage facial recognition data for accurate attendance tracking.
      </p>

      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
        <div className="relative">
          <input
            type="file"
            accept="image/*"
            onChange={onPhotoUpload}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            id="facial-data-upload"
          />
          <button
            type="button"
            disabled={updating}
            className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {updating ? 'Updating...' : 'Update Facial Data'}
          </button>
        </div>
        {hasNewPhoto && (
          <button
            type="button"
            onClick={onResetClick}
            className="w-full sm:w-auto px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center space-x-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="hidden sm:inline">Reset Facial Data</span>
            <span className="sm:hidden">Reset</span>
          </button>
        )}
      </div>
      
      {photoMessage && (
        <div className={`mt-3 p-3 rounded-lg text-sm ${
          photoMessage.type === 'success' 
            ? 'bg-green-50 text-green-700 border border-green-200' 
            : 'bg-red-50 text-red-700 border border-red-200'
        }`}>
          {photoMessage.text}
        </div>
      )}
    </div>
  );
}