import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const NotificationContext = createContext();

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const { user, isAuthenticated } = useAuth();

  // Load user-specific notifications
  useEffect(() => {
    if (!isAuthenticated || !user) {
      setNotifications([]);
      setUnreadCount(0);
      return;
    }

    // Load notifications from localStorage for this specific user
    const userNotifications = JSON.parse(localStorage.getItem(`notifications_${user.email}`) || '[]');

    // If no notifications exist for this user, create some sample ones
    if (userNotifications.length === 0) {
      const sampleNotifications = [
        {
          id: '1',
          type: 'reply',
          title: 'Şikayətinizə cavab verildi',
          message: 'CityNet şirkəti şikayətinizə cavab verdi.',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
          isRead: false,
          relatedComplaintId: 'SKNET001',
          companyName: 'CityNet',
          userId: user.email
        },
        {
          id: '2',
          type: 'comment',
          title: 'Şikayətinizə şərh yazıldı',
          message: 'Ali Məmmədov şikayətinizə şərh yazdı.',
          timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
          isRead: false,
          relatedComplaintId: 'SKWOLT002',
          userName: 'Ali Məmmədov',
          userId: user.email
        },
        {
          id: '3',
          type: 'status',
          title: 'Şikayət statusu dəyişdi',
          message: 'Trendyol şikayətinizin statusu "İcradadır" olaraq dəyişdirildi.',
          timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
          isRead: true,
          relatedComplaintId: 'SKTREN003',
          companyName: 'Trendyol',
          userId: user.email
        },
        {
          id: '4',
          type: 'like',
          title: 'Şikayətiniz bəyənildi',
          message: '5 nəfər şikayətinizi bəyəndi.',
          timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
          isRead: true,
          relatedComplaintId: 'SKNET001',
          userId: user.email
        }
      ];

      // Save sample notifications for this user
      localStorage.setItem(`notifications_${user.email}`, JSON.stringify(sampleNotifications));
      setNotifications(sampleNotifications);
    } else {
      setNotifications(userNotifications);
    }

    setUnreadCount(userNotifications.filter(n => !n.isRead).length);
  }, [isAuthenticated, user]);

  const markAsRead = (notificationId) => {
    if (!user) return;

    const updatedNotifications = notifications.map(notification =>
      notification.id === notificationId
        ? { ...notification, isRead: true }
        : notification
    );

    setNotifications(updatedNotifications);
    setUnreadCount(prev => Math.max(0, prev - 1));

    // Save to localStorage
    localStorage.setItem(`notifications_${user.email}`, JSON.stringify(updatedNotifications));
  };

  const markAllAsRead = () => {
    if (!user) return;

    const updatedNotifications = notifications.map(notification => ({ ...notification, isRead: true }));
    setNotifications(updatedNotifications);
    setUnreadCount(0);

    // Save to localStorage
    localStorage.setItem(`notifications_${user.email}`, JSON.stringify(updatedNotifications));
  };

  const addNotification = (notification) => {
    if (!user) return;

    const newNotification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date(),
      isRead: false,
      userId: user.email
    };

    const updatedNotifications = [newNotification, ...notifications];
    setNotifications(updatedNotifications);
    setUnreadCount(prev => prev + 1);

    // Save to localStorage
    localStorage.setItem(`notifications_${user.email}`, JSON.stringify(updatedNotifications));
  };

  const removeNotification = (notificationId) => {
    if (!user) return;

    const notification = notifications.find(n => n.id === notificationId);
    const updatedNotifications = notifications.filter(n => n.id !== notificationId);
    setNotifications(updatedNotifications);

    if (notification && !notification.isRead) {
      setUnreadCount(prev => Math.max(0, prev - 1));
    }

    // Save to localStorage
    localStorage.setItem(`notifications_${user.email}`, JSON.stringify(updatedNotifications));
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'reply':
        return '💬';
      case 'comment':
        return '💭';
      case 'status':
        return '📋';
      case 'like':
        return '❤️';
      default:
        return '🔔';
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'reply':
        return 'bg-blue-50 border-blue-200';
      case 'comment':
        return 'bg-green-50 border-green-200';
      case 'status':
        return 'bg-yellow-50 border-yellow-200';
      case 'like':
        return 'bg-red-50 border-red-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) {
      return `${minutes} dəqiqə əvvəl`;
    } else if (hours < 24) {
      return `${hours} saat əvvəl`;
    } else {
      return `${days} gün əvvəl`;
    }
  };

  const value = {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    addNotification,
    removeNotification,
    getNotificationIcon,
    getNotificationColor,
    formatTimestamp
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};
