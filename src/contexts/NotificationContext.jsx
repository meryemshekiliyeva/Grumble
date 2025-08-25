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

  // Initialize test data for test@example.com
  const initializeTestData = (userEmail) => {
    if (userEmail === 'test@example.com') {
      // Create test complaints for test@example.com
      const existingComplaints = JSON.parse(localStorage.getItem('userComplaints') || '[]');
      const testUserComplaints = existingComplaints.filter(c => c.authorEmail === userEmail);

      if (testUserComplaints.length === 0) {
        const testComplaints = [
          {
            id: 'SKJPM001',
            title: 'Faiz Problemi',
            company: 'JPMorgan Chase',
            category: 'Bank və Maliyyə',
            author: 'Test User',
            authorEmail: 'test@example.com',
            date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toLocaleDateString('az-AZ'),
            summary: 'Faizlərin bu qədər yüksək olması qəbuledilməzdir',
            status: 'in_progress',
            likes: 8,
            comments: 3,
            rating: 4
          },
          {
            id: 'SKJPM002',
            title: 'Gecikmiş Ödəniş',
            company: 'JPMorgan Chase',
            category: 'Bank və Maliyyə',
            author: 'Test User',
            authorEmail: 'test@example.com',
            date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toLocaleDateString('az-AZ'),
            summary: 'Avtobuslar çox gecikir, xüsusilə də 119 nömrəli avtobus.',
            status: 'resolved',
            likes: 15,
            comments: 7,
            rating: 5
          }
        ];

        const updatedComplaints = [...existingComplaints, ...testComplaints];
        localStorage.setItem('userComplaints', JSON.stringify(updatedComplaints));
      }

      // Create test comments for test@example.com
      const existingComments = JSON.parse(localStorage.getItem('userComments') || '[]');
      const testUserComments = existingComments.filter(c => c.authorEmail === userEmail);

      if (testUserComments.length === 0) {
        const testComments = [
          {
            id: 'comment-test-1',
            complaintId: 'SKJPM001',
            complaintTitle: 'Faiz Problemi',
            company: 'JPMorgan Chase',
            text: 'Bu problem həqiqətən ciddidir və həll edilməlidir.',
            timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
            type: 'comment',
            authorEmail: userEmail
          },
          {
            id: 'comment-test-2',
            complaintId: 'SKJPM002',
            complaintTitle: 'Gecikmiş Ödəniş',
            company: 'JPMorgan Chase',
            text: 'Mən də eyni problemi yaşayıram.',
            timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
            type: 'comment',
            authorEmail: userEmail
          }
        ];

        const updatedComments = [...existingComments, ...testComments];
        localStorage.setItem('userComments', JSON.stringify(updatedComments));
      }

      // Create test likes for test@example.com
      const existingLikes = JSON.parse(localStorage.getItem('userLikes') || '[]');
      const testUserLikes = existingLikes.filter(l => l.userEmail === userEmail);

      if (testUserLikes.length === 0) {
        const testLikes = [
          {
            id: 'like-test-1',
            complaintId: 'SKNET001',
            complaintTitle: 'İnternet Bağlantı Problemləri',
            company: 'CityNet',
            timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            userEmail: userEmail
          },
          {
            id: 'like-test-2',
            complaintId: 'SKWOLT002',
            complaintTitle: 'Səhv Yemək Çatdırılması',
            company: 'Wolt',
            timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
            userEmail: userEmail
          }
        ];

        const updatedLikes = [...existingLikes, ...testLikes];
        localStorage.setItem('userLikes', JSON.stringify(updatedLikes));
      }
    }
  };

  // Load user-specific notifications
  useEffect(() => {
    if (!isAuthenticated || !user) {
      setNotifications([]);
      setUnreadCount(0);
      return;
    }

    // Initialize test data if needed
    initializeTestData(user.email);

    // Load notifications from localStorage for this specific user
    const userNotifications = JSON.parse(localStorage.getItem(`notifications_${user.email}`) || '[]');

    // If no notifications exist for this user, create some sample ones
    if (userNotifications.length === 0) {
      let sampleNotifications = [];

      // Create specific test data for test@example.com
      if (user.email === 'test@example.com') {
        sampleNotifications = [
          {
            id: '1',
            type: 'reply',
            title: 'Şikayətinizə cavab verildi',
            message: 'JPMorgan Chase şirkəti şikayətinizə cavab verdi.',
            timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
            isRead: false,
            relatedComplaintId: 'SKJPM001',
            companyName: 'JPMorgan Chase',
            userId: user.email
          },
          {
            id: '2',
            type: 'comment',
            title: 'Şikayətinizə şərh yazıldı',
            message: 'Ali Məmmədov şikayətinizə şərh yazdı.',
            timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
            isRead: false,
            relatedComplaintId: 'SKJPM001',
            userName: 'Ali Məmmədov',
            userId: user.email
          },
          {
            id: '3',
            type: 'status',
            title: 'Şikayət statusu dəyişdi',
            message: 'JPMorgan Chase şikayətinizin statusu "İcradadır" olaraq dəyişdirildi.',
            timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
            isRead: false,
            relatedComplaintId: 'SKJPM001',
            companyName: 'JPMorgan Chase',
            userId: user.email
          },
          {
            id: '4',
            type: 'like',
            title: 'Şikayətiniz bəyənildi',
            message: '8 nəfər şikayətinizi bəyəndi.',
            timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            isRead: true,
            relatedComplaintId: 'SKJPM001',
            userId: user.email
          }
        ];
      } else {
        // No default notifications for other users - they should be empty
        sampleNotifications = [];
      }

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
    try {
      const now = new Date();
      const date = new Date(timestamp);

      // Check if date is valid
      if (isNaN(date.getTime())) {
        return 'Bilinməyən vaxt';
      }

      const diff = now - date;
      const minutes = Math.floor(diff / (1000 * 60));
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));

      if (minutes < 1) {
        return 'İndi';
      } else if (minutes < 60) {
        return `${minutes} dəqiqə əvvəl`;
      } else if (hours < 24) {
        return `${hours} saat əvvəl`;
      } else {
        return `${days} gün əvvəl`;
      }
    } catch (error) {
      console.error('Error formatting timestamp:', error);
      return 'Bilinməyən vaxt';
    }
  };

  // Helper functions to create specific notification types
  const addReplyNotification = (complaintId, companyName) => {
    addNotification({
      type: 'reply',
      title: 'Şikayətinizə cavab verildi',
      message: `${companyName} şirkəti şikayətinizə cavab verdi.`,
      relatedComplaintId: complaintId,
      companyName: companyName
    });
  };

  const addStatusChangeNotification = (complaintId, companyName, newStatus) => {
    const statusLabels = {
      'in_progress': 'İcradadır',
      'resolved': 'Həll edilib',
      'rejected': 'Rədd edilib'
    };

    addNotification({
      type: 'status',
      title: 'Şikayətin statusu dəyişdi',
      message: `${companyName} şikayətinizin statusu "${statusLabels[newStatus] || newStatus}" olaraq dəyişdirildi.`,
      relatedComplaintId: complaintId,
      companyName: companyName
    });
  };

  const addLikeNotification = (complaintId, likeCount) => {
    addNotification({
      type: 'like',
      title: 'Şikayətiniz bəyənildi',
      message: `${likeCount} nəfər şikayətinizi bəyəndi.`,
      relatedComplaintId: complaintId
    });
  };

  const addCommentNotification = (complaintId, commenterName) => {
    addNotification({
      type: 'comment',
      title: 'Şikayətinizə şərh yazıldı',
      message: `${commenterName} şikayətinizə şərh yazdı.`,
      relatedComplaintId: complaintId,
      userName: commenterName
    });
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
    formatTimestamp,
    addReplyNotification,
    addStatusChangeNotification,
    addLikeNotification,
    addCommentNotification
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};
