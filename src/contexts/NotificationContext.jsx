import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { formatDateAz } from '../utils/dateUtils';

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

      // Always reinitialize to ensure fresh data
      if (testUserComplaints.length === 0) {
        const testComplaints = [
          {
            id: 'SKJPM001',
            title: 'Faiz Problemi',
            company: 'JPMorgan Chase',
            category: 'Bank və Maliyyə',
            author: 'Məryəm Şəkiliyeva',
            authorEmail: 'test@example.com',
            date: formatDateAz(new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)),
            timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            summary: 'Faizlərin bu qədər yüksək olması qəbuledilməzdir',
            description: 'Faizlərin bu qədər yüksək olması qəbuledilməzdir. Bu vəziyyət müştərilər üçün çox çətindir.',
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
            author: 'Məryəm Şəkiliyeva',
            authorEmail: 'test@example.com',
            date: formatDateAz(new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)),
            timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
            summary: 'Ödəniş gecikməsi problemi yaşayıram',
            description: 'Ödəniş gecikməsi problemi yaşayıram. Bu vəziyyət çox narahatdır.',
            status: 'resolved',
            likes: 15,
            comments: 7,
            rating: 5
          },
          {
            id: 'SKEMI001',
            title: 'Uçuş Gecikməsi',
            company: 'Emirates',
            category: 'Havayolu',
            author: 'Məryəm Şəkiliyeva',
            authorEmail: 'test@example.com',
            date: formatDateAz(new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)),
            timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
            summary: 'Dubai-Bakı uçuşu 4 saat gecikdi. Heç bir kompensasiya təklif edilmədi.',
            description: 'Dubai-Bakı uçuşu 4 saat gecikdi. Heç bir kompensasiya təklif edilmədi. Bu vəziyyət qəbuledilməzdir.',
            status: 'pending',
            likes: 12,
            comments: 5,
            rating: 2
          },
          {
            id: 'SKUBE001',
            title: 'Soyuq Yemək',
            company: 'Uber Eats',
            category: 'Yemək Çatdırılması',
            author: 'Məryəm Şəkiliyeva',
            authorEmail: 'test@example.com',
            date: formatDateAz(new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)),
            timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
            summary: 'Sifariş etdiyim pizza tamamilə soyuq gəldi. Çatdırılma çox uzun çəkdi.',
            description: 'Sifariş etdiyim pizza tamamilə soyuq gəldi. Çatdırılma çox uzun çəkdi. Xidmət keyfiyyəti çox pisdir.',
            status: 'in_progress',
            likes: 6,
            comments: 2,
            rating: 1
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
            complaintId: 'SKOTHER001',
            complaintTitle: 'Başqa şikayət',
            company: 'Digər Şirkət',
            content: 'Bu şikayətə rəyim budur.',
            text: 'Bu şikayətə rəyim budur.',
            timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
            type: 'comment',
            authorEmail: userEmail
          },
          {
            id: 'review-emirates-1',
            complaintId: null,
            complaintTitle: 'Emirates Xidməti',
            company: 'Emirates',
            content: 'Uçuş keyfiyyəti yaxşıdır, lakin gecikməler problematikdir. Ümumiyyətlə məmnunam.',
            text: 'Uçuş keyfiyyəti yaxşıdır, lakin gecikməler problematikdir. Ümumiyyətlə məmnunam.',
            timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            type: 'review',
            rating: 4,
            authorEmail: userEmail
          },
          {
            id: 'review-uber-eats-1',
            complaintId: null,
            complaintTitle: 'Uber Eats Çatdırılma',
            company: 'Uber Eats',
            content: 'Çatdırılma çox uzun çəkir və yemək soyuq gəlir. Xidmət keyfiyyəti yaxşılaşdırılmalıdır.',
            text: 'Çatdırılma çox uzun çəkir və yemək soyuq gəlir. Xidmət keyfiyyəti yaxşılaşdırılmalıdır.',
            timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
            type: 'review',
            rating: 2,
            authorEmail: userEmail
          },
          {
            id: 'reply-test-1',
            complaintId: 'SKOTHER002',
            complaintTitle: 'Başqa şikayət 2',
            company: 'Digər Şirkət',
            content: 'Bu şikayətə cavabım budur.',
            text: 'Bu şikayətə cavabım budur.',
            timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
            type: 'reply',
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
          },
          {
            id: '5',
            type: 'reply',
            title: 'Emirates şirkətindən cavab',
            message: 'Emirates şirkəti uçuş gecikməsi şikayətinizə cavab verdi.',
            timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
            isRead: false,
            relatedComplaintId: 'SKEMI001',
            companyName: 'Emirates',
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
      // Sort notifications by timestamp (newest first)
      const sortedNotifications = userNotifications.sort((a, b) =>
        new Date(b.timestamp) - new Date(a.timestamp)
      );
      setNotifications(sortedNotifications);
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

  // Helper function to add notification to a specific user
  const addNotificationToUser = (targetUserEmail, notification) => {
    if (!targetUserEmail) return;

    const newNotification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      isRead: false,
      userId: targetUserEmail
    };

    // Get existing notifications for the target user
    const existingNotifications = JSON.parse(localStorage.getItem(`notifications_${targetUserEmail}`) || '[]');
    const updatedNotifications = [newNotification, ...existingNotifications];

    // Save to localStorage for the target user
    localStorage.setItem(`notifications_${targetUserEmail}`, JSON.stringify(updatedNotifications));

    // If the target user is the current user, update the state
    if (user && user.email === targetUserEmail) {
      setNotifications(updatedNotifications);
      setUnreadCount(prev => prev + 1);
    }
  };

  // Helper functions to create specific notification types
  const addReplyNotification = (complaintId, companyName, targetUserEmail) => {
    addNotificationToUser(targetUserEmail, {
      type: 'reply',
      title: 'Şikayətinizə cavab verildi',
      message: `${companyName} şirkəti şikayətinizə cavab verdi.`,
      relatedComplaintId: complaintId,
      companyName: companyName
    });
  };

  const addStatusChangeNotification = (complaintId, companyName, newStatus, targetUserEmail) => {
    const statusLabels = {
      'in_progress': 'İcradadır',
      'resolved': 'Həll edilib',
      'rejected': 'Rədd edilib'
    };

    addNotificationToUser(targetUserEmail, {
      type: 'status',
      title: 'Şikayətin statusu dəyişdi',
      message: `${companyName} şikayətinizin statusu "${statusLabels[newStatus] || newStatus}" olaraq dəyişdirildi.`,
      relatedComplaintId: complaintId,
      companyName: companyName
    });
  };

  const addLikeNotification = (complaintId, likeCount, targetUserEmail) => {
    addNotificationToUser(targetUserEmail, {
      type: 'like',
      title: 'Şikayətiniz bəyənildi',
      message: `${likeCount} nəfər şikayətinizi bəyəndi.`,
      relatedComplaintId: complaintId
    });
  };

  const addCommentNotification = (complaintId, commenterName, targetUserEmail) => {
    addNotificationToUser(targetUserEmail, {
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
    addNotificationToUser,
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
