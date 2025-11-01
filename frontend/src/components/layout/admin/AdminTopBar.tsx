"use client";

import Image from "next/image";
import { Bell, Search, Menu } from "lucide-react";
import { AdminTopBarProps } from "@/lib/types";

export default function AdminTopBar({
  user,
  onLogout,
  showNotifications,
  onToggleNotifications,
  pendingRequests,
  onViewRequest,
  searchQuery,
  onSearchChange,
  onMenuClick,
}: AdminTopBarProps) {
  const pendingCount = pendingRequests.length;

  return (
    <div className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 lg:px-6">
      {/* Left side */}
      <div className="flex items-center space-x-4 flex-1">
        {/* Mobile menu button */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-md hover:bg-gray-100"
        >
          <Menu className="w-5 h-5 text-gray-600" />
        </button>
        
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search requests..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500 text-sm"
          />
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center space-x-4">
        <div className="relative">
          <button
            onClick={onToggleNotifications}
            className="relative p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <Bell className="w-5 h-5 text-gray-400 hover:text-gray-600" />
            {pendingCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {pendingCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 top-full mt-2 w-80 max-w-[calc(100vw-2rem)] bg-white rounded-lg shadow-lg border border-gray-200 z-50">
              <div className="p-4 border-b border-gray-100">
                <h3 className="font-semibold text-gray-900">Pending Requests</h3>
                <p className="text-sm text-gray-500">{pendingCount} new requests</p>
              </div>
              <div className="max-h-64 overflow-y-auto">
                {pendingRequests.slice(0, 5).map((request) => (
                  <div key={request.id} className="p-3 hover:bg-gray-50 border-b border-gray-50 last:border-b-0">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className="font-medium text-sm text-gray-900">{request.employeeName}</p>
                        <p className="text-xs text-gray-500">{request.leaveType}</p>
                        <p className="text-xs text-gray-400 mt-1">
                          {new Date(request.startDate).toLocaleDateString()} - {new Date(request.endDate).toLocaleDateString()}
                        </p>
                      </div>
                      <button
                        onClick={() => onViewRequest(request)}
                        className="text-blue-500 text-xs hover:text-blue-700"
                      >
                        View
                      </button>
                    </div>
                  </div>
                ))}
                {pendingCount === 0 && (
                  <div className="p-4 text-center text-gray-500 text-sm">
                    No pending requests
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <Image
          src={user.image}
          alt={user.name}
          width={32}
          height={32}
          className="w-8 h-8 rounded-full cursor-pointer flex-shrink-0"
          onClick={onLogout}
        />
      </div>
    </div>
  );
}