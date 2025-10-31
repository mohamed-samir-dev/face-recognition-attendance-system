"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Bell, Menu, X } from "lucide-react";
import AppLogo from "./AppLogo";
import { useNotifications } from "@/hooks/useNotifications";
import { markAsRead } from "@/lib/services/notificationService";
import Toast from "@/components/common/Toast";
import { NavbarProps } from "@/lib/types";

export default function Navbar({ 
  user, 
  title = "Employee Attendance", 
  onUserClick,
  showNavigation = false,
  navigationItems = []
}: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'warning'; isVisible: boolean }>({ message: '', type: 'success', isVisible: false });
  
  const { notifications } = useNotifications(user?.numericId?.toString() || '');
  const unreadCount = notifications.filter(n => !n.isRead).length;

  useEffect(() => {
    const latestUnread = notifications.find(n => !n.isRead);
    if (latestUnread) {
      const type = latestUnread.type === 'leave_approved' ? 'success' : 'warning';
      setToast({ message: latestUnread.message, type, isVisible: true });
    }
  }, [notifications]);

  const handleMarkAsRead = async (notificationId: string) => {
    await markAsRead(notificationId);
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-full mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <AppLogo size="md" showText={false} />
            <h1 className="text-base sm:text-lg font-semibold text-[#1A1A1A] truncate">
              {title}
            </h1>
          </div>

          {showNavigation && (
            <div className="hidden md:flex items-center space-x-8">
              {navigationItems.map((item, index) => (
                <button
                  key={index}
                  onClick={item.onClick}
                  className="text-[#555] hover:text-[#1A1A1A] font-medium cursor-pointer"
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}

          <div className="flex items-center space-x-2 sm:space-x-4">
            {user && (
              <>
                <div className="relative">
                  <Bell 
                    className="w-5 h-5 sm:w-6 sm:h-6 text-[#555] cursor-pointer hover:text-[#1A1A1A]" 
                    onClick={() => {
                      setIsNotificationOpen(!isNotificationOpen);
                      if (!isNotificationOpen) {
                        notifications.filter(n => !n.isRead).forEach(n => markAsRead(n.id));
                      }
                    }}
                  />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                  
                  {isNotificationOpen && (
                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border z-50">
                      <div className="p-4 border-b">
                        <h3 className="font-semibold text-gray-900">Notifications</h3>
                      </div>
                      <div className="max-h-64 overflow-y-auto">
                        {notifications.length === 0 ? (
                          <div className="p-4 text-center text-gray-500">
                            No notifications
                          </div>
                        ) : (
                          notifications.map((notification) => (
                            <div
                              key={notification.id}
                              className={`p-4 border-b hover:bg-gray-50 ${!notification.isRead ? 'bg-blue-50' : ''}`}
                            >
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <p className="text-sm text-gray-900">{notification.message}</p>
                                  <p className="text-xs text-gray-500 mt-1">
                                    {new Date(notification.createdAt).toLocaleString()}
                                  </p>
                                </div>
                                {!notification.isRead && (
                                  <button
                                    onClick={() => handleMarkAsRead(notification.id)}
                                    className="ml-2 text-blue-600 hover:text-blue-800"
                                  >
                                    <X className="w-4 h-4" />
                                  </button>
                                )}
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  )}
                </div>
                <Image
                  src={user.image}
                  alt={user.name}
                  width={40}
                  height={40}
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover cursor-pointer"
                  unoptimized
                  onClick={onUserClick}
                />
              </>
            )}
            
            {showNavigation && (
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 text-[#555] hover:text-[#1A1A1A]"
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            )}
          </div>
        </div>

        {showNavigation && isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-2">
            {navigationItems.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  item.onClick?.();
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-[#555] hover:text-[#1A1A1A] hover:bg-gray-50 font-medium"
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
      
      <Toast 
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={() => setToast(prev => ({ ...prev, isVisible: false }))}
        duration={3000}
      />
    </nav>
  );
}