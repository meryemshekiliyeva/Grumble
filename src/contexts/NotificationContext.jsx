import React, { createContext, useContext, useState, useEffect } from 'react';

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

  // Mock notifications for demo
  useEffect(() => {
    const mockNotifications = [
      {
        id: '1',
        type: 'reply',
        title: 'Şikayətinizə cavab verildi',
        message: 'CityNet şirkəti şikayətinizə cavab verdi.',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        isRead: false,
        relatedComplaintId: 'SKNET001',
        companyName: 'CityNet'
      },
      {
        id: '2',
        type: 'comment',
        title: 'Şikayətinizə şərh yazıldı',
        message: 'Ali Məmmədov şikayətinizə şərh yazdı.',
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
        isRead: false,
        relatedComplaintId: 'SKWOLT002',
        userName: 'Ali Məmmədov'
      },
      {
        id: '3',
        type: 'status',
        title: 'Şikayət statusu dəyişdi',
        message: 'Trendyol şikayətinizin statusu "İcrada" olaraq dəyişdirildi.',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
        isRead: true,
        relatedComplaintId: 'SKTREN003',
        companyName: 'Trendyol'
      },
      {
        id: '4',
        type: 'like',
        title: 'Şikayətiniz bəyənildi',
        message: '5 nəfər şikayətinizi bəyəndi.',
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        isRead: true,
        relatedComplaintId: 'SKNET001'
      }
    ];

    setNotifications(mockNotifications);
    setUnreadCount(mockNotifications.filter(n => !n.isRead).length);
  }, []);

  const markAsRead = (notificationId) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, isRead: true }
          : notification
      )
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, isRead: true }))
    );
    setUnreadCount(0);
  };

  const addNotification = (notification) => {
    const newNotification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date(),
      isRead: false
    };
    
    setNotifications(prev => [newNotification, ...prev]);
    setUnreadCount(prev => prev + 1);
  };

  const removeNotification = (notificationId) => {
    const notification = notifications.find(n => n.id === notificationId);
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
    
    if (notification && !notification.isRead) {
      setUnreadCount(prev => Math.max(0, prev - 1));
    }
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
